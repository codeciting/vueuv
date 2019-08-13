import Vue from 'vue'
import { windowSize } from '@/lib/observable/browser/window'
import config from '@/lib/config'

const observer = new Vue({
  computed: {
    windowSize () {
      return windowSize
    }
  }
})

/**
 *
 * @param {Record<string, number>} sizer
 * @return {{sizer: Array<{size: string, width: number}>, size: string}}
 */
function normalizeSizer (sizer) {
  if ('__loadedSizer' in sizer && sizer.__loadedSizer !== undefined) {
    return sizer.__loadedSizer
  }
  const observableSizer = new Vue.observable({
    sizer: Object.keys(sizer)
      .sort((a, b) => {
        return sizer[a] - sizer[b]
      })
      .reduce((prev, size) => {
        const width = sizer[size]
        return prev.concat({
          size,
          width
        })
      }, []),
    size: null
  })
  const unwatch = observer.$watch('windowSize.width', width => {
      for (const size of observableSizer.sizer) {
        if (width >= size.width) {
          Vue.set(observableSizer, 'size', size.size)
        } else {
          break
        }
      }
    }, {
      immediate: true
    }
  )

  Object.defineProperty(sizer, '__loadedSizer', {
    value: observableSizer,
    writable: false,
    enumerable: false,
    configurable: true
  })

  Object.defineProperty(sizer, '__loadedSizerReset', {
    value () {
      Object.defineProperty(this, '__loadedSizer', {
        value: undefined,
        writable: false,
        enumerable: false,
        configurable: true
      })
      Object.defineProperty(this, '__loadedSizerReset', {
        value: undefined,
        writable: false,
        enumerable: false,
        configurable: true
      })
      unwatch()
    },
    writable: false,
    enumerable: false,
    configurable: true
  })
  return observableSizer
}

function getSizerFallbackOrder (sizer) {
  if (config.responsive.firstClass === 'mobile') {
    return sizer.slice().reverse()
  } else {
    return sizer
  }
}

/**
 * // TODO: Use vue 3.x functional hooks
 * // TODO: sizer currently not observed.
 * @param {Record<string, number>} sizer
 */
export function useResponsiveSizer (sizer = config.responsive.sizer) {
  return normalizeSizer(sizer)
}

export function resetResponsiveSizer (sizer = config.responsive.sizer) {
  sizer.__loadedSizerReset && sizer.__loadedSizerReset()
}

export function selectSizer (sizer, slots) {
  if (sizer.size in slots) {
    return sizer.size
  } else {
    let found = false
    const orderedSizer = getSizerFallbackOrder(sizer.sizer)
    for (const i of orderedSizer) {
      if (found) {
        if (i.size in slots) {
          return i.size
        }
      } else {
        if (i.size === sizer.size) {
          found = true
        }
      }
    }

    // Fallback to default if exists.
    if ('default' in slots) {
      return 'default'
    }

    return null
  }
}

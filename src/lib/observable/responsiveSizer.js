import Vue from 'vue'
import { windowSize } from '@/lib/observable/browser/window'

// TODO: Use vue 3.x functional hooks

/**
 *
 * @param {Record<string, [number, number]>} sizer
 */
function normalizeSizer (sizer) {
  if ('__loadedSizer' in sizer) {
  }
}

/**
 *
 * @param {Record<string, number>} sizer
 */
export function useResponsiveSize (sizer) {
  const observer = new Vue({})

  observer.$watch(windowSize, () => {
  }, {
    immediate: true
  })
}

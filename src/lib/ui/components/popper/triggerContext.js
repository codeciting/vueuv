import Vue from 'vue'

const HOVER_REF = 0
const HOVER_POP = 1
const CLICK_STATE = 2

export function createTriggerContext (el, popEl, modifiers) {
  const conditions = [false, false, false]

  const state = Vue.observable({
    show: getState()
  })

  function getState () {
    return conditions.indexOf(true) !== -1
  }

  modifiers = Object.assign({}, modifiers)

  const mouseEnterRefHandler = () => {
    conditions[HOVER_REF] = true
    state.show = true
  }

  const mouseLeaveRefHandler = () => {
    conditions[HOVER_REF] = false
    state.show = getState()
  }

  const mouseEnterPopElHandler = () => {
    conditions[HOVER_POP] = true
    state.show = true
  }

  const mouseLeavePopElHandler = () => {
    conditions[HOVER_POP] = false
    state.show = getState()
  }

  const clickRefHandler = (e) => {
    conditions[CLICK_STATE] = true
    state.show = true
    e.stopPropagation()
  }

  const clickOutsideHandler = () => {
    conditions[CLICK_STATE] = false
    state.show = false
  }

  if (modifiers.hover) {
    el.addEventListener('mouseenter', mouseEnterRefHandler)
    el.addEventListener('mouseleave', mouseLeaveRefHandler)
    popEl.addEventListener('mouseenter', mouseEnterPopElHandler)
    popEl.addEventListener('mouseleave', mouseLeavePopElHandler)
  }
  if (modifiers.click) {
    el.addEventListener('click', clickRefHandler)
    document.body.addEventListener('click', clickOutsideHandler)
  }

  return {
    state,
    toggle (ifShow) {
      state.show = ifShow
      if (!ifShow) {
        conditions.fill(false)
      }
    },
    destroy () {
      if (modifiers.hover) {
        el.removeEventListener('mouseenter', mouseEnterRefHandler)
        el.removeEventListener('mouseleave', mouseLeaveRefHandler)
        popEl.removeEventListener('mouseenter', mouseEnterPopElHandler)
        popEl.removeEventListener('mouseleave', mouseLeavePopElHandler)
      }
      if (modifiers.click) {
        el.removeEventListener('click', clickRefHandler)
        document.body.removeEventListener('click', clickOutsideHandler)
      }
    }
  }

}

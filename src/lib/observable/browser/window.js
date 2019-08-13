import Vue from 'vue'

const observableWindowSize = Vue.observable({
  width: window.innerWidth,
  height: window.innerHeight
})

window.addEventListener('resize', () => {
  observableWindowSize.width = window.innerWidth
  observableWindowSize.height = window.innerHeight
})

/**
 *
 * @type {{width: number, height: number}}
 */
export const windowSize = observableWindowSize

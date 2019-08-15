import Component from './Index'
import A from './A'

export const name = 'Name'
export const component = Component
export const vuexModule = {
  namespace: true,
  state () {
    return {
      name: 'a'
    }
  }
}
export const routes = [{
  path: 'a',
  component: A
}]

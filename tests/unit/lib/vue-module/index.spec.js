import Vue from 'vue'

import VueModulePlugin from '@/lib/vue-module'
import { MockRouter, MockVuex } from './utils'

describe('vue-module/index.js', () => {
  it('should throws when no router passed', (done) => {
    try {
      VueModulePlugin.install(undefined, {})
      done(new Error())
    } catch (e) {
      expect(e).toBeInstanceOf(Error)
      done()
    }
  })

  it('should load router', (done) => {
    const router = new MockRouter()

    VueModulePlugin.install(Vue, {
      router,
      declarations: [
        {
          path: '/mock-module',
          config: async () => ({
            name: 'MockModule',
            routerName: 'RouteName',
            component: {
              name: 'MockComponent',
              render: h => h('div', ['mock-content'])
            }
          })
        }
      ]
    })

    router.goto('/mock-module', (e) => {
        if (e !== void 0 && e !== false) {
          expect(e.path).toBe('/mock-module')
          expect(router.routes[0]).toBeTruthy()
          expect(router.routes[0].name).toBe('RouteName')
          done()
        } else {
          done(new Error('failed to load module.'))
        }
      })
      .catch(done)

  })

  it('should load when visit sub path.', (done) => {
    const router = new MockRouter()

    VueModulePlugin.install(Vue, {
      router,
      declarations: [
        {
          path: '/mock-module',
          config: async () => ({
            name: 'MockModule',
            component: {
              name: 'MockComponent',
              render: h => h('div', ['mock-content'])
            }
          })
        }
      ]
    })

    router.goto('/mock-module/path/to', (e) => {
        if (e !== void 0 && e !== false) {
          expect(e.path).toBe('/mock-module/path/to')
          expect(router.routes[0]).toBeTruthy()
          done()
        } else {
          done(new Error('failed to load module.'))
        }
      })
      .catch(done)
  })

  it('should not load when visit other path', (done) => {
    const router = new MockRouter()

    VueModulePlugin.install(Vue, {
      router,
      declarations: [
        {
          path: '/mock-module',
          config: async () => ({
            name: 'MockModule',
            component: {
              name: 'MockComponent',
              render: h => h('div', ['mock-content'])
            }
          })
        }
      ]
    })

    router.goto('/path/to', (e) => {
        expect(e).toBeUndefined()
        done()
      })
      .catch(done)
  })

  it('should throws if vuexModule is provided but not vue instance is passed', (done) => {
    const router = new MockRouter()

    VueModulePlugin.install(undefined, {
      router,
      declarations: [
        {
          path: '/mock-path',
          config: async () => ({
            vuexModule: {}
          })
        }
      ]
    })

    router.goto('/mock-path', () => {})
      .then(() => done(new Error()))
      .catch(e => {
        expect(e).toBeInstanceOf(Error)
        expect(e.message).toBe('No vuex instance.')
        done()
      })
  })

  it('should register vuex module', done => {
    const router = new MockRouter()
    const store = new MockVuex()

    VueModulePlugin.install(undefined, {
      router,
      store,
      declarations: [
        {
          path: '/mock-path',
          config: async () => ({
            vuexModuleName: ['path', 'to', 'mock-module'],
            vuexModule: {}
          })
        }
      ]
    })

    router.goto('/mock-path', () => {})
      .then(() => {
        if (store.isModuleRegistered(['path', 'to', 'mock-module'])) {
          done()
        } else {
          done(new Error())
        }
      })
      .catch(e => {
        done(e)
      })
  })

  it('should use default name', done => {
    const router = new MockRouter()
    const store = new MockVuex()

    VueModulePlugin.install(undefined, {
      router,
      store,
      declarations: [
        {
          path: '/mock-path',
          config: async () => ({
            name: 'defaultName',
            vuexModule: {}
          })
        }
      ]
    })

    router.goto('/mock-path', () => {})
      .then(() => {
        expect(store.isModuleRegistered('defaultName')).toBe(true)
        expect(router.routes[0].name).toBe('defaultName')
        done()
      })
      .catch(e => {
        done(e)
      })
  })

  it('should runs plugins', (done) => {
    const router = new MockRouter()

    const config = {}

    VueModulePlugin.install(undefined, {
      router,
      declarations: [
        {
          path: '/mock-path',
          config: async () => config
        }
      ],
      plugins: [
        (cfg) => {
          expect(cfg).toBe(config)
          done()
        }
      ]
    })

    router.goto('/mock-path', () => {})
      .catch(done)
  })

})

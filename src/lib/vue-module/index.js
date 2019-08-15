import 'vue-router'

const pathToRegexp = require('path-to-regexp')

/**
 *
 * @param Vue
 * @param {VueModulePluginOptions}options
 */
export default {
  /**
   *
   * @param Vue
   * @param {VueRouter}router
   * @param {Store}store
   * @param declarations
   */
  install (Vue, { router, store, declarations, plugins }) {
    if (!router) {
      throw new Error('Vue router is required to load vue module.')
    }

    const map = {}
    declarations.forEach(declaration => {
      map[declaration.path] = declaration
      const pathRegExp = pathToRegexp(declaration.path)
      const subPathRegexp = pathToRegexp(declaration.path.replace(/\/?$/, '/*'))
      declaration._test = (path) => {
        return pathRegExp.test(path) || subPathRegexp.test(path)
      }
    })

    router.beforeResolve(async (to, from, next) => {
      for (const key in map) {

        /* istanbul ignore else */
        if (map.hasOwnProperty(key)) {
          if (map[key]._test(to.path)) {
            const option = map[key]
            delete map[key]

            // Fetch the module
            const config = await option.config()
            const { component, routes, vuexModule, routerName, vuexModuleName, name } = config

            // add router
            router.addRoutes([
              {
                path: option.path,
                name: routerName || name,
                component,
                children: routes
              }])

            // add vuex module
            if (vuexModule) {
              if (!store) {
                throw new Error('No vuex instance.')
              }
              store.registerModule(vuexModuleName || name, vuexModule)
            }

            // load plugins
            if (plugins) {
              plugins.forEach(plugin => {
                plugin(config)
              })
            }

            // Re-resolve the route.
            next(to)
            return
          }
        }
      }
      next()
    })
  }
}

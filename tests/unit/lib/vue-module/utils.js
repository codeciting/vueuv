export class MockRouter {
  _beforeResolveHook

  constructor () {
    this.routes = []
  }

  beforeResolve (hook) {
    this._beforeResolveHook = hook
  }

  addRoutes (routes) {
    this.routes = this.routes.concat(routes)
  }

  goto (to, cb) {

    const next = (e) => {
      if (e === void 0) {
        cb()
      } else {
        cb(e)
      }
    }
    return Promise.resolve().then(() => {
      if (typeof to === 'string') {
        return this._beforeResolveHook({
          path: to
        }, undefined, next)
      } else {
        return this._beforeResolveHook(to, undefined, next)
      }
    })
  }
}

export class MockVuex {

  constructor () {
    this.modules = []
  }

  registerModule (path, config) {
    this.modules.push({ path, config })
  }

  isModuleRegistered (path) {
    return this.modules.findIndex(module => String(module.path) === String(path)) !== -1
  }

}

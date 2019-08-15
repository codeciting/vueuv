import { Component } from 'vue'
import { Module, Store, StoreOptions } from 'vuex'
import { RouteConfig, RouteRecord, RouterOptions, VueRouter } from 'vue-router/types/router'

declare interface VueModulePluginOptions<S, R> {
  router: VueRouter
  store: Store<S>
  declarations: Array<VueModuleDeclare<S, R>>
}

declare interface VueModuleDeclare<S, R> {
  name: string
  path: string
  config: () => Promise<VueModuleConfig<S, R>>

  /**
   * Default to name
   */
  vuexModuleName?: string | string[]

  /**
   * Default to name
   */
  routerName?: string
}

declare interface VueModuleConfig<S, R> {
  component: Component
  store?: Module<S, R>
  router?: RouteConfig[]
}


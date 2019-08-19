import Vue from 'vue'

function getContext (vm) {
  return vm.context._original || vm.context
}

function getDefinedPopperReferences (vm) {
  const definer = getContext(vm)
  if ('__popperReferences' in definer) {
    return definer.__popperReferences
  } else {
    return Object.defineProperty(definer, '__popperReferences', {
      value: Vue.observable({}),
      writable: false,
      enumerable: false
    }).__popperReferences
  }
}

export const popperReference = {
  inserted (el, binding, vm) {
    const poppers = getDefinedPopperReferences(vm)
    const key = binding.value || 'default'
    poppers[key] = { el, triggers: binding.modifiers }
  },

  update (el, binding, vm) {
    if (binding.value === binding.oldValue) {
      return
    }
    const poppers = getDefinedPopperReferences(vm)
    const key = binding.value || 'default'
    poppers[key] = { el, triggers: binding.modifiers }
  },

  unbind (el, binding, vm) {
    const poppers = getDefinedPopperReferences(vm)
    const key = binding.value || 'default'
    if (poppers[key] === el) {
      Vue.delete(poppers, key)
    }
  }
}


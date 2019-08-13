import Vue from 'vue'

import { shallowMount } from '@vue/test-utils'
import config from '@/lib/config'
import Responsive from '@/lib/functional-component/Responsive.vue'

describe('Responsive.vue', () => {
  it('renders right slot', async () => {
    window.resizeTo(config.responsive.sizer.xs + 1, 1)
    await Vue.nextTick()
    const wrapper = shallowMount(Responsive, {
      scopedSlots: {
        xs: function () {
          return ['xs']
        },
        lg: function () {
          return ['lg']
        }
      }
    })

    expect(wrapper.text()).toBe('xs')

    window.resizeTo(config.responsive.sizer.xl - 3, 1)
    await Vue.nextTick()
    expect(wrapper.text()).toBe('lg')
  })

  it('renders good tag', () => {
    const wrapper = shallowMount(Responsive, {
      propsData: {
        tag: 'A'
      }
    })
    expect(wrapper.element.tagName).toBe('A')
  })

  it('add class names properly', async () => {
    const wrapper = shallowMount(Responsive, {
      propsData: {
        addClass: true
      },
      scopedSlots: {
        xs: function () {
          return ['xs']
        },
        lg: function () {
          return ['lg']
        }
      }
    })

    window.resizeTo(config.responsive.sizer.xs + 1, 1)
    await Vue.nextTick()
    expect(wrapper.classes()).toContain('xs')
    expect(wrapper.classes()).not.toContain('lg')

    window.resizeTo(config.responsive.sizer.lg + 1, 1)
    await Vue.nextTick()
    expect(wrapper.classes()).not.toContain('xs')
    expect(wrapper.classes()).toContain('lg')
  })

  it('should not add class names', async () => {
    const wrapper = shallowMount(Responsive, {
      propsData: {
        addClass: false
      },
      scopedSlots: {
        xs: function () {
          return ['xs']
        },
        lg: function () {
          return ['lg']
        }
      }
    })

    window.resizeTo(config.responsive.sizer.xs + 1, 1)
    await Vue.nextTick()
    expect(wrapper.classes()).not.toContain('xs')
    expect(wrapper.classes()).not.toContain('lg')

    window.resizeTo(config.responsive.sizer.lg + 1, 1)
    await Vue.nextTick()
    expect(wrapper.classes()).not.toContain('xs')
    expect(wrapper.classes()).not.toContain('lg')
  })

})

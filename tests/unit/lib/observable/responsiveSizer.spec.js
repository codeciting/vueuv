import Vue from 'vue'
import config from '@/lib/config'
import { resetResponsiveSizer, selectSizer, useResponsiveSizer } from '@/lib/observable/responsiveSizer'

describe('responsiveSizer.js', () => {

  it('should reuse sizer', () => {
    const tempConfig = { default: 0 }
    const sizer = useResponsiveSizer(tempConfig)

    expect(useResponsiveSizer(tempConfig)).toBe(sizer)

    resetResponsiveSizer(tempConfig)
  })

  it('should reset sizer', () => {
    const tempConfig = { default: 0 }
    const sizer = useResponsiveSizer(tempConfig)

    resetResponsiveSizer(tempConfig)

    expect(useResponsiveSizer(tempConfig)).not.toBe(sizer)

    resetResponsiveSizer(tempConfig)
  })

  it('should use default sizer', () => {
    window.innerWidth = 1024
    const sizer = useResponsiveSizer()
    expect(sizer.sizer.map(sizer => sizer.size)).toEqual(Object.keys(config.responsive.sizer))
    expect(config.responsive.sizer.__loadedSizer).toBe(useResponsiveSizer())
    expect(sizer.size).toBe('lg')

    resetResponsiveSizer()
  })

  it('should use new sizer', () => {
    const customConfig = { default: 0 }
    const sizer = useResponsiveSizer(customConfig)
    expect(sizer.sizer.map(sizer => sizer.size)).toEqual(['default'])
    expect(customConfig.__loadedSizer).toBe(sizer)
    expect(sizer.size).toBe('default')

    resetResponsiveSizer(customConfig)
  })

  it('should update size', async () => {
    const sizer = useResponsiveSizer()

    window.resizeTo(config.responsive.sizer.xs + 1, 1)
    await Vue.nextTick()
    expect(sizer.size).toBe('xs')

    window.resizeTo(config.responsive.sizer.sm + 3, 1)
    await Vue.nextTick()
    expect(sizer.size).toBe('sm')

    window.resizeTo(config.responsive.sizer.xl - 30, 1)
    await Vue.nextTick()
    expect(sizer.size).toBe('lg')

    resetResponsiveSizer()
  })

  it('should select size correctly', async () => {
    window.resizeTo(config.responsive.sizer.lg + 1, 1)
    await Vue.nextTick()
    const sizer = useResponsiveSizer()

    expect(selectSizer(sizer, { lg: undefined })).toBe('lg')

    resetResponsiveSizer()
  })

  it('should fallback correctly', async () => {
    const tempConfig = { mobile: 0, center1: 200, center2: 700, pc: 1000 }
    const tempSizer = useResponsiveSizer(tempConfig)

    window.resizeTo(400, 1)
    await Vue.nextTick()

    config.responsive.firstClass = 'mobile'
    expect(selectSizer(tempSizer, { mobile: undefined, pc: undefined })).toBe('mobile')

    config.responsive.firstClass = 'pc'
    expect(selectSizer(tempSizer, { mobile: undefined, pc: undefined })).toBe('pc')

    resetResponsiveSizer(tempConfig)
  })

  it('should fallback to default correctly', async () => {
    const tempConfig = { center1: 200, center2: 700, pc: 1000 }
    let tempSizer = useResponsiveSizer(tempConfig)

    window.resizeTo(400, 1)
    await Vue.nextTick()

    config.responsive.firstClass = 'mobile'
    expect(selectSizer(tempSizer, { mobile: undefined, pc: undefined, default: undefined })).toBe('default')

    config.responsive.firstClass = 'pc'
    expect(selectSizer(tempSizer, { mobile: undefined, pc: undefined, default: undefined })).toBe('pc')

    resetResponsiveSizer(tempConfig)

    delete tempConfig.pc
    tempConfig.mobile = 0

    tempSizer = useResponsiveSizer(tempConfig)

    config.responsive.firstClass = 'mobile'
    expect(selectSizer(tempSizer, { mobile: undefined, pc: undefined, default: undefined })).toBe('mobile')

    config.responsive.firstClass = 'pc'
    expect(selectSizer(tempSizer, { mobile: undefined, pc: undefined, default: undefined })).toBe('default')

    resetResponsiveSizer(tempConfig)
  })

  it('should select null size', async () => {
    const tempConfig = { center1: 200, center2: 700 }
    let tempSizer = useResponsiveSizer(tempConfig)

    window.resizeTo(400, 1)
    await Vue.nextTick()

    config.responsive.firstClass = 'mobile'
    expect(selectSizer(tempSizer, { mobile: undefined, pc: undefined })).toBeNull()

    resetResponsiveSizer(tempConfig)
  })

})

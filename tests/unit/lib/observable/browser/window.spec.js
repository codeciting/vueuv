import { windowSize } from '@/lib/observable/browser/window'

export const SUPPORT_WINDOW_RESIZE = ('onresize' in window)

describe('window.js', () => {
  it('updates width and height.', () => {
    if (!SUPPORT_WINDOW_RESIZE) {
      throw new Error('Jest does not support window.onresize to simulate this test.')
    }
    expect(windowSize.width).toBe(window.innerWidth)
    expect(windowSize.height).toBe(window.innerHeight)

    const RESIZE_WIDTH = 299, RESIZE_HEIGHT = 313
    window.resizeTo(RESIZE_WIDTH, RESIZE_HEIGHT)
    expect(windowSize.width).toBe(RESIZE_WIDTH)
    expect(windowSize.height).toBe(RESIZE_HEIGHT)
  })
})

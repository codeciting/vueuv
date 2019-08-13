import { windowSize } from '@/lib/observable/browser/window'

export const SUPPORT_WINDOW_RESIZE = ('onresize' in window)

describe('window.js', () => {
  it('Updates width and height.', (cb) => {
    if (!SUPPORT_WINDOW_RESIZE) {
      throw new Error('Jest does not support window.onresize to simulate this test.')
    }
    expect(windowSize.width).toBe(window.innerWidth)
    expect(windowSize.height).toBe(window.innerHeight)
    window.resizeTo(299, 313)
    expect(windowSize.width).toBe(299)
    expect(windowSize.height).toBe(313)
  })
})

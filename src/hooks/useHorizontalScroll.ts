import { useRef, useEffect } from 'react'

export function useHorizontalScroll() {
  const mouseWheelRef = useRef<HTMLDivElement>()
  useEffect(() => {
    const mouseWheel = mouseWheelRef?.current
    if (mouseWheel) {
      const onWheel = (evt: WheelEvent) => {
        mouseWheel.scrollBy({
          left: evt.deltaY < 0 ? -5 : 5,
        })
      }
      mouseWheel.addEventListener('wheel', onWheel)
      return () => mouseWheel.removeEventListener('wheel', onWheel)
    }
  }, [])
  return mouseWheelRef
}

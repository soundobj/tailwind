import React, { useEffect, useRef } from "react"
import { debounce } from "lodash"

export type InterserctionObserverOptions = {
  rootMargin?: string,
  threshold?: number
}

function useIntersectionObserver(callback: () => void, options?: InterserctionObserverOptions) {
  const targetRef = useRef<HTMLElement>() as React.MutableRefObject<HTMLElement>

  useEffect(() => {
    let observer = new IntersectionObserver(debounce((entries) => {
      const entry = entries[0]
      if (entry.isIntersecting) {
        callback()
      }
    }), options);

    if (targetRef.current) {
      observer.observe(targetRef.current)
    }
  }, [])

  return {
    targetRef,
  }
}

export default useIntersectionObserver
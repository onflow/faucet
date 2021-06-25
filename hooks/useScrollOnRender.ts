import {useLayoutEffect, useRef} from "react"

export default function useScrollOnRender() {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (ref.current) {
      const refOffset = ref.current.offsetTop - 30
      const windowBottom = window.scrollY + window.innerHeight
      const isOutOfView = refOffset < window.scrollY || refOffset > windowBottom
      if (isOutOfView) window.scrollTo({top: refOffset, behavior: "smooth"})
    }
  })

  return {ref}
}

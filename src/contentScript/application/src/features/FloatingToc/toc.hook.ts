import { useEffect, useRef, useState } from 'react'
import { getAllHeadings } from './toc.utils'

export const useHeadings = () => {
  const [headings, setHeadings] = useState<Array<HTMLHeadingElement> | null>(null)

  useEffect(() => {
    const headings = Array.from(getAllHeadings())

    setHeadings(headings)
  }, [])

  return { headings }
}

export const useTocHighlight = ({
  headings,
}: {
  headings: Array<HTMLHeadingElement>
}) => {
  const [activeId, setActiveId] = useState<string | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const options = {
    rootMargin: '-70px 0px -70% 0px',
    threshold: 1.0,
  }

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id)
        }
      }
    }, options)

    for (const heading of headings) {
      observerRef.current?.observe(heading)
    }

    return () => observerRef.current?.disconnect()
  }, [headings])

  return {
    activeId,
  }
}

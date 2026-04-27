'use client'

import { useState, useEffect } from 'react'

export function ScrollProgress() {
  const [width, setWidth] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const pct = h.scrollTop / (h.scrollHeight - h.clientHeight) * 100
      setWidth(Math.min(100, Math.max(0, pct)))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return <div className="scroll-progress" style={{ width: width + '%' }} />
}

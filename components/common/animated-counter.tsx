'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface AnimatedCounterProps {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
  className?: string
}

export function AnimatedCounter({
  end,
  duration = 2,
  suffix = '',
  prefix = '',
  className = '',
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const counterRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const element = counterRef.current
    if (!element) return

    const counter = { value: 0 }

    gsap.to(counter, {
      value: end,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        setCount(Math.round(counter.value))
      },
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    })
  }, [end, duration])

  return (
    <span ref={counterRef} className={className}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

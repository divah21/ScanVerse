import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3, ease: 'easeInOut' },
}

export const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' },
}

export const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: 'backOut' },
}

// GSAP Animation Utilities
export const animateOnScroll = (selector: string, animation: gsap.TweenVars) => {
  gsap.fromTo(
    selector,
    { opacity: 0, y: 50 },
    {
      ...animation,
      scrollTrigger: {
        trigger: selector,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    }
  )
}

export const createStaggerAnimation = (selector: string, delay = 0.1) => {
  gsap.fromTo(
    selector,
    { opacity: 0, y: 30, scale: 0.9 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      stagger: delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: selector,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    }
  )
}

export const pulseAnimation = (selector: string) => {
  gsap.to(selector, {
    scale: 1.05,
    duration: 2,
    ease: 'power2.inOut',
    yoyo: true,
    repeat: -1,
  })
}

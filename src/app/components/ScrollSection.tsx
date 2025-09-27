// components/ScrollSection.tsx
'use client'

import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion, useAnimation } from 'framer-motion'

export default function ScrollSection({ children }: { children: React.ReactNode }) {
  const controls = useAnimation()
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.2 })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    } else {
      controls.start('hidden')
    }
  }, [inView, controls])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 0 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.div>
  )
}

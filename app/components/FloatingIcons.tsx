'use client'

import { motion } from 'framer-motion'
import { 
  SiReact, 
  SiNextdotjs, 
  SiTailwindcss, 
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss3
} from 'react-icons/si'

const icons = [
  { Icon: SiReact, color: '#61DAFB' },
  { Icon: SiNextdotjs, color: '#ffffff' },
  { Icon: SiTailwindcss, color: '#06B6D4' },
  { Icon: SiTypescript, color: '#3178C6' },
  { Icon: SiJavascript, color: '#F7DF1E' },
  { Icon: SiHtml5, color: '#E34F26' },
  { Icon: SiCss3, color: '#1572B6' }
]

export default function FloatingIcons() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {icons.map(({ Icon, color }, index) => (
        <motion.div
          key={index}
          className="absolute"
          initial={{ 
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0 
          }}
          animate={{ 
            x: [
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth
            ],
            y: [
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight
            ],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            delay: index * 0.5
          }}
        >
          <Icon className="w-8 h-8 md:w-12 md:h-12" style={{ color }} />
        </motion.div>
      ))}
    </div>
  )
}


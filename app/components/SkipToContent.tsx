'use client'

import { useState } from 'react'

export default function SkipToContent() {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <a
      href="#main-content"
      className={`
        fixed top-0 left-0 p-3 bg-blue-600 text-white transition-transform duration-300 z-50
        ${isFocused ? 'translate-y-0' : '-translate-y-full'}
      `}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      Saltar al contenido principal
    </a>
  )
}


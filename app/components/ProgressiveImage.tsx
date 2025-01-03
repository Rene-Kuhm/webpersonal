'use client'

import { useState, useEffect } from 'react'
import NextImage from 'next/image'

interface ProgressiveImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  placeholder?: string
}

export default function ProgressiveImage({
  src,
  alt,
  width,
  height,
  className = '',
  placeholder = 'data:image/jpeg;base64,/9j/4AAQSkZJRg==' // Tiny base64 placeholder
}: ProgressiveImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [currentSrc, setCurrentSrc] = useState(placeholder)

  useEffect(() => {
    const img: HTMLImageElement = document.createElement('img')
    img.src = src
    img.onload = () => {
      setIsLoading(false)
      setCurrentSrc(src)
    }
  }, [src])

  return (
    <NextImage
      src={currentSrc}
      alt={alt}
      width={width}
      height={height}
      className={`transition-opacity duration-300 ${isLoading ? 'opacity-50' : 'opacity-100'} ${className}`}
    />
  )
}


'use client'

import { useState, useEffect } from 'react'

interface TypeWriterProps {
  words: string[];
  delay?: number;
  infinite?: boolean;
  className?: string;
}

export default function TypeWriter({ 
  words, 
  delay = 100, 
  infinite = true,
  className = ''
}: TypeWriterProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      const currentWord = words[currentWordIndex]
      
      if (isDeleting) {
        setCurrentText(currentWord.substring(0, currentText.length - 1))
      } else {
        setCurrentText(currentWord.substring(0, currentText.length + 1))
      }

      if (!isDeleting && currentText === currentWord) {
        setTimeout(() => setIsDeleting(true), 500)
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false)
        setCurrentWordIndex((prev) => {
          if (prev === words.length - 1) {
            return infinite ? 0 : prev
          }
          return prev + 1
        })
      }
    }, isDeleting ? delay / 2 : delay)

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, words, currentWordIndex, delay, infinite])

  return <span className={className}>{currentText}<span className="animate-pulse">|</span></span>
}


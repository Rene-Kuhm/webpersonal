'use client'

import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa'
import { Button } from "@/components/ui/button"

type ShareButtonsProps = {
  url: string
  title: string
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  return (
    <div className="flex space-x-2 mt-4">
      <Button
        variant="outline"
        size="icon"
        onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, '_blank')}
      >
        <FaFacebook className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`, '_blank')}
      >
        <FaTwitter className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`, '_blank')}
      >
        <FaLinkedin className="h-4 w-4" />
      </Button>
    </div>
  )
}


'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface Comment {
  _id: string
  name: string
  content: string
  createdAt: string
}

interface CommentFormData {
  name: string
  content: string
}

interface CommentsProps {
  postId: string
  initialComments: Comment[]
}

export default function Comments({ postId, initialComments }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CommentFormData>()

  const onSubmit = async (data: CommentFormData) => {
    try {
      const newComment = {
        _id: Date.now().toString(), // Temporary ID for preview
        name: data.name,
        content: data.content,
        createdAt: new Date().toISOString(),
        postId, // Include the postId in the comment data
      }

      // Here you would typically make an API call to save the comment
      // For example:
      // await fetch('/api/comments', {
      //   method: 'POST',
      //   body: JSON.stringify({ ...newComment, postId }),
      // })

      setComments([newComment, ...comments])
      reset()
    } catch (error) {
      console.error('Error posting comment:', error)
    }
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Comentarios</h2>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Añadir un comentario</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input
                {...register('name', { required: true })}
                placeholder="Tu nombre"
                className="w-full"
              />
              {errors.name && (
                <span className="text-sm text-red-500">Este campo es requerido</span>
              )}
            </div>
            
            <div>
              <Textarea
                {...register('content', { required: true })}
                placeholder="Tu comentario"
                className="w-full"
                rows={4}
              />
              {errors.content && (
                <span className="text-sm text-red-500">Este campo es requerido</span>
              )}
            </div>
            
            <Button type="submit">
              Publicar comentario
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {comments.map((comment) => (
          <Card key={comment._id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold">{comment.name}</h3>
                <span className="text-sm text-gray-500">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}


'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface Comment {
  _id: string;
  name: string;
  content: string;
  createdAt: string;
}

interface CommentsProps {
  postId: string;
  initialComments: Comment[];
}

interface CommentFormData {
  name: string;
  email: string;
  content: string;
}

export default function Comments({ postId, initialComments }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CommentFormData>()

  const onSubmit = async (data: CommentFormData) => {
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          postId,
          createdAt: new Date().toISOString(),
        }),
      })

      if (!response.ok) {
        throw new Error('Error al enviar el comentario')
      }

      const newComment = await response.json()
      setComments([newComment, ...comments])
      reset()
    } catch (error) {
      console.error('Error:', error)
      alert('Error al enviar el comentario. Por favor, inténtalo de nuevo.')
    }
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Comentarios</h2>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Deja un comentario</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input
                {...register('name', { required: 'El nombre es requerido' })}
                placeholder="Nombre"
                className="w-full"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <Input
                {...register('email', { 
                  required: 'El email es requerido',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Email inválido'
                  }
                })}
                type="email"
                placeholder="Email"
                className="w-full"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Textarea
                {...register('content', { required: 'El comentario es requerido' })}
                placeholder="Tu comentario"
                className="w-full"
                rows={4}
              />
              {errors.content && (
                <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
              )}
            </div>

            <Button type="submit">
              Enviar comentario
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {comments.map((comment) => (
          <Card key={comment._id}>
            <CardContent className="py-4">
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


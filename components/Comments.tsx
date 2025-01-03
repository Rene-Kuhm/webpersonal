'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { client } from '@/lib/sanity'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

type Comment = {
  _id: string
  name: string
  content: string
  createdAt: string
}

interface FormData {
  name: string
  email: string
  content: string
}

type CommentsProps = {
  postId: string
  initialComments: Comment[]
}

export default function Comments({ postId, initialComments }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    const newComment = {
      _type: 'comment',
      name: data.name,
      email: data.email,
      content: data.content,
      post: {
        _type: 'reference',
        _ref: postId,
      },
      createdAt: new Date().toISOString(),
    }

    const result = await client.create(newComment)
    setComments([...comments, { ...newComment, _id: result._id }])
    reset()
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Comentarios</h2>
      {comments.map((comment) => (
        <Card key={comment._id} className="mb-4">
          <CardHeader>
            <CardTitle>{comment.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{comment.content}</p>
            <p className="text-sm text-gray-500 mt-2">
              {new Date(comment.createdAt).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      ))}
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
        <Input
          {...register('name', { required: true })}
          placeholder="Nombre"
          className="mb-4"
        />
        {errors.name && <span className="text-red-500">Este campo es requerido</span>}
        <Input
          {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
          placeholder="Email"
          className="mb-4"
        />
        {errors.email && <span className="text-red-500">Por favor, introduce un email válido</span>}
        <Textarea
          {...register('content', { required: true })}
          placeholder="Tu comentario"
          className="mb-4"
        />
        {errors.content && <span className="text-red-500">Este campo es requerido</span>}
        <Button type="submit">Enviar comentario</Button>
      </form>
    </div>
  )
}


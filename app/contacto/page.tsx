'use client'

import { useState } from 'react'
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')

    try {
      const response = await fetch('/api/contacto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Error al enviar el mensaje')
      }

      // Remove the unused result variable
      await response.json()

      setSubmitMessage('¡Mensaje enviado con éxito! Me pondré en contacto contigo pronto.')
      setFormData({ nombre: '', email: '', mensaje: '' })
    } catch (error) {
      setSubmitMessage('Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.')
      console.error('Error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="py-16 bg-white dark:bg-gray-900">
      <div className="container px-4 mx-auto">
        <h1 className="mb-8 text-4xl font-bold text-center">Contacto</h1>
        
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="md:w-1/2">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="nombre" className="block mb-2 font-medium">Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 font-medium">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="mensaje" className="block mb-2 font-medium">Mensaje</label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-2 text-white transition duration-300 bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
              </button>
            </form>
            {submitMessage && (
              <p className="mt-4 text-green-600 dark:text-green-400">{submitMessage}</p>
            )}
          </div>
          <div className="md:w-1/2">
            <h2 className="mb-4 text-2xl font-semibold">Información de Contacto</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <FaEnvelope className="mr-2 text-blue-600" />
                <span>tu@email.com</span>
              </div>
              <div className="flex items-center">
                <FaPhone className="mr-2 text-blue-600" />
                <span>+54 123 456 789</span>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="mr-2 text-blue-600" />
                <span>Eduardo Castex - La Pampa, Argentina</span>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="mb-2 text-xl font-semibold">Horario de Atención</h3>
              <p>Lunes a Viernes: 7:00 AM - 18:00 PM</p>
              <p>Sábados: 9:00 AM - 13:00 PM</p>
              <p>Domingos: Cerrado</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from '@/hooks/use-toast'

interface MercadoPagoButtonProps {
  productId: string
  price: number
}

export function MercadoPagoButton({ productId, price }: MercadoPagoButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handlePayment = async () => {
    setIsLoading(true)
    try {
      console.log('Initiating payment request...', { productId, price })
      const response = await fetch('/api/create-preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, price }),
      })
      
      console.log('Response status:', response.status)
      
      const data = await response.json()
      console.log('Response data:', data)

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`)
      }
      
      if (!data.init_point) {
        throw new Error('No init_point received from the server')
      }
      
      console.log('Redirecting to Mercado Pago:', data.init_point)
      window.location.href = data.init_point
    } catch (error) {
      console.error('Error al iniciar el pago:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "No se pudo iniciar el pago. Por favor, intenta de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button onClick={handlePayment} disabled={isLoading}>
      {isLoading ? 'Procesando...' : 'Comprar ahora'}
    </Button>
  )
}


import { NextResponse } from 'next/server'
import { MercadoPagoConfig, Preference } from 'mercadopago'

if (!process.env.MERCADO_PAGO_ACCESS_TOKEN) {
  throw new Error('MERCADO_PAGO_ACCESS_TOKEN is not set')
}

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN!,
})

const preference = new Preference(client)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log('Received request body:', body)
    const { productId, price } = body

    if (!productId || typeof price !== 'number' || price <= 0) {
      return NextResponse.json(
        { error: 'Se requiere un productId válido y un precio mayor que 0' },
        { status: 400 }
      )
    }

    const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'

    const preferenceData = {
      items: [
        {
          id: productId,
          title: `Producto ${productId}`,
          currency_id: 'ARS',
          unit_price: price,
          quantity: 1,
          description: `Producto con ID ${productId}`,
        },
      ],
      back_urls: {
        success: `${baseUrl}/ventas/confirmacion/${productId}`, // Redirigir a la página de confirmación
        failure: `${baseUrl}/ventas/pago-fallido`, // Redirigir a la página de pago fallido
        pending: `${baseUrl}/ventas/pago-pendiente`, // Redirigir a la página de pago pendiente
      },
      auto_return: 'approved' as const,
    }

    console.log('Creating preference:', preferenceData)
    const response = await preference.create({ body: preferenceData })
    console.log('Mercado Pago response:', JSON.stringify(response, null, 2))
    
    if (!response.init_point) {
      throw new Error('No se recibió init_point desde Mercado Pago. Revisa la configuración de la preferencia.')
    }

    return NextResponse.json({ init_point: response.init_point })
  } catch (error) {
    console.error('Error al crear la preferencia:', error)
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Error desconocido al crear la preferencia de pago',
        details: error instanceof Error ? error.stack : null,
      },
      { status: 500 }
    )
  }
}
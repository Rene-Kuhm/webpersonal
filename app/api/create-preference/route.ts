import { NextResponse } from 'next/server'
import { MercadoPagoConfig, Preference } from 'mercadopago'

if (!process.env.MERCADO_PAGO_ACCESS_TOKEN) {
  console.error('MERCADO_PAGO_ACCESS_TOKEN is not set')
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

    if (!productId || typeof price !== 'number') {
      return NextResponse.json(
        { error: 'Invalid productId or price' },
        { status: 400 }
      )
    }

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
        success: `${process.env.NEXT_PUBLIC_URL}/success`,
        failure: `${process.env.NEXT_PUBLIC_URL}/failure`,
        pending: `${process.env.NEXT_PUBLIC_URL}/pending`,
      },
      auto_return: 'approved' as const,
    }

    console.log('Creating preference:', preferenceData)
    const response = await preference.create({ body: preferenceData })
    console.log('Mercado Pago response:', JSON.stringify(response, null, 2))
    
    if (!response.init_point) {
      throw new Error('No init_point received from Mercado Pago')
    }

    return NextResponse.json({ init_point: response.init_point })
  } catch (error) {
    console.error('Error al crear la preferencia:', error)
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Error desconocido al crear la preferencia de pago' 
      },
      { status: 500 }
    )
  }
}

import type { NextApiRequest, NextApiResponse } from 'next'
import { MercadoPagoConfig, Preference } from 'mercadopago'

if (!process.env.MERCADO_PAGO_ACCESS_TOKEN) {
  console.error('MERCADO_PAGO_ACCESS_TOKEN is not set')
}

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN!,
})

const preference = new Preference(client)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  try {
    console.log('Received request body:', req.body)
    const { productId, price } = req.body

    if (!productId || typeof price !== 'number') {
      return res.status(400).json({ error: 'Invalid productId or price' })
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

    res.status(200).json({ init_point: response.init_point })
  } catch (error) {
    console.error('Error al crear la preferencia:', error)
    res.status(500).json({ error: error instanceof Error ? error.message : 'Error desconocido al crear la preferencia de pago' })
  }
}


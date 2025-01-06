import { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

// Define el tipo para los datos del formulario
interface FormData {
  nombre: string
  email: string
  mensaje: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { nombre, email, mensaje }: FormData = req.body

    // Configura el transporter de Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // Puedes usar otro servicio como SendGrid, Mailgun, etc.
      auth: {
        user: process.env.EMAIL_USER, // Tu correo electrónico
        pass: process.env.EMAIL_PASS, // Tu contraseña o app password
      },
    })

    // Configura el correo electrónico
    const mailOptions = {
      from: email, // Correo del remitente
      to: process.env.EMAIL_USER, // Tu correo electrónico
      subject: `Nuevo mensaje de ${nombre}`, // Asunto del correo
      text: mensaje, // Cuerpo del correo en texto plano
      html: `<p>${mensaje}</p>`, // Cuerpo del correo en HTML
    }

    try {
      // Envía el correo electrónico
      await transporter.sendMail(mailOptions)
      res.status(200).json({ message: '¡Mensaje enviado con éxito!' })
    } catch (error) {
      console.error('Error al enviar el correo:', error)
      res.status(500).json({ message: 'Hubo un error al enviar el mensaje.' })
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' })
  }
}
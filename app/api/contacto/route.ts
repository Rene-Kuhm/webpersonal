import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Define el tipo para los datos del formulario
interface FormData {
  nombre: string;
  email: string;
  mensaje: string;
}

// Maneja solicitudes POST
export async function POST(request: Request) {
  const { nombre, email, mensaje }: FormData = await request.json();

  // Configura el transporter de Nodemailer
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // Puedes usar otro servicio como SendGrid, Mailgun, etc.
    auth: {
      user: process.env.EMAIL_USER, // Tu correo electrónico
      pass: process.env.EMAIL_PASS, // Tu contraseña o app password
    },
  });

  // Configura el correo electrónico
  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `Nuevo mensaje de ${nombre}`,
    text: `Has recibido un nuevo mensaje de contacto:
    
  Nombre: ${nombre}
  Email: ${email}
  Mensaje: ${mensaje}
  
  Fecha: ${new Date().toLocaleString()}
  `,
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="color: #4CAF50; text-align: center;">Nuevo mensaje de contacto</h2>
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin-top: 20px;">
          <p><strong>Nombre:</strong> ${nombre}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Mensaje:</strong> ${mensaje}</p>
        </div>
        <p style="text-align: center; margin-top: 20px; color: #777;">
          Fecha: ${new Date().toLocaleString()}
        </p>
      </div>
    `,
  };

  try {
    // Envía el correo electrónico
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: '¡Mensaje enviado con éxito!' }, { status: 200 });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    return NextResponse.json({ message: 'Hubo un error al enviar el mensaje.' }, { status: 500 });
  }
}

// Maneja otros métodos HTTP (opcional)
export async function GET() {
  return NextResponse.json({ message: 'Método no permitido' }, { status: 405 });
}

export async function PUT() {
  return NextResponse.json({ message: 'Método no permitido' }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ message: 'Método no permitido' }, { status: 405 });
}
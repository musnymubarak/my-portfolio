import nodemailer from 'nodemailer';

export async function POST(request) {
  const { email, subject, message } = await request.json();

  // Create a transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER, 
      pass: process.env.GMAIL_PASS, 
    },
  });

  let mailOptions = {
    from: process.env.GMAIL_USER, // sender address (your email)
    to: 'musnymohammed@gmail.com',
    subject: subject, 
    text: `You have received a new message from : ${email} \n\nSubject : ${subject}\n\nMessage : ${message}`, 
  };

  try {
    // Send mail with defined transport object
    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ message: 'Email sent successfully!' }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Failed to send email.' }), { status: 500 });
  }
}

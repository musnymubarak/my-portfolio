import nodemailer from 'nodemailer';

export async function POST(request) {
  const { email, subject, message } = await request.json();

  // Create a transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER, // Your Gmail address
      pass: process.env.GMAIL_PASS, // Your Gmail password or app-specific password
    },
  });

  // Set up email data
  let mailOptions = {
    from: email, // sender address
    to: 'musnymohammed@gmail.com', // list of receivers
    subject: subject, // Subject line
    text: message, // plain text body
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
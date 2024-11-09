const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

exports.contactForm = async (req, res) => {
  const { name, contact, email, service, message } = req.body; // Adjusted to match the field name 'service'

  // Create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
  });

  // Setup email data
  let mailOptions = {
    from: `"${name}" <${email}>`, // sender address
    to: 'rushikeshgbhand@gmail.com', // list of receivers
    subject: 'New Contact Us Form Submission', // Subject line
    text: `Name: ${name}\nContact Number: ${contact}\nEmail: ${email}\nService: ${service}\nMessage: ${message}`, // Use 'service' instead of 'services'
  };

  // Send email
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to send email' });
  }
};

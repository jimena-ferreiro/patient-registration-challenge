import { transporter } from '../middleware/email';

export const sendConfirmationEmail = async (email: string, fullName: string) => {
  try {
    await transporter.sendMail({
      from: '"Clinic App" <noreply@clinic.com>',
      to: email,
      subject: 'Registration Successful',
      text: `Hello ${fullName},\n\nYour registration was successful. Welcome!`,
      html: `<p>Hello <b>${fullName}</b>,</p><p>Your registration was successful. Welcome!</p>`,
    });

    console.log(`Confirmation email sent to ${email}`);
  } catch (error) {
    console.error('Error sending confirmation email:', error);
  }
};

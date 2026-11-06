// Sends reset links through Resend when configured, or prints them in the terminal during local development.
exports.sendPasswordReset = async (email, resetUrl) => {
  if (!process.env.RESEND_API_KEY || !process.env.EMAIL_FROM) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('RESEND_API_KEY and EMAIL_FROM are required for password recovery.');
    }
    console.log(`Local password reset link (expires in 30 minutes): ${resetUrl}`);
    return;
  }
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM,
      to: [email],
      subject: 'Reset your A Grain of Salt password',
      text: `Reset your password using this link: ${resetUrl}\n\nThis link expires in 30 minutes. If you did not request it, you can ignore this email.`
    }),
    signal: AbortSignal.timeout(10000)
  });
  if (!response.ok) throw new Error(`Email provider returned ${response.status}`);
};

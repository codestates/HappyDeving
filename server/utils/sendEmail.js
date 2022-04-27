const nodemailer = require("nodemailer");
// 현재는 text에 인증 주소만 넘어오는데 html로 꾸며야 한다.
module.exports = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: Number(process.env.EMAIL_PORT),
      secure: Boolean(process.env.SECURE),
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });
    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      text: text,
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.log("Email not sent");
    console.log(error);
  }
};

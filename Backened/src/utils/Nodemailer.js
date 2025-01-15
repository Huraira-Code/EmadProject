import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: true,
  port: 465,
  auth: {
    user: "k11662275@gmail.com",
    pass: "iwqcordsfkrvtwaj",
  },
});

const sendMail = async (to, sub, msg) => {
  try {
    transporter.sendMail({
      to: to,
      subject: sub,
      html: msg,
    });

    console.log("Email Sent");
  } catch (error) {
    console.log("sending mail error");
  }
};

export default sendMail;

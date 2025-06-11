const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

const sendEmailReminder = async (to, task) => {
  await transporter.sendMail({
    from: process.env.MAIL_USER,
    to,
    subject: `Reminder: ${task.title}`,
    text: `This is a reminder for your task: "${task.title}".\nDue: ${task.dueDate}`
  });
};

module.exports = sendEmailReminder;

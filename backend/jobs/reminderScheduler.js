const cron = require('node-cron');
const Reminder = require('../models/Reminder');
const Task = require('../models/Task');
const webPush = require('web-push');

webPush.setVapidDetails(
  'mailto:you@example.com',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

// Simulated notification function
const sendNotification = async (reminder, task) => {
  console.log(`🔔 Reminder: Task "${task.title}" is due!`);
  // trigger email, SMS, or push notification
  const sendEmailReminder = require('../utils/mailer');
  await sendEmailReminder(reminder.task.user.email, reminder.task);
  webPush.sendNotification(subscription, JSON.stringify({
    title: 'Task Reminder',
    body: `Don't forget: ${task.title}`,
    url: '/'
  }));
};

const checkReminders = async () => {
  const now = new Date();

  const reminders = await Reminder.find({
    remindAt: { $lte: now },
    sent: false
  }).populate('task');

  for (const reminder of reminders) {
    await sendNotification(reminder, reminder.task);
    reminder.sent = true;
    await reminder.save();
  }
};

// Run every minute
const startReminderJob = () => {
  cron.schedule('* * * * *', async () => {
    console.log('🔍 Checking reminders...');
    await checkReminders();
  });
};

module.exports = startReminderJob;

const Reminder = require('../models/Reminder');

exports.getReminders = async (req, res) => {
  const reminders = await Reminder.find().populate('taskId');
  res.json(reminders);
};

exports.createReminder = async (req, res) => {
  const { taskId, remindAt } = req.body;
  const reminder = await Reminder.create({ taskId, remindAt });
  res.status(201).json(reminder);
};

exports.deleteReminder = async (req, res) => {
  await Reminder.findByIdAndDelete(req.params.id);
  res.status(204).send();
};

const express = require('express')
const {
  getReminders,
  createReminder,
  deleteReminder
} = require('../controllers/reminderController');

const router = express.Router();

router.get('/', getReminders);
router.post('/', createReminder);
router.delete('/:id', deleteReminder);

module.exports = router;

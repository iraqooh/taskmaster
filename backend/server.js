console.log('Creating server object and dependencies')
const express = require('express')
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

console.log('Importing JWT Verification and routes')
const authRoutes = require('./routes/authRoutes')
const taskRoutes = require('./routes/taskRoutes')
const categoryRoutes = require('./routes/categoryRoutes');
const reminderRoutes = require('./routes/reminderRoutes');

console.log('Add environment to configuration')
dotenv.config()

console.log('Creating Express.js server application')
const app = express()

console.log('Add middleware to server object')
app.use(cors())
app.use(express.json())

console.log('Defining route blueprints')
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/tasks', taskRoutes)
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/reminders', reminderRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// const startReminderJob = require('./jobs/reminderScheduler');
// startReminderJob();

console.log('Starting connection to MongoDB database')
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Starting Express server')
        return app.listen(process.env.PORT, () => console.log(`Server running on http://localhost:${process.env.PORT}`))
    }).catch(err => console.error('err'))

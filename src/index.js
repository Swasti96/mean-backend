require('dotenv').config();
const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const path = require('path');

// Inicialization
app.set('port', process.env.PORT || 3000);

// Import routes
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');
const hospitalRoutes = require('./routes/hospital.routes');
const medicRoutes = require('./routes/medic.routes');
const seekerRoutes = require('./routes/seeker.routes');
const uploaderRoutes = require('./routes/uploads.routes');

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Database connection
dbConnection();

//Public
app.use(express.static(path.join(__dirname,'public')));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/login', authRoutes);
app.use('/api/hospitals', hospitalRoutes);
app.use('/api/medics', medicRoutes);
app.use('/api/all', seekerRoutes);
app.use('/api/upload', uploaderRoutes);

// Server connection
app.listen(app.get('port'), () => {
    console.log(`Server listening on port ${app.get('port')}`);
})

//mean_user
//cg2TbvZo9irIYmaZ
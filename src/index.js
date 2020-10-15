require('dotenv').config();
const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');
const app = express();

app.set('port', process.env.PORT || 3000);

const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');


app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/login', authRoutes);


dbConnection();
app.listen(app.get('port'), () => {
    console.log(`Server listening on port ${app.get('port')}`);
})

//mean_user
//cg2TbvZo9irIYmaZ
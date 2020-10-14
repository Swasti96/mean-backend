require('dotenv').config();
const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');
const app = express();

app.set('port', process.env.PORT || 3000);

app.use(cors());

dbConnection();
app.listen(app.get('port'), () => {
    console.log(`Server listening on port ${app.get('port')}`);
})

//mean_user
//cg2TbvZo9irIYmaZ
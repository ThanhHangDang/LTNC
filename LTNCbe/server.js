const cors = require('cors');
const express = require('express'); //gọi express bằng required
const router1 = require('./router.js');
const app = express(); //tạo ra 1 app bằng express
const port = 8000;
const corsConfig = require('./config/corsConfig.js');

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(cors(corsConfig));

app.use('/', router1) //sử dụng router1

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})
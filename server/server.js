
//Khởi tạo Express và các thư viện cần thiết
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const apiRouter = require('./routes');

// Cấu hình server
const app = express();
const port = process.env.PORT || 8080;
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true
};

// Middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

//  Định tuyến API
app.use('/api', apiRouter);

//  Xử lý lỗi
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send('Server đang bị lỗi. ');
});

//  Khởi động server
app.listen(port, () => {
  console.log(`Server đang chạy ở cổng ${port}...`);
});
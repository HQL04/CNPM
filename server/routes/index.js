// định nghĩa các route chính cho ứng dụng 

const express = require('express');
const user = require('./user');
const history = require('./history');
const print = require('./print');
const buy = require('./buy');
const report = require('./report');
const printer = require('./printer');

const router = express.Router();

router.get('/test', (req, res) => { // Kiểm tra xem server có hoạt động hay không
  res.send('Hoạt động tốt');
});

router.use('/user', user); //xử lý các route liên quan đến người dùng
router.use('/history', history); //xử lý các route liên quan đến lịch sử giao dịch
router.use('/print', print); //xử lý các yêu cầu liên quan đến in ấn.
router.use('/buy', buy); //xử lý các yêu cầu liên quan đến việc mua hàng.
router.use('/report',report); //xử lý các yêu cầu tạo báo cáo.
router.use('/printer',printer); //xử lý các yêu cầu liên quan đến máy in

module.exports = router;
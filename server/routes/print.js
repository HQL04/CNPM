const express = require('express');
const router = express.Router();
const printController = require('../controllers/PrintController');
let path = require("path"); // Import path module để xử lý đường dẫn file

// Kiểm tra hàm tồn tại trước khi sử dụng


// Endpoint để thêm file vào đơn in
router.post('/confirm', printController.addFileOrder);

// Endpoint để xem trạng thái đơn in theo ID
router.get('/status/:id', printController.showStatus);

// Endpoint để điều chỉnh trang của đơn in theo ID
router.put('/minusPages',printController.MinusPages);

// Endpoint để xem thông tin máy in
router.get('/getInfoPrinter',printController.showInfoPrinter);

module.exports = router;
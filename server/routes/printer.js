const express = require('express');
const router = express.Router();

const printerController = require('../controllers/PrinterController');

//Hiển thị tất cả các máy in
router.get('/', printerController.showAllPrinter);

//Thêm máy in mới
router.post('/add', printerController.addPrinter);

//Xóa máy in
router.put('/delete/:printer_id', printerController.deletePrinter);


//Tìm kiếm máy in theo id
router.get('/search',printerController.searchPrinter);

//Thông tin chi tiết của máy in
router.get('/getInfoPrinter/:printer_id',printerController.infoPrinter);


//Sửa thông tin của máy in
router.put('/edit/:printer_id', printerController.editPrinter);

//Kích hoạt máy in
router.put('/enable/:printer_id', printerController.enablePrinter);

//Vô hiệu hóa máy in
router.put('/disable/:printer_id', printerController.disablePrinter);


module.exports = router;
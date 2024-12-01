const express = require('express');
const router = express.Router();
const buyController = require('../controllers/BuyController');
const authenticate = require('../middlewares/authenticate');

router
  .route('/')
  .get(authenticate, buyController.getPurchasesByUserID)// Lấy danh sách các đơn mua của người dùng
  .put(authenticate, buyController.createNewPurchaseOrder);// Tạo đơn mua mới
router
  .route('/:id')
  .get(authenticate, buyController.getPurchaseByPurchaseID)// Lấy chi tiết đơn mua
  .post(authenticate, buyController.createNewPurchaseOrder);// Tạo đơn mua mới (có ID?)


// Chưa liên kết với authenticate
router.put('/buyPages',buyController.AddPages);

module.exports = router;
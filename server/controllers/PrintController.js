const {
  uploadDocument,
  addPrintOrder,
  ModifyBalance,
} = require("../models/PrintConfirm");
const { showInfoPrintOrder } = require("../models/PrintStatus");
const { show_All_Info_Printer } = require("../models/Printer");

//Xử lý việc thêm một đơn in mới và tài liệu liên quan đến đơn in
async function addFileOrder(req, res, next) {
  try {
    console.log(req.body);
    const result1 = await uploadDocument(req.body);
    req.body.document_id = result1.insertId;
    const result2 = await addPrintOrder(req.body);
    res.json(result2);
  } catch (err) {
    next(err);
  }
}

//Xử lý việc cập nhật trạng thái của đơn in và tài liệu liên quan đến đơn in
//Lấy thông tin trạng thái của đơn in dựa trên id của đơn in
async function showStatus(req, res, next) {
  try {
    const id = req.params.id;
    const result = await showInfoPrintOrder(id);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

//Cập nhật lại số dư (số trang) cho người dùng sau khi thực hiện in
async function MinusPages(req, res, next) {
  try {
    const result = await ModifyBalance(
      req.body.updatedBalance,
      req.body.user_id
    );
    res.json(result);
  } catch (err) {
    next(err);
  }
}

//Lấy thông tin của tất cả các máy in trong hệ thống
async function showInfoPrinter(req, res, next) {
  try {
    const result = await show_All_Info_Printer();
    res.json(result);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  addFileOrder,
  MinusPages,
  showStatus,
  showInfoPrinter,
};

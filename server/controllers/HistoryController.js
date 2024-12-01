const {
  getAllPrintOrders,
  getPrintOrdersByUserID,
  getPrintOrderByID,
} = require("../models/PrintOrder.js");

//Lấy tất cả các đơn in của người dùng dựa trên userID.
async function getAllPrintHistoryByUser(req, res, next) {
  try {
    if (!req.userInfo.id) {
      return res.status(400).send("User ID không đúng!");
    }

    const result = await getPrintOrdersByUserID(req.userInfo.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

//Lấy tất cả các đơn in từ toàn bộ hệ thống (cho SPSO - người giám sát hệ thống in)
async function getAllPrintHistoryBySPSO(req, res, next) {
  try {
    const result = await getAllPrintOrders();
    res.json(result);
  } catch (err) {
    next(err);
  }
}

//Lấy chi tiết đơn in dựa trên printID
async function getPrintOrderDetailByID(req, res, next) {
  try {
    const result = await getPrintOrderByID(req.params.printID);
    if (result.length === 0) {
      return res.status(404).json("Không có đơn in cho User này nha!");
    }

    //Tính toán tổng số trang in

    // Nếu pages_to_be_printed là "All", thì số trang in là no_of_pages.
    // Nếu pages_to_be_printed chứa các phạm vi trang (ví dụ "1-5, 7, 10-15"), thì tính tổng số trang dựa trên các phạm vi này.
    // Dựa vào số trang in, tính toán số lượng tờ in (với pages_per_sheet và side).
    // Nếu số lượng tờ in là lẻ, cộng thêm 1 để đảm bảo rằng số tờ in là chẵn.
    const data = result[0];

    totalPrintedPages = 0;
    if (data.pages_to_be_printed == "All") {
      totalPrintedPages = data.no_of_pages;
    } else {
      const printedPagesArr = data.pages_to_be_printed
        .split(",")
        .map((pageRange) => pageRange.trim());
      for (const pageRange of printedPagesArr) {
        const numbers = pageRange.split("-").map((num) => Number(num));
        const [startNumber, endNumber] = numbers;
        if (endNumber) totalPrintedPages += endNumber - startNumber + 1;
        else totalPrintedPages++;
      }
    }
    let count =
      data.side == 1
        ? Math.ceil(totalPrintedPages / data.pages_per_sheet) * 2
        : Math.ceil(totalPrintedPages / data.pages_per_sheet / 2);

    if (count % 2 == 1) {
      ++count;
    }
    data.total_no_of_printed_pages = count;

    // Send data
    res.json(data);
  } catch (err) {
    next(err);
  }
}



module.exports = {
  getAllPrintHistoryByUser,
  getAllPrintHistoryBySPSO,
  getPrintOrderDetailByID,

};

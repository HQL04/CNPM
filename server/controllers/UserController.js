const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  getCustomerByID,
  getCustomerByEmail,
  setCustomerLastUsed,
} = require("../models/Customer");
const {
  getSPSOByID,
  getSPSOByUsername,
  setSPSOLastUsed,
} = require("../models/SPSO");

// Đăng nhập cho khách hàng (customer)
async function loginCustomer(req, res, next) {
  try {
    const result = await getCustomerByEmail(req.body.email);

    if (!result) {
      return res.status(400).send("Email không tồn tại!");
    }

    // So sánh mật khẩu trực tiếp
    if (req.body.password !== result.password) {
      return res.status(401).send("Sai mật khẩu! Vui lòng thử lại.");
    }

    const token = jwt.sign(
      {
        id: result.customer_id,
        isSPSO: false,
        type: result.type,
      },
      "the-super-strong-secret",
      { expiresIn: "1h" }
    );

    await setCustomerLastUsed(result.email);

    delete result.password;
    res
      .cookie("auth", token, { maxAge: 3600 * 1000, path: "/" }) // Cookies valid for 1 hour
      .json({ message: "Đăng nhập thành công!", userInfo: result, token });
  } catch (err) {
    next(err);
  }
}

// Đăng nhập cho nhân viên SPSO

async function loginSPSO(req, res, next) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .send("Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.");
    }

    const result = await getSPSOByUsername(username);

    // Kiểm tra username tồn tại
    if (!result) {
      return res
        .status(400)
        .send("Tên đăng nhập không tồn tại. Vui lòng thử lại.");
    }

    // So sánh mật khẩu trực tiếp
    if (password !== result.password) {
      return res.status(401).send("Sai mật khẩu! Vui lòng thử lại.");
    }

    const token = jwt.sign(
      {
        id: result.spso_id,
        isSPSO: true,
        username: result.username,
      },
      "the-super-strong-secret",
      { expiresIn: "1h" }
    );

    // Cập nhật thời gian sử dụng cuối
    await setSPSOLastUsed(result.username);

    // Xóa mật khẩu trước khi gửi response
    delete result.password;

    res.cookie("auth", token, { maxAge: 3600 * 1000, path: "/" }).json({
      message: "Đăng nhập thành công!",
      userInfo: result,
      token: token,
    });
  } catch (err) {
    next(err);
  }
}

//Lấy thông tin người dùng dựa trên user_id (customer hoặc SPSO)
async function getUserByID(req, res, next) {
  try {
    const { id, isSPSO } = req.userInfo;

    if (!id || isSPSO === undefined) {
      return res.status(404).send("Không có dữ liệu người dùng!");
    }

    let result;
    if (isSPSO) {
      result = await getSPSOByID(id);
    } else {
      result = await getCustomerByID(id);
    }

    if (!result) {
      return res.status(400).send("Không tìm thấy thông tin");
    }

    // Xóa mật khẩu và format ngày tháng
    delete result.password;
    result.last_used = new Date(result.last_used);

    res.json(result);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  loginCustomer,
  loginSPSO,
  getUserByID,
};

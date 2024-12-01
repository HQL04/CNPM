const db = require("../config/db");

//Lấy thông tin của một khách hàng từ cơ sở dữ liệu dựa trên customer_id
async function getCustomerByID(id) {
  try {
    const [result] = await db.execute(
      "SELECT * FROM customer WHERE customer_id = ?",
      [id]
    );
    return result[0];
  } catch (err) {
    throw err;
  }
}
//Lấy thông tin của một khách hàng dựa trên địa chỉ email
async function getCustomerByEmail(email) {
  try {
    const [result] = await db.execute(
      "SELECT * FROM customer WHERE email = ?",
      [email]
    );
    return result[0];
  } catch (err) {
    throw err;
  }
}
//Cập nhật thời gian sử dụng cuối cùng (last_used) của khách hàng trong cơ sở dữ liệu.
async function setCustomerLastUsed(email) {
  try {
    const [result] = await db.execute(
      "UPDATE customer SET last_used = now() WHERE email = ?",
      [email]
    );
    return result;
  } catch (err) {
    throw err;
  }
}
//Lấy số dư tài khoản của khách hàng từ cơ sở dữ liệu
async function getBalance(id) {
  try {
    const [result] = await db.execute(
      `SELECT balance FROM customer WHERE customer_id = ?`,
      [id]
    );
    return result[0].balance;
  } catch (err) {
    throw err;
  }
}
//Cập nhật số dư tài khoản của khách hàng.
async function updateBalance(id, addedBalance) {
  try {
    const cur_balance = await getBalance(id);

    const updatedBalance = cur_balance + Number(addedBalance);

    const [result] = await db.execute(
      "UPDATE customer SET balance = ? WHERE customer_id = ?",
      [updatedBalance, id]
    );
    return result;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getCustomerByID,
  getCustomerByEmail,
  setCustomerLastUsed,
  getBalance,
  updateBalance,
};

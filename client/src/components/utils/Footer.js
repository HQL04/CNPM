import React from 'react';

const Footer = () => {
  return (
    <div className="bg-dark text-light">
      <div className="container py-4">
        <div className="row">
          <div className="col-md-6">
            <h3 className="fw-medium mb-2">Tổ kỹ thuật P.ĐT / Technician</h3>
            <p>Email: ddthu@hcmut.edu.vn</p>
            <p>ĐT (Tel.): (84-8) 38647256 - 5258</p>
          </div>
          
          <div className="col-md-6">
            <p className="mb-2">
              Quý Thầy/Cô chưa có tài khoản (hoặc quên mật khẩu) nhà trường vui lòng liên hệ Trung tâm Dữ liệu & Công nghệ Thông tin, phòng 109A5 để được hỗ trợ.
              (For HCMUT account, please contact to : Data and Information Technology Center)
            </p>
            <p>Email: dl-cntt@hcmut.edu.vn</p>
            <p>ĐT (Tel.): (84-8) 38647256 - 5200</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
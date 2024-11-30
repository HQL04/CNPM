import { Link } from 'react-router-dom';
import logo_BK from '../../assets/img/logo_BK.png';

function LoginRole() {
  const style = {
    backgroundColor: 'var(--color-bk1)',
    lineHeight: '1.2'
  };
  
  return (
    <div className='d-flex row text-center px-4 px-lg-0 mx-auto justify-content-center align-items-center'>
      <div className='col-12 d-flex justify-content-center align-items-center '>
        <img
          src={logo_BK}
          alt='Logo BK'
          width={100}
          height={100} 
        />
      </div>
      <div className='border-top my-4'></div>
      <h4 className='col-12 fw-bold text-secondary text-start p-0'>Đăng nhập dành cho</h4>
      <Link 
        to='/login/customer' 
        className='col-12 btn text-white my-2' 
        style={style}
      >
        Cán bộ/Sinh viên trường ĐH Bách Khoa TPHCM
      </Link>
      <Link 
        to='/login/spso' 
        className='col-12 btn text-white my-2' 
        style={style}
      >
        Quản trị hệ thống SPSO
      </Link>
    </div>
  );
}

export default LoginRole;
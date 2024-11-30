import { useContext, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import homeBG from "../assets/img/home_bg.png";
import homwpage from "../assets/img/homepage0.png";

function Home() {
  return (
    <div className="homepage0 bg-primary-subtle  " style={{ backgroundColor: '#F4E7FB', color: 'white' }}>
      <h1
        className="mt-5 mb-5 text-center fw-bolder text-primary"
        style={{ 
          fontSize: "72px",
          letterSpacing: "tight",
          lineHeight: "96px"
        }}
      >
        WELCOME TO SSPS
      </h1>
      <div class="d-flex justify-content-center h-300">
        <div class="rounded-3 padding-6 bg-primary-subtle" style={{ borderRadius:"40px" }} >
          <img src={homwpage} alt="homepage0" className="h-150" />
        </div>
      </div>
      <h2 class="text-center mt-5 font-weight-bold text-primary fw-bolder" style={{ fontSize: "32px" }} >Dịch vụ in ấn thông minh cho sinh viên Bách Khoa</h2>
  <br/>
  <br/>
    </div>
  );
}

export default Home;

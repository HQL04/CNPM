import logo_BK from "../../assets/img/logo_BK.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { User, Lock, AlertCircle } from "lucide-react";

function LoginForm({ role }) {
  const url = `${process.env.REACT_APP_SERVER_URL}/user/login/${role}`;
  const [formValue, setFormValue] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);
  const [showErrors, setShowErrors] = useState(false);

  useEffect(() => {
    let newErrors = [];
    if (formValue.username === "") {
      newErrors.push("Hãy nhập tên tài khoản của bạn.");
    }
    if (formValue.password === "") {
      newErrors.push("Hãy nhập mật khẩu của bạn.");
    }

    setErrors(newErrors);
  }, [formValue]);

  const handleChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
    setShowErrors(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (errors.length > 0) {
      setShowErrors(true);
      return;
    }

    try {
      const requestedName = role === "customer" ? "email" : "username";
      const validation = await axios.post(
        url,
        {
          [requestedName]: formValue.username,
          password: formValue.password,
        },
        {
          withCredentials: true,
        }
      );
      localStorage.setItem(
        "userCredentials",
        JSON.stringify({
          token: validation.data.token,
          isSPSO: role === "spso",
        })
      );
      localStorage.setItem("files", JSON.stringify([]));
      window.location.assign("/");
    } catch (error) {
      if (error.response) {
        if (error.response.status >= 400 && error.response.status < 500) {
          setErrors(["Các thông tin mà bạn cung cấp không đúng."]);
        }
        if (error.response.status === 500) {
          setErrors([error.response.data]);
        }
      } else {
        setErrors(["Không kết nối được đến server!"]);
      }
      setShowErrors(true);
    }
  };

  return (
    <div className="row text-center px-4 px-lg-0 ">
      <div className="col-12 justify-content-center align-items-center d-flex">
        <img src={logo_BK} alt="Logo BK" width={100} height={100} />
      </div>
      <div className="border-top mt-4 mb-3"></div>
      <h4 className="col-12 fw-bold p-0 mb-0">Đăng nhập HCMUT-SPSS</h4>

      {role === "customer" && <p className="col-12 mt-1"></p>}

      <form className="col-12 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="relative">
            <label htmlFor="username" className="form-label fw-bold mb-1">
              {role === "customer" ? "Email" : "Tên đăng nhập"}
            </label>
            {/* <div className="absolute left-9 top-3 text-gray-400">
              <User size={20} />
            </div> */}
            <input
              type="text"
              name="username"
              placeholder="Tên đăng nhập"
              className="form-control w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              id="username"
              onChange={handleChange}
            />
          </div>

          <div className="relative">
            <label htmlFor="password" className="form-label fw-bold mb-1">
              Mật khẩu
            </label>
            {/* <div className="absolute left-3 top-3 text-gray-400">
              <Lock size={20} />
            </div> */}
            <input
              type="password"
              className="form-control w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Mật khẩu"
              id="password"
              name="password"
              onChange={handleChange}
            />
          </div>
        </div>
        {errors.length > 0 && (
          <div
            className="alert alert-danger py-3 "
            role="alert"
            style={{ display: showErrors ? "block" : "none" }}
          >
            {errors.map((value, index) => (
              <p key={index} className="m-0">
                {value}
              </p>
            ))}
          </div>
        )}

        <button
          type="submit"
          className="btn btn-primary fw-bold d-block mx-auto mt-5 w-50"
          style={{ backgroundColor: "var(--color-bk1)" }}
        >
          Đăng nhập
        </button>
      </form>
    </div>
  );
}

export default LoginForm;

import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import show from "../../assets/icons/show.svg";
import hide from "../../assets/icons/hide.svg";
import successIcon from "../../assets/icons/success-icon.svg";
import errorIcon from "../../assets/icons/error-icon.svg";
import Button from "../../components/ui/button/Button";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data } = await api.post("/admin/auth/login", {
        email,
        password,
      });

      sessionStorage.setItem("accessToken", data.accessToken);
      navigate("/admin");
    } catch (error: any) {
      setError(error.response.data.massage);
    }
  };

  return (
    <div className="login">
      <h1 className="login-logo">ANDIJON MEBEL</h1>
      <p className="login-title">
        Andijon Mebel mahsulotlarini boshqarish platformasi
      </p>

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Login</label>
          <input
            type="email"
            placeholder="example@mail.com"
            value={email}
            onChange={(e) => {
              const inputEmail = e.target.value;
              setEmail(inputEmail);
              setIsEmailValid(validateEmail(inputEmail));
            }}
          />
          {email.length > 0 && (
            <img
              src={isEmailValid ? successIcon : errorIcon}
              alt="email-icon"
              className="email-icon"
            />
          )}
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Parol"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <img
            src={showPassword ? show : hide}
            alt="toggle-password"
            className="password-icon"
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>

        {error && <div className="login-error">{error}</div>}

        <Button type="submit" label="LOG IN" variant="success" />
      </form>
    </div>
  );
};

export default Login;

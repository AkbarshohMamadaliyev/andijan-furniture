import "./NotFound.css";
import Button from "../../components/ui/button/Button";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="error">
      <h1 className="error-code">404</h1>
      <p className="error-message">
        Kechirasiz, xatolik yuz berdi. Sahifa topilmadi.
      </p>
      <Link to="/" className="error-button">
        <Button type="submit" label="BOSH SAHIFA" variant="success" />
      </Link>
    </div>
  );
};

export default NotFound;

import "./Button.css";

type ButtonVariant = "primary" | "secondary" | "success" | "danger";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: ButtonVariant;
}

const Button: React.FC<ButtonProps> = ({ label, variant = "primary", ...props }) => {
  return (
    <button className={`app-button ${variant}`} {...props}>
      {label}
    </button>
  );
};

export default Button;

import { ButtonProps } from "../utils/types";

export default function Button({
  variant,
  size,
  onClick,
  children,
  type,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`button ${variant} ${size}-button`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

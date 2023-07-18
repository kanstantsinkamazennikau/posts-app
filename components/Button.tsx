import { IconType } from "react-icons/lib";

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  label: string;
  icon?: IconType;
  outline?: boolean;
}

export default function Button({
  onClick,
  disabled,
  label,
  icon: Icon,
  outline,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${
        outline ? "button_outline" : "button"
      } flex justify-center items-center`}
    >
      {Icon && <Icon size={20} className="mr-2"></Icon>}
      {label}
    </button>
  );
}

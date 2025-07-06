// Utils
import { cn } from "@/utils/app.util";

const Button = ({
  children,
  className,
  fullWidth,
  onClick,
  testId = "button",
  variant,
}) => (
  <button
    onClick={onClick}
    data-testid={testId}
    className={cn(
      "flex items-center justify-center gap-2",
      "h-10 shrink-0 cursor-pointer rounded-[48px] px-4 font-medium",
      "bg-transparent transition-colors",
      variant === "primary" &&
        "bg-[var(--primary-button-background)] text-[var(--white)]",
      variant === "outline" &&
        "border-2 border-[var(--primary-button-background)] text-[var(--primary-button-background)]",
      fullWidth && "w-full",
      className,
    )}
  >
    {children}
  </button>
);

export { Button };

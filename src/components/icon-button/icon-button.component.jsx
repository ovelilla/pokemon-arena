// Utils
import { cn } from "@/utils/app.util";

const IconButton = ({ ariaLabel, children, className, onClick }) => (
  <button
    aria-label={ariaLabel}
    className={cn(
      "cursor-pointer rounded-full bg-[var(--ghost-button-background)] p-2 text-[var(--text)]",
      className,
    )}
    onClick={onClick}
  >
    {children}
  </button>
);

export { IconButton };

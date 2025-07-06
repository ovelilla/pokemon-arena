// Constants
import { TYPE_BG_CLASSES } from "@/constants/app.constants";
// Utils
import { capitalize, cn } from "@/utils/app.util";
import { getTypeIconColor } from "./utils/type.util";

const Type = ({ className, type }) => (
  <span
    className={cn(
      "flex h-8 w-full items-center gap-2 rounded-full pr-4 pl-1 text-sm font-medium",
      TYPE_BG_CLASSES[type.name],
      className,
    )}
  >
    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[var(--white)] text-[var(--white)]">
      <img
        width={20}
        height={20}
        alt={type.name}
        src={getTypeIconColor(type.name)}
      />
    </span>
    {capitalize(type.name)}
  </span>
);

export { Type };

// Components
import { IconButton } from "@/components/icon-button/icon-button.component";
import { Button } from "@/components/button/button.component";
import { Type } from "@/components/type/type.component";
// Hooks
import { useFilters } from "./hooks/use-filters.hook";
// Icons
import { RotateCcw, SlidersHorizontal, X } from "lucide-react";
// Utils
import { cn } from "@/utils/app.util";

const FiltersComponent = () => {
  const {
    close,
    isError,
    isLoading,
    isOpen,
    resetTypes,
    selectedTypes,
    toggleType,
    types,
  } = useFilters();

  return (
    <div
      className={cn(
        "invisible fixed inset-0 z-30 row-span-3 h-dvh w-full self-start bg-[var(--overlay-background)] lg:visible lg:sticky lg:top-20 lg:h-auto lg:bg-transparent",
        isOpen && "visible",
      )}
      onClick={close}
    >
      <div
        className="flex h-full w-full max-w-72 flex-col gap-6 overflow-auto bg-[var(--container-background)] p-4 lg:max-h-[calc(100dvh-96px)] lg:translate-x-0 lg:rounded-2xl lg:shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-2">
          <h3 className="flex flex-1 items-center justify-between gap-2 text-2xl font-semibold text-[var(--text)]">
            <span>Filters</span>
            <SlidersHorizontal className="h-5 w-5" />
          </h3>

          <IconButton className="lg:hidden" onClick={close}>
            <X className="h-6 w-6" />
          </IconButton>
        </div>

        <section className="flex flex-col gap-3">
          <h4 className="text-base font-semibold text-[var(--text)]">Types</h4>

          <ul className="grid list-none grid-cols-2 gap-1">
            {isLoading && <li>Loading...</li>}

            {isError && <li>Error loading types</li>}

            {!isLoading &&
              !isError &&
              types.map((type) => (
                <li key={type.name}>
                  <input
                    checked={selectedTypes.includes(type.name)}
                    className="peer hidden"
                    id={type.name}
                    onChange={() => toggleType(type.name)}
                    type="checkbox"
                    value={type.name}
                  />
                  <label
                    htmlFor={type.name}
                    className="flex w-full cursor-pointer rounded-full border-3 border-transparent p-0.5 peer-checked:border-slate-300"
                  >
                    <Type type={type} />
                  </label>
                </li>
              ))}
          </ul>
        </section>

        <Button variant="primary" fullWidth onClick={resetTypes}>
          <RotateCcw className="h-5 w-5" />
          <span>Reset filters</span>
        </Button>
      </div>
    </div>
  );
};

export { FiltersComponent };

// Assets
import pokeball from "@/assets/pokeball.svg";
// Icons
import { X } from "lucide-react";
// Utils
import { cn } from "@/utils/app.util";

const SlotComponent = ({ pokemon, isFainted = false }) => {
  return (
    <div className="relative flex aspect-[1/1] w-full items-center justify-center">
      {pokemon ? (
        <>
          <img
            src={pokemon.sprite}
            alt={pokemon.name}
            className={cn("h-full w-full object-contain", {
              grayscale: isFainted,
            })}
            loading="lazy"
          />
          {isFainted && (
            <div className="bg-opacity-30 absolute inset-0 flex items-center justify-center text-xs font-bold text-red-600">
              <X className="h-20 w-20" />
            </div>
          )}
        </>
      ) : (
        <img
          src={pokeball}
          alt="pokeball"
          className="h-3/4 w-3/4 object-contain opacity-50 grayscale"
        />
      )}
    </div>
  );
};

export { SlotComponent };

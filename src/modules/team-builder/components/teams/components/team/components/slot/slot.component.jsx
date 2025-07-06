// Vendors
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
// Assets
import pokeball from "@/assets/pokeball.svg";
// Hooks
import { useSlot } from "./hooks/use-slot.hook";
// Utils
import { cn } from "@/utils/app.util";

const SlotComponent = ({ id, pokemon, team }) => {
  const { handleClick } = useSlot({ pokemon, team });
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "flex aspect-[1/1] w-full items-center justify-center",
        pokemon ? "cursor-move" : "cursor-default",
      )}
      onClick={handleClick}
    >
      {pokemon ? (
        <img
          src={pokemon.sprite}
          alt={pokemon.name}
          className="h-full w-full object-contain"
          loading="lazy"
        />
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

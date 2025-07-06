// Vendors
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
// Components
import { IconButton } from "@/components/icon-button/icon-button.component";
import { SlotComponent } from "./components/slot/slot.component";
// Hooks
import { useTeam } from "./hooks/use-team.hook";
// Icons
import { ArrowDownWideNarrow, Dices, Save, Trash2 } from "lucide-react";

const TeamComponent = ({ team }) => {
  const {
    handleBlur,
    handleChange,
    handleClick,
    handleDiscard,
    handleDragEnd,
    handleKeyDown,
    handleRandomize,
    handleSave,
    handleSort,
    ids,
    isEditing,
    sensors,
    tempName,
  } = useTeam({ team });

  return (
    <div key={team.id} className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-4">
        {isEditing ? (
          <input
            type="text"
            value={tempName}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="w-full rounded bg-transparent px-2 py-1 text-[var(--text)] outline-none focus:ring-2 focus:ring-slate-300"
            autoFocus
          />
        ) : (
          <span
            className="w-full cursor-text truncate overflow-hidden rounded bg-transparent px-2 py-1 whitespace-nowrap text-[var(--text)] ring-offset-0 outline-none focus:ring-2 focus:ring-slate-300"
            onClick={handleClick}
          >
            {team.name}
          </span>
        )}

        <div className="flex gap-2">
          <IconButton ariaLabel="Randomize" onClick={handleRandomize}>
            <Dices className="size-6 text-[var(--text-muted)]" />
          </IconButton>
          <IconButton ariaLabel="Sort" onClick={handleSort}>
            <ArrowDownWideNarrow className="size-6 text-[var(--text-muted)]" />
          </IconButton>
          <IconButton ariaLabel="Discard" onClick={handleDiscard}>
            <Trash2 className="size-6 text-[var(--text-muted)]" />
          </IconButton>
          {team.isDraft && (
            <IconButton ariaLabel="Randomize" onClick={handleSave}>
              <Save className="size-6 text-[var(--text-muted)]" />
            </IconButton>
          )}
        </div>
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={ids} strategy={rectSortingStrategy}>
          <div className="grid touch-none grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => {
              const pokemon = team.pokemons[i];
              const id = pokemon?.id ?? `empty-${i}`;
              return (
                <SlotComponent key={id} id={id} pokemon={pokemon} team={team} />
              );
            })}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export { TeamComponent };

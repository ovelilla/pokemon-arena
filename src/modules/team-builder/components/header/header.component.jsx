// Components
import { IconButton } from "@/components/icon-button/icon-button.component";
// Icons
import { Search, Shield, SlidersHorizontal } from "lucide-react";
// Stores
import { useFiltersStore } from "@/stores/filters/filters.store";
import { useSearchStore } from "@/stores/search/search.store";
import { useTeamsStore } from "@/stores/teams/teams.store";

const HeaderComponent = () => {
  const { searchText, setSearchText } = useSearchStore();
  const { open: openFilter } = useFiltersStore();
  const { open: openTeams } = useTeamsStore();
  return (
    <div className="sticky top-20 z-20 col-span-3 flex gap-4 lg:col-span-1 lg:gap-0">
      <div className="flex h-12 w-full items-center gap-4 rounded-full bg-[var(--search-field-background)] px-4">
        <Search className="size-6 text-[var(--text-muted)]" />
        <input
          aria-label="Search for a Pokemon"
          name="search"
          placeholder="Search for a Pokemon"
          type="text"
          className="w-full border-none bg-transparent text-[var(--text-muted)] focus:outline-none"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-2">
        <IconButton
          ariaLabel="Filters"
          className="lg:hidden"
          onClick={openFilter}
        >
          <SlidersHorizontal className="size-6 text-[var(--text-muted)]" />
        </IconButton>
        <IconButton
          ariaLabel="Filters"
          className="lg:hidden"
          onClick={openTeams}
        >
          <Shield className="size-6 text-[var(--text-muted)]" />
        </IconButton>
      </div>
    </div>
  );
};

export { HeaderComponent };

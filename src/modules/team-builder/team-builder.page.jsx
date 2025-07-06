// Components
import { DetailComponent } from "@/modules/team-builder/components/detail/detail.component";
import { FiltersComponent } from "@/modules/team-builder/components/filters/filters.component";
import { HeaderComponent } from "@/modules/team-builder/components/header/header.component";
import { PokemonListComponent } from "@/modules/team-builder/components/pokemon-list/pokemon-list.component";
import { TeamsComponent } from "@/modules/team-builder/components/teams/teams.component";

const TeamBuilderPage = () => {
  return (
    <div className="flex flex-1 justify-center">
      <div className="w- grid w-full max-w-[var(--maxWidth)] grid-rows-[48px_1fr] gap-4 px-4 lg:grid-cols-[288px_1fr_400px]">
        <FiltersComponent />
        <HeaderComponent />
        <TeamsComponent />
        <PokemonListComponent />
      </div>
      <DetailComponent />
    </div>
  );
};

export default TeamBuilderPage;

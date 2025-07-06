// Icons
import { Weight, Ruler } from "lucide-react";

const DAMAGES = [
  { titleText: "Strengths", relationType: "double_damage_to" },
  { titleText: "Weaknesses", relationType: "double_damage_from" },
];

const GIRD_ITEMS = [
  { name: "weight", text: "Weight", icon: Weight, unit: "kg" },
  { name: "height", text: "Height", icon: Ruler, unit: "m" },
];

const HEADER_FROM_CLASSES = {
  bug: "from-[var(--bug)]",
  dark: "from-[var(--dark)]",
  dragon: "from-[var(--dragon)]",
  electric: "from-[var(--electric)]",
  fairy: "from-[var(--fairy)]",
  fighting: "from-[var(--fighting)]",
  fire: "from-[var(--fire)]",
  flying: "from-[var(--flying)]",
  ghost: "from-[var(--ghost)]",
  grass: "from-[var(--grass)]",
  ground: "from-[var(--ground)]",
  ice: "from-[var(--ice)]",
  normal: "from-[var(--normal)]",
  poison: "from-[var(--poison)]",
  psychic: "from-[var(--psychic)]",
  rock: "from-[var(--rock)]",
  steel: "from-[var(--steel)]",
  water: "from-[var(--water)]",
};

const BG_CLASSES = {
  bug: "bg-[var(--bug)]",
  dark: "bg-[var(--dark)]",
  dragon: "bg-[var(--dragon)]",
  electric: "bg-[var(--electric)]",
  fairy: "bg-[var(--fairy)]",
  fighting: "bg-[var(--fighting)]",
  fire: "bg-[var(--fire)]",
  flying: "bg-[var(--flying)]",
  ghost: "bg-[var(--ghost)]",
  grass: "bg-[var(--grass)]",
  ground: "bg-[var(--ground)]",
  ice: "bg-[var(--ice)]",
  normal: "bg-[var(--normal)]",
  poison: "bg-[var(--poison)]",
  psychic: "bg-[var(--psychic)]",
  rock: "bg-[var(--rock)]",
  steel: "bg-[var(--steel)]",
  water: "bg-[var(--water)]",
};

const BG_MUTED_CLASSES = {
  bug: "bg-[var(--bug-muted)]",
  dark: "bg-[var(--dark-muted)]",
  dragon: "bg-[var(--dragon-muted)]",
  electric: "bg-[var(--electric-muted)]",
  fairy: "bg-[var(--fairy-muted)]",
  fighting: "bg-[var(--fighting-muted)]",
  fire: "bg-[var(--fire-muted)]",
  flying: "bg-[var(--flying-muted)]",
  ghost: "bg-[var(--ghost-muted)]",
  grass: "bg-[var(--grass-muted)]",
  ground: "bg-[var(--ground-muted)]",
  ice: "bg-[var(--ice-muted)]",
  normal: "bg-[var(--normal-muted)]",
  poison: "bg-[var(--poison-muted)]",
  psychic: "bg-[var(--psychic-muted)]",
  rock: "bg-[var(--rock-muted)]",
  steel: "bg-[var(--steel-muted)]",
  water: "bg-[var(--water-muted)]",
};

export {
  BG_CLASSES,
  BG_MUTED_CLASSES,
  DAMAGES,
  GIRD_ITEMS,
  HEADER_FROM_CLASSES,
};

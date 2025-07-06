// Vendors
import { useQuery } from "@tanstack/react-query";
// API
import { fetchTypes } from "../api/fetch-type.api";
// Stores
import { useFiltersStore } from "@/stores/filters/filters.store";

const useFilters = () => {
  const { close, isOpen, resetTypes, selectedTypes, toggleType } =
    useFiltersStore();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["types"],
    queryFn: fetchTypes,
    staleTime: 1000 * 60 * 10,
  });

  const filteredTypes = data?.results
    .filter((type) => !["stellar", "unknown"].includes(type.name))
    .sort((a, b) => a.name.localeCompare(b.name));

  return {
    close,
    isError,
    isLoading,
    isOpen,
    resetTypes,
    selectedTypes,
    toggleType,
    types: filteredTypes,
  };
};

export { useFilters };

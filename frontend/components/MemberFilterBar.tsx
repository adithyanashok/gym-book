// components/FilterBar.tsx
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import FilterButton from "./MemberFilterButton";
import { PlanData } from "@/types/plan.type";

interface FilterBarProps {
  activeFilter: number;
  onFilterChange: (filter: number) => void;
  filters: PlanData[];
}

const FilterBar: React.FC<FilterBarProps> = ({
  activeFilter,
  onFilterChange,
  filters,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.filterContainer}
      contentContainerStyle={styles.filterContent}
    >
      <FilterButton
        key={0}
        label={"All"}
        isActive={activeFilter === 0}
        onPress={() => onFilterChange(0)}
      />
      {filters.map((filter) => (
        <FilterButton
          key={filter.id}
          label={filter.name}
          isActive={activeFilter === filter.id}
          onPress={() => onFilterChange(filter.id)}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    marginVertical: 16,
  },
  filterContent: {
    paddingHorizontal: 16,
  },
});

export default FilterBar;

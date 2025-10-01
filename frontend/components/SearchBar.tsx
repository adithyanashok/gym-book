import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import React, { useCallback, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { debounce } from "lodash";
import { fetchMembers } from "@/store/slices/membersSlice";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleSearch = (value: string) => {
    setSearchQuery(value);

    debouncedSearch(value);
  };

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      dispatch(fetchMembers({ page: 1, limit: 20, query }));
    }, 300),
    [dispatch]
  );

  return (
    <View style={styles.searchContainer}>
      <Ionicons
        name="search"
        size={20}
        color="#6B7280"
        style={styles.searchIcon}
      />
      <TextInput
        style={styles.searchInput}
        placeholder="Search members by name or phone"
        placeholderTextColor="#9CA3AF"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      {searchQuery.length > 0 && (
        <TouchableOpacity onPress={() => setSearchQuery("")}>
          <Ionicons name="close-circle" size={20} color="#9CA3AF" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    margin: 16,
    marginBottom: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#111827",
  },
});

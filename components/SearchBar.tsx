import * as React from "react";

import SearchIcon from "../assets/search-icon.svg";
import { TextInput, View } from "react-native";

export const SearchBar = () => (
  <View className="flex-row items-center bg-grey-4 rounded-2xl h-10 px-3">
    <SearchIcon width={24} height={24} />
    <TextInput placeholder="Search" placeholderTextColor="#999" className="flex-1 ml-2 text-lg text-black" />
  </View>
);

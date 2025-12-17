import * as React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import type { Tag } from "../types";

import ColorTagIcon from "../assets/color-tag-icon.svg";
import DeleteTagIcon from "../assets/delete-tag-icon.svg";

interface TagListProps {
  tags: Tag[];
  selectedTagIds: string[];
  onPressTag: (id: string) => void;
}

export const TagList = React.memo(({ tags, selectedTagIds, onPressTag }: TagListProps) => {
  const renderTagItem = ({ item }: { item: Tag }) => {
    const isSelected = selectedTagIds.includes(item.id);
    return (
      <TouchableOpacity
        onPress={() => onPressTag(item.id)}
        activeOpacity={0.7}
        className="flex-row items-center rounded-full px-3 py-1 border"
        style={{
          backgroundColor: isSelected ? item.colorCode : "white",
          borderColor: item.colorCode,
        }}
      >
        {!isSelected && (
          <View className="mr-1">
            <ColorTagIcon width={8} height={8} color={item.colorCode} />
          </View>
        )}
        <Text className="font-h1-font text-lg" style={{ color: isSelected ? "white" : item.colorCode }}>
          {item.name}
        </Text>
        {isSelected && (
          <View className="ml-1">
            <DeleteTagIcon width={8} height={8} color="white" />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={tags}
      keyExtractor={(item) => item.id}
      renderItem={renderTagItem}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 8 }}
    />
  );
});

TagList.displayName = "TagList";

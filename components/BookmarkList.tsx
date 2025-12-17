import * as React from "react";
import { View, Text, FlatList } from "react-native";
import { BookmarkItem } from "./BookmarkItem";
import type { Bookmark, Tag } from "../types";

interface BookmarkListProps {
  bookmarks: Bookmark[];
  tags: Tag[];
  ListHeaderComponent?: React.ReactElement;
}

export const BookmarkList = ({ bookmarks, tags, ListHeaderComponent }: BookmarkListProps) => {
  return (
    <FlatList
      data={bookmarks}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <BookmarkItem title={item.title} url={item.url} thumbnail={item.thumbnail} tags={item.tagIds} />
      )}
      ItemSeparatorComponent={() => <View className="w-full h-px bg-grey-3" />}
      ListHeaderComponent={ListHeaderComponent}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 20, gap: 4 }}
      ListEmptyComponent={
        <View className="flex-1 items-center justify-center mt-20">
          <Text className="text-gray-400">저장된 북마크가 없습니다.</Text>
        </View>
      }
    />
  );
};

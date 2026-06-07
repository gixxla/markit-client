import * as React from "react";
import { useRef } from "react";
import type { NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import { View, Text, FlatList } from "react-native";
import type { SwipeableMethods } from "react-native-gesture-handler/ReanimatedSwipeable";
import { BookmarkItem } from "./BookmarkItem";
import type { Bookmark, Tag } from "../types";

interface BookmarkListProps {
  bookmarks: Bookmark[];
  tags: Tag[];
  ListHeaderComponent?: React.ReactElement;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onEdit?: (bookmark: Bookmark) => void;
  onDelete?: (bookmark: Bookmark) => void;
}

export const BookmarkList = ({
  bookmarks,
  tags,
  ListHeaderComponent,
  onScroll,
  onEdit,
  onDelete,
}: BookmarkListProps) => {
  const openSwipeable = useRef<SwipeableMethods | null>(null);

  const handleOpen = (ref: SwipeableMethods) => {
    if (openSwipeable.current && openSwipeable.current !== ref) {
      openSwipeable.current.close();
    }
    openSwipeable.current = ref;
  };

  const getTagsByIds = (ids: string[]): Tag[] => {
    return ids.map((id) => tags.find((tag) => tag.id === id)).filter((tag): tag is Tag => tag !== undefined);
  };
  return (
    <FlatList
      data={bookmarks}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <BookmarkItem
          title={item.title}
          url={item.url}
          thumbnail={item.thumbnail}
          tags={getTagsByIds(item.tagIds)}
          onEdit={() => onEdit?.(item)}
          onDelete={() => onDelete?.(item)}
          onOpen={handleOpen}
        />
      )}
      ItemSeparatorComponent={() => <View className="w-full h-px bg-grey-3" />}
      ListHeaderComponent={ListHeaderComponent}
      showsVerticalScrollIndicator={false}
      onScroll={onScroll}
      scrollEventThrottle={16}
      contentContainerStyle={{ paddingBottom: 180, paddingHorizontal: 20, gap: 4 }}
      ListEmptyComponent={
        <View className="flex-1 items-center justify-center">
          <Text className="font-h2-light-font text-lg text-grey-2">저장된 북마크가 없습니다.</Text>
        </View>
      }
    />
  );
};

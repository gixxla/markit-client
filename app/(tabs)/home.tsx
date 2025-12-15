import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, TextInput, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BookmarkItem } from "../../components/BookmarkItem";

import SearchIcon from "../../assets/search-icon.svg";
// import DeleteIcon from "../../assets/delete-tag-icon.svg";

interface Bookmark {
  id: string;
  title: string;
  url: string;
  thumbnail?: string;
  tags: string[];
}

interface Tag {
  id: string;
  name: string;
  color: string;
}

export default function HomeScreen() {
  /* 임시 북마크 데이터 */
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([
    { id: "1", title: "테스트 북마크 1: 개발 문서", url: "https://docs.expo.dev", tags: ["공부", "개발"] },
    { id: "2", title: "테스트 북마크 2: 여행 블로그", url: "https://naver.com", tags: ["여행"] },
    { id: "3", title: "테스트 북마크 3: 디자인 레퍼런스", url: "https://figma.com", tags: ["취미", "디자인"] },
  ]);

  /* 임시 태그 데이터 */
  const [tags, setTags] = useState<Tag[]>([
    { id: "1", name: "전체", color: "bg-gray-800" },
    { id: "2", name: "공부", color: "bg-red-500" },
    { id: "3", name: "디자인", color: "bg-blue-500" },
    { id: "4", name: "개발", color: "bg-green-500" },
    { id: "5", name: "취미", color: "bg-purple-500" },
    { id: "6", name: "여행", color: "bg-yellow-500" },
  ]);

  const renderTagItem = ({ item }: { item: Tag }) => (
    <TouchableOpacity className={`items-center rounded-full px-3 py-1 ${item.color}`}>
      <Text className="font-h1-font text-white text-lg">{item.name}</Text>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View className="pt-2 pb-5 gap-5">
      {/* 검색 창 */}
      <View className="flex-row items-center bg-grey-4 rounded-2xl h-10 px-3">
        <SearchIcon width={24} height={24} />
        <TextInput placeholder="Search" placeholderTextColor="#999" className="flex-1 ml-2 text-lg text-black" />
      </View>
      {/* 태그 리스트 */}
      <FlatList
        data={tags}
        keyExtractor={(item) => item.id}
        renderItem={renderTagItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 8 }}
      />
    </View>
  );

  return (
    <SafeAreaView className="flex-1 items-strech bg-white">
      {/* 북마크 리스트 */}
      <FlatList
        data={bookmarks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <BookmarkItem title={item.title} url={item.url} thumbnail={item.thumbnail} tags={item.tags} />
        )}
        ItemSeparatorComponent={() => <View className="w-full h-px bg-grey-3" />}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, gap: 4 }}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center mt-20">
            <Text className="text-gray-400">저장된 북마크가 없습니다.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

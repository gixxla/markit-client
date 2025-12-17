import React, { useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { TabType } from "components/TopBar";
import { TopBar } from "components/TopBar";
import { SearchBar } from "components/SearchBar";
import { TagList } from "../../components/TagList";
import { BookmarkList } from "components/BookmarkList";
import type { Tag, Bookmark } from "../../types";
import type { NativeScrollEvent, NativeSyntheticEvent } from "react-native";

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<TabType>("tags");
  const [isScrolled, setIsScrolled] = useState(false);

  /* 임시 북마크 데이터 */
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([
    { id: "1", title: "React Native 공식 문서", url: "https://reactnative.dev", tagIds: ["2", "4"] }, // 공부, 개발
    { id: "2", title: "피그마 단축키 모음", url: "https://figma.com", tagIds: ["3"] }, // 디자인
    { id: "3", title: "토스 테크 블로그", url: "https://toss.tech", tagIds: ["2", "5"] }, // 공부, 취미
    { id: "4", title: "Dribbble - UI 영감", url: "https://dribbble.com", tagIds: ["3", "5"] }, // 디자인, 취미
    { id: "5", title: "네이버 웹툰", url: "https://comic.naver.com", tagIds: ["5"] }, // 취미
    { id: "6", title: "GitHub 트렌드", url: "https://github.com", tagIds: ["4", "2"] }, // 개발, 공부
    { id: "7", title: "제주도 맛집 지도", url: "https://map.naver.com", tagIds: ["6"] }, // 여행
  ]);
  /* 임시 태그 데이터 */
  const [tags, setTags] = useState<Tag[]>([
    { id: "1", name: "독서", colorCode: "#1f2937" },
    { id: "2", name: "공부", colorCode: "#ef4444" },
    { id: "3", name: "디자인", colorCode: "#3b82f6" },
    { id: "4", name: "개발", colorCode: "#22c55e" },
    { id: "5", name: "취미", colorCode: "#a855f7" },
    { id: "6", name: "여행", colorCode: "#eab308" },
  ]);

  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);

  const filteredBookmarks =
    selectedTagIds.length === 0
      ? bookmarks
      : bookmarks.filter((bookmark) => selectedTagIds.every((selectedId) => bookmark.tagIds.includes(selectedId)));

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    // 10px 이상 스크롤되면 경계선 표시 (너무 예민하지 않게)
    setIsScrolled(offsetY > 10);
  };

  const handlePressTag = (id: string) => {
    setSelectedTagIds((prevIds) => {
      if (prevIds?.includes(id)) {
        return prevIds.filter((tagId) => tagId !== id);
      } else {
        return [...prevIds, id];
      }
    });
  };

  const renderHeader = () => (
    <View className="pt-3 pb-5 gap-5">
      {/* 검색 창 */}
      <SearchBar />
      {/* 태그 리스트 */}
      <TagList tags={tags} selectedTagIds={selectedTagIds} onPressTag={handlePressTag} />
    </View>
  );

  return (
    <SafeAreaView className="flex-1 items-strech bg-white">
      {/* 상단 네비게이션 */}
      <TopBar activeTab={activeTab} onTabChange={setActiveTab} isScrolled={isScrolled} />
      {/* 북마크 리스트 */}
      {activeTab === "tags" ? (
        <BookmarkList
          bookmarks={filteredBookmarks}
          tags={tags}
          ListHeaderComponent={renderHeader()}
          onScroll={handleScroll}
        />
      ) : (
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-400 text-lg">카테고리 화면 준비 중 🚧</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

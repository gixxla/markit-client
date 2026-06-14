import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useBookmarkStore } from "../../store/bookmarkStore";
import type { TabType } from "../../components/TopBar";
import { TopBar } from "../../components/TopBar";
import { SearchBar } from "../../components/SearchBar";
import { TagList } from "../../components/TagList";
import { BookmarkList } from "../../components/BookmarkList";
import type { Tag, Bookmark } from "../../types";
import type { NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import { AxiosError } from "axios";

import { useUserStore } from "../../store/userStore";
import { getTags } from "../../api/tag";
import type { ApiBookmark } from "../../api/bookmark";
import { getBookmarks } from "../../api/bookmark";
import { getLocalBookmarks, getLocalTags } from "../../api/localStorage";

export default function HomeScreen() {
  const { isGuest, accessToken } = useUserStore();
  const { refreshKey } = useBookmarkStore();

  const [activeTab, setActiveTab] = useState<TabType>("tags");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);

  const fetchBookmarksAndTags = async () => {
    try {
      setIsLoading(true);

      if (!isGuest && !accessToken) {
        setIsLoading(false);
        return;
      }

      if (isGuest) {
        console.log("게스트 모드: 로컬 데이터 로딩");
        const [localTags, localBookmarks] = await Promise.all([getLocalTags(), getLocalBookmarks()]);
        setTags(localTags);
        setBookmarks(localBookmarks);
      } else {
        console.log("회원 모드: 서버 데이터 로딩");
        const [tagsData, bookmarksResponse] = await Promise.all([getTags(), getBookmarks()]);

        setTags(tagsData);

        const mappedBookmarks: Bookmark[] = bookmarksResponse.data.map((item: ApiBookmark) => ({
          id: item.id,
          title: item.title,
          url: item.url,
          tagIds: item.tags.map((t) => t.id),
        }));
        setBookmarks(mappedBookmarks);
      }
    } catch (e) {
      // 401 에러는 이미 api/client.ts에서 로그아웃 처리됨
      if (e instanceof AxiosError && e.response?.status === 401) {
        return;
      }
      console.error("데이터 로딩 실패", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookmarksAndTags();
  }, [isGuest, accessToken, refreshKey]);

  const filteredBookmarks =
    selectedTagIds.length === 0
      ? bookmarks
      : bookmarks.filter((bookmark) => selectedTagIds.every((selectedId) => bookmark.tagIds.includes(selectedId)));

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
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

  return (
    <SafeAreaView className="flex-1 items-strech bg-white">
      {/* 상단 네비게이션 */}
      <TopBar activeTab={activeTab} onTabChange={setActiveTab} isScrolled={isScrolled} />
      {activeTab === "tags" ? (
        <>
          {/* 상단 고정 영역: 검색창 + 태그 리스트 */}
          <View className="px-5 pt-3 pb-5 gap-5">
            {/* 검색 창 */}
            <SearchBar />
            {/* 태그 리스트 */}
            <TagList tags={tags} selectedTagIds={selectedTagIds} onPressTag={handlePressTag} />
          </View>
          {/* 북마크 리스트 (이 영역만 스크롤) */}
          {isLoading ? (
            <View className="flex-1 items-center justify-center">
              <ActivityIndicator size="large" color="#AF282F" />
            </View>
          ) : (
            <BookmarkList bookmarks={filteredBookmarks} tags={tags} onScroll={handleScroll} />
          )}
        </>
      ) : isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#AF282F" />
        </View>
      ) : (
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-400 text-lg">카테고리 화면 준비 중 🚧</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

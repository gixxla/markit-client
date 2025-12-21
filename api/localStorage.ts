import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Bookmark, Tag } from "../types";

const LOCAL_BOOKMARK_KEY = "local_bookmarks";
const LOCAL_TAG_KEY = "local_tags";

export const getLocalBookmarks = async (): Promise<Bookmark[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(LOCAL_BOOKMARK_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error("로컬 북마크 로딩 실패", e);
    return [];
  }
};

export const getLocalTags = async (): Promise<Tag[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(LOCAL_TAG_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error("로컬 태그 로딩 실패", e);
    return [];
  }
};

// TODO: 추가, 삭제

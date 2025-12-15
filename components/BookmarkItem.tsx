import * as React from "react";
import { View, Text, Image } from "react-native";

import MoreIcon from "../assets/more-icon.svg";
import DownloadIcon from "../assets/download-icon.svg";
//import ReminderOnIcon from "../assets/reminder-on-icon.svg";
import Tag from "../assets/tag.svg";

interface BookmarkItemProps {
  title: string;
  url: string;
  thumbnail?: string;
  tags?: string[];
}

export const BookmarkItem = ({ title, url, thumbnail, tags }: BookmarkItemProps) => {
  return (
    <View className="w-full h-[102px] mb-1">
      <View className="flex-row w-full gap-1.5 p-2">
        <Tag />
        <Tag />
      </View>
      <View className="flex-row gap-2 px-2">
        <View className="flex-1">
          <View className="flex-1 w-fit h-16 gap-1">
            <Text className="font-h2-font text-black text-lg text-left">{title}</Text>
            <Text className="font-h2-light-font text-grey-2 text-sm text-left">{url}</Text>
          </View>
          <View className="flex-row items-center justify-start gap-3 py-1">
            <MoreIcon width={18} height={18} />
            <DownloadIcon width={18} height={18} />
            {/* <ReminderOnIcon width={20} height={16} /> */}
          </View>
        </View>
        <View className="pb-1 overflow-hidden">
          <Image source={thumbnail} className="w-[80px] h-[72px] rounded-lg bg-grey-3" />
        </View>
      </View>
    </View>
  );
};

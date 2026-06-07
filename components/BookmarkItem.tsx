import * as React from "react";
import { useRef } from "react";
import type { SwipeableMethods } from "react-native-gesture-handler/ReanimatedSwipeable";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Animated, { useAnimatedStyle, interpolate, useDerivedValue, withSpring } from "react-native-reanimated";
import type { SharedValue } from "react-native-reanimated";
import type { Tag } from "../types";

import EditBtn from "../assets/edit-btn.svg";
import DeleteBtn from "../assets/delete-btn.svg";
import DownloadIcon from "../assets/download-icon.svg";
import TagBarIcon from "../assets/tag-bar-icon.svg";

const ACTION_WIDTH = 144;
const SPRING = { damping: 14, stiffness: 120, mass: 1.2 };

interface BookmarkItemProps {
  title: string;
  url: string;
  thumbnail?: string;
  tags?: Tag[];
  onEdit?: () => void;
  onDelete?: () => void;
  onOpen?: (ref: SwipeableMethods) => void;
}

const RightActions = ({
  progress,
  onEdit,
  onDelete,
}: {
  progress: SharedValue<number>;
  onEdit?: () => void;
  onDelete?: () => void;
}) => {
  const deleteScale = useDerivedValue(() =>
    withSpring(interpolate(progress.value, [0, 0.5], [0.5, 1], "clamp"), SPRING),
  );
  const editScale = useDerivedValue(() => withSpring(interpolate(progress.value, [0.5, 1], [0.5, 1], "clamp"), SPRING));

  const deleteStyle = useAnimatedStyle(() => ({
    transform: [{ scale: deleteScale.value }],
    opacity: interpolate(progress.value, [0, 0.5], [0, 1], "clamp"),
  }));

  const editStyle = useAnimatedStyle(() => ({
    transform: [{ scale: editScale.value }],
    opacity: interpolate(progress.value, [0.5, 1], [0, 1], "clamp"),
  }));

  return (
    <View style={{ width: ACTION_WIDTH, flexDirection: "row" }}>
      <TouchableOpacity activeOpacity={0.8} onPress={onEdit} className="w-[68px] items-center justify-center ml-[8px]">
        <Animated.View style={editStyle} className="items-center gap-1">
          <EditBtn width={56} height={56} />
        </Animated.View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.8} onPress={onDelete} className="w-[68px] items-center justify-center">
        <Animated.View style={deleteStyle} className="items-center gap-1">
          <DeleteBtn width={56} height={56} />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

export const BookmarkItem = ({ title, url, thumbnail, tags = [], onEdit, onDelete, onOpen }: BookmarkItemProps) => {
  const swipeableRef = useRef<SwipeableMethods>(null);

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={(progress) => <RightActions progress={progress} onEdit={onEdit} onDelete={onDelete} />}
      overshootRight={false}
      friction={2}
      rightThreshold={40}
      onSwipeableWillOpen={() => onOpen?.(swipeableRef.current!)}
    >
      <View className="w-full pb-4 bg-white">
        <View className="flex-row w-full gap-1.5 p-2">
          {tags.map((tag) => (
            <View key={tag.id}>
              <TagBarIcon color={tag.colorCode} />
            </View>
          ))}
        </View>
        <View className="flex-row gap-4 px-2">
          <View className="flex-1">
            <View className="flex-1 w-fit h-fit gap-1">
              <Text className="font-h2-font text-black text-lg text-left">{title}</Text>
              <Text className="font-h2-light-font text-grey-2 text-sm text-left mb-2">{url}</Text>
            </View>
            <View className="flex-row items-center justify-start gap-3">
              <DownloadIcon width={18} height={18} />
            </View>
          </View>
          <View className="overflow-hidden">
            <Image source={thumbnail} className="w-[80px] h-[72px] rounded-lg bg-grey-3" />
          </View>
        </View>
      </View>
    </Swipeable>
  );
};

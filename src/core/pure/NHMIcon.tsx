import React, { useMemo } from 'react';
import { GestureResponderEvent, TouchableOpacity } from 'react-native';
import theme, { ColorType, IconSizeType, NHMIconName } from 'core/theme';
import HomeIcon from 'assets/icons/HomeIcon';
import GalleryIcon from 'assets/icons/GalleryIcon';
import ArrowDownIcon from 'assets/icons/ArrowDownIcon';
import ArrowLeftIcon from 'assets/icons/ArrowLeftIcon';
import ArrowUpIcon from 'assets/icons/ArrowUpIcon';
import ArrowRightIcon from 'assets/icons/ArrowRightIcon';
import CalendarIcon from 'assets/icons/CalendarIcon';
import CloseIcon from 'assets/icons/CloseIcon';
import EyesHiddenIcon from 'assets/icons/EyesHiddenIcon';
import EyesIcon from 'assets/icons/EyesIcon';
import LeadingLeftIcon from 'assets/icons/LeadingLeftIcon';
import LockIcon from 'assets/icons/LockIcon';
import PaperIcon from 'assets/icons/PaperIcon';
import PlayIcon from 'assets/icons/PlayIcon';
import ProfileIcon from 'assets/icons/ProfileIcon';
import StarFilledIcon from 'assets/icons/StarFilledIcon';
import StarIcon from 'assets/icons/StarIcon';
import TickIcon from 'assets/icons/TickIcon';
import TimeTableIcon from 'assets/icons/TimeTableIcon';
import VolumeIcon from 'assets/icons/VolumeIcon';
import WrongIcon from 'assets/icons/WrongIcon';

type NHMIconProps = {
  name: NHMIconName;
  size?: IconSizeType;
  color?: ColorType;
  onPress?: (event?: GestureResponderEvent) => void;
  onLongPress?: (event?: GestureResponderEvent) => void;
};

export default function NHMIcon({
  size = 'normal',
  color = 'wine',
  name,
  onPress,
  onLongPress,
}: NHMIconProps) {
  const Icon = (() => {
    switch (name) {
      case 'arrow-down': return ArrowDownIcon;
      case 'arrow-left': return ArrowLeftIcon;
      case 'arrow-right': return ArrowRightIcon;
      case 'arrow-up': return ArrowUpIcon;
      case 'calendar': return CalendarIcon;
      case 'close': return CloseIcon;
      case 'eyes-hidden': return EyesHiddenIcon;
      case 'eyes': return EyesIcon;
      case 'gallery': return GalleryIcon;
      case 'home': return HomeIcon;
      case 'leading-left': return LeadingLeftIcon;
      case 'lock': return LockIcon;
      case 'paper': return PaperIcon;
      case 'play': return PlayIcon;
      case 'profile': return ProfileIcon;
      case 'star-filled': return StarFilledIcon;
      case 'star': return StarIcon;
      case 'tick': return TickIcon;
      case 'timetable': return TimeTableIcon;
      case 'volume': return VolumeIcon;
      case 'wrong': return WrongIcon;
      default: return null;
    }
  })();

  const [targetFill, targetStroke] = useMemo(() => {
    if (!['star', 'star-filled'].includes(name)) return [null, null];
    switch(color) {
      case 'wine': {
        return name === 'star'
          ? [theme.color.primaryWine10, theme.color.primaryWine30]
          : [theme.color.primaryWine, theme.color.primaryWine30];
      }
      case 'honey': {
        return name === 'star'
          ? [theme.color.secondaryHoney10, theme.color.secondaryHoney30]
          : [theme.color.secondaryHoney, theme.color.secondaryHoney30];
      }
      case 'brown': {
        return name === 'star'
          ? [theme.color.additionalLight, theme.color.secondaryBrown10]
          : [theme.color.secondaryBrown30, theme.color.secondaryBrown10];
      }
      case 'olive': {
        return name === 'star'
          ? [theme.color.additionalOlive30, theme.color.additionalOlive50]
          : [theme.color.additionalOlive, theme.color.additionalOlive50];
      }
      case 'grey': {
        return name === 'star'
          ? [theme.color.additionalGrey10, theme.color.additionalGrey30]
          : [theme.color.additionalGrey, theme.color.additionalGrey30];
      }
      case 'red': {
        return name === 'star'
          ? [theme.color.primaryWine10, theme.color.primaryWine30]
          : [theme.color.systemError, theme.color.primaryWine30];
      }
      case 'blue': {
        return name === 'star'
          ? [theme.color.additionalLight, theme.color.additionalGrey30]
          : [theme.color.systemAction, theme.color.additionalGrey30];
      }
      case 'green': {
        return name === 'star'
          ? [theme.color.additionalOlive30, theme.color.additionalOlive50]
          : [theme.color.systemSuccess, theme.color.additionalOlive50];
      }
      default: return [null, null];
    }
  }, [name, color]);

  const iconProps = useMemo(
    () => ({ size, color, targetFill, targetStroke }),
    [size, color, targetFill, targetStroke]
  );

  if (!onPress && !onLongPress) return <Icon {...iconProps} />;
  return (
    <TouchableOpacity onPress={onPress} onLongPress={onLongPress}>
      <Icon {...iconProps} />
    </TouchableOpacity>
  );
}
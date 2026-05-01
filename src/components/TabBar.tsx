import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

export type TabKey = 'learn' | 'stories' | 'progress' | 'you';

type Props = {
  active: TabKey;
  onChange: (tab: TabKey) => void;
};

const TABS: { key: TabKey; label: string; Icon: (p: IconProps) => React.ReactElement }[] = [
  { key: 'learn', label: 'Learn', Icon: HomeIcon },
  { key: 'stories', label: 'Stories', Icon: StoriesIcon },
  { key: 'progress', label: 'Progress', Icon: ProgressIcon },
  { key: 'you', label: 'You', Icon: UserIcon },
];

export function TabBar({ active, onChange }: Props) {
  return (
    <View style={styles.tabbar}>
      {TABS.map((t) => {
        const isActive = t.key === active;
        const tint = isActive ? colors.primary : colors.muted;
        return (
          <Pressable key={t.key} style={styles.tab} onPress={() => onChange(t.key)}>
            {isActive && <View style={styles.tabActiveBar} />}
            <t.Icon color={tint} />
            <Text style={[styles.tabLabel, isActive && { color: colors.primary }]}>{t.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

type IconProps = { color: string };

function HomeIcon({ color }: IconProps) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 11 L12 4 L20 11 V20 H4 Z"
        stroke={color}
        strokeWidth={1.8}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function StoriesIcon({ color }: IconProps) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path
        d="M5 5 H10 Q12 5 12 7 V20 Q12 18 10 18 H5 Z"
        stroke={color}
        strokeWidth={1.8}
        strokeLinejoin="round"
      />
      <Path
        d="M19 5 H14 Q12 5 12 7 V20 Q12 18 14 18 H19 Z"
        stroke={color}
        strokeWidth={1.8}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function ProgressIcon({ color }: IconProps) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Rect x="4" y="13" width="3" height="7" stroke={color} strokeWidth={1.8} />
      <Rect x="10.5" y="9" width="3" height="11" stroke={color} strokeWidth={1.8} />
      <Rect x="17" y="5" width="3" height="15" stroke={color} strokeWidth={1.8} />
    </Svg>
  );
}

function UserIcon({ color }: IconProps) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={8} r={4} stroke={color} strokeWidth={1.8} />
      <Path
        d="M4 21 Q4 14 12 14 Q20 14 20 21"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
    </Svg>
  );
}

const styles = StyleSheet.create({
  tabbar: {
    height: 76,
    paddingTop: 8,
    paddingHorizontal: 16,
    paddingBottom: 18,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: colors.line,
    backgroundColor: colors.paper,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    paddingVertical: 6,
  },
  tabActiveBar: {
    position: 'absolute',
    top: 0,
    width: 24,
    height: 3,
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  tabLabel: {
    fontSize: 10,
    color: colors.muted,
    fontFamily: fonts.bodyHeavy,
    letterSpacing: 0.2,
  },
});

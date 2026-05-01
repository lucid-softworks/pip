import { View } from 'react-native';
import Svg, { Circle, Ellipse, Path } from 'react-native-svg';
import { colors } from '@/theme/colors';

type Props = { size?: number };

export function Mascot({ size = 36 }: Props) {
  return (
    <View>
      <Svg width={size} height={size} viewBox="0 0 36 36">
        <Ellipse cx="18" cy="20" rx="11" ry="10" fill={colors.paper} />
        <Circle cx="14" cy="18" r="1.6" fill={colors.ink} />
        <Circle cx="22" cy="18" r="1.6" fill={colors.ink} />
        <Path
          d="M14 23 Q18 26 22 23"
          stroke={colors.ink}
          strokeWidth={1.6}
          strokeLinecap="round"
          fill="none"
        />
        <Circle cx="11" cy="22" r="1.4" fill={colors.primarySoft} />
        <Circle cx="25" cy="22" r="1.4" fill={colors.primarySoft} />
      </Svg>
    </View>
  );
}

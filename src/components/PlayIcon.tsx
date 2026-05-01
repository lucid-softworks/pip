import Svg, { Path, Rect } from 'react-native-svg';

type Props = { size?: number; color?: string; playing?: boolean };

export function PlayIcon({ size = 14, color = '#000', playing = false }: Props) {
  if (playing) {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24">
        <Rect x="6" y="5" width="4" height="14" rx="1" fill={color} />
        <Rect x="14" y="5" width="4" height="14" rx="1" fill={color} />
      </Svg>
    );
  }
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M8 5 L19 12 L8 19 Z" fill={color} />
    </Svg>
  );
}

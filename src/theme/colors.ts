export const colors = {
  bg: '#F6EFE0',
  bg2: '#EFE5D2',
  paper: '#FFFCF4',
  ink: '#2A2418',
  ink2: '#5C5141',
  muted: '#948571',
  line: '#E5DAC3',
  lineSoft: '#EFE6D2',

  primary: '#FF7043',
  primary2: '#FF9166',
  primarySoft: '#FFE0D2',

  moss: '#5B8A5A',
  mossSoft: '#DCE9D9',

  butter: '#F4C13C',
  butterSoft: '#FBEBC0',

  berry: '#C44A6B',
  berrySoft: '#FAD8DF',

  sky: '#4A8FB0',
  skySoft: '#D4E6EE',

  lilac: '#8470AD',
  lilacSoft: '#E5DEF0',

  white: '#FFFFFF',
} as const;

export type ColorKey = keyof typeof colors;

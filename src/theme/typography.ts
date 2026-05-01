export const fonts = {
  display: 'BricolageGrotesque_700Bold',
  displayMedium: 'BricolageGrotesque_600SemiBold',
  body: 'Nunito_600SemiBold',
  bodyBold: 'Nunito_700Bold',
  bodyHeavy: 'Nunito_800ExtraBold',
  bodyRegular: 'Nunito_500Medium',
} as const;

export const text = {
  display: {
    fontFamily: fonts.display,
    letterSpacing: -0.8,
  },
  title: {
    fontFamily: fonts.display,
    letterSpacing: -0.6,
  },
  body: {
    fontFamily: fonts.body,
  },
} as const;

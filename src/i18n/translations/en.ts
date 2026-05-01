// English — the canonical translation table. Every key in here is the source
// of truth for what a UI string should say. Other languages are translated
// from these. Missing keys in other tables fall back to English.

export const en = {
  // ---------- Common buttons / actions ----------
  'common.continue': 'Continue',
  'common.skip': 'Skip',
  'common.cancel': 'Cancel',
  'common.save': 'Save',
  'common.check': 'Check',
  'common.tryAgain': 'Try again',
  'common.moveOn': 'Move on',
  'common.start': 'Start',
  'common.resume': 'Resume',
  'common.begin': 'Begin',
  'common.add': '+ Add',
  'common.switch': 'Switch',
  'common.noRush': 'No rush',
  'common.lovely': 'Lovely.',
  'common.almost': 'Almost.',

  // ---------- Tab bar ----------
  'tab.learn': 'Learn',
  'tab.stories': 'Stories',
  'tab.progress': 'Progress',
  'tab.you': 'You',

  // ---------- Auth ----------
  'auth.welcome': 'Welcome.',
  'auth.subtitle': 'Pip syncs across devices. Sign in to pick up where you left off.',
  'auth.tab.signIn': 'Sign in',
  'auth.tab.signUp': 'Create account',
  'auth.field.name': 'Name',
  'auth.field.email': 'Email',
  'auth.field.password': 'Password',
  'auth.placeholder.name': 'What should we call you?',
  'auth.placeholder.email': 'you@somewhere.com',
  'auth.placeholder.passwordSignUp': 'At least 8 characters',
  'auth.cta.signIn': 'Sign in',
  'auth.cta.signUp': 'Create account',
  'auth.error.missing': 'Email and password are needed.',
  'auth.error.shortPassword': 'Password should be at least 8 characters.',
  'auth.error.generic': 'Something went wrong. Try again?',
  'auth.fineprint.signUp':
    "By creating an account you accept that this is a prerelease and your data may be reset.",
  'auth.fineprint.signIn':
    "By signing in you accept that this is a prerelease and your data may be reset.",

  // ---------- Onboarding ----------
  'onboarding.welcome.title': "Hi. We're Pip.",
  'onboarding.welcome.subtitleA': 'A kind way to learn a new language.',
  'onboarding.welcome.subtitleB': 'Free, the whole way.',
  'onboarding.welcome.bullet.noStreaks': 'No streaks, no leagues, no shame',
  'onboarding.welcome.bullet.noPunish': 'Mistakes mean rest, not punishment',
  'onboarding.welcome.bullet.storiesOnly': 'Stories are the only paid part',
  'onboarding.welcome.cta': 'Get started',

  'onboarding.step.1of4': 'Step 1 of 5',
  'onboarding.step.2of4': 'Step 2 of 5',
  'onboarding.step.3of4': 'Step 3 of 5',
  'onboarding.step.4of4': 'Step 4 of 5',

  'onboarding.base.title': 'What do you speak?',
  'onboarding.base.subtitle':
    "We'll use this for the app's interface. Your learning language comes next.",
  'onboarding.base.deviceDefault': 'Detected from your device',

  'onboarding.language.title': 'What would you like to learn?',
  'onboarding.language.subtitle': 'Tap one. You can add more later.',
  'onboarding.language.fromEnglish': 'From English',
  'onboarding.language.comingSoon': 'Coming soon',

  'onboarding.name.title': 'What should we call you?',
  'onboarding.name.subtitle': 'You can change this later.',
  'onboarding.name.placeholder': 'Friend',

  'onboarding.rhythm.title': 'How much, on a good day?',
  'onboarding.rhythm.subtitle':
    "No streaks, no pressure. We'll meet you wherever you are.",
  'onboarding.rhythm.coffeeBreak': 'A coffee break',
  'onboarding.rhythm.quickVisit': 'A quick visit',
  'onboarding.rhythm.realChunk': 'A real chunk',
  'onboarding.rhythm.deepDive': 'A deep dive',

  'onboarding.complete.title': "You're all set, {name}.",
  'onboarding.complete.subtitle':
    '{flag} {language}, about {minutes} min on a good day. Stories are free for you, two a week.',
  'onboarding.complete.summary.learning': 'Learning',
  'onboarding.complete.summary.rhythm': 'Rhythm',
  'onboarding.complete.summary.pricing': 'Pricing',
  'onboarding.complete.summary.minutesPerDay': '{minutes} min / day',
  'onboarding.complete.summary.freeAll': 'Free, the whole way',

  // ---------- Home ----------
  'home.welcomeBack': 'Welcome back,',
  'home.greetWho': '{name}.',
  'home.wordsKnown': '{count} words',
  'home.fourOfFive': '4 of last 5 days',
  'home.lovelyRhythm': "Lovely rhythm. No pressure to keep it perfect.",
  'home.unitLabel': 'Unit 01 · {level} · {name}',
  'home.pickUp': 'Pick up where you left off',
  'home.upNext': 'Up next',
  'home.minutes': '{count} min',
  'home.allDoneTitle': 'You did the whole unit. ✨',
  'home.allDoneBody':
    "Take a beat. The next unit will be here soon — and your finished lessons will always be here to revisit.",
  'home.story.bonus': 'Bonus story for subscribers',

  // ---------- Lesson + exercises ----------
  'lesson.translate.kicker': 'Translate the sentence',
  'lesson.translate.title': 'Tap the words to build the sentence',
  'lesson.translate.placeholder': 'Tap words below…',
  'lesson.feedback.theAnswerIs': 'The answer is:',
  'lesson.feedback.thePhraseIs': 'The phrase is:',

  'lesson.choice.kicker': 'Pick the right one',
  'lesson.choice.title': 'How do you say…',

  'lesson.listen.kicker': 'Listen up',
  'lesson.listen.title': 'What did you hear?',
  'lesson.listen.replay': 'Tap to replay',

  'lesson.match.kicker': 'Match the pairs',
  'lesson.match.title': 'Tap a word, then its match.',

  // ---------- Lesson celebration ----------
  'celebration.cta': 'Continue',
  'celebration.youFinished': 'You finished {title}.',
  'celebration.cheer.lovely.kicker': 'Lovely.',
  'celebration.cheer.lovely.body': "That's another one in the bag.",
  'celebration.cheer.beautifully.kicker': 'Beautifully done.',
  'celebration.cheer.beautifully.body':
    'New words tucked away — they stick best when you come back to them.',
  'celebration.cheer.lookAtYou.kicker': 'Look at you.',
  'celebration.cheer.lookAtYou.body':
    'A few more minutes spent, a few more words you know.',
  'celebration.cheer.quietly.kicker': 'Quietly excellent.',
  'celebration.cheer.quietly.body':
    'No rush, no streak — just steady, real progress.',
  'celebration.cheer.thereItIs.kicker': 'There it is.',
  'celebration.cheer.thereItIs.body':
    'These small wins are what stack up over time.',
  'celebration.stat.exercises': 'exercises',
  'celebration.stat.newWords': 'new words',
  'celebration.stat.time': 'time',
  'celebration.time.seconds': '{seconds} sec',
  'celebration.time.minutes': '{minutes} min',
  'celebration.time.minutesSeconds': '{minutes}m {seconds}s',

  // ---------- Breather ----------
  'breather.title': 'Take a breather.',
  'breather.message':
    'That was a tricky one. Brains learn better with short rests — research backs this up. Come back in a bit and try again.',
  'breather.untilReopens': 'Until this lesson reopens',
  'breather.meanwhile': 'In the meantime',
  'breather.review.title': 'Review words you know',
  'breather.review.meta': 'A gentle warm-up · 2 min',
  'breather.story.title': 'Listen to a story',
  'breather.story.meta': 'Always free for you · 4 min',

  // ---------- Stories ----------
  'stories.title': 'Stories',
  'stories.intro.kicker': 'Pip Stories · {flag} {language}',
  'stories.intro.title': 'Audio tales for picking up real {language}.',
  'stories.intro.body':
    'Short, beautifully voiced stories at your level — to listen, read along, or both.',
  'stories.freeStrip.strong': 'Two stories per week always free.',
  'stories.freeStrip.body': 'No subscription needed.',
  'stories.level.beginner': 'Beginner',
  'stories.level.intermediate': 'Intermediate',
  'stories.level.advanced': 'Advanced',
  'stories.freeThisWeek': 'FREE THIS WEEK',
  'stories.pip+': 'PIP+',
  'stories.duration': '{count} min',

  // ---------- Progress ----------
  'progress.title': 'Progress',
  'progress.subtitle': 'Quietly cheering you on.',
  'progress.stat.wordsKnown': 'words known',
  'progress.stat.minutesThisWeek': 'min this week',
  'progress.stat.goalADay': 'goal a day',
  'progress.thisWeek': "This week's rhythm",
  'progress.daysOfSeven': '{count} of 7',
  'progress.recentLabel': 'Recently completed',
  'progress.recentEmpty': "Finish a lesson and it'll show up here. No rush.",
  'progress.encouragement.steady':
    "Lovely steady pace. Missed days don't undo what you've learned.",
  'progress.encouragement.building':
    'Quietly building. No streak to chase, just words tucked away.',
  'progress.encouragement.fresh':
    'A fresh week. Whenever you come back, pip will be here.',
  'progress.noStreaks.title': 'No streaks, no pressure.',
  'progress.noStreaks.body':
    'Pip tracks what you know, not what you missed. Whenever you come back, you pick up where you left off.',

  // ---------- App language (settings + onboarding shared) ----------
  'lang.appLanguage': 'App language',
  'lang.uiLocale.en': 'English',
  'lang.uiLocale.es': 'Spanish (Español)',
  'lang.uiLocale.fr': 'French (Français)',
  'lang.uiLocale.de': 'German (Deutsch)',
  'lang.uiLocale.pt': 'Portuguese (Português)',
  'lang.uiLocale.it': 'Italian (Italiano)',

  // ---------- You / Settings ----------
  'you.title': 'You',
  'you.subtitle': 'Settings, your way.',
  'you.profile.tagline': 'Tap to edit · free, the whole way',
  'you.languageHint':
    'Tap the language chip on Home to switch courses or add a new language.',
  'you.section.language': 'Language',
  'you.appLanguage.title': 'App language',
  'you.appLanguage.help': "What pip's interface is in",
  'you.section.settings': 'Settings',
  'you.setting.slowSpeech.title': 'Slower speech',
  'you.setting.slowSpeech.help': 'Read prompts a little more slowly',
  'you.setting.reduceMotion.title': 'Reduce motion',
  'you.setting.reduceMotion.help': 'Calmer transitions',
  'you.setting.haptic.title': 'Haptic feedback',
  'you.setting.haptic.help': 'Gentle taps on correct answers',
  'you.section.about': 'About',
  'you.about.title': 'Pip is free, the whole way.',
  'you.about.body':
    "Stories are the only paid part. No streaks, no leagues, no shame. We're rooting for you.",
  'you.signOut': 'Sign out',
  'you.signOut.confirmTitle': 'Sign out?',
  'you.signOut.confirmBody':
    'Your progress is saved on the server. You can sign back in any time.',
  'you.editName.title': 'Your name',
  'you.editName.heading': 'What should we call you?',
  'you.editName.subtitle':
    "Whatever you'd like — lowercase is fine, we won't fix it.",

  // ---------- Language sheet ----------
  'lang.yourCourses': 'Your courses',
  'lang.tapToSwitch': 'Tap one to switch.',
  'lang.addLanguage': 'Add a language',
  'lang.pickAnother': 'Pick another to start learning.',
  'lang.fullCatalog': "You've enrolled in everything we've got.",
  'lang.fromSource': 'From {source}',
  'lang.comingSoon': 'Coming soon',

  // ---------- Errors ----------
  'error.network': "Couldn't reach pip-server at {url}",
  'error.unauthorized': 'Please sign in again.',
};

export type TranslationKey = keyof typeof en;
// Plain string values so other-language tables can vary freely; the keys are
// the source of truth, not the literal English values.
export type Translations = Record<TranslationKey, string>;

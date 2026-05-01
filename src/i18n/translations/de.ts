import type { Translations } from './en';

// German UI. Best-effort translations; native review encouraged. Uses
// informal "du" forms throughout.
export const de: Partial<Translations> = {
  // Common
  'common.continue': 'Weiter',
  'common.skip': 'Überspringen',
  'common.cancel': 'Abbrechen',
  'common.save': 'Speichern',
  'common.check': 'Prüfen',
  'common.tryAgain': 'Nochmal versuchen',
  'common.moveOn': 'Weiter',
  'common.start': 'Starten',
  'common.resume': 'Fortsetzen',
  'common.begin': 'Loslegen',
  'common.add': '+ Hinzufügen',
  'common.switch': 'Wechseln',
  'common.noRush': 'Keine Eile',
  'common.lovely': 'Schön.',
  'common.almost': 'Fast.',

  // Tab bar
  'tab.learn': 'Lernen',
  'tab.stories': 'Geschichten',
  'tab.progress': 'Fortschritt',
  'tab.you': 'Du',

  // Auth
  'auth.welcome': 'Willkommen.',
  'auth.subtitle':
    'Pip synchronisiert über Geräte hinweg. Melde dich an, um da weiterzumachen, wo du aufgehört hast.',
  'auth.tab.signIn': 'Anmelden',
  'auth.tab.signUp': 'Konto erstellen',
  'auth.field.name': 'Name',
  'auth.field.email': 'E-Mail',
  'auth.field.password': 'Passwort',
  'auth.placeholder.name': 'Wie sollen wir dich nennen?',
  'auth.placeholder.email': 'du@irgendwo.com',
  'auth.placeholder.passwordSignUp': 'Mindestens 8 Zeichen',
  'auth.cta.signIn': 'Anmelden',
  'auth.cta.signUp': 'Konto erstellen',
  'auth.error.missing': 'E-Mail und Passwort werden gebraucht.',
  'auth.error.shortPassword': 'Das Passwort sollte mindestens 8 Zeichen haben.',
  'auth.error.generic': 'Etwas ist schiefgegangen. Nochmal versuchen?',
  'auth.fineprint.signUp':
    'Mit dem Erstellen eines Kontos akzeptierst du, dass dies eine Vorabversion ist und deine Daten zurückgesetzt werden können.',
  'auth.fineprint.signIn':
    'Mit der Anmeldung akzeptierst du, dass dies eine Vorabversion ist und deine Daten zurückgesetzt werden können.',

  // Onboarding
  'onboarding.welcome.title': 'Hallo. Wir sind Pip.',
  'onboarding.welcome.subtitleA': 'Eine sanfte Art, eine Sprache zu lernen.',
  'onboarding.welcome.subtitleB': 'Kostenlos, den ganzen Weg.',
  'onboarding.welcome.bullet.noStreaks': 'Keine Serien, keine Ligen, keine Scham',
  'onboarding.welcome.bullet.noPunish': 'Fehler bedeuten Pause, keine Strafe',
  'onboarding.welcome.bullet.storiesOnly': 'Nur die Geschichten kosten etwas',
  'onboarding.welcome.cta': 'Loslegen',

  'onboarding.step.1of4': 'Schritt 1 von 5',
  'onboarding.step.2of4': 'Schritt 2 von 5',
  'onboarding.step.3of4': 'Schritt 3 von 5',
  'onboarding.step.4of4': 'Schritt 4 von 5',

  'onboarding.base.title': 'Was sprichst du?',
  'onboarding.base.subtitle':
    'Damit zeigen wir die App-Oberfläche. Die Lernsprache kommt als nächstes.',
  'onboarding.base.deviceDefault': 'Von deinem Gerät erkannt',

  'onboarding.language.title': 'Was möchtest du lernen?',
  'onboarding.language.subtitle': 'Tippe eine an. Du kannst später mehr hinzufügen.',
  'onboarding.language.fromEnglish': 'Aus dem Englischen',
  'onboarding.language.comingSoon': 'Bald',

  'onboarding.name.title': 'Wie sollen wir dich nennen?',
  'onboarding.name.subtitle': 'Du kannst das später ändern.',
  'onboarding.name.placeholder': 'Freund',

  'onboarding.rhythm.title': 'Wie viel an einem guten Tag?',
  'onboarding.rhythm.subtitle':
    'Keine Serien, kein Druck. Wir treffen dich, wo du bist.',
  'onboarding.rhythm.coffeeBreak': 'Eine Kaffeepause',
  'onboarding.rhythm.quickVisit': 'Ein kurzer Besuch',
  'onboarding.rhythm.realChunk': 'Ein richtiges Stück',
  'onboarding.rhythm.deepDive': 'Tief eintauchen',

  'onboarding.complete.title': 'Alles bereit, {name}.',
  'onboarding.complete.subtitle':
    '{flag} {language}, etwa {minutes} min an einem guten Tag. Geschichten sind gratis für dich, zwei pro Woche.',
  'onboarding.complete.summary.learning': 'Lernsprache',
  'onboarding.complete.summary.rhythm': 'Rhythmus',
  'onboarding.complete.summary.pricing': 'Preis',
  'onboarding.complete.summary.minutesPerDay': '{minutes} min / Tag',
  'onboarding.complete.summary.freeAll': 'Kostenlos, den ganzen Weg',

  // Home
  'home.welcomeBack': 'Willkommen zurück,',
  'home.greetWho': '{name}.',
  'home.wordsKnown': '{count} Wörter',
  'home.fourOfFive': '4 der letzten 5 Tage',
  'home.lovelyRhythm': 'Schöner Rhythmus. Kein Druck, das perfekt zu halten.',
  'home.unitLabel': 'Einheit 01 · {level} · {name}',
  'home.pickUp': 'Mach da weiter, wo du aufgehört hast',
  'home.upNext': 'Als Nächstes',
  'home.minutes': '{count} min',
  'home.allDoneTitle': 'Du hast die ganze Einheit geschafft. ✨',
  'home.allDoneBody':
    'Atme durch. Die nächste Einheit kommt bald — und deine fertigen Lektionen bleiben hier.',
  'home.story.bonus': 'Bonus-Geschichte für Abonnenten',

  // Lesson + exercises
  'lesson.translate.kicker': 'Übersetze den Satz',
  'lesson.translate.title': 'Tippe die Wörter, um den Satz zu bilden',
  'lesson.translate.placeholder': 'Tippe Wörter unten…',
  'lesson.feedback.theAnswerIs': 'Die Antwort ist:',
  'lesson.feedback.thePhraseIs': 'Der Satz ist:',

  'lesson.choice.kicker': 'Wähl die richtige',
  'lesson.choice.title': 'Wie sagt man…',

  'lesson.listen.kicker': 'Hör zu',
  'lesson.listen.title': 'Was hast du gehört?',
  'lesson.listen.replay': 'Tippen zum Wiederholen',

  'lesson.match.kicker': 'Verbinde die Paare',
  'lesson.match.title': 'Tippe ein Wort, dann seine Übersetzung.',

  // Celebration
  'celebration.cta': 'Weiter',
  'celebration.youFinished': 'Du hast {title} geschafft.',
  'celebration.cheer.lovely.kicker': 'Schön.',
  'celebration.cheer.lovely.body': 'Eine mehr im Sack.',
  'celebration.cheer.beautifully.kicker': 'Schön gemacht.',
  'celebration.cheer.beautifully.body':
    'Neue Wörter weggeräumt — sie bleiben am besten, wenn du wiederkommst.',
  'celebration.cheer.lookAtYou.kicker': 'Schau dich an.',
  'celebration.cheer.lookAtYou.body':
    'Ein paar Minuten mehr, ein paar Wörter mehr, die du kennst.',
  'celebration.cheer.quietly.kicker': 'Leise hervorragend.',
  'celebration.cheer.quietly.body':
    'Keine Eile, keine Serie — nur stetiger, echter Fortschritt.',
  'celebration.cheer.thereItIs.kicker': 'Da ist es.',
  'celebration.cheer.thereItIs.body':
    'Diese kleinen Siege summieren sich mit der Zeit.',
  'celebration.stat.exercises': 'Übungen',
  'celebration.stat.newWords': 'neue Wörter',
  'celebration.stat.time': 'Zeit',
  'celebration.time.seconds': '{seconds} Sek',
  'celebration.time.minutes': '{minutes} min',
  'celebration.time.minutesSeconds': '{minutes}m {seconds}s',

  // Breather
  'breather.title': 'Gönn dir eine Pause.',
  'breather.message':
    'Das war knifflig. Gehirne lernen besser mit kurzen Pausen — die Forschung sagt das auch. Komm gleich wieder und versuch es nochmal.',
  'breather.untilReopens': 'Bis diese Lektion wieder öffnet',
  'breather.meanwhile': 'In der Zwischenzeit',
  'breather.review.title': 'Wiederhole bekannte Wörter',
  'breather.review.meta': 'Sanftes Aufwärmen · 2 min',
  'breather.story.title': 'Hör eine Geschichte',
  'breather.story.meta': 'Immer kostenlos für dich · 4 min',

  // Stories
  'stories.title': 'Geschichten',
  'stories.intro.kicker': 'Pip-Geschichten · {flag} {language}',
  'stories.intro.title': 'Audio-Geschichten, um echtes {language} aufzuschnappen.',
  'stories.intro.body':
    'Kurze, schön gesprochene Geschichten auf deinem Niveau — zum Hören, Mitlesen oder beidem.',
  'stories.freeStrip.strong': 'Zwei Geschichten pro Woche, immer kostenlos.',
  'stories.freeStrip.body': 'Kein Abo nötig.',
  'stories.level.beginner': 'Anfänger',
  'stories.level.intermediate': 'Mittelstufe',
  'stories.level.advanced': 'Fortgeschritten',
  'stories.freeThisWeek': 'DIESE WOCHE GRATIS',
  'stories.pip+': 'PIP+',
  'stories.duration': '{count} min',

  // Progress
  'progress.title': 'Fortschritt',
  'progress.subtitle': 'Wir feuern dich leise an.',
  'progress.stat.wordsKnown': 'gelernte Wörter',
  'progress.stat.minutesThisWeek': 'min diese Woche',
  'progress.stat.goalADay': 'Ziel pro Tag',
  'progress.thisWeek': 'Rhythmus dieser Woche',
  'progress.daysOfSeven': '{count} von 7',
  'progress.recentLabel': 'Zuletzt abgeschlossen',
  'progress.recentEmpty': 'Mach eine Lektion fertig und sie taucht hier auf. Keine Eile.',
  'progress.encouragement.steady':
    'Schöner stetiger Rhythmus. Verpasste Tage löschen nicht, was du gelernt hast.',
  'progress.encouragement.building':
    'Du baust leise auf. Keine Serie zu jagen, nur Wörter, die sich sammeln.',
  'progress.encouragement.fresh':
    'Eine frische Woche. Wann immer du wiederkommst, pip ist da.',
  'progress.noStreaks.title': 'Keine Serien, kein Druck.',
  'progress.noStreaks.body':
    'Pip merkt sich, was du weißt, nicht was du verpasst hast. Wenn du wiederkommst, machst du da weiter, wo du warst.',

  // App language
  'lang.appLanguage': 'App-Sprache',
  'lang.uiLocale.en': 'Englisch (English)',
  'lang.uiLocale.es': 'Spanisch (Español)',
  'lang.uiLocale.fr': 'Französisch (Français)',
  'lang.uiLocale.de': 'Deutsch',
  'lang.uiLocale.pt': 'Portugiesisch (Português)',
  'lang.uiLocale.it': 'Italienisch (Italiano)',

  // You / Settings
  'you.title': 'Du',
  'you.subtitle': 'Einstellungen, deine Art.',
  'you.profile.tagline': 'Tippen zum Bearbeiten · kostenlos, den ganzen Weg',
  'you.languageHint':
    'Tippe auf den Sprach-Chip auf Start, um Kurse zu wechseln oder einen neuen hinzuzufügen.',
  'you.section.language': 'Sprache',
  'you.appLanguage.title': 'App-Sprache',
  'you.appLanguage.help': 'Worin pips Oberfläche ist',
  'you.section.settings': 'Einstellungen',
  'you.setting.slowSpeech.title': 'Langsamer sprechen',
  'you.setting.slowSpeech.help': 'Liest Aufgaben etwas langsamer',
  'you.setting.reduceMotion.title': 'Bewegungen reduzieren',
  'you.setting.reduceMotion.help': 'Ruhigere Übergänge',
  'you.setting.haptic.title': 'Haptisches Feedback',
  'you.setting.haptic.help': 'Sanfte Stöße bei richtigen Antworten',
  'you.section.about': 'Über',
  'you.about.title': 'Pip ist kostenlos, den ganzen Weg.',
  'you.about.body':
    'Nur die Geschichten kosten etwas. Keine Serien, keine Ligen, keine Scham. Wir drücken dir die Daumen.',
  'you.signOut': 'Abmelden',
  'you.signOut.confirmTitle': 'Abmelden?',
  'you.signOut.confirmBody':
    'Dein Fortschritt ist auf dem Server gespeichert. Du kannst dich jederzeit wieder anmelden.',
  'you.editName.title': 'Dein Name',
  'you.editName.heading': 'Wie sollen wir dich nennen?',
  'you.editName.subtitle':
    'Wie du willst — Kleinbuchstaben sind okay, wir fassen das nicht an.',

  // Language sheet
  'lang.yourCourses': 'Deine Kurse',
  'lang.tapToSwitch': 'Tippe einen an, um zu wechseln.',
  'lang.addLanguage': 'Sprache hinzufügen',
  'lang.pickAnother': 'Wähl eine weitere zum Lernen.',
  'lang.fullCatalog': 'Du bist in allem eingeschrieben, was wir haben.',
  'lang.fromSource': 'Aus dem {source}',
  'lang.comingSoon': 'Bald',

  // Course welcome
  'welcome.course.title': 'Willkommen bei {language}.',
  'welcome.course.body':
    'Lass dir Zeit. Wir behalten deinen Fortschritt, wann immer du wiederkommst.',
  'welcome.course.cta': 'Loslegen',

  // Errors
  'error.network': 'Pip-Server unter {url} nicht erreichbar',
  'error.unauthorized': 'Bitte melde dich nochmal an.',
};

import type { Translations } from './en';

// Italian UI. Best-effort translations; native review encouraged.
export const it: Partial<Translations> = {
  // Common
  'common.continue': 'Continua',
  'common.skip': 'Salta',
  'common.cancel': 'Annulla',
  'common.save': 'Salva',
  'common.check': 'Verifica',
  'common.tryAgain': 'Riprova',
  'common.moveOn': 'Vai avanti',
  'common.start': 'Inizia',
  'common.resume': 'Riprendi',
  'common.begin': 'Iniziamo',
  'common.add': '+ Aggiungi',
  'common.switch': 'Cambia',
  'common.noRush': 'Con calma',
  'common.lovely': 'Bravo.',
  'common.almost': 'Quasi.',

  // Tab bar
  'tab.learn': 'Impara',
  'tab.stories': 'Storie',
  'tab.progress': 'Progresso',
  'tab.you': 'Tu',

  // Auth
  'auth.welcome': 'Benvenuto.',
  'auth.subtitle':
    'Pip si sincronizza fra dispositivi. Accedi per riprendere da dove avevi lasciato.',
  'auth.tab.signIn': 'Accedi',
  'auth.tab.signUp': 'Crea account',
  'auth.field.name': 'Nome',
  'auth.field.email': 'Email',
  'auth.field.password': 'Password',
  'auth.placeholder.name': 'Come ti chiamiamo?',
  'auth.placeholder.email': 'tu@daqualcheparte.com',
  'auth.placeholder.passwordSignUp': 'Almeno 8 caratteri',
  'auth.cta.signIn': 'Accedi',
  'auth.cta.signUp': 'Crea account',
  'auth.error.missing': 'Servono email e password.',
  'auth.error.shortPassword': 'La password deve avere almeno 8 caratteri.',
  'auth.error.generic': 'Qualcosa è andato storto. Riproviamo?',
  'auth.fineprint.signUp':
    'Creando un account accetti che questa è una pre-versione e i tuoi dati possono essere reimpostati.',
  'auth.fineprint.signIn':
    'Accedendo accetti che questa è una pre-versione e i tuoi dati possono essere reimpostati.',

  // Onboarding
  'onboarding.welcome.title': 'Ciao. Siamo Pip.',
  'onboarding.welcome.subtitleA': 'Un modo gentile di imparare una lingua.',
  'onboarding.welcome.subtitleB': 'Gratis, fino in fondo.',
  'onboarding.welcome.bullet.noStreaks': 'Niente strisce, niente classifiche, niente vergogna',
  'onboarding.welcome.bullet.noPunish': 'Gli errori sono pause, non punizioni',
  'onboarding.welcome.bullet.storiesOnly': 'Solo le storie sono a pagamento',
  'onboarding.welcome.cta': 'Iniziamo',

  'onboarding.step.1of4': 'Passo 1 di 5',
  'onboarding.step.2of4': 'Passo 2 di 5',
  'onboarding.step.3of4': 'Passo 3 di 5',
  'onboarding.step.4of4': 'Passo 4 di 5',

  'onboarding.base.title': 'Che lingua parli?',
  'onboarding.base.subtitle':
    "Per l'interfaccia dell'app. La lingua da imparare arriva subito dopo.",
  'onboarding.base.deviceDefault': 'Rilevata dal tuo dispositivo',

  'onboarding.language.title': 'Cosa vorresti imparare?',
  'onboarding.language.subtitle': 'Sceglierne una. Puoi aggiungerne altre più tardi.',
  'onboarding.language.fromEnglish': "Dall'inglese",
  'onboarding.language.comingSoon': 'In arrivo',

  'onboarding.name.title': 'Come ti chiamiamo?',
  'onboarding.name.subtitle': 'Puoi cambiarlo più tardi.',
  'onboarding.name.placeholder': 'Amico',

  'onboarding.rhythm.title': 'Quanto, in una buona giornata?',
  'onboarding.rhythm.subtitle':
    'Niente strisce, nessuna pressione. Ti incontriamo dove sei.',
  'onboarding.rhythm.coffeeBreak': 'Una pausa caffè',
  'onboarding.rhythm.quickVisit': 'Una visita veloce',
  'onboarding.rhythm.realChunk': 'Un bel pezzo',
  'onboarding.rhythm.deepDive': 'Tuffo profondo',

  'onboarding.complete.title': 'Tutto pronto, {name}.',
  'onboarding.complete.subtitle':
    '{flag} {language}, circa {minutes} min in una buona giornata. Le storie sono gratis per te, due a settimana.',
  'onboarding.complete.summary.learning': 'Stai imparando',
  'onboarding.complete.summary.rhythm': 'Ritmo',
  'onboarding.complete.summary.pricing': 'Prezzo',
  'onboarding.complete.summary.minutesPerDay': '{minutes} min / giorno',
  'onboarding.complete.summary.freeAll': 'Gratis, fino in fondo',

  // Home
  'home.welcomeBack': 'Bentornato,',
  'home.greetWho': '{name}.',
  'home.wordsKnown': '{count} parole',
  'home.fourOfFive': '4 degli ultimi 5 giorni',
  'home.lovelyRhythm': 'Bel ritmo. Senza pressione di tenerlo perfetto.',
  'home.unitLabel': 'Unità 01 · {level} · {name}',
  'home.pickUp': 'Riprendi da dove avevi lasciato',
  'home.upNext': 'Prossima',
  'home.minutes': '{count} min',
  'home.allDoneTitle': "Hai fatto tutta l'unità. ✨",
  'home.allDoneBody':
    "Prenditi un attimo. La prossima unità arriva presto — e le tue lezioni finite restano qui.",
  'home.story.bonus': 'Storia bonus per gli abbonati',

  // Lesson + exercises
  'lesson.translate.kicker': 'Traduci la frase',
  'lesson.translate.title': 'Tocca le parole per costruire la frase',
  'lesson.translate.placeholder': 'Tocca le parole sotto…',
  'lesson.feedback.theAnswerIs': 'La risposta è:',
  'lesson.feedback.thePhraseIs': 'La frase è:',

  'lesson.choice.kicker': 'Scegli quella giusta',
  'lesson.choice.title': 'Come si dice…',

  'lesson.listen.kicker': 'Ascolta',
  'lesson.listen.title': 'Cos\'hai sentito?',
  'lesson.listen.replay': 'Tocca per riascoltare',

  'lesson.match.kicker': 'Abbina le coppie',
  'lesson.match.title': "Tocca una parola, poi la sua coppia.",

  // Celebration
  'celebration.cta': 'Continua',
  'celebration.youFinished': 'Hai finito {title}.',
  'celebration.cheer.lovely.kicker': 'Bravo.',
  'celebration.cheer.lovely.body': 'Un\'altra fatta.',
  'celebration.cheer.beautifully.kicker': 'Ben fatto.',
  'celebration.cheer.beautifully.body':
    'Parole nuove archiviate — restano meglio quando ci torni sopra.',
  'celebration.cheer.lookAtYou.kicker': 'Guardati.',
  'celebration.cheer.lookAtYou.body':
    'Qualche minuto in più, qualche parola in più che conosci.',
  'celebration.cheer.quietly.kicker': 'Quietamente eccellente.',
  'celebration.cheer.quietly.body':
    'Senza fretta, senza striscia — solo progresso reale e costante.',
  'celebration.cheer.thereItIs.kicker': 'Ecco fatto.',
  'celebration.cheer.thereItIs.body':
    'Queste piccole vittorie si accumulano col tempo.',
  'celebration.stat.exercises': 'esercizi',
  'celebration.stat.newWords': 'parole nuove',
  'celebration.stat.time': 'tempo',
  'celebration.time.seconds': '{seconds} sec',
  'celebration.time.minutes': '{minutes} min',
  'celebration.time.minutesSeconds': '{minutes}m {seconds}s',

  // Breather
  'breather.title': 'Prendi fiato.',
  'breather.message':
    'Quella era difficile. Il cervello impara meglio con brevi pause — la ricerca lo conferma. Torna fra un po\' e riprova.',
  'breather.untilReopens': 'Finché la lezione si riapre',
  'breather.meanwhile': 'Nel frattempo',
  'breather.review.title': 'Rivedi parole che già conosci',
  'breather.review.meta': 'Riscaldamento dolce · 2 min',
  'breather.story.title': 'Ascolta una storia',
  'breather.story.meta': 'Sempre gratis per te · 4 min',

  // Stories
  'stories.title': 'Storie',
  'stories.intro.kicker': 'Storie Pip · {flag} {language}',
  'stories.intro.title': 'Racconti audio per cogliere il {language} vero.',
  'stories.intro.body':
    'Storie brevi, ben narrate al tuo livello — da ascoltare, leggere insieme o entrambi.',
  'stories.freeStrip.strong': 'Due storie a settimana sempre gratis.',
  'stories.freeStrip.body': 'Senza abbonamento.',
  'stories.level.beginner': 'Principiante',
  'stories.level.intermediate': 'Intermedio',
  'stories.level.advanced': 'Avanzato',
  'stories.freeThisWeek': 'GRATIS QUESTA SETTIMANA',
  'stories.pip+': 'PIP+',
  'stories.duration': '{count} min',

  // Progress
  'progress.title': 'Progresso',
  'progress.subtitle': 'Tifiamo per te in silenzio.',
  'progress.stat.wordsKnown': 'parole imparate',
  'progress.stat.minutesThisWeek': 'min questa settimana',
  'progress.stat.goalADay': 'obiettivo al giorno',
  'progress.thisWeek': 'Il ritmo della settimana',
  'progress.daysOfSeven': '{count} su 7',
  'progress.recentLabel': 'Completate di recente',
  'progress.recentEmpty':
    'Finisci una lezione e apparirà qui. Senza fretta.',
  'progress.encouragement.steady':
    "Bel ritmo costante. I giorni saltati non cancellano ciò che hai imparato.",
  'progress.encouragement.building':
    'Stai costruendo in silenzio. Nessuna striscia da inseguire, solo parole che si accumulano.',
  'progress.encouragement.fresh':
    'Una settimana fresca. Quando torni, pip è qui.',
  'progress.noStreaks.title': 'Niente strisce, nessuna pressione.',
  'progress.noStreaks.body':
    'Pip tiene conto di ciò che sai, non di ciò che hai saltato. Quando torni, riprendi da dove eri.',

  // App language
  'lang.appLanguage': "Lingua dell'app",
  'lang.uiLocale.en': 'Inglese (English)',
  'lang.uiLocale.es': 'Spagnolo (Español)',
  'lang.uiLocale.fr': 'Francese (Français)',
  'lang.uiLocale.de': 'Tedesco (Deutsch)',
  'lang.uiLocale.pt': 'Portoghese (Português)',
  'lang.uiLocale.it': 'Italiano',

  // You / Settings
  'you.title': 'Tu',
  'you.subtitle': 'Impostazioni a modo tuo.',
  'you.profile.tagline': 'Tocca per modificare · gratis, fino in fondo',
  'you.languageHint':
    "Tocca il chip della lingua sulla home per cambiare corso o aggiungerne uno nuovo.",
  'you.section.language': 'Lingua',
  'you.appLanguage.title': "Lingua dell'app",
  'you.appLanguage.help': "L'interfaccia di pip",
  'you.section.settings': 'Impostazioni',
  'you.setting.slowSpeech.title': 'Parlato più lento',
  'you.setting.slowSpeech.help': 'Legge le frasi un po\' più piano',
  'you.setting.reduceMotion.title': 'Riduci movimento',
  'you.setting.reduceMotion.help': 'Transizioni più calme',
  'you.setting.haptic.title': 'Feedback aptico',
  'you.setting.haptic.help': 'Tocchi delicati sulle risposte giuste',
  'you.section.about': 'Informazioni',
  'you.about.title': 'Pip è gratis, fino in fondo.',
  'you.about.body':
    'Solo le storie sono a pagamento. Niente strisce, niente classifiche, niente vergogna. Tifiamo per te.',
  'you.signOut': 'Esci',
  'you.signOut.confirmTitle': 'Esci?',
  'you.signOut.confirmBody':
    'Il tuo progresso è salvato sul server. Puoi rientrare quando vuoi.',
  'you.editName.title': 'Il tuo nome',
  'you.editName.heading': 'Come ti chiamiamo?',
  'you.editName.subtitle':
    "Come vuoi — minuscolo va bene, non lo sistemiamo.",

  // Language sheet
  'lang.yourCourses': 'I tuoi corsi',
  'lang.tapToSwitch': 'Tocca uno per cambiare.',
  'lang.addLanguage': 'Aggiungi lingua',
  'lang.pickAnother': "Scegline un'altra per iniziare.",
  'lang.fullCatalog': 'Sei iscritto a tutto quello che abbiamo.',
  'lang.fromSource': "Dall'{source}",
  'lang.comingSoon': 'In arrivo',

  // Errors
  'error.network': 'Impossibile raggiungere pip-server a {url}',
  'error.unauthorized': 'Accedi di nuovo, per favore.',
};

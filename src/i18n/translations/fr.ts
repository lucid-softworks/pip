import type { Translations } from './en';

// French UI. Best-effort translations; native review encouraged.
export const fr: Partial<Translations> = {
  // Common
  'common.continue': 'Continuer',
  'common.skip': 'Passer',
  'common.cancel': 'Annuler',
  'common.save': 'Enregistrer',
  'common.check': 'Vérifier',
  'common.tryAgain': 'Réessayer',
  'common.moveOn': 'Passer',
  'common.start': 'Commencer',
  'common.resume': 'Reprendre',
  'common.begin': 'Commencer',
  'common.add': '+ Ajouter',
  'common.switch': 'Changer',
  'common.noRush': 'Sans hâte',
  'common.lovely': 'Bravo.',
  'common.almost': 'Presque.',

  // Tab bar
  'tab.learn': 'Apprendre',
  'tab.stories': 'Histoires',
  'tab.progress': 'Progrès',
  'tab.you': 'Vous',

  // Auth
  'auth.welcome': 'Bienvenue.',
  'auth.subtitle':
    'Pip se synchronise sur tous tes appareils. Connecte-toi pour reprendre où tu en étais.',
  'auth.tab.signIn': 'Se connecter',
  'auth.tab.signUp': 'Créer un compte',
  'auth.field.name': 'Nom',
  'auth.field.email': 'Email',
  'auth.field.password': 'Mot de passe',
  'auth.placeholder.name': 'Comment on t\'appelle ?',
  'auth.placeholder.email': 'toi@quelquepart.com',
  'auth.placeholder.passwordSignUp': '8 caractères minimum',
  'auth.cta.signIn': 'Se connecter',
  'auth.cta.signUp': 'Créer un compte',
  'auth.error.missing': 'Email et mot de passe requis.',
  'auth.error.shortPassword': 'Le mot de passe doit faire au moins 8 caractères.',
  'auth.error.generic': 'Quelque chose a mal tourné. On réessaie ?',
  'auth.fineprint.signUp':
    'En créant un compte tu acceptes que ceci est une préversion et tes données peuvent être réinitialisées.',
  'auth.fineprint.signIn':
    'En te connectant tu acceptes que ceci est une préversion et tes données peuvent être réinitialisées.',

  // Onboarding
  'onboarding.welcome.title': 'Salut. On est Pip.',
  'onboarding.welcome.subtitleA': 'Une façon douce d\'apprendre une langue.',
  'onboarding.welcome.subtitleB': 'Gratuit, du début à la fin.',
  'onboarding.welcome.bullet.noStreaks': 'Pas de séries, pas de classements, pas de honte',
  'onboarding.welcome.bullet.noPunish': 'Les erreurs c\'est du repos, pas une punition',
  'onboarding.welcome.bullet.storiesOnly': 'Seules les histoires sont payantes',
  'onboarding.welcome.cta': 'Commencer',

  'onboarding.step.1of4': 'Étape 1 sur 5',
  'onboarding.step.2of4': 'Étape 2 sur 5',
  'onboarding.step.3of4': 'Étape 3 sur 5',
  'onboarding.step.4of4': 'Étape 4 sur 5',

  'onboarding.base.title': 'Quelle est ta langue ?',
  'onboarding.base.subtitle':
    'Pour l\'interface de l\'application. La langue à apprendre vient ensuite.',
  'onboarding.base.deviceDefault': 'Détectée depuis ton appareil',

  'onboarding.language.title': 'Qu\'aimerais-tu apprendre ?',
  'onboarding.language.subtitle': 'Choisis-en une. Tu pourras en ajouter d\'autres plus tard.',
  'onboarding.language.fromEnglish': 'Depuis l\'anglais',
  'onboarding.language.comingSoon': 'Bientôt',

  'onboarding.name.title': 'Comment on t\'appelle ?',
  'onboarding.name.subtitle': 'Tu pourras le changer plus tard.',
  'onboarding.name.placeholder': 'Ami',

  'onboarding.rhythm.title': 'Combien, un bon jour ?',
  'onboarding.rhythm.subtitle':
    'Pas de séries, pas de pression. On te retrouve où que tu sois.',
  'onboarding.rhythm.coffeeBreak': 'Une pause café',
  'onboarding.rhythm.quickVisit': 'Une visite rapide',
  'onboarding.rhythm.realChunk': 'Un vrai bout',
  'onboarding.rhythm.deepDive': 'En profondeur',

  'onboarding.complete.title': 'Tout est prêt, {name}.',
  'onboarding.complete.subtitle':
    '{flag} {language}, environ {minutes} min un bon jour. Les histoires sont gratuites pour toi, deux par semaine.',
  'onboarding.complete.summary.learning': 'Apprentissage',
  'onboarding.complete.summary.rhythm': 'Rythme',
  'onboarding.complete.summary.pricing': 'Prix',
  'onboarding.complete.summary.minutesPerDay': '{minutes} min / jour',
  'onboarding.complete.summary.freeAll': 'Gratuit, du début à la fin',

  // Home
  'home.welcomeBack': 'Bon retour,',
  'home.greetWho': '{name}.',
  'home.wordsKnown': '{count} mots',
  'home.fourOfFive': '4 des 5 derniers jours',
  'home.lovelyRhythm': 'Joli rythme. Pas besoin que ce soit parfait.',
  'home.unitLabel': 'Unité 01 · {level} · {name}',
  'home.pickUp': 'Reprends où tu en étais',
  'home.upNext': 'À suivre',
  'home.minutes': '{count} min',
  'home.allDoneTitle': 'Tu as fait toute l\'unité. ✨',
  'home.allDoneBody':
    'Prends une pause. La prochaine unité arrivera bientôt — et tes leçons terminées resteront ici.',
  'home.story.bonus': 'Histoire bonus pour les abonnés',

  // Lesson + exercises
  'lesson.translate.kicker': 'Traduis la phrase',
  'lesson.translate.title': 'Touche les mots pour former la phrase',
  'lesson.translate.placeholder': 'Touche les mots ci-dessous…',
  'lesson.feedback.theAnswerIs': 'La réponse est :',
  'lesson.feedback.thePhraseIs': 'La phrase est :',

  'lesson.choice.kicker': 'Choisis la bonne',
  'lesson.choice.title': 'Comment on dit…',

  'lesson.listen.kicker': 'Écoute',
  'lesson.listen.title': 'Qu\'as-tu entendu ?',
  'lesson.listen.replay': 'Touche pour rejouer',

  'lesson.match.kicker': 'Associe les paires',
  'lesson.match.title': 'Touche un mot, puis sa paire.',

  // Celebration
  'celebration.cta': 'Continuer',
  'celebration.youFinished': 'Tu as terminé {title}.',
  'celebration.cheer.lovely.kicker': 'Bravo.',
  'celebration.cheer.lovely.body': 'Encore une de plus de faite.',
  'celebration.cheer.beautifully.kicker': 'Joliment fait.',
  'celebration.cheer.beautifully.body':
    'De nouveaux mots rangés — ils s\'ancrent quand tu y reviens.',
  'celebration.cheer.lookAtYou.kicker': 'Regarde-toi.',
  'celebration.cheer.lookAtYou.body':
    'Quelques minutes de plus, quelques mots de plus que tu connais.',
  'celebration.cheer.quietly.kicker': 'Discrètement excellent.',
  'celebration.cheer.quietly.body':
    'Pas de hâte, pas de série — juste un vrai progrès.',
  'celebration.cheer.thereItIs.kicker': 'Et voilà.',
  'celebration.cheer.thereItIs.body':
    'Ces petites victoires s\'accumulent avec le temps.',
  'celebration.stat.exercises': 'exercices',
  'celebration.stat.newWords': 'nouveaux mots',
  'celebration.stat.time': 'temps',
  'celebration.time.seconds': '{seconds} s',
  'celebration.time.minutes': '{minutes} min',
  'celebration.time.minutesSeconds': '{minutes}m {seconds}s',

  // Breather
  'breather.title': 'Prends une pause.',
  'breather.message':
    'C\'était difficile. Le cerveau apprend mieux avec de courtes pauses — la science le confirme. Reviens dans un moment et réessaie.',
  'breather.untilReopens': 'Jusqu\'à la réouverture de la leçon',
  'breather.meanwhile': 'En attendant',
  'breather.review.title': 'Révise des mots que tu connais',
  'breather.review.meta': 'Échauffement doux · 2 min',
  'breather.story.title': 'Écoute une histoire',
  'breather.story.meta': 'Toujours gratuit pour toi · 4 min',

  // Stories
  'stories.title': 'Histoires',
  'stories.intro.kicker': 'Histoires Pip · {flag} {language}',
  'stories.intro.title': 'Des récits audio pour saisir le {language} authentique.',
  'stories.intro.body':
    'Des histoires courtes et bien narrées à ton niveau — à écouter, à lire en parallèle, ou les deux.',
  'stories.freeStrip.strong': 'Deux histoires par semaine, toujours gratuites.',
  'stories.freeStrip.body': 'Pas d\'abonnement.',
  'stories.level.beginner': 'Débutant',
  'stories.level.intermediate': 'Intermédiaire',
  'stories.level.advanced': 'Avancé',
  'stories.freeThisWeek': 'GRATUIT CETTE SEMAINE',
  'stories.pip+': 'PIP+',
  'stories.duration': '{count} min',

  // Progress
  'progress.title': 'Progrès',
  'progress.subtitle': 'On t\'encourage en silence.',
  'progress.stat.wordsKnown': 'mots connus',
  'progress.stat.minutesThisWeek': 'min cette semaine',
  'progress.stat.goalADay': 'objectif par jour',
  'progress.thisWeek': 'Le rythme de la semaine',
  'progress.daysOfSeven': '{count} sur 7',
  'progress.recentLabel': 'Récemment terminé',
  'progress.recentEmpty': 'Termine une leçon et elle apparaîtra ici. Sans hâte.',
  'progress.encouragement.steady':
    'Joli rythme régulier. Les jours manqués n\'effacent pas ce que tu as appris.',
  'progress.encouragement.building':
    'Tu construis tranquillement. Pas de série à poursuivre, juste des mots qui s\'accumulent.',
  'progress.encouragement.fresh':
    'Une semaine fraîche. Quand tu reviens, pip sera là.',
  'progress.noStreaks.title': 'Pas de séries, pas de pression.',
  'progress.noStreaks.body':
    'Pip suit ce que tu sais, pas ce que tu as raté. Quand tu reviens, tu reprends où tu en étais.',

  // App language
  'lang.appLanguage': 'Langue de l\'app',
  'lang.uiLocale.en': 'Anglais (English)',
  'lang.uiLocale.es': 'Espagnol (Español)',
  'lang.uiLocale.fr': 'Français',
  'lang.uiLocale.de': 'Allemand (Deutsch)',
  'lang.uiLocale.pt': 'Portugais (Português)',
  'lang.uiLocale.it': 'Italien (Italiano)',

  // You / Settings
  'you.title': 'Vous',
  'you.subtitle': 'Réglages, à ta façon.',
  'you.profile.tagline': 'Touche pour modifier · gratuit, du début à la fin',
  'you.languageHint':
    'Touche la pastille de langue sur l\'accueil pour changer de cours ou en ajouter un.',
  'you.section.language': 'Langue',
  'you.appLanguage.title': 'Langue de l\'app',
  'you.appLanguage.help': 'L\'interface de pip',
  'you.section.settings': 'Réglages',
  'you.setting.slowSpeech.title': 'Parler plus lentement',
  'you.setting.slowSpeech.help': 'Lit les phrases un peu plus doucement',
  'you.setting.reduceMotion.title': 'Réduire les mouvements',
  'you.setting.reduceMotion.help': 'Transitions plus calmes',
  'you.setting.haptic.title': 'Retour haptique',
  'you.setting.haptic.help': 'Petites vibrations sur les bonnes réponses',
  'you.section.about': 'À propos',
  'you.about.title': 'Pip est gratuit, du début à la fin.',
  'you.about.body':
    'Seules les histoires sont payantes. Pas de séries, pas de classements, pas de honte. On est avec toi.',
  'you.signOut': 'Se déconnecter',
  'you.signOut.confirmTitle': 'Se déconnecter ?',
  'you.signOut.confirmBody':
    'Ton progrès est sauvegardé sur le serveur. Tu peux te reconnecter quand tu veux.',
  'you.editName.title': 'Ton nom',
  'you.editName.heading': 'Comment on t\'appelle ?',
  'you.editName.subtitle':
    'Comme tu veux — minuscules ça va, on n\'y touchera pas.',

  // Language sheet
  'lang.yourCourses': 'Tes cours',
  'lang.tapToSwitch': 'Touche-en un pour changer.',
  'lang.addLanguage': 'Ajouter une langue',
  'lang.pickAnother': 'Choisis-en une autre pour commencer.',
  'lang.fullCatalog': 'Tu es inscrit·e à tout ce qu\'on a.',
  'lang.fromSource': 'Depuis le {source}',
  'lang.comingSoon': 'Bientôt',

  // Course welcome
  'welcome.course.title': 'Bienvenue dans le {language}.',
  'welcome.course.body':
    "Prends ton temps. On garde ton progrès quand tu reviens.",
  'welcome.course.cta': 'On commence',

  // Errors
  'error.network': 'Impossible de joindre pip-server à {url}',
  'error.unauthorized': 'Reconnecte-toi s\'il te plaît.',
};

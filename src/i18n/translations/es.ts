import type { Translations } from './en';

// Spanish UI. Best-effort translations; native review encouraged.
export const es: Partial<Translations> = {
  // Common
  'common.continue': 'Continuar',
  'common.skip': 'Saltar',
  'common.cancel': 'Cancelar',
  'common.save': 'Guardar',
  'common.check': 'Comprobar',
  'common.tryAgain': 'Reintentar',
  'common.moveOn': 'Seguir',
  'common.start': 'Empezar',
  'common.resume': 'Continuar',
  'common.begin': 'Empezar',
  'common.add': '+ Añadir',
  'common.switch': 'Cambiar',
  'common.noRush': 'Sin prisa',
  'common.lovely': 'Estupendo.',
  'common.almost': 'Casi.',

  // Tab bar
  'tab.learn': 'Aprender',
  'tab.stories': 'Historias',
  'tab.progress': 'Progreso',
  'tab.you': 'Tú',

  // Auth
  'auth.welcome': 'Bienvenida.',
  'auth.subtitle':
    'Pip se sincroniza entre dispositivos. Inicia sesión para continuar donde lo dejaste.',
  'auth.tab.signIn': 'Iniciar sesión',
  'auth.tab.signUp': 'Crear cuenta',
  'auth.field.name': 'Nombre',
  'auth.field.email': 'Correo',
  'auth.field.password': 'Contraseña',
  'auth.placeholder.name': '¿Cómo te llamamos?',
  'auth.placeholder.email': 'tú@dondesea.com',
  'auth.placeholder.passwordSignUp': 'Mínimo 8 caracteres',
  'auth.cta.signIn': 'Iniciar sesión',
  'auth.cta.signUp': 'Crear cuenta',
  'auth.error.missing': 'Hace falta correo y contraseña.',
  'auth.error.shortPassword': 'La contraseña debe tener al menos 8 caracteres.',
  'auth.error.generic': 'Algo salió mal. ¿Lo intentas de nuevo?',
  'auth.fineprint.signUp':
    'Al crear una cuenta aceptas que esto es una versión preliminar y tus datos pueden reiniciarse.',
  'auth.fineprint.signIn':
    'Al iniciar sesión aceptas que esto es una versión preliminar y tus datos pueden reiniciarse.',

  // Onboarding
  'onboarding.welcome.title': 'Hola. Somos Pip.',
  'onboarding.welcome.subtitleA': 'Una forma amable de aprender un idioma.',
  'onboarding.welcome.subtitleB': 'Gratis, todo el camino.',
  'onboarding.welcome.bullet.noStreaks': 'Sin rachas, sin ligas, sin culpa',
  'onboarding.welcome.bullet.noPunish': 'Los errores son descanso, no castigo',
  'onboarding.welcome.bullet.storiesOnly': 'Solo las historias son de pago',
  'onboarding.welcome.cta': 'Empezar',

  'onboarding.step.1of4': 'Paso 1 de 5',
  'onboarding.step.2of4': 'Paso 2 de 5',
  'onboarding.step.3of4': 'Paso 3 de 5',

  'onboarding.language.title': '¿Qué te gustaría aprender?',
  'onboarding.language.subtitle': 'Elige uno. Puedes añadir más luego.',
  'onboarding.language.fromEnglish': 'Desde inglés',
  'onboarding.language.comingSoon': 'Próximamente',

  'onboarding.name.title': '¿Cómo te llamamos?',
  'onboarding.name.subtitle': 'Puedes cambiarlo más tarde.',
  'onboarding.name.placeholder': 'Amigo',

  'onboarding.rhythm.title': 'En un buen día, ¿cuánto?',
  'onboarding.rhythm.subtitle':
    'Sin rachas, sin presión. Te encontramos donde estés.',
  'onboarding.rhythm.coffeeBreak': 'Una pausa de café',
  'onboarding.rhythm.quickVisit': 'Una visita corta',
  'onboarding.rhythm.realChunk': 'Un buen rato',
  'onboarding.rhythm.deepDive': 'Bien metido',

  'onboarding.complete.title': 'Listo, {name}.',
  'onboarding.complete.subtitle':
    '{flag} {language}, unos {minutes} min en un buen día. Las historias son gratis para ti, dos por semana.',
  'onboarding.complete.summary.learning': 'Aprendiendo',
  'onboarding.complete.summary.rhythm': 'Ritmo',
  'onboarding.complete.summary.pricing': 'Precio',
  'onboarding.complete.summary.minutesPerDay': '{minutes} min / día',
  'onboarding.complete.summary.freeAll': 'Gratis, todo el camino',

  // Home
  'home.welcomeBack': 'Bienvenida,',
  'home.greetWho': '{name}.',
  'home.wordsKnown': '{count} palabras',
  'home.fourOfFive': '4 de los últimos 5 días',
  'home.lovelyRhythm': 'Buen ritmo. Sin presión por mantenerlo perfecto.',
  'home.unitLabel': 'Unidad 01 · {level} · {name}',
  'home.pickUp': 'Continúa donde lo dejaste',
  'home.upNext': 'Lo siguiente',
  'home.minutes': '{count} min',
  'home.allDoneTitle': 'Hiciste toda la unidad. ✨',
  'home.allDoneBody':
    'Tómate un respiro. La próxima unidad llegará pronto — y tus lecciones terminadas seguirán aquí cuando quieras volver.',
  'home.story.bonus': 'Historia extra para suscriptores',

  // Lesson + exercises
  'lesson.translate.kicker': 'Traduce la frase',
  'lesson.translate.title': 'Toca las palabras para formar la frase',
  'lesson.translate.placeholder': 'Toca palabras abajo…',
  'lesson.feedback.theAnswerIs': 'La respuesta es:',
  'lesson.feedback.thePhraseIs': 'La frase es:',

  'lesson.choice.kicker': 'Elige la correcta',
  'lesson.choice.title': '¿Cómo se dice…',

  'lesson.listen.kicker': 'Escucha',
  'lesson.listen.title': '¿Qué oíste?',
  'lesson.listen.replay': 'Toca para repetir',

  'lesson.match.kicker': 'Empareja',
  'lesson.match.title': 'Toca una palabra y luego su pareja.',

  // Celebration
  'celebration.cta': 'Continuar',
  'celebration.youFinished': 'Terminaste {title}.',
  'celebration.cheer.lovely.kicker': 'Estupendo.',
  'celebration.cheer.lovely.body': 'Otra lección a tu favor.',
  'celebration.cheer.beautifully.kicker': 'Bien hecho.',
  'celebration.cheer.beautifully.body':
    'Palabras nuevas guardadas — se quedan mejor cuando vuelves a ellas.',
  'celebration.cheer.lookAtYou.kicker': 'Mira eso.',
  'celebration.cheer.lookAtYou.body':
    'Unos minutos más, unas palabras más que conoces.',
  'celebration.cheer.quietly.kicker': 'Calladamente excelente.',
  'celebration.cheer.quietly.body':
    'Sin prisa, sin racha — solo progreso real.',
  'celebration.cheer.thereItIs.kicker': 'Ahí está.',
  'celebration.cheer.thereItIs.body':
    'Estos pequeños logros se acumulan con el tiempo.',
  'celebration.stat.exercises': 'ejercicios',
  'celebration.stat.newWords': 'palabras nuevas',
  'celebration.stat.time': 'tiempo',
  'celebration.time.seconds': '{seconds} seg',
  'celebration.time.minutes': '{minutes} min',
  'celebration.time.minutesSeconds': '{minutes}m {seconds}s',

  // Breather
  'breather.title': 'Respira un poco.',
  'breather.message':
    'Esa fue difícil. El cerebro aprende mejor con descansos cortos — la ciencia lo respalda. Vuelve en un rato e inténtalo otra vez.',
  'breather.untilReopens': 'Hasta que esta lección se reabra',
  'breather.meanwhile': 'Mientras tanto',
  'breather.review.title': 'Repasa palabras que ya sabes',
  'breather.review.meta': 'Un calentamiento suave · 2 min',
  'breather.story.title': 'Escucha una historia',
  'breather.story.meta': 'Siempre gratis para ti · 4 min',

  // Stories
  'stories.title': 'Historias',
  'stories.intro.kicker': 'Pip Historias · {flag} {language}',
  'stories.intro.title': 'Cuentos en audio para escuchar {language} de verdad.',
  'stories.intro.body':
    'Historias cortas y bien narradas a tu nivel — para escuchar, leer, o ambos.',
  'stories.freeStrip.strong': 'Dos historias por semana, siempre gratis.',
  'stories.freeStrip.body': 'Sin suscripción.',
  'stories.level.beginner': 'Principiante',
  'stories.level.intermediate': 'Intermedio',
  'stories.level.advanced': 'Avanzado',
  'stories.freeThisWeek': 'GRATIS ESTA SEMANA',
  'stories.pip+': 'PIP+',
  'stories.duration': '{count} min',

  // Progress
  'progress.title': 'Progreso',
  'progress.subtitle': 'Animándote en silencio.',
  'progress.stat.wordsKnown': 'palabras aprendidas',
  'progress.stat.minutesThisWeek': 'min esta semana',
  'progress.stat.goalADay': 'meta al día',
  'progress.thisWeek': 'Tu semana',
  'progress.daysOfSeven': '{count} de 7',
  'progress.recentLabel': 'Lo más reciente',
  'progress.recentEmpty':
    'Termina una lección y aparecerá aquí. Sin prisa.',
  'progress.encouragement.steady':
    'Buen ritmo constante. Los días que faltas no borran lo que has aprendido.',
  'progress.encouragement.building':
    'Construyendo en silencio. Sin racha que perseguir, solo palabras guardadas.',
  'progress.encouragement.fresh':
    'Una semana fresca. Cuando vuelvas, pip estará aquí.',
  'progress.noStreaks.title': 'Sin rachas, sin presión.',
  'progress.noStreaks.body':
    'Pip lleva la cuenta de lo que sabes, no de lo que faltaste. Cuando vuelves, retomas justo donde lo dejaste.',

  // App language
  'lang.appLanguage': 'Idioma de la app',
  'lang.uiLocale.en': 'Inglés (English)',
  'lang.uiLocale.es': 'Español',
  'lang.uiLocale.fr': 'Francés (Français)',
  'lang.uiLocale.de': 'Alemán (Deutsch)',
  'lang.uiLocale.pt': 'Portugués (Português)',
  'lang.uiLocale.it': 'Italiano',

  // Onboarding extras (added in i18n-base-language commit)
  'onboarding.step.4of4': 'Paso 4 de 5',
  'onboarding.base.title': '¿Qué idioma hablas?',
  'onboarding.base.subtitle':
    'Para la interfaz de la app. El idioma a aprender viene después.',
  'onboarding.base.deviceDefault': 'Detectado de tu dispositivo',

  // You / Settings
  'you.title': 'Tú',
  'you.subtitle': 'Ajustes a tu manera.',
  'you.profile.tagline': 'Toca para editar · gratis, todo el camino',
  'you.languageHint':
    'Toca el chip de idioma en Inicio para cambiar de curso o añadir uno nuevo.',
  'you.section.language': 'Idioma',
  'you.appLanguage.title': 'Idioma de la app',
  'you.appLanguage.help': 'En qué idioma está la interfaz',
  'you.section.settings': 'Ajustes',
  'you.setting.slowSpeech.title': 'Habla más lenta',
  'you.setting.slowSpeech.help': 'Lee las instrucciones un poco más despacio',
  'you.setting.reduceMotion.title': 'Reducir movimiento',
  'you.setting.reduceMotion.help': 'Transiciones más calmadas',
  'you.setting.haptic.title': 'Vibración háptica',
  'you.setting.haptic.help': 'Toques suaves en respuestas correctas',
  'you.section.about': 'Acerca de',
  'you.about.title': 'Pip es gratis, todo el camino.',
  'you.about.body':
    'Solo las historias son de pago. Sin rachas, sin ligas, sin culpa. Estamos contigo.',
  'you.signOut': 'Cerrar sesión',
  'you.signOut.confirmTitle': '¿Cerrar sesión?',
  'you.signOut.confirmBody':
    'Tu progreso está guardado en el servidor. Puedes volver a entrar cuando quieras.',
  'you.editName.title': 'Tu nombre',
  'you.editName.heading': '¿Cómo te llamamos?',
  'you.editName.subtitle':
    'Como tú quieras — minúsculas está bien, no lo cambiamos.',

  // Language sheet
  'lang.yourCourses': 'Tus cursos',
  'lang.tapToSwitch': 'Toca uno para cambiar.',
  'lang.addLanguage': 'Añadir idioma',
  'lang.pickAnother': 'Elige otro para empezar a aprender.',
  'lang.fullCatalog': 'Te has inscrito en todo lo que tenemos.',
  'lang.fromSource': 'Desde {source}',
  'lang.comingSoon': 'Próximamente',

  // Course welcome
  'welcome.course.title': 'Bienvenida a {language}.',
  'welcome.course.body':
    'Sin prisa. Guardamos tu progreso siempre que vuelvas.',
  'welcome.course.cta': 'Empezamos',

  // Errors
  'error.network': 'No se pudo conectar a pip-server en {url}',
  'error.unauthorized': 'Por favor inicia sesión otra vez.',
};

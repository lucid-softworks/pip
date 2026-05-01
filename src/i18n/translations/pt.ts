import type { Translations } from './en';

// Portuguese UI (BR-leaning). Best-effort; native review encouraged.
export const pt: Partial<Translations> = {
  // Common
  'common.continue': 'Continuar',
  'common.skip': 'Pular',
  'common.cancel': 'Cancelar',
  'common.save': 'Salvar',
  'common.check': 'Verificar',
  'common.tryAgain': 'Tentar de novo',
  'common.moveOn': 'Seguir',
  'common.start': 'Começar',
  'common.resume': 'Retomar',
  'common.begin': 'Começar',
  'common.add': '+ Adicionar',
  'common.switch': 'Trocar',
  'common.noRush': 'Sem pressa',
  'common.lovely': 'Lindo.',
  'common.almost': 'Quase.',

  // Tab bar
  'tab.learn': 'Aprender',
  'tab.stories': 'Histórias',
  'tab.progress': 'Progresso',
  'tab.you': 'Você',

  // Auth
  'auth.welcome': 'Bem-vindo.',
  'auth.subtitle':
    'Pip sincroniza entre dispositivos. Entre para continuar de onde parou.',
  'auth.tab.signIn': 'Entrar',
  'auth.tab.signUp': 'Criar conta',
  'auth.field.name': 'Nome',
  'auth.field.email': 'E-mail',
  'auth.field.password': 'Senha',
  'auth.placeholder.name': 'Como te chamamos?',
  'auth.placeholder.email': 'voce@algumlugar.com',
  'auth.placeholder.passwordSignUp': 'Pelo menos 8 caracteres',
  'auth.cta.signIn': 'Entrar',
  'auth.cta.signUp': 'Criar conta',
  'auth.error.missing': 'E-mail e senha são necessários.',
  'auth.error.shortPassword': 'A senha deve ter pelo menos 8 caracteres.',
  'auth.error.generic': 'Algo deu errado. Tentar de novo?',
  'auth.fineprint.signUp':
    'Ao criar uma conta você aceita que esta é uma versão preliminar e seus dados podem ser reiniciados.',
  'auth.fineprint.signIn':
    'Ao entrar você aceita que esta é uma versão preliminar e seus dados podem ser reiniciados.',

  // Onboarding
  'onboarding.welcome.title': 'Oi. Somos Pip.',
  'onboarding.welcome.subtitleA': 'Um jeito gentil de aprender um idioma.',
  'onboarding.welcome.subtitleB': 'Grátis, do começo ao fim.',
  'onboarding.welcome.bullet.noStreaks': 'Sem séries, sem ligas, sem vergonha',
  'onboarding.welcome.bullet.noPunish': 'Erros são descanso, não punição',
  'onboarding.welcome.bullet.storiesOnly': 'Só as histórias são pagas',
  'onboarding.welcome.cta': 'Começar',

  'onboarding.step.1of4': 'Passo 1 de 5',
  'onboarding.step.2of4': 'Passo 2 de 5',
  'onboarding.step.3of4': 'Passo 3 de 5',
  'onboarding.step.4of4': 'Passo 4 de 5',

  'onboarding.base.title': 'Que idioma você fala?',
  'onboarding.base.subtitle':
    'Para a interface do app. O idioma para aprender vem em seguida.',
  'onboarding.base.deviceDefault': 'Detectado pelo seu aparelho',

  'onboarding.language.title': 'O que você quer aprender?',
  'onboarding.language.subtitle': 'Escolha um. Você pode adicionar mais depois.',
  'onboarding.language.fromEnglish': 'A partir do inglês',
  'onboarding.language.comingSoon': 'Em breve',

  'onboarding.name.title': 'Como te chamamos?',
  'onboarding.name.subtitle': 'Você pode mudar depois.',
  'onboarding.name.placeholder': 'Amigo',

  'onboarding.rhythm.title': 'Quanto, num bom dia?',
  'onboarding.rhythm.subtitle':
    'Sem séries, sem pressão. A gente te encontra onde você estiver.',
  'onboarding.rhythm.coffeeBreak': 'Uma pausa pra café',
  'onboarding.rhythm.quickVisit': 'Uma visita rápida',
  'onboarding.rhythm.realChunk': 'Um bom pedaço',
  'onboarding.rhythm.deepDive': 'Mergulho fundo',

  'onboarding.complete.title': 'Tudo pronto, {name}.',
  'onboarding.complete.subtitle':
    '{flag} {language}, cerca de {minutes} min num bom dia. As histórias são grátis pra você, duas por semana.',
  'onboarding.complete.summary.learning': 'Aprendendo',
  'onboarding.complete.summary.rhythm': 'Ritmo',
  'onboarding.complete.summary.pricing': 'Preço',
  'onboarding.complete.summary.minutesPerDay': '{minutes} min / dia',
  'onboarding.complete.summary.freeAll': 'Grátis, do começo ao fim',

  // Home
  'home.welcomeBack': 'Bem-vindo de volta,',
  'home.greetWho': '{name}.',
  'home.wordsKnown': '{count} palavras',
  'home.fourOfFive': '4 dos últimos 5 dias',
  'home.lovelyRhythm': 'Belo ritmo. Sem pressão pra manter perfeito.',
  'home.unitLabel': 'Unidade 01 · {level} · {name}',
  'home.pickUp': 'Continue de onde parou',
  'home.upNext': 'A seguir',
  'home.minutes': '{count} min',
  'home.allDoneTitle': 'Você fez a unidade inteira. ✨',
  'home.allDoneBody':
    'Respira. A próxima unidade vem logo — e suas lições terminadas ficam aqui pra revisitar.',
  'home.story.bonus': 'História bônus para assinantes',

  // Lesson + exercises
  'lesson.translate.kicker': 'Traduza a frase',
  'lesson.translate.title': 'Toque nas palavras para formar a frase',
  'lesson.translate.placeholder': 'Toque nas palavras abaixo…',
  'lesson.feedback.theAnswerIs': 'A resposta é:',
  'lesson.feedback.thePhraseIs': 'A frase é:',

  'lesson.choice.kicker': 'Escolha a certa',
  'lesson.choice.title': 'Como se diz…',

  'lesson.listen.kicker': 'Escute',
  'lesson.listen.title': 'O que você ouviu?',
  'lesson.listen.replay': 'Toque para repetir',

  'lesson.match.kicker': 'Combine os pares',
  'lesson.match.title': 'Toque numa palavra, depois no par dela.',

  // Celebration
  'celebration.cta': 'Continuar',
  'celebration.youFinished': 'Você terminou {title}.',
  'celebration.cheer.lovely.kicker': 'Lindo.',
  'celebration.cheer.lovely.body': 'Mais uma na conta.',
  'celebration.cheer.beautifully.kicker': 'Muito bem feito.',
  'celebration.cheer.beautifully.body':
    'Palavras novas guardadas — elas pegam melhor quando você volta.',
  'celebration.cheer.lookAtYou.kicker': 'Olha você.',
  'celebration.cheer.lookAtYou.body':
    'Mais alguns minutos, mais algumas palavras que você sabe.',
  'celebration.cheer.quietly.kicker': 'Quietamente excelente.',
  'celebration.cheer.quietly.body':
    'Sem pressa, sem série — só progresso real e estável.',
  'celebration.cheer.thereItIs.kicker': 'Lá está.',
  'celebration.cheer.thereItIs.body':
    'Essas pequenas vitórias se acumulam com o tempo.',
  'celebration.stat.exercises': 'exercícios',
  'celebration.stat.newWords': 'palavras novas',
  'celebration.stat.time': 'tempo',
  'celebration.time.seconds': '{seconds} seg',
  'celebration.time.minutes': '{minutes} min',
  'celebration.time.minutesSeconds': '{minutes}m {seconds}s',

  // Breather
  'breather.title': 'Respira um pouco.',
  'breather.message':
    'Essa foi difícil. O cérebro aprende melhor com pausas curtas — a ciência confirma. Volte daqui a pouco e tente de novo.',
  'breather.untilReopens': 'Até esta lição reabrir',
  'breather.meanwhile': 'Enquanto isso',
  'breather.review.title': 'Revise palavras que você sabe',
  'breather.review.meta': 'Aquecimento leve · 2 min',
  'breather.story.title': 'Escute uma história',
  'breather.story.meta': 'Sempre grátis pra você · 4 min',

  // Stories
  'stories.title': 'Histórias',
  'stories.intro.kicker': 'Histórias Pip · {flag} {language}',
  'stories.intro.title': 'Contos em áudio para captar o {language} de verdade.',
  'stories.intro.body':
    'Histórias curtas e bem narradas no seu nível — para ouvir, ler junto, ou os dois.',
  'stories.freeStrip.strong': 'Duas histórias por semana sempre grátis.',
  'stories.freeStrip.body': 'Sem assinatura.',
  'stories.level.beginner': 'Iniciante',
  'stories.level.intermediate': 'Intermediário',
  'stories.level.advanced': 'Avançado',
  'stories.freeThisWeek': 'GRÁTIS ESTA SEMANA',
  'stories.pip+': 'PIP+',
  'stories.duration': '{count} min',

  // Progress
  'progress.title': 'Progresso',
  'progress.subtitle': 'Torcendo por você em silêncio.',
  'progress.stat.wordsKnown': 'palavras aprendidas',
  'progress.stat.minutesThisWeek': 'min esta semana',
  'progress.stat.goalADay': 'meta por dia',
  'progress.thisWeek': 'Ritmo da semana',
  'progress.daysOfSeven': '{count} de 7',
  'progress.recentLabel': 'Recentemente concluído',
  'progress.recentEmpty':
    'Termine uma lição e ela vai aparecer aqui. Sem pressa.',
  'progress.encouragement.steady':
    'Belo ritmo constante. Dias perdidos não desfazem o que você aprendeu.',
  'progress.encouragement.building':
    'Construindo em silêncio. Sem série pra perseguir, só palavras se acumulando.',
  'progress.encouragement.fresh':
    'Uma semana nova. Quando voltar, pip vai estar aqui.',
  'progress.noStreaks.title': 'Sem séries, sem pressão.',
  'progress.noStreaks.body':
    'Pip lembra do que você sabe, não do que perdeu. Quando voltar, retoma onde parou.',

  // App language
  'lang.appLanguage': 'Idioma do app',
  'lang.uiLocale.en': 'Inglês (English)',
  'lang.uiLocale.es': 'Espanhol (Español)',
  'lang.uiLocale.fr': 'Francês (Français)',
  'lang.uiLocale.de': 'Alemão (Deutsch)',
  'lang.uiLocale.pt': 'Português',
  'lang.uiLocale.it': 'Italiano',

  // You / Settings
  'you.title': 'Você',
  'you.subtitle': 'Configurações do seu jeito.',
  'you.profile.tagline': 'Toque para editar · grátis, do começo ao fim',
  'you.languageHint':
    'Toque no chip de idioma na tela inicial para trocar de curso ou adicionar um novo.',
  'you.section.language': 'Idioma',
  'you.appLanguage.title': 'Idioma do app',
  'you.appLanguage.help': 'Em qual idioma a interface de pip está',
  'you.section.settings': 'Configurações',
  'you.setting.slowSpeech.title': 'Fala mais lenta',
  'you.setting.slowSpeech.help': 'Lê as instruções um pouco mais devagar',
  'you.setting.reduceMotion.title': 'Reduzir movimento',
  'you.setting.reduceMotion.help': 'Transições mais calmas',
  'you.setting.haptic.title': 'Vibração',
  'you.setting.haptic.help': 'Toques suaves em respostas certas',
  'you.section.about': 'Sobre',
  'you.about.title': 'Pip é grátis, do começo ao fim.',
  'you.about.body':
    'Só as histórias são pagas. Sem séries, sem ligas, sem vergonha. Estamos com você.',
  'you.signOut': 'Sair',
  'you.signOut.confirmTitle': 'Sair?',
  'you.signOut.confirmBody':
    'Seu progresso está salvo no servidor. Pode voltar quando quiser.',
  'you.editName.title': 'Seu nome',
  'you.editName.heading': 'Como te chamamos?',
  'you.editName.subtitle':
    'Como você quiser — minúsculas estão bem, não vamos mexer.',

  // Language sheet
  'lang.yourCourses': 'Seus cursos',
  'lang.tapToSwitch': 'Toque num para trocar.',
  'lang.addLanguage': 'Adicionar idioma',
  'lang.pickAnother': 'Escolha outro para começar.',
  'lang.fullCatalog': 'Você se inscreveu em tudo que temos.',
  'lang.fromSource': 'A partir do {source}',
  'lang.comingSoon': 'Em breve',

  // Errors
  'error.network': 'Não conseguiu conectar ao pip-server em {url}',
  'error.unauthorized': 'Por favor entre de novo.',
};

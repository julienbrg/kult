/**
 * Translation system for the application
 * Contains all text strings organized by language
 */

import { Language } from '@/utils/i18n'

// Define the structure of our translations
type TranslationKeys = {
  common: {
    login: string
    logout: string
    back: string
    loading: string
    error: string
    success: string
  }
  home: {
    title: string
    sendEth: string
    transactionSuccess: string
    transactionFailed: string
    notConnected: string
    insufficientBalance: string
  }

  navigation: {
    newPage: string
  }
  newPage: {
    title: string
    subtitle: string
    accountInfo: string
    connectedAddress: string
    balance: string
    connectWallet: string
    lastTransaction: string
    backHome: string
  }
}

// Define translations for each supported language
type Translations = {
  [key in Language]: TranslationKeys
}

export const translations: Translations = {
  // English
  en: {
    common: {
      login: 'Login',
      logout: 'Logout',
      back: 'Back',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
    },
    home: {
      title: 'Hello world!',
      sendEth: 'Send 0.0001 ETH to self',
      transactionSuccess: 'Transaction successful',
      transactionFailed: 'Transaction failed',
      notConnected: 'Please connect your wallet',
      insufficientBalance: 'Please connect with an account that has a bit of ETH',
    },

    navigation: {
      newPage: 'New page',
    },
    newPage: {
      title: 'Welcome to New Page',
      subtitle: 'Unleash your imagination in this new page!',
      accountInfo: 'Account Information',
      connectedAddress: 'Connected Address:',
      balance: 'Balance:',
      connectWallet: 'Connect your wallet to get started',
      lastTransaction: 'Last Transaction:',
      backHome: 'Back Home',
    },
  },

  // Mandarin Chinese
  zh: {
    common: {
      login: '登录',
      logout: '登出',
      back: '返回',
      loading: '加载中...',
      error: '错误',
      success: '成功',
    },
    home: {
      title: '你好，世界！',
      sendEth: '向自己发送 0.0001 ETH',
      transactionSuccess: '交易成功',
      transactionFailed: '交易失败',
      notConnected: '请连接您的钱包',
      insufficientBalance: '请使用拥有一些 ETH 的账户连接',
    },

    navigation: {
      newPage: '新页面',
    },
    newPage: {
      title: '欢迎来到新页面',
      subtitle: '在这个新页面释放你的想象力！',
      accountInfo: '账户信息',
      connectedAddress: '已连接地址：',
      balance: '余额：',
      connectWallet: '连接您的钱包以开始',
      lastTransaction: '最后交易：',
      backHome: '返回首页',
    },
  },

  // Hindi
  hi: {
    common: {
      login: 'लॉगिन',
      logout: 'लॉगआउट',
      back: 'पीछे',
      loading: 'लोड हो रहा है...',
      error: 'त्रुटि',
      success: 'सफलता',
    },
    home: {
      title: 'नमस्ते दुनिया!',
      sendEth: 'स्वयं को 0.0001 ETH भेजें',
      transactionSuccess: 'लेन-देन सफल',
      transactionFailed: 'लेन-देन विफल',
      notConnected: 'कृपया अपना वॉलेट कनेक्ट करें',
      insufficientBalance: 'कृपया ऐसे खाते से कनेक्ट करें जिसमें थोड़ा ETH हो',
    },

    navigation: {
      newPage: 'नया पेज',
    },
    newPage: {
      title: 'नए पेज पर आपका स्वागत है',
      subtitle: 'इस नए पेज पर अपनी कल्पना को मुक्त करें!',
      accountInfo: 'खाता जानकारी',
      connectedAddress: 'कनेक्टेड पता:',
      balance: 'बैलेंस:',
      connectWallet: 'शुरू करने के लिए अपना वॉलेट कनेक्ट करें',
      lastTransaction: 'अंतिम लेनदेन:',
      backHome: 'होम पर वापस जाएं',
    },
  },

  // Spanish
  es: {
    common: {
      login: 'Iniciar sesión',
      logout: 'Cerrar sesión',
      back: 'Atrás',
      loading: 'Cargando...',
      error: 'Error',
      success: 'Éxito',
    },
    home: {
      title: '¡Hola mundo!',
      sendEth: 'Enviar 0.0001 ETH a sí mismo',
      transactionSuccess: 'Transacción exitosa',
      transactionFailed: 'Transacción fallida',
      notConnected: 'Por favor conecte su billetera',
      insufficientBalance: 'Por favor conecte con una cuenta que tenga un poco de ETH',
    },

    navigation: {
      newPage: 'Nueva página',
    },
    newPage: {
      title: 'Bienvenido a Nueva Página',
      subtitle: '¡Libera tu imaginación en esta nueva página!',
      accountInfo: 'Información de la cuenta',
      connectedAddress: 'Dirección conectada:',
      balance: 'Saldo:',
      connectWallet: 'Conecta tu billetera para comenzar',
      lastTransaction: 'Última transacción:',
      backHome: 'Volver a Inicio',
    },
  },

  // French
  fr: {
    common: {
      login: 'Connexion',
      logout: 'Déconnexion',
      back: 'Retour',
      loading: 'Chargement...',
      error: 'Erreur',
      success: 'Succès',
    },
    home: {
      title: 'Salut tout le monde !',
      sendEth: 'Envoyer 0.0001 ETH à soi-même',
      transactionSuccess: 'Transaction réussie',
      transactionFailed: 'Échec de la transaction',
      notConnected: 'Veuillez connecter votre wallet',
      insufficientBalance: "Veuillez vous connecter avec un compte qui possède un peu d'ETH",
    },

    navigation: {
      newPage: 'Nouvelle page',
    },
    newPage: {
      title: 'Bienvenue sur la nouvelle page',
      subtitle: 'Libérez votre imagination sur cette nouvelle page !',
      accountInfo: 'Informations du compte',
      connectedAddress: 'Adresse connectée :',
      balance: 'Solde :',
      connectWallet: 'Connectez votre wallet pour commencer',
      lastTransaction: 'Dernière transaction :',
      backHome: "Retour à l'accueil",
    },
  },

  // Arabic
  ar: {
    common: {
      login: 'تسجيل الدخول',
      logout: 'تسجيل الخروج',
      back: 'رجوع',
      loading: 'جاري التحميل...',
      error: 'خطأ',
      success: 'نجاح',
    },
    home: {
      title: 'مرحبا بالعالم!',
      sendEth: 'إرسال 0.0001 ETH لنفسك',
      transactionSuccess: 'تمت المعاملة بنجاح',
      transactionFailed: 'فشلت المعاملة',
      notConnected: 'يرجى توصيل محفظتك',
      insufficientBalance: 'يرجى الاتصال بحساب يحتوي على قليل من ETH',
    },

    navigation: {
      newPage: 'صفحة جديدة',
    },
    newPage: {
      title: 'مرحبًا بك في الصفحة الجديدة',
      subtitle: 'أطلق العنان لخيالك في هذه الصفحة الجديدة!',
      accountInfo: 'معلومات الحساب',
      connectedAddress: 'العنوان المتصل:',
      balance: 'الرصيد:',
      connectWallet: 'قم بتوصيل محفظتك للبدء',
      lastTransaction: 'آخر معاملة:',
      backHome: 'العودة إلى الصفحة الرئيسية',
    },
  },

  // Bengali
  bn: {
    common: {
      login: 'লগ ইন',
      logout: 'লগ আউট',
      back: 'পিছনে',
      loading: 'লোড হচ্ছে...',
      error: 'ত্রুটি',
      success: 'সফল',
    },
    home: {
      title: 'ওহে বিশ্ব!',
      sendEth: 'নিজেকে 0.0001 ETH পাঠান',
      transactionSuccess: 'লেনদেন সফল',
      transactionFailed: 'লেনদেন ব্যর্থ',
      notConnected: 'অনুগ্রহ করে আপনার ওয়ালেট সংযুক্ত করুন',
      insufficientBalance: 'অনুগ্রহ করে এমন একটি অ্যাকাউন্টের সাথে সংযোগ করুন যার কিছু ETH আছে',
    },

    navigation: {
      newPage: 'নতুন পৃষ্ঠা',
    },
    newPage: {
      title: 'নতুন পৃষ্ঠায় স্বাগতম',
      subtitle: 'এই নতুন পৃষ্ঠায় আপনার কল্পনাকে মুক্ত করুন!',
      accountInfo: 'অ্যাকাউন্ট তথ্য',
      connectedAddress: 'সংযুক্ত ঠিকানা:',
      balance: 'ব্যালেন্স:',
      connectWallet: 'শুরু করতে আপনার ওয়ালেট সংযোগ করুন',
      lastTransaction: 'সর্বশেষ লেনদেন:',
      backHome: 'হোমে ফিরে যান',
    },
  },

  // Russian
  ru: {
    common: {
      login: 'Вход',
      logout: 'Выход',
      back: 'Назад',
      loading: 'Загрузка...',
      error: 'Ошибка',
      success: 'Успех',
    },
    home: {
      title: 'Привет, мир!',
      sendEth: 'Отправить 0.0001 ETH себе',
      transactionSuccess: 'Транзакция успешна',
      transactionFailed: 'Транзакция не удалась',
      notConnected: 'Пожалуйста, подключите ваш кошелек',
      insufficientBalance: 'Пожалуйста, подключитесь с аккаунтом, на котором есть немного ETH',
    },

    navigation: {
      newPage: 'Новая страница',
    },
    newPage: {
      title: 'Добро пожаловать на новую страницу',
      subtitle: 'Раскройте свое воображение на этой новой странице!',
      accountInfo: 'Информация об аккаунте',
      connectedAddress: 'Подключенный адрес:',
      balance: 'Баланс:',
      connectWallet: 'Подключите ваш кошелек, чтобы начать',
      lastTransaction: 'Последняя транзакция:',
      backHome: 'Вернуться на главную',
    },
  },

  // Portuguese
  pt: {
    common: {
      login: 'Entrar',
      logout: 'Sair',
      back: 'Voltar',
      loading: 'Carregando...',
      error: 'Erro',
      success: 'Sucesso',
    },
    home: {
      title: 'Olá, mundo!',
      sendEth: 'Enviar 0.0001 ETH para si mesmo',
      transactionSuccess: 'Transação bem-sucedida',
      transactionFailed: 'Falha na transação',
      notConnected: 'Por favor, conecte sua carteira',
      insufficientBalance: 'Por favor, conecte-se com uma conta que tenha um pouco de ETH',
    },

    navigation: {
      newPage: 'Nova página',
    },
    newPage: {
      title: 'Bem-vindo à Nova Página',
      subtitle: 'Libere sua imaginação nesta nova página!',
      accountInfo: 'Informações da Conta',
      connectedAddress: 'Endereço conectado:',
      balance: 'Saldo:',
      connectWallet: 'Conecte sua carteira para começar',
      lastTransaction: 'Última transação:',
      backHome: 'Voltar para a Página Inicial',
    },
  },

  // Urdu
  ur: {
    common: {
      login: 'لاگ ان',
      logout: 'لاگ آؤٹ',
      back: 'واپس',
      loading: 'لوڈ ہو رہا ہے...',
      error: 'خرابی',
      success: 'کامیابی',
    },
    home: {
      title: 'ہیلو دنیا!',
      sendEth: 'خود کو 0.0001 ETH بھیجیں',
      transactionSuccess: 'لین دین کامیاب',
      transactionFailed: 'لین دین ناکام',
      notConnected: 'براہ کرم اپنا والیٹ منسلک کریں',
      insufficientBalance: 'براہ کرم ایسے اکاؤنٹ سے منسلک ہوں جس میں تھوڑا سا ETH ہو',
    },

    navigation: {
      newPage: 'نیا صفحہ',
    },
    newPage: {
      title: 'نئے صفحے میں خوش آمدید',
      subtitle: 'اس نئے صفحے پر اپنے تخیل کو آزاد کریں!',
      accountInfo: 'اکاؤنٹ کی معلومات',
      connectedAddress: 'منسلک ایڈریس:',
      balance: 'بیلنس:',
      connectWallet: 'شروع کرنے کے لیے اپنا والیٹ منسلک کریں',
      lastTransaction: 'آخری لین دین:',
      backHome: 'ہوم پیج پر واپس جائیں',
    },
  },
}

/**
 * Get translations for the current language
 * @param language Current language code
 * @returns Translation object for the specified language
 */
export function getTranslations(language: Language) {
  return translations[language]
}

/**
 * Hook to use translations in components
 * @param language Current language code
 * @returns Translation object for the specified language
 */
export function useTranslations(language: Language) {
  return translations[language]
}

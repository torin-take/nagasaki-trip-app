import { useNavigate } from 'react-router-dom'
import { LANGUAGES, useLanguage } from '../LanguageContext.jsx'
import { t } from '../walkRingsText.js'
import { markWelcomed } from '../welcomeState.js'

// 01 Welcome — 初回起動時の言語選択画面。
// 仕様書 (Nagasaki Eats Walk Rings.dc.html / README) の "01 Welcome" に準拠。
export default function WelcomePage() {
  const navigate = useNavigate()
  const { lang, setLang } = useLanguage()

  const start = () => {
    markWelcomed()
    navigate('/', { replace: true })
  }

  return (
    <main className="relative min-h-dvh overflow-hidden bg-bg pb-[112px] font-body text-text">
      {/* 左上から画面外へにじみ出る同心円の飾り */}
      <div className="pointer-events-none absolute -left-10 -top-16 h-[400px] w-[400px]">
        <div className="absolute inset-0 rounded-full border-2 border-accent-200" />
        <div className="absolute inset-[70px] rounded-full border-2 border-accent-300" />
        <div className="absolute inset-[140px] rounded-full border-2 border-accent-400" />
        <div className="absolute left-[190px] top-[190px] h-5 w-5 rounded-full border-4 border-bg bg-text" />
        <div className="washed absolute left-[250px] top-[150px] h-[62px] w-[62px] overflow-hidden rounded-full shadow-[0_0_0_4px_var(--tw-shadow-color)] shadow-bg">
          <img src="/shops/kairakuen/menu1.jpg" alt="" className="h-full w-full object-cover" />
        </div>
        <div className="washed absolute left-[120px] top-[262px] h-[54px] w-[54px] overflow-hidden rounded-full shadow-[0_0_0_4px_var(--tw-shadow-color)] shadow-bg">
          <img src="/shops/pure/menu2.jpg" alt="" className="h-full w-full object-cover" />
        </div>
        <div className="washed absolute left-[300px] top-[300px] h-[58px] w-[58px] overflow-hidden rounded-full shadow-[0_0_0_4px_var(--tw-shadow-color)] shadow-bg">
          <img src="/shops/kamadojyaya/menu3.jpg" alt="" className="h-full w-full object-cover" />
        </div>
      </div>

      <div className="relative z-10 mt-[350px] px-[26px]">
        <h1 className="font-heading text-[34px] leading-[1.12] text-text">{t('welcome', lang)}</h1>
        <p className="mt-2.5 text-[14.5px] font-medium leading-[1.55] text-neutral-700">{t('welcomeSub', lang)}</p>

        <div className="mt-5 text-[13px] font-bold text-accent-700">{t('choose', lang)}</div>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => setLang(l.code)}
              className={`press flex h-[46px] items-center rounded-full px-[18px] text-[15px] ${
                lang === l.code
                  ? 'bg-text font-bold text-bg'
                  : 'bg-neutral-200 font-semibold text-text hover:bg-accent-200'
              }`}
            >
              {LANG_FULL_NAME[l.code]}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={start}
        className="press absolute bottom-[34px] left-[22px] right-[22px] flex h-[58px] items-center justify-center rounded-full bg-accent font-heading text-lg text-neutral-100 shadow-organic-lg"
      >
        {t('start', lang)} →
      </button>
    </main>
  )
}

const LANG_FULL_NAME = {
  en: 'English',
  zhCN: '简体中文',
  zhTW: '繁體中文',
  ko: '한국어',
  ja: '日本語',
}

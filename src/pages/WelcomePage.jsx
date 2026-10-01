import { useLayoutEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LANGUAGES, useLanguage } from '../LanguageContext.jsx'
import { t } from '../walkRingsText.js'
import { markWelcomed } from '../welcomeState.js'
import NightView from '../components/NightView.jsx'

// 01 Welcome — 初回起動時の言語選択画面。
// 背景は旧アプリの長崎の夜景（NightView）。「Discover / Nagasaki」の登場演出も
// アプリの一番最初のページであるここで再生する。
export default function WelcomePage() {
  const navigate = useNavigate()
  const { lang, setLang } = useLanguage()
  const titleRef = useRef(null)
  const [heroReady, setHeroReady] = useState(false)

  // タイトルの「中央→左上へ移動」演出のため、定位置での実寸・座標を測って
  // 「中心を画面中央へ運ぶ px 量」を CSS 変数にセットする。
  useLayoutEffect(() => {
    const el = titleRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const tx = window.innerWidth / 2 - (rect.left + rect.width / 2)
    const ty = window.innerHeight / 2 - (rect.top + rect.height / 2)
    el.style.setProperty('--hero-tx', `${tx}px`)
    el.style.setProperty('--hero-ty', `${ty}px`)
    setHeroReady(true)
  }, [])

  const start = () => {
    markWelcomed()
    navigate('/', { replace: true })
  }

  return (
    <main className="intro relative flex min-h-dvh flex-col overflow-hidden bg-night text-white">
      {/* 背景：長崎の夜景（フルブリード） */}
      <NightView className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-gradient-to-b from-night/25 via-night/30 to-night/95" />

      <div className="relative z-10 flex min-h-dvh flex-col px-6 pb-10 pt-14">
        {/* タイトル（周囲点灯後 → 中央に大きく → 左上へ移動して収まる） */}
        <header>
          <p
            className="anim-fade-up text-xs font-semibold uppercase tracking-[0.5em] text-gold"
            style={{ animationDelay: '2.5s' }}
          >
            Discover
          </p>
          <h1
            ref={titleRef}
            className={`mt-1 inline-block font-display uppercase leading-[0.9] tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] text-[clamp(2.25rem,11vw,3.5rem)] ${
              heroReady ? 'anim-title' : 'opacity-0'
            }`}
            style={{ animationDelay: '1s' }}
          >
            Nagasaki
          </h1>
        </header>

        {/* 言語選択・開始ボタン */}
        <div className="anim-fade-up mt-auto" style={{ animationDelay: '2.6s' }}>
          <h2 className="font-heading text-[26px] leading-[1.18] text-white">{t('welcome', lang)}</h2>
          <p className="mt-2 text-[14px] font-medium leading-[1.55] text-white/80">{t('welcomeSub', lang)}</p>

          <div className="mt-5 text-[13px] font-bold text-gold">{t('choose', lang)}</div>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                type="button"
                onClick={() => setLang(l.code)}
                className={`press flex h-[46px] items-center rounded-full px-[18px] text-[15px] ${
                  lang === l.code
                    ? 'bg-white font-bold text-night'
                    : 'bg-white/15 font-semibold text-white hover:bg-white/25'
                }`}
              >
                {LANG_FULL_NAME[l.code]}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={start}
            className="press mt-7 flex h-[58px] w-full items-center justify-center rounded-full bg-accent font-heading text-lg text-neutral-100 shadow-organic-lg"
          >
            {t('start', lang)} →
          </button>
        </div>
      </div>
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

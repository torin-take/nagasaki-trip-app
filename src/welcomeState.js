// 初回起動時の言語選択（01 Welcome画面）を見せたかどうかの記録。
// localStorageに保存するので、一度選べば次回以降は出さない
// （LanguageContextの言語選択そのものも localStorage に保存されており、連動している）。

const KEY = 'nagasaki_welcomed'

export function hasWelcomed() {
  try {
    return localStorage.getItem(KEY) === '1'
  } catch {
    return false
  }
}

export function markWelcomed() {
  try {
    localStorage.setItem(KEY, '1')
  } catch {
    // localStorageが使えない環境では毎回Welcomeが出るだけ（動作は継続する）
  }
}

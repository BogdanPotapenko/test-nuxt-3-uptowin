import type { Theme } from '~/types/theme'
import { THEMES } from '~/types/theme'

const THEME_COOKIE = 'theme'
const THEME_MAX_AGE = 60 * 60 * 24 * 365

function normalizeTheme(value: unknown): Theme {
  return THEMES.includes(value as Theme) ? (value as Theme) : 'system'
}

export function useTheme() {
  const cookie = useCookie<Theme>(THEME_COOKIE, {
    default: () => 'system',
    sameSite: 'lax',
    path: '/',
    maxAge: THEME_MAX_AGE,
  })

  const theme = useState<Theme>('theme', () => normalizeTheme(cookie.value))

  function setTheme(value: Theme): void {
    theme.value = value
    cookie.value = value
  }

  return {
    theme,
    themes: THEMES,
    setTheme,
  }
}

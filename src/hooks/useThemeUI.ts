import {FlowTheme} from "../lib/theme"
import {ThemeUIContextValue, useThemeUI as themeUIUseThemeUI} from "theme-ui"

interface FlowThemeContextValue extends Omit<ThemeUIContextValue, "theme"> {
  theme: FlowTheme
}

export const useThemeUI =
  themeUIUseThemeUI as unknown as () => FlowThemeContextValue

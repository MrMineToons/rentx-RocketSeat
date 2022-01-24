import 'styled-components';
import theme from './theme'; // Import type from above file

declare module 'styled-components' {
  type ThemeType = typeof theme // extends the global DefaultTheme with our ThemeType.
  export interface DefaultTheme extends ThemeType {}
}

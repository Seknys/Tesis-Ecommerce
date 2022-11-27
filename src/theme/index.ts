import { extendTheme } from "native-base";
import { color } from "native-base/lib/typescript/theme/styled-system";
import { colors } from "./colors";

export const theme = extendTheme({
  colors: {
    primary: colors.main,
    secondary: colors.sec,
  },
});

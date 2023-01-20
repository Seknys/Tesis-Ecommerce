import { extendTheme } from "native-base";
import { color } from "native-base/lib/typescript/theme/styled-system";
import { colors } from "./colors";

export const theme = extendTheme({
  colors: {
    primary: colors.main,
    secondary: colors.sec,
  },
  fontConfig: {
    Heebo: {
      300: {
        normal: "Heebo-light",
      },
      500: {
        normal: "Heebo-medium",
      },
      700: {
        normal: "Heebo-bold",
      },
    },
    Poppins: {
      300: {
        normal: "Poppins-light",
        italic: "Poppins-lightItalic",
      },
      500: {
        normal: "Poppins-medium",
        italic: "Poppins-meidumItalic",
      },
      700: {
        normal: "Poppins-bold",
        italic: "Poppins-boldItalic",
      },
    },
  },
  fonts: {
    heading: "Poppins",
    body: "Heebo",
  },
  components: {
    Text: {
      variants: {
        title: {
          fontFamily: "heading",
          fontWeight: "500",
        },
      },
      defaultProps: {
        fontFamily: "body",
        fontWeight: "500",
      },
    },
  },
});

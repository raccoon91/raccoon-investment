import { baseTheme, extendTheme, withDefaultColorScheme } from "@chakra-ui/react";

export const theme = extendTheme(
  {
    config: {
      initialColorMode: "dark",
      useSystemColorMode: true,
    },
    colors: {
      primary: baseTheme.colors.teal,
    },
    semanticTokens: {
      colors: {
        border: {
          _light: "gray.200",
          _dark: "whiteAlpha.400",
        },
      },
    },
    styles: {
      global: {
        "*": {
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            width: "6px",
          },
          _light: {
            "&::-webkit-scrollbar-thumb": {
              background: "gray.200",
              borderRadius: "3px",
            },
          },
          _dark: {
            "&::-webkit-scrollbar-thumb": {
              background: "whiteAlpha.400",
              borderRadius: "3px",
            },
          },
        },
      },
    },
    components: {
      Card: {
        baseStyle: {
          container: {
            border: "1px solid",
            _light: {
              borderColor: "gray.200",
            },
            _dark: {
              borderColor: "whiteAlpha.400",
            },
            boxShadow: "none",
          },
        },
      },
      Input: {
        baseStyle: {
          field: {
            _light: {
              _focusVisible: {
                border: "2px solid",
                borderColor: "teal.500",
                boxShadow: "none",
              },
            },
            _dark: {
              _focusVisible: {
                border: "2px solid",
                borderColor: "teal.300",
                boxShadow: "none",
              },
            },
          },
        },
      },
      Select: {
        baseStyle: {
          field: {
            _light: {
              _focusVisible: {
                border: "2px solid",
                borderColor: "teal.500",
                boxShadow: "none",
              },
            },
            _dark: {
              _focusVisible: {
                border: "2px solid",
                borderColor: "teal.300",
                boxShadow: "none",
              },
            },
          },
        },
      },
    },
  },
  withDefaultColorScheme({
    colorScheme: "primary",
  })
);

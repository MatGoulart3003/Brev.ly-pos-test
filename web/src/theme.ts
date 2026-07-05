import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

/**
 * Style guide tokens from the Figma file "Encurtador de Links".
 * Keep in sync with tailwind.config.js (Tailwind utilities).
 */
const config = defineConfig({
  globalCss: {
    body: {
      bg: "gray.200",
      color: "gray.600",
    },
  },
  theme: {
    tokens: {
      colors: {
        blue: {
          base: { value: "#2C46B1" },
          dark: { value: "#2C4091" },
        },
        gray: {
          100: { value: "#F9F9FB" },
          200: { value: "#E4E6EC" },
          300: { value: "#CDCFD5" },
          400: { value: "#74798B" },
          500: { value: "#4D505C" },
          600: { value: "#1F2025" },
        },
        danger: { value: "#B12C4D" },
        white: { value: "#FFFFFF" },
      },
      fonts: {
        heading: { value: `"Open Sans", sans-serif` },
        body: { value: `"Open Sans", sans-serif` },
      },
    },
    semanticTokens: {
      colors: {
        primary: { value: "{colors.blue.base}" },
        "primary.hover": { value: "{colors.blue.dark}" },
        fg: {
          error: { value: "{colors.danger}" },
        },
        border: {
          error: { value: "{colors.danger}" },
        },
      },
    },
    textStyles: {
      xl: {
        value: { fontSize: "24px", lineHeight: "32px", fontWeight: "700" },
      },
      lg: {
        value: { fontSize: "18px", lineHeight: "24px", fontWeight: "700" },
      },
      md: {
        value: { fontSize: "14px", lineHeight: "18px", fontWeight: "600" },
      },
      sm: {
        value: { fontSize: "12px", lineHeight: "16px", fontWeight: "400" },
      },
      xs: {
        value: {
          fontSize: "10px",
          lineHeight: "14px",
          fontWeight: "400",
          textTransform: "uppercase",
        },
      },
    },
    recipes: {
      button: {
        variants: {
          variant: {
            solid: {
              bg: "primary",
              color: "white",
              rounded: "lg",
              _hover: { bg: "primary.hover" },
              _expanded: { bg: "primary.hover" },
            },
            subtle: {
              bg: "gray.200",
              color: "gray.500",
              rounded: "sm",
              borderWidth: "1px",
              borderColor: "transparent",
              _hover: { borderColor: "blue.base", color: "gray.600" },
            },
          },
        },
      },
      input: {
        variants: {
          variant: {
            outline: {
              bg: "white",
              rounded: "lg",
              borderColor: "gray.300",
              color: "gray.600",
              _placeholder: { color: "gray.400" },
              _hover: { borderColor: "gray.400" },
              _focusVisible: {
                borderColor: "blue.base",
                borderWidth: "1.5px",
                outline: "none",
                boxShadow: "none",
              },
              _invalid: {
                borderColor: "danger",
                boxShadow: "none",
              },
            },
          },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);

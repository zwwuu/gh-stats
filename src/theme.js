import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  components: {
    Heading: {
      baseStyle: {
        mb: 3,
      },
    },
    Link: {
      baseStyle: {
        color: "blue.600",
        _hover: {
          textDecoration: "underline dotted",
          color: "blue.700",
        },
        _focus: {
          textDecoration: "underline dotted",
          color: "blue.700",
          boxShadow: "none",
        },
      },
      variants: {
        styleless: {
          color: "currentColor",
          _hover: {
            textDecoration: "none",
            color: "currentColor",
          },
          _focus: {
            textDecoration: "none",
            color: "currentColor",
          },
        },
      },
    },
  },
  styles: {
    global: {
      body: {
        bg: "#fffffe",
        color: "#232946",
      },
      p: {
        mb: 2,
      },
    },
  },
});

export default theme;

import { Box, Container, Flex, Icon, IconButton, Image, Link, Text, useColorMode } from "@chakra-ui/react";
import logo from "@public/images/logo.png";
import { MarkGithubIcon, MoonIcon, SunIcon } from "@primer/octicons-react";
import NextLink from "next/link";

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box as={"header"} bg={"gray.900"} color={"gray.100"} py={4}>
      <Container maxW="container.xl">
        <Flex alignItems={"center"} flexWrap={"wrap"} gap={4} justifyContent={"space-between"}>
          <NextLink href={"/"} legacyBehavior passHref>
            <Link alignItems={"center"} display={"flex"}>
              <Image
                alt="logo"
                boxSize="32px"
                htmlHeight={logo.height}
                htmlWidth={logo.width}
                src={"/images/logo.png"}
              />
              <Text as={"span"} ml={2}>
                GH Stats
              </Text>
            </Link>
          </NextLink>
          <Flex alignItems={"center"} gap={4}>
            <IconButton
              aria-label={"Toggle theme"}
              colorScheme={colorMode === "dark" ? "orange" : "gray.100"}
              icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
              variant={"link"}
              onClick={() => toggleColorMode()}
            />
            <Link href={"https://github.com/zwwuu/gh-stats"} title={"Source Code"} isExternal>
              <Icon as={MarkGithubIcon} boxSize={"24px"} />
            </Link>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}

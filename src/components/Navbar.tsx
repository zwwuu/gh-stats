import { Box, Container, Flex, Icon, Link, Text } from "@chakra-ui/react";
import logo from "../../public/images/logo.png";
import Image from "next/image";
import { MarkGithubIcon } from "@primer/octicons-react";
import NextLink from "next/link";

export default function Navbar() {
  return (
    <Box as={"header"} bg={"gray.800"} color={"white"} py={4}>
      <Container maxW="container.xl">
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <NextLink href={"/"} legacyBehavior passHref>
            <Link display={"flex"} alignItems={"center"}>
              <Image src={logo} alt="logo" width={logo.width} height={logo.height}
                     style={{ width: "32px", height: "32px" }} />
              <Text as={"span"} ml={2}>GH Stats</Text>
            </Link>
          </NextLink>
          <Link href={"https://github.com/zwwuu/gh-stats"} title={"Source Code"} isExternal>
            <Icon as={MarkGithubIcon} boxSize={"24px"} />
          </Link>
        </Flex>
      </Container>
    </Box>
  );
}

import { Flex, Icon, Image, Link } from "@chakra-ui/react";
import { RiGithubFill } from "react-icons/ri";
import logo from "../assets/images/logo.png";

const Navbar = () => (
  <Flex as={"header"} bg={"gray.800"} color={"white"} p={4} alignItems={"center"} justifyContent={"space-between"}>
    <Link href={"/"} display={"flex"} alignItems={"center"} variant={"styleless"} color={"white"}>
      <Image src={logo} alt="logo" mr={2} boxSize={10} htmlWidth={40} htmlHeight={40} />
      GH Stats
    </Link>
    <Link
      href={"https://github.com/zwwuu/gh-stats"}
      title={"Source Code"}
      variant={"styleless"}
      color={"white"}
      isExternal
    >
      <Icon as={RiGithubFill} boxSize={"24px"} verticalAlign={"middle"} />
    </Link>
  </Flex>
);

export default Navbar;

import Navbar from "./Navbar";
import { ReactNode } from "react";
import Ads from "./Ads";
import { Container } from "@chakra-ui/react";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <main>
        {children}
        <Container maxWidth={"container.xl"} py={3}>
          <Ads />
        </Container>
      </main>
    </>
  );
}

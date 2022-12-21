import Navbar from "./Navbar";
import { ReactNode } from "react";
import Ads from "./Ads";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Ads />
    </>
  );
}

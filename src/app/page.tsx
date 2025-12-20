"use client";

import { Ads, BookmarkSection, SearchSection, TrendingSection } from "@/components";
import Content from "@/components/layout/Content/Content";
import Sidebar from "@/components/layout/Sidebar/Sidebar";

export default function HomePage() {
  return (
    <>
      <Content>
        <SearchSection />
        <TrendingSection />
        <Ads />
      </Content>
      <Sidebar>
        <BookmarkSection />
      </Sidebar>
    </>
  );
}

"use client";

import { Heading, Text } from "@primer/react";

import { Card, CardBody } from "@/components";
import SearchBar from "@/components/ui/SearchBar/SearchBar";

export default function SearchSection() {
  return (
    <Card>
      <CardBody>
        <Heading as="h2">{process.env.NEXT_PUBLIC_APP_TITLE}</Heading>
        <Text as={"p"}>{process.env.NEXT_PUBLIC_APP_DESCRIPTION}</Text>
        <SearchBar />
      </CardBody>
    </Card>
  );
}

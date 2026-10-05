import { Stack } from "@primer/react";
import { SkeletonText } from "@primer/react/experimental";
import { Card, CardBody, CardHeader } from "@/components";

export default function RepoCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <SkeletonText size="titleLarge" />
      </CardHeader>
      <CardBody>
        <SkeletonText lines={3} size="bodyMedium" />
        <Stack
          align="center"
          direction="horizontal"
          gap={"condensed"}
          wrap="wrap"
        >
          <SkeletonText maxWidth={"8ch"} size="bodyMedium" />
          <SkeletonText maxWidth={"8ch"} size="bodyMedium" />
          <SkeletonText maxWidth={"8ch"} size="bodyMedium" />
          <SkeletonText maxWidth={"8ch"} size="bodyMedium" />
        </Stack>
      </CardBody>
    </Card>
  );
}

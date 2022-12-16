import { Card, CardBody, Spinner } from "@chakra-ui/react";

export default function SkeletonCard() {
  return (
    <Card align="center" variant={"outline"}>
      <CardBody display={"flex"}>
        <Spinner size={"xl"} thickness={"4px"} />
      </CardBody>
    </Card>
  );
}

import { Box, Heading, Text } from "@chakra-ui/react";
import Layout from "../components/layout";
import Seo from "../components/seo";

const NotFoundPage = () => {
  return (
    <Layout>
      <Seo title={"Not found"} />
      <Box maxW={"container.xl"} mx={"auto"} my={12} px={4}>
        <Heading as={"h1"}>404: Not Found</Heading>
        <Text as={"p"}>You just hit a route that doesn't exist... the sadness.</Text>
      </Box>
    </Layout>
  );
};

export default NotFoundPage;

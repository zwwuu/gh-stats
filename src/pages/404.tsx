import {Container, Heading, Text, VStack} from "@chakra-ui/react";
import {NextSeo} from "next-seo";

const NotFoundPage = () => {
    return (
        <>
            <NextSeo noindex={true} title={"Not Found"}/>
            <Container maxW={"container.xl"} py={12}>
                <VStack>
                    <Heading as={"h1"}>404: Not Found</Heading>
                    <Text>{"You just hit a route that doesn't exist... the sadness."}</Text>
                </VStack>
            </Container>
        </>
    );
};

export default NotFoundPage;

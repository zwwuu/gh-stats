import {
    Box,
    FormControl,
    FormLabel,
    Icon,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    VisuallyHidden
} from "@chakra-ui/react";
import {useState} from "react";
import {MarkGithubIcon, SearchIcon} from "@primer/octicons-react";
import {useRouter} from "next/router";

export default function SearchBar() {
    const [hasError, setHasError] = useState(false);
    const [input, setInput] = useState("");
    const router = useRouter();

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        const match = input.trim().match(/^(http(s)?(:\/\/))?(www\.)?(github\.com\/.*)/i);
        if (match) {
            setHasError(false);
            const data = input.replace(/^(http(s)?(:\/\/))?(www\.)?(github\.com\/)/i, "").split("/");
            const owner = data[0];
            const repo = data[1];
            router.push(`/${owner}/${repo}`);
        } else {
            setHasError(true);
        }
    };

    return (
        <Box as={"form"} width={"100%"} onSubmit={handleSubmit}>
            <FormControl isInvalid={hasError}>
                <VisuallyHidden>
                    <FormLabel htmlFor={"url"}>GitHub Repository URL</FormLabel>
                </VisuallyHidden>
                <InputGroup>
                    <InputLeftElement pointerEvents="none">
                        <Icon as={MarkGithubIcon}/>
                    </InputLeftElement>
                    <Input id="url" placeholder={"Enter a GitHub Repository URL"} type={"url"} value={input}
                           onChange={(event) => setInput(event.target.value)}/>
                    <IconButton aria-label="Search repo" icon={<Icon as={SearchIcon}/>} ml={2} type="submit"/>
                </InputGroup>
            </FormControl>
        </Box>
    );
};

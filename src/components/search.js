import {
  FormControl,
  FormLabel,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  VisuallyHidden,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { RiGithubFill, RiSearchLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const Search = () => {
  let navigate = useNavigate();

  let urlInput = useRef("");
  let [hasError, setHasError] = useState(false);

  let handleSubmit = (event) => {
    event.preventDefault();
    if (!urlInput.current.value.trim().match(/^(http(s)?(:\/\/))?(www\.)?(github\.com\/.*)/i)) {
      setHasError(true);
    } else {
      setHasError(false);
      const data = urlInput.current.value.replace(/^(http(s)?(:\/\/))?(www\.)?(github\.com\/)/i, "").split("/");
      const user = data[0];
      const repo = data[1];
      navigate(`/${user}/${repo}`);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <FormControl isInvalid={hasError}>
        <VisuallyHidden>
          <FormLabel htmlFor={"url"}>GitHub URL</FormLabel>
        </VisuallyHidden>
        <InputGroup>
          <InputLeftElement pointerEvents="none" children={<Icon as={RiGithubFill} />} />
          <Input ref={urlInput} id="url" placeholder={"https://github.com/wuuzw/gh-stats"} type={"url"} />
          <IconButton ml={2} type="submit" aria-label="Search repo" icon={<Icon as={RiSearchLine} />} />
        </InputGroup>
      </FormControl>
    </form>
  );
};

export default Search;

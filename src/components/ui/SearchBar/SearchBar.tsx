"use client";

import { useId, useState } from "react";
import { useRouter } from "next/navigation";
import { MarkGithubIcon, SearchIcon } from "@primer/octicons-react";
import { FormControl, TextInput } from "@primer/react";

export default function SearchBar() {
  const [hasError, setHasError] = useState(false);
  const [input, setInput] = useState("");
  const router = useRouter();
  const id = useId();
  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const data = input.replace(/^(http(s)?(:\/\/))?(www\.)?(github\.com\/)/i, "").split("/");
    if (data.length == 2) {
      const [owner, repo] = data;
      router.push(`/${owner}/${repo}`);
    } else {
      setHasError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl required id={id}>
        <FormControl.Label htmlFor={id} visuallyHidden>
          GitHub Repository URL
        </FormControl.Label>
        <TextInput
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={"Enter a GitHub Repository URL"}
          leadingVisual={MarkGithubIcon}
          block
          size="large"
          trailingAction={<TextInput.Action type="submit" icon={SearchIcon} aria-label="Search" variant="default" />}
        />
        {hasError && <FormControl.Validation variant="error">Invalid GitHub repository URL</FormControl.Validation>}
      </FormControl>
    </form>
  );
}

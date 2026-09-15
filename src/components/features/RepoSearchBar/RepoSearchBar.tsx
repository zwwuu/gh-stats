"use client";

import { MarkGithubIcon, SearchIcon } from "@primer/octicons-react";
import { FormControl, TextInput } from "@primer/react";
import { useRouter } from "next/navigation";
import { type SubmitEvent, useId, useState } from "react";

export function parseRepoInput(
  raw: string,
): { owner: string; repo: string } | null {
  const clean = raw
    .trim()
    .replace(/^https?:\/\//i, "")
    .replace(/^www\./i, "")
    .replace(/^github\.com\//i, "")
    .replace(/\/+$/, "");

  const parts = clean.split("/");
  if (parts.length >= 2) {
    return { owner: parts[0], repo: parts[1] };
  }

  return null;
}

export default function RepoSearchBar() {
  const [hasError, setHasError] = useState(false);
  const [input, setInput] = useState("");
  const router = useRouter();
  const id = useId();

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = parseRepoInput(input);

    if (data) {
      setHasError(false);
      const { owner, repo } = data;
      router.push(`/${owner}/${repo}`);
    } else {
      setHasError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl id={id} required>
        <FormControl.Label htmlFor={id} visuallyHidden>
          GitHub Repository URL
        </FormControl.Label>
        <TextInput
          block
          leadingVisual={MarkGithubIcon}
          name="repoUrl"
          onChange={(event) => setInput(event.target.value)}
          placeholder={"Enter a GitHub Repository URL"}
          size="large"
          trailingAction={
            <TextInput.Action
              aria-label="Search"
              icon={SearchIcon}
              type="submit"
              variant="default"
            />
          }
          type="text"
          value={input}
        />
        {hasError && (
          <FormControl.Validation variant="error">
            Invalid GitHub repository URL
          </FormControl.Validation>
        )}
      </FormControl>
    </form>
  );
}

"use client";

import { KeyIcon, MeterIcon } from "@primer/octicons-react";
import {
  Button,
  Dialog,
  FormControl,
  SkeletonBox,
  Stack,
  Text,
  TextInput,
} from "@primer/react";
import { useCallback, useEffect, useState } from "react";
import useSWRImmutable from "swr";

import { useSettings } from "@/contexts";
import {
  getRateLimit,
  RATE_LIMIT,
  RATE_REMAINNING,
  RATE_RESET,
  RATE_USED,
} from "@/lib/github";

export default function RateLimitStatus() {
  const { settings, saveSettings } = useSettings();
  const [isOpen, setIsOpen] = useState(false);
  const [tokenInput, setTokenInput] = useState(settings.githubToken || "");

  const {
    data: rateLimit,
    mutate,
    isLoading,
  } = useSWRImmutable(
    ["rateLimit", settings.githubToken],
    async ([, token]) => getRateLimit(token),
    {
      refreshInterval: 60000,
      fallbackData: {
        limit: RATE_LIMIT,
        remaining: RATE_REMAINNING,
        reset: RATE_RESET,
        used: RATE_USED,
      },
    },
  );

  useEffect(() => {
    setTokenInput(settings.githubToken || "");
  }, [settings.githubToken]);

  const handleSave = useCallback(() => {
    saveSettings({ githubToken: tokenInput.trim() });
    setIsOpen(false);
    mutate();
  }, [tokenInput, saveSettings, mutate]);

  const isCustomToken = Boolean(settings.githubToken);

  const getVariant = () => {
    if (!isLoading && rateLimit.remaining < 15) return "danger";

    return isCustomToken ? "primary" : "default";
  };

  return (
    <>
      <Button
        variant={getVariant()}
        onClick={() => setIsOpen(true)}
        title="Click to configure GitHub Personal Access Token"
        leadingVisual={MeterIcon}
      >
        {isLoading ? (
          <SkeletonBox width="9ch" />
        ) : (
          `API: ${rateLimit.remaining}/${rateLimit.limit}`
        )}
      </Button>

      {isOpen && (
        <Dialog
          onClose={() => setIsOpen(false)}
          aria-labelledby="token-dialog-title"
          footerButtons={[
            {
              buttonType: "default",
              content: "Cancel",
              onClick: () => setIsOpen(false),
            },
            { buttonType: "primary", content: "Save", onClick: handleSave },
          ]}
          title={"GitHub API Rate Limit Settings"}
        >
          <Stack>
            <Text as="p" className={"my-0"}>
              GitHub limits unauthenticated API calls to {rateLimit.limit}{" "}
              requests per hour per IP address. Enter a GitHub Fine-Grained or
              Personal Access Token (PAT) to increase your limit to 5,000
              requests per hour.
            </Text>

            <div>
              <Text as="h3" weight="semibold" className={"my-0"}>
                Current Status
              </Text>
              <Text as="p" className={"my-0"}>
                Limit:{" "}
                <Text as="span" weight="semibold">
                  {rateLimit.limit}
                </Text>{" "}
                / hr | Remaining:{" "}
                <Text as="span" weight="semibold">
                  {rateLimit.remaining}
                </Text>
              </Text>
            </div>

            <FormControl>
              <FormControl.Label>Personal Access Token (PAT)</FormControl.Label>
              <TextInput
                leadingVisual={KeyIcon}
                type="password"
                placeholder="github_pat_..."
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                block
              />
            </FormControl>
          </Stack>
        </Dialog>
      )}
    </>
  );
}

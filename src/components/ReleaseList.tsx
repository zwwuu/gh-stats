import ReleaseTile from "./ReleaseTile";
import { Virtuoso } from "react-virtuoso";
import { Box } from "@chakra-ui/react";

type ReleaseListProps = {
  releases: any[];
  assetData: { [id: number]: number };
};

export default function ReleaseList({ releases, assetData }: ReleaseListProps) {
  return (
    <Virtuoso
      increaseViewportBy={500}
      itemContent={(index) => (
        <Box py={2}>
          <ReleaseTile
            assets={releases[index].assets}
            author={releases[index].author}
            body={releases[index].body}
            htmlUrl={releases[index].html_url}
            name={releases[index].name}
            prerelease={releases[index].prerelease}
            publishedAt={releases[index].published_at}
            total={assetData[releases[index].id]}
          />
        </Box>
      )}
      style={{ height: "1000px" }}
      totalCount={releases.length}
      useWindowScroll
    />
  );
}

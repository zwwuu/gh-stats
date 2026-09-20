import {
  DownloadIcon,
  FilterIcon,
  FilterRemoveIcon,
  SearchIcon,
  XCircleFillIcon,
} from "@primer/octicons-react";
import {
  ActionList,
  ActionMenu,
  CounterLabel,
  Stack,
  Text,
  TextInput,
} from "@primer/react";
import commonStyles from "@/components/Common.module.css";
import type { Setting } from "@/contexts/SettingContext";

type ReleaseToolbarProps = {
  filter: Setting["filter"];
  searchQuery: string;
  isFiltered: boolean;
  activeFilterCount: number;
  onSearchQueryChange: (query: string) => void;
  onFilterChange: (filter: Setting["filter"]) => void;
  onResetFilters: () => void;
  onExportCSV: () => void;
  onExportJSON: () => void;
};

export default function ReleaseToolbar({
  filter,
  searchQuery,
  isFiltered,
  activeFilterCount,
  onSearchQueryChange,
  onFilterChange,
  onResetFilters,
  onExportCSV,
  onExportJSON,
}: ReleaseToolbarProps) {
  const toggleFilter = (key: keyof Setting["filter"]) => {
    onFilterChange({ ...filter, [key]: !filter[key] });
  };

  return (
    <Stack
      align="center"
      direction="horizontal"
      gap="condensed"
      justify="space-between"
      wrap="wrap"
    >
      <Stack align="center" direction="horizontal" wrap="wrap">
        <TextInput
          aria-label="Search release tags"
          leadingVisual={SearchIcon}
          onChange={(event) => onSearchQueryChange(event.target.value)}
          placeholder="Search tags..."
          trailingAction={
            <TextInput.Action
              aria-label="Clear query"
              icon={XCircleFillIcon}
              onClick={() => onSearchQueryChange("")}
            />
          }
          value={searchQuery}
        />
        <ActionMenu>
          <ActionMenu.Button
            leadingVisual={isFiltered ? FilterRemoveIcon : FilterIcon}
          >
            <Stack align="center" direction="horizontal" gap="tight">
              Filters
              <CounterLabel>{activeFilterCount}/3</CounterLabel>
            </Stack>
          </ActionMenu.Button>
          <ActionMenu.Overlay>
            <ActionList
              aria-label="Filter"
              role="menu"
              selectionVariant="multiple"
            >
              <ActionList.Item
                aria-checked={filter.showEmpty}
                onSelect={() => toggleFilter("showEmpty")}
                role="menuitemcheckbox"
                selected={filter.showEmpty}
              >
                Show{" "}
                <Text as="span" className={commonStyles.textMuted}>
                  Empty
                </Text>
              </ActionList.Item>
              <ActionList.Item
                aria-checked={filter.showPrerelease}
                onSelect={() => toggleFilter("showPrerelease")}
                role="menuitemcheckbox"
                selected={filter.showPrerelease}
              >
                Show{" "}
                <Text as="span" className={commonStyles.textAttention}>
                  Prerelease
                </Text>
              </ActionList.Item>
              <ActionList.Item
                aria-checked={filter.showDraft}
                onSelect={() => toggleFilter("showDraft")}
                role="menuitemcheckbox"
                selected={filter.showDraft}
              >
                Show{" "}
                <Text as="span" className={commonStyles.textSevere}>
                  Draft
                </Text>
              </ActionList.Item>
              {isFiltered && (
                <>
                  <ActionList.Divider />
                  <ActionList.Item
                    onSelect={onResetFilters}
                    role="menuitemcheckbox"
                    variant="danger"
                  >
                    Reset filters
                  </ActionList.Item>
                </>
              )}
            </ActionList>
          </ActionMenu.Overlay>
        </ActionMenu>
      </Stack>
      <ActionMenu>
        <ActionMenu.Button leadingVisual={DownloadIcon}>
          Export
        </ActionMenu.Button>
        <ActionMenu.Overlay>
          <ActionList>
            <ActionList.Item onSelect={onExportCSV}>
              Export as CSV
            </ActionList.Item>
            <ActionList.Item onSelect={onExportJSON}>
              Export as JSON
            </ActionList.Item>
          </ActionList>
        </ActionMenu.Overlay>
      </ActionMenu>
    </Stack>
  );
}

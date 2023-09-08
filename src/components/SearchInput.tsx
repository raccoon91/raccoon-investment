import { ChangeEvent, FC, FormEvent, memo } from "react";
import { Flex, Icon, IconButton, Input } from "@chakra-ui/react";
import { Search } from "react-feather";
import { Select } from "./Select";

const searchOptions = [
  { value: "ticker", label: "Ticker" },
  { value: "name", label: "Name" },
];

interface ISearchInputProps {
  column: string;
  search: string;
  onChangeColumn: (value: string) => void | Promise<void>;
  onChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void | Promise<void>;
  onSubmit: (e: FormEvent<HTMLDivElement>) => void | Promise<void>;
}

export const SearchInput: FC<ISearchInputProps> = memo(
  ({ column, search, onChangeColumn, onChangeSearch, onSubmit }) => {
    const handleClickMenuItem = (value: string) => {
      if (!value) return;

      onChangeColumn(value);
    };

    return (
      <Flex as="form" position="relative" onSubmit={onSubmit}>
        <Select
          w="120px"
          testId="search"
          variant="outline"
          borderRightRadius="none"
          value={column}
          options={searchOptions}
          onChange={handleClickMenuItem}
        />
        <Input
          w="240px"
          data-testid="search-input-field"
          borderLeftRadius="none"
          borderLeft="none"
          pr="40px"
          value={search}
          onChange={onChangeSearch}
        />
        <IconButton
          position="absolute"
          top="0"
          right="0"
          type="submit"
          aria-label="search"
          variant="ghost"
          icon={<Icon as={Search} boxSize="18px" />}
        />
      </Flex>
    );
  }
);

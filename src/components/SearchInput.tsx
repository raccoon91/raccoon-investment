import { ChangeEvent, FC, FormEvent, memo } from "react";
import { Flex, Icon, IconButton, Input, Select } from "@chakra-ui/react";
import { Search } from "react-feather";

interface ISearchInputProps {
  column: string;
  search: string;
  onChangeColumn: (e: ChangeEvent<HTMLSelectElement>) => void | Promise<void>;
  onChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void | Promise<void>;
  onSubmit: (e: FormEvent<HTMLDivElement>) => void | Promise<void>;
}

export const SearchInput: FC<ISearchInputProps> = memo(
  ({ column, search, onChangeColumn, onChangeSearch, onSubmit }) => {
    return (
      <Flex as="form" position="relative" onSubmit={onSubmit}>
        <Select w="100px" borderRightRadius="none" value={column} onChange={onChangeColumn}>
          <option value="ticker">Ticker</option>
          <option value="name">Name</option>
        </Select>
        <Input w="200px" borderLeftRadius="none" borderLeft="none" pr="40px" value={search} onChange={onChangeSearch} />
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

import { ChangeEvent, FC, FormEvent, memo } from "react";
import { Box, Input, Select } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

interface ISearchInputProps {
  column: string;
  search: string;
  onChangeColumn: (e: ChangeEvent<HTMLSelectElement>) => void | Promise<void>;
  onChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void | Promise<void>;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void | Promise<void>;
}

export const SearchInput: FC<ISearchInputProps> = memo(
  ({ column, search, onChangeColumn, onChangeSearch, onSubmit }) => {
    return (
      <Box as="form" onSubmit={onSubmit}>
        <Select w="100px" value={column} onChange={onChangeColumn}>
          <option value="ticker">Ticker</option>
          <option value="name">Name</option>
        </Select>
        <Input value={search} w="200px" onChange={onChangeSearch} />
        <StarIcon />
      </Box>
    );
  }
);

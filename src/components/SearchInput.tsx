import { ChangeEvent, FC, FormEvent, memo } from "react";
import { Button, Flex, Icon, IconButton, Input, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { ChevronDown, Search } from "react-feather";

interface ISearchInputProps {
  column: string;
  search: string;
  onChangeColumn: (value: "ticker" | "name") => void | Promise<void>;
  onChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void | Promise<void>;
  onSubmit: (e: FormEvent<HTMLDivElement>) => void | Promise<void>;
}

export const SearchInput: FC<ISearchInputProps> = memo(
  ({ column, search, onChangeColumn, onChangeSearch, onSubmit }) => {
    const handleClickMenuItem = (value: "ticker" | "name") => () => {
      if (!value) return;

      onChangeColumn(value);
    };

    return (
      <Flex as="form" position="relative" onSubmit={onSubmit}>
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDown />}
            w="100px"
            variant="outline"
            borderRightRadius="none"
            value={column}
          >
            {column === "ticker" ? "Ticker" : "Name"}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={handleClickMenuItem("ticker")}>Ticker</MenuItem>
            <MenuItem onClick={handleClickMenuItem("name")}>Name</MenuItem>
          </MenuList>
        </Menu>
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

import { ChangeEvent, FC, FormEvent } from "react";
import { IconButton, InputAdornment, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface ISearchInputProps {
  column: string;
  search: string;
  onChangeColumn: (e: SelectChangeEvent<string>) => void | Promise<void>;
  onChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void | Promise<void>;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void | Promise<void>;
}

export const SearchInput: FC<ISearchInputProps> = ({ column, search, onChangeColumn, onChangeSearch, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <Select
        size="small"
        value={column}
        sx={{ width: "100px", borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
        onChange={onChangeColumn}
      >
        <MenuItem value="ticker">Ticker</MenuItem>
        <MenuItem value="name">Name</MenuItem>
      </Select>
      <TextField
        size="small"
        value={search}
        onChange={onChangeSearch}
        InputProps={{
          sx: {
            width: "200px",
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          },
          endAdornment: (
            <InputAdornment position="end">
              <IconButton type="submit" edge="end" color="primary">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
};

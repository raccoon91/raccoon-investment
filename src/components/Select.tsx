import { FC, useMemo } from "react";
import { Button, ButtonProps, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { ChevronDown } from "react-feather";

interface ISelectProps extends Omit<ButtonProps, "value" | "onChange"> {
  value?: string | number;
  options: { value?: string | number; label?: string }[];
  onChange?: (value: any) => void;
}

export const Select: FC<ISelectProps> = ({ value, options, onChange, ...props }) => {
  const selected = useMemo(
    () => options.find(option => option.value?.toString() === value?.toString()),
    [value, options]
  );

  const handleClickMenuItem = (value?: unknown) => () => {
    if (value === null || value === undefined) return;

    onChange?.(value);
  };

  return (
    <Menu>
      <MenuButton as={Button} value={value} rightIcon={<ChevronDown />} {...props}>
        {selected?.label ?? "NONE"}
      </MenuButton>
      <MenuList zIndex="10">
        {options.map((option, index) => (
          <MenuItem key={index} onClick={handleClickMenuItem(option.value)}>
            {option.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

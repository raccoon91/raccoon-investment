import { MultiPageLayout, MultiPageSidebar } from "../../layouts";

const menuList = [
  { to: "/calculates", label: "Profit And Loss" },
  { to: "/calculates/trade", label: "Trade" },
];

export const CalculatePage = () => {
  return <MultiPageLayout sidebar={<MultiPageSidebar menus={menuList} />} />;
};

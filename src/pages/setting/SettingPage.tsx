import { MultiPageLayout, MultiPageSidebar } from "../../layouts";

const menuList = [{ to: "/settings", label: "Dividen" }];

export const SettingPage = () => {
  return <MultiPageLayout sidebar={<MultiPageSidebar menus={menuList} />} />;
};

import { useCallback, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  Box,
  Center,
  Flex,
  HStack,
  Icon,
  IconButton,
  Spinner,
  Switch,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { LogOut } from "react-feather";
import { Sidebar } from "./Sidebar";
import { useGlobalStore, useUserStore } from "../stores";

export const Layout = () => {
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const isLoad = useGlobalStore(state => state.isLoad);
  const primary = useColorModeValue("teal.500", "teal.300");
  const { user, getUser, signout } = useUserStore(state => ({
    user: state.user,
    getUser: state.getUser,
    signout: state.signout,
  }));

  const checkSignin = useCallback(async () => {
    if (user) return;

    const res = await getUser();

    if (res?.status === "ok") return;

    navigate("/signin");
  }, [user, getUser]);

  useEffect(() => {
    checkSignin();
  }, [checkSignin]);

  const handleSignOut = async () => {
    const res = await signout();

    if (res?.status === "ok") {
      navigate("/signin");
    }
  };

  if (!user) return null;

  return (
    <Flex w="100vw" h="100vh">
      <Sidebar />

      <Flex direction="column" align="stretch" w="calc(100% - 57px)">
        <HStack h="49px" px="36px" borderBottom="1px solid" borderColor="border" justify="space-between">
          <Text>{user?.email ?? ""}</Text>

          <HStack spacing="24px">
            <Switch isChecked={colorMode === "dark"} onChange={toggleColorMode} />

            {user && (
              <IconButton aria-label="logout" variant="ghost" icon={<Icon as={LogOut} />} onClick={handleSignOut} />
            )}
          </HStack>
        </HStack>

        <Box overflow="hidden" position="relative" h="calc(100% - 49px)" p="30px">
          {isLoad && (
            <Center position="absolute" top="0" left="0" w="100%" h="100%" zIndex="10">
              <Spinner thickness="4px" speed="0.65s" emptyColor="border" color={primary} size="xl" />
            </Center>
          )}

          <Outlet />
        </Box>
      </Flex>
    </Flex>
  );
};

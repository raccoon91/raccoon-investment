import { useCallback, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Box, Center, Flex, HStack, IconButton, Spinner, Switch, Text, VStack } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Sidebar } from "./Sidebar";
import { useGlobalStore, useUserStore } from "../stores";

export const Layout = () => {
  const navigate = useNavigate();
  const isLoad = useGlobalStore(state => state.isLoad);
  const { user, getUser, signout } = useUserStore(state => ({
    user: state.user,
    getUser: state.getUser,
    signout: state.signout,
  }));
  const { mode, toggleMode } = useGlobalStore(state => ({
    mode: state.mode,
    toggleMode: state.toggleMode,
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

  const handleChangeThemeMode = () => {
    toggleMode();
  };

  if (!user) return null;

  return (
    <Flex overflow="hidden" w="100vw" h="100vh">
      <Box flex="0 0 60px" w="60px" py="48px" borderRight="1px solid" borderColor="gray.700" boxSizing="content-box">
        <Sidebar />
      </Box>

      <VStack flex="1" align="stretch">
        <HStack
          h="48px"
          flex="0 0 48px"
          px="48px"
          borderBottom="1px solid"
          borderColor="gray.700"
          justify="space-between"
        >
          <HStack spacing="24px">
            <Text>{user?.email ?? ""}</Text>

            {user && (
              <IconButton aria-label="logout" icon={<ChevronRightIcon boxSize="16px" />} onClick={handleSignOut} />
            )}
          </HStack>

          <Switch isChecked={mode === "dark"} onChange={handleChangeThemeMode} />
        </HStack>

        <Box overflow="hidden" position="relative" flex="1" p="30px">
          {isLoad && (
            <Center position="absolute" top="0" left="0" w="100%" h="100%">
              <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
            </Center>
          )}

          <Outlet />
        </Box>
      </VStack>
    </Flex>
  );
};

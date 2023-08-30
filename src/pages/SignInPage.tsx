import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Center, Heading, Input } from "@chakra-ui/react";
import { useUserStore } from "../stores";

export const SignInPage = () => {
  const navigate = useNavigate();
  const signin = useUserStore(state => state.signin);
  const [signinValue, setSigninValue] = useState({ email: "", password: "" });

  const handleSubmitSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!signinValue.email || !signinValue.password) return;

    const res = await signin(signinValue.email, signinValue.password);

    if (res?.status === "ok") {
      navigate("/");
    }
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setSigninValue(p => ({ ...p, [name]: value }));
  };

  return (
    <Center gap="36px" w="100vw" h="100vh">
      <Heading>Sign In</Heading>

      <Box as="form" gap="24px" w="280px" onSubmit={handleSubmitSignIn}>
        <Input size="small" name="email" value={signinValue.email} onChange={handleChangeInput} />
        <Input type="password" size="small" name="password" value={signinValue.password} onChange={handleChangeInput} />

        <Button type="submit" variant="contained">
          Sign In
        </Button>
      </Box>
    </Center>
  );
};

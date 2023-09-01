import { ChangeEvent, FormEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Center, Heading, Input, VStack } from "@chakra-ui/react";
import { useUserStore } from "../stores";

export const SignInPage = () => {
  const navigate = useNavigate();
  const signin = useUserStore(state => state.signin);
  const [signinValue, setSigninValue] = useState({ email: "", password: "" });

  const handleSubmitSignIn: FormEventHandler<HTMLDivElement> = async e => {
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
    <Center w="100vw" h="100vh">
      <VStack gap="36px">
        <Heading>Sign In</Heading>

        <VStack as="form" gap="24px" w="280px" onSubmit={handleSubmitSignIn}>
          <Input name="email" placeholder="Email" value={signinValue.email} onChange={handleChangeInput} />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={signinValue.password}
            onChange={handleChangeInput}
          />

          <Button type="submit" w="full">
            Sign In
          </Button>
        </VStack>
      </VStack>
    </Center>
  );
};

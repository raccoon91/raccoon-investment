import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "36px",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Typography component="h1" sx={{ fontSize: "20px", fontWeight: "bold" }}>
        Sign In
      </Typography>

      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: "24px", width: "280px" }}
        onSubmit={handleSubmitSignIn}
      >
        <TextField size="small" label="email" name="email" value={signinValue.email} onChange={handleChangeInput} />

        <TextField
          type="password"
          size="small"
          label="password"
          name="password"
          value={signinValue.password}
          onChange={handleChangeInput}
        />

        <Button type="submit" variant="contained">
          Sign In
        </Button>
      </Box>
    </Box>
  );
};

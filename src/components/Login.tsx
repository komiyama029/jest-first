import { Fragment, useState } from "react";
import { Alert, Button, TextField } from "@mui/material";
import { Box } from "@mui/system";

type Error = {
  email: string;
  password: string;
};

const initialValue = { email: "", password: "" };

export const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<Error>(initialValue);
  const [isSuccessed, setIsSuccessed] = useState<boolean>(false);

  const onSubmitForm = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsSuccessed(false);

    if (!email) {
      setError((prevState) => ({
        ...prevState,
        email: "メールアドレスを入力してください",
      }));
    } else if (!validateEmail(email)) {
      setError((prevState) => ({
        ...prevState,
        email: "正しい形式で入力してください",
      }));
    }

    if (!password) {
      setError((prevState) => ({
        ...prevState,
        password: "パスワードを入力してください",
      }));
    } else if (!validatePassword(password)) {
      setError((prevState) => ({
        ...prevState,
        password: "8文字以上の半角英数字で入力してください",
      }));
    }

    if (validateEmail(email) && validatePassword(password)) {
      setError(initialValue);
      setIsSuccessed(true);
    }
  };

  return (
    <>
      <div>
        <Box component="form" onSubmit={onSubmitForm} p={10}>
          <Box mb={2}>
            <TextField
              value={email}
              variant="outlined"
              onChange={(e) => setEmail(e.target.value)}
              error={error.email ? true : false}
              helperText={error.email ? error.email : ""}
              label="email"
              id="email"
            />
          </Box>
          <Box mb={2}>
            <TextField
              value={password}
              variant="outlined"
              onChange={(e) => setPassword(e.target.value)}
              error={error.password ? true : false}
              helperText={error.password ? error.password : ""}
              label="password"
              id="password"
            />
          </Box>
          <Box mb={3}>
            <Button type="submit" variant="contained" data-testid="submit">
              Submit
            </Button>
          </Box>
        </Box>
        {isSuccessed && (
          <Alert data-testid="alert" severity="success">
            submit successful!!!
          </Alert>
        )}
      </div>
    </>
  );
};

export const validateEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  if (regex.test(email)) {
    return true;
  }
  return false;
};

export const validatePassword = (password: string) => {
  const regex = /^([a-zA-Z0-9]{8,})$/i;
  if (regex.test(password)) {
    return true;
  }
  return false;
};

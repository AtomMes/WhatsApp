import { useState } from "react";
import { setUser } from "../redux/userSlice/slice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Button,
  Paper,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";

const StyledPaper = styled(Paper)(({ theme }) => ({
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "350px",
  width: "66%",
  padding: "40px 50px",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  borderRadius: "20px",
}));

const LoginPage = () => {
  const [idInstance, setId] = useState("");
  const [apiTokenInstance, setToken] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logIn = () => {
    if (idInstance && apiTokenInstance) {
      dispatch(setUser({ idInstance, apiTokenInstance }));
      navigate("/");
    } else {
      alert("Fill all the fields");
    }
  };

  return (
    <StyledPaper sx={{}}>
      <Typography
        variant="h5"
        textAlign="center"
        marginBottom="10px"
        fontWeight="700"
      >
        Welcome
        <Typography
          variant="body1"
          color="gray"
          textAlign="center"
          marginTop="10px"
        >
          Enter your credentials to access your account.
        </Typography>
      </Typography>

      <Stack gap="15px">
        <TextField
          color="success"
          label="idInstance"
          value={idInstance}
          onChange={(e) => setId(e.target.value)}
        />
        <TextField
          color="success"
          label="apiTokenInstance"
          value={apiTokenInstance}
          onChange={(e) => setToken(e.target.value)}
        />
      </Stack>
      <Button
        onClick={logIn}
        variant="contained"
        sx={{ textTransform: "none" }}
        color="success"
      >
        Log In
      </Button>
    </StyledPaper>
  );
};

export default LoginPage;

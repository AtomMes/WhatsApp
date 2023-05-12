import { useState } from "react";
import { setUser } from "../redux/userSlice/slice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

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
    <div>
      <input
        value={idInstance}
        onChange={(e) => setId(e.target.value)}
        placeholder="IdInstance"
      />
      <input
        value={apiTokenInstance}
        onChange={(e) => setToken(e.target.value)}
        placeholder="apiTokenInstance"
      />
      <button onClick={logIn}>Log In</button>
    </div>
  );
};

export default LoginPage;

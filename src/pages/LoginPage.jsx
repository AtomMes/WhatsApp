import { useState } from "react";
import { setUser } from "../redux/userSlice/slice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const LoginPage = () => {
  const [idInstance, setId] = useState("1101818622");
  const [apiTokenInstance, setToken] = useState(
    "f445b0dd699b44f5a7d3ed3fd540246a2551f2173abf4709ba"
  );
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

import HomeIcon from "@mui/icons-material/Home";
import { Link, useNavigate } from "react-router-dom";
import { Paper, Button } from "@mui/material";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import auth from "../auth";

import { useEffect } from "react";

function Login() {
  const navigate = useNavigate();
 
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  useEffect(() => {
    if (user) {
      navigate("/chat");
    }
  }, [user, navigate]);

  const handleLogin = () => {
    signInWithGoogle();
  };

  if(error){
    return(
      <Paper
        elevation={4}
        sx={{ m: 4, p: 4, display: "flex", justifyContent: "center" }}
      >Something went wrong</Paper>
    )
  }

  return (
    <div>
      <Link to={"/"}>
        <HomeIcon />
        Home
      </Link>
      <h1>Login</h1>

      <Paper
        elevation={4}
        sx={{ m: 4, p: 4, display: "flex", justifyContent: "center" }}
      >
        {!loading ?(<Button variant="contained" onClick={handleLogin}>
          Login
        </Button>) :("In progress")}
      </Paper>
    </div>
  );
}

export default Login;

import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div>
      <Link to={"/home"}>
        <HomeIcon />
        Home
      </Link>
      <h1>Login</h1>
    </div>
  );
}

export default Login;

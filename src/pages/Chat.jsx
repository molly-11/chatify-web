import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";


function Chat() {
  return (
    <div>
      <Link to={"/home"}>
        <HomeIcon />
        Home
      </Link>
      <h1>Chat</h1>
    </div>
  );
}

export default Chat;

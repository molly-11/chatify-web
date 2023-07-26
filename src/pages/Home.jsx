import { Button } from "@mui/material";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Welcome to my Chat App</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
        voluptatem delectus omnis, laudantium modi ex accusantium magni eius
        asperiores adipisci tenetur in explicabo. Animi perspiciatis delectus,
        iusto ducimus harum quaerat consectetur maxime unde neque quidem debitis
        voluptatem quia dolorum rem amet, corporis accusamus, laudantium
        expedita odio nobis a inventore officiis.
      </p>

      <Link to={"/login"}>
        <Button variant="contained" type="button">
          Sign in
        </Button>
      </Link>
      <Link to={"/chat"}>
        <Button variant="contained" type="button">
          Go to the chat rooms
        </Button>
      </Link>
    </div>
  );
}

export default Home;

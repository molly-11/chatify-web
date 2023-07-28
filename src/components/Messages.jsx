import { collection, query, where } from "firebase/firestore";
import store from "../firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Box, Paper, Typography } from "@mui/material";
import { PropTypes } from "prop-types";

const messageRef = collection(store, "chat-messages").withConverter({
  fromFirestore(snap) {
    return {
      id: snap.id,
      ...snap.data(),
    };
  },
  toFirestore(doc) {
    return doc;
  },
});

function Messages({ roomId }) {
  const [messages, loading] = useCollectionData(
    query(messageRef, where("rooms", "==", roomId))
  );

  if (loading === true) {
    return <h1>Loading...</h1>;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {messages?.map((message) => (
        <Paper key={message.id} elevation={4}>
          {message.file ? (
            <img style={{ maxWidth: "50%" }} src={message.file} />
          ) : (
            <Typography variant="p">{message.message}</Typography>
          )}
        </Paper>
      ))}
    </Box>
  );
}

Messages.propTypes = {
  roomId: PropTypes.string.isRequired,
}

export default Messages;

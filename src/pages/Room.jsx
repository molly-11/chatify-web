import { useParams } from "react-router-dom";
import store from "../firestore";
import SendIcon from "@mui/icons-material/Send";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../context/AuthProvider";

const messagesCollref = collection(store, "chat-messages");

function Room() {
  const auth = useAuth();
  const { id } = useParams();
  const [room, loading] = useDocumentData(doc(store, "chat rooms", id));
  const [message, setMessage] = useState("");
  const [isLoading, setLoading] = useState(false);

  const sendMessage = async () => {
    setLoading(true);
    await addDoc(messagesCollref, {
      message,
      uid: auth.uid,
      rooms: id,
    });
    setMessage("");
    setLoading(false);
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Box sx={{ p: 2 }}>
      <Paper elevation={4}>
        <Typography variant="h2">{room.name}</Typography>
        <Box sx={{ p: 2 }}>Messages...</Box>
        <Box sx={{ p: 2, display: "flex" }}>
          <TextField
            variant="outlined"
            fullWidth
            label="Your message"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            value={message}
            disabled={isLoading}
          />
          <Button
            variant="outlined"
            endIcon={<SendIcon />}
            onClick={sendMessage}
            disabled={isLoading}
          >
            Send
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default Room;

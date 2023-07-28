import { useParams } from "react-router-dom";
import store from "../firestore";
import SendIcon from "@mui/icons-material/Send";
import { addDoc, collection, doc, getDoc, serverTimestamp } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import FileUpload from "../components/FileUpload";
import Messages from "../components/Messages";

const messagesCollref = collection(store, "chat-messages");

function Room() {
  const auth = useAuth();
  const { id } = useParams();
  const [room, loading] = useDocumentData(doc(store, "chat rooms", id));
  const [message, setMessage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [file, setFile]= useState("");


  const sendMessage = async () => {
    setLoading(true);
    await addDoc(messagesCollref, {
      message,
      uid: auth.uid,
      rooms: id,
      created: serverTimestamp()
    });
    if(file){
      await addDoc(messagesCollref, {
        file,
        uid: auth.uid,
        rooms: id,
        created: serverTimestamp()
      });
    }
    setMessage("");
    setFile("");
    setLoading(false);
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Box sx={{ p: 2 }}>
      <Paper elevation={4}>
        <Typography variant="h2">{room.name}</Typography>
        <Box sx={{ p: 2 }}><Messages roomId={id}/></Box>
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
        <Box sx={{ p: 2 }}>
          <FileUpload onUploadDone={(url)=>{setFile(url)} } uid={auth.uid}/>
        </Box>
      </Paper>
    </Box>
  );
}

export default Room;

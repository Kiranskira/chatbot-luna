import "./App.css";
import ChatPage from "./pages/chat-page";
import { useAuth } from "./hooks/useAuth";

function App() {
  const { user, loading, error } = useAuth();

  console.log({ user, loading, error });

  return (
    <>
      <ChatPage />
    </>
  );
}

export default App;

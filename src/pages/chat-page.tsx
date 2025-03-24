import { useState } from "react";
import { Settings, CirclePlus } from "lucide-react/icons";
import ChatInput from "../components/chat-input";
import ChatSection from "../components/chat-section";
import { ChatOptionType, MessageType } from "../types";
import EmptyChat from "../components/empty-chat";

const ChatPage = () => {
  const [inputText, setInputText] = useState<string>("");
  const [chatOption, setChatOption] = useState<ChatOptionType>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [loading, setLoading] = useState(false)
  const [showConfirmButtons, setShowConfirmButtons] = useState<React.ReactElement | null>(null)

  return (
    <div className=" w-full h-screen flex">
      <div className=" w-20 border-r border-gray-300 h-full flex flex-col items-center justify-between py-5">
        <div className=" flex flex-col gap-6">
          <button>
            <img
              className=" w-8 h-8 rounded-full"
              src="https://github.com/shadcn.png"
              alt=" avatar"
            />
          </button>
          <button>
            <CirclePlus strokeWidth={1} size={32} className=" text-gray-500" />
          </button>
        </div>
        <button>
          <Settings strokeWidth={1} size={32} className=" text-gray-500" />
        </button>
      </div>

      <div className=" flex-1 flex flex-col justify-between container mx-auto py-7">
        <div className="">
          <img className=" w-6 h-6" src="/icon.svg" alt="luna" />
        </div>

        <div className=" flex-1 flex overflow-y-auto hide-scrollbar">
          {messages.length > 0 ? (
            <ChatSection showConfirmButtons={showConfirmButtons} loading={loading} messages={messages} />
          ) : (
            <EmptyChat />
          )}
        </div>

        <div className="">
          <ChatInput
            chatOption={chatOption}
            setChatOption={setChatOption}
            inputText={inputText}
            setInputText={setInputText}
            messages={messages}
            setMessages={setMessages}
            setLoading={setLoading}
            setShowConfirmButtons={setShowConfirmButtons}
          />

          {/* <a href="http://localhost:3000/auth/google">login</a> */}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;

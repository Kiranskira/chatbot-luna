import { useEffect, useRef } from "react";
import Markdown from "react-markdown";
import { MessageType } from "../types";

const Message = ({
  content,
  loading,
  role,
  ui,
}: MessageType & { ui?: React.ReactElement }) => {
  return (
    <div
      className={`flex items-start gap-2 mb-4 w-full ${
        role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      {loading && (
        <div className=" flex h-fit items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-white flex items-center justify-center shadow-md">
            <img className=" w-5 animate-spin" src="/luna.svg" alt="avatar" />
          </div>
          <p className=" text-gray-500">{content}</p>
        </div>
      )}

      {!loading && (
        <>
          {role !== "user" && (
            <div className="w-8 h-8 rounded-md bg-white flex items-center justify-center shadow-md">
              <img className=" w-5" src="/luna.svg" alt="avatar" />
            </div>
          )}
          <div
            className={`max-w-[70%] rounded-lg px-3${
              role === "user" ? " text-gray-700" : " font-light text-gray-800"
            }`}
          >
            <Markdown>{content}</Markdown>
          </div>
          {role === "user" && (
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
              <img className=" w-11" src="/avatar" alt="avatar" />
            </div>
          )}
        </>
      )}
      {ui && ui}
    </div>
  );
};

const ChatSection = ({
  messages,
  loading,
  showConfirmButtons,
}: {
  messages: MessageType[];
  loading: boolean;
  showConfirmButtons: React.ReactElement | null;
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col mx-auto w-full">
      <div
        ref={containerRef}
        className="flex-1 p-6 w-full"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <div className="max-w-4xl mx-auto w-full">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <Message
                key={index}
                content={message.content}
                role={message.role}
                loading={message.loading}
              />
            ))}
            {loading && (
              <Message content="generating..." loading={loading} role="bot" />
            )}

            {showConfirmButtons && (
              <Message
                ui={showConfirmButtons}
                content=""
                role="bot"
                loading={false}
              />
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSection;

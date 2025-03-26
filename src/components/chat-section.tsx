import { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import { ChatOptionType, MessageType } from "../types";
import { useAuth } from "../hooks/useAuth";
import { Loader } from "lucide-react";

const Message = ({
  content,
  loading,
  role,
  ui,
  chatOption,
}: MessageType & { ui?: React.ReactElement; chatOption: ChatOptionType }) => {
  const [emailData, setEmailData] = useState<{
    subject: string;
    body: string;
  } | null>(null);

  const [recipientEmailAddress, setRecipientEmailAddress] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    if (chatOption === "send-email") {
      try {
        const cleanedContent = content
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();

        const parsedContent = JSON.parse(cleanedContent);
        setEmailData(parsedContent);
        console.log("Parsed Email Data:", parsedContent);
      } catch (error) {
        console.error("Error parsing email content:", error);
        setEmailData(null);
      }
    }
  }, [chatOption, content]);

  const sendEmail = async (
    subject: string,
    body: string,
    senderEmail: string,
    recipientEmail: string
  ) => {
    console.log({
      subject,
      body,
      senderEmail,
      recipientEmail,
    });
    try {
      setEmailLoading(true);
      const response = await fetch("http://localhost:3000/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.refreshToken}`,
        },
        body: JSON.stringify({
          subject,
          body,
          senderEmail,
          recipientEmail,
        }),
      });

      if (!response.ok) throw new Error("Command execution failed.");

      const data = await response.json();
      setEmailSent(data.success);

      console.log(data);
    } catch (error) {
      console.error(error);
    } finally {
      setEmailLoading(false);
    }
  };

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
            {chatOption === "send-email" && emailData ? (
              <div>
                <Markdown>{emailData?.body}</Markdown>

                <div className="flex flex-col gap-3 border border-gray-300 p-5 rounded-xl bg-white shadow-md mt-3 w-full max-w-md">
                  <h1 className="text-base font-semibold text-gray-900">
                    Would you like to send this email?
                  </h1>

                  {/* Recipient Email Input */}
                  <div className="w-full">
                    <label className="text-sm font-medium text-gray-700">
                      Recipient Email
                    </label>
                    <input
                      disabled={emailSent}
                      className="w-full border border-gray-300 rounded-lg py-2 px-3 bg-gray-50 mt-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="example@gmail.com"
                      type="email"
                      required
                      value={recipientEmailAddress}
                      onChange={(e) => setRecipientEmailAddress(e.target.value)}
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    {emailSent ? (
                      <button disabled className="flex-1 bg-green-700 text-white px-4 py-2 rounded-lg transition-all">
                        Email Sent
                      </button>
                    ) : (
                      <>
                        <button
                          disabled={emailLoading}
                          onClick={() =>
                            sendEmail(
                              emailData.subject,
                              emailData.body,
                              user.email,
                              recipientEmailAddress
                            )
                          }
                          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center"
                        >
                          {emailLoading ? (
                            <Loader className="animate-spin" />
                          ) : (
                            "Send Email"
                          )}
                        </button>
                        <button
                          onClick={() => setRecipientEmailAddress("")}
                          className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-all"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <Markdown>{content}</Markdown>
            )}
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
  chatOption,
}: {
  messages: MessageType[];
  loading: boolean;
  showConfirmButtons: React.ReactElement | null;
  chatOption: ChatOptionType;
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
                chatOption={chatOption}
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

export type ChatOptionType = "send-email" | "assistance" | "commands & scripts" | "file" | null;

export type MessageType = {
  content: string;
  role: "bot" | "user";
  loading: boolean;
};


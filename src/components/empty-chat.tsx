import React from "react";

const EmptyChat = () => {
  return (
    <div className="w-full flex items-center justify-center flex-col gap-3">
      <div className="flex h-fit items-end gap-5">
        <img className="w-14" src="/icon.svg" alt="luna" />
        <p className="text-2xl font-bold">Hi, I'm LUNA ai.</p>
      </div>
      <p className="text-gray-500">
        type <span className="bg-gray-300/70 px-2 py-1 rounded">/</span> to know
        what can i do
      </p>
    </div>
  );
};

export default EmptyChat;

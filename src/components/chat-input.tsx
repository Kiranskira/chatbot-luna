import React, { useState, useRef, useEffect } from 'react';
import { Image, Send } from 'lucide-react';
import { Settings, CirclePlus } from 'lucide-react/icons'

const ChatInput = () => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      // Reset height to auto to get proper scrollHeight
      textareaRef.current.style.height = 'auto';
      // Set new height based on scrollHeight
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // Handle message submission here
      console.log('Message sent:', message);
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-4">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything..."
          className="w-full p-2 text-gray-700 focus:outline-none resize-none min-h-[40px] max-h-40 overflow-y-auto"
          style={{
            lineHeight: '1.5',
          }}
        />
        
        <div className="flex items-center gap-4 mt-4">
          <div className="flex gap-11">
            <button
              type="button"
              className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-base"
            >
              <CirclePlus strokeWidth={2} className="w-4 h-4" />
              Add Attachments
            </button>
            <button
              type="button"
              className="flex items-center gap-2 text-gray-500 hover:text-gray-700"
            >
              <Image strokeWidth={2} className="w-4 h-4" />
              Use Image
            </button>
          </div>
          
          <button
            type="submit"
            className="ml-auto p-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { CirclePlus, FileText, X } from 'lucide-react';

const ChatInput = () => {
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null); // State to store the selected file
  const [uploading, setUploading] = useState(false); // State to handle upload loading state
  const [messageStatus, setMessageStatus] = useState(''); // State to display upload status
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      // Reset height to auto to get proper scrollHeight
      textareaRef.current.style.height = 'auto';
      // Set new height based on scrollHeight
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]; // Get the first selected file
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile); // Set the file if it's a PDF
      setMessageStatus(''); // Clear any previous messages
    } else {
      setFile(null); // Clear the file if it's not a PDF
      setMessageStatus('Please select a valid PDF file.'); // Show an error message
    }
  };

  // Remove the selected file
  const handleRemoveFile = () => {
    setFile(null); // Clear the file
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() && !file) {
      setMessageStatus('Please enter a message or select a file.');
      return;
    }

    setUploading(true); // Start loading state
    setMessageStatus('Uploading...');

    const formData = new FormData();
    if (file) {
      formData.append('pdf', file); // Append the file to the FormData object
    }
    if (message.trim()) {
      formData.append('message', message); // Append the message to the FormData object
    }

    try {
      const response = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData, // Send the FormData object
      });

      if (response.ok) {
        const result = await response.json();
        setMessageStatus(result.message || 'File and message sent successfully!');
      } else {
        setMessageStatus('Failed to upload file or send message.');
      }
    } catch (error) {
      setMessageStatus('An error occurred while uploading the file or sending the message.');
      console.error('Upload error:', error);
    } finally {
      setUploading(false); // End loading state
      setMessage(''); // Clear the message input
      setFile(null); // Clear the selected file
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
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
            {/* Hidden file input */}
            <input
              type="file"
              id="fileInput"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
              accept="application/pdf" // Only allow PDF files
            />

            {/* Show "Add Attachments" button only if no file is selected */}
            {!file && (
              <button
                type="button"
                className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-base"
                onClick={() => fileInputRef.current.click()}
              >
                <CirclePlus strokeWidth={2} className="w-4 h-4" />
                Add Attachments
              </button>
            )}

            {/* Display the selected PDF file */}
            {file && (
              <div className="relative border p-2 rounded-lg h-fit flex items-center gap-2 bg-slate-200 cursor-pointer hover:shadow-md">
                <FileText className="text-red-600" />
                <h1 className="text-sm font-bold text-gray-800">{file.name}</h1>
                <button
                  type="button"
                  className="p-[2px] border rounded-full absolute top-[-8px] right-[-8px] bg-white hover:bg-red-600 hover:text-white transition-colors"
                  onClick={handleRemoveFile}
                >
                  <X className="size-3" />
                </button>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="ml-auto p-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-400"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Display upload status */}
        {messageStatus && (
          <p className="mt-4 text-sm text-gray-700">{messageStatus}</p>
        )}
      </form>
    </div>
  );
};

export default ChatInput;
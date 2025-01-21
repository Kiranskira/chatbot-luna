import React, { useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';

const Message = ({ content, isUser, isLoading }) => {
    return (
        <div className={`flex items-start gap-2 mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
            {isLoading && (
                <div className="flex items-center gap-2 text-gray-500">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {content}
                </div>
            )}
            {!isLoading && (
                <>
                    {!isUser && (
                        <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
                            <span className="text-white text-sm">🤖</span>
                        </div>
                    )}
                    <div className={`max-w-[70%] rounded-lg p-3 ${isUser ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-800'
                        }`}>
                        {content}
                    </div>
                    {isUser && (
                        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                            <span className="text-gray-600 text-sm">👤</span>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

const ChatSection = () => {
    const messagesEndRef = useRef(null);
    const containerRef = useRef(null);

    const messages = [
        {
            content: "Send my CV to 'john@google.com'",
            isUser: true,
            isLoading: false,
        },
        {
            content: "Finding your resume...",
            isUser: false,
            isLoading: true,
        },
        {
            content: "Writing your cover letter...",
            isUser: false,
            isLoading: true,
        },
        {
            content: "Is this cover letter okay?\n\nDear John,\n\nI'm excited to apply for the [Job Title] role at Google. With experience in [relevant field/skill] and a strong passion for [mention relevant area], I'm eager to contribute to your team. Thank you for considering my application.\n\nBest,\nAntony Jaison",
            isUser: false,
            isLoading: false,
        },
        {
            content: "Yeah, that's perfect",
            isUser: true,
            isLoading: false,
        },
        {
            content: "Sending email...",
            isUser: false,
            isLoading: true,
        },
        {
            content: "Yeah, that's perfect",
            isUser: true,
            isLoading: false,
        },
        {
            content: "Sending email...",
            isUser: false,
            isLoading: true,
        },
        {
            content: "Yeah, that's perfect",
            isUser: true,
            isLoading: false,
        },
        {
            content: "Sending email...",
            isUser: false,
            isLoading: true,
        },
        {
            content: "Yeah, that's perfect",
            isUser: true,
            isLoading: false,
        },
        {
            content: "Sending email...",
            isUser: false,
            isLoading: true,
        },
        {
            content: "Yeah, that's perfect",
            isUser: true,
            isLoading: false,
        },
        {
            content: "Sending email...",
            isUser: false,
            isLoading: true,
        },

    ];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="flex flex-col mx-auto"> {/* Changed from h-screen to h-96 */}
            {/* Main chat container */}
            <div
                ref={containerRef}
                className="flex-1 p-6"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end'
                }}
            >
                <div className="max-w-4xl mx-auto w-full">
                    <div className="space-y-4">
                        {messages.map((message, index) => (
                            <Message
                                key={index}
                                content={message.content}
                                isUser={message.isUser}
                                isLoading={message.isLoading}
                            />
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatSection;
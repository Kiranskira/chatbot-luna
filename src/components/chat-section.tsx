import { useEffect, useRef } from 'react';
import Markdown from 'react-markdown'

type MessageType = {
    content: string;
    isUser: boolean;
    isLoading: boolean;
}

const Message = ({ content, isUser, isLoading }: MessageType) => {
    return (
        <div className={`flex items-start gap-2 mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
            {isLoading && (
                <div className=' flex h-fit items-center gap-2'>
                    <div className="w-8 h-8 rounded-md bg-white flex items-center justify-center shadow-md">
                        <img className=' w-5 animate-spin' src="/luna.svg" alt="avatar" />
                    </div>
                    <p className=' text-gray-500'>{content}</p>
                </div>
            )}
            {!isLoading && (
                <>
                    {!isUser && (
                        <div className="w-8 h-8 rounded-md bg-white flex items-center justify-center shadow-md">
                            <img className=' w-5' src="/luna.svg" alt="avatar" />
                        </div>
                    )}
                    <div className={`max-w-[70%] rounded-lg px-3${isUser ? ' text-gray-700' : ' font-light text-gray-800'
                        }`}>
                        <Markdown>
                            {content}
                        </Markdown>
                    </div>
                    {isUser && (
                        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                            <img className=' w-11' src="/avatar" alt="avatar" />
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

const ChatSection = () => {
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

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
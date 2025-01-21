import React from 'react'
import { Settings, CirclePlus } from 'lucide-react/icons'
import ChatInput from '../components/chat-input'
import ChatSection from '../components/chat-section'

const ChatPage = () => {
    return (
        <div className=' w-full h-screen flex'>

            <div className=' w-20 border-r border-gray-300 h-full flex flex-col items-center justify-between py-5'>
                <div className=' flex flex-col gap-6'>
                    <button>
                        <img className=' w-8 h-8 rounded-full' src="https://github.com/shadcn.png" alt=" avatar" />
                    </button>
                    <button>
                        <CirclePlus strokeWidth={1} size={32} className=' text-gray-500' />
                    </button>
                </div>
                <button>
                    <Settings strokeWidth={1} size={32} className=' text-gray-500' />
                </button>
            </div>

            <div className=' flex-1 flex flex-col justify-between container mx-auto py-7'>

                <div className=''>
                    <img className=' w-6 h-6' src="/icon.svg" alt="luna" />
                </div>

                <div className=' flex-1'>

                    <ChatSection />

                </div>

                <div className=''>

                    <ChatInput />

                </div>



            </div>

        </div>
    )
}

export default ChatPage
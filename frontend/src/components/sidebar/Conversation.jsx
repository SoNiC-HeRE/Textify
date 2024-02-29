import React from 'react'
import useConversation from '../../zustand/useConversation'
import {useSocketContext} from '../../context/SocketContext.jsx'

const Conversation = ({conversation,lastIdx,emoji}) => {
    const {selectedConversation, setSelectedConversation} = useConversation();
    const {onlineUsers} = useSocketContext();
    const isOnline = onlineUsers.includes(conversation._id)

    const isSelected = selectedConversation?._id === conversation._id;
  return (
    <>
        <div className={`flex gap-2 items-center hover:bg-black rounded p-2 py-1 cursor-pointer
            ${isSelected ? "bg-sky-600" : ""}
        `}
        onClick={()=>setSelectedConversation(conversation)}
        >
            <div className={`avatar ${isOnline ? 'online' : ''}`}>
                <div className='w-12 rounded-full'>
                    <img src={conversation.profilePicture} alt="user avatar" />
                </div>
            </div>

            <div className='flex flex-col flex-1'>
                <div className='flex gap-3 justify-between'>
                    <p className='font-bold text-gray-200'>{conversation.fullName}</p>
                    <span className='text-xl'>{emoji}</span>
                </div>
            </div>
        </div>

        {!lastIdx && <div className='divider divider-neutral my-0 py-0 h-1' />}
    </>
  )
}

export default Conversation
import React from 'react'
import { conversationAPI } from '../../servicesAPI/ConversationService'

interface INickNameHeaderProps {
  receiverId: number | null
}

const NickNameHeader:React.FC<INickNameHeaderProps> = ({receiverId}) => {
  const {data: convUser} = conversationAPI.useGetConvUserDataQuery({userId: receiverId ? receiverId : 0})
  return (
    <div>
      {convUser && convUser?.login}
    </div>
  )
}

export default NickNameHeader

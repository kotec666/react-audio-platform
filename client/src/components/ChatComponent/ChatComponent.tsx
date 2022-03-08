import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import s from './ChatComponent.module.scss'
import arrow from '../../utils/icons/arrow.png'
import send from '../../utils/icons/send.png'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { conversationAPI } from '../../servicesAPI/ConversationService'
import { setActiveConversation } from '../../store/reducers/ConversationSlice'
import { io, Socket } from 'socket.io-client'
import Conversation from './Conversation'
import NickNameHeader from './NickNameHeader'


interface IChatComponentProps {
  setDisplayChat: Dispatch<SetStateAction<boolean>>
  displayChat: boolean
}

const ChatComponent: React.FC<IChatComponentProps> = ({ setDisplayChat, displayChat }) => {
  const scrollRef = useRef<null | HTMLDivElement>(null)
  const socket = useRef<null | Socket>(null)


  const [receiverId, setReceiverId] = useState<null | number>(null)
  const [activeMessage, setActiveMessage] = useState('')
  const [arrivalMessage, setArrivalMessage] = useState({ id: 0, text: '', createdAt: '', updatedAt: '', userId: 0, conversationId: 0, })
  const [activeMessages, setActiveMessages] = useState([{ id: 0, text: '', createdAt: '', updatedAt: '', userId: 0, conversationId: 0, }])


  const dispatch = useAppDispatch()
  const { user } = useAppSelector(state => state.userReducer)
  const { activeConversation } = useAppSelector(state => state.conversationReducer)


  const { data: conversation, isLoading: isLoadingConv, isError: isErrorConv } = conversationAPI.useGetConversationByUserIdQuery({ userId: user ? user.id : 0 })
  const { data: conversationUsers, isLoading: isLoadingConvUsers, isError: isErrorConvUsers } = conversationAPI.useGetConversationUsersQuery('')
  const { data: conversationMessages, isError: isErrorMessages } = conversationAPI.useGetMessagesByConvIdQuery({conversationId: activeConversation.id})


  const [addConversation, { isLoading: isLoadingAddConv }] = conversationAPI.useAddConversationMutation()
  const [addMessage, { isLoading: isLoadingAddMess }] = conversationAPI.useAddMessageMutation()

  useEffect(() => {
    if (conversationMessages) {
      setActiveMessages(conversationMessages.message)
    }
  }, [conversationMessages])

  useEffect(() => {
    socket.current = io('ws://localhost:8900')
    socket.current.on('getMessage', (data) => {
      setArrivalMessage({
        id: 0,
        text: data.text,
        createdAt: Date.now().toString(),
        updatedAt: Date.now().toString(),
        conversationId: activeConversation?.id,
        userId: data.senderId
      })
    })
  }, [])

  useEffect(() => {
    arrivalMessage &&
    receiverId === arrivalMessage.userId &&
    setActiveMessages((prev) => [...prev, arrivalMessage])
  }, [arrivalMessage, activeConversation])

  useEffect(() => {
      socket?.current?.emit('addUser', user?.id)
  }, [user])

  useEffect(() => {
    setReceiverId(null)
    const members = [activeConversation.firstMemberId, activeConversation.secondMemberId]
    const receiver = members.find(
      (member) => member !== user.id
    )
    if (receiver) {
      setReceiverId(receiver)
    }
  }, [activeConversation])

  const createConversation = async (secondId: number) => {
    try {
      await addConversation({ firstMemberId: user?.id, secondMemberId: secondId }).unwrap()
    } catch (e) {
      console.log(e)
    }
  }

  const onChangeMessageInputHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setActiveMessage(e.target.value)
  }

  const createMessage = async () => {
    await addMessage({ userId: user?.id, text: activeMessage, conversationId: activeConversation?.id }).unwrap()
    setActiveMessage('')
      socket?.current?.emit('sendMessage', {
        senderId: user.id,
        receiverId,
        text: activeMessage,
      })
  }

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [activeMessages])

  const { convUser } = useAppSelector(state => state.conversationReducer)

  return (
    <div className={s.chatWrapper}>
      <div className={s.chatHeader}>
        {
          activeConversation.id !== 0
            ? <div
              className={s.backToList}
              onClick={() => dispatch(setActiveConversation({
                id: 0,
                firstMemberId: 0,
                secondMemberId: 0,
                createdAt: Date.now().toString(),
                updatedAt: Date.now().toString(),
                userId: 0
              }))}
            >
              К списку
            </div>
            : <div>
              Чат
            </div>

        }
        {
          activeConversation.id !== 0
            ? <div>{<NickNameHeader receiverId={receiverId} />}</div>
            : null
        }
        <div className={s.openedChatArrow} onClick={() => setDisplayChat(!displayChat)}>
          <img src={arrow} alt="arrow"/>
        </div>
      </div>
      <div className={s.chatBody}>
        {isErrorConv ? <div>Произошла ошибка при загрузке...</div> : null}
        {
          activeConversation.id === 0
            ? isLoadingConv ? <div className={s.loader}>Loading...</div> : conversation && conversation.conversation.map(conv => {
            return (
              <Conversation
                key={conv?.id}
                twoIds={[conv?.firstMemberId, conv?.secondMemberId]}
                setConv={setActiveConversation}
                setConvData={conv}
                disabledAttr={isLoadingConv}
                isExistConv={true}
              />
            )
          })
            : null
        }

        {isErrorConvUsers ? <div>Произошла ошибка при загрузке...</div> : null}
        {
          activeConversation.id === 0
            ? isLoadingConvUsers ? <div className={s.loader}>Loading...</div> : conversationUsers && conversationUsers.user.map(convUser => {
            return (
              <Conversation
                key={convUser.id}
                twoIds={[user?.id, convUser?.id]}
                createConv={createConversation}
                createConvData={convUser?.id}
                disabledAttr={isLoadingAddConv}
                isExistConv={false}
              />
            )
          })
            : null
        }

        {isErrorMessages ? <div>Произошла ошибка при загрузке...</div> : null}
        {
          activeConversation.id !== 0
          ? activeMessages && activeMessages.map(message => {
                return (
                  <div
                    key={message.createdAt}
                    className={`${s.messageWrapper}
                    ${ message?.userId === receiverId ? `${s.messageWrapperFriend}` : `${s.messageWrapperOwn}` }`}
                  >
                    <div className={`${s.message} ${ message?.userId === receiverId ? `${s.friendMessage}` : `${s.ownMessage}` }`}>
                      <span ref={scrollRef} >{message?.text}</span>
                    </div>
                  </div>
                )
            })
          : null
        }

      </div>
      {
        activeConversation.id !== 0
          ? <div className={s.chatFooter}>
            <textarea
              onChange={onChangeMessageInputHandler}
              value={activeMessage}
              required={true}
            />
            <button
              className={s.sendWrapper}
              onClick={createMessage}
              disabled={isLoadingAddMess}
            >
              <img src={send} alt="sendBtn"/>
            </button>
          </div>
          : null
      }
    </div>
  )
}

export default ChatComponent

// <div key={convUser?.id} className={s.userCardWrapper}>
//   <div className={s.userNameWrapper}>
//   <span>{convUser?.login}</span>
// </div>
// <button
// className={s.contact}
// onClick={() => createConversation(convUser.id)}
// disabled={isLoadingAddConv}
// >
// <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
// <path
// d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm.5 10h6v1h-6v6h-1v-6h-6v-1h6v-6h1v6z"/>
// </svg>
// </button>
// </div>

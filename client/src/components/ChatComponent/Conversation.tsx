import React, { useEffect, useState } from 'react'
import s from './ChatComponent.module.scss'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import { IConversationData } from '../../models/IConversation'
import { conversationAPI } from '../../servicesAPI/ConversationService'

interface IConversationProps {
  twoIds: Array<number>
  setConv?: ActionCreatorWithPayload<any, string>
  createConv?: (secondId: number ) => Promise<void>
  setConvData?: IConversationData
  createConvData?: number
  disabledAttr: boolean
  isExistConv: boolean
}

const Conversation:React.FC<IConversationProps> = ({ twoIds, setConv, createConv, disabledAttr, isExistConv, setConvData, createConvData }) => {
  const dispatch = useAppDispatch()
  const [receiverId, setReceiverId] = useState<null | number>(null)
  const { user } = useAppSelector(state => state.userReducer)

  const {data: convUser} = conversationAPI.useGetConvUserDataQuery({userId: receiverId ? receiverId : 0})

  useEffect(() => {
    const receiver = twoIds.find(
      (member) => member !== user?.id
    )
    if (receiver) {
      setReceiverId(receiver)
    }
  }, [])

  const createOrSetChat = async () => {
    if (isExistConv) {
      if (setConv) {
        dispatch(setConv(setConvData))
      }
    } else {
      if (createConv && createConvData) {
        await createConv(createConvData)
      }
    }
  }

  return (
    <div className={s.userCardWrapper}>
      <div className={s.userNameWrapper}>
        <span>{receiverId ? convUser && convUser?.login : 'Вы'}</span>
      </div>
      <button
        className={s.contact}
        onClick={createOrSetChat}
        disabled={disabledAttr}
      >
        {
          isExistConv
          ?  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M16 1.82843C16.2626 1.56578 16.5744 1.35744 16.9176 1.2153C17.2608 1.07316 17.6286 1 18 1C18.3714 1 18.7392 1.07316 19.0824 1.2153C19.4256 1.35744 19.7374 1.56578 20 1.82843C20.2626 2.09107 20.471 2.40287 20.6131 2.74603C20.7553 3.0892 20.8284 3.45699 20.8284 3.82843C20.8284 4.19986 20.7553 4.56766 20.6131 4.91082C20.471 5.25398 20.2626 5.56578 20 5.82843L6.5 19.3284L1 20.8284L2.5 15.3284L16 1.82843Z"
                stroke="#3E4954"/>
            </svg>
          : <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
              <path
                d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm.5 10h6v1h-6v6h-1v-6h-6v-1h6v-6h1v6z"/>
            </svg>
        }
      </button>
    </div>
  )
}

export default Conversation

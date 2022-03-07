import React, { Dispatch, SetStateAction } from 'react'
import s from './ChatComponent.module.scss'
import arrow from '../../utils/icons/arrow.png'
import send from '../../utils/icons/send.png'

interface IChatComponentProps {
  setDisplayChat: Dispatch<SetStateAction<boolean>>
  displayChat: boolean
}

const ChatComponent:React.FC<IChatComponentProps> = ({setDisplayChat, displayChat}) => {
  return (
    <div className={s.chatWrapper}>
      <div className={s.chatHeader}>
        <div className={s.backToList}>К списку</div>
        <div>Пользователь 1</div>
        <div className={s.openedChatArrow} onClick={() => setDisplayChat(!displayChat)}>
          <img src={arrow} alt="arrow"/>
        </div>
      </div>
      <div className={s.chatBody}>

        {/*<div className={s.userCardWrapper}>*/}
        {/*  <span>Пользователь 1</span>*/}
        {/*  <div className={s.contact}>*/}
        {/*    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
        {/*      <path d="M16 1.82843C16.2626 1.56578 16.5744 1.35744 16.9176 1.2153C17.2608 1.07316 17.6286 1 18 1C18.3714 1 18.7392 1.07316 19.0824 1.2153C19.4256 1.35744 19.7374 1.56578 20 1.82843C20.2626 2.09107 20.471 2.40287 20.6131 2.74603C20.7553 3.0892 20.8284 3.45699 20.8284 3.82843C20.8284 4.19986 20.7553 4.56766 20.6131 4.91082C20.471 5.25398 20.2626 5.56578 20 5.82843L6.5 19.3284L1 20.8284L2.5 15.3284L16 1.82843Z" stroke="#3E4954"/>*/}
        {/*    </svg>*/}
        {/*  </div>*/}
        {/*</div>*/}

        <div className={`${s.messageWrapper} ${s.messageWrapperOwn}`}>
          <div className={`${s.message} ${s.ownMessage}`}>
            <span>Доброго утру</span>
          </div>
        </div>

        <div className={`${s.messageWrapper} ${s.messageWrapperFriend}`}>
          <div className={`${s.message} ${s.friendMessage}`}>
            <span>Доброго утру</span>
          </div>
        </div>


      </div>
      <div className={s.chatFooter}>
        <textarea  />
        <div className={s.sendWrapper}>
          <img src={send} alt="sendBtn"/>
        </div>
      </div>
    </div>
  )
}

export default ChatComponent

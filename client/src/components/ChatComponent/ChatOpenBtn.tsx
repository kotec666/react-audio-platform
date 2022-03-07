import React, { Dispatch, SetStateAction } from 'react'
import arrow from './../../utils/icons/arrow.png'
import s from './ChatComponent.module.scss'


interface IChatOpenBtn {
  setDisplayChat: Dispatch<SetStateAction<boolean>>
  displayChat: boolean
}

const ChatOpenBtn:React.FC<IChatOpenBtn> = ({ setDisplayChat, displayChat }) => {
  return (
    <div onClick={() => setDisplayChat(!displayChat)} >
      <div className={s.closedChatBtnWrapper}>
        <img src={arrow} alt="arrow"/>
      </div>
    </div>
  )
}

export default ChatOpenBtn

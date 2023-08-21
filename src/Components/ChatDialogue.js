import React from "react";

function ChatDialogue({ message, isLeft, avatar }){
    const dialogueClass = isLeft ? 'left-dialogue' : 'right-dialogue';

    return (
        <div className={`chat-dialogue ${dialogueClass}`}>
            {isLeft ?
                <>
                    <img src={avatar} alt="Avatar" className="avatar"/>
                    <div className="message">{message}</div>
                </> :
                <>
                    <div className="message">{message}</div>
                    <img src={avatar} alt="Avatar" className="avatar"/>
                </>
            }
        </div>
    );
};

export default ChatDialogue

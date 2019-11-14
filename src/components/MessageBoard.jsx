import React, { useState } from 'react';

function MessageBoard(props) {

    const [currentMessage, setMessage] = useState('');
    const [messageList, addMessage] = useState([]);
    
    function updateMessage(e) {
        setMessage(e.target.value);
    }

    function submitMessage(e) {
        e.preventDefault();
        socket.emit('find room', props.venue)
        socket.emit('chat message', currentMessage)
    }
    
    socket.on('chat message', function(msg) {
        const message = (<div key={messageList.length} className='message'>{msg}</div>)
        const updatedMessageList = [...messageList, message]
        addMessage(updatedMessageList);
    })

    
    return (
        <div className='message-board'>
          <ul id="messages">
             {messageList}
          </ul>

          <form action="">
            <input id="message-input" onChange={updateMessage} value={currentMessage}/><button onClick={submitMessage}>Send</button>
          </form>

        </div>
    )
}

export default MessageBoard;
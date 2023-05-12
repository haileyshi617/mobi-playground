import { useState } from 'react';

import { Card, Input, Divider, Space } from 'antd';

const { TextArea } = Input;

function Chat({ chatLog, onSendChatMsg }) {
  const [inputContent, setInputContent] = useState('');

  const handleInput = (e) => {
    setInputContent(e.target.value);
  };

  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      setInputContent('');
    }
  };

  async function handleSubmit() {
    await onSendChatMsg(inputContent);
  }

  return (
    <div className='chat-container'>
      <Card title='Chat' extra={<a>Export</a>} className='chat'>
        <div className='chat-height-control'>
          {chatLog.map((chatLog, idx) => {
            return (
              <div key={idx}>
                <p>{chatLog.role}:</p>
                <p>{chatLog.content}</p>
                <Divider />
              </div>
            );
          })}
        </div>
        <footer className='chat-footer'>
          <Space.Compact
            style={{
              width: '100%',
            }}
          >
            <TextArea
              className='chat-input'
              placeholder='Say something about your trip'
              autoSize={{
                minRows: 1,
                maxRows: 6,
              }}
              value={inputContent}
              onInput={handleInput}
              onPressEnter={handleSubmit}
              onKeyUp={handleKeyUp}
            />
          </Space.Compact>
        </footer>
      </Card>
    </div>
  );
}

export default Chat;

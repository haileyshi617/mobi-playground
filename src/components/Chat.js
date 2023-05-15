import { useState } from 'react';
import ScrollableFeed from 'react-scrollable-feed';
import { Card, Input, Space, Button, Tooltip, Skeleton } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

import ChatDialogue from './ChatDialogue';

const { TextArea } = Input;

function Chat({ chatLog, onSendChatMsg, loading }) {
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

  const exportData = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(chatLog)
    )}`;
    const link = document.createElement('a');
    link.href = jsonString;
    link.download = 'chatLog.json';

    link.click();
  };

  return (
    <div className='chat-container'>
      <Card
        title='Chat'
        extra={
          <Tooltip title='Save chat history into a JSON'>
            <Button onClick={exportData} icon={<DownloadOutlined />}>
              Export
            </Button>
          </Tooltip>
        }
        className='chat'
      >
        <div className='chat-height-control'>
          <ScrollableFeed>
            {chatLog.map((chatLog, idx) => {
              return (
                <ChatDialogue
                  key={idx}
                  role={chatLog.role}
                  content={chatLog.content}
                />
              );
            })}
            {loading && (
              <div className='chat-dialogue assistant'>
                <Skeleton
                  active
                  title={false}
                  paragraph={{
                    rows: 2,
                  }}
                />
              </div>
            )}
          </ScrollableFeed>
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

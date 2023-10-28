import { useState } from 'react';
import axios from 'axios';
import { Input, Card, CardBody, Typography, Popover, PopoverHandler, PopoverContent, Button } from '@material-tailwind/react';
import { icons } from '../common/content.js'

const botUrl = import.meta.env.VITE_BOT_URL

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);

  const sendMessage = async () => {
    if (inputText.trim() === '') return;
    const newMessage = { text: inputText, isUser: true };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setIsSending(true);
    try {
      const response = await axios.post(`${botUrl}/send-message`, { message: inputText });
      const botMessage = { text: response.data, isUser: false };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
    setIsSending(false);
    setInputText('');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !isSending) {
      sendMessage();
    }
  };

  return (


    <Popover offset={20} placement='bottom'>
      <PopoverHandler>
        <Typography color='blue-gray' variant='small' className='font-normal'>
          AI Helper</Typography>
      </PopoverHandler>
      <PopoverContent className=' w-full bg-transparent border-none shadow-none'>
        <div className='w-full px-10 fixed top-20 left-0'>
          <div className='w-full bg-gray-900 bg-opacity-80 border-gray-800 p-5 rounded-lg shadow-xl'>
            <Typography color='white' variant='lead' className='mb-2 ml-2 flex flex-row items-center gap-2'>
              <icons.ChatBubbleOvalLeftIcon color="green" className="h-[20px] w-[20px]" />
              AI Helper</Typography>
            <div className='overflow-y-scroll border-2 border-gray-900 max-h-[500px]'>
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`py-10 px-5 border-b-2 border-gray-900 ${message.isUser ? 'text-right' : 'text-left'
                    }`}
                >
                  <div className={`w-4/5 ${message.isUser ? 'ml-auto' : 'mr-auto'}`}>
                    <Card key={index} color={message.isUser ? 'gray' : 'green'}>
                      <CardBody>
                        <Typography>{message.text}</Typography>
                      </CardBody>
                    </Card>
                  </div>
                </div>
              ))}
            </div>

            <Input
              variant='static'
              type='text'
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              className='w-full px-3 disabled:bg-gray-800'
              placeholder='Ask a question'
              icon={
                <icons.EyeIcon
                  onClick={sendMessage}
                  className={`w-5 h-5 cursor-pointer ${isSending ? 'opacity-50 cursor-not-allowed' : ''}`}
                  stroke='white'
                />
              }
              disabled={isSending}
            />
          </div>
        </div>

      </PopoverContent>

    </Popover>


  );
};

export default Chatbot;

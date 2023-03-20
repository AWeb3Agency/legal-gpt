import React, { useEffect, useState } from 'react';
// @ts-ignore
import { supabase } from '../utils/supabaseClient'

import Chat from '@components/Chat';
import Menu from '@components/Menu';

import { useParams } from 'react-router-dom';

function ChatPage() {
  let { chatId } = useParams();
  const [model, setModel] = useState('')
  const [loading, setLoading] = useState(true)
  
  async function getModel() {
    const { data } = await supabase
      .from("Models")
      .select()
      .eq('id', chatId)
      .limit(1);

    setModel(data[0]);
    setLoading(false);
  }

  !model && getModel()

  return (
    <div className='overflow-hidden w-full h-full relative'>
      {
        loading &&
        <p>Loading...</p>
      }
      {
        !loading && !model &&
        <div className='flex h-full flex-1 flex-col md:pl-[260px]'>
          <p>Model Not Found</p>
        </div>
      }
      {
        !loading && model &&
        <>
          <Menu />
          <Chat model={model} />
        </>
      }
    </div>
  );
}

export default ChatPage;

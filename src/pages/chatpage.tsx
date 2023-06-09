import React, { useEffect, useState } from 'react';
// @ts-ignore
import { supabase } from '../utils/supabaseClient'
import {
  Link,
} from "react-router-dom";
import Chat from '@components/Chat';
import Menu from '@components/Menu';
import logo from '../assets/branding/logo_app.svg';

import { useParams } from 'react-router-dom';

function ChatPage() {
  const [session] = React.useState(
    localStorage.getItem("session")
  ) as any;
  const session_obj = typeof session === 'string' ? JSON.parse(session) : session
  
  let { chatId } = useParams();
  const [model, setModel] = useState() as any
  const [subscription, setSubscription] = useState('') as any
  const [loading, setLoading] = useState(true)
  const [docs, setDocs] = useState([])
  
  async function getModel() {
    const { data, error } = await supabase
      .from("Models")
      .select()
      .eq('id', chatId)
      .limit(1);

    setModel(data[0]);
    !data[0].bucket && setLoading(false);

    !error && data[0].bucket && getDocs(data[0].bucket, data[0])
  }

  async function getSuscription() {
    if (!session_obj?.user?.id) return;
    const { data } = await supabase
      .from("Subscription")
      .select()
      .eq('user', session_obj.user.id)
      .limit(1);
    
      data.length > 0 && setSubscription(data);
  }

  async function getDocs(bucket: string, model: any) {
    const { data, error } = await supabase
      .storage
      .from('legal-gpt')
      .list(bucket)

    setDocs(data)
    setModel({
      ...model,
      docs: data
    });
    setLoading(false);
  }

  useEffect(()=>{
    getSuscription()
    getModel()
  }, [])

  return (
    <div className='overflow-hidden w-full h-full relative'>
      {
        loading &&
        <div className='flex  flex-col h-full flex-1 justify-center items-center'>
          <Link to={'/'}><img src={logo} alt="logo" width={'75px'} style={{ marginBottom: 25 }} /></Link>
          <p>Loading...</p>
        </div>
      }
      {
        !loading && !session_obj?.user?.id &&
        <div className='flex  flex-col h-full flex-1 justify-center items-center'>
          <Link to={'/'}><img src={logo} alt="logo" width={'75px'} style={{ marginBottom: 25 }} /></Link>
          <p>You're not logged in.</p>
        </div>
      }
      {
        !loading && !model &&
        <div className='flex  flex-col h-full flex-1 justify-center items-center'>
          <Link to={'/'}><img src={logo} alt="logo" width={'75px'} style={{ marginBottom: 25 }} /></Link>
          <p>Model Not Found.</p>
        </div>
      }
      {
        !loading && (!subscription || !subscription[0]?.whitelisted) &&
        <div className='flex  flex-col h-full flex-1 justify-center items-center'>
          <Link to={'/'}><img src={logo} alt="logo" width={'75px'} style={{ marginBottom: 25 }} /></Link>
          <p>you don't have a subscription yet.</p>
        </div>
      }
      {
        !loading && model && subscription && subscription[0]?.whitelisted &&
        <>
          <Menu />
          <Chat model={model} />
        </>
      }
    </div>
  );
}

export default ChatPage;

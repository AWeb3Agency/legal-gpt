import { useEffect } from 'react'
import $ from 'jquery';

import Header from '../components/Header';
import Hero from '@components/Hero';
import Intro from '@components/Intro';
import Highlights from '@components/Highlights';
import Categories from '@components/Categories';
import Footer from '@components/Footer';

function ChatPage() {
  useEffect(() => {
    $("html").removeClass("dark");
  }, []);
  return (
    <>
      <Header />
      <Hero />
      <Intro />
      <Highlights />
      <Categories />
      <Footer />
    </>
  );
}

export default ChatPage;

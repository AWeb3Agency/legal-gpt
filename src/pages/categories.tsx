import { useEffect, useState } from 'react'
import $ from 'jquery';
// @ts-ignore
import { supabase } from '../utils/supabaseClient'
import {
  Link,
} from "react-router-dom";
import Header from '../components/Header';
import Footer from '@components/Footer';
import { useParams } from 'react-router-dom';

function ChatPage() {
  let { categoryId } = useParams();
  const [category, setCategory] = useState({}) as any
  const [models, setModels] = useState([])
  const [loading, setLoading] = useState(true)

  async function getCategory() {
    const { data } = await supabase
      .from("Categories")
      .select()
      .eq('id', categoryId)
      .limit(1);

    setCategory(data[0]);
    console.log(data);
  }

  async function getModels() {
    const { data } = await supabase
      .from("Models")
      .select()
      .contains('categories', [categoryId]);

    setModels(data)
    console.log(data);
  }

  useEffect(() => {
    $("html").removeClass("dark");
    getCategory();
    getModels();
    setLoading(false)
  }, []);

  return (
    <>
      <Header />
      <div className="bg-white py-24 sm:py-16 sm:pt-0">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div style={{ display: 'flex' }} className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">{ category.name }</h2> 
            <span style={{ marginLeft: 10, marginTop: 5 }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
              </svg>
            </span>
          </div>

          <div className="mx-auto max-w-2xl mt-10 mb-12 lg:max-w-4xl">
          <div className="options" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%'}}>

            {
              !loading && models.length > 0 && models.map((model: any, i: number) => {
                console.log(model)
                return (
                  <Link key={`option_${i}`} to={`/chat/${model.id}`} className={`option active`} style={{ backgroundImage: `url(${model.cover})`, width: '45%', margin: '10px' }}>
                      <div className="shadow" />
                      <div className="label">
                        <div className="icon">
                          <i className="fas fa-walking" />
                        </div>
                        <div className="info">
                          <div className="main">{ model.title }</div>
                          <div className="sub">{ model.description.substring(0,45) + '...' }</div>
                        </div>
                      </div>
                  </Link>
                )
              })
            }

          </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ChatPage;

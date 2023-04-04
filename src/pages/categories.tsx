import { useEffect, useState } from 'react'
import $ from 'jquery';
// @ts-ignore
import { supabase } from '../utils/supabaseClient'
import Header from '../components/Header';
import Footer from '@components/Footer';
import {
  Link,
  useParams,
  useNavigate,
} from 'react-router-dom';

function ChatPage() {
  let { categoryId } = useParams();
  const navigate = useNavigate();  

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

	const goBack = () => {
		navigate(-1);
	}

  return (
    <>
      <Header />
      <div className="bg-white py-24 sm:py-16 sm:pt-0">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div onClick={goBack} style={{ display: 'flex' }} className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <span style={{ cursor: 'pointer', marginLeft: 10, marginRight: 15, marginTop: 5, width: '25px', position: 'relative', top: -2 }}>
              <svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
                width="100%" height="auto" viewBox="0 0 46.032 46.033"
                xmlSpace="preserve">
              <g>
                <g>
                  <path d="M8.532,18.531l8.955-8.999c-0.244-0.736-0.798-1.348-1.54-1.653c-1.01-0.418-2.177-0.185-2.95,0.591L1.047,20.479
                    c-1.396,1.402-1.396,3.67,0,5.073l11.949,12.01c0.771,0.775,1.941,1.01,2.951,0.592c0.742-0.307,1.295-0.918,1.54-1.652l-8.956-9
                    C6.07,25.027,6.071,21.003,8.532,18.531z"/>
                  <path d="M45.973,31.64c-1.396-5.957-5.771-14.256-18.906-16.01v-5.252c0-1.095-0.664-2.082-1.676-2.5
                    c-0.334-0.138-0.686-0.205-1.033-0.205c-0.705,0-1.398,0.276-1.917,0.796L10.49,20.479c-1.396,1.402-1.396,3.669-0.001,5.073
                    l11.95,12.009c0.517,0.521,1.212,0.797,1.92,0.797c0.347,0,0.697-0.066,1.031-0.205c1.012-0.418,1.676-1.404,1.676-2.5V30.57
                    c4.494,0.004,10.963,0.596,15.564,3.463c0.361,0.225,0.77,0.336,1.176,0.336c0.457,0,0.91-0.139,1.297-0.416
                    C45.836,33.429,46.18,32.515,45.973,31.64z"/>
                </g>
              </g>
              </svg>
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">{ category.name }</h2> 
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

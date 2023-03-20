import { useState, useEffect } from 'react'
// @ts-ignore
import { supabase } from '../../utils/supabaseClient'
import './index.css';
import {
    Link,
  } from "react-router-dom";

export default function Highlights() {
  const [loading, setLoading] = useState(true)
  const [model, setModel] = useState({}) as any;

  useEffect(() => {
    getItems();
  }, []);

  async function getItems() {
    const { data } = await supabase
      .from("Models")
      .select()
      .eq('highlighted', true)
      .limit(1);

    setModel(data[0]);
    setLoading(false);
  }


  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <p className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            Highlighted
          </p>
        </div>
        <div className="mx-auto mt-12 max-w-2xl lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-y-10 gap-x-8 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                <div className="relative">
                    <dt className="highlight-img-container text-base font-semibold leading-7 text-gray-900">
                        <div className="highlight-img top-0 left-0 flex h-50 w-50 items-top justify-center rounded-lg" style={{ backgroundImage: `url(${model.cover})` }}>
                        </div>
                    </dt>
                </div>
                <div className="relative">
                    <dt className="text-base font-semibold leading-7 text-gray-900">
                        { model.title ? model.title : 'Loading...' }
                    </dt>
                    <dd className="mt-2 text-base leading-7 text-gray-600">
                      { model.description ? model.description : 'Loading...' }
                    </dd>
                    <dd className="mt-2 text-base leading-7 text-gray-600">
                        <Link to="/chat/123456" className="text-sm font-semibold text-gray-900">
                        { model ? 'Interrogar Documento ' : 'Loading... ' }<span aria-hidden="true">&rarr;</span>
                        </Link>
                    </dd>
                </div>
            </dl>
        </div>
      </div>
    </div>
  )
}

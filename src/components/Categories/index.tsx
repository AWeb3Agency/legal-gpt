
import { useState, useEffect } from 'react'
// @ts-ignore
import { supabase } from '../../utils/supabaseClient'
import './index.css';
import {
    Link,
  } from "react-router-dom";

import $ from 'jquery';
import './index.css';

export default function Categories() {
  const [loading, setLoading] = useState(true)
  const [categories, setCategorias] = useState([]) as any;

  useEffect(() => {
    getItems();
  }, []);

  async function getItems() {
    const { data } = await supabase
      .from("Categories")
      .select()
      .limit(5);
      
    setCategorias(data);
    setLoading(false);
    console.log(categories);
  }

  useEffect(() => {
    $(".option").hover(function(e: any){
      $(".option").removeClass("active");
      $(e.currentTarget).addClass("active");   
    });
  }, [categories]);


  return (
    <div className="bg-white py-24 sm:py-16 sm:pt-0">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div style={{ display: 'flex' }} className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Categorias</h2> 
          <span style={{ marginLeft: 10, marginTop: 5 }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
            </svg>
          </span>
        </div>

        <div className="mx-auto max-w-2xl mt-10 mb-12 lg:max-w-4xl">
        <div className="options">

          {
            !loading && categories.map((category: any, i: number) => {
              const active = i === 0 ? 'active' : null
              return (
                <div className={`option ${active}`} style={{ backgroundImage: `url(${category.cover})` }}>
                  <div className="shadow" />
                  <div className="label">
                    <div className="icon">
                      <i className="fas fa-walking" />
                    </div>
                    <div className="info">
                      <div className="main">{ category.name }</div>
                      <div className="sub">{ category.description.substring(0,45) + '...' }</div>
                    </div>
                  </div>
                </div>
              )
            })
          }

        </div>
        </div>
      </div>
    </div>
  )
}

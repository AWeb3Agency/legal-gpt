
import { useEffect } from 'react';

import $ from 'jquery';
import './index.css';

import Thumb from '../../assets/placeholders/thumb-example.jpeg';
const items = [
  {
    id: 1,
    name: 'Escrituras públicas de propiedad',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Chat ahora',
  },
  {
    id: 2,
    name: 'Actas de nacimiento,',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Chat ahora',
  },
  {
    id: 3,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Chat ahora',
  },
  {
    id: 4,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Chat ahora',
  },
]

export default function Categories() {
  useEffect(() => {
    $(".option").hover(function(e: any){
      $(".option").removeClass("active");
      $(e.currentTarget).addClass("active");   
    });
  }, []);
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
          <div className="option active" style={{ backgroundImage: `url(${Thumb})` }}>
            <div className="shadow" />
            <div className="label">
              <div className="icon">
                <i className="fas fa-walking" />
              </div>
              <div className="info">
                <div className="main">Blonkisoaz</div>
                <div className="sub">Omuke trughte a otufta</div>
              </div>
            </div>
          </div>
          <div className="option" style={{ backgroundImage: `url(${Thumb})` }}>
            <div className="shadow" />
            <div className="label">
              <div className="icon">
                <i className="fas fa-snowflake" />
              </div>
              <div className="info">
                <div className="main">Oretemauw</div>
                <div className="sub">Omuke trughte a otufta</div>
              </div>
            </div>
          </div>
          <div className="option" style={{ backgroundImage: `url(${Thumb})` }}>
            <div className="shadow" />
            <div className="label">
              <div className="icon">
                <i className="fas fa-tree" />
              </div>
              <div className="info">
                <div className="main">Iteresuselle</div>
                <div className="sub">Omuke trughte a otufta</div>
              </div>
            </div>
          </div>
          <div className="option" style={{ backgroundImage: `url(${Thumb})` }}>
            <div className="shadow" />
            <div className="label">
              <div className="icon">
                <i className="fas fa-tint" />
              </div>
              <div className="info">
                <div className="main">Idiefe</div>
                <div className="sub">Omuke trughte a otufta</div>
              </div>
            </div>
          </div>
          <div className="option" style={{ backgroundImage: `url(${Thumb})` }}>
            <div className="shadow" />
            <div className="label">
              <div className="icon">
                <i className="fas fa-sun" />
              </div>
              <div className="info">
                <div className="main">Inatethi</div>
                <div className="sub">Omuke trughte a otufta</div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

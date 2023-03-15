import { ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import constitucion from '../../assets/constitucion.png';
import {
    Link,
  } from "react-router-dom";

export default function Highlights() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <p className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            Highlighted
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-y-10 gap-x-8 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                <div className="relative pl-16">
                    <dt className="text-base font-semibold leading-7 text-gray-900">
                        <div className="top-0 left-0 flex h-50 w-50 items-top justify-center rounded-lg">
                            <img src={constitucion} alt="logo" className='' />
                        </div>
                    </dt>
                </div>
                <div className="relative pl-16">
                    <dt className="text-base font-semibold leading-7 text-gray-900">
                        {'Constitucion Dominicana'}
                    </dt>
                    <dd className="mt-2 text-base leading-7 text-gray-600">{'La Constitución de la República Dominicana es la norma suprema del país y fue promulgada por primera vez en 1844. A lo largo de su historia, ha sido objeto de varias reformas y enmiendas, siendo la versión actual promulgada en 2015. '}</dd>
                    <dd className="mt-2 text-base leading-7 text-gray-600">
                        <Link to="/chat" className="text-sm font-semibold text-gray-900">
                            Interrogar Documento<span aria-hidden="true">&rarr;</span>
                        </Link>
                    </dd>
                </div>
            </dl>
        </div>
      </div>
    </div>
  )
}

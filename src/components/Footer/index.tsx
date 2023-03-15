import { Disclosure, Menu, Transition } from '@headlessui/react'
import logo from '../../assets/branding/logo_app.svg';
import {
  Link,
} from "react-router-dom";

const navigation = [
  { name: 'Acerca de', href: '/acerca-de', current: false },
  { name: 'Política de privacidad', href: '/politicas-privacidad', current: false },
  { name: 'Contáctenos', href: '/contáctenos', current: false }
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Footer() {
  return (
    <Disclosure as="nav" className="">
      {({ open }) => (
        <>
          <div className="mx-auto px-6 lg:px-12">
            <div className="relative flex items-center justify-center py-5">
              <Link to={'/'}><img src={logo} alt="logo" width={'50px'} /></Link>
            </div>
            <div className="relative flex items-center justify-center pb-5">
              <div className="flex flex-1 sm:items-stretch sm:justify-center">
                <div className="">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-black' : 'text-gray-300 hover:text-black',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

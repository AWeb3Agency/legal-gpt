import React, { useState, Fragment, useEffect } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import './index.css';
// @ts-ignore
import { supabase } from '../../utils/supabaseClient'
import GoogleIcon from '../../assets/icons/GoogleIcon.png'

const navigation = [
  { name: 'Acerca de', href: '/acerca-de', current: false },
  { name: 'Política de privacidad', href: '/politicas-privacidad', current: false },
  { name: 'Contáctenos', href: '/contáctenos', current: false }
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Header() {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState('') as any

  const [session, setSession] = React.useState(
    localStorage.getItem("session")
  ) as any;

  React.useEffect(() => {
    if (!session) return
    localStorage.setItem("session", JSON.stringify(session));
    const session_obj = typeof session === 'string' ? JSON.parse(session) : session
    setSession(session_obj)
    setUser(session_obj?.user ? session_obj.user : {})
  }, [session]);

  React.useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event: any, _session: any) => {
        console.log(`Supbase auth event: ${event}`);
        setSession(_session);
        setUser(_session?.user ? _session.user : {})
      }
    );
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [session]);

  const handleLogin = async (event: any) => {
    if (session) return;
    event.preventDefault()

    setLoading(true)
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    })

    if (error) {
      alert(error.error_description || error.message)
    } else {
      console.log(data);
    }
    setLoading(false)
  }

  const handleLogout = async (event: any) => {
    setLoading(true)
    const { data, error } = await supabase.auth.signOut()
    if (error) {
      alert(error.error_description || error.message)
    } 
    
    
    console.log(data);
    localStorage.clear();
    // localStorage.removeItem("session");
    setUser('')
    setLoading(false)
  }

  return (
    <Disclosure as="nav" className="">
      {({ open }) => (
        <>
          <div className="mx-auto px-6 lg:px-12">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex flex-1 sm:items-stretch sm:justify-start">
                <div className="">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-black' : 'text-gray-300 hover:text-black',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="rounded-full p-1 text-gray-600 hover:text-gray focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="sr-only">View notifications</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full login-icon text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2">
                      <span className="sr-only">Open user menu</span>
                      <span onClick={handleLogin} >
                        {
                          user?.user_metadata?.avatar_url &&
                          <img
                          className="h-8 w-8 rounded-full"
                          src={user.user_metadata.avatar_url}
                          alt=""
                        />  
                        }
                        {
                          !user &&
                          <img
                            className="h-8 w-8 rounded-full"
                            src={GoogleIcon}
                            alt=""
                          />
                        }
                      </span>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {/*
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      */}
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            onClick={handleLogout}
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
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

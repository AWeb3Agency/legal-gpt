import logo from '../../assets/branding/logo_app.png';

export default function Hero() {
    return (
      <>
        <main className="grid min-h-full place-items-center bg-white py-24 px-6 sm:py-32 lg:px-8">
          <div className="text-center">
            <img src={logo} alt="logo" className='' />
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">LegalGPT</h1>
            <p className="mt-6 text-base leading-7 text-gray-600">La enciclopedia juridica libre</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
                <div className="relative mt-2 rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-gray-500 sm:text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                        </span>
                    </div>
                    <input
                        type="text"
                        name="search"
                        id="search"
                        className="block w-full rounded-md border-0 py-1.5 pl-10 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Escribe tu tema"
                    />
                </div>
            </div>
          </div>
        </main>
      </>
    )
  }
  
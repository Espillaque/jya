import React from 'react';

const Header = () =>{
    return (
        <header class="flex flex-wrap sticky top-0 sm:justify-start sm:flex-nowrap z-50 w-full bg-gradient-to-r from-sky-400 to-stone-300 text-sm py-4 sm:py-0 dark:bg-sky-800">
        <nav class="max-w-[85rem] w-full mx-auto px-4 md:px-6 lg:px-8" aria-label="Global">
          <div class="relative sm:flex sm:items-center">
            <div class="flex items-center justify-between">
              <a class="flex-none text-xl font-semibold dark:text-white" href="/">Juegos y amigos</a>
              <div class="sm:hidden">
                <button type="button" class="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-white dark:hover:bg-white/10" data-hs-collapse="/navbar-hover-event" aria-controls="navbar-hover-event" aria-label="Toggle navigation">
                  <svg class="hs-collapse-open:hidden flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="21" y1="6" y2="6" /><line x1="3" x2="21" y1="12" y2="12" /><line x1="3" x2="21" y1="18" y2="18" /></svg>
                  <svg class="hs-collapse-open:block hidden flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                </button>
              </div>
            </div>

            <div id="navbar-hover-event" class="hidden hs-collapse overflow-hidden transition-all duration-300 basis-full grow sm:block">
              <div class="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
                <a class="font-medium text-sky-500" href="/" aria-current="page">Inicio</a>

                <div class="hs-dropdown [--strategy:static] sm:[--strategy:absolute] [--adaptive:none] sm:[--trigger:hover] ">
                  <button type="button" class="sm:py-4 flex items-center w-full text-gray-600 hover:text-gray-400 font-medium dark:text-neutral-400 dark:hover:text-neutral-500">
                    Grupos de instituto
                    <svg class="ms-2 flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                  </button>

                  <div class="hs-dropdown-menu transition-[opacity,margin] sm:border duration-[0.1ms] sm:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 w-full hidden z-10 top-full start-0 min-w-60 bg-white sm:shadow-md rounded-lg py-2 sm:px-2 dark:bg-neutral-800 sm:dark:border dark:border-neutral-700 dark:divide-neutral-700 before:absolute">
                    <div class="sm:grid sm:grid-cols-3">
                      <div class="flex flex-col">
                        <a class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300" href="/">
                          Grupo de inmersion
                        </a>
                        <a class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300" href="/">
                          Grupo de inmersion turistica
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <a class="font-medium text-gray-600 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500" href="/">Reservas</a>
                <a class="font-medium text-gray-600 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500" href="/">Contacto</a>
              </div>
            </div>
          </div>
        </nav>
      </header>
    );
}
export default Header;
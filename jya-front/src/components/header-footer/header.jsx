import React, {useContext} from "react";
import ROUTES from "../../router/routes";
import { MyContext } from "../../context";

const Header = () => {

  const { contextData, setContextData } = useContext(MyContext);

  return (
    <header className="flex flex-wrap sticky top-0 sm:justify-start sm:flex-nowrap z-50 w-full bg-gradient-to-r from-sky-400 to-stone-300 text-sm py-6 sm:py-4 dark:bg-sky-800">
      <nav
        className="max-w-[85rem] w-full mx-auto px-4 md:px-6 lg:px-8"
        aria-label="Global"
      >
        <div className="relative sm:flex sm:items-center">
          <div className="flex items-center justify-between">
            <a
              className="flex-none text-xl font-semibold dark:text-white"
              href="/"
            >
              Juegos y amigos
            </a>
            <div className="sm:hidden">
              <button
                type="button"
                className="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-white dark:hover:bg-white/10"
                data-hs-collapse="/navbar-hover-event"
                aria-controls="navbar-hover-event"
                aria-label="Toggle navigation"
              >
                
              </button>
            </div>
          </div>

          <div
            id="navbar-hover-event"
            className="hidden hs-collapse overflow-hidden transition-all duration-300 basis-full grow sm:block"
          >
            <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
              <button
                className="font-medium text-sky-500"
                aria-current="page"
                onClick={() => {
                  setContextData({
                    ...contextData,
                    activeRoute: ROUTES.MAIN, 
                  });
                }}
              >
                Inicio
              </button>
              <button
                className="font-medium text-gray-600 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500"
                onClick={() => {
                  setContextData({
                    ...contextData,
                    activeRoute: ROUTES.GAME, 
                  });
                }}
              >
                Game
              </button>
              <button
                className="font-medium text-gray-600 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500"
                // onClick={() => {
                //   setContextData({
                //     ...contextData,
                //     activeRoute: ROUTES.CALENDARIO, 
                //   });
                // }}
              >
                Calendar
              </button>
              <button
                className="font-medium text-gray-600 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500"
                onClick={() => {
                  setContextData({
                    ...contextData,
                    activeRoute: ROUTES.ATTENDANCE, 
                  });
                }}
              >
                Asistencia
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

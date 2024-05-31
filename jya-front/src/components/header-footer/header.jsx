import React, { useState, useContext } from "react";
import ROUTES from "../../router/routes";
import { MyContext } from "../../context";


const Header = () => {
  // Access to global state and methods from context
  const { appState, setAppState, clearLocalStorage } = useContext(MyContext);
  // State to manage menu open/close
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle menu open/close
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="flex flex-wrap sticky top-0 sm:justify-start sm:flex-nowrap z-50 w-full bg-sapphire-500 text-sm py-6 sm:py-4 ">
      <nav
        className="max-w-[85rem] w-full mx-auto px-4 md:px-6 lg:px-8"
        aria-label="Global"
      >
        <div className="relative sm:flex sm:items-center">
          <div className="flex items-center justify-between">
            <a
              className="flex-none text-xl font-semibold text-malachite-50 "
              href="/"
            >
              Games and friends
            </a>
            <div className="sm:hidden">
              <button
                type="button"
                className="p-2 inline-flex justify-center items-center gap-x-2 rounded-lg border border-sapphire-700 bg-malachite-50 text-malachite-800 shadow-sm hover:bg-malachite-100 disabled:opacity-50 disabled:pointer-events-none"
                onClick={toggleMenu}
                aria-controls="navbar-hover-event"
                aria-expanded={isMenuOpen}
                aria-label="Toggle navigation"
              >
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="m11 16.745c0-.414.336-.75.75-.75h9.5c.414 0 .75.336.75.75s-.336.75-.75.75h-9.5c-.414 0-.75-.336-.75-.75zm-9-5c0-.414.336-.75.75-.75h18.5c.414 0 .75.336.75.75s-.336.75-.75.75h-18.5c-.414 0-.75-.336-.75-.75zm4-5c0-.414.336-.75.75-.75h14.5c.414 0 .75.336.75.75s-.336.75-.75.75h-14.5c-.414 0-.75-.336-.75-.75z"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          <div
            id="navbar-hover-event"
            className={`hs-collapse overflow-hidden transition-all duration-300 basis-full grow sm:block ${isMenuOpen ? "block" : "hidden"}`}
          >
            <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
              <button
                className="font-medium text-malachite-50 hover:text-malachite-200"
                aria-current="page"
                onClick={() => {
                  // Set active route to the main page
                  setAppState({
                    ...appState,
                    activeRoute: ROUTES.MAIN,
                  });
                }}
              >
                Home
              </button>
              <button
                className="font-medium text-malachite-50 hover:text-malachite-200  "
                onClick={() => {
                  // Set active route to the games page
                  setAppState({
                    ...appState,
                    activeRoute: ROUTES.GAME,
                  });
                }}
              >
                Games
              </button>

              <button
                className="font-medium text-malachite-50 hover:text-malachite-200 "
                onClick={() => {
                  // Set active route to the attendance page
                  setAppState({
                    ...appState,
                    activeRoute: ROUTES.ATTENDANCE,
                  });
                }}
              >
                Attendance
              </button>
              <button
                onClick={clearLocalStorage}
                className="font-medium text-malachite-50 hover:text-malachite-200 "
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

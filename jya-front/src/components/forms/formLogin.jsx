import React, { useContext, useRef } from "react";
import { MyContext } from "../../context";
import ROUTES from "../../router/routes";
import photo from "../../images/image1.jpeg";

const LoginForm = () => {
  // References to the form inputs
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  // Context to manage global state
  const { appState, setAppState } = useContext(MyContext);

  // Function for form submission
  const onSubmit = (data) => {
    data.preventDefault(); // Preventing default form submission behavior
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    // Configuring request headers
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // Creating data payload for the request
    const raw = JSON.stringify({
      correo_electronico: email,
      contrasena: password,
    });

    // Request options
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    // Performing fetch request to the server
    fetch("http://localhost:5000/users/login", requestOptions)
      .then((response) => response.json()) // Parsing response to JSON
      .then((result) => {
        console.log(result); // Debugging
        // Updating global state with login information
        setAppState({
          ...appState,
          activeRoute: ROUTES.MAIN,
          token: result.token,
          userId: result.userId,
          userName: result.userName,
        });
      })
      .catch((error) => console.error(error)); // Handling potential errors
  };

  return (
    <section className="bg-sapphire-50 min-h-screen flex items-center justify-center">
      <div className="bg-sapphire-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
        <div className="md:w-1/2 px-8 md:px-16">
          <h2 className="font-bold text-2xl text-sapphire-500">Sign In</h2>
          <p className="text-xs mt-4 text-sapphire-600">
            If you're already a member, easily sign in
          </p>

          {/* Login form */}
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <input
              className="p-2 mt-8 rounded-xl border"
              type="email"
              name="email"
              placeholder="Email"
              ref={emailRef}
            />
            <div className="relative">
              <input
                className="p-2 rounded-xl border w-full"
                type="password"
                name="password"
                placeholder="Password "
                ref={passwordRef}
              />
            </div>

            <button
              type="submit"
              className="bg-sapphire-500 rounded-xl text-sapphire-50 py-2 hover:scale-105 duration-300"
            >
              Sign In
            </button>
          </form>

          {/* Registration message */}
          <div className="mt-3 text-xs flex justify-between items-center text-sapphire-700">
            <p>Don't have an account?</p>
            <button
              onClick={() => {
                //  Updating global state to switch to the registration route
                setAppState({
                  ...appState,
                  activeRoute: ROUTES.REGISTER,
                });
              }}
              className="py-2 px-5 border rounded-xl hover:scale-110 duration-300"
            >
              Register
            </button>
          </div>
        </div>

        {/* Image section */}
        <div className="md:block hidden w-1/2">
          <img className="rounded-2xl" src={photo} alt="Photography about playing gameboard"/>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;

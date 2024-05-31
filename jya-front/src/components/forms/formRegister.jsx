import React, { useContext, useRef } from "react";
import photo from "../../images/image2.jpg";
import { MyContext } from "../../context";
import ROUTES from "../../router/routes";


const RegisterForm = () => {
  // References to the inputs within the form
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const userRef = useRef(null);

  // Context managing the global state
  const { appState, setAppState } = useContext(MyContext);

  // Function to handle form submission
  const onSubmit = (data) => {
    data.preventDefault(); // Prevents the default form submission behavior
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const user = userRef.current.value;

    console.log("Email:", email);
    console.log("Password:", password);
    console.log("User:", user);

    // Setting up headers for the request
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // Creating data to be sent
    const raw = JSON.stringify({
      nombre: user,
      correo_electronico: email,
      contrasena: password,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    // Fetch request to register the user
    fetch("http://localhost:5000/users/create", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  };

  return (
    <section className="bg-sapphire-50 min-h-screen flex items-center justify-center">
      <div className="bg-sapphire-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
        <div className="md:w-1/2 px-10 md:px-16">
          <h2 className="font-bold text-2xl text-sapphire-700">Register</h2>

          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <input
              className="p-2 mt-4 rounded-xl border"
              type="email"
              name="email"
              placeholder="Email"
              ref={emailRef}
            />

            <input
              className="p-2  rounded-xl border"
              type="user"
              name="user"
              placeholder="User"
              ref={userRef}
            />

            <input
              className="p-2  rounded-xl border w-full"
              type="password"
              name="password"
              placeholder="Password"
              ref={passwordRef}
            />

            <button
              type="submit"
              className="bg-sapphire-500 rounded-xl text-sapphire-50 py-2 hover:scale-105 duration-300"
            >
              Register
            </button>
          </form>

          <div className="mt-3 text-xs flex justify-between items-center text-sapphire-700">
            <button
              type="button"
              onClick={() => {
                // Changes the state to display the login form
                setAppState({
                  ...appState,
                  activeRoute: ROUTES.LOGIN,
                });
              }}
              className="py-2 px-5 border rounded-xl hover:scale-110 duration-300"
            >
              Return
            </button>
          </div>
        </div>

        <div className="md:block hidden w-1/2">
          <img
            className="rounded-2xl"
            src={photo} alt="Monopoly"
          />
        </div>
      </div>
    </section>
  );
};

export default RegisterForm;

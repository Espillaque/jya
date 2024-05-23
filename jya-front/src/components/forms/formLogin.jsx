import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const onSubmit = (data) => {
    data.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    console.log("Email:", email);
    console.log("Password:", password);

    // Aquí puedes añadir la lógica para manejar la autenticación

    navigate("/main");
  };

  return (
    <section class="bg-gray-50 min-h-screen flex items-center justify-center">
      <div class="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
        <div class="md:w-1/2 px-8 md:px-16">
          <h2 class="font-bold text-2xl text-[#002D74]">Login</h2>
          <p class="text-xs mt-4 text-[#002D74]">
            If you are already a member, easily log in
          </p>

          <form onSubmit={onSubmit} class="flex flex-col gap-4">
            <input
              class="p-2 mt-8 rounded-xl border"
              type="email"
              name="email"
              placeholder="Email"
              ref={emailRef}
            />
            <div class="relative">
              <input
                class="p-2 rounded-xl border w-full"
                type="password"
                name="password"
                placeholder="Password "
                ref={passwordRef}
              />
            </div>

            <button
              type="submit"
              class="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300"
            >
              Login
            </button>
          </form>

          <div class="mt-3 text-xs flex justify-between items-center text-[#002D74]">
            <p>Don't have an account?</p>
            <Link to="/register">
              <button class="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">
                Register
              </button>
            </Link>
          </div>
        </div>

        <div class="md:block hidden w-1/2">
          <img
            class="rounded-2xl"
            src="https://images.unsplash.com/photo-1616606103915-dea7be788566?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"
          />
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
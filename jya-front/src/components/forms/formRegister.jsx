import React from 'react';

const RegisterForm = () => {

    const onSubmit = (data) => { }

    return (

        <section class="bg-gray-50 min-h-screen flex items-center justify-center">

            <div class="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center" >

                <div class="md:w-1/2 px-10 md:px-16">
                    <h2 class="font-bold text-2xl text-[#002D74]">Register</h2>


                    <form action="" class="flex flex-col gap-4">
                        <input class="p-2 mt-4 rounded-xl border" type="email" name="email" placeholder="Email"/>

                        <input class="p-2  rounded-xl border" type="user" name="user" placeholder="User"/>

                        <input class="p-2  rounded-xl border w-full" type="password" name="password" placeholder="Password"/>

                        <button class="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300">Register</button>
                    </form>

                    <div class="mt-3 text-xs flex justify-between items-center text-[#002D74]">
                        <button class="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">Return</button>
                    </div>
                </div>


                <div class="md:block hidden w-1/2">
                    <img class="rounded-2xl" src="https://images.unsplash.com/photo-1616606103915-dea7be788566?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80" />
                </div>
            </div>
        </section>

    );
}

export default RegisterForm;
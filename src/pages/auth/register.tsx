import { MainLayout } from "@/layout/mainLayout";
import pb from "@/lib/pocketbase";
import Link from "next/link";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Register() {
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const data = {
        name: e.target.fullName.value,
        email: e.target.email.value,
        password: e.target.password.value,
        passwordConfirm: e.target.confirm.value,
      };
      console.log(data);
      const res = await pb.collection("users").create(data);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Register Success",
      }).then(() => {
        window.location.href = "/auth/login";
      });
    } catch (error) {}
  };

  return (
    <MainLayout>
      <div
        className="relative min-h-screen flex justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-no-repeat bg-cover items-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1525302220185-c387a117886e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)",
        }}
      >
        <div className="lg:w-2/5 md:w-1/2 w-2/3">
          <form
            className="bg-white p-10 text-black rounded-lg shadow-lg min-w-full flex flex-col"
            onSubmit={handleSubmit}
          >
            <h1 className="text-center text-2xl mb-6 text-gray-600 font-bold font-sans">
              Register
            </h1>
            <div>
              <label
                htmlFor="fullName"
                className="text-gray-800 font-semibold block my-1 text-md"
              >
                Username
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                placeholder="Full Name"
                required
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="text-gray-800 font-semibold block my-1 text-md"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Email"
                required
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-gray-800 font-semibold block my-1 text-md"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                autoComplete="new-password"
                required
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="text-gray-800 font-semibold block my-1 text-md">
                Confirm password
              </label>
              <input
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                type="password"
                name="confirm"
                id="confirm"
                placeholder="Confirm Password"
              />
            </div>
            <button
              type="submit"
              className="w-full mt-6 mb-3 bg-indigo-600 rounded-lg px-4 py-2 text-lg  tracking-wide font-semibold font-sans text-white"
            >
              Register
            </button>
            <Link
              href="/auth/login"
              className="w-full mt-6 text-center bg-indigo-200 rounded-lg px-4 py-2 text-lg text-black tracking-wide font-semibold font-sans"
            >
              Login
            </Link>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}

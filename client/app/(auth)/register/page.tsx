"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

type Inputs = {
  email: string;
  password: string;
  confirmPass: string;
};

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPass: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="border dark:border-gray-700 p-8 rounded-lg shadow-lg w-full max-w-lg space-y-4">
        <h2 className="text-2xl font-semibold">Create an account</h2>
        <div className="flex gap-4 items-center">
          <button className="flex gap-3 text-sm items-center justify-center border border-gray-300   py-2 px-4 w-full rounded-md">
            <FcGoogle size={24} /> Sign up with Google
          </button>
          <button className="flex gap-3 text-sm items-center justify-center border border-gray-300   py-2 px-4 w-full rounded-md">
            <FaApple size={24} /> Sign up with Apple
          </button>
        </div>
        <div className="flex items-center justify-center">
          <span className="border-b border-gray-600 flex-grow"></span>
          <span className="px-2 text-gray-400">or</span>
          <span className="border-b border-gray-600 flex-grow"></span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="">
            <label className="block text-gray-400 mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className={`w-full px-3 py-2 rounded-md ${
                errors.email ? "border-red-500" : "border-gray-700"
              } focus:outline-none focus:border-blue-500 bg-gray-700 text-white`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password")}
              className={`w-full px-3 py-2 rounded-md ${
                errors.password ? "border-red-500" : "border-gray-700"
              } focus:outline-none focus:border-blue-500 bg-gray-700 text-white`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <div className="mb-2">
            <label className="block text-gray-400 mb-4" htmlFor="confirmPass">
              Confirm Password
            </label>
            <input
              id="confirmPass"
              type="confirmPass"
              {...register("confirmPass")}
              className={`w-full px-3 py-2 rounded-md ${
                errors.confirmPass ? "border-red-500" : "border-gray-700"
              } focus:outline-none focus:border-blue-500 bg-gray-700 text-white`}
            />
            {errors.confirmPass && (
              <p className="text-red-500 text-sm">
                {errors.confirmPass.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 rounded-md  font-semibold"
          >
            Sign in to your account
          </button>
        </form>
        <p className="text-gray-400 text-sm mt-4">
          Already a user?
          <Link href="/login" className="text-blue-500 ml-1 hover:underline">
            Log in here
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;

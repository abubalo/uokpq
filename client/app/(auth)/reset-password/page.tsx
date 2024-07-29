"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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

const Reset: React.FC = () => {
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
      <div className="border dark:border-gray-700 p-8 rounded-lg shadow-lg w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold">Change Password</h2>
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
          <div className="">
            <label className="block text-gray-400 mb-2" htmlFor="password">
              New Password
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
          <div className="">
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
            Reset password
          </button>
        </form>
      </div>
    </section>
  );
};

export default Reset;

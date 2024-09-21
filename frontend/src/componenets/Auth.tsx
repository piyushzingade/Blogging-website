import { SignupInput } from "@piyush555/medium-common";
import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";


export const Auth = ({ type } : {type : "signup " | "signin"}) =>{
    const [postInputs, setPostInputs]= useState<SignupInput>({
        name : "",
        username :"",
        password:""
    })
    return (
      <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
          <div className="">
            <div className="px-10">
              <div className="font-extrabold text-3xl">Create an account</div>
              <div className="text-slate-400">
                {type ==="signin" ?"Don't have an account" : "Already have an account?"}
                <Link className="pl-2 underline" to={type ==="signin" ? "/signup" : "/signin"}>
                  {type === "signin" ? "Sign up" : "Sign in"}
                </Link>
              </div>
            </div>
            <div className="mt-8">
              <LabelledInput
                label="Name"
                placeholder="Piyush Zingade..."
                onChange={(e) => {
                  setPostInputs({
                    ...postInputs,
                    name: e.target.value,
                  });
                }}
              />
              <LabelledInput
                label="Email"
                placeholder="Piyushzingade@gmial.com .."
                onChange={(e) => {
                  setPostInputs({
                    ...postInputs,
                    name: e.target.value,
                  });
                }}
              />
              <LabelledInput
                label="Password"
                type={"password"}
                placeholder="123456"
                onChange={(e) => {
                  setPostInputs({
                    ...postInputs,
                    name: e.target.value,
                  });
                }}
              />
              <button
                type="button"
                className ="w-full mt-8 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              >
               {type === "signup " ? "Sign up" : "Sign in"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );

}

interface LabelledInputType {
    label : string,
    placeholder :string,
    onChange :(e : ChangeEvent<HTMLInputElement>) =>void,
    type?: string
}
function LabelledInput({ label, placeholder, onChange ,type }: LabelledInputType) {
  return (
    <div className="">
      <div>
        <label className="block mb-2 text-sm  text-black font-semibold dark:text-black pt-4">
          {label}
        </label>
        <input
          type={type || "text"}
          id="first_name"
          onChange={onChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
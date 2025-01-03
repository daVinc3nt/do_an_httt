import { AuthOperation } from "@/do_an-library/main";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const SigninForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router =useRouter()
  const handleSubmit = async (e) => {
    e.preventDefault();

    ////console.log(data.get ("password"))
    const Auth = new AuthOperation()
    const res = await Auth.login({ email: email, password:  password })
    console.log(res)
    if (res && res.data) {
        toast.success(res.message)
        router.push("/");
      }
   else {
            ////console.log ("Error: ", signInResponse); 
            toast.warning(res.message)
      }
  }
  return (
    <div className="selection:bg-blue-500 selection:text-white">
      <div className="flex justify-center items-center">
        <div className="p-8 flex-1">
          <div className="mx-auto overflow-hidden">
            <div className="p-8">
              <h1 className="text-5xl font-bold text-blue-600">
                Welcome back!
              </h1>

              <form className="mt-12" action="" method="POST" onSubmit={handleSubmit}>
                <div className="relative">
                  <input
                    id="signin-email"
                    name="email"
                    type="text"
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600"
                    placeholder="john@doe.com"
                    onChange={(e)=>setEmail(e.target.value)}
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Email address
                  </label>
                </div>
                <div className="mt-10 relative">
                  <input
                    id="signin-password"
                    type="password"
                    name="password"
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600"
                    placeholder="Password"
                    onChange={(e)=>setPassword(e.target.value)}
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Password
                  </label>
                </div>

                <input
                  type="submit"
                  value="Sign in"
                  className="mt-20 px-8 py-4 uppercase rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-center block w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-blue-500 focus:ring-opacity-80 cursor-pointer"
                />
              </form>
              {/* <a
                href="#"
                className="mt-4 block text-sm text-center font-medium text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {" "}
                Forgot your password?{" "}
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninForm;

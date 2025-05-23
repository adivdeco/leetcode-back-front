

import { useForm } from "react-hook-form";
import {z} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


const schema = z.object({
    email: z.string().email({message: "invalid email"}).min(1,{message: "email is required"}),
    passward: z.string().min(6,{message: "passward must be at least 6 characters long"}),
   
    });



function Login() {

    const {register,handleSubmit,formState: { errors },} = useForm({resolver: zodResolver(schema)});
         // const Submit = (data)=>{console.log(data); we can write it in the handleSubmit function as well}
 
  return (
    <>
      <form onSubmit={handleSubmit((data)=>{console.log(data)})} className="bg-gray-500 flex flex-col gap-4 p-7 w-100 mx-auto mt-65 rounded-md">

      <input className="border-2 border-gray-300 p-2 rounded-md" placeholder="Email" {...register('email', { required: true })}/>
      {errors.email?.message && <p>{errors.email?.message}</p>}

      <input type="password" className="border-2 border-gray-300 p-2 rounded-md" placeholder="Passward" {...register('passward')}/>
        {errors.passward?.message && <p>{errors.passward?.message}</p>}

      <button type="submit" className="btn">Submit</button>
    </form>
    </>
  );
}

export default Login;
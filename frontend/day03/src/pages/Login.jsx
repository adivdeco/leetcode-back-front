

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
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="card w-96 bg-gray-700 shadow-2xl">
        <div className="card-body">
        <h1 className="card-title justify-center text-3xl mask-radial-from-neutral-950 font-mono">WOW C0DE</h1>

      <form onSubmit={handleSubmit((data)=>{console.log(data)})}>
      
      <div className="form-control mt-4">
       <label className=" label mb-1">
         <span className="label-text">Email</span>
       </label>
    <input type="email"
      className={`input input-bordered ${errors.email && 'input-error'}`} 
      placeholder="adiv@gmail.com"
      {...register('email', { required: true })}
      />
      {errors.email?.message && <span className="text-error">{errors.email?.message}</span>}
     </div>

     <div className="form-control mt-4">
       <label className="label mb-1">
           <span className="label-text">Passward</span>
       </label>
      <input type="password" className={`input input-bordered ${errors.passward && 'input-error'}`} placeholder="••••••" {...register('passward')}/>
         {errors.passward?.message && <p className="text-error">{errors.passward?.message}</p>}
     </div>

          <div className="form-control mt-8 flex justify-center">
              <button type="submit" className="btn btn-primary w-full">
                Login
              </button>
          </div>
          <div className="form-control mt-2 flex justify-center">
              <button type="button" className="btn btn-link">
                Forget Passward?
              </button>
          </div>  
          <div className="form-control flex justify-center">
              <button type="button" className="btn btn-link `btn-link-secondary`">
                Don't have an account?
              </button>
          </div>
          
        </form>  
             </div>
             </div>
             </div>
    </>
  );
}

export default Login;
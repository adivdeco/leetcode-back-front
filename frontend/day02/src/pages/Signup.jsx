import { useForm } from "react-hook-form";
import {z} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


const schema = z.object({
    name: z.string().min(3,{message: "name must be at least 3 characters long"}),
    email: z.string().email({message: "invalid email"}).min(1,{message: "email is required"}),
    passward: z.string().min(6,{message: "passward must be at least 6 characters long"}),
    ConformPassward: z.string().min(6,{message: "confirm passward must be same as passward"})
}).superRefine((data,ctx)=>{
        if(data.passward !== data.ConformPassward){
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['ConformPassward'],
                message: "passward do not match",
            })
        }
    });



function Signup() {

    const {register,handleSubmit,formState: { errors },} = useForm({resolver: zodResolver(schema)});  //useform hook
         // const Submit = (data)=>{console.log(data); we can write it in the handleSubmit function as well}
 
  return (
    <>
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="card w-96 bg-base-100 shadow-2xl">
        <div className="card-body">
        <h1 className="card-title justify-center text-3xl">WOW C0DE</h1>

      <form onSubmit={handleSubmit((data)=>{console.log(data)})}>
      
      <div className="form-control">
      <label className="label mb-1"><span className="label-text">Name</span></label>
      <input type="text"  placeholder="adiv"  className={`input input-bordered ${errors.name && 'input-error'}`} {...register('name')}/>
      {errors.name?.message && <p className="text-error">{errors.name?.message}</p>}
     </div>

     <div className="form-control mt-4">
      <label className=" label mb-1">
        <span className="label-text">Email</span>
      </label>
<input type="email"
      className={`input input-bordered ${errors.email && 'input-error'}`} 
      placeholder="adiv@example.com" 
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
        
    <div className="form-control mt-4">
      <label className="label mb-1">
        <span className="label-text">Conform Passward</span>
      </label>
      <input type="password"
        placeholder="••••••" 
        className={`input input-bordered ${errors.password && 'input-error'}`}
        {...register('ConformPassward')}
        />
        {errors.ConformPassward?.message && <p className="text-error">{errors.ConformPassward?.message}</p>}
    </div>

       <div className="form-control mt-6 flex justify-center">
              <button type="submit" className="btn btn-primary w-full">
                Sign Up
              </button>
            </div>
    </form>
        </div>

      </div>

    </div>
      
    </>
  );
}

export default Signup;


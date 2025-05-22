import { useForm } from "react-hook-form";

function Signup() {

    const {register,handleSubmit,formState: { errors },} = useForm();
         // const Submit = (data)=>{console.log(data); we can write it in the handleSubmit function as well}
 
  return (
    <>
      <form onSubmit={handleSubmit((data)=>{console.log(data)})} className="bg-gray-500 flex flex-col gap-4 p-7 w-100 mx-auto mt-65 rounded-md">
      <input className="border-2 border-gray-300 p-2 rounded-md" placeholder="Name" {...register('firstName')}/>

      <input className="border-2 border-gray-300 p-2 rounded-md" placeholder="Email" {...register('email', { required: true })}/>
      {errors.email && <p>email is required.</p>}

      <input className="border-2 border-gray-300 p-2 rounded-md" placeholder="Passward" {...register('passward')}/>
        
      <button type="submit" className="btn">Submit</button>
    </form>
    </>
  );
}

export default Signup;
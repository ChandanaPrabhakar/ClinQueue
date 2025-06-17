import { Link } from "react-router-dom";

const UserLogin = () => {
  return (
    <div className="">
      <form className="w-100 h-100 flex flex-col justify-center items-center border shadow-2xl border-slate-400 rounded-lg  mx-auto my-50 overflow-y-hidden bg-white">
        <h3 className="text-xl font-bold">User Login</h3>
        <input
          className="w-75 my-2.5 border rounded-xl px-5 py-2 text-gray-400"
          placeholder="Phone Number"
          required
        ></input>
        <input
          className="w-75 my-2.5 border rounded-xl px-5 py-2 text-gray-400"
          placeholder="Password"
          required
        ></input>
        <button className="w-75 my-5 border rounded-4xl px-5 py-3 bg-secondary text-bg-primary font-extrabold cursor-pointer hover:bg-bg-secondary hover:text-primary text-lg">
          Login
        </button>
        <p>
          Not Registered Yet?{""}{" "}
          <Link to={"/user-registration"} className="text-primary underline">
            Create an Account
          </Link>
        </p>
      </form>
    </div>
  );
};

export default UserLogin;

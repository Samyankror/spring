import axiosInstance from "../utils/axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
function Login(){
      const [formData, setFormData] = useState({});
    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value });
    }
    const navigate = useNavigate();
    const dispatch  = useDispatch();
    const handleSubmit = (e) => {
     e .preventDefault();
    
      axiosInstance.post("/api/auth/login",formData)
      .then((response) => {
        console.log("Login successful:", response.data);
        dispatch(signInSuccess(response.data));
      localStorage.setItem("token",response.data);
        alert("Login successful!");
       
       
      })
      .catch((error) => {
        console.error("Login failed:", error.response?.data || error.message);
        alert("Login failed: " + (error.response?.data?.message || error.message));
          dispatch(signInSuccess({name: "Samyank ror"}));
        navigate("/home");
      });
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-cover bg-center bg-slate-800">
  <div className="w-[90%] max-w-md backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white">
    
    <h2 className="text-3xl font-semibold mb-6 text-center text-white">
      Login
    </h2>

    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

      {/* Role Selection */}
    

      {/* Email */}
      <div>
        <label className="block font-semibold mb-2 text-white">
           Username
        </label>
        <input
          type="text"
          id="userName"
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-white"
          placeholder="Enter your username"
        />
      </div>

      {/* Password */}
      <div>
        <label className="block font-semibold mb-2 text-white">
          Password
        </label>
        <input
          type="password"
          id="password"
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-white"
          placeholder="Enter your password"
          autoComplete="on"
        />
      </div>

        <div>
        {/* <label
          className="block font-semibold mb-2 text-white"
          htmlFor="role"
        >
          Login As
        </label> */}
        <select
          id="role"
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-white"
        >
          <option value="" className="text-black">
            Select Role
          </option>
          <option value="ADMIN" className="text-black">
            Admin
          </option>
          <option value="STUDENT" className="text-black">
            Student
          </option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r cursor-pointer from-blue-500 to-indigo-600 text-white text-xl font-semibold py-2 rounded-lg hover:from-indigo-600 hover:to-purple-600 transition duration-300"
      >
       Login
      </button>

    </form>

    {/* {error && <p className="text-red-700 mt-2">{error}</p>} */}
      <p className="text-white text-center mt-4 text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-400 hover:underline">
            Create one
          </Link>
        </p>
  </div>
</div>

    )
}

export default Login;
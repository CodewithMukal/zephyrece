import { useEffect, useState } from "react";
import bg from "./assets/bg.jpg";
import { ToastContainer, toast } from "react-toastify";

const link = "http://localhost:3000";

function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const attempted = Number(localStorage.getItem("attempted"));
    if (attempted) {
      const interval = setInterval(() => {
        setTimeLeft(
          Math.floor((1 * 60 * 60 * 1000 - (Date.now() - attempted)) / 1000)
        );
      }, 1000);
      return () => clearInterval(interval);
    }
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    console.log(name, email, code);
    const res = await fetch(`${link}/api`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, code }),
    });

    const data = await res.json();
    if (Date.now() - localStorage.getItem("attempted") < 1 * 60 * 60 * 1000) {
      toast.error("You have already attempted!");
      setLoading(false);
      return;
    }
    if (data.status === "success") {
      toast.success(data.message);
      localStorage.setItem("winner", true);
      window.location.href = "/winner";
    } else {
      toast.error(data.message);
      if (data.correct === false) {
        localStorage.setItem("attempted", Date.now());
      }
    }
    setLoading(false);
  };

  return (
    <div
      style={{ backgroundImage: `url(${bg})` }}
      className={`bg-cover font-[Inter] bg-center min-h-screen`}
    >
      <ToastContainer />
      <h1 className="font-bold font-[Orbitron] py-10 text-amber-500 text-center text-2xl">
        Welcome to ZEPHYR 2025 Time Traveller
      </h1>
      <div className="bg-white/20 border py-10 text-white border-amber-600 backdrop-blur-3xl max-w-[600px] w-[90%] p-4 mx-auto rounded-lg shadow-md flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="font-bold">
            Name
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            id="name"
            type="text"
            className="border-white/50 border p-1 px-2 rounded-sm focus:outline-0 focus:border-amber-600 transition-all focus:placeholder:text-amber-600/60"
            placeholder="Enter your name"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="font-bold">
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            id="name"
            type="email"
            className="border-white/50 border p-1 px-2 rounded-sm focus:outline-0 focus:border-amber-600 transition-all focus:placeholder:text-amber-600/60"
            placeholder="xyz@ec.25@nitj.ac.in"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="font-bold">
            Enter Code
          </label>
          <input
            onChange={(e) => setCode(e.target.value)}
            id="name"
            type="text"
            maxLength={6}
            className="border-white/50 border p-1 px-2 rounded-sm focus:outline-0 focus:border-amber-600 transition-all focus:placeholder:text-amber-600/60"
            placeholder="XXXXXX"
          />
        </div>
        {!isLoading ? (
          <button
            onClick={() => handleSubmit()}
            className="font-bold bg-amber-600 py-2 hover:bg-amber-700 transition-all"
          >
            {localStorage.getItem("attempted") &&
            Date.now() - localStorage.getItem("attempted") < 1 * 60 * 60 * 1000
              ? `Cool Down over in : ${timeLeft} seconds`
              : "Submit"}
          </button>
        ) : (
          <button className="font-bold flex justify-center items-center border-amber-600 bg-black/30 border-2 py-2 transition-all">
            <div className="w-5 h-5 animate-spin rounded-full border-amber-600 border-t-2"></div>
          </button>
        )}
      </div>
    </div>
  );
}

export default App;

import { useState } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [inputId, setInputId] = useState("");
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="border border-slate-600 rounded-xl w-96 flex flex-col items-center justify-center gap-y-8 h-80">
        <div className="font-bold text-slate-400 text-xl">Search Github ID</div>
        <div>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2111/2111425.png"
            alt=""
            className="w-32 object-contain"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="search id"
            value={inputId}
            className="border-2 p-1 pl-2 border-slate-300 rounded-md focus:outline-none focus:border-sky-500 "
            onChange={(e) => setInputId(e.target.value)}
          />
          <Link to={`/profile/${inputId}`}>
            <button className="ml-5 bg-slate-300 p-1 w-24 h-9 rounded-md">
              Search
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default HomePage;

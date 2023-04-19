import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function Followers() {
  const { id } = useParams();

  const [followers, setFollowers] = useState([]);
  const [details, setDetails] = useState([]);

  useEffect(() => {
    fetch(`https://api.github.com/users/${id}/followers`)
      .then((response) => response.json())
      .then((data) => {
        setFollowers(data);
      });
    fetch(`https://api.github.com/users/${id}`)
      .then((data) => data.json())
      .then((data) => setDetails(data));
  }, [id]);

  return (
    <div className="p-5 flex">
      <div className="flex flex-col gap-5 w-96 ml-5 mr-5">
        <div>
          <img
            src={details.avatar_url}
            alt=""
            className="w-80 object-contain rounded-full"
          />
        </div>
        <div className="flex justify-between ">
          <div>
            <div className="font-semibold text-2xl">{details.name}</div>
            <div className="font-normal text-slate-400 text-2xl">
              {details.login}
            </div>
          </div>
          <div className="font-light mr-5">{details.location}</div>
        </div>
        <div className="text-lg">{details.bio}</div>
        <div className="flex gap-x-8">
          <div>
            <Link to={`/followers/${id}`}>{details.followers} - Followers</Link>
          </div>
          <div>-</div>
          <div>
            <Link to={`/following/${id}`}>{details.following} - Following</Link>
          </div>
        </div>
      </div>
      <div className="w-5/6">
        <div className="flex justify-between mr-16">
          <div className="text-2xl font-normal text-slate-400">
            {details.name} Followers
          </div>
          <div>
            <Link to={"/"}>
              <button className="text-xl font-semibold bg-slate-300 w-32 p-2 rounded-2xl">
                HomePage
              </button>
            </Link>
          </div>
        </div>
        <div className="mt-8">
          {followers.map((item, index) => (
            <div
              key={index}
              className="h-20 pl-5 pr-20 border rounded-xl flex flex-col mb-6"
            >
              <div className="flex justify-between">
                <div className="flex">
                  <div className="flex justify-center">
                    <img
                      src={item.avatar_url}
                      alt=""
                      className="w-20 h-25 object-contain rounded-full"
                    />
                  </div>
                  <div className="flex justify-center items-center ml-10 text-xl">
                    {item.login}
                  </div>
                </div>
                <div>
                  <Link to={`/profile/${item.login}`}>
                    <button className="ml-5 mt-5 bg-slate-300 p-1 w-24 h-9 rounded-md">
                      View More
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Followers;

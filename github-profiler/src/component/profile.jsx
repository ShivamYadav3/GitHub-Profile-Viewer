import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();
  const [details, setDetails] = useState([]);
  const [repo, setRepo] = useState([]);

  useEffect(() => {
    fetch(`https://api.github.com/users/${id}`)
      .then((data) => data.json())
      .then((data) => setDetails(data));
    fetch(`https://api.github.com/users/${id}/repos`)
      .then((data) => data.json())
      .then((data) => setRepo(data));
  }, [id]);

  return (
    <div className="flex p-5">
      <div className="flex flex-col gap-5 w-80 ml-5 mr-5">
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
        {/* <div className="ml-20 mt-5"></div> */}
      </div>
      <div>
        <div className="ml-10">
          <div className="flex justify-between mr-16">
            <div className="text-2xl font-normal text-slate-400">
              {details.name} Repositories
            </div>
            <div>
              <Link to={"/"}>
                <button className="text-xl font-semibold bg-slate-300 w-32 p-2 rounded-2xl">
                  HomePage
                </button>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5 mt-8">
            {repo.map((item, index) => {
              return (
                <div key={index} className="border-2 rounded-xl p-5 ">
                  <Link
                    to={`/reposDetail/${id}/${item.name}`}
                    className="grid grid-cols-5 gap-y-10"
                  >
                    <div className="col-span-4">Repo Name : {item.name}</div>
                    <div>Public</div>
                    <div>{item.language}</div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;

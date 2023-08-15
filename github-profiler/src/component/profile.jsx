import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ThemeSwitcher from "./themeswitcher";

const Profile = () => {
  const [details, setDetails] = useState({});
  const { id } = useParams();
  const [repo, setRepo] = useState([]);
  const [hasError, setHasError] = useState(false);

  const loadUserDetails = async () => {
    const result = await fetch(`https://api.github.com/users/${id}`);
    const parsedResponse = await result.json();

    if (!parsedResponse.id) {
      setHasError(true);
      return;
    }

    setDetails(parsedResponse);
    setHasError(false);
  };

  const loadRepoList = async () => {
    const result = await fetch(`https://api.github.com/users/${id}/repos`);
    const parsedResponse = await result.json();
    console.log({ parsedResponse });
    if (!parsedResponse && Array.isArray(parsedResponse)) {
      setHasError(true);
      return;
    }

    setRepo(parsedResponse);
    setHasError(false);
  };

  useEffect(() => {
    loadUserDetails();
    loadRepoList();
  }, [id]);
  console.log({ details, repo, hasError });
  if (hasError) {
    return <h1>Please Enter a valid User id</h1>;
  }

  if (!details.id) {
    return <p>Please wait loading </p>;
  }

  return (
    <div className="flex p-5 dark:bg-black dark:text-white">
      {/* <div className="fixed top-4 right-14">
        <ThemeSwitcher />
      </div> */}
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
            <div className="text-2xl font-normal text-slate-400 w-96">
              {details.name} Repositories
            </div>
            <div>
              <Link to={"/"}>
                <button className="text-xl font-semibold bg-slate-300 w-32 p-2 rounded-2xl dark:text-black">
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

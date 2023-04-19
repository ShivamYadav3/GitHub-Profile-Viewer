import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function RepoDetail() {
  const { id, Detail } = useParams();

  const [reposDetail, setReposDetail] = useState([]);
  useEffect(() => {
    if (!id) {
      return;
    }

    fetch(`https://api.github.com/repos/${id}/${Detail}`)
      .then((data) => data.json())
      .then((data) => setReposDetail(data));
  }, [id, Detail]);

  return (
    <div className="flex justify-center items-center h-screen gap-y-5 border">
      <div className="flex flex-col gap-5 text-xl border-2 p-4 rounded-2xl">
        <div>
          <h2 className="font-bold text-2xl">Repository Details</h2>
        </div>
        <div className="">
          <div className="flex flex-col gap-y-3">
            <div>
              Repository Name :
              <span className="font-semibold ml-1">{reposDetail.name}</span>
            </div>
            <div>
              Repository Default Branch :
              <span className="font-semibold ml-1">
                {reposDetail.default_branch}
              </span>
            </div>
            <div>
              Date Created :
              <span className="font-semibold ml-1">
                {reposDetail.created_at}
              </span>
            </div>
            <div>
              Repository Id :
              <span className="font-semibold">{reposDetail.id}</span>
            </div>
          </div>
        </div>
        <div className="bg-slate-300 inline-block w-32 flex justify-center rounded-lg p-1 ml-20 mt-10">
          <Link to={`/profile/${id}`}>
            <button className="text-2xl font-semibold">Profile</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RepoDetail;

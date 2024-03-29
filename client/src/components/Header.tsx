import { Link, useNavigate } from "react-router-dom";

import { CiSearch } from "react-icons/ci";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function Header() {
  const { currentUser } = useSelector((state: any) => state.user);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const handleSearchSubmit = (e: any) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", search);
    navigate(`/search?${urlParams.toString()}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get("searchTerm");
    if (searchTerm) {
      setSearch(searchTerm);
    }
    if (!searchTerm) {
      setSearch("");
    }
  }, [location.search]);
  return (
    <>
      <header className="p-2 bg-slate-300 shadow-md">
        <div className="flex items-center justify-between max-w-6xl mx-auto p-2 ">
          <Link to="/">
            <h1 className="flex flex-wrap font-bold text-xl sm:text-2xl font-sans">
              <span className="text-gray-500">JOEY</span>
              <span className="text-gray-800">ESTATE</span>
            </h1>
          </Link>
          <form className="flex bg-slate-100 items-center p-2 rounded-lg">
            <input
              className=" w-28 sm:w-64 bg-transparent focus:outline-none"
              type="text"
              placeholder="Search...."
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
            <button onClick={handleSearchSubmit}>
              <CiSearch className="text-xl cursor-pointer" />
            </button>
          </form>
          <ul className="flex sm:gap-10">
            <Link to="/">
              <li className="hidden sm:inline hover:text-blue-600">Home</li>
            </Link>
            <Link to="/about">
              <li className="hidden sm:inline hover:text-blue-600">About</li>
            </Link>
            <Link to="/profile">
              {currentUser ? (
                <img
                  src={currentUser.avatar}
                  alt="profile"
                  className="h-7 w-7 object-cover rounded-full"
                />
              ) : (
                <li className=" text-slate-700 hover:underline"> Sign in</li>
              )}
            </Link>
          </ul>
        </div>
      </header>
    </>
  );
}

export default Header;

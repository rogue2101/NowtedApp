import { useApi } from "../Context/APIContext";
import FoldersComponent from "./FoldersComponent";
import RecentNoteComponent from "./RecentNoteComponent";
import { FavoritesComponent } from "./FavoritesComponent";
import { ArchivedComponent } from "./ArchivedComponent";
import NewNoteComponent from "./NewNoteComponent";
import { TrashComponent } from "./TrashComponent";

const SideBarView = () => {
  const { searchText, search, setSearchText, setSearch } = useApi();

  return (
    <nav className="w-[20%] bg-transparent flex flex-col pt-6 gap-10 h-screen">
      <div className="flex justify-between pl-4 pr-4">
        <img
          className="cursor-auto"
          src="/public/assets/Nowted-Logo.svg"
          alt="Nowted.svg"
        />
        <button
          className="cursor-pointer"
          onClick={() => setSearch((prev) => !prev)}
        >
          {search ? (
            <img src="/public/assets/Search-Highlighted.svg" alt="search" />
          ) : (
            <img src="/public/assets/Search-Icon.svg" alt="search" />
          )}
        </button>
      </div>
      {search ? (
        <div className="flex items-center justify-center pl-4 pr-4">
          <img
            className="p-3 bg-[#FFFFFF0D] h-full rounded-s-md"
            src="/public/assets/Search-Input.svg"
            alt="..."
          />
          <input
            className="w-[90%] h-full outline-none text-white rounded-e-md bg-[#FFFFFF0D] p-3"
            type="text"
            placeholder="SearchNote"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      ) : (
        <NewNoteComponent />
      )}

      <RecentNoteComponent />
      <FoldersComponent />
      <div className="flex flex-col gap-2">
        <h1 className="text-[#FFFFFF99] inline pl-4">More</h1>
        <div className="flex flex-col gap-1">
          <FavoritesComponent />
          <TrashComponent />
          <ArchivedComponent />
        </div>
      </div>
    </nav>
  );
};

export default SideBarView;

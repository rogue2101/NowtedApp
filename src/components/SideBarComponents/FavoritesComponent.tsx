import { useNavigate } from "react-router-dom";
import { useApi } from "../Context/APIContext";

export const FavoritesComponent = () => {
  const { setCurrentFolderName } = useApi();
  const navigate = useNavigate();

  function favoriteButtonHandler() {
    setCurrentFolderName("Favorite Notes");
    navigate("/favorites/notes");
  }
  return (
    <button
      onClick={() => favoriteButtonHandler()}
      className="cursor-pointer hover:bg-[#FFFFFF08]"
    >
      <div className="flex items-center gap-4 pl-4 pr-4 pt-2 pb-2">
        <img src="/public/assets/Favourites-Icon.svg" alt="favourites" />
        <h1 className="text-[#FFFFFF99]">Favorites</h1>
      </div>
    </button>
  );
};

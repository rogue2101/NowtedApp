import { useNavigate } from "react-router-dom";
import { useApi } from "../Context/APIContext";

export const TrashComponent = () => {
  const { setCurrentFolderName } = useApi();
  const navigate = useNavigate();

  function trashButtonHandler() {
    setCurrentFolderName("Trashed Notes");
    navigate("/trash/notes");
  }
  return (
    <button
      onClick={() => trashButtonHandler()}
      className="cursor-pointer hover:bg-[#FFFFFF08]"
    >
      <div className="flex items-center gap-4 pl-4 pr-4 pt-2 pb-2">
        <img src="/public/assets/Trash-Icon.svg" alt="trash" />
        <h1 className="text-[#FFFFFF99]">Trash</h1>
      </div>
    </button>
  );
};

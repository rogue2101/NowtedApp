import { useNavigate } from "react-router-dom";
import { useApi } from "../Context/APIContext";

export const ArchivedComponent = () => {
  const { setCurrentFolderName } = useApi();

  const navigate = useNavigate();

  function archiveButtonHandler() {
    setCurrentFolderName("Archive Notes");
    navigate("/archive/notes");
  }
  return (
    <button
      onClick={() => archiveButtonHandler()}
      className="cursor-pointer hover:bg-[#FFFFFF08]"
    >
      <div className="flex items-center gap-4 pl-4 pr-4 pt-2 pb-2">
        <img src="/public/assets/Archive-Icon.svg" alt="archive" />
        <h1 className="text-[#FFFFFF99]">Archived Notes</h1>
      </div>
    </button>
  );
};

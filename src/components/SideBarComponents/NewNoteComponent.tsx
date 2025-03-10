import { useNavigate, useParams, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useApi } from "../Context/APIContext";

const NewNoteComponent = () => {
  const { createNewNote, getFolderNotes } = useApi();
  const navigate = useNavigate();
  const { folderid } = useParams();
  const location = useLocation();

  async function newNoteButtonHandler() {
    if (!location.pathname.includes("/folders/")) {
      toast.info("Please select a folder first");
      return;
    }

    const defaultNote = {
      folderId: folderid!,
      title: "Untitled Note",
      content: "Start writing here...",
      isFavorite: false,
      isArchived: false,
    };

    await createNewNote(defaultNote);

    const updatedNotes = await getFolderNotes(folderid!);
    if (updatedNotes) {
      navigate(`/folders/${folderid}/notes`, { replace: true });
    }
  }

  return (
    <div className="text-white flex items-center justify-center">
      <button
        className="flex items-center gap-2 justify-center bg-[#FFFFFF0D] w-[90%] h-10 rounded-sm cursor-pointer"
        onClick={newNoteButtonHandler}
      >
        <img src="/public/assets/Plus-Icon.svg" alt="add" />
        New Note
      </button>
    </div>
  );
};

export default NewNoteComponent;

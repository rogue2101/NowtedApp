import { useApi } from "../Context/APIContext";
import { ClipLoader } from "react-spinners";
import { RecentNotesPreview } from "../../Configurations/TypesConfigration";
import { useNavigate } from "react-router-dom";

const RecentNoteComponent = () => {
  const { recentNotes, notesLoading } = useApi();

  const navigate = useNavigate();

  function handleRecentNotesButton(recentNote: RecentNotesPreview) {
    navigate(`/recent/${recentNote.folderId}/notes/${recentNote.id}`);
  }

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-[#FFFFFF99] inline pl-4">Recents</h3>
      <div className="flex flex-col gap-1">
        {notesLoading ? (
          <div className="flex justify-center items-center h-full">
            <ClipLoader color="#ffffff" size={30} />
          </div>
        ) : (
          recentNotes.map((item) => {
            return (
              <button
                key={item.id}
                className={"cursor-pointer hover:bg-[#312EB5]"}
                onClick={() => handleRecentNotesButton(item)}
              >
                <div className="flex items-center gap-4 pl-4 pr-4 pt-2 pb-2">
                  <img src="/public/assets/Selected-Page-Icon.svg" alt="file" />
                  <h1 className="text-white">
                    {item.title.length > 30
                      ? item.title.slice(0, 30) + "..."
                      : item.title}
                  </h1>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};

export default RecentNoteComponent;

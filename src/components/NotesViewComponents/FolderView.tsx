import { useEffect, useState } from "react";
import { useApi } from "../Context/APIContext";
import { ClipLoader } from "react-spinners";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { NotesPreview } from "../../Configurations/TypesConfigration";

const FolderView = () => {
  const {
    searchText,
    notesLoading,
    currentFolderName,
    setCurrentFolderName,
    getFolderNotes,
    moreNotes,
  } = useApi();
  const [folderNotes, setFolderNotes] = useState<NotesPreview[]>([]);
  const [page, setPage] = useState<number>(1);
  const [currentNote, setCurrentNote] = useState<string>("");
  const { folderid, noteid } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchNotes = async () => {
      let notes: NotesPreview[] | undefined;
      setPage(1);

      if (location.pathname.startsWith("/favorites")) {
        setCurrentFolderName("Favorites");
        notes = await moreNotes({
          archived: false,
          favorite: true,
          deleted: false,
          page: 1,
        });
      } else if (location.pathname.startsWith("/archive")) {
        setCurrentFolderName("Archived Notes");
        notes = await moreNotes({
          archived: true,
          favorite: false,
          deleted: false,
          page: 1,
        });
      } else if (location.pathname.startsWith("/trash")) {
        setCurrentFolderName("Trashed Notes");
        notes = await moreNotes({
          archived: false,
          favorite: false,
          deleted: true,
          page: 1,
        });
      } else if (folderid) {
        notes = await getFolderNotes(folderid, 1, searchText);
      }

      if (notes) {
        setFolderNotes(notes);
      }
    };

    fetchNotes();
  }, [location.pathname, folderid, searchText, noteid]);

  useEffect(() => {
    if (noteid) {
      setCurrentNote(noteid);
    }
  }, [noteid]);

  function handleNotesOnClick(noteId: string) {
    setCurrentNote(noteId);
    const basePath = location.pathname.split("/notes")[0];
    navigate(`${basePath}/notes/${noteId}`);
  }

  async function loadMoreButtonHandler() {
    const nextPage = page + 1;
    setPage(nextPage);

    let newNotes: NotesPreview[] | undefined;

    if (location.pathname.startsWith("/favorites")) {
      newNotes = await moreNotes({
        archived: false,
        favorite: true,
        deleted: false,
        page: nextPage,
      });
    } else if (location.pathname.startsWith("/archive")) {
      newNotes = await moreNotes({
        archived: true,
        favorite: false,
        deleted: false,
        page: nextPage,
      });
    } else if (location.pathname.startsWith("/trash")) {
      newNotes = await moreNotes({
        archived: false,
        favorite: false,
        deleted: true,
        page: nextPage,
      });
    } else if (folderid) {
      newNotes = await getFolderNotes(folderid, nextPage, searchText);
    }

    if (newNotes) {
      setFolderNotes((prev) => [...prev, ...newNotes!]);
    }
  }

  return (
    <div className="bg-[#1C1C1C] w-[20%] flex flex-col p-6 pt-10 gap-10 overflow-y-scroll h-screen">
      <h1 className="text-white text-2xl font-semibold">
        {currentFolderName.length > 15
          ? currentFolderName.slice(0, 15) + "..."
          : currentFolderName}
      </h1>
      <div className="flex flex-col gap-4">
        {notesLoading ? (
          <div className="flex justify-center items-center h-full">
            <ClipLoader color="#ffffff" size={30} />
          </div>
        ) : (
          folderNotes?.map((item) => {
            const isHighlighted = currentNote === item.id;

            const date = new Date(Date.parse(item.createdAt));
            return (
              <div
                onClick={() => handleNotesOnClick(item.id)}
                key={item.id}
                className={`${
                  isHighlighted
                    ? "bg-[#FFFFFF1A]"
                    : "bg-[#FFFFFF08] hover:bg-[#FFFFFF1A]"
                } pt-5 p-4 flex flex-col gap-3 cursor-pointer`}
              >
                <h1 className="text-white text-lg font-semibold">
                  {item.title.length > 30
                    ? item.title.slice(0, 30) + "..."
                    : item.title}
                </h1>
                <div className="flex gap-2 justify-between">
                  <p className="text-[#FFFFFF66]">
                    {date.toLocaleDateString("en-GB")}
                  </p>
                  <p className="text-[#FFFFFF99]">
                    {item.preview.slice(0, 20) + "....."}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
      {(folderNotes && folderNotes.length < page * 10) || (
        <div className="flex items-center justify-center">
          <button
            className="bg-[#FFFFFF08] text-white p-2 pl-4 pr-4 rounded-md cursor-pointer"
            onClick={() => loadMoreButtonHandler()}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default FolderView;

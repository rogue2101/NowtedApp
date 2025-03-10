import { useEffect, useRef, useState } from "react";
import { useApi } from "../Context/APIContext";
import { Note } from "../../configurations/TypesConfigration";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

type NotesViewProps = {
  note: Note;
};

const NotesView: React.FC<NotesViewProps> = ({ note }) => {
  const {
    setNotesFavourites,
    setNotesArchived,
    updateNoteTitle,
    updateNoteContent,
    deleteNote,
    noteLoading,
  } = useApi();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [favorite, setFavorite] = useState<boolean>(note.isFavorite);
  const [archive, setArchive] = useState<boolean>(note.isArchived);
  const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false);
  const [isEditingContent, setIsEditingContent] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>(note.title);
  const [editedContent, setEditedContent] = useState<string>(note.content);

  const navigate = useNavigate();

  const date = new Date(Date.parse(note.createdAt));

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setNotesFavourites(favorite, note.id);
    setNotesArchived(archive, note.id);
    setIsOpen(false);
  }, [favorite, archive]);

  function onDeleteHandler(noteId: string) {
    deleteNote(noteId);
    navigate(`/folders/${note.folderId}/notes/${noteId}`);
  }

  const handleTitleSubmit = async () => {
    const updatedNote = await updateNoteTitle(note.id, editedTitle);
    if (updatedNote) {
      setIsEditingTitle(false);
      note.title = updatedNote.title;
      navigate(`/folders/${note.folderId}/notes/${note.id}`, {
        replace: true,
      });
    }
  };

  const handleContentSubmit = async () => {
    const updatedNote = await updateNoteContent(note.id, editedContent);
    if (updatedNote) {
      setIsEditingContent(false);
      note.content = updatedNote.content;
      navigate(`/folders/${note.folderId}/notes/${note.id}`, {
        replace: true,
      });
    }
  };

  return (
    <>
      {noteLoading ? (
        <div className="flex justify-center items-center h-full">
          <ClipLoader color="#ffffff" size={30} />
        </div>
      ) : (
        <div className="flex flex-col gap-8 w-full">
          <div className="flex items-center justify-between relative">
            {isEditingTitle ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="text-white text-3xl font-semibold bg-transparent outline-none border-b border-white"
                />
                <button
                  onClick={handleTitleSubmit}
                  className="bg-white text-black w-20 rounded text-lg"
                >
                  Save
                </button>
              </div>
            ) : (
              <h1
                className="text-white text-3xl font-semibold cursor-default"
                onDoubleClick={() => setIsEditingTitle(true)}
              >
                {note.title.length > 30
                  ? note.title.slice(0, 30) + "..."
                  : note.title}
              </h1>
            )}
            <div className="relative" ref={dropdownRef}>
              <img
                className="cursor-pointer"
                src="/public/assets/Notes-Dropdown.svg"
                alt="menu"
                onClick={() => setIsOpen(!isOpen)}
              />

              {isOpen && (
                <div className="absolute right-0 mt-2 w-70 bg-[#333333] rounded-md shadow-lg p-2">
                  <ul className="py-1 text-white">
                    <li className="px-4 py-2">
                      <button
                        onClick={() => setFavorite((prev) => !prev)}
                        className="flex gap-3 cursor-pointer"
                      >
                        <img
                          src="/public/assets/Favourites-Bright-Icon.svg"
                          alt="favourites"
                        />
                        {note.isFavorite
                          ? "Remove from Favorites"
                          : "Add to Favorites"}
                      </button>
                    </li>
                    <li className="px-4 py-2 pb-5">
                      <button
                        onClick={() => setArchive((prev) => !prev)}
                        className="flex gap-3 cursor-pointer"
                      >
                        <img
                          src="/public/assets/Archive-Bright-Icon.svg"
                          alt="archive"
                        />{" "}
                        {archive ? "Remove from Archive" : "Archive"}
                      </button>
                    </li>
                    <li className="px-4 py-2 border-t-2 border-[#FFFFFF0D] gap-3"></li>
                    <li className="px-4 py-2 ">
                      <button
                        onClick={() => onDeleteHandler(note.id)}
                        className="flex gap-3 cursor-pointer"
                      >
                        <img
                          src="/public/assets/Trash-Bright-Icon.svg"
                          alt="delete"
                        />{" "}
                        Delete
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div>
            <div className="flex gap-5 border-b-2 border-[#FFFFFF1A] pl-0 p-3">
              <img src="/public/assets/Calender-Icon.svg" alt="calender" />
              <p className="text-[#FFFFFF99] pr-10 cursor-default">Date</p>
              <p className="text-white cursor-default">
                {date.toLocaleDateString("en-GB")}
              </p>
            </div>
            <div className="flex gap-5 pl-0 p-3">
              <img src="/public/assets/Folder-Icon.svg" alt="calender" />
              <p className="text-[#FFFFFF99] pr-10 cursor-default">Folder</p>
              <p className="text-white cursor-default">{note.folder.name}</p>
            </div>
          </div>
          <div>
            {isEditingContent ? (
              <div className="flex flex-col gap-10 pb-14">
                <textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className="text-white text-lg outline-none bg-transparent"
                  rows={25}
                />
                <button
                  onClick={handleContentSubmit}
                  className="text-2xl bg-white pr-4 pl-4 rounded-md cursor-pointer"
                >
                  Save
                </button>
              </div>
            ) : (
              <div
                className="text-white text-lg cursor-default pb-14"
                onDoubleClick={() => setIsEditingContent(true)}
              >
                {note.content.split("\n").map((paragraph, index) => (
                  <p key={index} className="text-white text-lg">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default NotesView;

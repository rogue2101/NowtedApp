import { useNavigate, useParams } from "react-router-dom";
import { useApi } from "../Context/APIContext";
import { ClipLoader } from "react-spinners";
import { useEffect, useState } from "react";
import { Folder } from "../../Configurations/TypesConfigration";

const FoldersComponent = () => {
  const {
    folders,
    foldersLoading,
    setCurrentFolderName,
    addNewFolder,
    deleteFolder,
    renameFolder,
  } = useApi();
  const navigate = useNavigate();
  const { folderid } = useParams();
  const [folderButton, setFolderButton] = useState(false);
  const [newFolder, setNewFolder] = useState("New Folder");
  const [currentFolder, setCurrentFolder] = useState<string>(folderid || "");
  const [editingFolderId, setEditingFolderId] = useState<string | null>(null);
  const [editingFolderName, setEditingFolderName] = useState("");

  useEffect(() => {
    if (folders.length > 0) {
      if (location.pathname === "/") {
        setCurrentFolder(folders[0].id);
        setCurrentFolderName(folders[0].name);
        navigate(`/folders/${folders[0].id}/notes`, { replace: true });
      } else if (folderid && folders.some((folder) => folder.id === folderid)) {
        setCurrentFolder(folderid);
        setCurrentFolderName(
          folders.find((folder) => folder.id === folderid)?.name || "Folder"
        );
      }
    }
  }, [folders, folderid]);

  function handleFoldersButton(folder: Folder) {
    setCurrentFolderName(folder.name);
    setCurrentFolder(folder.id);
    navigate(`/folders/${folder.id}/notes`);
  }

  async function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const createdFolder = await addNewFolder(newFolder);

    if (createdFolder) {
      setCurrentFolder(createdFolder.id);
      setCurrentFolderName(createdFolder.name);
      navigate(`/folders/${createdFolder.id}/notes`);
    }

    setNewFolder("New Folder");
    setFolderButton(false);
  }

  async function onFolderDeleteHandler(folderId: string) {
    const folder = await deleteFolder(folderId);
    if (folder) {
      setCurrentFolder(folder.id);
      setCurrentFolderName(folder.name);
    }
  }

  function onDoubleClickHandler(folder: Folder) {
    setEditingFolderId(folder.id);
    setEditingFolderName(folder.name);
  }

  async function handleRenameSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (editingFolderId) {
      const renamedFolder = await renameFolder(
        editingFolderId,
        editingFolderName
      );
      if (renamedFolder) {
        setCurrentFolderName(editingFolderName);
        navigate(`/folders/${editingFolderId}/notes`);
        setEditingFolderId(null);
      }
    }
  }

  return (
    <div className="flex-1 flex-col gap-2">
      <div className="flex pl-4 pr-4 justify-between items-center">
        <h1 className="text-[#FFFFFF99]">Folders</h1>
        <img
          onClick={() => setFolderButton((prev) => !prev)}
          src="/public/assets/Add-Folder-Icon.svg"
          alt=""
        />
      </div>
      <div className="flex flex-col gap-1 max-h-50 overflow-y-scroll">
        {folderButton && (
          <form
            onSubmit={handleOnSubmit}
            className="flex items-center gap-4 pl-4 pr-4 pt-2 pb-2"
          >
            <img src="/public/assets/Folder-Icon.svg" alt="folder" />
            <input
              type="text"
              className="text-[#FFFFFF99] bg-transparent outline-none appearance-none border-b border-[#FFFFFF99]"
              value={newFolder}
              onChange={(e) => setNewFolder(e.target.value)}
            />
          </form>
        )}
        {foldersLoading ? (
          <div className="flex justify-center items-center h-full">
            <ClipLoader color="#ffffff" size={30} />
          </div>
        ) : (
          folders.map((item) => {
            const isHighlighted = currentFolder === item.id;
            return (
              <button
                key={item.id}
                className={`cursor-auto ${
                  isHighlighted ? "bg-[#FFFFFF08]" : "hover:bg-[#FFFFFF08]"
                }`}
                onClick={() => handleFoldersButton(item)}
              >
                <div className="flex items-center justify-between pl-4 pr-4 pt-2 pb-2 cursor-pointer">
                  {editingFolderId === item.id ? (
                    <form onSubmit={handleRenameSubmit} className="flex gap-4">
                      <img src="/public/assets/Folder-Icon.svg" alt="folder" />
                      <input
                        type="text"
                        className="text-white bg-transparent outline-none appearance-none border-b border-[#FFFFFF99]"
                        value={editingFolderName}
                        onChange={(e) => setEditingFolderName(e.target.value)}
                        autoFocus
                      />
                    </form>
                  ) : (
                    <div
                      className="flex gap-4"
                      onDoubleClick={() => onDoubleClickHandler(item)}
                    >
                      <img
                        src={
                          isHighlighted
                            ? "/public/assets/Open-Folder-Icon.svg"
                            : "/public/assets/Folder-Icon.svg"
                        }
                        alt="folder"
                      />
                      <h1
                        className={
                          isHighlighted ? "text-white" : "text-[#FFFFFF99]"
                        }
                      >
                        {item.name.length > 40
                          ? item.name.slice(0, 40) + "..."
                          : item.name}
                      </h1>
                    </div>
                  )}
                  <img
                    className="cursor-pointer"
                    onClick={() => onFolderDeleteHandler(item.id)}
                    src="/public/assets/Trash-Icon.svg"
                    alt="..."
                  />
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};
export default FoldersComponent;

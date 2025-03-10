import { createContext, useContext, useEffect, useState } from "react";
import {
  Folder,
  NotesPreview,
  Note,
  ApiContextType,
} from "../../configurations/TypesConfigration";
import AxiosApi from "../../AxiosApiInstance";
import { toast } from "react-toastify";

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [recentNotes, setRecentNotes] = useState<NotesPreview[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [search, setSearch] = useState<boolean>(false);
  const [foldersLoading, setFoldersLoading] = useState(true);
  const [notesLoading, setNotesLoading] = useState(false);
  const [noteLoading, setNoteLoading] = useState(false);
  const [currentFolderName, setCurrentFolderName] = useState<string>("");

  useEffect(() => {
    setFoldersLoading(true);
    AxiosApi.get("/folders")
      .then((response) => {
        const foldersdata: Folder[] = response.data.folders;
        setFolders(foldersdata);
      })
      .catch((error) => {
        toast.error("Failed to fetch folders.", error);
      })
      .finally(() => setFoldersLoading(false));

    setNotesLoading(true);
    AxiosApi.get("/notes/recent")
      .then((response) => {
        const recentNotesData: NotesPreview[] = response.data.recentNotes;
        setRecentNotes(recentNotesData);
      })
      .catch((error) => {
        toast.error("Failed to fetch recent notes.", error);
      })
      .finally(() => setNotesLoading(false));
  }, []);

  const addNewFolder = async (folderName: string) => {
    setFoldersLoading(true);
    try {
      await AxiosApi.post("/folders", { name: folderName });
      const response = await AxiosApi.get("/folders");
      const foldersdata: Folder[] = response.data.folders;
      setFolders(foldersdata);
      return folders[0];
    } catch (error) {
      toast.error("Failed to add folder.");
    } finally {
      setFoldersLoading(false);
    }
  };

  const deleteFolder = async (folderId: string) => {
    setFoldersLoading(true);
    try {
      await AxiosApi.delete(`/folders/${folderId}`);
      const response = await AxiosApi.get("/folders");
      const foldersdata: Folder[] = response.data.folders;
      setFolders(foldersdata);
      return folders[0];
    } catch (error) {
      toast.error("Failed to delete folder.");
    } finally {
      setFoldersLoading(false);
    }
  };

  const renameFolder = async (folderId: string, newFolderName: string) => {
    setFoldersLoading(true);
    try {
      await AxiosApi.patch(`/folders/${folderId}`, { name: newFolderName });
      setFolders((prevFolders) =>
        prevFolders.map((folder) =>
          folder.id === folderId ? { ...folder, name: newFolderName } : folder
        )
      );
      return { id: folderId, name: newFolderName };
    } catch (error) {
      toast.error("Failed to rename folder.");
    } finally {
      setFoldersLoading(false);
    }
  };

  const getFolderNotes = async (
    folderId: string,
    page?: number,
    searchText?: string
  ) => {
    setNotesLoading(true);
    try {
      const response = await AxiosApi.get("/notes", {
        params: {
          archived: false,
          favorite: false,
          deleted: false,
          folderId: folderId,
          page: page,
          limit: 10,
          search: searchText,
        },
      });
      const notesData: NotesPreview[] = response.data.notes;
      return notesData || [];
    } catch (error) {
      toast.error("Unable to fetch notes.");
    } finally {
      setNotesLoading(false);
    }
  };

  const getSelectedNote = async (noteId: string) => {
    setNoteLoading(true);
    try {
      const response = await AxiosApi.get(`/notes/${noteId}`);
      const noteData: Note = response.data.note;
      return noteData;
    } catch (error) {
      toast.error("Unable to fetch note.");
    } finally {
      setNoteLoading(false);
    }
  };

  const createNewNote = async (newCreatedNote: {
    folderId: string;
    title: string;
    content: string;
    isFavorite: boolean;
    isArchived: boolean;
  }) => {
    try {
      await AxiosApi.post("/notes", newCreatedNote);
    } catch (error) {
      toast.error("Failed to create note.");
    }
  };
  const deleteNote = async (noteId: string) => {
    try {
      const response = await AxiosApi.delete(`/notes/${noteId}`);

      if (response.status !== 200) {
      }
    } catch (error) {
      toast.error("Failed to delete note.");
    }
  };
  const restoreNote = async (noteId: string) => {
    try {
      const response = await AxiosApi.post(`/notes/${noteId}/restore`);

      if (response.status !== 200) {
      }
    } catch (error) {
      toast.error("Failed to restore note.");
    }
  };

  const moreNotes = async (moreDetails: {
    archived: boolean;
    favorite: boolean;
    deleted: boolean;
    page: number;
  }) => {
    try {
      const response = await AxiosApi.get("/notes", {
        params: {
          archived: moreDetails.archived,
          favorite: moreDetails.favorite,
          deleted: moreDetails.deleted,
          folderId: null,
          page: moreDetails.page,
          limit: 10,
        },
      });
      const notesData: NotesPreview[] = response.data.notes;
      return notesData;
    } catch (error) {
      toast.error("Failed to fetch notes.");
    }
  };

  const setNotesFavourites = async (favorite: boolean, noteId: string) => {
    try {
      await AxiosApi.patch(`notes/${noteId}`, { isFavorite: favorite });
    } catch (error) {
      toast.error("Failed to set favorite.");
    }
  };

  const setNotesArchived = async (archive: boolean, noteId: string) => {
    try {
      await AxiosApi.patch(`notes/${noteId}`, { isArchived: archive });
    } catch (error) {
      toast.error("Failed to set archive.");
    }
  };

  const updateNoteTitle = async (noteId: string, title: string) => {
    try {
      await AxiosApi.patch(`notes/${noteId}`, { title });
      const updatedNote = await getSelectedNote(noteId);
      return updatedNote;
    } catch (error) {
      toast.error("Failed to update title.");
    }
  };

  const updateNoteContent = async (noteId: string, content: string) => {
    try {
      await AxiosApi.patch(`notes/${noteId}`, { content });
      const updatedNote = await getSelectedNote(noteId);
      return updatedNote;
    } catch (error) {
      toast.error("Failed to update content.");
    }
  };

  return (
    <ApiContext.Provider
      value={{
        folders,
        recentNotes,
        search,
        searchText,
        addNewFolder,
        renameFolder,
        getFolderNotes,
        getSelectedNote,
        createNewNote,
        deleteNote,
        restoreNote,
        moreNotes,
        setNotesFavourites,
        setNotesArchived,
        setSearch,
        setSearchText,
        foldersLoading,
        setFoldersLoading,
        notesLoading,
        setNotesLoading,
        noteLoading,
        setNoteLoading,
        updateNoteTitle,
        updateNoteContent,
        currentFolderName,
        setCurrentFolderName,
        deleteFolder,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApi must be used within an ApiProvider");
  }
  return context;
};

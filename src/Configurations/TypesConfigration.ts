export type Folder = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
};

export type NotesPreview = {
  id: string;
  folderId: string;
  title: string;
  isFavorite: boolean;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  preview: string;
  folder: Folder;
};

export type Note = {
  id: string;
  folderId: string;
  title: string;
  content: string;
  isFavorite: boolean;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  folder: Folder;
};

export interface ApiContextType {
  folders: Folder[];
  recentNotes: NotesPreview[];
  search: boolean;
  searchText: string;
  addNewFolder: (folderName: string) => Promise<Folder | undefined>;
  getFolderNotes: (
    folderId: string,
    page?: number,
    searchText?: string
  ) => Promise<NotesPreview[] | undefined>;
  getSelectedNote: (noteId: string) => Promise<Note | undefined>;
  createNewNote: (newCreatedNote: {
    folderId: string;
    title: string;
    content: string;
    isFavorite: boolean;
    isArchived: boolean;
  }) => Promise<void>;
  deleteNote: (noteId: string) => Promise<void>;
  restoreNote: (noteId: string) => Promise<void>;
  moreNotes: (moreDetails: {
    archived: boolean;
    favorite: boolean;
    deleted: boolean;
    page: number;
  }) => Promise<NotesPreview[] | undefined>;
  setNotesFavourites: (favorite: boolean, noteId: string) => Promise<void>;
  setNotesArchived: (archive: boolean, noteId: string) => Promise<void>;
  setSearch: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  foldersLoading: boolean;
  setFoldersLoading: React.Dispatch<React.SetStateAction<boolean>>;
  notesLoading: boolean;
  setNotesLoading: React.Dispatch<React.SetStateAction<boolean>>;
  noteLoading: boolean;
  setNoteLoading: React.Dispatch<React.SetStateAction<boolean>>;
  updateNoteTitle: (noteId: string, title: string) => Promise<Note | undefined>;
  updateNoteContent: (
    noteId: string,
    content: string
  ) => Promise<Note | undefined>;
  currentFolderName: string;
  setCurrentFolderName: React.Dispatch<React.SetStateAction<string>>;
  deleteFolder: (folderId: string) => Promise<Folder | undefined>;
  renameFolder: (
    folderId: string,
    newFolderName: string
  ) => Promise<
    | {
        id: string;
        name: string;
      }
    | undefined
  >;
}

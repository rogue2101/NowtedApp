import SideBarView from "./SideBarComponents/SideBarView";
import FolderView from "./NotesViewComponents/FolderView";
import DisplayNotes from "./NoteDisplayComponents/DisplayNotes";

const MainComponent = () => {
  return (
    <div className="bg-[#181818] flex h-screen">
      <SideBarView />
      <FolderView />
      <DisplayNotes />
    </div>
  );
};

export default MainComponent;

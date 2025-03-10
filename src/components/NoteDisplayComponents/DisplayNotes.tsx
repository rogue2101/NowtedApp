import { useParams } from "react-router-dom";
import { useApi } from "../Context/APIContext";
import { useEffect, useState } from "react";
import { Note } from "../../Configurations/TypesConfigration";
import NotesView from "./NotesView";
import NoNotesView from "./NoNotesView";
import DeletedNoteView from "./DeletedNoteView";

const DisplayNotes = () => {
  const { getSelectedNote } = useApi();
  const { noteid } = useParams<{ noteid: string }>();

  const [currentNote, setCurrentNote] = useState<Note | null>(null);

  useEffect(() => {
    const fetchNote = async () => {
      if (noteid) {
        const note = await getSelectedNote(noteid);
        if (note) {
          setCurrentNote(note);
        }
      }
    };
    fetchNote();
  }, [noteid]);

  return (
    <div className="w-[60%] bg-transparent flex pt-14 pb-14 p-12 justify-center overflow-y-scroll">
      {currentNote ? (
        currentNote.deletedAt ? (
          <DeletedNoteView note={currentNote} />
        ) : (
          <NotesView note={currentNote!} />
        )
      ) : (
        <NoNotesView />
      )}
    </div>
  );
};

export default DisplayNotes;

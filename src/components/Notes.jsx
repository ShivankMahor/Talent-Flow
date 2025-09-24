import { useState } from "react";
import { StickyNote, PlusCircle } from "lucide-react";
import Card from "./Card";
import Button from "./Button";
import { useLocalStorage } from "../hooks/useLocalStorage";
import SmallDetailItem from "./SmallDetailItem";

export default function Notes({candidateId}) {
    console.log(candidateId)
  const [notes, setNotes] = useLocalStorage(`notes-cId${candidateId}`,[]);
  const [newNote, setNewNote] = useState("");
  const [showInput, setShowInput] = useState(false);

  // hardcoded @mention suggestions
  const suggestions = ["@John", "@Jane", "@Alice", "@Bob"];

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    const note = {
      id: Date.now(),
      text: newNote.trim(),
      createdAt: new Date(),
    };
    setNotes([note, ...notes]);
    setNewNote("");
    setShowInput(false);
  };

  const handleSuggestionClick = (mention) => {
    setNewNote((prev) => (prev + " " + mention).trim());
  };

  return (
    <Card variant="inset">
      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <StickyNote size={18} /> Notes
      </h3>

      {/* <Card> */}
        {notes.length === 0 ? (
          <div className="text-[var(--color-text-muted)] text-sm">
            No notes yet.
          </div>
        ) : (
          <ul className="space-y-3">
            {notes.map((note) => (
              <li
                key={note.id}
              >
                <Card variant="default">
                  <p className="text-[var(--color-text)] mb-1">{note.text}</p>
                  <SmallDetailItem label={"Added on"} value={new Date(note.createdAt).toLocaleString()}/>

                </Card>
              </li>
            ))}
          </ul>
        )}

        {/* Add note input */}
        {showInput && (
          <div className="mt-3 space-y-2">
            <textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              rows={3}
              placeholder="Write a note... use @ to mention"
              className="w-full p-2 border border-[var(--color-border)] rounded-md 
                         bg-[var(--color-surface)] text-[var(--color-text)] text-sm"
            />
            {/* Suggestions */}
            <div className="flex flex-wrap gap-2">
              {suggestions.map((s, i) => (
                <span
                  key={i}
                  onClick={() => handleSuggestionClick(s)}
                  className="px-2 py-1 text-xs rounded-full cursor-pointer
                             bg-[var(--color-surface)] text-[var(--color-text-muted)]
                             hover:bg-[var(--color-accent)] hover:text-white transition border border-[var(--color-border)] shadow-2xs"
                >
                  {s}
                </span>
              ))}
            </div>
            <div className="flex justify-end gap-0">
              <Button variant="ghost" onClick={() => setShowInput(false)}>
                Cancel
              </Button>
              <Button variant="secondary" onClick={handleAddNote}>
                Save
              </Button>
            </div>
          </div>
        )}

        {/* Add note button */}
        {!showInput && (
          <div className="mt-3 flex justify-end">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShowInput(true)}
              className=""
            >
              <PlusCircle size={16} />
              Add Note
            </Button>
          </div>
        )}
      {/* </Card> */}
    </Card>
  );
}

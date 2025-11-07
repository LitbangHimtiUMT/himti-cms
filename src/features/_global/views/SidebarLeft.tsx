import { useSetAtom } from "jotai";
import { addElementAtom } from "../store";
import { nanoid } from "nanoid";

export const SidebarLeft = () => {
  const addElement = useSetAtom(addElementAtom);

  const add = (type: string) => {
    const base = { id: nanoid(), x: 60, y: 60, width: 120, height: 40 };
    if (type === "text") addElement({ ...base, type: "text", content: "Text" });
    else if (type === "box")
      addElement({ ...base, type: "box", backgroundColor: "#f3f4f6" });
    else if (type === "image")
      addElement({
        ...base,
        type: "image",
        src: "https://via.placeholder.com/100",
      });
    else if (type === "table")
      addElement({
        ...base,
        type: "table",
        rows: 2,
        cols: 3,
        headers: ["Column 1", "Column 2", "Column 3"],
        isDynamic: true,
      });
  };

  return (
    <div className="w-64 border-r bg-gray-50 p-3 space-y-3">
      <h2 className="font-semibold text-gray-700 text-lg">Elements</h2>
      <div className="grid grid-cols-2 gap-2">
        <button onClick={() => add("text")} className="tool-btn">
          Text
        </button>
        <button onClick={() => add("box")} className="tool-btn">
          Box
        </button>
        <button onClick={() => add("table")} className="tool-btn">
          Table
        </button>
        <button onClick={() => add("image")} className="tool-btn">
          Image
        </button>
      </div>
      <style>{`.tool-btn{background:white;border:1px solid #ddd;padding:8px;border-radius:6px;transition:all .15s}.tool-btn:hover{background:#f3f4f6}`}</style>
    </div>
  );
};

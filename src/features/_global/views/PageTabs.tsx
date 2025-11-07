import { useAtom } from "jotai";
import {
  pagesAtom,
  activePageIdAtom,
  addPageAtom,
} from "../store";

export const PageTabs = () => {
  const [pages] = useAtom(pagesAtom);
  const [activePageId, setActivePageId] = useAtom(activePageIdAtom);
  const [, addPage] = useAtom(addPageAtom);

  return (
    <div className="border-b bg-white flex items-center px-3 py-2 gap-2">
      {pages.map((p) => (
        <button
          key={p.id}
          onClick={() => setActivePageId(p.id)}
          className={`px-3 py-1 rounded ${
            activePageId === p.id ? "bg-blue-500 text-white" : "bg-gray-100"
          }`}
        >
          {p.name}
        </button>
      ))}
      <button onClick={() => addPage()} className="px-2 text-blue-600">
        ＋ Add Page
      </button>
    </div>
  );
};

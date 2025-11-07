import { useAtom } from "jotai";
import {
  selectedElementAtom,
  updateElementAtom,
  removeElementAtom,
} from "../store";

export const SidebarRight = () => {
  const [selected] = useAtom(selectedElementAtom);
  const [, update] = useAtom(updateElementAtom);
  const [, remove] = useAtom(removeElementAtom);

  if (!selected)
    return (
      <div className="w-72 border-l bg-gray-50 flex items-center justify-center text-gray-400">
        No element selected
      </div>
    );

  return (
    <div className="w-72 border-l bg-gray-50 p-3 space-y-3 overflow-y-auto">
      <h2 className="font-semibold text-gray-700 text-lg mb-2">Properties</h2>

      {selected.type === "text" && (
        <>
          <label>Font size</label>
          <input
            type="number"
            value={selected.fontSize || 12}
            onChange={(e) =>
              update({ id: selected.id, data: { fontSize: +e.target.value } })
            }
          />
          <label>Color</label>
          <input
            type="color"
            value={selected.color || "#000000"}
            onChange={(e) =>
              update({ id: selected.id, data: { color: e.target.value } })
            }
          />
        </>
      )}

      {selected.type === "table" && (
        <>
          <label>Headers</label>
          <input
            type="text"
            value={selected.headers.join(",")}
            onChange={(e) =>
              update({
                id: selected.id,
                data: { headers: e.target.value.split(",") },
              })
            }
          />
          <label>
            <input
              type="checkbox"
              checked={selected.isDynamic || false}
              onChange={(e) =>
                update({
                  id: selected.id,
                  data: { isDynamic: e.target.checked },
                })
              }
            />{" "}
            Dynamic Rows
          </label>
        </>
      )}

      <button
        onClick={() => remove(selected.id)}
        className="w-full mt-4 bg-red-500 text-white py-1 rounded"
      >
        Delete Element
      </button>
    </div>
  );
};

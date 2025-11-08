import { Rnd } from "react-rnd";
import { useAtom } from "jotai";
import { selectedIdAtom, updateElementAtom } from "../store";
import { snap } from "../hooks/useSnapGrid";
import { TemplateElement } from "../types";

export const ElementRenderer = ({ el }: { el: TemplateElement }) => {
  const [selectedId, setSelected] = useAtom(selectedIdAtom);
  const [, updateElement] = useAtom(updateElementAtom);

  return (
    <Rnd
      bounds="parent"
      size={{ width: el.width, height: el.height }}
      position={{ x: el.x, y: el.y }}
      disableDragging={el.fixed}
      enableResizing={!el.fixed}
      onDragStop={(_, d) =>
        updateElement({ id: el.id, data: { x: snap(d.x), y: snap(d.y) } })
      }
      onResizeStop={(___, __, ref, _, pos) =>
        updateElement({
          id: el.id,
          data: {
            width: snap(parseFloat(ref.style.width)),
            height: snap(parseFloat(ref.style.height)),
            x: snap(pos.x),
            y: snap(pos.y),
          },
        })
      }
      onClick={() => setSelected(el.id)}
      style={{
        border:
          selectedId === el.id ? "1.5px dashed #2563eb" : "1px solid #ccc",
        background: el.type === "box" ? el.backgroundColor : "transparent",
        opacity: el.opacity ?? 1,
      }}
    >
      {el.type === "text" && (
        <textarea
          className="w-full h-full bg-transparent border-none outline-none resize-none text-sm p-1"
          value={el.content}
          onChange={(e) =>
            updateElement({ id: el.id, data: { content: e.target.value } })
          }
        />
      )}
      {el.type === "table" && (
        <table className="border-collapse w-full h-full text-xs">
          <thead>
            <tr>
              {el.headers.map((h, i) => (
                <th
                  key={i}
                  className="border border-gray-400 bg-gray-100 p-1 cursor-text hover:bg-gray-200"
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) =>
                    updateElement({
                      id: el.id,
                      data: {
                        headers: el.headers.map((hh, idx) =>
                          idx === i ? e.currentTarget.textContent || "" : hh
                        ),
                      },
                    })
                  }
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: el.rows }).map((_, r) => (
              <tr key={r}>
                {Array.from({ length: el.cols }).map((_, c) => (
                  <td key={c} className="border border-gray-400 text-center">
                    {el.isDynamic ? `{{row[${c}]}}` : ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {el.type === "image" && (
        <img
          src={el.src}
          alt=""
          className="w-full h-full object-cover rounded"
        />
      )}
    </Rnd>
  );
};

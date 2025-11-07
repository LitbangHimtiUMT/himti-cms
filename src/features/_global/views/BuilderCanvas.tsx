import { useAtomValue } from "jotai";
import { activePageAtom } from "../store";
import { ElementRenderer } from "./RenderedElement";

export const BuilderCanvas = () => {
  const page = useAtomValue(activePageAtom);

  return (
    <div className="flex-1 flex justify-center items-center bg-gray-100 overflow-auto">
      <div
        className="relative border bg-white shadow w-[595px] h-[842px]"
        id={`canvas-${page?.id}`}
      >
        {page?.elements.map((el) => (
          <ElementRenderer key={el.id} el={el} />
        ))}
      </div>
    </div>
  );
};

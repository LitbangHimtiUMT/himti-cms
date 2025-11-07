import { useAtomValue } from "jotai";
import { pagesAtom } from "../store";
import { BuilderCanvas } from "./BuilderCanvas";
import { PageTabs } from "./PageTabs";
import { SidebarLeft } from "./SidebarLeft";
import { SidebarRight } from "./SidebarRight";

export const Playground = () => {
  const pages = useAtomValue(pagesAtom);

  const handleSave = () => {
    console.log("Template JSON:", JSON.stringify(pages, null, 2));
    alert("Template disimpan ke console (lihat DevTools)");
  };

  return (
    <div className="flex flex-col h-screen">
      <PageTabs />
      <div className="flex flex-1">
        <SidebarLeft />
        <BuilderCanvas />
        <SidebarRight />
      </div>
      <button
        onClick={handleSave}
        className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow"
      >
        💾 Save Template
      </button>
    </div>
  );
};

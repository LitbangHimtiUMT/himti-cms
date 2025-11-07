import { atom } from "jotai";
import { Page, TemplateElement } from "../types";

export const pagesAtom = atom<Page[]>([
  { id: "page-1", name: "Page 1", elements: [] },
]);
export const activePageIdAtom = atom("page-1");
export const selectedIdAtom = atom<string | null>(null);

// Derived atoms
export const activePageAtom = atom((get) => {
  const pages = get(pagesAtom);
  const activeId = get(activePageIdAtom);
  return pages.find((p) => p.id === activeId);
});

export const selectedElementAtom = atom((get) => {
  const page = get(activePageAtom);
  const id = get(selectedIdAtom);
  return page?.elements.find((el) => el.id === id) || null;
});

// Actions
export const addElementAtom = atom(
  null,
  (get, set, element: TemplateElement) => {
    const pages = get(pagesAtom);
    const activeId = get(activePageIdAtom);
    const newPages = pages.map((p) =>
      p.id === activeId ? { ...p, elements: [...p.elements, element] } : p
    );
    set(pagesAtom, newPages);
    set(selectedIdAtom, element.id);
  }
);

export const updateElementAtom = atom(
  null,
  (get, set, { id, data }: { id: string; data: Partial<TemplateElement> }) => {
    const pages = get(pagesAtom);
    const activeId = get(activePageIdAtom);
    const updated = pages.map((p) =>
      p.id === activeId
        ? {
            ...p,
            elements: p.elements.map((el) =>
              el.id === id ? { ...el, ...data } : el
            ),
          }
        : p
    );
    set(pagesAtom, updated as Page[]);
  }
);

export const removeElementAtom = atom(null, (get, set, id: string) => {
  const pages = get(pagesAtom);
  const activeId = get(activePageIdAtom);
  const updated = pages.map((p) =>
    p.id === activeId
      ? { ...p, elements: p.elements.filter((el) => el.id !== id) }
      : p
  );
  set(pagesAtom, updated);
  set(selectedIdAtom, null);
});

export const addPageAtom = atom(null, (get, set) => {
  const pages = get(pagesAtom);
  const newId = `page-${pages.length + 1}`;
  const newPage: Page = {
    id: newId,
    name: `Page ${pages.length + 1}`,
    elements: [],
  };
  set(pagesAtom, [...pages, newPage]);
  set(activePageIdAtom, newId);
});

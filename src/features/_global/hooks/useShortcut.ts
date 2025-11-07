import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { removeElementAtom } from "../store";

export function useShortcuts() {
  const remove = useSetAtom(removeElementAtom);

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (["Delete", "Backspace"].includes(e.key)) {
        e.preventDefault();
        remove("selected"); // implementasi lebih lanjut bisa deteksi selectedIdAtom
      }
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [remove]);
}

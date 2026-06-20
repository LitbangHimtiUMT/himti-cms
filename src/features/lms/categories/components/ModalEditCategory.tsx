import React, { useEffect, useState } from "react";
import { Button } from "../../../_global/components/Button";
import { Input } from "../../../_global/components/Input/InputV2";
import { useCategoryCreation } from "../hooks/useCategoryCreation";
import { CategoriesModel } from "../../../../core/model/categories";

interface ModalEditCategoryProps {
  show: boolean;
  onHide: () => void;
  category?: CategoriesModel;
}

export const ModalEditCategory: React.FC<ModalEditCategoryProps> = ({
  show,
  onHide,
  category,
}) => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const mutation = useCategoryCreation();

  useEffect(() => {
    if (show && category) {
      setName(category.name ?? "");
      setError(false);
    }
  }, [show, category]);

  const handleClose = () => {
    setError(false);
    onHide();
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError(true);
      return;
    }
    if (!category?.id) return;
    await mutation.mutateAsync({
      type: "update",
      id: category.id,
      data: { name: name.trim() },
    });
    handleClose();
  };

  if (!show) return null;

  return (
    <div
      onClick={handleClose}
      className="fixed backdrop:filter cursor-pointer inset-0 p-4 z-[9999] overflow-auto grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-md transition-opacity duration-300"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        data-dialog="dialog"
        className="flex cursor-default py-4 flex-col items-center justify-center px-8 relative w-full sm:min-w-[400px] min-w-[200px] z-[9999] sm:max-w-[40vw] h-min overflow-auto rounded-lg bg-white font-sans text-base font-light leading-relaxed text-blue-gray-500 antialiased shadow-2xl"
      >
        <div className="py-4 w-full">
          <p className="text-black font-bold text-xl">Edit Category</p>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700 font-poppins">
              Name
            </label>
            <Input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError(false);
              }}
              placeholder="Enter category name"
              error={error}
            />
            {error && (
              <p className="text-xs text-red-600 font-poppins">
                Name is required
              </p>
            )}
          </div>
          <div className="flex items-center justify-end gap-5 w-full mt-2">
            <div className="flex items-center gap-2">
              <Button variant="secondary" onClick={handleClose}>
                <p className="text-black font-medium">Cancel</p>
              </Button>
              <Button
                variant={mutation.isPending ? "disabled" : "success"}
                onClick={handleSubmit}
                disabled={mutation.isPending}
              >
                <p className="text-white font-medium">
                  {mutation.isPending ? "Loading..." : "Update"}
                </p>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

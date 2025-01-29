import React from "react";
import { Button } from "../../../_global/components/Button";
import { useMentorCreation } from "../hooks/useMentorCreation";

interface ModalDeleteMentorProps {
  show: boolean;
  onHide: () => void;
  id?: string;
}

export const ModalDeleteMentor: React.FC<ModalDeleteMentorProps> = ({
  onHide,
  show,
  id,
}) => {
  const mutation = useMentorCreation();

  const handleDelete = async () => {
    await mutation.mutateAsync({
      type: "delete",
      id,
    });
    onHide();
  };
  return (
    <>
      {show && (
        <div
          onClick={onHide}
          className="fixed backdrop:filter cursor-pointer inset-0 p-4 z-[9999] overflow-auto grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-md transition-opacity duration-300"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            data-dialog="dialog"
            className="flex cursor-default py-4 flex-col items-center justify-center px-8 relative w-full sm:min-w-[400px] min-w-[200px] z-[9999] sm:max-w-[40vw] h-min overflow-auto rounded-lg bg-white font-sans text-base font-light leading-relaxed text-blue-gray-500 antialiased shadow-2xl"
          >
            <div className="py-4">
              <p className="text-black font-bold text-xl">Delete Mentor</p>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-md font-medium">
                Are you sure you want to delete mentor? This action is
                irreversible and will permanently remove all associated data,
                including their courses, student interactions, and history.
                Please confirm if you want to proceed with this deletion.
              </p>
              <div className="flex items-center justify-end gap-5 w-full">
                <div className="flex items-center gap-2">
                  <Button variant="secondary" onClick={onHide}>
                    <p className="text-black font-medium">Cancel</p>
                  </Button>
                  <Button
                    variant={mutation.isPending ? "disabled" : "danger"}
                    onClick={handleDelete}
                  >
                    <p className="text-white font-medium">
                      {mutation.isPending ? "Loading..." : "Delete"}
                    </p>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

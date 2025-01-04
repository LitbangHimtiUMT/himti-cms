import InputGroup from "@features/_global/components/Input/InputGroup";
import {
  useDropdownAcara,
  // useDropdownSubAcara,
} from "@features/admin/acara/hooks/useDropdownAcara";
import { useNotificationCreation } from "@features/admin/notification/hooks/useNotification";
import {
  useEventMeeting,
  useEventMeetingById,
} from "@features/event-meeting/hooks/useEventMeeting";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";

interface ModalProps {
  show: boolean;
  onHide: () => void;
  id?: string;
  name?: string;
}

interface BodyRequest {
  acaraId?: string;
  eventMeetingId?: string;
  eventMeetingChildren?: string;
  title: string;
  body: string;
}

const inititalValue: BodyRequest = {
  title: "",
  body: "",
  acaraId: undefined,
  eventMeetingId: undefined,
  eventMeetingChildren: undefined,
};

export const ModalNotification: React.FC<ModalProps> = ({
  onHide,
  show,
  id,
  name,
}) => {
  const [body, setBody] = useState<BodyRequest>(inititalValue);
  const [errors, setErrors] = useState<
    Partial<Record<keyof BodyRequest, string>>
  >({});
  const { data: acaras } = useDropdownAcara({ page: 1, perPage: 99999999 });
  const [isField, setIsField] = useState("");
  const { data: eventMeeting } = useEventMeeting({
    page: 1,
    perPage: 99999999,
  });
  const { data: eventMeetingById, refetch } = useEventMeetingById({
    eventMeetingId: body.eventMeetingId,
  });

  useEffect(() => {
    if (body.eventMeetingId) {
      refetch();
    }
  }, [body.eventMeetingId, refetch]);

  const mutation = useNotificationCreation();

  const validate = () => {
    const newErrors: Partial<Record<keyof BodyRequest, string>> = {};
    let isValid = true;

    if (!body.title) {
      newErrors.title = "Title is required";
      isValid = false;
    }
    if (!body.body) {
      newErrors.body = "Body is required";
      isValid = false;
    }

    if (isField === "Acara") {
      if (!body.acaraId) {
        newErrors.acaraId = "Acara is required";
        isValid = false;
      }
    }

    if (isField === "Meet") {
      if (!body.eventMeetingId) {
        newErrors.eventMeetingId = "Event Meeting is required";
        isValid = false;
      }

      if (!body.eventMeetingChildren) {
        newErrors.eventMeetingChildren = "Event Meeting Children is required";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    if (id) {
      await mutation.mutateAsync({
        type: "SINGLE",
        data: body,
        id,
      });
    } else {
      await mutation.mutateAsync({
        type: "ALL",
        data: body,
      });
    }
    onHide();
  };

  const handleChangeField = (field: string) => {
    if (field === isField) {
      setIsField("");
    } else {
      setIsField(field);
    }
    setBody({ ...body, acaraId: "" });
    setBody({ ...body, eventMeetingId: "" });
  };

  return (
    <>
      {show && (
        <div className="fixed inset-0 p-4 z-[9999] overflow-auto grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300">
          <div
            data-dialog="dialog"
            className="relative w-full sm:min-w-[400px] z-[9999] sm:max-w-[40%] h-min overflow-auto rounded-lg bg-white font-sans text-base font-light leading-relaxed text-blue-gray-500 antialiased shadow-2xl"
          >
            <div className="flex items-center justify-center p-4 font-sans text-2xl antialiased font-semibold leading-snug shrink-0 text-blue-gray-900">
              {id ? `Send Notification To ${name}` : "Send All Notification"}
            </div>
            <form onSubmit={handleSubmit}>
              <div className="relative min-h-[350px] p-4 font-sans text-base antialiased font-light leading-relaxed border-t border-b border-t-blue-gray-100 border-b-blue-gray-100 text-blue-gray-500">
                <div className="mb-4 my-2">
                  <InputGroup
                    disabled={mutation.isPending}
                    onChange={(e) =>
                      setBody({ ...body, title: e.target.value })
                    }
                    error={errors.title}
                    type="text"
                    label="Title"
                    variant="outlined"
                  />
                </div>
                <div className="mb-4 my-2">
                  <InputGroup
                    disabled={mutation.isPending}
                    onChange={(e) => setBody({ ...body, body: e.target.value })}
                    error={errors.body}
                    type="textarea"
                    label="Body"
                    variant="outlined"
                    rows={4}
                  />
                </div>
                <div className="mb-4 my-2 flex gap-2">
                  <Button
                    variant={`${
                      isField === "Acara" ? "contained" : "outlined"
                    }`}
                    fullWidth
                    onClick={() => handleChangeField("Acara")}
                    color="primary"
                  >
                    Acara
                  </Button>
                  <Button
                    variant={`${isField === "Meet" ? "contained" : "outlined"}`}
                    fullWidth
                    onClick={() => handleChangeField("Meet")}
                    color="primary"
                  >
                    Meeting
                  </Button>
                </div>
                {isField === "Acara" && (
                  <div className="mb-4 my-2">
                    <InputGroup
                      disabled={mutation.isPending}
                      type="select"
                      label="Acara"
                      variant="outlined"
                      error={errors.acaraId}
                      options={
                        acaras?.data?.length
                          ? acaras.data.map((item) => ({
                              label: item.name,
                              value: item.id,
                              onClick: () =>
                                setBody({ ...body, acaraId: item.id }),
                            }))
                          : []
                      }
                    />
                  </div>
                )}
                {isField === "Meet" && (
                  <>
                    <div className="mb-4 my-2">
                      <InputGroup
                        disabled={mutation.isPending}
                        type="select"
                        label="Meeting Acara"
                        error={errors.eventMeetingId}
                        variant="outlined"
                        options={
                          eventMeeting?.data?.length
                            ? eventMeeting.data.map((item) => ({
                                label: item.name,
                                value: item.id,
                                onClick: () =>
                                  setBody({ ...body, eventMeetingId: item.id }),
                              }))
                            : []
                        }
                      />
                    </div>
                    <div className="mb-4 my-2">
                      <InputGroup
                        disabled={mutation.isPending}
                        type="select"
                        label="Meeting Acara List"
                        error={errors.eventMeetingChildren}
                        variant="outlined"
                        options={
                          eventMeetingById?.data?.Meeting?.length
                            ? eventMeetingById?.data?.Meeting?.map((item) => ({
                                label: item.name,
                                value: item.id,
                                onClick: () =>
                                  setBody({
                                    ...body,
                                    eventMeetingChildren: item.id,
                                  }),
                              }))
                            : []
                        }
                      />
                    </div>
                  </>
                )}
              </div>
              <div className="flex flex-wrap items-center justify-end p-4 shrink-0 text-blue-gray-500">
                <button
                  data-ripple-dark="true"
                  data-dialog-close="true"
                  className="px-6 py-3 mr-1 font-sans text-xs font-bold bg-gradient-to-tr from-red-600 to-red-400 uppercase transition-all rounded-lg middle none center text-white hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="reset"
                  onClick={onHide}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={mutation.isPending}
                  data-ripple-light="true"
                  data-dialog-close="true"
                  className="middle none center rounded-lg bg-gradient-to-tr from-green-600 to-green-400 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  // onClick={}
                >
                  {mutation.isPending ? "Sending..." : "Send"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

import InputGroup from "@features/_global/components/Input/InputGroup";
import { useDropdownAcara } from "@features/admin/acara/hooks/useDropdownAcara";
import { useNotificationCreation } from "@features/admin/notification/hooks/useNotification";
import { useEventMeetingDropdown } from "@features/event-meeting/hooks/useEventMeeting";
import { Button } from "@mui/material";
import { useState } from "react";
import { useDropdownMeeting } from "../../../event-meeting/hooks/useMeeting";

type Field = "Acara" | "Meet";

interface ModalProps {
  show: boolean;
  onHide: () => void;
  id?: string;
  name?: string;
}

interface BodyRequest {
  meetingId?: string;
  eventId?: string;
  title: string;
  body: string;
}

const inititalValue: BodyRequest = {
  title: "",
  body: "",
  eventId: undefined,
  meetingId: undefined,
};

export const ModalNotification: React.FC<ModalProps> = ({
  onHide,
  show,
  id,
  name,
}) => {
  const [body, setBody] = useState<BodyRequest & { eventMeetingId?: string }>({
    ...inititalValue,
    eventMeetingId: undefined,
  });
  const [isField, setIsField] = useState<"Acara" | "Meet">("Acara");
  const [errors, setErrors] = useState<
    Partial<Record<keyof BodyRequest, string>>
  >({});

  const { data: acaras, isFetching: loadingAcara } = useDropdownAcara({
    page: 1,
    perPage: 99999999,
    enabled: show && isField === "Acara",
  });
  const { data: eventMeeting } = useEventMeetingDropdown({
    page: 1,
    perPage: 99999999,
    enabled: show && isField === "Meet",
  });

  const { data: meetings } = useDropdownMeeting({
    page: 1,
    perPage: 999999,
    eventMeetingId: body?.eventMeetingId,
    enabled: show && isField === "Meet" && !!body.eventMeetingId,
  });

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
      if (!body.eventId) {
        newErrors.eventId = "Acara is required";
        isValid = false;
      }
    }

    if (isField === "Meet") {
      if (!body.meetingId) {
        newErrors.meetingId = "Meeting is required";
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
        data: {
          body: body.body,
          title: body.title,
        },
      });
    }
    onHide();
  };

  const handleChangeField = (field: Field) => {
    setIsField(field);
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
                      disabled={mutation.isPending || loadingAcara}
                      type="select"
                      label="Acara"
                      variant="outlined"
                      error={errors.eventId}
                      options={
                        loadingAcara
                          ? [
                              {
                                label: "Loading...",
                                value: "",
                              },
                            ]
                          : acaras?.data?.length
                          ? acaras.data.map((item) => ({
                              label: item.name,
                              value: item.id,
                              onClick: () =>
                                setBody({ ...body, eventId: item.id }),
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
                        error={errors.meetingId}
                        variant="outlined"
                        options={
                          body.eventMeetingId
                            ? meetings?.data?.map((item) => ({
                                label: item.name,
                                value: item.id,
                                onClick: () =>
                                  setBody({
                                    ...body,
                                    meetingId: item.id,
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

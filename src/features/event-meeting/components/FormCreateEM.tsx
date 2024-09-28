import { Button } from "@material-tailwind/react";
import React, { useState } from "react";

import { EventMeetingCreation } from "@core/model/event-meeting";
import InputGroup from "@features/_global/components/Input/InputGroup";
import { PageLayout } from "@features/_global/components/PageLayout";
import { useNavigate } from "react-router-dom";
import { useEventMeetingCreation } from "../hooks/useEventMeeting";

const InitialValue: EventMeetingCreation = {
  name: "",
  description: undefined,
};

export const FormCreateEM: React.FC = () => {
    const mutation = useEventMeetingCreation();

  const [eventMeetingBody, setEventMeetingBody] =
    useState<EventMeetingCreation>({
      ...InitialValue,
    });
  const [errors, setErrors] = useState<
    Partial<Record<keyof EventMeetingCreation, string>>
  >({});

  const navigate = useNavigate();

  const validate = () => {
    const newErrors: Partial<Record<keyof EventMeetingCreation, string>> = {};
    let isValid = true;

    if (!eventMeetingBody.name) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    await mutation.mutateAsync({
      type: "create",
      data: eventMeetingBody,
    });
  };

  const handleReset = () => {
    setEventMeetingBody(InitialValue);
    setErrors({});
  };

  return (
    <PageLayout
      title="Create Event Meeting"
      headBackground="blue"
      action={{
        show: true,
        buttonTitle: "Cancel",
        buttonProps: { onClick: () => navigate(-1) },
        colorButton: "red",
      }}
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-4 my-2">
          <InputGroup
            disabled={mutation.isPending}
            type="text"
            label="Name"
            variant="outlined"
            error={errors.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEventMeetingBody((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </div>
        <div className="mb-4 my-2">
          <InputGroup
            disabled={mutation.isPending}
            onChange={(e) =>
              setEventMeetingBody((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            error={errors.description}
            type="textarea"
            label="Description"
            variant="outlined"
            rows={4}
          />
        </div>

        <div className="flex justify-center items-center gap-5">
          <Button
            disabled={mutation.isPending}
            onClick={handleReset}
            variant="outlined"
            fullWidth
          >
            Reset
          </Button>
          <Button
            type="submit"
            variant="gradient"
            color="blue"
            fullWidth
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Loading..." : "Add"}
          </Button>
        </div>
      </form>
    </PageLayout>
  );
};

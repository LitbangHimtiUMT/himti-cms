import { Button } from "@material-tailwind/react";
import React, { useState } from "react";

import { CreateMeetingBodyRequest } from "@core/model/meeting";
import InputGroup from "@features/_global/components/Input/InputGroup";
import { PageLayout } from "@features/_global/components/PageLayout";
import { useMeetingCreation } from "@features/event-meeting/hooks/useMeeting";
import { TextField } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { useNavigate } from "react-router-dom";

const InitialValue: CreateMeetingBodyRequest = {
  name: "",
  description: undefined,
  endTime: new Date(),
  startTime: new Date(),
  eventMeetingId: "",
};

export const FormCreateMeeting: React.FC = () => {
  const mutation = useMeetingCreation();

  const [meetingBody, setMeetingBody] = useState<CreateMeetingBodyRequest>({
    ...InitialValue,
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof CreateMeetingBodyRequest, string>>
  >({});

  const navigate = useNavigate();

  const validate = () => {
    const newErrors: Partial<Record<keyof CreateMeetingBodyRequest, string>> =
      {};
    let isValid = true;

    if (!meetingBody.name) {
      newErrors.name = "Name is required";
      isValid = false;
    }
    if (!meetingBody.startTime) {
      newErrors.startTime = "Start Time is Required";
      isValid = false;
    }
    if (!meetingBody.endTime) {
      newErrors.endTime = "End Time is Required";
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
      data: meetingBody,
    });
  };

  const handleReset = () => {
    setMeetingBody(InitialValue);
    setErrors({});
  };

  return (
    <PageLayout
      title="Create Meeting"
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
              setMeetingBody((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </div>
        <div className="mb-4 my-2">
          <InputGroup
            disabled={mutation.isPending}
            onChange={(e) =>
              setMeetingBody((prev) => ({
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

        <div className='flex gap-4 mb-4'>
          <div className='flex-1'>
            <DateTimePicker
              disabled={mutation.isPending}
              className='w-full'
              label='Start Time'
              value={meetingBody.startTime}
              onChange={(value: Date | null) => {
                console.log({ value });
                setMeetingBody({
                  ...meetingBody,
                  startTime: value as Date,
                });
              }}
              ampm={false}
              renderInput={(params) => <TextField {...params} />}
            />
            <InputGroup error={errors.startTime} />
          </div>
          <div className='flex-1'>
            <DateTimePicker
              disabled={mutation.isPending}
              className='w-full'
              label='End Time'
              value={meetingBody.endTime}
              minDateTime={new Date(meetingBody.startTime)}
              onChange={(value: Date | null) => {
                setMeetingBody({
                  ...meetingBody,
                  endTime: value as Date,
                });
              }}
              ampm={false}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
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

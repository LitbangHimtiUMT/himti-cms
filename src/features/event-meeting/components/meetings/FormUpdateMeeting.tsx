import { Button } from "@material-tailwind/react";
import * as InternalButton from "../../../_global/components/Button";
import React, { useEffect, useState } from "react";

import { UpdateMeetingBodyRequest } from "@core/model/meeting";
import InputGroup from "@features/_global/components/Input/InputGroup";
import { PageLayout } from "@features/_global/components/PageLayout";
import {
  useMeetingById,
  useMeetingCreation,
} from "@features/event-meeting/hooks/useMeeting";
import { TextField } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { useNavigate, useParams } from "react-router-dom";
import { SimpleLoadingTable } from "@features/_global/components/SimpleLoadingTable";
import { DropdownV2 } from "../../../_global/components/Dropdown/DropdownV2";
import { useClasses } from "../../../lms/class/hooks/useClass";

const InitialValue: UpdateMeetingBodyRequest = {
  name: "",
  description: undefined,
  endTime: new Date(),
  startTime: new Date(),
};

export const FormUpdateMeeting: React.FC = () => {
  const mutation = useMeetingCreation();
  const { meetingId } = useParams();
  const { data: meeting, isLoading } = useMeetingById();
  const [meetingBody, setMeetingBody] = useState<UpdateMeetingBodyRequest>({
    ...InitialValue,
  });

  const { data: classess, isFetching: classFetching } = useClasses({
    page: 1,
    perPage: 99999,
    ignoreUser: "true",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof UpdateMeetingBodyRequest, string>>
  >({});

  const navigate = useNavigate();
  const defaultClass = meetingBody.classId
    ? classess?.data?.find((c) => c.id === meetingBody.classId)
    : undefined;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await mutation.mutateAsync({
      type: "update",
      data: {
        name: meetingBody.name,
        description: meetingBody.description,
        startTime: meetingBody.startTime,
        endTime: meetingBody.endTime,
        meetingId,
      },
    });
  };
  const handleReset = () => {
    setMeetingBody(InitialValue);
    setErrors({});
  };

  useEffect(() => {
    if (meeting?.data) {
      const {
        endTime,
        name,
        startTime,
        description,
        class: classess,
      } = meeting?.data ?? {};
      setMeetingBody({
        endTime,
        name,
        startTime,
        description,
        classId: classess ? classess.id : undefined,
      });
    }
  }, [meeting?.data]);

  return (
    <PageLayout
      title="Update Meeting"
      headBackground="amber"
      action={{
        show: true,
        buttonTitle: "Cancel",
        buttonProps: { onClick: () => navigate(-1) },
        colorButton: "red",
      }}
    >
      {isLoading ? (
        <table className="w-full justify-center items-center">
          <tbody>
            <SimpleLoadingTable />
          </tbody>
        </table>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4 my-2">
            <InputGroup
              disabled={mutation.isPending}
              type="text"
              label="Name"
              variant="outlined"
              error={errors.name}
              value={meetingBody.name as string}
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
              value={meetingBody.description as string}
              type="textarea"
              label="Description"
              variant="outlined"
              rows={4}
            />
          </div>

          <div className="mb-4 my-2">
            <div className="flex md:flex-row flex-col gap-4 h-max">
              <div className="md:w-[300%] w-full">
                <DropdownV2
                  list={
                    classFetching
                      ? [
                          {
                            label: "Loading...",
                            value: "",
                            disabled: true,
                          },
                        ]
                      : (classess?.data || []).map((item) => ({
                          label: item.name,
                          value: item.id,
                        }))
                  }
                  defaultValue={
                    defaultClass
                      ? { label: defaultClass.name, value: defaultClass.id }
                      : undefined
                  }
                  reset={!meetingBody.classId}
                  placeholder="Select Class"
                  onChange={(e) =>
                    setMeetingBody((prev) => ({ ...prev, classId: e.value }))
                  }
                />
              </div>
              {meetingBody.classId ? (
                <div className="h-full">
                  <InternalButton.Button
                    size="sm"
                    variant="danger"
                    onClick={() =>
                      setMeetingBody((prev) => ({
                        ...prev,
                        classId: undefined,
                      }))
                    }
                  >
                    Reset
                  </InternalButton.Button>
                </div>
              ) : null}
            </div>
          </div>

          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <DateTimePicker
                disabled={mutation.isPending}
                className="w-full"
                label="Start Time"
                value={meetingBody.startTime}
                onChange={(value: Date | null) => {
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
            <div className="flex-1">
              <DateTimePicker
                disabled={mutation.isPending}
                className="w-full"
                label="End Time"
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
              className="text-white"
              variant="gradient"
              color="amber"
              fullWidth
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Loading..." : "Update"}
            </Button>
          </div>
        </form>
      )}
    </PageLayout>
  );
};

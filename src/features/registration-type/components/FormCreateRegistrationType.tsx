import { Button } from "@material-tailwind/react";
import React, { useState } from "react";

import {
  RegistrationEventTypeEnum,
  RegistrationTypeCreation,
} from "@core/model/registration-type";
import { acaraService } from "@core/services/acara";
import InputGroup from "@features/_global/components/Input/InputGroup";
import { PageLayout } from "@features/_global/components/PageLayout";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { DropdownV2 } from "../../_global/components/Dropdown/DropdownV2";
import { useRegistrationTypeCreation } from "../hooks/useRegistrationType";

const InitialValue: RegistrationTypeCreation = {
  name: "",
  year: new Date().getFullYear(),
  type: RegistrationEventTypeEnum.BOOTCAMP,
  isActive: true,
  eventId: null,
};

const registrationTypeOptions = [
  { label: "Bootcamp", value: RegistrationEventTypeEnum.BOOTCAMP },
  { label: "Seminar", value: RegistrationEventTypeEnum.SEMINAR },
  { label: "Learning Group", value: RegistrationEventTypeEnum.LEARNING_GROUP },
];

export const FormCreateRegistrationType: React.FC = () => {
  const mutation = useRegistrationTypeCreation();
  const navigate = useNavigate();

  const [registrationTypeBody, setRegistrationTypeBody] =
    useState<RegistrationTypeCreation>({
      ...InitialValue,
    });
  const [errors, setErrors] = useState<
    Partial<Record<keyof RegistrationTypeCreation, string>>
  >({});

  // Fetch list of events (acara)
  const { data: events } = useQuery({
    queryKey: ["acara-list"],
    queryFn: () => acaraService.get({ queryParams: { perPage: 100 } }),
  });

  const validate = () => {
    const newErrors: Partial<Record<keyof RegistrationTypeCreation, string>> =
      {};
    let isValid = true;

    if (!registrationTypeBody.name) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!registrationTypeBody.year) {
      newErrors.year = "Year is required";
      isValid = false;
    }

    if (!registrationTypeBody.type) {
      newErrors.type = "Type is required";
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
      data: registrationTypeBody,
    });
  };

  const handleReset = () => {
    setRegistrationTypeBody(InitialValue);
    setErrors({});
  };

  return (
    <PageLayout
      title="Create Registration Type"
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
            value={registrationTypeBody.name}
            error={errors.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setRegistrationTypeBody((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
          />
        </div>

        <div className="mb-4 my-2">
          <InputGroup
            disabled={mutation.isPending}
            type="number"
            label="Year"
            variant="outlined"
            value={registrationTypeBody.year.toString()}
            error={errors.year}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setRegistrationTypeBody((prev) => ({
                ...prev,
                year: parseInt(e.target.value) || new Date().getFullYear(),
              }))
            }
          />
        </div>

        <div className="mb-4 my-2">
          <label className="block text-sm font-medium mb-2">Type</label>
          <DropdownV2
            list={registrationTypeOptions}
            placeholder="Select Type"
            onChange={(value) =>
              setRegistrationTypeBody((prev) => ({
                ...prev,
                type: value.value as RegistrationEventTypeEnum,
              }))
            }
          />
          {errors.type && (
            <p className="text-red-500 text-xs mt-1">{errors.type}</p>
          )}
        </div>

        <div className="mb-4 my-2">
          <label className="block text-sm font-medium mb-2">Event</label>
          <DropdownV2
          searchInput
            list={
              events?.data?.map((item) => ({
                label: item.name,
                value: item.id,
              })) || []
            }
            placeholder="Select Event"
            onChange={(value) =>
              setRegistrationTypeBody((prev) => ({
                ...prev,
                type: value.value as RegistrationEventTypeEnum,
              }))
            }
          />
        </div>

        <div className="mb-4 my-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              disabled={mutation.isPending}
              checked={registrationTypeBody.isActive}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setRegistrationTypeBody((prev) => ({
                  ...prev,
                  isActive: e.target.checked,
                }))
              }
              className="w-4 h-4"
            />
            <span className="text-sm font-medium">Is Active</span>
          </label>
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

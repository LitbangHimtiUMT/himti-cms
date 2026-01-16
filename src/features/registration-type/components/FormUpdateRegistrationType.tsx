import { Button, Switch } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";

import {
  RegistrationEventTypeEnum,
  RegistrationTypeUpdate,
} from "@core/model/registration-type";
import { acaraService } from "@core/services/acara";
import InputGroup from "@features/_global/components/Input/InputGroup";
import { PageLayout } from "@features/_global/components/PageLayout";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { DropdownV2 } from "../../_global/components/Dropdown/DropdownV2";
import {
  useRegistrationTypeById,
  useRegistrationTypeCreation,
} from "../hooks/useRegistrationType";

const registrationTypeOptions = [
  { label: "Bootcamp", value: RegistrationEventTypeEnum.BOOTCAMP },
  { label: "Seminar", value: RegistrationEventTypeEnum.SEMINAR },
  { label: "Learning Group", value: RegistrationEventTypeEnum.LEARNING_GROUP },
];

export const FormUpdateRegistrationType: React.FC = () => {
  const mutation = useRegistrationTypeCreation();
  const navigate = useNavigate();
  const { data: registrationType, isLoading } = useRegistrationTypeById();

  const [registrationTypeBody, setRegistrationTypeBody] =
    useState<RegistrationTypeUpdate>({});
  const [errors, setErrors] = useState<
    Partial<Record<keyof RegistrationTypeUpdate, string>>
  >({});

  // Fetch list of events (acara)
  const { data: events } = useQuery({
    queryKey: ["acara-list"],
    queryFn: () => acaraService.get({ queryParams: { perPage: 100 } }),
  });

  // Initialize form with existing data
  useEffect(() => {
    if (registrationType?.data) {
      setRegistrationTypeBody({
        name: registrationType.data.name,
        year: registrationType.data.year,
        type: registrationType.data.type,
        isActive: registrationType.data.isActive,
        eventId: registrationType.data.eventId,
      });
    }
  }, [registrationType]);

  const validate = () => {
    const newErrors: Partial<Record<keyof RegistrationTypeUpdate, string>> =
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
      type: "update",
      data: {
        registrationTypeId: registrationType?.data?.id,
        name: registrationTypeBody.name,
        year: registrationTypeBody.year,
      },
    });
  };

  const handleReset = () => {
    if (registrationType?.data) {
      setRegistrationTypeBody({
        name: registrationType.data.name,
        year: registrationType.data.year,
        type: registrationType.data.type,
        isActive: registrationType.data.isActive,
        eventId: registrationType.data.eventId,
      });
    }
    setErrors({});
  };

  if (isLoading) {
    return (
      <PageLayout title="Update Registration Type" headBackground="blue">
        <div className="flex justify-center items-center py-12">
          <p>Loading...</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title="Update Registration Type"
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
            value={registrationTypeBody.name || ""}
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
            value={registrationTypeBody.year?.toString() || ""}
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
            value={registrationTypeOptions.find(
              (opt) => opt.value === registrationTypeBody.type
            )}
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
          <label className="block text-sm font-medium mb-2">
            Event (Optional)
          </label>
          <DropdownV2
            searchInput
            list={
              events?.data?.map((item) => ({
                label: item.name,
                value: item.id,
              })) || []
            }
            placeholder="Select Event (Optional)"
            value={
              registrationTypeBody.eventId
                ? events?.data
                    ?.map((item) => ({
                      label: item.name,
                      value: item.id,
                    }))
                    .find((opt) => opt.value === registrationTypeBody.eventId)
                : undefined
            }
            onChange={(value) =>
              setRegistrationTypeBody((prev) => ({
                ...prev,
                eventId: value.value as string,
              }))
            }
          />
        </div>

        <div className="mb-4 my-2">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Status</label>
            <Switch
              checked={registrationTypeBody.isActive ?? true}
              onChange={() =>
                setRegistrationTypeBody((prev) => ({
                  ...prev,
                  isActive: !prev.isActive,
                }))
              }
              disabled={mutation.isPending}
              color="green"
            />
            <span className="text-sm text-gray-600">
              {registrationTypeBody.isActive ? "Active" : "Inactive"}
            </span>
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
            {mutation.isPending ? "Loading..." : "Update"}
          </Button>
        </div>
      </form>
    </PageLayout>
  );
};

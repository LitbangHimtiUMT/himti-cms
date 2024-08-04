import { Button } from "@material-tailwind/react";
import React, { useState } from "react";

import { AngkatanDTO } from "@core/model/angkatan";
import InputGroup from "@features/_global/components/Input/InputGroup";
import { PageLayout } from "@features/_global/components/PageLayout";
import { useNavigate } from "react-router-dom";
import { useAngkatanCreation } from "../hooks/useAngkatan";

const InitialValue: AngkatanDTO = {
  year: "",
  isActive: true,
};

export const FormCreateAngkatan: React.FC = () => {
  const mutation = useAngkatanCreation();

  const [angkatanBody, setAngkatanBody] = useState<AngkatanDTO>({
    ...InitialValue,
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof AngkatanDTO, string>>
  >({});

  const navigate = useNavigate();

  const validate = () => {
    const newErrors: Partial<Record<keyof AngkatanDTO, string>> = {};
    let isValid = true;

    if (!angkatanBody.year) {
      newErrors.year = "Year is required";
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
      data: angkatanBody,
    });
  };

  const handleReset = () => {
    setAngkatanBody(InitialValue);
    setErrors({});
  };

  return (
    <PageLayout
      title="Create Angkatan"
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
            label="Year"
            variant="outlined"
            error={errors.year}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAngkatanBody((prev) => ({ ...prev, year: e.target.value }))
            }
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

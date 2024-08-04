import { Button, Switch } from "@material-tailwind/react";
import React, { useState } from "react";

import { AngkatanDTO } from "@core/model/angkatan";
import InputGroup from "@features/_global/components/Input/InputGroup";
import { PageLayout } from "@features/_global/components/PageLayout";
import { SimpleLoadingTable } from "@features/_global/components/SimpleLoadingTable";
import { useNavigate, useParams } from "react-router-dom";
import { useAngkatanById, useAngkatanCreation } from "../hooks/useAngkatan";

const InitialValue: AngkatanDTO = {
  year: "",
  isActive: true,
};

export const FormUpdateAngkatan: React.FC = () => {
  const mutation = useAngkatanCreation();
  const { data: angkatan, isLoading } = useAngkatanById();
  const { id } = useParams();

  const [angkatanBody, setAngkatanBody] = useState<AngkatanDTO>({
    isActive: angkatan?.data?.isActive,
    year: angkatan?.data?.year,
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof AngkatanDTO, string>>
  >({});

  const navigate = useNavigate();
  // const validate = () => {
  //   const newErrors: Partial<Record<keyof AngkatanDTO, string>> = {};
  //   let isValid = true;

  //   if (!angkatanBody.year) {
  //     newErrors.year = "Year is required";
  //     isValid = false;
  //   }

  //   setErrors(newErrors);
  //   return isValid;
  // };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if (!validate()) return;
    await mutation.mutateAsync({
      type: "update",
      data: {
        ...angkatanBody,
        ...(angkatanBody.isActive === undefined && {
          isActive: angkatan?.data?.isActive,
        }),
        ...(angkatanBody.year === undefined && {
          year: angkatan?.data?.year,
        }),
      },
      id,
    });
  };

  const handleReset = () => {
    setAngkatanBody(InitialValue);
    setErrors({});
  };
  return (
    <PageLayout
      title="Update Angkatan"
      headBackground="amber"
      action={{
        show: true,
        buttonTitle: "Cancel",
        buttonProps: { onClick: () => navigate(-1) },
        colorButton: "red",
      }}
    >
      {isLoading ? (
        <div className="w-full h-48 flex justify-center items-center">
          <SimpleLoadingTable />
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4 my-2">
            <InputGroup
              disabled={mutation.isPending || isLoading}
              type="text"
              label="Year"
              variant="outlined"
              value={angkatan?.data?.year}
              error={errors.year}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAngkatanBody((prev) => ({ ...prev, year: e.target.value }))
              }
            />
          </div>
          <div className="mb-4 my-2">
            <div className="flex items-center gap-2">
              <p>Status</p>
              <Switch
                defaultChecked={angkatan?.data?.isActive}
                onClick={() =>
                  setAngkatanBody((prev) => ({
                    ...prev,
                    isActive: !prev.isActive,
                  }))
                }
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
              {mutation.isPending ? "Loading..." : "Update"}
            </Button>
          </div>
        </form>
      )}
    </PageLayout>
  );
};

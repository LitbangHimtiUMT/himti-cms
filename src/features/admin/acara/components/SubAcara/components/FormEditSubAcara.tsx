import DefaultImage from "@core/assets/default-image.png";
import InputGroup from "@features/_global/components/Input/InputGroup";
import { PageLayout } from "@features/_global/components/PageLayout";
import { SimpleLoadingTable } from "@features/_global/components/SimpleLoadingTable";
import {
  useSubAcaraById,
  useSubAcaraCreation,
} from "@features/_global/hooks/useSubAcara";
import { Button } from "@material-tailwind/react";
import { TextField } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SubAcaraBodyRequest } from "../../../model/acara";

const InitialValue: SubAcaraBodyRequest = {
  name: "",
  description: "",
  startTime: new Date(),
  endTime: new Date(),
};

interface ImageFile extends File {
  preview: string;
}

const FormEditSubAcara: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: subAcaraById, isLoading } = useSubAcaraById();
  const mutation = useSubAcaraCreation();

  const [subAcaraBody, setSubAcaraBody] = useState<SubAcaraBodyRequest>({
    ...InitialValue,
  });
  const [imageFile, setImageFile] = useState<
    ImageFile | ArrayBuffer | string | null
  >(DefaultImage);
  const [errors, setErrors] = useState<
    Partial<Record<keyof SubAcaraBodyRequest, string>>
  >({});

  const navigate = useNavigate();

  useEffect(() => {
    if (subAcaraById && subAcaraById.data) {
      const { name, description, image, startTime, endTime } =
        subAcaraById.data;
      setSubAcaraBody({
        name,
        description,
        image,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
      });
      if (typeof image === "string" && image.startsWith("http")) {
        setImageFile(image);
      }
    }
  }, [subAcaraById]);

  const validate = () => {
    const newErrors: Partial<Record<keyof SubAcaraBodyRequest, string>> = {};
    let isValid = true;

    if (!subAcaraBody.name) {
      newErrors.name = "Name is required";
      isValid = false;
    }
    if (!subAcaraBody.startTime) {
      newErrors.startTime = "Start Time is required";
      isValid = false;
    }
    if (!subAcaraBody.endTime) {
      newErrors.endTime = "End Time is required";
      isValid = false;
    }

    if (
      subAcaraBody.startTime &&
      subAcaraBody.endTime &&
      subAcaraBody.endTime < subAcaraBody.startTime
    ) {
      newErrors.startTime = "End Time must be greater than Start Time";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    const formData = new FormData();
    formData.append("name", subAcaraBody.name);
    if (subAcaraBody.description) {
      formData.append("description", subAcaraBody.description);
    }
    formData.append(
      "startTime",
      (subAcaraBody.startTime as Date).toISOString()
    );
    formData.append("endTime", (subAcaraBody.endTime as Date).toISOString());
    if (subAcaraBody.image instanceof File) {
      formData.append("image", subAcaraBody.image);
    }

    await mutation.mutateAsync({
      type: "update",
      data: formData,
      id,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        image: "Please upload a valid image file.",
      }));
      return;
    }
    setSubAcaraBody((prev) => ({
      ...prev,
      image: file as File,
    }));
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageFile(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleReset = () => {
    if (subAcaraById?.data) {
      const { name, description, image, startTime, endTime } =
        subAcaraById.data;
      setSubAcaraBody({
        name,
        description,
        image,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
      });
      setImageFile(
        typeof image === "string" && image.startsWith("http")
          ? image
          : DefaultImage
      );
    }
    const fileInput = document.getElementById(
      "image-input"
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
    setErrors({});
  };

  return (
    <PageLayout
      title="Edit Sub Acara"
      headBackground="amber"
      action={{
        show: true,
        buttonTitle: "Cancel",
        buttonProps: { onClick: () => navigate(-1) },
        colorButton: "red",
      }}
    >
      {isLoading && (
        <table className="w-full justify-center items-center">
          <tbody>
            <SimpleLoadingTable />
          </tbody>
        </table>
      )}
      {!isLoading && subAcaraById?.data && (
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-4 my-2">
            <InputGroup
              disabled={mutation.isPending}
              type="text"
              label="Name"
              variant="outlined"
              error={errors.name}
              value={subAcaraBody.name as string}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSubAcaraBody({ ...subAcaraBody, name: e.target.value })
              }
            />
          </div>

          <div className="mb-4">
            <InputGroup
              disabled={mutation.isPending}
              type="textarea"
              label="Description"
              variant="outlined"
              error={errors.description}
              value={subAcaraBody.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setSubAcaraBody({
                  ...subAcaraBody,
                  description: e.target.value,
                })
              }
            />
          </div>

          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <DateTimePicker
                disabled={mutation.isPending}
                className="w-full"
                label="Start Time"
                value={subAcaraBody.startTime}
                onChange={(value: Date | null) => {
                  if (value) {
                    setSubAcaraBody((prev) => ({
                      ...prev,
                      startTime: value,
                    }));
                  }
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
                value={subAcaraBody.endTime}
                minDateTime={new Date(subAcaraBody.startTime as string)}
                onChange={(value: Date | null) => {
                  if (value) {
                    setSubAcaraBody((prev) => ({
                      ...prev,
                      endTime: value,
                    }));
                  }
                }}
                ampm={false}
                renderInput={(params) => <TextField {...params} />}
              />
            </div>
          </div>

          <div className="flex justify-start items-center my-6">
            <img
              src={imageFile as string}
              alt="Sub Acara Image"
              className="max-w-[200px] h-[200px] max-h-[200px] rounded-md object-cover"
            />
          </div>
          <div className="mb-4">
            <div className="flex items-center w-full">
              <input
                id="image-input"
                type="file"
                accept="image/*"
                className="file-input w-full border border-solid border-black"
                onChange={handleImageChange}
              />
            </div>
            <InputGroup error={errors.image} />
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

export default FormEditSubAcara;

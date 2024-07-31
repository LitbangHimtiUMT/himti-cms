import {
  Button,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { AcaraDTO } from "../model/acara";
import { useAcaraCreation } from "@features/_global/hooks/useAcara";
import DefaultImage from "@core/assets/default-image.png";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { TextField } from "@mui/material";
import { utcToZonedTime } from "date-fns-tz";
import { PageLayout } from "@features/_global/components/PageLayout";
import { useNavigate } from "react-router-dom";
import InputGroup from "@features/_global/components/Input/InputGroup";

const InitialValue: AcaraDTO = {
  name: "",
  description: "",
  isOpenAbsen: "",
  image: "",
  startTime: utcToZonedTime(new Date(), "Asia/Jakarta"),
  endTime: utcToZonedTime(new Date(), "Asia/Jakarta"),
};

interface ImageFile extends File {
  preview: string;
}

const FormAddAcara: React.FC = () => {
  const mutation = useAcaraCreation();

  const [acaraBody, setAcaraBody] = useState<AcaraDTO>({ ...InitialValue });
  const [imageFile, setImageFile] = useState<ImageFile | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof AcaraDTO, string>>>(
    {}
  );

  const navigate = useNavigate();

  const validate = () => {
    console.log(acaraBody);

    const newErrors: Partial<Record<keyof AcaraDTO, string>> = {};
    let isValid = true;

    if (!acaraBody.name) {
      newErrors.name = "Name is required";
      isValid = false;
    }
    if (!acaraBody.description) {
      newErrors.description = "Description is required";
      isValid = false;
    }
    if (!acaraBody.isOpenAbsen) {
      newErrors.isOpenAbsen = "Open Absen is required";
      isValid = false;
    }
    if (!acaraBody.startTime) {
      newErrors.startTime = "Start Time is required";
      isValid = false;
    }
    if (!acaraBody.endTime) {
      newErrors.endTime = "End Time is required";
      isValid = false;
    }

    if (
      acaraBody.startTime &&
      acaraBody.endTime &&
      acaraBody.endTime < acaraBody.startTime
    ) {
      newErrors.startTime = "End Time must be greater than Start Time";
      isValid = false;
    }

    if (!imageFile) {
      newErrors.image = "Image is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    acaraBody.startTime = utcToZonedTime(
      acaraBody.startTime as Date,
      "Asia/Jakarta"
    ).toISOString();
    acaraBody.endTime = utcToZonedTime(
      acaraBody.endTime as Date,
      "Asia/Jakarta"
    ).toISOString();
    console.log(acaraBody);

    if (!validate()) return;
    const formData = new FormData();
    Object.entries(acaraBody).forEach(([key, value]) => {
      formData.append(key, value as any);
    });

    await mutation.mutateAsync({
      type: "create",
      data: formData,
    });
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const validExtensions = ["image/jpeg", "image/jpg", "image/png"];
      if (!validExtensions.includes(file.type)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          image: "Invalid image format. Please upload jpg, jpeg, or png files.",
        }));
        return;
      }

      const newImageFile: ImageFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      setImageFile(newImageFile);
      setAcaraBody({ ...acaraBody, image: file });
      setErrors((prevErrors) => ({ ...prevErrors, image: "" }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        image: "Please upload a valid image file.",
      }));
    }
  };

  const handleReset = () => {
    setAcaraBody(InitialValue);
    setImageFile(null);
    setErrors({});
  };

  return (
    <PageLayout
      title="Add Acara"
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
            label="Name"
            variant="outlined"
            error={errors.name}
            value={acaraBody.name as string}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAcaraBody({ ...acaraBody, name: e.target.value })
            }
          />
        </div>

        <div className="mb-4">
          <InputGroup
            type="textarea"
            label="Description"
            variant="outlined"
            error={errors.description}
            value={acaraBody.description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setAcaraBody({
                ...acaraBody,
                description: e.target.value,
              })
            }
          />
        </div>

        <div className="mb-4">
          <InputGroup
            type="select"
            label="Status"
            value={acaraBody.isOpenAbsen as string}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setAcaraBody({
                ...acaraBody,
                isOpenAbsen: e,
              });
            }}
            error={errors.isOpenAbsen}
            options={[
              { value: "", label: "Pilih Status" },
              { value: "true", label: "Open" },
              { value: "false", label: "Close" },
            ]}
          />
        </div>

        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <DateTimePicker
              className="w-full"
              label="Start Time"
              value={acaraBody.startTime}
              onChange={(value: Date | null) => {
                if (value) {
                  setAcaraBody({
                    ...acaraBody,
                    startTime: value,
                  });
                }
              }}
              ampm={false}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
          <div className="flex-1">
            <DateTimePicker
              className="w-full"
              label="End Time"
              value={acaraBody.endTime}
              minDateTime={new Date(acaraBody.startTime as string)}
              onChange={(value: Date | null) => {
                if (value) {
                  setAcaraBody({
                    ...acaraBody,
                    endTime: value,
                  });
                }
              }}
              ampm={false}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
        </div>

        <div className="flex justify-start items-center my-6">
          <img
            src={imageFile?.preview || DefaultImage}
            alt="Acara Image"
            className="max-w-[200px] h-[200px] max-h-[200px] rounded-md object-cover"
          />
        </div>
        <div className="mb-4">
          <InputGroup
            type="file"
            label="Acara Image"
            variant="outlined"
            error={errors.image}
            onChange={handleChangeImage}
          />
        </div>
        <div className="flex justify-center items-center gap-5">
          <Button onClick={handleReset} variant="outlined" fullWidth>
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

export default FormAddAcara;

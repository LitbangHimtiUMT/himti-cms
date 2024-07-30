import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Typography,
  Select,
  Option,
  Textarea,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { AcaraDTO } from "../model/acara";
import { useAcaraCreation } from "@features/_global/hooks/useAcara";
import DefaultImage from "@core/assets/default-image.png";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { TextField } from "@mui/material";
import { utcToZonedTime } from "date-fns-tz";

const InitialValue: AcaraDTO = {
  name: "",
  description: "",
  isOpen: "",
  image: "",
  startTime: utcToZonedTime(new Date(), 'Asia/Jakarta'),
  endTime: utcToZonedTime(new Date(), 'Asia/Jakarta'),
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

  const validate = () => {
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
    if (!acaraBody.startTime) {
      newErrors.startTime = "Start Time is required";
      isValid = false;
    }
    if (!acaraBody.endTime) {
      newErrors.endTime = "End Time is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
    <Card>
      <CardHeader
        variant="gradient"
        color="blue"
        className="mb-8 p-6 flex justify-between items-center"
      >
        <Typography variant="h6" color="white">
          Tambah Acara
        </Typography>
      </CardHeader>
      <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
        <form onSubmit={handleSubmit} className="mx-4">
          <div className="mb-4 my-2">
            <Input
              label="Name"
              variant="outlined"
              error={!!errors.name}
              value={acaraBody.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAcaraBody({ ...acaraBody, name: e.target.value })
              }
            />
          </div>

          <div className="mb-4">
            <Textarea
              label="Description"
              variant="outlined"
              error={!!errors.description}
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
            <Select
              label="Status"
              value={acaraBody.isOpen ? acaraBody.isOpen ? "yes" : "no" : ""}
              onChange={(e: string) => {
                setAcaraBody({
                  ...acaraBody,
                  isOpen: e === "yes" ? "yes" : "no",
                });
              }}
            >
              <Option value="">Pilih Status</Option>
              <Option value="yes">Open</Option>
              <Option value="no">Close</Option>
            </Select>
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
                      startTime: value.toISOString(),
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
                // minDateTime={new Date(acaraBody.startTime as string)}
                // minTime={new Date(acaraBody.startTime as string)}
                onChange={(value: Date | null) => {
                  if (value) {
                    setAcaraBody({
                      ...acaraBody,
                      endTime: value.toISOString(),
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
            <Input
              type="file"
              label="Acara Image"
              variant="outlined"
              error={!!errors.image}
              onChange={handleChangeImage}
            />
            {errors.image && (
              <p className="text-[#DC2626] text-xs">{errors.image}</p>
            )}
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
      </CardBody>
    </Card>
  );
};

export default FormAddAcara;

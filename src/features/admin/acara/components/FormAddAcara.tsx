import DefaultImage from "@core/assets/default-image.png";
import InputGroup from "@features/_global/components/Input/InputGroup";
import { PageLayout } from "@features/_global/components/PageLayout";
import { useAcaraCreation } from "@features/_global/hooks/useAcara";
import { Button } from "@material-tailwind/react";
import { TextField } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AcaraDTO, EventType } from "../model/acara";

const InitialValue: AcaraDTO = {
  name: "",
  description: "",
  // isOpen: undefined,
  image: undefined,
  // startTime: utcToZonedTime(new Date(), "Asia/Jakarta"),
  // endTime: utcToZonedTime(new Date(), "Asia/Jakarta"),
  eventType: "COMMON",
  startTime: new Date(),
  endTime: new Date(),
};

interface ImageFile extends File {
  preview: string;
}

const FormAddAcara: React.FC = () => {
  const mutation = useAcaraCreation();

  // const cropperRef = useRef<any>(null);

  // const [isModal, setIsModal] = useState<boolean>(false);
  const [acaraBody, setAcaraBody] = useState<AcaraDTO>({ ...InitialValue });
  const [imageFile, setImageFile] = useState<
    ImageFile | ArrayBuffer | string | null
  >(DefaultImage);
  const [errors, setErrors] = useState<Partial<Record<keyof AcaraDTO, string>>>(
    {}
  );

  const navigate = useNavigate();

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

    if (!acaraBody.image) {
      newErrors.image = "Image is required";
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
      if (key === "startTime" || key === "endTime") {
        formData.append(key, value);
        return;
      }
      formData.append(key, value);
    });
    await mutation.mutateAsync({
      type: "create",
      data: formData,
    });
  };

  const handleReset = () => {
    setAcaraBody(InitialValue);
    setImageFile(DefaultImage);
    const fileInput = document.getElementById(
      "image-input"
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
    setErrors({});
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0];
    setAcaraBody((prev) => ({
      ...prev,
      image: file as File,
    }));
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageFile(reader.result);
      };
      reader.readAsDataURL(file);
    }
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
      <form onSubmit={handleSubmit} className="w-full">
        <div className="mb-4 my-2">
          <InputGroup
            disabled={mutation.isPending}
            type="text"
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
            disabled={mutation.isPending}
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
            disabled={mutation.isPending}
            type="select"
            label="Select Type"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setAcaraBody({
                ...acaraBody,
                eventType: e as unknown as EventType,
              });
            }}
            error={errors.isOpen}
            options={[
              { value: "COMMON", label: "Common" },
              { value: "REGISTRATION", label: "Registration" },
            ]}
          />
        </div>

        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <DateTimePicker
              disabled={mutation.isPending}
              className="w-full"
              label="Start Time"
              value={acaraBody.startTime}
              onChange={(value: Date | null) => {
                console.log({ value });
                setAcaraBody({
                  ...acaraBody,
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
              value={acaraBody.endTime}
              minDateTime={new Date(acaraBody.startTime as string)}
              onChange={(value: Date | null) => {
                setAcaraBody({
                  ...acaraBody,
                  endTime: value as Date,
                });
              }}
              ampm={false}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
        </div>

        <div className="flex justify-start items-center my-6">
          <img
            src={imageFile as string}
            alt="Acara Image"
            className="max-w-[200px] h-[200px] max-h-[200px] rounded-md object-cover"
          />
        </div>
        <div className="mb-4">
          <div className="flex items-center w-full">
            <input
              type="file"
              className="file-input w-full border border-solid border-black"
              onChange={handleImageChange}
            />
          </div>

          {/* <InputGroup
            disabled={mutation.isPending}
            id='image-input'
            type='file'
            label='Acara Image'
            variant='outlined'
            error={errors.image}
            onChange={onChange}
          /> */}
          {/* <CropperImage
            image={imageFile as ArrayBuffer}
            isModal={isModal}
            cropperRef={cropperRef}
            getCropData={getCropData}
            hanldeCancelCrop={handleCancelCrop}
          /> */}
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

export default FormAddAcara;

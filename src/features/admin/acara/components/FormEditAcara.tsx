import DefaultImage from "@core/assets/default-image.png";
import InputGroup from "@features/_global/components/Input/InputGroup";
import { PageLayout } from "@features/_global/components/PageLayout";
import { SimpleLoadingTable } from "@features/_global/components/SimpleLoadingTable";
import {
  useAcaraById,
  useAcaraCreation,
} from "@features/_global/hooks/useAcara";
import { Button } from "@material-tailwind/react";
import { TextField } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { utcToZonedTime } from "date-fns-tz";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AcaraDTO } from "../model/acara";

const InitialValue: AcaraDTO = {
  name: "",
  description: "",
  isOpen: undefined,
  image: undefined,
  startTime: new Date(),
  endTime: new Date(),
};

interface ImageFile extends File {
  preview: string;
}

const FormEditAcara: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: acaraById, isLoading } = useAcaraById();
  const mutation = useAcaraCreation();

  useEffect(() => {
    if (acaraById && acaraById.data) {
      const { name, description, isOpen, image, startTime, endTime } =
        acaraById.data;
      // const categoryId = category ? category.id : "";
      setAcaraBody({
        name,
        description,
        isOpen,
        image,
        startTime,
        endTime,
      });
    }
  }, [acaraById]);

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

    if (
      acaraBody.startTime &&
      acaraBody.endTime &&
      acaraBody.endTime < acaraBody.startTime
    ) {
      newErrors.startTime = "End Time must be greater than Start Time";
      isValid = false;
    }

    if (!acaraBody.image && (!imageFile || imageFile === DefaultImage)) {
      newErrors.image = "Image is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    acaraBody.startTime = utcToZonedTime(
      acaraBody.startTime as Date,
      "Asia/Jakarta"
    ).toISOString();
    acaraBody.endTime = utcToZonedTime(
      acaraBody.endTime as Date,
      "Asia/Jakarta"
    ).toISOString();
    const formData = new FormData();
    Object.entries(acaraBody).forEach(([key, value]) => {
      if (key === "isOpenAbsen") {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    });

    await mutation.mutateAsync({
      type: "update",
      data: formData,
      id,
    });
  };

  // const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   e.preventDefault();
  //   const file = e.target.files?.[0];
  //   if (file && file.type.startsWith("image/")) {
  //     const validExtensions = ["image/jpeg", "image/jpg", "image/png"];
  //     if (!validExtensions.includes(file.type)) {
  //       setErrors((prevErrors) => ({
  //         ...prevErrors,
  //         image: "Invalid image format. Please upload jpg, jpeg, or png files.",
  //       }));
  //       return;
  //     }

  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       // console.log(reader.result as ArrayBuffer);
  //       setImageFile(reader.result as ArrayBuffer);
  //       setIsModal(true); // Open modal when image is loaded
  //     };
  //     reader.readAsDataURL(file);
  //   } else {
  //     setErrors((prevErrors) => ({
  //       ...prevErrors,
  //       image: "Please upload a valid image file.",
  //     }));
  //   }
  // };

  // const getCropData = () => {
  //   if (typeof cropperRef.current?.cropper !== "undefined") {
  //     const croppedCanvas = cropperRef.current.cropper.getCroppedCanvas({
  //       width: 1080,
  //       height: 1080,
  //     });
  //     croppedCanvas.toBlob((blob: File) => {
  //       setAcaraBody({ ...acaraBody, image: blob });
  //       setIsModal(false); // Close modal after cropping
  //       setImageFile(URL.createObjectURL(blob) as string);
  //     });
  //   }
  // };

  // const handleReset = () => {
  //   setAcaraBody(InitialValue);
  //   setImageFile(DefaultImage);
  //   const fileInput = document.getElementById(
  //     "image-input"
  //   ) as HTMLInputElement;
  //   if (fileInput) {
  //     fileInput.value = "";
  //   }
  //   setErrors({});
  // };

  // const handleCancelCrop = () => {
  //   setImageFile(DefaultImage);
  //   const fileInput = document.getElementById(
  //     "image-input"
  //   ) as HTMLInputElement;
  //   if (fileInput) {
  //     fileInput.value = "";
  //   }
  //   setIsModal(false);
  // };

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

  return (
    <PageLayout
      title="Edit Acara"
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
      {!isLoading && acaraById?.data && (
        <form onSubmit={handleSubmit}>
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
              label="Status"
              value={String(acaraBody.isOpen)}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setAcaraBody({
                  ...acaraBody,
                  isOpen: e,
                });
              }}
              error={errors.isOpen}
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
                disabled={mutation.isPending}
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
              src={
                (imageFile === DefaultImage
                  ? acaraBody.image
                  : imageFile) as string
              }
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
              className="text-white"
              type="submit"
              variant="gradient"
              color="amber"
              fullWidth
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Loading..." : "Edit"}
            </Button>
          </div>
        </form>
      )}
    </PageLayout>
  );
};

export default FormEditAcara;

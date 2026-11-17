import { Button } from "@material-tailwind/react";
import React, { useEffect, useRef, useState } from "react";
import {
  Department,
  Jabatan,
  StrukturalDTO,
  departmentOptions,
  isStrukturalSigner,
} from "../model/struktural";
import DefaultImage from "@core/assets/default-image.png";
import { PageLayout } from "@features/_global/components/PageLayout";
import { useNavigate, useParams } from "react-router-dom";
import InputGroup from "@features/_global/components/Input/InputGroup";
import CropperImage from "@features/_global/components/CropperImage";
import { SimpleLoadingTable } from "@features/_global/components/SimpleLoadingTable";
import {
  useStrukturalById,
  useStrukturalCreation,
} from "../hooks/useStruktural";
import { useAnggota } from "@features/admin/anggota/hooks/useAnggota";

const InitialValue: StrukturalDTO = {
  memberId: "",
  jabatan: "",
  department: "",
  image: "",
  signatureImage: "",
};

interface ImageFile extends File {
  preview: string;
}

const jabatanValues: Jabatan[] = [
  "KETUA_HIMPUNAN",
  "WAKIL_KETUA_HIMPUNAN",
  "BENDAHARA",
  "SEKRETARIS",
  "KETUA_DEPARTMENT",
];

const FormEditStruktural: React.FC = () => {
  const [searchAnggota, setSearchAnngota] = useState("");
  const { data: anggota, isLoading: isLoadingAnggota } = useAnggota({
    perPage: 100000,
    search: searchAnggota,
  });

  const { id } = useParams<{ id: string }>();
  const { data: strukturalById, isLoading } = useStrukturalById();
  const mutation = useStrukturalCreation();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cropperRef = useRef<any>(null);

  useEffect(() => {
    if (strukturalById && strukturalById.data) {
      const { memberId, jabatan, department, image, signatureImage } =
        strukturalById.data;
      // const categoryId = category ? category.id : "";
      setStrukturalBody({
        memberId,
        jabatan,
        department: department ?? "",
        image,
        signatureImage: signatureImage ?? "",
      });
    }
  }, [strukturalById]);

  const [isModal, setIsModal] = useState<boolean>(false);
  const [strukturalBody, setStrukturalBody] = useState<StrukturalDTO>({
    ...InitialValue,
  });
  const [imageFile, setImageFile] = useState<ImageFile | ArrayBuffer | string>(
    DefaultImage
  );
  const [signatureImageFile, setSignatureImageFile] = useState<
    ImageFile | ArrayBuffer | string
  >(DefaultImage);
  const [errors, setErrors] = useState<
    Partial<Record<keyof StrukturalDTO, string>>
  >({});

  const navigate = useNavigate();

  const isSigner = isStrukturalSigner(
    strukturalBody.jabatan as Jabatan | "",
    strukturalBody.department as Department | ""
  );
  const signaturePreview =
    signatureImageFile === DefaultImage
      ? strukturalBody.signatureImage
      : signatureImageFile;

  const validate = () => {
    const newErrors: Partial<Record<keyof StrukturalDTO, string>> = {};
    let isValid = true;

    if (!strukturalBody.memberId) {
      newErrors.memberId = "Anggota is required";
      isValid = false;
    }
    if (!strukturalBody.jabatan) {
      newErrors.jabatan = "Jabatan Time is required";
      isValid = false;
    }
    if (!strukturalBody.image && (!imageFile || imageFile === DefaultImage)) {
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
    // department (short code, "" when unset) and signatureImage (File, or
    // the current URL/"" when unchanged) ride along through this loop
    // exactly like image; see the model for the field contract.
    Object.entries(strukturalBody).forEach(([key, value]) => {
      formData.append(key, value as unknown as string);
    });

    await mutation.mutateAsync({
      type: "update",
      data: formData,
      id,
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
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

      const reader = new FileReader();
      reader.onload = () => {
        // console.log(reader.result as ArrayBuffer);
        setImageFile(reader.result as ArrayBuffer);
        setIsModal(true); // Open modal when image is loaded
      };
      reader.readAsDataURL(file);
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        image: "Please upload a valid image file.",
      }));
    }
  };

  // Unlike the profile photo, a signature is NOT cropped: the square
  // 1080x1080 crop would cut it. The file is validated and sent as-is.
  const onSignatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const validExtensions = ["image/jpeg", "image/jpg", "image/png"];
      if (!validExtensions.includes(file.type)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          signatureImage:
            "Invalid image format. Please upload jpg, jpeg, or png files.",
        }));
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setSignatureImageFile(reader.result as ArrayBuffer);
        setStrukturalBody((prev) => ({ ...prev, signatureImage: file }));
        setErrors((prevErrors) => ({
          ...prevErrors,
          signatureImage: undefined,
        }));
      };
      reader.onerror = () => {
        setErrors((prevErrors) => ({
          ...prevErrors,
          signatureImage: "Failed to read image file.",
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        signatureImage: "Please upload a valid image file.",
      }));
    }
  };

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      const croppedCanvas = cropperRef.current.cropper.getCroppedCanvas({
        width: 1080,
        height: 1080,
      });
      croppedCanvas.toBlob((blob: File) => {
        setStrukturalBody({ ...strukturalBody, image: blob });
        setIsModal(false); // Close modal after cropping
        setImageFile(URL.createObjectURL(blob) as string);
      });
    }
  };

  const handleReset = () => {
    setStrukturalBody(InitialValue);
    setImageFile(DefaultImage);
    setSignatureImageFile(DefaultImage);
    const fileInput = document.getElementById(
      "image-input"
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
    const signatureFileInput = document.getElementById(
      "signature-image-input"
    ) as HTMLInputElement;
    if (signatureFileInput) {
      signatureFileInput.value = "";
    }
    setErrors({});
  };

  const handleCancelCrop = () => {
    setImageFile(DefaultImage);
    const fileInput = document.getElementById(
      "image-input"
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
    setIsModal(false);
  };

  return (
    <PageLayout
      title="Edit Struktural"
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
      {!isLoading && strukturalById?.data && (
        <form onSubmit={handleSubmit}>
          <div className="flex sm:flex-row flex-col">
            <InputGroup
              className="w-full"
              type="search"
              label="Search Anggota"
              variant="outlined"
              value={searchAnggota}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setSearchAnngota(e.target.value);
              }}
            />
            {isLoadingAnggota ? (
              <InputGroup
                className="flex-1"
                disabled
                type="select"
                label="Loading..."
              />
            ) : anggota?.data ? (
              <InputGroup
                className="flex-1"
                disabled={mutation.isPending}
                type="select"
                label="Anggota"
                defaultValue={strukturalBody.memberId}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  setStrukturalBody({
                    ...strukturalBody,
                    memberId: e,
                  });
                }}
                error={errors.memberId}
                options={[
                  {
                    value: "",
                    label: "Pilih Anggota",
                  },
                  ...(anggota?.data.map((anggota) => ({
                    value: anggota.id,
                    label: anggota.name,
                  })) ?? []),
                ]}
              />
            ) : (
              <InputGroup
                className="flex-1"
                disabled
                type="select"
                label="Anggota not found"
              />
            )}
          </div>
          <div className="mb-4">
            <InputGroup
              disabled={mutation.isPending}
              type="select"
              label="Status"
              value={strukturalBody.jabatan as string}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setStrukturalBody({
                  ...strukturalBody,
                  jabatan: e,
                });
              }}
              error={errors.jabatan}
              options={jabatanValues.map((jabat) => ({
                value: jabat,
                label: jabat.replace(/_/g, " "),
              }))}
            />
          </div>
          <div className="mb-4">
            <InputGroup
              disabled={mutation.isPending}
              type="select"
              label="Department"
              value={strukturalBody.department as string}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setStrukturalBody({
                  ...strukturalBody,
                  department: e,
                });
              }}
              options={departmentOptions}
            />
          </div>

          <div className="flex justify-start items-center my-6">
            <img
              src={
                (imageFile === DefaultImage
                  ? strukturalBody.image
                  : imageFile) as string
              }
              alt="Struktural Image"
              className="max-w-[200px] h-[200px] max-h-[200px] rounded-md object-cover"
            />
          </div>
          <div className="mb-4">
            <InputGroup
              disabled={mutation.isPending}
              id="image-input"
              type="file"
              label="Struktural Image"
              variant="outlined"
              error={errors.image}
              onChange={onChange}
            />
            <CropperImage
              image={imageFile as ArrayBuffer}
              isModal={isModal}
              cropperRef={cropperRef}
              getCropData={getCropData}
              hanldeCancelCrop={handleCancelCrop}
            />
          </div>
          {signaturePreview ? (
            <div className="flex justify-start items-center my-6">
              <img
                src={signaturePreview as string}
                alt="Signature Image"
                className="max-w-[200px] h-[200px] max-h-[200px] rounded-md object-contain bg-white border border-solid border-black"
              />
            </div>
          ) : null}
          <div className="mb-4">
            <InputGroup
              disabled={mutation.isPending}
              id="signature-image-input"
              type="file"
              label="Signature Image"
              variant="outlined"
              error={errors.signatureImage}
              onChange={onSignatureChange}
            />
            {isSigner && !strukturalBody.signatureImage && (
              <p className="text-red-500 text-xs mt-1">TTD belum diupload</p>
            )}
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
              {mutation.isPending ? "Loading..." : "Add"}
            </Button>
          </div>
        </form>
      )}
    </PageLayout>
  );
};

export default FormEditStruktural;

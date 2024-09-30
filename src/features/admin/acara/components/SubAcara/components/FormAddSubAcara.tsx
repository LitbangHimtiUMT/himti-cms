// import DefaultImage from "@core/assets/default-image.png";
// import InputGroup from "@features/_global/components/Input/InputGroup";
// import { PageLayout } from "@features/_global/components/PageLayout";
// import { FormatIDTime } from "@features/_global/helper";
// import { useSubAcaraCreation } from "@features/_global/hooks/useSubAcara";
// import { Button } from "@material-tailwind/react";
// import { TextField } from "@mui/material";
// import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
// import React, { useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { AcaraDTO, SubAcaraBodyRequest } from "../../../model/acara";

// const InitialValue: SubAcaraBodyRequest = {
//   name: "",
//   description: "",
//   // image: "",
//   startTime: FormatIDTime(new Date()),
//   endTime: FormatIDTime(new Date()),
// };

// interface ImageFile extends File {
//   preview: string;
// }

// const FormAddSubAcara: React.FC = () => {
//   const mutation = useSubAcaraCreation();
//   const { acaraId } = useParams();

//   // const cropperRef = useRef<any>(null);

//   // const [isModal, setIsModal] = useState<boolean>(false);
//   const [subAcaraBody, setSubAcaraBody] = useState<SubAcaraBodyRequest>({
//     ...InitialValue,
//   });
//   const [, setImageFile] = useState<ImageFile | ArrayBuffer | string>(
//     DefaultImage
//   );
//   const [errors, setErrors] = useState<
//     Partial<Record<keyof SubAcaraBodyRequest, string>>
//   >({});

//   const navigate = useNavigate();

//   const validate = () => {
//     const newErrors: Partial<Record<keyof AcaraDTO, string>> = {};
//     let isValid = true;

//     if (!subAcaraBody.name) {
//       newErrors.name = "Name is required";
//       isValid = false;
//     }
//     if (!subAcaraBody.description) {
//       newErrors.description = "Description is required";
//       isValid = false;
//     }
//     if (!subAcaraBody.startTime) {
//       newErrors.startTime = "Start Time is required";
//       isValid = false;
//     }
//     if (!subAcaraBody.endTime) {
//       newErrors.endTime = "End Time is required";
//       isValid = false;
//     }

//     // if (
//     //   subAcaraBody.startTime &&
//     //   subAcaraBody.endTime &&
//     //   subAcaraBody.endTime < subAcaraBody.startTime
//     // ) {
//     //   newErrors.startTime = "End Time must be greater than Start Time";
//     //   isValid = false;
//     // }

//     // if (!imageFile || imageFile === DefaultImage) {
//     //   newErrors.image = "Image is required";
//     //   isValid = false;
//     // }

//     setErrors(newErrors);
//     return isValid;
//   };
//   console.log(subAcaraBody.startTime, subAcaraBody.endTime);
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!validate()) return;
//     // setSubAcaraBody((prev) => ({
//     //   ...prev,
//     //   startTime: FormatIDTime(prev.startTime as Date),
//     //   endTime: FormatIDTime(prev.endTime as Date),
//     // }));

//     const formData = new FormData();
//     Object.entries(subAcaraBody).forEach(([key, value]) => {
//       if (key === "startTime" || key === "endTime") {
//         formData.append(key, FormatIDTime(value));
//         return;
//       }
//       formData.append(key, value as any);
//     });
//     formData.append("acaraId", acaraId as string);

//     await mutation.mutateAsync({
//       type: "create",
//       data: formData,
//     });
//   };

//   // const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   //   e.preventDefault();
//   //   const file = e.target.files?.[0];
//   //   if (file && file.type.startsWith("image/")) {
//   //     const validExtensions = ["image/jpeg", "image/jpg", "image/png"];
//   //     if (!validExtensions.includes(file.type)) {
//   //       setErrors((prevErrors) => ({
//   //         ...prevErrors,
//   //         image: "Invalid image format. Please upload jpg, jpeg, or png files.",
//   //       }));
//   //       return;
//   //     }

//   //     const reader = new FileReader();
//   //     reader.onload = () => {
//   //       // console.log(reader.result as ArrayBuffer);
//   //       setImageFile(reader.result as ArrayBuffer);
//   //       setIsModal(true); // Open modal when image is loaded
//   //     };
//   //     reader.readAsDataURL(file);
//   //   } else {
//   //     setErrors((prevErrors) => ({
//   //       ...prevErrors,
//   //       image: "Please upload a valid image file.",
//   //     }));
//   //   }
//   // };

//   // const getCropData = () => {
//   //   if (typeof cropperRef.current?.cropper !== "undefined") {
//   //     const croppedCanvas = cropperRef.current.cropper.getCroppedCanvas({
//   //       width: 1080,
//   //       height: 1080,
//   //     });
//   //     croppedCanvas.toBlob((blob: File) => {
//   //       setSubAcaraBody({ ...subAcaraBody, image: blob });
//   //       setIsModal(false); // Close modal after cropping
//   //       setImageFile(URL.createObjectURL(blob) as string);
//   //     });
//   //   }
//   // };

//   const handleReset = () => {
//     setSubAcaraBody(InitialValue);
//     setImageFile(DefaultImage);
//     const fileInput = document.getElementById(
//       "image-input"
//     ) as HTMLInputElement;
//     if (fileInput) {
//       fileInput.value = "";
//     }
//     setErrors({});
//   };

//   // const handleCancelCrop = () => {
//   //   setImageFile(DefaultImage);
//   //   const fileInput = document.getElementById(
//   //     "image-input"
//   //   ) as HTMLInputElement;
//   //   if (fileInput) {
//   //     fileInput.value = "";
//   //   }
//   //   setIsModal(false);
//   // };
//   console.log({ subAcaraBody });
//   console.log(new Date(), "ts");
//   return (
//     <PageLayout
//       title="Add Sub Acara"
//       headBackground="blue"
//       action={{
//         show: true,
//         buttonTitle: "Cancel",
//         buttonProps: { onClick: () => navigate(-1) },
//         colorButton: "red",
//       }}
//     >
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4 my-2">
//           <InputGroup
//             disabled={mutation.isPending}
//             type="text"
//             label="Name"
//             variant="outlined"
//             error={errors.name}
//             value={subAcaraBody.name as string}
//             onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//               setSubAcaraBody({ ...subAcaraBody, name: e.target.value })
//             }
//           />
//         </div>

//         <div className="mb-4">
//           <InputGroup
//             disabled={mutation.isPending}
//             type="textarea"
//             label="Description"
//             variant="outlined"
//             error={errors.description}
//             value={subAcaraBody.description}
//             onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
//               setSubAcaraBody({
//                 ...subAcaraBody,
//                 description: e.target.value,
//               })
//             }
//           />
//         </div>

//         {/* <div className="mb-4">
//           <InputGroup
//             disabled={mutation.isPending}
//             type="select"
//             label="Status"
//             value={String(subAcaraBody.isOpenAbsen)}
//             onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
//               setSubAcaraBody({
//                 ...subAcaraBody,
//                 isOpenAbsen: e,
//               });
//             }}
//             error={errors.isOpenAbsen}
//             options={[
//               { value: "", label: "Pilih Status" },
//               { value: "true", label: "Open" },
//               { value: "false", label: "Close" },
//             ]}
//           />
//         </div> */}

//         <div className="flex gap-4 mb-4">
//           <div className="flex-1">
//             <DateTimePicker
//               disabled={mutation.isPending}
//               className="w-full"
//               label="Start Time"
//               value={subAcaraBody.startTime}
//               onChange={(value: Date | null) => {
//                 if (value) {
//                   console.log({ value });
//                   setSubAcaraBody((prev) => ({
//                     ...prev,
//                     startTime: value,
//                   }));
//                 }
//               }}
//               ampm={false}
//               renderInput={(params) => <TextField {...params} />}
//             />
//             <InputGroup error={errors.startTime} />
//           </div>
//           <div className="flex-1">
//             <DateTimePicker
//               disabled={mutation.isPending}
//               className="w-full"
//               label="End Time"
//               value={subAcaraBody.endTime}
//               minDateTime={new Date(subAcaraBody.startTime as string)}
//               onChange={(value: Date | null) => {
//                 if (value) {
//                   setSubAcaraBody((prev) => ({
//                     ...prev,
//                     endTime: value,
//                   }));
//                 }
//               }}
//               ampm={false}
//               renderInput={(params) => <TextField {...params} />}
//             />
//           </div>
//         </div>

//         {/* <div className="flex justify-start items-center my-6">
//           <img
//             src={imageFile as string}
//             alt="SubAcara Image"
//             className="max-w-[200px] h-[200px] max-h-[200px] rounded-md object-cover"
//           />
//         </div> */}
//         {/* <div className="mb-4">
//           <InputGroup
//             disabled={mutation.isPending}
//             id="image-input"
//             type="file"
//             label="Sub Acara Image"
//             variant="outlined"
//             error={errors.image}
//             onChange={onChange}
//           />
//           <CropperImage
//             image={imageFile as ArrayBuffer}
//             isModal={isModal}
//             cropperRef={cropperRef}
//             getCropData={getCropData}
//             hanldeCancelCrop={handleCancelCrop}
//           />
//         </div> */}
//         <div className="flex justify-center items-center gap-5">
//           <Button
//             disabled={mutation.isPending}
//             onClick={handleReset}
//             variant="outlined"
//             fullWidth
//           >
//             Reset
//           </Button>
//           <Button
//             type="submit"
//             variant="gradient"
//             color="blue"
//             fullWidth
//             disabled={mutation.isPending}
//           >
//             {mutation.isPending ? "Loading..." : "Add"}
//           </Button>
//         </div>
//       </form>
//     </PageLayout>
//   );
// };

// export default FormAddSubAcara;

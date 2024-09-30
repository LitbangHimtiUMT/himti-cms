// // import EmptyData from "@features/_global/components/EmptyData";
// // import { SimpleLoadingTable } from "@features/_global/components/SimpleLoadingTable";
// // import {
// //   Table,
// //   TableBody,
// //   TableHead,
// // } from "@features/_global/components/Table";
// // import { formatDate } from "@features/_global/lib/FormatTime";
// // import { Chip } from "@material-tailwind/react";
// // import { TableItem } from "./Table/TableItem";
// import { PageLayout } from "@features/_global/components/PageLayout";
// import { Typography } from "@material-tailwind/react";
// import React from "react";
// import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
// import { useNavigate } from "react-router-dom";
// import "leaflet/dist/leaflet.css";

// const DetailAbsensiContent: React.FC = () => {
//   // const { data: absensiById, isLoading } = useAbsensiById();

//   const navigate = useNavigate();

//   // const { image, name, description, startTime, endTime, isOpenAbsen } = absensiById.data;
//   // if (!isLoading && !absensiById?.data) {
//   //   navigate(-1);
//   //   alert("Sub acara not found");
//   // }

//   return (
//     <PageLayout
//       title="Detail Absensi"
//       action={{
//         show: true,
//         buttonTitle: "Back",
//         buttonProps: { onClick: () => navigate(-1) },
//         colorButton: "white",
//       }}
//     >
//       {/* {isLoading && (
//         <table className="w-full justify-center items-center">
//           <tbody>
//             <SimpleLoadingTable />
//           </tbody>
//         </table>
//       )}
//       {!isLoading && absensiById?.data && ( */}
//       <>
//         {/* <div className="flex flex-col w-full justify-center items-center">
//             <img
//               src={absensiById?.data?.image as string}
//               alt={absensiById?.data?.name as string}
//               className="h-full w-full object-cover max-w-xs rounded-2xl mb-5"
//             />
//             <div className="w-full">
//               <Typography variant="h3" className="mb-2 text-center">
//                 {absensiById?.data?.acara.name} - {absensiById?.data?.subAcara.name}
//               </Typography>
//               <Typography variant="h4" className="mb-2 text-center">
//                 {absensiById?.data?.user.name}
//               </Typography>
//               <Typography className="text-center text-gray-500 mb-1">
//                 Time Absen: {formatDate(absensiById?.data?.createdAt)}
//               </Typography>
//               <Typography></Typography>
//             </div>
//           </div> */}
//         <div className="flex flex-col w-full justify-center items-center">
//           <div className="flex w-full gap-5 mb-5 md:flex-nowrap flex-wrap justify-center">
//             <img
//               src="https://res.cloudinary.com/dgciwba8m/image/upload/v1722570540/acara/1722570540746.png"
//               alt="test"
//               className="h-full w-full object-cover max-w-xs rounded-2xl order-2 md:order-1"
//             />
//             <MapContainer
//               center={[-6.1877531, 106.6647271]}
//               zoom={20}
//               scrollWheelZoom={false}
//               style={{ height: "320px", width: "100%", order: "1" }}
//             >
//               <TileLayer
//                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//               />
//               <Marker position={[-6.1877531, 106.6647271]}>
//                 <Popup>
//                   Jl. Mandiri, Poris Plawad Utara, Kecamatan Cipondoh, Kota
//                   Tangerang, Banten, 15141, Indonesia
//                 </Popup>
//               </Marker>
//             </MapContainer>
//           </div>
//           <div className="w-full">
//             <Typography variant="h3" className="mb-2 text-center">
//               Musang - Test Musang
//             </Typography>
//             <Typography variant="h4" className="mb-2 text-center">
//               Bejir
//             </Typography>
//             <Typography className="text-center text-gray-500 mb-1">
//               Time Added: 02 Agustus 2024, 10.48
//             </Typography>
//             <Typography>
//               Address: Jl. Mandiri, Poris Plawad Utara, Kecamatan Cipondoh, Kota
//               Tangerang, Banten, 15141, Indonesia
//             </Typography>
//           </div>
//         </div>
//       </>
//       {/* )} */}
//     </PageLayout>
//   );
// };

// export default DetailAbsensiContent;

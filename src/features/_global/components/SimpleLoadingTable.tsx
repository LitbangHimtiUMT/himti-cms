import LogoHIMTILoader from "@core/assets/loader/HIMTI.svg";

interface SimpleLoadingProps {
  ColSpan?: number;
}

export const SimpleLoadingTable: React.FC<SimpleLoadingProps> = ({
  ColSpan,
}) => {
  return (
    <tr>
      <td colSpan={ColSpan}>
        <div className="flex items-center justify-center py-10 w-full">
          <img className="h-full w-[100px] object-cover" src={LogoHIMTILoader} alt="Loading..." />
        </div>
      </td>
    </tr>
  );
};

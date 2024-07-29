interface SimpleLoadingProps {
  ColSpan?: number;
}

export const SimpleLoadingTable: React.FC<SimpleLoadingProps> = ({
  ColSpan,
}) => {
  return (
    <tr>
      <td colSpan={ColSpan}>
        <div className="flex items-center justify-center w-full h-[300px]">
          <p>Loading...</p>
        </div>
      </td>
    </tr>
  );
};

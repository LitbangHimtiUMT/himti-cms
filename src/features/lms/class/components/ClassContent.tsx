import { SimpleLoadingTable } from "../../../_global/components/SimpleLoadingTable";
import { MasterTable } from "../../../_global/components/Table/Master";
import { Poppins } from "../../../_global/components/Text";
import { useClasses } from "../hooks/useClass";
import DefaultPhoto from '../../../../core/assets/default-photo.svg'

export const ClassContent = () => {
  const { data: classess, isFetching, isError, refetch } = useClasses({
    ignoreUser: "true",
  });

  if (isFetching) {
    return <SimpleLoadingTable isTable={false} />;
  }

  return (
    <>
      <MasterTable
        title={[
          "Thumbnail",
          "Name",
          "Category",
          "Level",
          "Status",
          "Total Participant",
          "Total Mentor",
          "Created By",
          "Created At",
        ]}
        data={classess?.data || []}
        isError={isError}
        onRetry={() => refetch()}
        columnTable={[
          {
            return: ({ thumbnail }) => (
              <>
                <>
                  <img src={thumbnail} width={150} className="rounded-lg" />
                </>
              </>
            ),
          },
          {
            return: ({ name }) => (
              <>
                <Poppins>{name}</Poppins>
              </>
            ),
          },
          {
            return: ({ category }) => (
              <>
                <Poppins>{category.name}</Poppins>
              </>
            ),
          },
          {
            return: ({ level }) => (
              <>
                <Poppins>{level}</Poppins>
              </>
            ),
          },
          {
            return: ({ status }) => (
              <>
                <Poppins>{status}</Poppins>
              </>
            ),
          },
          {
            return: ({ totalParticipant }) => (
              <>
                <Poppins>{totalParticipant}</Poppins>
              </>
            ),
          },
          {
            return: ({ totalMentor }) => (
              <>
                <Poppins>{totalMentor}</Poppins>
              </>
            ),
          },
          {
            return: ({ creator }) => (
              <>
                <div className="flex items-center gap-2">
                  <img src={creator.photo || DefaultPhoto}
                  onError={(e) => ((e.target as HTMLImageElement).src = DefaultPhoto)}
                  width={30} className="rounded-full" />
                  <Poppins>{creator.name}</Poppins>
                </div>
              </>
            ),
          },
          {
            return: ({ createdAt }) => (
              <>
                <Poppins>{createdAt?.toString()}</Poppins>
              </>
            ),
          },
        ]}
      />
    </>
  );
};

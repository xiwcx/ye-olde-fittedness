import { type NextPage } from "next";
import { ButtonLink } from "~/components/ButtonLink";
import { ListLayout } from "~/components/layouts";
import { ListItem } from "~/components/ListItem";
import { Loading } from "~/components/Loading";
import { Pagination } from "~/components/Pagination";
import { api } from "~/utils/api";
import { usePaginationQueryParams } from "~/utils/hooks";

const { useQuery } = api.exercise.getMany;

const ListExercisesPage: NextPage = () => {
  const { page, limit } = usePaginationQueryParams();
  const { data, isLoading } = useQuery({
    page,
    limit,
  });

  return (
    <ListLayout
      cta={<ButtonLink href="/exercises/add/">Add Exercise</ButtonLink>}
      pagination={
        <Pagination currentPage={page} totalPages={data?.totalPages} />
      }
    >
      {isLoading ? (
        <Loading />
      ) : (
        <ul>
          {data?.exercises?.map((exercise) => (
            <ListItem key={exercise.id}>
              <span>{exercise.name}</span>

              <ButtonLink href={`/exercises/edit/${exercise.id}/`}>
                Edit
              </ButtonLink>
            </ListItem>
          ))}
        </ul>
      )}
    </ListLayout>
  );
};

export default ListExercisesPage;

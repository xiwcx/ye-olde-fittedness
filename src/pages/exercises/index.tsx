import { type NextPage } from "next";
import { ButtonLink } from "~/components/ButtonLink";
import { ListLayout } from "~/components/layouts";
import { ListItem } from "~/components/ListItem";
import { api } from "~/utils/api";

const { useQuery } = api.exercise.getAll;

const ListExercisesPage: NextPage = () => {
  const { data, isLoading } = useQuery();

  return (
    <ListLayout
      CTA={<ButtonLink href="/exercises/add/">Add Exercise</ButtonLink>}
    >
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {data?.map((exercise) => (
            <ListItem key={exercise.id}>
              <span>{exercise.title}</span>

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

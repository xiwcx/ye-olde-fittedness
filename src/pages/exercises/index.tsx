import { type NextPage } from "next";
import { ButtonLink } from "~/components/ButtonLink";
import { api } from "~/utils/api";

const { useQuery } = api.exercise.getAll;

const ListExercisesPage: NextPage = () => {
  const { data, isLoading } = useQuery();

  return (
    <div>
      <header className="mb-4 flex justify-end">
        <ButtonLink href="/exercises/add/">Add Exercise</ButtonLink>
      </header>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {data?.map((exercise) => (
            <li
              className="mb-2 flex items-center justify-between rounded-lg bg-base-200 p-2"
              key={exercise.id}
            >
              <span>{exercise.title}</span>{" "}
              <ButtonLink href={`/exercises/edit/${exercise.id}/`}>
                Edit
              </ButtonLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListExercisesPage;

import { format } from "date-fns";
import { type NextPage } from "next";
import { ButtonLink } from "~/components/ButtonLink";
import { ListLayout } from "~/components/layouts";
import { ListItem } from "~/components/ListItem";
import { Pagination } from "~/components/Pagination";
import { api } from "~/utils/api";

const { useQuery } = api.lift.getAll;

const HomePage: NextPage = () => {
  const { isLoading, data } = useQuery();

  return (
    <ListLayout
      cta={<ButtonLink href="/lifts/add/">Add Lift</ButtonLink>}
      pagination={<Pagination />}
    >
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {data?.map((lift) => (
            <ListItem key={lift.id}>
              <p>
                <span className="font-bold">
                  {format(lift.date, "yyyy-MM-dd")}
                </span>{" "}
                {lift.exercise.name}
              </p>
              <ButtonLink href={`/lifts/edit/${lift.id}`}>Edit Lift</ButtonLink>
            </ListItem>
          ))}
        </ul>
      )}
    </ListLayout>
  );
};

export default HomePage;

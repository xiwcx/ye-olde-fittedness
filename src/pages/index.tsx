import { type NextPage } from "next";
import { type LiftWithExercise } from "~/utils/shapes";
import { format } from "date-fns";
import { ButtonLink } from "~/components/ButtonLink";
import { ListLayout } from "~/components/layouts";
import { ListItem } from "~/components/ListItem";
import { Loading } from "~/components/Loading";
import { Pagination } from "~/components/Pagination";
import { api } from "~/utils/api";
import { usePaginationQueryParams } from "~/utils/hooks";
import { convertFromGrams } from "~/utils/weight";
import { RiEditBoxLine } from "react-icons/ri";

const { useQuery } = api.lift.getMany;

type LiftWithExerciseProps = {
  lift: LiftWithExercise;
};

const LiftWithExercise = ({ lift }: LiftWithExerciseProps) => {
  return (
    <p className="grid flex-grow grid-cols-2 gap-8 md:grid-cols-3">
      <span className="col-span-1 flex flex-col">
        <span className="font-bold">{format(lift.date, "yyyy-MM-dd")}</span>{" "}
        {lift.exercise.name}
      </span>

      <span className="col-span-1 flex flex-col md:grid-cols-2">
        <span className="font-bold">
          {convertFromGrams(lift.weight, "lb")} lb
        </span>
        {lift.setQuantity} x {lift.repQuantity} {lift.attempted && "(A)"}
      </span>
    </p>
  );
};

const HomePage: NextPage = () => {
  const { page, limit } = usePaginationQueryParams();
  const { isLoading, data } = useQuery({ page, limit });

  return (
    <ListLayout
      cta={<ButtonLink href="/lifts/add/">Add Lift</ButtonLink>}
      pagination={
        <Pagination currentPage={page} totalPages={data?.totalPages} />
      }
    >
      {isLoading ? (
        <Loading />
      ) : (
        <ul>
          {data?.lifts?.map((lift) => (
            <ListItem key={lift.id}>
              <LiftWithExercise lift={lift} />
              <ButtonLink href={`/lifts/edit/${lift.id}`}>
                <RiEditBoxLine />
              </ButtonLink>
            </ListItem>
          ))}
        </ul>
      )}
    </ListLayout>
  );
};

export default HomePage;

import { PropsWithChildren } from "~/utils/types";

export const ListItem = ({ children }: PropsWithChildren) => (
  <li className="mb-2 flex items-center justify-between rounded-lg bg-base-200 p-2">
    {children}
  </li>
);

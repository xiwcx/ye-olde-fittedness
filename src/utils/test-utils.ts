import { type ReactElement } from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

/**
 * https://testing-library.com/docs/user-event/intro#writing-tests-with-userevent
 */
function setup(jsx: ReactElement) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
}

export * from "@testing-library/react";
export { setup };

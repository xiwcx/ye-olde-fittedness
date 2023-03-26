import { useState } from "react";
import { fireEvent, render, screen, setup } from "~/utils/test-utils";
import { FieldsetWeight } from "./FieldsetWeight";

const Example = () => {
  const [weightInGrams, setWeightInGrams] = useState(454);

  return (
    <FieldsetWeight onChange={setWeightInGrams} weightInGrams={weightInGrams} />
  );
};

it("has correct default value", () => {
  render(<FieldsetWeight onChange={jest.fn()} weightInGrams={0} />);

  expect(screen.getByRole("option", { name: "lb" })).toHaveAttribute(
    "selected"
  );
  expect(screen.getByRole("option", { name: "kg" })).not.toHaveAttribute(
    "selected"
  );
});

it("converts to grams correctly for lbs", async () => {
  const onChangeMock = jest.fn();
  const { user } = setup(
    <FieldsetWeight onChange={onChangeMock} weightInGrams={0} />
  );

  await user.type(screen.getByRole("textbox"), "1");

  expect(onChangeMock).toHaveBeenCalledTimes(1);
  expect(onChangeMock).toHaveBeenCalledWith(454);
});

it("converts to grams correctly for kgs", async () => {
  const onChangeMock = jest.fn();
  const { user } = setup(
    <FieldsetWeight onChange={onChangeMock} weightInGrams={0} />
  );

  fireEvent.change(screen.getByRole("combobox"), {
    target: { value: "kg" },
  });

  expect(onChangeMock).toHaveBeenCalledTimes(1);

  await user.type(screen.getByRole("textbox"), "1");

  expect(onChangeMock).toHaveBeenCalledTimes(2);
  expect(onChangeMock).toHaveBeenCalledWith(1000);
});

it("maintains display value when switching units", () => {
  render(<Example />);

  expect(screen.getByRole("textbox")).toHaveValue("1");

  fireEvent.change(screen.getByRole("combobox"), {
    target: { value: "kg" },
  });

  expect(screen.getByRole("textbox")).toHaveValue("1");
});

it("handles multiple keystokes correctly", async () => {
  const { user } = setup(<Example />);

  await user.type(screen.getByRole("textbox"), "000");

  expect(screen.getByRole("textbox")).toHaveValue("1000");
});

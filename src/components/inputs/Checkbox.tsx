type CheckboxProps = {
  disabled?: boolean;
  checked?: boolean;
};

export const Checkbox = ({ disabled = false, checked }: CheckboxProps) => {
  return (
    <input
      type="checkbox"
      disabled={disabled}
      checked={checked}
      className="checkbox"
    />
  );
};

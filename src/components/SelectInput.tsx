import Select from "react-select";

interface SelectInputProps extends Omit<React.ComponentProps<typeof Select>, "onChange"> {
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}

export const SelectInput = ({ value, options, onChange, onInputChange }: SelectInputProps) => (
  <Select
    options={options}
    classNames={{
      control: () => "input input-bordered bg-opacity-60",
      valueContainer: () => "h-full",
    }}
    components={{
      IndicatorSeparator: () => null,
      IndicatorsContainer: () => null,
    }}
    theme={(theme) => ({
      ...theme,
      borderRadius: 8,
      colors: {
        ...theme.colors,
        primary: "#66cc8a",
      },
    })}
    value={options.find((option) => option.value === value)}
    placeholder="Start typing..."
    onChange={(e) => e && e?.value && onChange(e.value)}
    onInputChange={onInputChange}
  />
);

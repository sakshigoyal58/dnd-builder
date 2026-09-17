import PropertyField from "./PropertyField";

type NumberPropertyFieldProps = {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
};

function NumberPropertyField({
  id,
  label,
  value,
  min,
  max,
  onChange,
}: NumberPropertyFieldProps) {
  return (
    <PropertyField label={label} htmlFor={id}>
      <input
        id={id}
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
      />
    </PropertyField>
  );
}

export default NumberPropertyField;

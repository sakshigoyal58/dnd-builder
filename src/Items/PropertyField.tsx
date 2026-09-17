import type { ReactNode } from "react";

type PropertyFieldProps = {
  label: string;
  htmlFor?: string;
  children: ReactNode;
};

function PropertyField({
  label,
  htmlFor,
  children,
}: PropertyFieldProps) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1 block text-xs font-medium text-slate-600"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

export default PropertyField;

import { useState } from "react";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "./ui/select";

export default function SelectPair({
  name,
  required,
  label,
  description,
  placeholder,
  options,
}: {
  label: string;
  description: string;
  name: string;
  required?: boolean;
  placeholder: string;
  options: {
    label: string;
    value: string;
  }[];
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-2 flex flex-col">
      <Label
        className="space-y-2 flex flex-col w-full items-baseline"
        onClick={() => setOpen(true)}
      >
        {label}
        <small className="text-muted-foreground">{description}</small>
      </Label>
      <Select
        open={open}
        onOpenChange={setOpen}
        name={name}
        required={required}
      >
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

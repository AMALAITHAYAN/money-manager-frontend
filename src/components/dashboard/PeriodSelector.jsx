import Select from "../common/Select";
import { PERIODS } from "../../utils/constants";

export default function PeriodSelector({ value, onChange }) {
  return (
    <Select label="Period" value={value} onChange={(e) => onChange(e.target.value)}>
      {PERIODS.map((p) => (
        <option key={p} value={p}>
          {p}
        </option>
      ))}
    </Select>
  );
}

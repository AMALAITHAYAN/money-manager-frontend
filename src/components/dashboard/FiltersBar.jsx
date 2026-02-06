import Select from "../common/Select";
import { DIVISIONS } from "../../utils/constants";

export default function FiltersBar({ division, setDivision }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:max-w-md">
      <Select label="Division" value={division} onChange={(e) => setDivision(e.target.value)}>
        {DIVISIONS.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </Select>
    </div>
  );
}

import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { cn } from "../helpers/utils";

type ItemProp = {
  value: number;
  bgcolor: string;
  onAdd?: () => void;
  onRemove?: () => void | number;
};

const StructureItem = ({ value, bgcolor, onAdd, onRemove }: ItemProp) => {
  const [opacity, setOpacity] = useState("30");

  return (
    <div
      onMouseEnter={() => setOpacity("80")}
      onMouseLeave={() => setOpacity("30")}
      style={{ backgroundColor: `${bgcolor}${opacity}` }}
      className={cn("relative flex h-12 w-full", "text-xl")}
    >
      {(onAdd || onRemove) && (
        <>
          <button
            className={cn(
              "flex h-full w-full items-center justify-center",
              "bg-emerald-800 hover:cursor-pointer hover:bg-emerald-700",
            )}
            onClick={onAdd}
          >
            <Plus size={40} />
          </button>
          <button
            className={cn(
              "flex h-full w-full items-center justify-center",
              "bg-amber-800 hover:cursor-pointer hover:bg-amber-700",
            )}
            onClick={onRemove}
          >
            <Minus size={40} />
          </button>
        </>
      )}
      <h1 className="pointer-events-none absolute flex h-full w-full items-center justify-center">
        {value}
      </h1>
    </div>
  );
};

export default StructureItem;

import { useState } from "react";
import { cn } from "../helpers/utils";
import type DataStructure from "../structures/DataStructure";

type ItemProp = {
  value: number;
  bgcolor: string;
};

const StructureItem = ({ value, bgcolor }: ItemProp) => {
  const [opacity, setOpacity] = useState("30");
  return (
    <div
      onMouseEnter={() => setOpacity("80")}
      onMouseLeave={() => setOpacity("30")}
      style={{ backgroundColor: `${bgcolor}${opacity}` }}
      className={cn(
        "flex h-full w-full items-center justify-center",
        "transition-colors duration-300",
        "text-2xl text-slate-300",
      )}
    >
      {value}
    </div>
  );
};

const StructureContainer = ({ structure }: { structure: DataStructure }) => {
  return (
    <div className="flex h-200 w-90 flex-col items-center justify-center text-slate-300 md:h-[90%]">
      <div className="flex w-full flex-row justify-between bg-stone-700">
        <h1 className="w-[60%] text-center text-3xl font-semibold">
          {structure.name}
        </h1>
        <div className="flex w-[40%] justify-between text-slate-300">
          <button className="w-full hover:cursor-pointer hover:bg-stone-600">
            +
          </button>
          <button className="w-full hover:cursor-pointer hover:bg-stone-600">
            -
          </button>
        </div>
      </div>
      {[...structure.get()].reverse().map((val) => (
        <StructureItem
          key={val}
          value={val}
          bgcolor={structure.associatedColor}
        />
      ))}
    </div>
  );
};

export default StructureContainer;

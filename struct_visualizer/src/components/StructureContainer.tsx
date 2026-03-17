import { useState } from "react";
import type DataStructure from "../structures/DataStructure";
import StructureItem from "./StructureItem";

const StructureContainer = ({ structure }: { structure: DataStructure }) => {
  const [list, setList] = useState([...structure.get()]);

  const handleAdd = () => {
    const nextValue = list[list.length - 1] + 1;
    structure.push(nextValue);
    setList((prev) => [...prev, nextValue]);
  };

  const handleRemove = () => {
    structure.pop();
    setList((prev) => prev.slice(0, -1));
  };

  return (
    <div className="flex w-90 flex-col items-center justify-center bg-stone-700 text-slate-300 md:h-[90%]">
      <h1 className="w-3/5 py-2 text-center text-3xl font-semibold">
        {structure.name}
      </h1>
      {[...list].reverse().map((val, index) => (
        <StructureItem
          key={val}
          value={val}
          onAdd={structure.shouldShowAdd(index) ? handleAdd : undefined}
          onRemove={
            structure.shouldShowRemove(index) ? handleRemove : undefined
          }
          bgcolor={structure.associatedColor}
        />
      ))}
    </div>
  );
};

export default StructureContainer;

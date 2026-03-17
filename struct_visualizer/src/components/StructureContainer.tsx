import type DataStructure from "../structures/DataStructure";

const StructureItem = ({ entry }: { entry: number }) => {
  return <div className="flex h-full w-full">{entry}</div>;
};

type StructureContainerProp = {
  structure: DataStructure;
};

const StructureContainer = ({ structure }: StructureContainerProp) => {
  return (
    <div className="flex h-full w-full flex-col">
      {structure.get().map((val) => (
        <StructureItem key={val} entry={val} />
      ))}
    </div>
  );
};

export default StructureContainer;

import type SortAlgorithm from "../algos/SortAlgorithm";
import "../styles/AlgoList.css";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export type ListItemProps = {
  algo: SortAlgorithm;
};

const AlgoItem = ({ algo }: ListItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: algo.name
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="algoItem">
      <span className="algoItemName" style={{ color: algo.chartColor }}>
        {algo.name}
      </span>
      <span className="algoItemComplexity">{algo.expectedBigO}</span>
    </div>
  );
};

export default AlgoItem;

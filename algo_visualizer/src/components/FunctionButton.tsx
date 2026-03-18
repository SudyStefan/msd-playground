import { cn } from "../helpers/utils";

type FunctionButtonProps = {
  onClick: () => void;
  isDisabled: boolean;
  text: string;
};

const FunctionButton = (props: FunctionButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      disabled={props.isDisabled}
      className={cn(
        "w-full bg-slate-700 text-slate-300",
        "rounded-sm text-2xl font-medium",
        "my-2 py-2",
        "hover:cursor-pointer hover:bg-slate-600",
      )}
    >
      {props.text}
    </button>
  );
};

export default FunctionButton;

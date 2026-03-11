import type { Site } from "./App";
import { cn } from "../helpers/utils";

const SiteCard = ({ name, description, logoName, indexPath }: Site) => {
  return (
    <div className="flex w-full justify-center">
      <a
        className={cn(
          "flex w-100 items-center justify-center",
          "rounded-xl border border-amber-100 bg-stone-600",
          "pt-5 pr-3 pb-5 shadow-sm",
          "transition-all duration-200 ease-in-out",
          "hover:scale-105 hover:shadow-lg",
        )}
        href={indexPath}
      >
        <div className="flex h-30 w-full basis-2/5 justify-center">
          <img alt={`${name} Logo`} src={logoName} />
        </div>
        <div className="flex w-full basis-3/5 flex-col flex-wrap">
          <div className="flex basis-1/5">
            <h1 className="pb-5 text-center text-2xl font-bold text-slate-400">
              {name}
            </h1>
          </div>

          <div className="basis-4/5">
            <p className="font-semibold text-slate-400">{description}</p>
          </div>
        </div>
      </a>
    </div>
  );
};

export default SiteCard;

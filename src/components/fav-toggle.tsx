import { HeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutlineIcon } from "@heroicons/react/24/outline";

type Props = {
  isFavorite?: boolean;
  onClick?: () => void;
};

const FavToggle = ({ isFavorite = false, onClick }: Props) => {
  return (
    <button onClick={onClick}>
      {isFavorite ? (
        <HeartIcon className="h-8" />
      ) : (
        <HeartOutlineIcon className="h-8" />
      )}
    </button>
  );
};

export default FavToggle;

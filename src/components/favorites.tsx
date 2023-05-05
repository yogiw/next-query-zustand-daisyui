import {
  TrashIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/solid";
import { queryKeys } from "@/apis/query-keys";
import { useFavorite } from "@/stores/use-favorite";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useState } from "react";

const Favorites = () => {
  const [userIds, setUserIds] = useState<number[]>([]);
  const { userIds: usersIdsStore, toggle } = useFavorite();
  const users = useQuery(queryKeys.users.list());

  useEffect(() => {
    if (usersIdsStore.length) {
      setUserIds(usersIdsStore);
    }
  }, [usersIdsStore]);

  return (
    <>
      <label htmlFor="my-modal-4" className="btn">
        Favorites
      </label>
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <label
            htmlFor="my-modal-4"
            className="btn-sm btn-circle btn absolute right-2 top-2"
          >
            ✕
          </label>

          <h3 className="text-lg font-bold">Favorites</h3>
          <ul>
            {userIds.map((userId) => {
              const user = users.data?.find((user) => user.id === userId);
              return (
                <li
                  key={userId}
                  className="border-base-500 flex items-center border-gray-800 py-5"
                >
                  <p className="flex-1">
                    {user?.name} - @{user?.username.toLowerCase()}
                  </p>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggle(userId);
                    }}
                  >
                    <TrashIcon className="h-5" />
                  </button>
                  <Link
                    href={`/${userId}`}
                    className="ml-4"
                    onClick={() =>
                      document.getElementById("my-modal-4")?.click()
                    }
                  >
                    <ArrowTopRightOnSquareIcon className="h-5" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </label>
      </label>
    </>
  );
};

export default Favorites;

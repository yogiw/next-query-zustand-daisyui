import { createQueryKeyStore } from "@lukemorales/query-key-factory";
import { getUsers } from "./users";
import { getUser } from "./user-detail";

export const queryKeys = createQueryKeyStore({
  users: {
    detail: (userId: number) => ({
      queryKey: ["users", userId],
      queryFn: () => getUser(userId),
    }),
    list: () => ({
      queryKey: ["users"],
      queryFn: () => getUsers(),
    }),
  },
});

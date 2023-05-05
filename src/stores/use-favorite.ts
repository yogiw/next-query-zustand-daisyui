import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface FavoriteState {
  _hasHydrated: boolean;
  userIds: number[];
  toggle: (userId: number) => void;
  setHydrate: (state: boolean) => void;
}

export const useFavorite = create<FavoriteState>()(
  devtools(
    persist(
      (set) => ({
        _hasHydrated: false,
        setHydrate: (val) => set(() => ({ _hasHydrated: val })),
        userIds: [],
        toggle: (userId) =>
          set((state) => {
            const isExist = state.userIds.includes(userId);
            if (!isExist) {
              return { userIds: [...state.userIds, userId] };
            }

            return { userIds: state.userIds.filter((id) => id !== userId) };
          }),
      }),
      {
        name: "users-storage",
        onRehydrateStorage: () => (state) => {
          state?.setHydrate(true);
        },
      }
    )
  )
);

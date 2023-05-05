import {
  PhoneIcon,
  EnvelopeOpenIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";
import { queryKeys } from "@/apis/query-keys";
import Header from "@/components/header";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import type {
  InferGetServerSidePropsType,
  NextPage,
  NextPageContext,
} from "next";
import Head from "next/head";
import FavToggle from "@/components/fav-toggle";
import { useFavorite } from "@/stores/use-favorite";
import { useEffect, useState } from "react";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const UserDetail: NextPage<Props> = ({ userId }) => {
  const user = useQuery(queryKeys.users.detail(userId));
  const { userIds, toggle } = useFavorite();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (userIds.includes(userId)) {
      return setIsFavorite(true);
    }
    return setIsFavorite(false);
  }, [userIds, userIds.length, setIsFavorite, userId]);

  return (
    <>
      <Head>
        <title>Next Demo</title>
        <meta name="description" content="Next Demo" />
        <link rel="icon" href="https://fav.farm/️️😇" />
      </Head>
      <Header />
      <main className="container card card-body mx-auto mt-5 bg-base-200">
        <div className="flex justify-between">
          <h1 className="text-xl">
            {user.data?.name} - {user.data?.username}
          </h1>
          <FavToggle isFavorite={isFavorite} onClick={() => toggle(userId)} />
        </div>
        <p className="flex items-center">
          <PhoneIcon className="mr-2 h-4" /> {user.data?.phone}
        </p>
        <p className="flex items-center">
          <EnvelopeOpenIcon className="mr-2 h-4" />
          {user.data?.email}
        </p>
        <p className="flex items-center">
          <MapPinIcon className="mr-2 h-4" />
          {user.data?.address.street}, {user.data?.address.suite},
          {user.data?.address.city}, {user.data?.address.zipcode}
        </p>
      </main>
    </>
  );
};

export const getServerSideProps = async (context: NextPageContext) => {
  const userId = parseInt(context.query.userId?.toString() ?? "1");

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(queryKeys.users.detail(userId));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      userId,
    },
  };
};
export default UserDetail;

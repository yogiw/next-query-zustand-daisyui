import { PhoneIcon, EnvelopeOpenIcon } from "@heroicons/react/24/solid";
import { queryKeys } from "@/apis/query-keys";
import Header from "@/components/header";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import type { InferGetServerSidePropsType, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useMemo } from "react";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const Home: NextPage<Props> = () => {
  const users = useQuery(queryKeys.users.list());

  const usersSorted = useMemo(() => {
    if (!users.data) return [];
    return users.data.sort((a, b) => a.name.localeCompare(b.name));
  }, [users.data]);

  return (
    <>
      <Head>
        <title>Next Demo</title>
        <meta name="description" content="Next Demo" />
        <link rel="icon" href="https://fav.farm/️️😇" />
      </Head>
      <Header />
      <main className="container mx-auto mt-5">
        <h1 className="text-2xl">Users Directory</h1>
        <div className="mt-5 flex flex-col gap-5">
          {usersSorted.map((user) => (
            <Link
              href={`/${user.id}`}
              key={user.id}
              className="card bg-base-200 shadow-xl"
            >
              <div className="card-body">
                <h2 className="card-title">
                  {user.name} - @{user.username.toLowerCase()}
                </h2>
                <div className="flex justify-between">
                  <p className="flex items-center">
                    <PhoneIcon className="mr-2 h-4" />
                    {user.phone}
                  </p>
                  <p className="flex items-center justify-end">
                    <EnvelopeOpenIcon className="mr-2 h-4" />
                    {user.email}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
};

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(queryKeys.users.list());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
export default Home;

import Head from "next/head";

import { api } from "@/utils/api";
import { PREVENT_TRPC_FETCH } from "@/utils/constants";
import { useState } from "react";
import { type Response } from "@/utils/types";
import { LoadingRelative } from "@/components/Loading";
import ErrorMessage from "@/components/ErrorMessage";

enum Status {
  IDLE,
  LOADING,
  SUCCESS,
  ERROR,
}

export default function Home() {
  const [status, setStatus] = useState<Status>(Status.IDLE);
  const [text, setText] = useState<string>("");
  const [data, setData] = useState<Response>();

  // tRPC Query
  const { refetch } = api.test.get.useQuery({ text }, PREVENT_TRPC_FETCH);

  // Refetch the query
  async function onClick() {
    const res = await refetch();

    setStatus(res.error ? Status.ERROR : Status.SUCCESS);
    setData(res.data);
  }

  return (
    <>
      <Head>
        <title>tRPC Template</title>
        <meta name="description" content="tRPC Template for Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-col items-center justify-center text-black">
        <input
          className="border border-black px-4 py-3"
          placeholder="Enter text"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className="m-2 border border-black px-4 py-3 duration-300 ease-in-out hover:bg-black hover:text-white"
          onClick={async () => await onClick()}
        >
          Fetch data
        </button>

        {status === Status.LOADING && <LoadingRelative />}

        {status === Status.SUCCESS && (
          <p className="mt-3">
            <strong>Response data:</strong> {data?.result}
          </p>
        )}

        {status === Status.ERROR && (
          <ErrorMessage>An error has occurred.</ErrorMessage>
        )}
      </main>
    </>
  );
}

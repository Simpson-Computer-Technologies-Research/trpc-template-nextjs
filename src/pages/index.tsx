import { api } from "@/lib/utils/api";
import { useState } from "react";
import ErrorMessage from "@/components/ErrorMessage";
import MainWrapper from "@/components/MainWrapper";
import PageHead from "@/components/PageHead";
import Button from "@/components/buttons/Button";
import { LoadingSpinner } from "@/components/LoadingSpinner";

/**
 * Status enum
 */
enum Status {
  IDLE,
  LOADING,
  SUCCESS,
  ERROR,
}

/**
 * Home page
 *
 * @returns JSX.Element
 */
export default function Home(): JSX.Element {
  const [status, setStatus] = useState<Status>(Status.IDLE);
  const [text, setText] = useState<string>("");
  const [data, setData] = useState<{ result: string }>();

  // tRPC Mutation
  const { mutateAsync: fetchData } = api.test.testMutate.useMutation();

  /**
   * Fetch data
   *
   * @returns Promise<void>
   */
  async function onClick(): Promise<void> {
    setStatus(Status.LOADING);

    const res = await fetchData({
      text,
    });

    setStatus(Status.SUCCESS);
    setData(res);
  }

  return (
    <>
      <PageHead
        title="tRPC Next.js Example"
        description="tRPC Next.js Example"
      />

      <MainWrapper className="gap-4">
        <div className="flex flex-col gap-1 text-center">
          <h1 className="text-3xl font-bold">tRPC Template</h1>
          <p className="text-lg">
            This is a template for building fullstack TypeScript applications
            with tRPC.
          </p>
        </div>

        <input
          className="w-full rounded-lg border-2 p-3"
          placeholder="Enter text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <Button className="w-full" onClick={onClick}>
          Fetch Data
        </Button>

        {status === Status.LOADING && <LoadingSpinner className="h-7 w-7" />}
        {status === Status.SUCCESS && <p>{data?.result}</p>}
        {status === Status.ERROR && <ErrorMessage>Error!</ErrorMessage>}
      </MainWrapper>
    </>
  );
}

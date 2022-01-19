import type { NextPage } from "next";
import Head from "next/head";
import TodoList from "../components/TodoList";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Todo App</title>
      </Head>
      <main className="bg-transparent">
        <div className="m-3">
          <TodoList />
        </div>
      </main>

      {/* <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer> */}
    </>
  );
};

export default Home;

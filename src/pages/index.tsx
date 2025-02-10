import Head from "next/head";
import { Header } from "~/components/header";
import { MethodicalMaterials } from "~/components/pages/index/methodical-materials";
import { NewsFeed } from "~/components/pages/index/news-feed";

import { api } from "~/utils/api";

export default function Home() {
  const hello = api.post.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>ИнфоИркутск</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen bg-white">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <NewsFeed />
          <MethodicalMaterials />
        </main>
      </div>
    </>
  );
}

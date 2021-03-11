import Head from "next/head";
import { useQuery } from "react-query";
import { request, gql } from "graphql-request";
import { Dog } from "../types";

// TODO: move to constants file
const endpoint = "https://formidadog-ql.netlify.app/graphql";

export default function Home() {
  const { data } = useQuery("dogs", async () => {
    return await request(
      endpoint,
      gql`
        query {
          dogs {
            name
            key
            imageUrl
            likes
          }
        }
      `
    );
  });

  return (
    <div className="bg-primary-100 py-12">
      <Head>
        <title>Formidadogs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container px-4 mx-auto">
        <h1 className="text-primary-500 py-4 mb-12 text-2xl font-bold border-b border-gray-100">
          Formidadogs
        </h1>
        <div className="grid grid-cols-3 auto-cols-fr gap-6">
          {data?.dogs.map((dog: Dog) => {
            return (
              <div className="bg-white p-8 rounded">
                <h1 className="text-secondary" key={dog.key}>
                  {dog.name}
                </h1>
                <img src={dog.imageUrl} />
                <p>Likes: {dog.likes}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

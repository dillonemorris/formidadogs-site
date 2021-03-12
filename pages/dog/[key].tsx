import React from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import request, { gql } from "graphql-request";
import { ENDPOINT } from "../../constants";

const DOG_QUERY = gql`
  query Dog($key: ID!) {
    dog(key: $key) {
      name
      key
      likes
      imageUrl
    }
  }
`;

const Dog = () => {
  const router = useRouter();
  const { key } = router.query;
  const { data } = useQuery(["dog", { key }], async () => {
    return await request(ENDPOINT, DOG_QUERY, { key });
  });

  return (
    <div>
      <h1>{data?.dog.name}</h1>
    </div>
  );
};

export default Dog;

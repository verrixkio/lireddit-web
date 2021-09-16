import { NavBar } from "../components/NavBar";
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from "../utils/createUrqlClients";
import { usePostsQuery } from "../generated/graphql";
import React from "react";
import { Layout } from "../components/Layout";
import { Box, Heading, Link, Stack, Text } from "@chakra-ui/layout";
import NextLink from "next/link"

const Index = () => {
  const [{ data }] = usePostsQuery({
    variables: {
      limit: 10,
      cursor: '',
    },
  })
  return (
    <Layout>
      <NextLink href="/create-post">
        <Link>Create Post</Link>
      </NextLink>
      <br></br>
      {!data ? (
        <div>loading posts...</div>
      ) : (
        <Stack spacing={8}>
          {data.posts.map((p) => (
            <Box key={p.id} p={5} shadow="md" borderWidth="1px">
              <Heading fontSize="xl">{p.title}</Heading>
              <Text mt={4}>{p.text.slice(0, 50)}...</Text>
            </Box>
          ))}
        </Stack>
      )}
    </Layout>
  )
}
export default withUrqlClient(createUrqlClient, { ssr: true })(Index)

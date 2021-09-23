import { NavBar } from "../components/NavBar";
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from "../utils/createUrqlClients";
import { usePostsQuery } from "../generated/graphql";
import React from "react";
import { Layout } from "../components/Layout";
import { Box, Flex, Heading, Link, Stack, Text } from "@chakra-ui/layout";
import NextLink from "next/link"
import { Button } from "@chakra-ui/button";
import { useState } from "react";

const Index = () => {
  const [variables, setVariables] = useState({ limit: 10, cursor: '' as any, })
  const [{ data, fetching }] = usePostsQuery({
    variables,
  })

  if (!fetching && !data) {
    return <div> Query Failed</div>
  }

  return (
    <Layout>
      <Flex align='center'>
        <Heading>Lireddit</Heading>
        <NextLink href="/create-post">
          <Link ml="auto">Create Post</Link>
        </NextLink>
      </Flex>
      <br></br>
      {!data && fetching ? (
        <div>loading posts...</div>
      ) : (
        <Stack spacing={8}>
          {data!.posts.map((p) => (
            <Box key={p.id} p={5} shadow="md" borderWidth="1px">
              <Heading fontSize="xl">{p.title}</Heading>
              <Text mt={4}>{p.textSnippet}...</Text>
            </Box>
          ))}
        </Stack>
      )}
      {data ? (
        <Flex>
          <Button onClick={() => {
            setVariables({
              limit: variables.limit,
              cursor: data.posts[data.posts.length - 1].createdAt,
            })
          }} isLoading={fetching} m="auto" my={4}>Load more</Button>
        </Flex>) : null}
    </Layout>
  )
}
export default withUrqlClient(createUrqlClient, { ssr: true })(Index)

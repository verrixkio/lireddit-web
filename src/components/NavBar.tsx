import { Box, Button, Flex, Link } from '@chakra-ui/react';
import React from 'react'
import NextLink from "next/link"
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { isServer } from '../utils/isServer';

interface NavBarProps { }

export const NavBar: React.FC<NavBarProps> = ({ }) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer()
  });
  let body = null

  // data is loading
  if (fetching) {

    //User not logged in
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="login">
          <Link mr={3}>Login</Link>
        </NextLink>
        <NextLink href="register">
          <Link>Register</Link>
        </NextLink>
      </>
    )

    //User logged in
  } else {
    body = (

      <Flex>
        <Box mr={3}>Hi {data.me.username}</Box>
        <Button onClick={() => {
          logout();
        }}
          isLoading={logoutFetching}
          variant="link">Logout</Button>
      </Flex>
    )
  }


  return (
    <Flex zIndex={1} position="sticky" top={0}>
      <Box bg='tomato' p={4} ml={'auto'}>
        {body}
      </Box>
    </Flex>
  );
}
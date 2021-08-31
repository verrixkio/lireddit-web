import { Box, Flex, Link } from '@chakra-ui/react';
import React from 'react'
import NextLink from "next/link"

interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = ({ }) => {
  return (
    <Flex>
      <Box bg='tomato' p={4} ml={'auto'}>
        <NextLink href="login">
          <Link mr={3}>Login</Link>
        </NextLink>
        <NextLink href="register">
          <Link>Register</Link>
        </NextLink>
      </Box>
    </Flex>
  );
}
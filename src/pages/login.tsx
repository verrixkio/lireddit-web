import React from 'react'
import { Formik, Form } from 'formik'
import { Link, Box, Button, Flex } from '@chakra-ui/react';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from "next/router"
import { createUrqlClient } from '../utils/createUrqlClients';
import { withUrqlClient } from 'next-urql';
import NextLink from 'next/link'

export const Login: React.FC<{}> = ({ }) => {
  const router = useRouter()
  const [, login] = useLoginMutation();
  return (
    <Wrapper variant='small'>
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login(values)
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors))
          } else if (response.data?.login.user) {
            //worked
            if (typeof router.query.next === 'string') {
              router.push(router.query.next)
            } else {
              router.push("/")

            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="usernameOrEmail"
              placeholder="username or email"
              label="Username Or Email"
            />
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
            </Box>
            <Flex>
              <NextLink href="/forgot-password">
                <Link mt={2} ml='auto'>forgot password?</Link>
              </NextLink>
            </Flex>
            <Button
              mt={4}
              mr={3}
              colorScheme="teal"
              type="submit"
              isLoading={isSubmitting}
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>

  );
}

export default withUrqlClient(createUrqlClient)(Login);
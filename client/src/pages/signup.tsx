import { Box, Button, Text, Link, Center, Heading } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { FC } from "react";
import AuthLayout from "../components/AuthLayout";
import InputField from "../components/InputField";
import { useRegisterMutation } from "../generated/graphql";
import createUrqlClient from "../utils/createUrqlClient";
import { getErrorMessage } from "../utils/getErrorMessage";
import NextLink from "next/link";
import { useMeQuery } from "../generated/graphql";

const SignUp: FC = ({}) => {
  const router = useRouter();
  const [{ data, fetching }] = useMeQuery();
  if (data?.me) router.replace("/");

  const [, register] = useRegisterMutation();

  if (!fetching && !data?.me)
    return (
      <AuthLayout>
        <Center h={{ base: "60px", md: 20 }}>
          <Heading>Sign Up</Heading>
        </Center>
        <Formik
          initialValues={{ email: "", name: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            const response = await register({ input: values });
            if (response.error) {
              const errorMessage = getErrorMessage(response.error);
              if (errorMessage) setErrors(errorMessage);
            } else if (response.data?.register._id) router.replace("/");
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Box m={3}>
                <InputField
                  name="email"
                  placeholder="e.g. johndoe@example.com"
                  label="Email"
                  type="email"
                />
              </Box>
              <Box m={3}>
                <InputField
                  name="name"
                  placeholder="e.g. John Doe"
                  label="Name"
                />
              </Box>
              <Box m={3}>
                <InputField
                  name="password"
                  placeholder="********"
                  label="Password"
                  type="password"
                  autoComplete="on"
                />
              </Box>
              <Box mx={3} mt={5} mb={3}>
                <Button
                  type="submit"
                  colorScheme="pink"
                  isLoading={isSubmitting}
                  width="100%"
                >
                  Sign Up
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
        <Box mx={3}>
          <Text>
            Already have an account?{" "}
            <NextLink href="/login">
              <Link color="blue.600">Log in.</Link>
            </NextLink>
          </Text>
        </Box>
      </AuthLayout>
    );
  return null;
};

export default withUrqlClient(createUrqlClient)(SignUp);

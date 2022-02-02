import { Box, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { FC } from "react";
import InputField from "../components/InputField";
import Layout from "../components/Layout";
import { useLoginMutation } from "../generated/graphql";
import createUrqlClient from "../utils/createUrqlClient";
import { getErrorMessage } from "../utils/getErrorMessage";

const Login: FC = ({}) => {
  const router = useRouter();
  const [, login] = useLoginMutation();

  return (
    <Layout>
      <Box maxW="sm" borderWidth="1px" m="auto" mt={200} px={5} py={10}>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            const response = await login({ input: values });
            console.log(response.error);
            if (response.error) {
              const errorMessage = getErrorMessage(response.error);
              if (errorMessage) setErrors(errorMessage);
            } else if (response.data?.login._id) router.push("/");
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Box m={3}>
                <InputField
                  name="email"
                  placeholder="e.g. johndoe@example.com"
                  label="Email"
                />
              </Box>
              <Box m={3}>
                <InputField
                  name="password"
                  placeholder="********"
                  label="Password"
                  type="password"
                />
              </Box>
              <Box mx={3} mt={5} mb={3}>
                <Button
                  type="submit"
                  colorScheme="teal"
                  isLoading={isSubmitting}
                  width="100%"
                >
                  Login
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
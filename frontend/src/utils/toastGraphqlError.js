import { toast } from "react-toastify";

export const toastGraphqlError = (graphQLErrors) => {
  return graphQLErrors?.map((error) => toast.error(`${error?.message}`));
};

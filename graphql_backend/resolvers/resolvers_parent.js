import { delete_job_handler, handle_save_job } from "./job_resolvers.js";
import {
  get_user_resolver,
  handle_user_register,
  handle_user_signin,
  update_user_profile,
} from "./user_resolvers.js";

export const resolvers = {
  Query: {
    get_user: get_user_resolver,
  },

  Mutation: {
    register_user: handle_user_register,
    signin_user: handle_user_signin,
    save_job: handle_save_job,
    delete_job: delete_job_handler,
    update_profile: update_user_profile,
  },
};

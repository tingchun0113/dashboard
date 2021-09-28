import { apiHelper } from './../utils/helpers';

export default {
  logIn({ username, password, otpToken }) {
    return apiHelper.post('/login', {
      username,
      password,
      otpToken,
    });
  },
};

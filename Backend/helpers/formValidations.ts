export function signupValidator(data: signUpData) : boolean {
  const username = /^[A-Za-z]+$/i.test(data.username);
  const email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email);
  const password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(data.password);
  const confirmPassword = data.password === data.confirmPassword;

  return username && email && password && confirmPassword
}

type signUpData = {
  username: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

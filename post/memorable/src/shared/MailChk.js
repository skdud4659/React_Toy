export const emailCheck = (email) => {
  let _reg = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9]+$/;

  return _reg.test(email);
};

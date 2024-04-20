const extractUsernameFromEmail = (email: string | null): string => {
  if (!email) {
    return "user";
  }

  console.log("email", email);

  return email?.split("@")[0];
};

export { extractUsernameFromEmail };

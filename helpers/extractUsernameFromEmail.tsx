const extractUsernameFromEmail = (email: string | null): string => {
  if (!email) {
    return 'user';
  }

  return email?.split('@')[0];
};

export { extractUsernameFromEmail };

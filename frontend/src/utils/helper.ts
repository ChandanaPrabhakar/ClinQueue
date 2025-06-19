export const validateEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^s@]+$/;
  return regex.test(email);
};

export const getInitials = (fullname: string) => {
  if (!fullname) return "";

  const words = fullname.trim().split(" ");
  let initials = "";

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0];
  }

  return initials.toUpperCase();
};

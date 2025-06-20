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

export const getDoctorInitials = (fullname: string): string => {
  if (!fullname) return "";

  const cleanedName = fullname.replace(/^(Dr\.)\s*/i, "").trim();

  const nameParts = cleanedName.split(" ");

  const firstInitial = nameParts[0]?.[0] ?? "";
  const secondInitial = nameParts[1]?.[0] ?? "";

  return (firstInitial + secondInitial).toUpperCase();
};

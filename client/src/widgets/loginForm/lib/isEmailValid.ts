export default function isEmailValid(email: string) {
  const minDomainLength = 2;
  const maxDomainLength = 4;

  const emailRegex = new RegExp(
    `^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{${minDomainLength},${maxDomainLength}}$`,
  );

  return emailRegex.test(email);
}

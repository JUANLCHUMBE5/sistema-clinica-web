export function isEmailValide(email: string): boolean {
  const patron = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/
  return patron.test(email);
}
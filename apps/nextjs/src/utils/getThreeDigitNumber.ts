export const getThreeDigitNumber = (number: number) => {
  return Number(number).toString().padStart(3, '0');
};

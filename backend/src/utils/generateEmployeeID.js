export const generateEmployeeId = () => {
  return "EMP" + Math.floor(1000 + Math.random() * 9000);
};
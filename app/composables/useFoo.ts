export const useFoo = () => {
  return useState("name", () => "Name from Composable");
};
export const useAge = () => {
  return useState("age", () => "Age from Composable");
};

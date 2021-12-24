export const getQuestion = async () => {
  return await fetch(`https://jservice.io/api/random`)
    .then((response) => response.json())
    .catch((error) => alert(error));
};

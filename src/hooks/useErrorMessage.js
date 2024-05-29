
const useErrorMessage = (error='') => {
  // Regular expression to match the error message inside <pre> tag up to <br> tag
  const errorMessageRegex = /<pre>(.*?)<br>/;

  // Extracting the error message using regex
  const match = error?.match(errorMessageRegex);

  // If match is found, extract the error message
  let errorMessage = "";
  if (match && match?.length > 1) {
    errorMessage = match[1];
  }

  return errorMessage
}

export default useErrorMessage
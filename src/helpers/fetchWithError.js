export default async function fetchWithError(url, options) {
  const response = await fetch(url, options);
  if (response.status === 200) {
    const result = await response.json();
    // fetch can sometimes return 200 status although the returned object itself contains error
    if (result.error) {
      throw new Error(result.error);
    }
    return result;
  }
  throw new Error(`Error: ${response.status} ${response.statusText}`);
}

function fetchCountries(name) {
  const params = new URLSearchParams({
    fields: 'name,capital,population,flags,languages',
  });
  //restcountries.com/v2/{service}?fields={field},{field},{field}

  return fetch(`https://restcountries.com/v3.1/name/${name}?${params}`).then(
    response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }
  );
}

export default fetchCountries;

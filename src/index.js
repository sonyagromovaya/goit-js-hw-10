import './css/styles.css';
import fetchCountries from './js/fetchCountries.js';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
const DEBOUNCE_DELAY = 300;

const inputRef = document.querySelector('input#search-box');
let countryListRef = document.querySelector('.country-list');
let countryInfoRef = document.querySelector('.country-info');

console.log(inputRef);
console.log(countryListRef);
console.log(countryInfoRef);

inputRef.addEventListener('input', debounce(gettingCountry, DEBOUNCE_DELAY));

const resetMarkup = () => {
  countryListRef.innerHTML = '';
  countryInfoRef.innerHTML = '';
};

function gettingCountry() {
  resetMarkup();
  const value = inputRef.value.trim();

  if (value.length === 0) {
    // resetMarkup();
    return;
  } else {
    fetchCountries(value)
      .then(response => {
        if (response.length > 10) {
          //   resetMarkup();
          return Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        }
        if (response.length >= 2 && response.length <= 10) {
          //   resetMarkup();
          return renderCountries(response);
        }
        if (response.length === 1) {
          //   resetMarkup();
          return renderOneCountries(response);
        }
      })
      .catch(error => {
        resetMarkup();
        Notiflix.Notify.failure('Oops, there is no country with that name');
      });
  }
}

function renderCountries(arrayOfCountries) {
  const markup = arrayOfCountries
    .map(({ flags, name }) => {
      return `<li>
          <img src="${flags.svg}" width="40" height="40"></img>
          ${name.official}
        </li>`;
    })
    .join('');
  countryListRef.innerHTML = markup;
}

function renderOneCountries(arrayOfCountries) {
  const markup = arrayOfCountries
    .map(({ name, capital, population, flags, languages }) => {
      return `<li>
      <img src="${flags.svg}" width="40" height="40"></img>
          <h2>${name.official}</h2>
          <p>Capital: ${capital}</p>
          <p>Population: ${population}</p>
          <p>Languages: ${Object.values(languages)}</p>
        </li>`;
    })
    .join('');
  countryListRef.innerHTML = markup;
}

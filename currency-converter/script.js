const currencyFirstEl = document.getElementById('currency-first');
const worthFirstEl = document.getElementById('worth-first');

const currencySecondEl = document.getElementById('currency-second');
const worthSecondEl = document.getElementById('worth-second');

const exchangeRateEl = document.getElementById('exchanged-rate')

updateRate()

/*function updateRate(){
  fetch(`https://v6.exchangerate-api.com/v6/34bb293920e6be508f79ca4e/latest/${currencyFirstEl.value}`).then((response) => {
    return response.json()
  }).then((data) => {
    const rate = data.conversion_rates[currencySecondEl.value];
    exchangeRateEl.innerHTML = `1 ${currencyFirstEl.value} = ${rate+' '+currencySecondEl.value}`;
    worthSecondEl.value = (worthFirstEl.value * rate).toFixed(2);
  })
} */

async function updateRate() {
  try {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/34bb293920e6be508f79ca4e/latest/${currencyFirstEl.value}`
    );

    const data = await response.json();

    const rate = data.conversion_rates[currencySecondEl.value];
    exchangeRateEl.innerHTML = `1 ${currencyFirstEl.value} = ${rate} ${currencySecondEl.value}`;
    worthSecondEl.value = (worthFirstEl.value * rate).toFixed(2);

  } catch (error) {
    console.error("Error fetching exchange rate:", error);
    exchangeRateEl.innerHTML = "Failed to load exchange rate";
  }
}


currencyFirstEl.addEventListener('change', updateRate);
currencySecondEl.addEventListener('change', updateRate);
worthFirstEl.addEventListener('input', updateRate);
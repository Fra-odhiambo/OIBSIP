const input = document.getElementById("tempInput");
const unitSelect = document.getElementById("unitSelect");
const convertBtn = document.getElementById("convertBtn");
const errorEl = document.getElementById("error");
const resultsEl = document.getElementById("results");

function round(num) {
  return Math.round(num * 100) / 100;
}

function convert() {
  errorEl.textContent = "";
  resultsEl.classList.add("hidden");

  const raw = input.value.trim();

  // Validation: empty or non-numeric
  if (raw === "" || isNaN(raw)) {
    errorEl.textContent = "Please enter a valid number.";
    return;
  }

  const value = parseFloat(raw);
  const unit = unitSelect.value;

  // Convert the input to Celsius first
  let celsius;
  if (unit === "C") {
    celsius = value;
  } else if (unit === "F") {
    celsius = (value - 32) * 5 / 9;
  } else {
    celsius = value - 273.15;
  }

  // Absolute zero check (small tolerance for rounding)
  if (celsius < -273.15 - 1e-9) {
    errorEl.textContent = "Below absolute zero (-273.15°C) is not possible.";
    return;
  }

  const fahrenheit = celsius * 9 / 5 + 32;
  const kelvin = celsius + 273.15;

  document.getElementById("resC").textContent = round(celsius) + " °C";
  document.getElementById("resF").textContent = round(fahrenheit) + " °F";
  document.getElementById("resK").textContent = round(kelvin) + " K";

  resultsEl.classList.remove("hidden");
}

convertBtn.addEventListener("click", convert);

input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    convert();
  }
});

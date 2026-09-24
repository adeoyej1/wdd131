// Current year
const currentYear = new Date().getFullYear();
document.querySelector("#currentyear").textContent = currentYear;

// Last modified date
document.querySelector("#lastModified").textContent =
    `Last Modification: ${document.lastModified}`;

// Wind chill calculation
const temperature = 31;
const windSpeed = 8;

function calculateWindChill(temp, wind) {
    return (
        13.12 +
        0.6215 * temp -
        11.37 * Math.pow(wind, 0.16) +
        0.3965 * temp * Math.pow(wind, 0.16)
    ).toFixed(1);
}

if (temperature <= 10 && windSpeed > 4.8) {
    document.querySelector("#windchill").textContent =
        `${calculateWindChill(temperature, windSpeed)} °C`;
} else {
    document.querySelector("#windchill").textContent =
        "N/A";
}
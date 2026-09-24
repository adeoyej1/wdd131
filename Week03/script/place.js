
// ------------------------------
// Current Year
// ------------------------------

const currentYear = new Date().getFullYear();

document.querySelector("#currentyear").textContent = currentYear;


// ------------------------------
// Last Modified Date
// ------------------------------

document.querySelector("#lastModified").textContent =
    `Last Modification: ${document.lastModified}`;


// ------------------------------
// Wind Chill Calculation
// ------------------------------

const temperature = Number(
    document.querySelector("#temp").textContent
);

const windSpeed = Number(
    document.querySelector("#wind").textContent
);

const windChillElement = document.querySelector("#windchill");


// Wind chill formula
function calculateWindChill(temp, wind) {
    return (
        13.12 +
        (0.6215 * temp) -
        (11.37 * Math.pow(wind, 0.16)) +
        (0.3965 * temp * Math.pow(wind, 0.16))
    ).toFixed(1);
}


// Wind chill is only calculated when:
// Temperature <= 10°C
// AND wind speed > 4.8 km/h

if (temperature <= 10 && windSpeed > 4.8) {

    const windChill = calculateWindChill(
        temperature,
        windSpeed
    );

    windChillElement.textContent = `${windChill} °C`;

} else {

    windChillElement.textContent = "N/A";
}
```

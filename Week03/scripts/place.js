// Footer current year and last modification date
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modification: ${document.lastModified}`;

// Static weather values matching HTML content
const temperature = 8; // °C
const windSpeed = 15;  // km/h

// Wind chill calculation function using a single line return statement (Metric formula)
const calculateWindChill = (temp, speed) => 
    (13.12 + 0.6215 * temp - 11.37 * Math.pow(speed, 0.16) + 0.3965 * temp * Math.pow(speed, 0.16)).toFixed(1);

// Function to validate conditions and display wind chill
const displayWindChill = () => {
    const chillElement = document.getElementById("chill");
    
    // Check parameters against required threshold limits for metric units
    if (temperature <= 10 && windSpeed > 4.8) {
        chillElement.textContent = `${calculateWindChill(temperature, windSpeed)} °C`;
    } else {
        chillElement.textContent = "N/A";
    }
};

// Execute on page load
displayWindChill();
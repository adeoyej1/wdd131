const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },

    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },

    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },

    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },

    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },

    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },

    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },

    {
    templeName: "Accra Ghana",
    location: "Accra, Ghana",
    dedicated: "2004, January, 11",
    area: 17500,
    imageUrl:
        "https://www.churchofjesuschrist.org/media/image/accra-ghana-temple-lds-ea81753?lang=eng"
},

{
    templeName: "Johannesburg South Africa",
    location: "Johannesburg, South Africa",
    dedicated: "1985, August, 24",
    area: 19184,
    imageUrl:
        "https://www.churchofjesuschrist.org/media/image/johannesburg-south-africa-temple-lds-e44b3c8?lang=eng"
},

{
    templeName: "Seoul Korea",
    location: "Seoul, South Korea",
    dedicated: "1985, December, 14",
    area: 28057,
    imageUrl:
        "https://www.churchofjesuschrist.org/media/image/seoul-korea-temple-lds-b0c6efb?lang=eng"
}
];

const templeContainer = document.querySelector("#temple-container");

const homeButton = document.querySelector("#home");
const oldButton = document.querySelector("#old");
const newButton = document.querySelector("#new");
const largeButton = document.querySelector("#large");
const smallButton = document.querySelector("#small");

const menuButton = document.querySelector("#menu");
const navigation = document.querySelector("#navigation");



function displayTemples(templeList) {

    templeContainer.innerHTML = "";

    templeList.forEach((temple) => {

        const card = document.createElement("figure");
        card.classList.add("temple-card");

        const image = document.createElement("img");
        image.src = temple.imageUrl;
        image.alt = `${temple.templeName} temple`;
        image.loading = "lazy";
        image.width = 400;
        image.height = 250;

        const caption = document.createElement("figcaption");

        const name = document.createElement("h3");
        name.textContent = temple.templeName;

        const location = document.createElement("p");
        location.innerHTML = `<strong>Location:</strong> ${temple.location}`;

        const dedicated = document.createElement("p");
        dedicated.innerHTML = `<strong>Dedicated:</strong> ${formatDate(temple.dedicated)}`;

        const area = document.createElement("p");
        area.innerHTML = `<strong>Area:</strong> ${temple.area.toLocaleString()} sq ft`;

        caption.appendChild(name);
        caption.appendChild(location);
        caption.appendChild(dedicated);
        caption.appendChild(area);

        card.appendChild(image);
        card.appendChild(caption);

        templeContainer.appendChild(card);
    });
}


function formatDate(dateString) {

    const parts = dateString.split(", ");

    const year = parts[0];
    const month = parts[1];
    const day = parts[2];

    return `${month} ${day}, ${year}`;
}


function showHome() {
    displayTemples(temples);
}


function showOld() {

    const oldTemples = temples.filter((temple) => {

        const year = Number(temple.dedicated.split(", ")[0]);

        return year < 1900;
    });

    displayTemples(oldTemples);
}


function showNew() {

    const newTemples = temples.filter((temple) => {

        const year = Number(temple.dedicated.split(", ")[0]);

        return year > 2000;
    });

    displayTemples(newTemples);
}


function showLarge() {

    const largeTemples = temples.filter((temple) => {

        return temple.area > 90000;
    });

    displayTemples(largeTemples);
}


function showSmall() {

    const smallTemples = temples.filter((temple) => {

        return temple.area < 10000;
    });

    displayTemples(smallTemples);
}


homeButton.addEventListener("click", showHome);

oldButton.addEventListener("click", showOld);

newButton.addEventListener("click", showNew);

largeButton.addEventListener("click", showLarge);

smallButton.addEventListener("click", showSmall);


menuButton.addEventListener("click", () => {

    const isOpen = navigation.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", isOpen);

    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
});


document.querySelector("#currentyear").textContent =
    new Date().getFullYear();


document.querySelector("#lastModified").textContent =
    `Last Modified: ${document.lastModified}`;



displayTemples(temples);
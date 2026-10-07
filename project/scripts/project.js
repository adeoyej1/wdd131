// StartSmart WDD131 Final Project

const businessIdeas = [
    {
        name: `Mobile Laundry Service`,
        category: `services`,
        level: `Medium`,
        description: `Collect, clean, dry, and return clothes for customers who value convenience and reliable service.`,
        focus: `Convenience and repeat customers`
    },
    {
        name: `Digital Design Service`,
        category: `digital`,
        level: `Low`,
        description: `Create simple graphics, social media materials, and business documents for local businesses.`,
        focus: `Skills and online delivery`
    },
    {
        name: `Packaged Snacks`,
        category: `food`,
        level: `Medium`,
        description: `Produce a focused range of packaged snacks for offices, schools, events, or neighborhood retailers.`,
        focus: `Product quality and distribution`
    },
    {
        name: `Home Essentials Retail`,
        category: `retail`,
        level: `Medium`,
        description: `Sell frequently used household products through a small physical or online storefront.`,
        focus: `Stock control and customer trust`
    },
    {
        name: `Motorcycle Dispatch Service`,
        category: `services`,
        level: `Medium`,
        description: `Help individuals and small businesses move documents, meals, and small packages within a defined area.`,
        focus: `Speed, safety, and route planning`
    },
    {
        name: `Online Skills Tutoring`,
        category: `digital`,
        level: `Low`,
        description: `Teach a skill you already understand through structured one-to-one or small-group online sessions.`,
        focus: `Expertise and learner results`
    },
    {
        name: `Urban Vegetable Growing`,
        category: `food`,
        level: `Medium`,
        description: `Grow selected vegetables in a small space and sell fresh produce directly to nearby customers.`,
        focus: `Production planning and demand`
    },
    {
        name: `Phone Accessories Shop`,
        category: `retail`,
        level: `Medium`,
        description: `Sell useful phone accessories with clear product information and dependable customer service.`,
        focus: `Product selection and turnover`
    },
    {
        name: `Virtual Assistant Service`,
        category: `digital`,
        level: `Low`,
        description: `Support busy professionals with scheduling, data entry, customer communication, and administrative tasks.`,
        focus: `Reliability and communication`
    }
];

function updateYear() {
    const yearElement = document.querySelector(`#current-year`);
    if (yearElement) {
        yearElement.textContent = `${new Date().getFullYear()}`;
    }
}

function createIdeaCard(idea) {
    return `
        <article class="idea-card">
            <div class="idea-meta">
                <span>${idea.category}</span>
                <span>${idea.level} start</span>
            </div>
            <h3>${idea.name}</h3>
            <p>${idea.description}</p>
            <div class="idea-footer">${idea.focus}</div>
        </article>
    `;
}

function renderIdeas(ideas, targetId) {
    const target = document.querySelector(`#${targetId}`);
    if (!target) {
        return;
    }

    if (ideas.length === 0) {
        target.innerHTML = `
            <article class="idea-card">
                <h3>No ideas found</h3>
                <p>Try another category to explore more opportunities.</p>
            </article>
        `;
        return;
    }

    target.innerHTML = ideas.map(createIdeaCard).join(``);
}

function setupIdeaFilter() {
    const filter = document.querySelector(`#category-filter`);
    const count = document.querySelector(`#idea-count`);

    if (!filter) {
        return;
    }

    const showIdeas = () => {
        const selectedCategory = filter.value;
        const filteredIdeas = selectedCategory === `all`
            ? businessIdeas
            : businessIdeas.filter((idea) => idea.category === selectedCategory);

        renderIdeas(filteredIdeas, `all-ideas`);

        if (count) {
            count.textContent = `${filteredIdeas.length} business idea${filteredIdeas.length === 1 ? `` : `s`} shown.`;
        }
    };

    filter.addEventListener(`change`, showIdeas);
    showIdeas();
}

function renderFeaturedIdeas() {
    const featured = businessIdeas
        .filter((idea) => idea.level === `Low` || idea.category === `services`)
        .slice(0, 3);

    renderIdeas(featured, `featured-ideas`);
}

function setupNavigation() {
    const button = document.querySelector(`.menu-button`);
    const navigation = document.querySelector(`#primary-nav`);

    if (!button || !navigation) {
        return;
    }

    button.addEventListener(`click`, () => {
        const isOpen = navigation.classList.toggle(`open`);
        button.setAttribute(`aria-expanded`, `${isOpen}`);
        button.setAttribute(`aria-label`, `${isOpen ? `Close` : `Open`} navigation menu`);
    });
}

function saveChecklistState(checks) {
    const state = checks.map((check) => check.checked);
    localStorage.setItem(`startSmartChecklist`, JSON.stringify(state));
}

function restoreChecklistState(checks) {
    const savedState = localStorage.getItem(`startSmartChecklist`);

    if (!savedState) {
        return;
    }

    try {
        const state = JSON.parse(savedState);
        checks.forEach((check, index) => {
            check.checked = Boolean(state[index]);
        });
    } catch {
        localStorage.removeItem(`startSmartChecklist`);
    }
}

function updateReadiness(checks) {
    const progress = document.querySelector(`#readiness-progress`);
    const message = document.querySelector(`#readiness-message`);

    if (!progress || !message) {
        return;
    }

    const completed = checks.filter((check) => check.checked).length;
    const percentage = Math.round((completed / checks.length) * 100);

    progress.style.width = `${percentage}%`;
    progress.setAttribute(`aria-valuenow`, `${percentage}`);

    if (percentage === 100) {
        message.textContent = `Excellent. You have completed all five planning checks. Your next step is to test your assumptions with real customers.`;
    } else if (percentage >= 60) {
        message.textContent = `Good progress. You have completed ${completed} of ${checks.length} checks. Focus on the remaining items before committing significant money.`;
    } else if (percentage > 0) {
        message.textContent = `You have completed ${completed} of ${checks.length} checks. Keep building your plan one question at a time.`;
    } else {
        message.textContent = `Complete the checklist to see your readiness level.`;
    }

    saveChecklistState(checks);
}

function setupReadinessChecklist() {
    const checks = [...document.querySelectorAll(`.readiness-check`)];

    if (checks.length === 0) {
        return;
    }

    restoreChecklistState(checks);
    checks.forEach((check) => {
        check.addEventListener(`change`, () => updateReadiness(checks));
    });
    updateReadiness(checks);
}

function saveVisitor(name, interest) {
    const visitor = {
        name,
        interest,
        savedAt: new Date().toISOString()
    };

    localStorage.setItem(`startSmartVisitor`, JSON.stringify(visitor));
}

function restoreVisitor() {
    const savedVisitor = localStorage.getItem(`startSmartVisitor`);
    const nameInput = document.querySelector(`#name`);

    if (!savedVisitor || !nameInput) {
        return;
    }

    try {
        const visitor = JSON.parse(savedVisitor);
        if (visitor.name) {
            nameInput.value = visitor.name;
        }

        const savedInterest = document.querySelector(`input[name="interest"][value="${visitor.interest}"]`);
        if (savedInterest) {
            savedInterest.checked = true;
        }
    } catch {
        localStorage.removeItem(`startSmartVisitor`);
    }
}

function setupStarterForm() {
    const form = document.querySelector(`#starter-form`);
    const status = document.querySelector(`#form-status`);

    if (!form || !status) {
        return;
    }

    restoreVisitor();

    form.addEventListener(`submit`, (event) => {
        event.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const formData = new FormData(form);
        const name = formData.get(`name`);
        const interest = formData.get(`interest`);

        saveVisitor(name, interest);

        status.textContent = `Thank you, ${name}. Your starter-plan information has been saved in this browser. Your selected area is ${interest}.`;
        form.reset();

        const savedVisitor = JSON.parse(localStorage.getItem(`startSmartVisitor`));
        if (savedVisitor) {
            const nameInput = document.querySelector(`#name`);
            if (nameInput) {
                nameInput.value = savedVisitor.name;
            }
        }
    });
}

document.addEventListener(`DOMContentLoaded`, () => {
    updateYear();
    setupNavigation();
    renderFeaturedIdeas();
    setupIdeaFilter();
    setupReadinessChecklist();
    setupStarterForm();
});

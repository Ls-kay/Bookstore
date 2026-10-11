
// =========================================
// 1. MOBILE NAVIGATION
// =========================================

const menuToggle = document.querySelector(".menu-toggle");
const primaryNavigation = document.querySelector("#primary-navigation");

menuToggle.addEventListener("click", () => {
  const isOpen = primaryNavigation.classList.toggle("is-open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation"
  );
});

// Close the mobile menu after a navigation link is clicked.
primaryNavigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    primaryNavigation.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  });
});

// =========================================
// 2. BOOK CATEGORY FILTERS
// =========================================

const filterButtons = document.querySelectorAll(".filter-button");
const bookCards = document.querySelectorAll(".book-card");
const bookStatus = document.querySelector("#book-status");

function filterBooks(category) {
  let visibleCount = 0;

  bookCards.forEach((card) => {
    const categories = card.dataset.category.split(" ");
    const matches =
      category === "all" || categories.includes(category);

    card.hidden = !matches;

    if (matches) {
      visibleCount++;
    }
  });

  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === category;

    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  bookStatus.textContent =
    `${visibleCount} book${visibleCount === 1 ? "" : "s"} displayed.`;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterBooks(button.dataset.filter);
  });
});

// =========================================
// 3. READING LIST
// =========================================

const readingList = document.querySelector("#reading-list-items");
const listCount = document.querySelector("#list-count");
const clearListButton = document.querySelector("#clear-list");
const addButtons = document.querySelectorAll(".add-button");

const savedBooks = new Set();

function updateReadingList() {
  readingList.replaceChildren();

  listCount.textContent = `(${savedBooks.size})`;

  if (savedBooks.size === 0) {
    const emptyMessage = document.createElement("li");

    emptyMessage.textContent =
      "Your next favourite could be here. Tap + on a book to save it.";

    readingList.appendChild(emptyMessage);
  } else {
    savedBooks.forEach((book) => {
      const listItem = document.createElement("li");
      listItem.textContent = book;
      readingList.appendChild(listItem);
    });
  }

  addButtons.forEach((button) => {
    const isSaved = savedBooks.has(button.dataset.book);

    button.classList.toggle("is-added", isSaved);
    button.textContent = isSaved ? "✓" : "+";
    button.setAttribute("aria-pressed", String(isSaved));
  });
}

addButtons.forEach((button) => {
  button.setAttribute("aria-pressed", "false");

  button.addEventListener("click", () => {
    const book = button.dataset.book;

    if (savedBooks.has(book)) {
      savedBooks.delete(book);
      bookStatus.textContent = `${book} removed from your reading list.`;
    } else {
      savedBooks.add(book);
      bookStatus.textContent = `${book} added to your reading list.`;
    }

    updateReadingList();
  });
});

clearListButton.addEventListener("click", () => {
  savedBooks.clear();
  updateReadingList();
  bookStatus.textContent = "Your reading list has been cleared.";
});

// =========================================
// 4. STAFF PICKS SHORTCUT
// =========================================

const staffPicksLink = document.querySelector("[data-show-staff-picks]");

staffPicksLink.addEventListener("click", (event) => {
  event.preventDefault();

  filterBooks("staff");

  document.querySelector("#books").scrollIntoView({
    behavior: "smooth"
  });
});

// =========================================
// 5. EVENT REGISTRATION LINKS
// =========================================

const eventLinks = document.querySelectorAll("[data-event]");

eventLinks.forEach((link) => {
  const eventName = link.dataset.event;

  const subject = encodeURIComponent(
    `Event registration enquiry: ${eventName}`
  );

  link.href =
    `mailto:hello@thepapertrail.example?subject=${subject}`;
});

// =========================================
// 6. NEWSLETTER FORM DEMO
// =========================================

const newsletterForm = document.querySelector("#newsletter-form");
const newsletterEmail = document.querySelector("#newsletter-email");
const newsletterMessage = document.querySelector("#newsletter-message");

newsletterForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!newsletterForm.reportValidity()) {
    return;
  }

  newsletterMessage.textContent =
    "Thanks for your interest! Newsletter signup is a demo; connect a mailing service to save subscriptions.";

  newsletterForm.reset();
});

// =========================================
// 7. AUTOMATIC COPYRIGHT YEAR
// =========================================

document.querySelector("#current-year").textContent =
  new Date().getFullYear();

// =========================================
// 8. INITIAL STATE
// =========================================

filterBooks("all");
updateReadingList();
// DOM Elements
const contactList = document.getElementById('contactList');
const searchInput = document.getElementById('search');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');
const addContactBtn = document.getElementById('addContactBtn');
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');
const favoriteCheckbox = document.getElementById('favorite');

// State
let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

// Utility Functions
function saveContacts() {
    localStorage.setItem('contacts', JSON.stringify(contacts));
}

function renderContacts() {
    const searchTerm = searchInput.value.toLowerCase();
    contactList.innerHTML = '';

    // Filter and sort contacts
    const filteredContacts = contacts
        .filter(contact => contact.name.toLowerCase().includes(searchTerm))
        .sort((a, b) => b.favorite - a.favorite || a.name.localeCompare(b.name));

    // Render each contact
    filteredContacts.forEach(contact => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>
                ${contact.name} (${contact.phone})
                ${contact.favorite ? '<span class="favorite">★</span>' : ''}
            </span>
            <div>
                <button class="favorite" onclick="toggleFavorite('${contact.phone}')">★</button>
                <button class="delete" onclick="deleteContact('${contact.phone}')">🗑</button>
            </div>
        `;
        contactList.appendChild(li);
    });
}

function toggleFavorite(phone) {
    const contact = contacts.find(c => c.phone === phone);
    if (contact) {
        contact.favorite = !contact.favorite;
        saveContacts();
        renderContacts();
    }
}

function deleteContact(phone) {
    contacts = contacts.filter(c => c.phone !== phone);
    saveContacts();
    renderContacts();
}

// Event Listeners
addContactBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

contactForm.addEventListener('submit', event => {
    event.preventDefault();

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const favorite = favoriteCheckbox.checked;

    if (!name || !phone) {
        alert('Введите корректные данные!');
        return;
    }

    const newContact = { name, phone, favorite };
    contacts.push(newContact);
    saveContacts();
    renderContacts();

    nameInput.value = '';
    phoneInput.value = '';
    favoriteCheckbox.checked = false;
    modal.style.display = 'none';
});

// Initialize
renderContacts();
searchInput.addEventListener('input', renderContacts);

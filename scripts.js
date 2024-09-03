window.addEventListener('DOMContentLoaded', event => {
    // Navbar shrink function
    const navbarShrink = () => {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (navbarCollapsible) {
            if (window.scrollY === 0) {
                navbarCollapsible.classList.remove('navbar-shrink');
            } else {
                navbarCollapsible.classList.add('navbar-shrink');
            }
        }
    };

    // Shrink the navbar
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    }

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = Array.from(document.querySelectorAll('#navbarResponsive .nav-link'));
    responsiveNavItems.forEach(responsiveNavItem => {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Inventory table and forms
    const inventoryTable = document.getElementById('inventoryTable').getElementsByTagName('tbody')[0];
    const addItemForm = document.getElementById('addItemForm');
    const removeItemForm = document.getElementById('removeItemForm');
    const removeItemSelect = document.getElementById('removeItemSelect');

    // Handle form submission for adding items
    addItemForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        const itemName = document.getElementById('itemName').value;
        const itemQuantity = document.getElementById('itemQuantity').value;

        // Check if item already exists
        let existingRow = Array.from(inventoryTable.rows).find(row => row.cells[0].textContent === itemName);
        if (existingRow) {
            // Update existing row
            let currentQuantity = parseInt(existingRow.cells[1].textContent);
            existingRow.cells[1].textContent = currentQuantity + parseInt(itemQuantity);
        } else {
            // Create a new row
            const newRow = inventoryTable.insertRow();
            newRow.innerHTML = `
                <td>${itemName}</td>
                <td>${itemQuantity}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editItem(this)">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteItem(this)">Excluir</button>
                </td>
            `;

            // Add item to the select dropdown for removal
            const option = document.createElement('option');
            option.value = itemName;
            option.textContent = itemName;
            removeItemSelect.appendChild(option);
        }

        // Clear the form
        addItemForm.reset();
    });

    // Handle form submission for removing items
    removeItemForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        const removeItemName = removeItemSelect.value;
        const removeItemQuantity = parseInt(document.getElementById('removeItemQuantity').value);

        // Find the item row
        let existingRow = Array.from(inventoryTable.rows).find(row => row.cells[0].textContent === removeItemName);
        if (existingRow) {
            let currentQuantity = parseInt(existingRow.cells[1].textContent);
            if (currentQuantity >= removeItemQuantity) {
                // Update quantity
                existingRow.cells[1].textContent = currentQuantity - removeItemQuantity;
                // Remove item from select dropdown if quantity is zero
                if (currentQuantity - removeItemQuantity === 0) {
                    removeItemSelect.removeChild(removeItemSelect.querySelector(`option[value="${removeItemName}"]`));
                }
            } else {
                alert('Quantidade solicitada maior que a disponível no estoque.');
            }
        } else {
            alert('Item não encontrado no estoque.');
        }

        // Clear the form
        removeItemForm.reset();
    });
});

// Edit item
function editItem(button) {
    const row = button.closest('tr');
    const itemName = row.cells[0].textContent;
    const itemQuantity = row.cells[1].textContent;

    document.getElementById('itemName').value = itemName;
    document.getElementById('itemQuantity').value = itemQuantity;

    row.remove();
    // Remove item from select dropdown
    const removeItemSelect = document.getElementById('removeItemSelect');
    const option = removeItemSelect.querySelector(`option[value="${itemName}"]`);
    if (option) option.remove();
}

// Delete item
function deleteItem(button) {
    const row = button.closest('tr');
    const itemName = row.cells[0].textContent;
    row.remove();
    // Remove item from select dropdown
    const removeItemSelect = document.getElementById('removeItemSelect');
    const option = removeItemSelect.querySelector(`option[value="${itemName}"]`);
    if (option) option.remove();
}

// Edit item
function editItem(button) {
    const row = button.closest('tr');
    const itemName = row.cells[0].textContent;
    const itemQuantity = row.cells[1].textContent;

    document.getElementById('itemName').value = itemName;
    document.getElementById('itemQuantity').value = itemQuantity;

    row.remove();
    // Remove item from select dropdown
    const option = removeItemSelect.querySelector(`option[value="${itemName}"]`);
    if (option) option.remove();
}

// Delete item
function deleteItem(button) {
    const row = button.closest('tr');
    const itemName = row.cells[0].textContent;
    row.remove();
    // Remove item from select dropdown
    const option = removeItemSelect.querySelector(`option[value="${itemName}"]`);
    if (option) option.remove();
}

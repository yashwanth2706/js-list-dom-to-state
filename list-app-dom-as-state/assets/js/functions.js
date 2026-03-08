
/**
 * Displays a message on the page with the given color and text.
 * 
 * @param {string} colorName - The color to display the message in.
 * @param {string} messageText - The text to display in the message.
 */
function showMsg(colorName, messageText) {
        message.style.color = colorName;
        message.textContent = messageText;
        return;
    }

/**
 * Resets the confirmClear state variable to false.
 * This function is used after the user confirms clearing the list or cancels the clear list action.
 */
function resetClearState(){
        confirmClear = false;
        return;
    }

/**
 * Resets the previously edited <li> element to its original state.
 * If there is no previously edited element, this function does nothing.
 * 
 * This function is used when the user clicks away from the edited <li> element,
 * effectively cancelling the edit.
 */
function restorePreviousItem(textToShow) {
        // RESTORE previous state for editingItem
        if(!editingItem) return;

        // Restore the <li>'s visible text and styling
        editingItem.textContent = textToShow;
        editingItem.title = "Edit";
        editingItem.style.cursor = "pointer";

        editRow.classList.add("hide-edit-mode");
        // move editRow back into root after every edit so it is never
        // stranded inside a <li> that could get removed by the clear button.
        root.appendChild(editRow);

        editingItem = null;
        isInEditMode = false;   // reset the flag on exit
        return;
    }

/**
 * Enables edit mode for the given <li> element.
 * If the user is currently editing another <li> element, that element is restored to its original state.
 * The given <li> element is then cleared of its visible text and the edit mode row is appended to it.
 * The user is then shown a message indicating that they are now editing the given <li> element.
 * The user's focus is set to the edit mode text input field.
 * 
 * @param {HTMLLIElement} item - The <li> element to enable edit mode for.
 */
function enableEditMode(item) {
    
        if(item === editRow) return;

        if(editingItem !== item){
            restorePreviousItem(originalText);
        }

        originalText = item.textContent.trim();

        item.textContent = "";

        editInput.value = originalText;
        editRow.classList.remove("hide-edit-mode");

        item.appendChild(editRow);

        showMsg("orange", `Editing: ${originalText}`);

        editingItem = item;
        editInput.focus();
        return;
    }

function exitDeleteMode() {

        root.querySelectorAll('li').forEach(li => {
        li.dataset.marked = "false";
        li.style.color = "black";
        });

        isInDeleteMode = false;
        confirmDelete = false;
    }

function confirmDeletion() {

        const marked = root.querySelectorAll('li[data-marked="true"]');

        if (marked.length === 0) {
                showMsg("red", "No items selected: [EXIT DELETE MODE]");
                exitDeleteMode();
                return;
        }

        if(!confirmDelete) {
                showMsg("blue", `sure to delete ${marked.length} items(s)? Click delete again to confirm!`);
                confirmDelete = true;
                return;
        }

        if(confirmDelete) {
                confirmDelete = false;
                marked.forEach(li => li.remove());
                showMsg("red", `DELETED: ${marked.length} item(s) and EXIT DELETE MODE`);
                exitDeleteMode();
                return;
        }
        return;
    }

function enableDeleteMode() {
        if (root.querySelectorAll('li').length === 0) {
            showMsg("red", "No items in the list: [CANNOT ENTER DELETE MODE]");
            return;
        }

        isInDeleteMode = true;

        showMsg("red", "Now you can select items to delete: [ENABLED DELETE MODE]");

        root.querySelectorAll('li').forEach(li => {
            li.dataset.marked = "false";
            li.style.color = "purple";
        });
        return;
    }

function addItemToList(name) {
        const listItem = document.createElement('li');
        listItem.textContent = name;
        listItem.title = "Edit";
        listItem.style.cursor = "pointer";
        root.append(listItem);
        itemname.value = "";
        return;
    }

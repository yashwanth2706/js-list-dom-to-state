let editingItem = null;    // Initially editingItem is null, this will check if <li> Object exists.
// If <li> Object exists: editingItem assigned to <li> Object, If not editingItem's state is reset to null. 

let originalText = null;   // Initially originalText is null.
// If user types list item(s) to add, originalText will be assigned to input value (listItemName/cleanItem).
// Once originalText is added to the list, originalText state is reset to null.

let isInEditMode = false;   // Initially not in edit mode: false - (default/reset state: false).  
let isInDeleteMode = false; // Initially not in delete mode: false - (default/reset state: false).

let confirmClear = false;   // Initially clear confirmation is false - (default/reset state: false).
let confirmDelete = false;  // Initially delete confirmation is false - (default/reset state: false). 

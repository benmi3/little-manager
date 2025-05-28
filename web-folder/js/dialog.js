let dialogElement = null;
let hideDialogTimeout = null;


/**
 * Creates and shows the hover dialog.
 * The dialog is positioned near the trigger element.
 */
function showHoverDialog(quiestion, dialogArea, optionTrue, optionFalse) {
  // Clear any existing timeout to prevent premature hiding
  if (hideDialogTimeout) {
    clearTimeout(hideDialogTimeout);
    hideDialogTimeout = null;
  }

  // If dialog doesn't exist, create it
  if (!dialogElement) {
    dialogElement = document.createElement('div');
    dialogElement.className = 'hover-dialog'; // Apply base styles
    dialogElement.id = 'dynamicHoverDialog';

    // Dialog Text
    const textElement = document.createElement('p');
    textElement.className = 'dialog-text';
    textElement.textContent = quiestion;
    dialogElement.appendChild(textElement);

    // Dialog Buttons Container
    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'dialog-buttons';

    // Update Button
    const updateButton = document.createElement('button');
    updateButton.textContent = optionTrue.textContent;
    updateButton.className = 'update-btn';
    updateButton.onclick = () => {
      if (optionTrue.func && typeof optionTrue.func === 'function') {
        try {
          optionTrue.func(...(optionTrue.params || []));
        } catch (e) {
          console.error("Error executing optionTrue action:", e);
        }
      }
    };
    buttonsContainer.appendChild(updateButton);

    // New Button
    const newButton = document.createElement('button');
    newButton.textContent = optionFalse.textContent;
    newButton.className = 'new-btn';
    newButton.onclick = () => {
      if (optionFalse.func && typeof optionFalse.func === 'function') {
        try {
          optionFalse.func(...(optionFalse.params || []));
        } catch (e) {
          console.error("Error executing optionFalse action:", e);
        }
      }
    };
    buttonsContainer.appendChild(newButton);

    dialogElement.appendChild(buttonsContainer);
    document.body.appendChild(dialogElement);

    // Add mouseleave event to the dialog itself to start hide timer
    dialogElement.addEventListener('mouseleave', startHideTimer);
    // Add mouseenter to cancel hide timer if mouse re-enters dialog
    dialogElement.addEventListener('mouseenter', clearHideTimer);
  }

  // Position the dialog
  // This is a simple positioning logic, you might want to make it more sophisticated
  const triggerRect = dialogArea.getBoundingClientRect();
  dialogElement.style.top = `${triggerRect.bottom + window.scrollY + 5}px`; // 5px below the trigger
  dialogElement.style.left = `${triggerRect.left + window.scrollX + (triggerRect.width / 2) - (dialogElement.offsetWidth / 2)}px`; // Centered below trigger

  // Ensure it's centered if it overflows viewport (basic adjustment)
  if (dialogElement.offsetLeft < 0) {
    dialogElement.style.left = '10px';
  }
  if (dialogElement.offsetLeft + dialogElement.offsetWidth > window.innerWidth) {
    dialogElement.style.left = `${window.innerWidth - dialogElement.offsetWidth - 10}px`;
  }


  // Make the dialog visible
  dialogElement.classList.add('visible');
}

/**
 * Hides the dialog.
 */
function hideDialog() {
  if (dialogElement) {
    dialogElement.classList.remove('visible');
    setTimeout(() => {
      if (dialogElement && !dialogElement.classList.contains('visible')) {
        dialogElement.remove();
        dialogElement = null;
      }
    }, 300); // Match transition duration
  }
}

/**
 * Starts a timer to hide the dialog.
 * This is used to allow the mouse to move from the trigger to the dialog.
 */
function startHideTimer() {
  hideDialogTimeout = setTimeout(() => {
    hideDialog();
  }, 200); // Small delay before hiding
}

/**
 * Clears the hide dialog timer.
 * This is used if the mouse enters the dialog or trigger again.
 */
function clearHideTimer() {
  if (hideDialogTimeout) {
    clearTimeout(hideDialogTimeout);
    hideDialogTimeout = null;
  }
}


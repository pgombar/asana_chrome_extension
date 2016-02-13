/**
 * A Chrome extension that injects tasks numbers to Asana's task list.
 *
 * @author     frane, paula
 * @copyright  2015 Noom, Inc.
 */


// Runs the whole thing.
continuouslyCheckIfAsanaIsLoaded(200);

/**
 * Continuously checks if Asana is loaded in the time interval specified by the parameter intervalInMillis.
 */
function continuouslyCheckIfAsanaIsLoaded(intervalInMillis) {
  var asanaContent = document.getElementById("center_pane__contents");
  if (asanaContent != null) {
    onAsanaLoaded(asanaContent);
  }

  window.setTimeout(continuouslyCheckIfAsanaIsLoaded, intervalInMillis);
}

/**
 * Called when Asana loads, it gets all the DOM elements that represent the task list rows and calls the method
 * that injects the row numbers to it.
 */
 function onAsanaLoaded(asanaContent) {
  var asanaRows = asanaContent.getElementsByClassName("gridCell-interiorRowContainer");
  for (var i = 0; i < asanaRows.length; i++) {
    addRowNumber(asanaRows[i], i + 1);
  }
}

/**
 * Adds a row number to a task row element by either injecting a new div element or, if it's already there, updates
 * the row number in the existing div.
 */
function addRowNumber(asanaRow, rowNumber) {
  attributeName = "noom_attribute";
  attributeValue = "true";

  // Index of the element before which we are inserting the div containing the row number.
  var insertAtIndex = 1;

  if (asanaRow.getAttribute(attributeName) == null) {
    // Set the flag as an indicator that the div has been injected and inject it.
    asanaRow.setAttribute(attributeName, attributeValue);

    var injectDiv = createDivElement();
    injectDiv.textContent = rowNumber;

    var beforeNode = asanaRow.children[insertAtIndex];
    asanaRow.insertBefore(injectDiv, beforeNode);
  } else {
    // The div already exists, just update the row number.
    var injectDiv = asanaRow.children[insertAtIndex];

    if (injectDiv.textContent != rowNumber) {
      injectDiv.textContent = rowNumber;
    }
  }
}

/**
 * Creates a div element used for injecting task numbers and defines the style of it.
 */
function createDivElement() {
  injectDiv = document.createElement("div");
  injectDiv.style.marginLeft = "5px";
  injectDiv.style.marginRight = "5px";
  injectDiv.style.width = "20px";
  injectDiv.style.textAlign = "center";
  injectDiv.style.color = "#A1A4AA";
  injectDiv.style.fontSize = "90%";

  return injectDiv;
}

// ELEMENTS

// Display number of pages
const pageAmount = document.querySelector('[k-el="pageAmount"]');

// Pages "-" button
const pagesMinus = document.querySelector('[k-el="pagesMinus"]');

// Pages "+" button
const pagesPlus = document.querySelector('[k-el="pagesPlus"]');

// Range minimum price
const rangeMin = document.querySelector('[k-el="rangeMin"]');

// Range maximum price
const rangeMax = document.querySelector('[k-el="rangeMax"]');

// Mainenance Price Text
const maintenancePriceText = document.querySelector('[k-el="maintenancePrice"]');

// Mainenance Price Text
const maintenancePriceUnitText = document.querySelector('[k-el="maintenanceUnit"]');

// Select all radio buttons in the "Scope" group
const scopeRadioButtons = document.querySelectorAll('input[name="Scope"]');

// Select all radio buttons in the "Maintenance" group
const maintenanceRadioButtons = document.querySelectorAll('input[name="Maintenance"]');

// Scope: Development radio button
const scopeDevelopmentRadio = document.querySelector('input[name="Scope"][value="development"]');

// Select the radio button in the "Maintenance" group with the value "whenNeeded"
const maintenanceWhenNeededRadio = document.querySelector('input[name="Maintenance"][value="whenNeeded"]');

// Check the radio buttons by setting the checked attribute to true
// Scope: Development
scopeDevelopmentRadio.checked = true;
// Maintenance: When Needed
// maintenanceWhenNeededRadio.checked = true;

// Add event listeners to radio buttons in the "Scope" group
scopeRadioButtons.forEach((radioButton) => {
  radioButton.addEventListener('change', () => {
    // Check if the radio button is checked
    if (radioButton.checked) {
      // Remove the "selected" class from all radio buttons in the "Scope" group
      scopeRadioButtons.forEach((button) => {
        button.closest('.calc-button.cc-option').classList.remove('selected');
      });
      
      // Add the "selected" class to the parent element of the checked radio button
      const parentElement = radioButton.closest('.calc-button.cc-option');
      if (parentElement) {
        parentElement.classList.add('selected');
      }
    }
  });
});

// Add event listeners to radio buttons in the "Maintenance" group
maintenanceRadioButtons.forEach((radioButton) => {
  radioButton.addEventListener('change', () => {
    // Check if the radio button is checked
    if (radioButton.checked) {
      // Remove the "selected" class from all radio buttons in the "Maintenance" group
      maintenanceRadioButtons.forEach((button) => {
        button.closest('.calc-button.cc-option').classList.remove('selected');
      });
      
      // Add the "selected" class to the parent element of the checked radio button
      const parentElement = radioButton.closest('.calc-button.cc-option');
      if (parentElement) {
        parentElement.classList.add('selected');
      }
    }
  });

// Function to update the pricing range based on page count and the selected radio button
function updatePriceRange() {
  // Get the selected radio button in the "Scope" group
  const selectedScopeRadioButton = document.querySelector('input[name="Scope"]:checked');

  // Get the minPrice attribute value from the selected radio button as a number
  const minPrice = parseInt(selectedScopeRadioButton.getAttribute('minprice'), 10);

  // Get the maxPrice attribute value from the selected radio button as a number
  const maxPrice = parseInt(selectedScopeRadioButton.getAttribute('maxprice'), 10);

  // Get the basePrice attribute value from the selected radio button as a number
  const basePrice = parseInt(selectedScopeRadioButton.getAttribute('baseprice'), 10);

  // Calculate minSum based on pageCount, minPrice, and basePrice
  const minSum = pageCount * minPrice + basePrice;

  // Calculate maxSum based on pageCount, maxPrice, and basePrice
  const maxSum = pageCount * maxPrice + basePrice;

  // Update pricing range
  rangeMin.textContent = minSum;
  rangeMax.textContent = maxSum;
}

// Function to toggle the "cc-disabled" class for elements with k-el="design"
function toggleDesignElementsDisabledStatus() {
  // Get the "designAndDevelopment" radio button in the "Scope" group
  const designAndDevelopmentRadio = document.querySelector('input[name="Scope"][value="designAndDevelopment"]');
  
  // Get all elements with attribute k-el="design"
  const designElements = document.querySelectorAll('[k-el="design"]');

  if (designAndDevelopmentRadio.checked) {
    // If "designAndDevelopment" radio button is checked, remove the "cc-disabled" class from design elements
    designElements.forEach((element) => {
      element.classList.remove('cc-disabled');
    });
  } else {
    // If "designAndDevelopment" radio button is not checked, add the "cc-disabled" class to design elements
    designElements.forEach((element) => {
      element.classList.add('cc-disabled');
    });
  }
}

// Function to toggle the "cc-disabled" class for elements with k-el="ongoing"
function toggleOngoingFeaturesDisabledStatus() {
  // Get the "ongoing" radio button in the "Maintenance" group
  const maintenanceRadio = document.querySelector('input[name="Maintenance"][value="ongoing"]');
  
  // Get all elements with attribute k-el="ongoing"
  const ongoingElements = document.querySelectorAll('[k-el="ongoing"]');

  if (maintenanceRadio.checked) {
    // If "ongoing" radio button is checked, remove the "cc-disabled" class from ongoing elements
    ongoingElements.forEach((element) => {
      element.classList.remove('cc-disabled');
    });
  } else {
    // If "ongoing" radio button is not checked, add the "cc-disabled" class to ongoing elements
    ongoingElements.forEach((element) => {
      element.classList.add('cc-disabled');
    });
  }
}

// Initialize the page count and update the price range
let pageCount = 5;
updatePriceRange(); // Initialize the price range based on the default page count

// Function to show spans based on page count
function showSpansByPageCount(pageCount) {
  const spans = document.querySelectorAll('div.text-small.text_italic span[pages]');

  spans.forEach((span) => {
    const pagesValue = parseInt(span.getAttribute('pages'), 10);
    if (pagesValue <= pageCount) {
      span.style.display = 'inline'; // Show the span
    } else {
      span.style.display = 'none'; // Hide the span
    }
  });
}
// Update the "extra pages" text
function updateExtraPagesText() {
  const extraPagesText = document.querySelector('[k-el="extraPages"]');
  let extraPagesAmount = Math.max(0, pageCount - 8); // Ensure extraPagesAmount is not negative
  extraPagesText.textContent = "+" + extraPagesAmount + " muuta sivua...";
  console.log(extraPagesAmount);
}

// Add a click event listener for the minus button
pagesMinus.addEventListener('click', () => {
  if (pageCount > 1) {
    pageCount--;
    updatePageCount();
    updatePriceRange(); // Update the price range when the page count changes
    showSpansByPageCount(pageCount); // Update the spans based on page count
    updateExtraPagesText(pageCount);
  }
});

// Add a click event listener for the plus button
pagesPlus.addEventListener('click', () => {
  pageCount++;
  updatePageCount();
  updatePriceRange(); // Update the price range when the page count changes
  showSpansByPageCount(pageCount); // Update the spans based on page count
  updateExtraPagesText(pageCount);
});

// Function to update the maintenance pricing based on selected radio button
function updateMaintenancePricing() {
  // Get the selected radio button in the "Maintenance" group
  const selectedMaintenanceRadioButton = document.querySelector('input[name="Maintenance"]:checked');

  // Get the maintenancePrice attribute value from the selected radio button as a number
  const maintenancePrice = selectedMaintenanceRadioButton.getAttribute('maintenancePrice');

  // Get the maintenancePriceUnit attribute value from the selected radio button as a number
  const maintenancePriceUnit = selectedMaintenanceRadioButton.getAttribute('maintenancePriceUnit');

  // Update pricing range
  maintenancePriceText.textContent = maintenancePrice;
  maintenancePriceUnitText.textContent = maintenancePriceUnit;
}

// Add a change event listener for radio buttons in the "Scope" group
scopeRadioButtons.forEach((radioButton) => {
  radioButton.addEventListener('change', () => {
    // Check if the radio button is checked
    if (radioButton.checked) {
      // Call the function to toggle the "cc-disabled" class for design elements
      toggleDesignElementsDisabledStatus();
      // Update the pricing range when the selected radio button changes
      updatePriceRange();
      showSpansByPageCount(pageCount); // Update the spans based on page count
      updateMaintenancePricing ();
    }
  });
});

// Add event listeners to radio buttons in the "Maintenance" group
maintenanceRadioButtons.forEach((radioButton) => {
  radioButton.addEventListener('change', () => {
    // Check if the radio button is checked
    if (radioButton.checked) {
      // Call the function to toggle the "cc-disabled" class for ongoing elements
      toggleOngoingFeaturesDisabledStatus();
      showSpansByPageCount(pageCount); // Update the spans based on page count
      updateMaintenancePricing ();
    }
  });
});

// Initialize the "cc-disabled" class status based on the default radio button state
toggleDesignElementsDisabledStatus();
toggleOngoingFeaturesDisabledStatus();

// Function to update the page count in the HTML
function updatePageCount() {
  pageAmount.textContent = pageCount;
}

// Initial call to show spans based on the default page count
showSpansByPageCount(pageCount);

//Update extra pages text
updateExtraPagesText(pageCount);
});


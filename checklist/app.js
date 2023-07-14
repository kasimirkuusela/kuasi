(function() {
    // Function to set a cookie
    function setCookie(name, value, days) {
      const expires = new Date();
      expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
      document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    }
  
    // Function to get the value of a cookie
    function getCookie(name) {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
          return cookie.substring(name.length + 1);
        }
      }
      return null;
    }
  
    // Function to calculate and update the progress for a set
    function updateProgress(setName) {
      // Get all the checkboxes in the set
      const checkboxes = document.querySelectorAll(`input[k-el^="${setName}"]`);
  
      // Calculate the total number of checkboxes
      const totalCheckboxes = checkboxes.length;
  
      // Calculate the number of checked checkboxes
      let checkedCount = 0;
      checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
          checkedCount++;
        }
      });
  
      // Update the progress elements for the set
      const progressElements = document.querySelectorAll(`[k-el="${setName}_progress"]`);
      if (progressElements) {
        progressElements.forEach(function(progressElement) {
          progressElement.textContent = `${checkedCount} / ${totalCheckboxes}`;
        });
      }
  
      // Save the checkbox states to the cookie
      const checkboxStates = Array.from(checkboxes).map(function(checkbox) {
        return checkbox.checked;
      });
      setCookie(`${setName}_progress`, checkboxStates.join(','), 365);
  
      // Update the overall progress bar
      updateOverallProgress();
    }
  
    // Function to update the overall progress bar
    function updateOverallProgress() {
      // Get all the checkboxes on the page
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  
      // Calculate the total number of checkboxes
      const totalCheckboxes = checkboxes.length;
  
      // Calculate the number of checked checkboxes
      let checkedCount = 0;
      checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
          checkedCount++;
        }
      });
  
      // Calculate the overall progress percentage
      const progressPercentage = (checkedCount / totalCheckboxes) * 100;
  
      // Update the fill element of the overall progress bar
      const fillElement = document.querySelector('[k-el="progress_fill"]');
      if (fillElement) {
        fillElement.style.width = `${progressPercentage}%`;
      }
  
      // Update the total progress element
      const totalProgressElement = document.querySelector('[k-el="total_progress"]');
      if (totalProgressElement) {
        const totalProgressValue = `${checkedCount} / ${totalCheckboxes}`;
        totalProgressElement.textContent = totalProgressValue;
  
        // Save the total progress to the cookie
        setCookie('total_progress', totalProgressValue, 365);
      }
    }
  
    // Perform initial setup and update for each set's progress
    const sets = new Set();
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function(checkbox) {
      const setName = checkbox.getAttribute('k-el').split('_')[0];
      sets.add(setName);
  
      checkbox.addEventListener('change', function() {
        // Get the parent element with class "checklist-item"
        const parentDiv = this.closest('.checklist-item');
  
        // Check if the checkbox is checked
        if (this.checked) {
          // Add the class "checked" to the parent div
          parentDiv.classList.add('checked');
        } else {
          // Remove the class "checked" from the parent div
          parentDiv.classList.remove('checked');
        }
  
        // Get the set name from the checkbox's unique identifier
        const setName = checkbox.getAttribute('k-el').split('_')[0];
  
        // Update the progress for the set
        updateProgress(setName);
      });
    });
  
    sets.forEach(function(setName) {
      const checkboxes = document.querySelectorAll(`input[k-el^="${setName}"]`);
      const checkboxStates = getCookie(`${setName}_progress`);
  
      if (checkboxStates) {
        const states = checkboxStates.split(',');
        checkboxes.forEach(function(checkbox, index) {
          checkbox.checked = states[index] === 'true';
          const parentDiv = checkbox.parentNode;
          if (checkbox.checked) {
            parentDiv.classList.add('checked');
          } else {
            parentDiv.classList.remove('checked');
          }
        });
      } else {
        checkboxes.forEach(function(checkbox) {
          checkbox.checked = false;
          checkbox.parentNode.classList.remove('checked');
        });
      }
  
      updateProgress(setName);
    });
  
    // Retrieve the total progress from the cookie
    const totalProgressCookie = getCookie('total_progress');
    if (totalProgressCookie) {
      const totalProgressElement = document.querySelector('[k-el="total_progress"]');
      if (totalProgressElement) {
        totalProgressElement.textContent = totalProgressCookie;
      }
    }
  
    // Perform initial update for the overall progress bar
    updateOverallProgress();
  
    // Event listener for the reset element
    const resetElement = document.querySelector('[k-el="reset"]');
    if (resetElement) {
      resetElement.addEventListener('click', function() {
        checkboxes.forEach(function(checkbox) {
          checkbox.checked = false;
          const parentDiv = checkbox.parentNode;
          parentDiv.classList.remove('checked');
        });
  
        sets.forEach(function(setName) {
          const onpageProgress = document.querySelectorAll(`[k-el="${setName}_progress"]`);
          if (onpageProgress) {
            const totalCheckboxes = document.querySelectorAll(`input[k-el^="${setName}"]`).length;
            onpageProgress.forEach(function(progressElement) {
              progressElement.textContent = `0 / ${totalCheckboxes}`;
            });
            setCookie(`${setName}_progress`, '', 365);
          }
        });
  
        const totalProgressElement = document.querySelector('[k-el="total_progress"]');
        if (totalProgressElement) {
          const totalCheckboxes = checkboxes.length;
          totalProgressElement.textContent = `0 / ${totalCheckboxes}`;
          setCookie('total_progress', `0 / ${totalCheckboxes}`, 365);
        }
  
        updateOverallProgress();
      });
    }
  })();
  
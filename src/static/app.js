document.addEventListener("DOMContentLoaded", () => {
  const activitiesList = document.getElementById("activities-list");
  const activitySelect = document.getElementById("activity");
  const signupForm = document.getElementById("signup-form");
  const messageDiv = document.getElementById("message");

  // Función para obtener el email actual del formulario
  function getCurrentEmail() {
    return document.getElementById("email").value.trim();
  }

  // Función para crear la lista de participantes con opción de baja
  function renderParticipants(participants, activityName) {
    const currentEmail = getCurrentEmail();
    if (participants && participants.length > 0) {
      return `
        <div class="participants-section">
          <strong>Participants:</strong>
          <ul class="participants-list">
            ${participants
              .map(
                (p) =>
                  `<li>${p}${
                    p === currentEmail
                      ? ` <button class="unregister-btn" data-activity="${encodeURIComponent(
                          activityName
                        )}" data-email="${encodeURIComponent(
                          p
                        )}">Unregister</button>`
                      : ""
                  }</li>`
              )
              .join("")}
          </ul>
        </div>
      `;
    } else {
      return `
        <div class="participants-section">
          <strong>Participants:</strong>
          <span class="no-participants">No participants yet</span>
        </div>
      `;
    }
  }

  // Function to fetch activities from API
  async function fetchActivities() {
    try {
      const response = await fetch("/activities");
      const activities = await response.json();

      activitiesList.innerHTML = "";
      activitySelect.innerHTML =
        '<option value="">-- Select an activity --</option>';

      // Populate activities list
      Object.entries(activities).forEach(([name, details]) => {
        const activityCard = document.createElement("div");
        activityCard.className = "activity-card";
        const spotsLeft =
          details.max_participants - details.participants.length;

        // Usar renderParticipants
        const participantsHTML = renderParticipants(
          details.participants,
          name
        );

        activityCard.innerHTML = `
          <h4>${name}</h4>
          <p>${details.description}</p>
          <p><strong>Schedule:</strong> ${details.schedule}</p>
          <p><strong>Availability:</strong> ${spotsLeft} spots left</p>
          ${participantsHTML}
        `;

        activitiesList.appendChild(activityCard);

        // Add option to select dropdown
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        activitySelect.appendChild(option);
      });
    } catch (error) {
      activitiesList.innerHTML =
        "<p>Failed to load activities. Please try again later.</p>";
      console.error("Error fetching activities:", error);
    }
  }

  // Handle form submission
  signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const activity = document.getElementById("activity").value;

    try {
      const response = await fetch(
        `/activities/${encodeURIComponent(activity)}/signup?email=${encodeURIComponent(email)}`,
        {
          method: "POST",
        }
      );

      const result = await response.json();

      if (response.ok) {
        messageDiv.textContent = result.message;
        messageDiv.className = "success";
        signupForm.reset();
      } else {
        messageDiv.textContent = result.detail || "An error occurred";
        messageDiv.className = "error";
      }

      messageDiv.classList.remove("hidden");

      // Hide message after 5 seconds
      setTimeout(() => {
        messageDiv.classList.add("hidden");
      }, 5000);
    } catch (error) {
      messageDiv.textContent = "Failed to sign up. Please try again.";
      messageDiv.className = "error";
      messageDiv.classList.remove("hidden");
      console.error("Error signing up:", error);
    }
  });

  // Manejar click en botón Unregister
  activitiesList.addEventListener("click", async (event) => {
    if (
      event.target.classList.contains("unregister-btn")
    ) {
      const activity = event.target.getAttribute("data-activity");
      const email = event.target.getAttribute("data-email");
      if (
        confirm(
          `Are you sure you want to unregister from "${decodeURIComponent(
            activity
          )}"?`
        )
      ) {
        try {
          const response = await fetch(
            `/activities/${activity}/unregister?email=${email}`,
            {
              method: "POST",
            }
          );
          const result = await response.json();
          if (response.ok) {
            messageDiv.textContent = result.message || "Unregistered successfully";
            messageDiv.className = "success";
          } else {
            messageDiv.textContent = result.detail || "An error occurred";
            messageDiv.className = "error";
          }
          messageDiv.classList.remove("hidden");
          fetchActivities();
          setTimeout(() => {
            messageDiv.classList.add("hidden");
          }, 5000);
        } catch (error) {
          messageDiv.textContent =
            "Failed to unregister. Please try again.";
          messageDiv.className = "error";
          messageDiv.classList.remove("hidden");
          console.error("Error unregistering:", error);
        }
      }
    }
  });

  // Actualizar la lista de actividades cuando cambia el email
  document.getElementById("email").addEventListener("input", fetchActivities);

  // Initialize app
  fetchActivities();
});

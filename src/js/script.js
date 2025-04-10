// Countdown Timer
// Adjust the target date/time to your launch date
const countDownDate = new Date("July 23, 2025 00:00:00").getTime();

const countdownFunction = setInterval(() => {
  const now = new Date().getTime();
  const distance = countDownDate - now;

  // Calculate time components
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  const countdownEl = document.getElementById("countdown");

  if (distance < 0) {
    clearInterval(countdownFunction);
    countdownEl.innerHTML = "EXPIRED";
  } else {
    countdownEl.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }
}, 1000);

// Optional: Add event listener for the beta signup form (if any custom processing is needed)
document.querySelector(".beta-signup form").addEventListener("submit", function (e) {
  // For example, you can display a thank-you alert:
  // alert("Thank you for signing up!");
  // e.preventDefault(); // Uncomment to prevent the default form submission for testing
});

// Select the form element
const betaForm = document.getElementById("betaForm");

betaForm.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent the default form submission

  // Gather the form data
  const formData = new FormData(betaForm);

  // Submit the form data using fetch
  fetch(betaForm.action, {
    method: "POST",
    headers: {
      'Accept': 'application/json'
    },
    body: formData
  })
    .then(response => {
      if (response.ok) {
        // If submission is successful, redirect to your custom success page
        window.location.href = "thanks.html";
      } else {
        // If there's an error, try to extract error messages
        response.json().then(data => {
          if (data.errors) {
            alert(data.errors.map(error => error.message).join(", "));
          } else {
            alert("Oops! There was a problem submitting your form.");
          }
        });
      }
    })
    .catch(error => {
      alert("Oops! There was a problem submitting your form.");
      console.error("Error submitting form:", error);
    });
});


// Get the input element
var input = document.getElementById("inputDefault");

// Add a click event listener to the input
input.addEventListener("click", function() {
  // Get the div element
  var div = document.getElementById("multicounty");

  // Check if the input field has a value
  if (input.value !== "") {
    // Set the display property of the div to "block"
    div.style.display = "block";
  }
});
       
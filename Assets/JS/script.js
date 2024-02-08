// declaring a variable to generate a list with a btn click
var generateBtn = document.querySelector("#generate");

// Function to generate a list of Nutrient Supplements Stores
function generateNstores() {

}

document.getElementById('addressForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way
    
    const formData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        streetAddress: document.getElementById('streetAddress').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        zipCode: document.getElementById('zipCode').value,
    };
    
    console.log(formData);
    // You want to send the formData to a server
    // using fetch() to POST the data to an API endpoint
    // fetch('YOUR_ENDPOINT_HERE', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(formData),
    // })
    // .then(response => response.json())
    // .then(data => console.log(data))
    // .catch(error => console.error('Error:', error));
});

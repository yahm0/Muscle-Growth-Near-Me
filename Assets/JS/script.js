const arcgisApiKey = 'OUR_ARCGIS_API_KEY'; // Replace with our actual API key
const arcgisUrl = 'https://api.arcgis.com/...'; // ArcGIS API endpoint finian this is for the fetch()

function submitAddressForm(data) {
    // Logic to pass form data to ArcGIS API
    // This can include geocoding the address and fetching nearby gym locations
}

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

const arcgisApiKey = 'OUR_ARCGIS_API_KEY'; // Replace with our actual API key
// Using the ArcGIS Geocode API endpoint for geocoding addresses
const arcgisUrl = `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates`;

function submitAddressForm(data) {
    // Construct the query URL
    const queryUrl = `${arcgisUrl}?SingleLine=${encodeURIComponent(data.streetAddress + ', ' + data.city + ', ' + data.state + ', ' + data.zipCode)}&f=json&outFields=Match_addr,Addr_type&maxLocations=1&forStorage=false&token=${arcgisApiKey}`;

    // Fetching geocode data from ArcGIS API
    fetch(queryUrl)
        .then(response => response.json())
        .then(data => {
            if (data.candidates && data.candidates.length > 0) {
                const location = data.candidates[0].location;
                console.log("Geocode success:", location);
                // Finian here you can add more logic to use the geocoded location,
                // such as displaying it on a map or fetching nearby gyms locations. I am leaving this up to you Finian let me know if you have issues.
            } else {
                console.log("No locations found");
            }
        })
        .catch(error => {
            console.error('Geocoding error:', error);
        });
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
    // logging formData, it should submit it to the ArcGIS API
    submitAddressForm(formData);
});

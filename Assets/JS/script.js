const arcgisApiKey = 'AAPKe88698c0fe014a78aca0dc9a7cf22b6731RgaaSIwK-O0IwR0lVmPdf7BHALMVHUSyhzu5ZxK1b5NhBtrjitV-GqGFT9vzkT';
const arcgisUrl = 'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates';

// ArcGIS API map initialization
require([
    'esri/Map',
    'esri/views/MapView',
    'esri/widgets/Search'
], function (Map, MapView, Search) {

    const map = new Map({
        basemap: 'streets-navigation-vector'
    });

    const mapView = new MapView({
        container: 'map',
        map: map,
        center: [0, 0], // Your default center
        zoom: 4 // Your default zoom level
    });

    function submitAddressForm(data) {
        const queryUrl = `${arcgisUrl}?SingleLine=${encodeURIComponent(data.streetAddress + ', ' + data.city + ', ' + data.state + ', ' + data.zipCode)}&f=json&outFields=Match_addr,Addr_type&maxLocations=1&forStorage=false&token=${arcgisApiKey}`;

        fetch(queryUrl)
            .then(response => response.json())
            .then(data => {
                if (data.candidates && data.candidates.length > 0) {
                    const location = data.candidates[0].location;
                    console.log("Geocode success:", location);

                    // Set the map view's center and zoom to the geocoded location
                    mapView.goTo({
                        target: [location.x, location.y],
                        zoom: 15
                    });

                    // Add a graphic (marker) at the geocoded location
                    mapView.graphics.removeAll(); // Clear previous graphics
                    mapView.graphics.add({
                        geometry: {
                            type: 'point',
                            x: location.x,
                            y: location.y
                        },
                        symbol: {
                            type: 'simple-marker',
                            color: 'red',
                            size: '10px'
                        }
                    });

                    mapView.popup.open({
                        title: 'Location Found',
                        content: data.candidates[0].address
                    });

                    // Scroll the webpage to the map section
                    window.scrollTo({
                        top: document.getElementById('map').offsetTop,
                        behavior: 'smooth'
                    });
                } else {
                    console.log("No locations found");
                }
            })
            .catch(error => {
                console.error('Geocoding error:', error);
            });
    }

    document.getElementById('addressForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            streetAddress: document.getElementById('streetAddress').value,
            city: document.getElementById('city').value,
            state: document.getElementById('state').value,
            zipCode: document.getElementById('zipCode').value,
        };

        console.log(formData);
        submitAddressForm(formData);
    });
});


const openWeatherMapApiKey = 'd9c913f34b7f7ad483a86bda33cdc185';

// Function to update the day/night icon based on OpenWeatherMap data
function updateDayNightIcon(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${openWeatherMapApiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const now = new Date().getTime();
            const sunrise = new Date(data.sys.sunrise * 1000).getTime();
            const sunset = new Date(data.sys.sunset * 1000).getTime();
            
            const icon = now >= sunrise && now < sunset ? 'sun.png' : 'moon.png'; 
            
            document.getElementById('dayNightIcon').src = icon;
            document.getElementById('dayNightIcon').alt = now >= sunrise && now < sunset ? 'Sun Icon' : 'Moon Icon';
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

// Fetch user location from IP address using ipinfo.io
fetch('https://ipinfo.io/json?token=6056b3ee193a2c') 
    .then(response => response.json())
    .then(loc => {
        const [lat, lon] = loc.loc.split(',');
        updateDayNightIcon(lat, lon);
    })
    .catch(error => console.error('Error fetching IP info:', error));


// Call the function to update the icon when the page loads
updateDayNightIcon();
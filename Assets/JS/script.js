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
        center: [0, 0], // Default center view
        zoom: 4 // Default zoom level
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
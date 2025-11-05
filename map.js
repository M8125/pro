document.addEventListener("DOMContentLoaded", function () {
    // Initialize map centered in India
    var map = L.map('map').setView([20.5937, 78.9629], 5);

    // Load OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // List of famous beach locations in India
    var beaches = [
        { name: "Radhanagar Beach, Andaman & Nicobar", coords: [11.6737, 92.7380] },
        { name: "Palolem Beach, Goa", coords: [15.0120, 74.0237] },
        { name: "Varkala Beach, Kerala", coords: [8.7359, 76.7014] },
        { name: "Marina Beach, Tamil Nadu", coords: [13.0500, 80.2824] },
        { name: "Kovalam Beach, Kerala", coords: [8.4026, 76.9782] },
        { name: "Puri Beach, Odisha", coords: [19.7983, 85.8249] },
        { name: "Mandarmani Beach, West Bengal", coords: [21.6628, 87.6657] },
        { name: "Gokarna Beach, Karnataka", coords: [14.5490, 74.3188] }
    ];

    // Add markers to the map
    beaches.forEach(beach => {
        L.marker(beach.coords)
            .addTo(map)
            .bindPopup(`<b>${beach.name}</b>`);
    });

    console.log("OpenStreetMap loaded with Indian beach locations.");
});

document.addEventListener('DOMContentLoaded', () => {
    let isTracking = false;
    let watchId;
    let startTime;
    let idleTime = 0;
    let idleTimer;
    let goalSteps = 0;
    let stepsTaken = 0;
    let map;
    let marker;

    const quotes = [
        '"Fitness is not about being better than someone else. It’s about being better than you used to be." — Unknown',
        '"The only bad workout is the one that didn’t happen." — Unknown',
        '"You don’t have to be great to start, but you have to start to be great." — Zig Ziglar',
        '"Motivation is what gets you started. Habit is what keeps you going." — Jim Ryun',
        '"The difference between a successful person and others is not a lack of strength, not a lack of knowledge, but rather a lack in will." — Vince Lombardi'
    ];

    const stickers = [
        'https://cdn-icons-png.flaticon.com/256/6935/6935795.png', // Replace with actual URL
        'https://cdn-icons-png.flaticon.com/256/8883/8883893.png', // Replace with actual URL
        'https://image.spreadshirtmedia.com/image-server/v1/products/T1459A839PA3861PT28D1035153403W9090H10000/views/1,width=378,height=378,appearanceId=839,backgroundColor=F2F2F2/gym.jpg', // Replace with actual URL
        'https://example.com/stickers/fitness4.png', // Replace with actual URL
        'https://example.com/stickers/fitness5.png'  // Replace with actual URL
    ];

    const startTracking = () => {
        if (navigator.geolocation) {
            watchId = navigator.geolocation.watchPosition(position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                document.getElementById('status').innerText = `Exploring... Lat: ${lat}, Lon: ${lon}`;

                // Update map with the new location
                if (map) {
                    marker.setPosition(new google.maps.LatLng(lat, lon));
                    map.setCenter(new google.maps.LatLng(lat, lon));
                }
            }, error => {
                document.getElementById('status').innerText = 'Oops! Error getting location.';
            });

            // Initialize map
            if (!map) {
                map = new google.maps.Map(document.getElementById('map'), {
                    center: { lat: 0, lng: 0 },
                    zoom: 15
                });
                marker = new google.maps.Marker({
                    position: { lat: 0, lng: 0 },
                    map: map
                });
            }

            startTime = new Date();
            isTracking = true;

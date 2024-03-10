// Request an API endpoint
document.addEventListener('DOMContentLoaded', function () {
    // Send a POST request to retrieve places data
    fetch('http://0.0.0.0:5001/api/v1/places_search/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    })
    .then(response => response.json())
    .then(data => {
        // Access the section.places element
        const placesSection = document.querySelector('section.places');

        // Loop through the places data and create article tags
        data.forEach(place => {
            // Create the article element
            const article = document.createElement('article');

            // Construct the HTML content for the place
            article.innerHTML = `
                <div class="title_box">
                    <h2>${place.name}</h2>
                    <div class="price_by_night">$${place.price_by_night}</div>
                </div>
                <div class="information">
                    <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                    <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                    <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
                </div>
                <div class="description">${place.description}</div>
            `;

            // Append the article to the placesSection
            placesSection.appendChild(article);
        });
    })
    .catch(error => console.error('Error:', error));
});

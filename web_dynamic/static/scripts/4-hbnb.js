// When the button tag is clicked, a new POST request to
// places_search should be made with the list of Amenities checked

$(document).ready(function() {
    // Function to update the API status
    function updateAPIStatus() {
        $.get('http://0.0.0.0:5001/api/v1/status/', function(data) {
            if (data.status === "OK") {
                $('#api_status').addClass('available');
            } else {
                $('#api_status').removeClass('available');
            }
        });
    }

    // Call the updateAPIStatus function initially
    updateAPIStatus();

    // Function to handle filter button click
    $('#filter_button').click(function() {
        // Get the list of checked amenities
        var amenities = [];
        $('input[type=checkbox]:checked').each(function() {
            amenities.push($(this).attr('data-id'));
        });

        // Make a POST request to places_search with the list of amenities
        $.ajax({
            type: 'POST',
            url: 'http://0.0.0.0:5001/api/v1/places_search',
            contentType: 'application/json',
            data: JSON.stringify({ amenities: amenities }),
            success: function(data) {
                // Clear the current places
                $('.places').empty();

                // Loop through the retrieved places and create article tags
                data.forEach(function(place) {
                    var article = $('<article>');
                    var titleBox = $('<div class="title_box">');
                    var information = $('<div class="information">');
                    var user = $('<div class="user">');
                    var description = $('<div class="description">');

                    titleBox.append($('<h2>').text(place.name));
                    titleBox.append($('<div class="price_by_night">').text('$' + place.price_by_night));
                    information.append($('<div class="max_guest">').text(place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : '')));
                    information.append($('<div class="number_rooms">').text(place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : '')));
                    information.append($('<div class="number_bathrooms">').text(place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : '')));
                    user.text('Owner: ' + place.user.first_name + ' ' + place.user.last_name);
                    description.html(place.description);

                    article.append(titleBox, information, user, description);
                    $('.places').append(article);
                });
            }
        });
    });
});

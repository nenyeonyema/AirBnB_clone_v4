$(document).ready(function() {
    let reviewsVisible = false;

    // Function to fetch and display reviews
    function fetchReviews() {
        // Send AJAX request to fetch reviews
        $.ajax({
            url: 'http://0.0.0.0:5001/api/v1/reviews/',
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                if (data.length > 0) {
                    // Clear existing reviews
                    $('#review_list').empty();
                    // Append each review to the review list
                    data.forEach(function(review) {
                        $('#review_list').append('<li>' + review.text + '</li>');
                    });
                } else {
                    // If no reviews found
                    $('#review_list').html('<li>No reviews available</li>');
                }
            },
            error: function(xhr, status, error) {
                console.error('Error fetching reviews:', error);
            }
        });
    }

    // Function to toggle visibility of reviews
    $('#show_hide').click(function() {
        if (!reviewsVisible) {
            fetchReviews();
            $('#show_hide').text('hide');
            reviewsVisible = true;
        } else {
            $('#review_list').empty();
            $('#show_hide').text('show');
            reviewsVisible = false;
        }
    });
});

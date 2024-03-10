// A script that listens for changes on each input checkbox tag
$(document).ready(function(){
    $('input[type="checkbox"]').change(function(){
        var amenities = [];
        $('input[type="checkbox"]:checked').each(function(){
            amenities.push($(this).data('id'));
        });
        var amenitiesText = amenities.join(", ");
        $('div.amenities h4').text(amenitiesText);
    });
});

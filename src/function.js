const $ = document.querySelector.bind(document);

function toDegrees(radians) {
    return radians * (180 / Math.PI);
}
function toRadians(degrees) {
    return degrees * Math.PI / 180;
}


$("#fullscreenButton").addEventListener("click", () => {
    $("#menu").style.display = 'none';
});



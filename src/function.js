const $ = document.querySelector.bind(document);

function toDegrees(radians) {
    return radians * (180 / Math.PI);
}
function toRadians(degrees) {
    return degrees * Math.PI / 180;
}

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.error(`Lỗi khi vào toàn màn hình: ${err.message}`);
        });
        $("#menu").style.display = "none";
    } else {
        document.exitFullscreen();
        $("#menu").style.display = "flex";
    }
}

$("#fullscreenButton").addEventListener("click", toggleFullScreen);
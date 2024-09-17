document.addEventListener('DOMContentLoaded', function() {
    function toggleFullscreen() {
        var imgs = document.getElementsByClassName('image');
        
        if (imgs.length > 0) {
            for (let i = 0; i < imgs.length; i++) {
                imgs[i].onclick = function (event) {                    
                    if (!document.fullscreenElement) {
                        imgs[i].requestFullscreen()
                    } else {
                        document.exitFullscreen()
                    }
                };
            }
        } else {
            console.log("No image with class 'image' found!");  // Debugging log
        }
    }
    toggleFullscreen();
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && document.fullscreenElement) {
        document.exitFullscreen();
    }
});

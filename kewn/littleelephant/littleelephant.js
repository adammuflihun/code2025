// Create an Intersection Observer to detect when videos are in view
console.log("anjay waginjay");
const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const video = entry.target;
        
        if (entry.isIntersecting) {
            // Only attempt to play if not already played
            if (!video.dataset.hasPlayed) {
                playVideoOnce(video);
            }
        } else {
            // When video leaves viewport, just pause it
            video.pause();
        }
    });
}, {
    threshold: 0.3 // Reduced threshold for earlier triggering
});

// Function to handle one-time video playback
function playVideoOnce(video) {
    // Mark the video as played immediately to prevent multiple plays
    video.dataset.hasPlayed = 'true';
    
    if (video.readyState >= 2) {
        video.playbackRate = 2.0;
        video.play().catch(e => {
            // console.log("Playback failed:", e);
        });
    } else {
        video.addEventListener('canplay', () => {
            video.playbackRate = 2.0;
            video.play().catch(e => {
                // console.log("Playback failed:", e);
            });
        }, { once: true });
    }
}

// Get all video elements and observe them
document.querySelectorAll('.videoitem').forEach(video => {
    // Initialize played state using dataset
    video.dataset.hasPlayed = 'false';
    
    // Force reload the video source to ensure it's fresh
    const currentSrc = video.querySelector('source').src;
    video.querySelector('source').src = currentSrc;
    video.load();
    
    videoObserver.observe(video);
});


  

// Create an Intersection Observer to detect when videos are in view
console.log("anjay waginjay");
const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const video = entry.target;
        
        // Only play if video hasn't been played before
        if (entry.isIntersecting && !video.hasPlayed) {
            if (video.readyState >= 2) {
                video.playbackRate = 2.0;  // Set 2x speed
                video.play().catch(e => {
                    // console.log("Playback failed:", e);
                });
                video.hasPlayed = true;  // Mark as played
            } else {
                // Add event listener for when video can play
                video.addEventListener('canplay', () => {
                    video.playbackRate = 2.0;  // Set 2x speed
                    video.play().catch(e => {
                        // console.log("Playback failed:", e);
                    });
                    video.hasPlayed = true;  // Mark as played
                }, { once: true });
            }
        } else if (!entry.isIntersecting) {
            // When video leaves viewport, just pause it
            video.pause();
            // Removed the currentTime reset to keep video position
        }
    });
}, {
    threshold: 0.3 // Reduced threshold for earlier triggering
});

// Get all video elements and observe them
document.querySelectorAll('.videoitem').forEach(video => {
    // Initialize hasPlayed flag
    video.hasPlayed = false;
    
    // Force reload the video source to ensure it's fresh
    const currentSrc = video.querySelector('source').src;
    video.querySelector('source').src = currentSrc;
    video.load();
    
    videoObserver.observe(video);
});


  

// Create an Intersection Observer to detect when videos are in view
const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const video = entry.target;
        
        if (entry.isIntersecting) {
            // Play video when it enters viewport
            if (video.readyState >= 2) {
                video.play().catch(e => {
                    // console.log("Playback failed:", e);
                });
            } else {
                // Add event listener for when video can play
                video.addEventListener('canplay', () => {
                    video.play().catch(e => {
                        // console.log("Playback failed:", e);
                    });
                }, { once: true });
            }
        } else {
            // When video leaves viewport, pause and reset
            video.pause();
            video.currentTime = 0;
        }
    });
}, {
    threshold: 0.3 // Reduced threshold for earlier triggering
});

// Get all video elements and observe them
document.querySelectorAll('.videoitem').forEach(video => {
    // Remove the ended event listener that was resetting the video
    
    // Force reload the video source to ensure it's fresh
    const currentSrc = video.querySelector('source').src;
    video.querySelector('source').src = currentSrc;
    video.load();
    
    videoObserver.observe(video);
});


  

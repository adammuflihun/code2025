    // Create an Intersection Observer to detect when videos are in view
    console.log("anjay kuy");


    
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            
            if (entry.isIntersecting) {
                // Play video when it enters viewport
                if (video.readyState >= 2) {
                    video.playbackRate = 2.0;  // Set 2x speed
                    video.play().catch(e => {
                        // console.log("Playback failed:", e);
                    });
                } else {
                    // Add event listener for when video can play
                    video.addEventListener('canplay', () => {
                        video.playbackRate = 2.0;  // Set 2x speed
                        video.play().catch(e => {
                            // console.log("Playback failed:", e);
                        });
                    }, { once: true });
                }
            } else {
                // When video leaves viewport, pause it
                video.pause();
            }
        });
    }, {
        threshold: 0.3 // Reduced threshold for earlier triggering
    });

    // Get all video elements and observe them
    document.querySelectorAll('.videoitem').forEach(video => {
        // Force reload the video source to ensure it's fresh
        const currentSrc = video.querySelector('source').src;
        video.querySelector('source').src = currentSrc;
        video.load();
        
        videoObserver.observe(video);
    });


    

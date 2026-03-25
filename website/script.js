// Home Band & Jam Room — Website Scripts

document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    // Close nav when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('active'));
    });
  }

  // Mobile dropdown toggles
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const dropdownMenu = toggle.nextElementSibling;
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      
      // Close all other dropdowns
      dropdownToggles.forEach(otherToggle => {
        if (otherToggle !== toggle) {
          otherToggle.setAttribute('aria-expanded', 'false');
          const otherMenu = otherToggle.nextElementSibling;
          if (otherMenu) {
            otherMenu.style.display = 'none';
          }
        }
      });
      
      // Toggle current dropdown
      if (dropdownMenu) {
        const newExpanded = !isExpanded;
        toggle.setAttribute('aria-expanded', newExpanded);
        dropdownMenu.style.display = newExpanded ? 'block' : 'none';
        
        // Update arrow
        const arrow = toggle.textContent.includes('▼') ? toggle : toggle.querySelector('.arrow');
        if (arrow) {
          arrow.textContent = newExpanded ? '▲' : '▼';
        }
      }
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
      dropdownToggles.forEach(toggle => {
        toggle.setAttribute('aria-expanded', 'false');
        const dropdownMenu = toggle.nextElementSibling;
        if (dropdownMenu) {
          dropdownMenu.style.display = 'none';
        }
      });
    }
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Add subtle animation on scroll for cards
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.equipment-card, .theory-card, .gig-card, .video-card, .composition-card, .fusion-card, .lyrics-card, .join-card, .component-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });

  // Advanced Audio Player Controls
  const favAudioPlayer = document.getElementById('fav-audio-player');
  const playlistItems = document.querySelectorAll('.playlist-item');

  if (favAudioPlayer && playlistItems.length > 0) {
    let currentAudioIndex = 0;
    let isPlaying = false;
    let isMuted = false;
    let isLooping = false;
    let playbackSpeed = 1;
    let currentEqPreset = 'flat';

    // Initialize controls
    const playPauseBtn = document.getElementById('play-pause-btn');
    const stopBtn = document.getElementById('stop-btn');
    const progressBar = document.getElementById('progress-bar');
    const currentTimeEl = document.getElementById('current-time');
    const totalTimeEl = document.getElementById('total-time');
    const muteBtn = document.getElementById('mute-btn');
    const volumeSlider = document.getElementById('volume-slider');
    const volumeDisplay = document.getElementById('volume-display');
    const bassControl = document.getElementById('bass-control');
    const midControl = document.getElementById('mid-control');
    const trebleControl = document.getElementById('treble-control');
    const loopBtn = document.getElementById('loop-btn');
    const shuffleBtn = document.getElementById('shuffle-btn');
    const speedBtn = document.getElementById('speed-btn');
    const eqPresetBtn = document.getElementById('eq-preset-btn');
    const spatialBtn = document.getElementById('spatial-btn');

    // EQ Sliders
    const eqSliders = document.querySelectorAll('.eq-slider');
    const eqValues = document.querySelectorAll('.eq-value');

    // Tone sliders
    const toneValues = document.querySelectorAll('.tone-value');

    const loadAudio = (index) => {
      // Remove active class from all
      playlistItems.forEach(item => item.classList.remove('active'));
      
      // Update active class
      playlistItems[index].classList.add('active');
      
      // Update audio source
      const audioSrc = encodeURI(playlistItems[index].getAttribute('data-src'));
      favAudioPlayer.src = audioSrc;
      favAudioPlayer.load();
      
      currentAudioIndex = index;
      updateProgress();
    };

    const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const updateProgress = () => {
      if (favAudioPlayer.duration) {
        progressBar.value = (favAudioPlayer.currentTime / favAudioPlayer.duration) * 100;
        currentTimeEl.textContent = formatTime(favAudioPlayer.currentTime);
        totalTimeEl.textContent = formatTime(favAudioPlayer.duration);
      }
    };

    // Play/Pause functionality
    playPauseBtn.addEventListener('click', () => {
      if (isPlaying) {
        favAudioPlayer.pause();
        playPauseBtn.textContent = '▶️';
        isPlaying = false;
      } else {
        favAudioPlayer.play();
        playPauseBtn.textContent = '⏸️';
        isPlaying = true;
      }
    });

    // Stop functionality
    stopBtn.addEventListener('click', () => {
      favAudioPlayer.pause();
      favAudioPlayer.currentTime = 0;
      playPauseBtn.textContent = '▶️';
      isPlaying = false;
      updateProgress();
    });

    // Progress bar functionality
    progressBar.addEventListener('input', () => {
      if (favAudioPlayer.duration) {
        favAudioPlayer.currentTime = (progressBar.value / 100) * favAudioPlayer.duration;
      }
    });

    // Volume controls
    volumeSlider.addEventListener('input', () => {
      favAudioPlayer.volume = volumeSlider.value / 100;
      volumeDisplay.textContent = `${volumeSlider.value}%`;
    });

    muteBtn.addEventListener('click', () => {
      isMuted = !isMuted;
      favAudioPlayer.muted = isMuted;
      muteBtn.textContent = isMuted ? '🔇' : '🔊';
    });

    // EQ Controls
    eqSliders.forEach((slider, index) => {
      slider.addEventListener('input', () => {
        eqValues[index].textContent = `${slider.value}dB`;
        applyEqualizer();
      });
    });

    // Tone Controls
    [bassControl, midControl, trebleControl].forEach((slider, index) => {
      slider.addEventListener('input', () => {
        toneValues[index].textContent = slider.value;
        applyToneControls();
      });
    });

    const applyEqualizer = () => {
      // Apply EQ settings to audio context (simplified for demo)
      const eqSettings = Array.from(eqSliders).map(slider => parseFloat(slider.value));
      console.log('EQ Settings:', eqSettings);
    };

    const applyToneControls = () => {
      // Apply tone controls to audio context (simplified for demo)
      const bass = parseFloat(bassControl.value);
      const mid = parseFloat(midControl.value);
      const treble = parseFloat(trebleControl.value);
      console.log('Tone Controls:', { bass, mid, treble });
    };

    // Advanced controls
    loopBtn.addEventListener('click', () => {
      isLooping = !isLooping;
      favAudioPlayer.loop = isLooping;
      loopBtn.style.background = isLooping ? 'var(--accent)' : 'var(--card-bg)';
      loopBtn.style.color = isLooping ? '#000' : 'var(--accent)';
    });

    shuffleBtn.addEventListener('click', () => {
      // Shuffle playlist
      const shuffledArray = Array.from(playlistItems).sort(() => Math.random() - 0.5);
      playlistItems.forEach((item, index) => {
        item.parentNode.insertBefore(shuffledArray[index], item.nextSibling);
      });
    });

    speedBtn.addEventListener('click', () => {
      // Cycle through playback speeds: 0.5x, 1x, 1.5x, 2x
      const speeds = [0.5, 1, 1.5, 2];
      const currentIndex = speeds.indexOf(playbackSpeed);
      const nextIndex = (currentIndex + 1) % speeds.length;
      playbackSpeed = speeds[nextIndex];
      favAudioPlayer.playbackRate = playbackSpeed;
      speedBtn.textContent = `⚡ ${playbackSpeed}x`;
    });

    eqPresetBtn.addEventListener('click', () => {
      // Cycle through EQ presets: flat, rock, pop, jazz, classical
      const presets = ['flat', 'rock', 'pop', 'jazz', 'classical'];
      const currentIndex = presets.indexOf(currentEqPreset);
      const nextIndex = (currentIndex + 1) % presets.length;
      currentEqPreset = presets[nextIndex];
      
      // Apply preset values
      const presetValues = {
        flat: [0, 0, 0, 0],
        rock: [3, 1, -2, 4],
        pop: [2, 0, 2, 3],
        jazz: [1, 2, 1, 2],
        classical: [0, 1, 0, 1]
      };
      
      const values = presetValues[currentEqPreset];
      eqSliders.forEach((slider, index) => {
        slider.value = values[index];
        eqValues[index].textContent = `${values[index]}dB`;
      });
      
      eqPresetBtn.textContent = `🎛️ ${currentEqPreset.charAt(0).toUpperCase()}`;
    });

    spatialBtn.addEventListener('click', () => {
      // Toggle spatial audio (simplified for demo)
      console.log('Spatial audio toggled');
    });

    // Update progress during playback
    favAudioPlayer.addEventListener('timeupdate', updateProgress);

    // Click event for playlist items
    playlistItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        currentAudioIndex = index;
        loadAudio(currentAudioIndex);
      });
    });

    // Auto-play next video when current ends
    favAudioPlayer.addEventListener('ended', () => {
      if (isLooping) {
        loadAudio(currentAudioIndex);
      } else {
        currentAudioIndex++;
        if (currentAudioIndex >= playlistItems.length) {
          currentAudioIndex = 0; // Loop back to start
        }
        loadAudio(currentAudioIndex);
      }
    });
  }
});

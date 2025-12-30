(function() {
    console.log("Initializing Luntian Music Engine...");

    // MASTER PLAYLIST
    // Note: Ensure these files exist in your 'audio/' folder locally.
    window.LuntianPlaylist = [
        {
            title: "Mangrove Morning",
            artist: "Port Barton Ambience",
            src: "audio/mangroves.mp3",
            cover: "images/buoy.jpg"
        },
        {
            title: "Ang Luntiang Pangarap",
            artist: "Official Anthem",
            src: "audio/anthem.mp3", 
            cover: "images/logo.png"
        },
        {
            title: "Waves of Wide Reef",
            artist: "Nature Sounds",
            src: "audio/waves.mp3",
            cover: "images/hero-bg.jpg"
        }
    ];

    // --- PAGE DETECTION ---
    // If on Vibe Page (music.html) or Social Page, stop here.
    const path = window.location.pathname;
    if (path.includes('music.html') || path.includes('social.html')) {
        return; 
    }

    // --- FLOATING WIDGET VARIABLES ---
    let currentTrackIndex = 0;
    let isPlaying = false;
    let audio = new Audio();
    const playlist = window.LuntianPlaylist;

    // --- INJECT CSS ---
    const style = document.createElement('style');
    style.textContent = `
        #luntian-mini-player { position: fixed; bottom: 20px; right: 20px; z-index: 9999; font-family: 'Montserrat', sans-serif; display: flex; flex-direction: column; align-items: end; }
        #luntian-fab { width: 60px; height: 60px; background: #064e3b; border-radius: 50%; box-shadow: 0 4px 15px rgba(0,0,0,0.3); cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.3s ease; border: 2px solid #34d399; position: relative; overflow: hidden; }
        #luntian-fab:hover { transform: scale(1.1); }
        #luntian-fab img { width: 100%; height: 100%; object-fit: cover; opacity: 0.8; }
        .spin-vinyl { animation: spin 4s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        .fab-icon { position: absolute; color: white; font-size: 24px; z-index: 10; pointer-events: none; text-shadow: 0 2px 4px rgba(0,0,0,0.5); }
        #luntian-player-card { background: #1e293b; width: 280px; border-radius: 16px; padding: 16px; margin-bottom: 16px; box-shadow: 0 10px 25px rgba(0,0,0,0.3); border: 1px solid #334155; color: white; transform: translateY(20px); opacity: 0; pointer-events: none; transition: all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55); display: none; }
        #luntian-player-card.active { transform: translateY(0); opacity: 1; pointer-events: auto; display: block; }
        .player-header { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
        .player-art-small { width: 48px; height: 48px; border-radius: 8px; object-fit: cover; background: #334155; }
        .track-info { flex: 1; overflow: hidden; }
        .track-title { font-weight: 700; font-size: 14px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: #34d399; }
        .track-artist { font-size: 10px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; }
        .player-controls { display: flex; justify-content: space-between; align-items: center; }
        .ctrl-btn { background: none; border: none; color: #cbd5e1; cursor: pointer; font-size: 14px; transition: color 0.2s; }
        .ctrl-btn:hover { color: #34d399; }
        .play-btn { width: 36px; height: 36px; background: #34d399; color: #064e3b; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; box-shadow: 0 2px 8px rgba(52, 211, 153, 0.4); }
        .expand-link { position: absolute; top: 12px; right: 12px; font-size: 12px; color: #64748b; cursor: pointer; }
    `;
    document.head.appendChild(style);

    // --- INJECT HTML ---
    const playerContainer = document.createElement('div');
    playerContainer.id = 'luntian-mini-player';
    playerContainer.innerHTML = `
        <div id="luntian-player-card">
            <a href="music.html" class="expand-link" title="Open Full Player"><i class="fas fa-expand-alt"></i></a>
            <div class="player-header">
                <img src="${playlist[0].cover}" onerror="this.src='images/logo.png'" class="player-art-small" id="lp-art">
                <div class="track-info">
                    <div class="track-title" id="lp-title">${playlist[0].title}</div>
                    <div class="track-artist" id="lp-artist">${playlist[0].artist}</div>
                </div>
            </div>
            <div class="player-controls">
                <button class="ctrl-btn" id="lp-prev"><i class="fas fa-step-backward"></i></button>
                <button class="play-btn" id="lp-playpause"><i class="fas fa-play"></i></button>
                <button class="ctrl-btn" id="lp-next"><i class="fas fa-step-forward"></i></button>
            </div>
        </div>

        <div id="luntian-fab" title="Luntian Vibe">
            <div class="fab-icon"><i class="fas fa-music"></i></div>
            <img src="images/logo.png" id="lp-fab-img">
        </div>
    `;
    document.body.appendChild(playerContainer);

    // --- CONTROLLER ---
    const card = document.getElementById('luntian-player-card');
    const fab = document.getElementById('luntian-fab');
    const fabImg = document.getElementById('lp-fab-img');
    const fabIcon = fab.querySelector('.fab-icon i');
    const playPauseBtn = document.getElementById('lp-playpause');
    const prevBtn = document.getElementById('lp-prev');
    const nextBtn = document.getElementById('lp-next');
    const titleEl = document.getElementById('lp-title');
    const artistEl = document.getElementById('lp-artist');
    const artEl = document.getElementById('lp-art');

    fab.addEventListener('click', () => card.classList.toggle('active'));

    function loadTrack(index) {
        const track = playlist[index];
        audio.src = track.src;
        titleEl.innerText = track.title;
        artistEl.innerText = track.artist;
        artEl.src = track.cover;
        fabImg.src = track.cover;
    }

    function togglePlay() {
        if (audio.paused) {
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.then(_ => {
                    isPlaying = true;
                    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                    fabIcon.classList.remove('fa-music');
                    fabIcon.classList.add('fa-volume-up');
                    fabImg.classList.add('spin-vinyl');
                }).catch(error => {
                    console.log("Auto-play prevented or file not found.");
                });
            }
        } else {
            audio.pause();
            isPlaying = false;
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            fabIcon.classList.remove('fa-volume-up');
            fabIcon.classList.add('fa-music');
            fabImg.classList.remove('spin-vinyl');
        }
    }

    prevBtn.addEventListener('click', () => {
        currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
        loadTrack(currentTrackIndex);
        if(isPlaying) audio.play();
    });

    nextBtn.addEventListener('click', () => {
        currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
        loadTrack(currentTrackIndex);
        if(isPlaying) audio.play();
    });

    playPauseBtn.addEventListener('click', togglePlay);
    loadTrack(currentTrackIndex);

})();
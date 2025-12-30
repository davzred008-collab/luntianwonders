document.addEventListener("DOMContentLoaded", function() {
    loadHeader();
    loadFooter();
    setupToastSystem();
});

// --- 1. DYNAMIC HEADER INJECTION ---
function loadHeader() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (!headerPlaceholder) return;

    // Defines the Navigation HTML
    const headerHTML = `
    <nav class="bg-[#064e3b] text-white fixed top-0 left-0 w-full z-50 shadow-lg transition-all duration-300">
        <div class="container mx-auto px-6 py-4">
            <div class="flex justify-between items-center">
                <!-- LOGO -->
                <div class="flex items-center space-x-3">
                    <a href="/">
                        <img src="images/logo.png" onerror="this.src='https://placehold.co/40x40?text=LW'" alt="Luntian Wonders" class="h-10 w-auto object-contain">
                    </a>
                    <div>
                        <h1 class="font-sans font-black text-xl tracking-wider uppercase">Luntian <span class="text-teal-500">WONDERS</span></h1>
                        <p class="text-[10px] text-emerald-200 font-light tracking-widest uppercase hidden md:block">Port Barton Marine Park</p>
                    </div>
                </div>

                <!-- DESKTOP MENU -->
                <div class="hidden md:flex space-x-6 font-bold text-xs items-center tracking-wide font-heading">
                    <a href="/" class="nav-link text-emerald-100 hover:text-white transition py-1">HOME</a>
                    <a href="/about" class="nav-link text-emerald-100 hover:text-white transition py-1">STORY</a>
                    <a href="/activities" class="nav-link text-emerald-100 hover:text-white transition py-1">ACTIVITIES</a>
                    <a href="/community" class="nav-link text-emerald-100 hover:text-white transition py-1">COMMUNITY</a>
                    
                    <!-- PROJECTS DROPDOWN -->
                    <div class="relative group">
                        <button class="nav-link flex items-center gap-1 text-emerald-100 group-hover:text-white transition py-1 cursor-pointer focus:outline-none">
                            PROJECTS <i class="fas fa-chevron-down text-[9px]"></i>
                        </button>
                        <div class="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-xl py-2 hidden group-hover:block border border-emerald-100 z-50">
                            <a href="/projects" class="block px-4 py-3 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 font-bold flex items-center gap-2"><i class="fas fa-th-large w-4"></i> All Projects</a>
                            <a href="/mangrove" class="block px-4 py-3 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 font-bold border-t border-slate-50 flex items-center gap-2"><i class="fas fa-route w-4"></i> Mangrove Labyrinth</a>
                            <a href="/donate" class="block px-4 py-3 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 font-bold border-t border-slate-50 flex items-center gap-2"><i class="fas fa-anchor w-4"></i> Luntian Anchor</a>
                        </div>
                    </div>

                    <a href="/status" class="nav-link text-emerald-100 hover:text-white transition py-1">STATUS</a>
                    
                    <!-- VIBE LINK -->
                    <a href="/music" class="nav-link text-emerald-100 hover:text-white transition py-1">VIBE</a>

                    <!-- Login Icon -->
                    <a href="/login" class="text-emerald-100 hover:text-white transition py-1" title="Member Portal">
                        <i class="fas fa-user-circle text-lg"></i>
                    </a>

                    <a href="/donate" class="bg-yellow-400 text-[#064e3b] px-4 py-2 rounded-full hover:bg-yellow-300 transition shadow-md font-black">
                        DONATE
                    </a>
                </div>

                <!-- MOBILE BURGER ICON -->
                <button id="mobile-menu-btn" class="md:hidden text-white text-2xl focus:outline-none" onclick="toggleMobileMenu()">
                    <i class="fas fa-bars"></i>
                </button>
            </div>

            <!-- MOBILE MENU LIST -->
            <div id="mobile-menu" class="hidden md:hidden mt-4 pb-4 border-t border-emerald-600/30 pt-4 flex flex-col space-y-4 font-heading">
                <a href="/" class="block text-emerald-100 font-bold hover:text-white">HOME</a>
                <a href="/about" class="block text-emerald-100 font-bold hover:text-white">STORY</a>
                <a href="/activities" class="block text-emerald-100 font-bold hover:text-white">ACTIVITIES</a>
                <a href="/community" class="block text-emerald-100 font-bold hover:text-white">COMMUNITY</a>
                <div class="pl-4 border-l-2 border-emerald-500/30 space-y-2">
                    <span class="text-[10px] text-emerald-400 uppercase tracking-widest">Projects</span>
                    <a href="/projects" class="block text-emerald-100 font-bold hover:text-white">All Projects</a>
                    <a href="/mangrove" class="block text-emerald-100 font-bold hover:text-white">Mangrove Labyrinth</a>
                    <a href="/donate" class="block text-emerald-100 font-bold hover:text-white">Luntian Anchor</a>
                </div>
                <a href="/status" class="block text-emerald-100 font-bold hover:text-white">STATUS</a>
                <a href="/music" class="block text-emerald-100 font-bold hover:text-white">VIBE</a>
                <a href="/social" class="block text-emerald-100 font-bold hover:text-white">SOCIAL FEED</a>
                <a href="/login" class="block text-emerald-100 font-bold hover:text-white border-t border-emerald-600/30 pt-2">MEMBER LOGIN</a>
            </div>
        </div>
    </nav>`;

    headerPlaceholder.innerHTML = headerHTML;
    setActiveLink();
}

// --- 2. DYNAMIC FOOTER INJECTION ---
function loadFooter() {
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (!footerPlaceholder) return;

    footerPlaceholder.innerHTML = `
    <footer class="bg-slate-900 text-slate-300 py-12 border-t border-slate-800 font-heading">
        <div class="container mx-auto px-6 grid md:grid-cols-4 gap-8 text-sm">
            <div class="col-span-1 md:col-span-2">
                <div class="flex items-center space-x-2 mb-4">
                    <i class="fas fa-leaf text-emerald-500 text-xl"></i>
                    <span class="font-bold text-white tracking-widest text-lg">LUNTIAN WONDERS</span>
                </div>
                <p class="text-slate-500 mb-4 max-w-xs font-sans">
                    The official management body for the Port Barton Marine Park, driven by the community, for the community.
                </p>
                <div class="flex space-x-4 mt-6">
                    <a href="/social" class="text-slate-400 hover:text-white transition"><i class="fas fa-globe-asia fa-lg"></i></a>
                    <a href="#" class="text-slate-400 hover:text-white transition"><i class="fab fa-facebook fa-lg"></i></a>
                    <a href="#" class="text-slate-400 hover:text-white transition"><i class="fab fa-instagram fa-lg"></i></a>
                </div>
            </div>
            <div>
                <h4 class="font-bold text-white mb-4 uppercase tracking-wider text-xs">Quick Links</h4>
                <ul class="space-y-2 font-sans">
                    <li><a href="/about" class="hover:text-emerald-400 transition">About Us</a></li>
                    <li><a href="/activities" class="hover:text-emerald-400 transition">Activities</a></li>
                    <li><a href="/mangrove" class="hover:text-emerald-400 transition">Mangrove Campaign</a></li>
                    <li><a href="/music" class="hover:text-emerald-400 transition">Luntian Vibe</a></li>
                </ul>
            </div>
            <div>
                <h4 class="font-bold text-white mb-4 uppercase tracking-wider text-xs">Contact</h4>
                <ul class="space-y-3 font-sans">
                    <li class="flex items-start gap-3">
                        <i class="fas fa-map-marker-alt mt-1 text-emerald-500"></i>
                        <span>Port Barton, San Vicente,<br>Palawan, Philippines</span>
                    </li>
                    <li class="flex items-center gap-3">
                        <i class="fas fa-envelope text-emerald-500"></i>
                        <span>info@luntianwonders.org</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="border-t border-slate-800 mt-12 pt-8 text-center text-xs text-slate-600 font-sans">
            &copy; 2025 Luntian Wonders Organization. Built for the Green Economy Model.
        </div>
    </footer>`;
}

// --- 3. UTILITIES ---

function setActiveLink() {
    // Normalize current path (works for '/' or '/about' or '/about/')
    const raw = window.location.pathname.replace(/\/$/, '');
    let current = raw.split('/').pop();
    if (!current) current = 'index';

    const links = document.querySelectorAll('.nav-link');

    links.forEach(link => {
        const href = link.getAttribute('href') || '';
        // Normalize link href: remove leading/trailing slashes and .html
        let linkName = href.replace(/^\//, '').replace(/\/$/, '').replace(/\.html$/, '');
        if (!linkName) linkName = 'index';

        if (linkName === current) {
            link.classList.add('text-white', 'border-b-2', 'border-emerald-400');
            link.classList.remove('text-emerald-100');
        }
    });
}

window.toggleMobileMenu = function() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}

function setupToastSystem() {
    const toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'fixed bottom-5 right-5 z-[9999] flex flex-col gap-3 pointer-events-none';
    document.body.appendChild(toastContainer);
}

window.showToast = function(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    
    const colors = type === 'error' 
        ? 'bg-red-600' 
        : type === 'warning' ? 'bg-yellow-500' : 'bg-emerald-600';
    
    const icon = type === 'error'
        ? '<i class="fas fa-exclamation-circle"></i>'
        : '<i class="fas fa-check-circle"></i>';

    toast.className = `${colors} text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 transform translate-y-10 opacity-0 transition-all duration-300 pointer-events-auto min-w-[300px]`;
    toast.innerHTML = `
        <div class="text-xl">${icon}</div>
        <div class="font-bold font-heading text-sm">${message}</div>
    `;

    container.appendChild(toast);

    requestAnimationFrame(() => {
        toast.classList.remove('translate-y-10', 'opacity-0');
    });

    setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-x-10');
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}
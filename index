<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>4-11 Studio | The Black Edition</title>
    <!-- Tailwind CSS for utility styling -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Google Fonts: Inter -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet">
    <style>
        /* Base Styles */
        body {
            font-family: 'Inter', sans-serif;
            background-color: #000;
            color: #fff;
        }

        /* Typography Effects */
        .border-text-white {
            -webkit-text-stroke: 1.5px rgba(255,255,255,0.3);
            color: transparent;
        }
        
        @media (max-width: 768px) {
            .border-text-white { -webkit-text-stroke: 1px rgba(255,255,255,0.2); }
        }

        /* Animations */
        .animate-pulse-slow {
            animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes pulse {
            0%, 100% { opacity: 0.1; }
            50% { opacity: 0.3; }
        }

        .noise-bg {
            background-image: url('https://www.transparenttextures.com/patterns/asfalt-dark.png');
        }

        .fade-in {
            opacity: 0;
            animation: fadeIn 1.2s ease-out forwards;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        /* Form Styling */
        input::placeholder {
            text-transform: uppercase;
            letter-spacing: 0.2em;
            font-size: 0.7rem;
            color: rgba(255,255,255,0.2);
        }

        #subscribe-form input:focus {
            border-color: #fff;
        }
    </style>
</head>
<body class="min-h-screen flex flex-col relative overflow-x-hidden selection:bg-white selection:text-black">
    
    <!-- Background Texture & Ambient Lights -->
    <div class="fixed inset-0 noise-bg opacity-10 pointer-events-none z-0"></div>
    <div class="fixed top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-white/5 blur-[150px] rounded-full pointer-events-none z-0"></div>
    <div class="fixed bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-white/5 blur-[120px] rounded-full pointer-events-none z-0"></div>

    <!-- Navigation Header -->
    <header class="p-8 md:p-12 relative z-10 flex justify-between items-center fade-in" style="animation-delay: 0.1s;">
        <div class="h-10 md:h-12 group cursor-pointer">
            <img 
                src="513689670_17969272799912864_8394707357259788053_n-Photoroom.png" 
                alt="4-11 Logo" 
                class="h-full w-auto object-contain brightness-0 invert transition-transform duration-500 group-hover:scale-110"
                onerror="this.style.display='none'; this.nextElementSibling.style.display='block';"
            >
            <div class="hidden text-2xl font-black tracking-tighter italic">4-11</div>
        </div>
        <div class="flex gap-8 text-[10px] font-black tracking-[0.4em] uppercase text-white/40">
            <a href="#" class="hover:text-white transition-all hover:tracking-[0.6em]">Instagram</a>
            <a href="#" class="hover:text-white transition-all hover:tracking-[0.6em]">LinkedIn</a>
        </div>
    </header>

    <!-- Hero Section -->
    <main class="flex-grow flex flex-col justify-center px-6 relative z-10 max-w-7xl mx-auto w-full py-20">
        <div class="fade-in" style="animation-delay: 0.3s;">
            <div class="flex items-center gap-4 mb-12">
                <span class="w-16 h-[1px] bg-white/20"></span>
                <span class="text-[10px] font-black uppercase tracking-[0.6em] text-white/40">
                    EST. 2025 • BRANDING STUDIO
                </span>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-24">
                <div class="lg:col-span-8">
                    <h1 class="text-[13vw] md:text-[9vw] font-black leading-[0.8] tracking-[-0.06em] uppercase">
                        THE BLACK <br />
                        <span class="text-transparent border-text-white">EDITION</span> <br />
                        OF 4-11.
                    </h1>
                </div>
                <div class="lg:col-span-4 flex justify-center lg:justify-end">
                    <div class="w-full max-w-[280px] md:max-w-[360px] aspect-square relative fade-in" style="animation-delay: 0.6s;">
                        <img 
                            src="513689670_17969272799912864_8394707357259788053_n-Photoroom.png" 
                            alt="4-11 Identity" 
                            class="w-full h-full object-contain brightness-0 invert"
                        >
                        <div class="absolute inset-0 bg-white/5 blur-[80px] -z-10 rounded-full animate-pulse-slow"></div>
                    </div>
                </div>
            </div>

            <div class="flex flex-col md:flex-row justify-between items-end gap-20">
                <div class="max-w-xl fade-in" style="animation-delay: 0.8s;">
                    <p class="text-2xl md:text-3xl text-white/40 font-medium leading-tight mb-4">
                        Stripping away the noise.
                    </p>
                    <p class="text-lg text-white/20 font-medium leading-relaxed max-w-md">
                        We are currently refining the 4-11 visual system. Our new digital experience and portfolio will drop without warning.
                    </p>
                </div>

                <!-- Subscription Form -->
                <div class="max-w-md w-full fade-in" style="animation-delay: 1s;">
                    <form id="subscribe-form" class="relative flex items-center group">
                        <input 
                            type="email" 
                            id="email-input"
                            required
                            placeholder="Join the inner circle" 
                            class="w-full bg-transparent border-b border-white/20 py-6 px-2 outline-none transition-colors font-bold text-2xl placeholder:text-white/10"
                        >
                        <button 
                            type="submit"
                            class="absolute right-0 text-white/40 hover:text-white transition-colors flex items-center gap-2 group"
                            aria-label="Notify Me"
                        >
                            <span class="text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Notify Me</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                        </button>
                    </form>
                    <div id="success-msg" class="hidden flex items-center gap-4 text-white font-black uppercase tracking-widest text-sm py-6">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-circle-2 text-white"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
                        <span>Access Granted. Talk soon.</span>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <!-- Footer -->
    <footer class="p-8 md:p-12 relative z-10 flex flex-col md:flex-row justify-between items-center gap-8 border-t border-white/5 mt-auto fade-in" style="animation-delay: 1.2s;">
        <div class="flex items-center gap-4">
            <div class="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <p class="text-[9px] font-black text-white/20 uppercase tracking-[0.5em]">
                Mumbai • Worldwide • 2025
            </p>
        </div>
        <div class="flex gap-12">
            <div class="group flex items-center gap-3 text-white/20 text-[10px] font-black uppercase tracking-widest hover:text-white transition-all cursor-pointer" onclick="window.location.href='mailto:hello@4-11.studio'">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                <span>hello@4-11.studio</span>
            </div>
        </div>
    </footer>

    <!-- Interactive Logic -->
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const form = document.getElementById('subscribe-form');
            const success = document.getElementById('success-msg');
            
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                // Simple animation to hide form and show success
                form.style.opacity = '0';
                form.style.pointerEvents = 'none';
                setTimeout(() => {
                    form.classList.add('hidden');
                    success.classList.remove('hidden');
                    success.style.opacity = '1';
                }, 300);
            });
        });
    </script>
</body>
</html>

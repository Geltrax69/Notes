import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();

    return (
        <>
            <div className="mb-10 animate-fade-in-up md:mt-4">
                <h1 className="text-5xl md:text-7xl font-display font-black text-black dark:text-white mb-2 leading-none uppercase tracking-tighter">Invest in your <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-red to-accent-blue">future success</span></h1>
                <p className="text-black dark:text-white font-bold tracking-widest mt-6 text-sm uppercase max-w-md border-l-4 border-black dark:border-white pl-4">Select your class below to browse curated study materials & ace your exams.</p>
            </div>

            <div className="flex gap-4 mb-10 overflow-x-auto pb-4 scrollbar-hide">
                <button onClick={() => navigate('/grid')} className="flex items-center gap-2 px-6 py-3 bg-black dark:bg-white text-white dark:text-black hover:bg-accent-neon hover:text-black border-2 border-black dark:border-white transition-colors shadow-brutal dark:shadow-brutal-dark whitespace-nowrap active:translate-y-1 active:translate-x-1 active:shadow-none">
                    <span className="material-icons-round text-lg">grid_view</span>
                    <span className="font-bold tracking-widest uppercase text-sm">All Classes</span>
                </button>
                <button onClick={() => navigate('/grid?stream=science')} className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-black text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black border-2 border-black dark:border-white transition-colors shadow-brutal dark:shadow-brutal-dark whitespace-nowrap active:translate-y-1 active:translate-x-1 active:shadow-none">
                    <span className="material-icons-round text-lg text-accent-orange group-hover:text-current">science</span>
                    <span className="font-bold tracking-widest uppercase text-sm">Science Stream</span>
                </button>
                <button onClick={() => navigate('/grid?stream=commerce')} className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-black text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black border-2 border-black dark:border-white transition-colors shadow-brutal dark:shadow-brutal-dark whitespace-nowrap active:translate-y-1 active:translate-x-1 active:shadow-none">
                    <span className="material-icons-round text-lg text-accent-blue group-hover:text-current">calculate</span>
                    <span className="font-bold tracking-widest uppercase text-sm">Commerce Stream</span>
                </button>
                <button onClick={() => navigate('/grid?stream=arts')} className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-black text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black border-2 border-black dark:border-white transition-colors shadow-brutal dark:shadow-brutal-dark whitespace-nowrap active:translate-y-1 active:translate-x-1 active:shadow-none">
                    <span className="material-icons-round text-lg text-accent-purple group-hover:text-current">history_edu</span>
                    <span className="font-bold tracking-widest uppercase text-sm">Arts Stream</span>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-6 mb-12">
                <div onClick={() => navigate('/grid?class=10')} className="group relative overflow-hidden bg-accent-pink p-8 hover:-translate-y-2 transition-transform duration-300 cursor-pointer h-72 flex flex-col justify-between border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                    <div className="absolute -top-10 -right-10 p-8 opacity-20 transform rotate-12 scale-150 group-hover:rotate-45 group-hover:scale-125 transition-transform duration-500">
                        <span className="material-icons-round text-[12rem] text-black mix-blend-overlay">school</span>
                    </div>
                    <div className="flex justify-between items-start z-10">
                        <div className="w-14 h-14 bg-white border-2 border-black flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <span className="material-icons-round text-3xl">menu_book</span>
                        </div>
                        <span className="bg-white border-2 border-black px-4 py-1.5 font-bold text-black flex items-center gap-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            <span className="material-icons-round text-sm">star</span> 4.8
                        </span>
                    </div>
                    <div className="z-10 mt-auto bg-white/90 p-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:bg-black group-hover:text-white transition-colors text-black">
                        <h3 className="text-3xl font-display font-black uppercase mb-1">Class 10</h3>
                        <p className="text-sm font-bold opacity-80 mb-2 line-clamp-1 uppercase">Complete Board preparation.</p>
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-black tracking-widest uppercase">12.4K Students</span>
                            <div className="flex -space-x-3">
                                <div className="w-8 h-8 rounded-full border-2 border-black bg-accent-neon"></div>
                                <div className="w-8 h-8 rounded-full border-2 border-black bg-white flex items-center justify-center text-xs font-black">+</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div onClick={() => navigate('/grid?class=11')} className="group relative overflow-hidden bg-accent-orange p-8 hover:-translate-y-2 transition-transform duration-300 cursor-pointer h-72 flex flex-col justify-between border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                    <div className="absolute -top-10 -right-10 p-8 opacity-20 transform rotate-12 scale-150 group-hover:rotate-45 group-hover:scale-125 transition-transform duration-500">
                        <span className="material-icons-round text-[12rem] text-black mix-blend-overlay">science</span>
                    </div>
                    <div className="flex justify-between items-start z-10">
                        <div className="w-14 h-14 bg-white border-2 border-black flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <span className="material-icons-round text-3xl">biotech</span>
                        </div>
                        <span className="bg-white border-2 border-black px-4 py-1.5 font-bold text-black flex items-center gap-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            <span className="material-icons-round text-sm">star</span> 4.9
                        </span>
                    </div>
                    <div className="z-10 mt-auto bg-white/90 p-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:bg-black group-hover:text-white transition-colors text-black">
                        <h3 className="text-3xl font-display font-black uppercase mb-1">Class 11</h3>
                        <p className="text-sm font-bold opacity-80 mb-2 line-clamp-1 uppercase">Foundation for Medical/Engineering</p>
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-black tracking-widest uppercase">8.2K Students</span>
                            <div className="flex -space-x-3">
                                <div className="w-8 h-8 rounded-full border-2 border-black bg-accent-pink"></div>
                                <div className="w-8 h-8 rounded-full border-2 border-black bg-white flex items-center justify-center text-xs font-black">+</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div onClick={() => navigate('/grid?class=12')} className="group relative overflow-hidden bg-accent-purple p-8 hover:-translate-y-2 transition-transform duration-300 cursor-pointer h-72 flex flex-col justify-between border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                    <div className="absolute -top-10 -right-10 p-8 opacity-20 transform rotate-12 scale-150 group-hover:rotate-45 group-hover:scale-125 transition-transform duration-500">
                        <span className="material-icons-round text-[12rem] text-black mix-blend-overlay">emoji_events</span>
                    </div>
                    <div className="flex justify-between items-start z-10">
                        <div className="w-14 h-14 bg-white border-2 border-black flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <span className="material-icons-round text-3xl">auto_stories</span>
                        </div>
                        <span className="bg-white border-2 border-black px-4 py-1.5 font-bold text-black flex items-center gap-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            <span className="material-icons-round text-sm">star</span> 5.0
                        </span>
                    </div>
                    <div className="z-10 mt-auto bg-white/90 p-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:bg-black group-hover:text-white transition-colors text-black">
                        <h3 className="text-3xl font-display font-black uppercase mb-1">Class 12</h3>
                        <p className="text-sm font-bold opacity-80 mb-2 line-clamp-1 uppercase">Final Board & Entrance Prep</p>
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-black tracking-widest uppercase">15.9K Students</span>
                            <div className="flex -space-x-3">
                                <div className="w-8 h-8 rounded-full border-2 border-black bg-accent-blue"></div>
                                <div className="w-8 h-8 rounded-full border-2 border-black bg-white flex items-center justify-center text-xs font-black">+</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div onClick={() => navigate('/grid?subject=cs')} className="group relative overflow-hidden bg-accent-green p-8 hover:-translate-y-2 transition-transform duration-300 cursor-pointer h-72 flex flex-col justify-between border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] lg:col-span-2">
                    <div className="absolute -right-20 p-8 opacity-20 transform -rotate-12 scale-150 group-hover:rotate-6 group-hover:scale-110 transition-transform duration-500">
                        <span className="material-icons-round text-[16rem] text-black mix-blend-overlay">code</span>
                    </div>
                    <div className="flex justify-between items-start z-10">
                        <div className="w-14 h-14 bg-white border-2 border-black flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <span className="material-icons-round text-3xl">computer</span>
                        </div>
                        <span className="bg-white border-2 border-black px-4 py-1.5 font-bold text-black flex items-center gap-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            <span className="material-icons-round text-sm">star</span> 4.7
                        </span>
                    </div>
                    <div className="z-10 mt-auto bg-white/90 p-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:bg-black group-hover:text-white transition-colors text-black max-w-sm">
                        <h3 className="text-3xl font-display font-black uppercase mb-1">Computer Science</h3>
                        <p className="text-sm font-bold opacity-80 mb-2 line-clamp-1 uppercase">Learn Python, Java & Web Dev</p>
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-black tracking-widest uppercase">5.4K Students</span>
                            <div className="flex -space-x-3">
                                <div className="w-8 h-8 rounded-full border-2 border-black bg-accent-purple"></div>
                                <div className="w-8 h-8 rounded-full border-2 border-black bg-white flex items-center justify-center text-xs font-black">+</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div onClick={() => navigate('/grid?subject=economics')} className="group relative overflow-hidden bg-accent-blue p-8 hover:-translate-y-2 transition-transform duration-300 cursor-pointer h-72 flex flex-col justify-between border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                    <div className="absolute -top-10 -right-10 p-8 opacity-20 transform rotate-12 scale-150 group-hover:rotate-45 group-hover:scale-125 transition-transform duration-500">
                        <span className="material-icons-round text-[12rem] text-black mix-blend-overlay">trending_up</span>
                    </div>
                    <div className="flex justify-between items-start z-10">
                        <div className="w-14 h-14 bg-white border-2 border-black flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <span className="material-icons-round text-3xl">analytics</span>
                        </div>
                        <span className="bg-white border-2 border-black px-4 py-1.5 font-bold text-black flex items-center gap-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            <span className="material-icons-round text-sm">star</span> 4.6
                        </span>
                    </div>
                    <div className="z-10 mt-auto bg-white/90 p-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:bg-black group-hover:text-white transition-colors text-black">
                        <h3 className="text-3xl font-display font-black uppercase mb-1">Economics</h3>
                        <p className="text-sm font-bold opacity-80 mb-2 line-clamp-1 uppercase">Micro & Macro fundamentals</p>
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-black tracking-widest uppercase">3.1K Students</span>
                            <div className="flex -space-x-3">
                                <div className="w-8 h-8 rounded-full border-2 border-black bg-accent-orange"></div>
                                <div className="w-8 h-8 rounded-full border-2 border-black bg-white flex items-center justify-center text-xs font-black">+</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-8">
                <h2 className="text-3xl font-display font-black tracking-tight text-black dark:text-white mb-6 uppercase border-b-4 border-black dark:border-white inline-block pb-1">Featured Resources</h2>
                <div onClick={() => navigate('/pdf')} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-accent-neon p-6 border-2 border-black flex items-center gap-6 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] cursor-pointer transition-transform group">
                        <div className="w-20 h-20 bg-white border-2 border-black flex items-center justify-center text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:bg-black group-hover:text-white transition-colors">
                            <span className="material-icons-round text-4xl">lightbulb</span>
                        </div>
                        <div>
                            <h4 className="font-display font-black text-2xl text-black uppercase">Exam Tips & Tricks</h4>
                            <p className="font-bold text-black/70 uppercase text-xs mt-1">Boost logic with proven techniques.</p>
                        </div>
                    </div>
                    <div className="bg-accent-red p-6 border-2 border-black flex items-center gap-6 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] cursor-pointer transition-transform group">
                        <div className="w-20 h-20 bg-white border-2 border-black flex items-center justify-center text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:bg-black group-hover:text-white transition-colors">
                            <span className="material-icons-round text-4xl">picture_as_pdf</span>
                        </div>
                        <div>
                            <h4 className="font-display font-black text-2xl text-black uppercase">Past Papers Archive</h4>
                            <p className="font-bold text-black/70 uppercase text-xs mt-1">Download last 10 yrs solutions.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

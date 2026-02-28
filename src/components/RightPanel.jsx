import React from 'react';
import { useNavigate } from 'react-router-dom';
import { userProfile } from '../data/dummyData';

export default function RightPanel() {
    const navigate = useNavigate();

    return (
        <aside className="w-80 hidden xl:flex flex-col bg-card-light dark:bg-card-dark p-6 h-full transition-colors duration-300 border-l md:border-2 border-black dark:border-white shadow-brutal dark:shadow-brutal-dark">
            <div className="flex items-center justify-between mb-8">
                <button
                    onClick={() => navigate('/notifications')}
                    className="w-10 h-10 flex items-center justify-center border-2 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none"
                    title="Notifications"
                >
                    <span className="material-icons-round">notifications</span>
                </button>
                <button
                    onClick={() => navigate('/settings')}
                    className="w-10 h-10 flex items-center justify-center border-2 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none"
                    title="Settings"
                >
                    <span className="material-icons-round">settings</span>
                </button>
            </div>
            <div className="flex flex-col items-center mb-8">
                <div onClick={() => navigate('/profile')} className="relative w-24 h-24 mb-4 cursor-pointer group">
                    <img alt={userProfile.name} className="w-full h-full object-cover border-4 border-black dark:border-white shadow-brutal dark:shadow-brutal-dark filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-300" src={userProfile.avatar} />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-accent-neon text-black flex items-center justify-center border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:rotate-12 transition-transform cursor-pointer">
                        <span className="material-icons-round text-sm">edit</span>
                    </div>
                </div>
                <h2 onClick={() => navigate('/profile')} className="text-2xl font-display font-black tracking-tight text-black dark:text-white uppercase mt-2 cursor-pointer hover:underline decoration-4 underline-offset-4">{userProfile.name}</h2>
                <p className="text-gray-500 dark:text-gray-400 font-bold tracking-widest text-xs uppercase">Class {userProfile.class} • {userProfile.stream}</p>
            </div>
            <div className="bg-white dark:bg-black p-5 border-2 border-black dark:border-white shadow-brutal dark:shadow-brutal-dark mb-6 hover:-translate-y-1 transition-transform duration-300">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <p className="text-xs text-black dark:text-white font-bold tracking-wider uppercase">Weekly Activity</p>
                        <h3 className="text-3xl font-display font-black text-black dark:text-white mt-1">{userProfile.stats.studyHours}<span className="text-xl">H</span> <span className="text-xs font-bold font-sans tracking-wide bg-accent-yellow text-black px-2 py-0 border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ml-2 align-middle" title={`${userProfile.stats.streak} Day Streak`}>🔥 {userProfile.stats.streak}D STRK</span></h3>
                    </div>
                    <select className="text-xs font-bold uppercase border-2 border-black bg-white text-black hover:bg-black hover:text-white focus:ring-0 cursor-pointer outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] px-2 py-1 transition-colors">
                        <option>Week</option>
                        <option>Month</option>
                    </select>
                </div>
                <div className="flex items-end justify-between h-24 gap-2 border-b-2 border-black dark:border-white pb-2">
                    <div className="flex flex-col items-center gap-2 w-full">
                        <div className="w-full bg-black dark:bg-white h-[40%] hover:scale-110 transition-transform origin-bottom"></div>
                        <span className="text-[10px] font-bold uppercase">Mo</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 w-full">
                        <div className="w-full bg-black dark:bg-white h-[60%] hover:scale-110 transition-transform origin-bottom"></div>
                        <span className="text-[10px] font-bold uppercase">Tu</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 w-full">
                        <div className="w-full bg-black dark:bg-white h-[30%] hover:scale-110 transition-transform origin-bottom"></div>
                        <span className="text-[10px] font-bold uppercase">We</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 w-full">
                        <div className="w-full bg-black dark:bg-white h-[50%] hover:scale-110 transition-transform origin-bottom"></div>
                        <span className="text-[10px] font-bold uppercase">Th</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 w-full">
                        <div className="w-full bg-black dark:bg-white h-[75%] hover:scale-110 transition-transform origin-bottom"></div>
                        <span className="text-[10px] font-bold uppercase">Fr</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 w-full relative">
                        <div className="absolute -top-6 text-xs font-bold text-accent-red">90%</div>
                        <div className="w-[120%] bg-accent-red border border-black dark:border-white h-[90%] z-10 hover:scale-y-110 transition-transform origin-bottom shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"></div>
                        <span className="text-[10px] font-bold uppercase text-accent-red">Sa</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 w-full">
                        <div className="w-full border-2 border-black dark:border-white bg-stripes-pattern h-[20%] hover:scale-110 transition-transform origin-bottom"></div>
                        <span className="text-[10px] font-bold uppercase">Su</span>
                    </div>
                </div>
            </div>
            <h3 className="font-display font-black text-xl uppercase tracking-wider text-black dark:text-white mb-4 border-b-2 border-black dark:border-white pb-2 flex justify-between items-center">
                My Courses
                <span className="text-[10px] bg-black text-white px-2 py-1 tracking-widest cursor-pointer hover:bg-accent-blue hover:text-black hover:border-black border border-transparent transition-colors">VIEW ALL</span>
            </h3>
            <div className="flex flex-col gap-4 overflow-y-auto pr-2 pb-4 scrollbar-hide">
                {userProfile.courses.map((course, idx) => (
                    <div key={idx} className={`${course.color} p-4 flex items-center justify-between border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer hover:translate-x-1 hover:-translate-y-1 transition-transform group relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="flex items-center gap-3 relative z-10">
                            <div className={`w-10 h-10 bg-white border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:bg-black group-hover:text-white transition-colors ${course.color.replace('bg-', 'text-')}`}>
                                <span className="material-icons-round">{course.icon}</span>
                            </div>
                            <div>
                                <h4 className={`font-bold text-sm uppercase tracking-wide ${course.textWhite ? 'text-white' : 'text-black'}`}>{course.name}</h4>
                                <p className={`text-[10px] font-bold uppercase opacity-80 ${course.textWhite ? 'text-white' : 'text-black'}`}>{course.subject}</p>
                            </div>
                        </div>
                        <div className="w-10 h-10 border-2 border-black flex items-center justify-center bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] relative z-10">
                            <span className="text-xs font-bold text-black">{course.progress}%</span>
                        </div>
                    </div>
                ))}
            </div>
        </aside>
    );
}

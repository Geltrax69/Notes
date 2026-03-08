import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';

const WEEK_DAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

const dayKey = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
};

const getWeekDates = () => {
    const today = new Date();
    const jsDay = today.getDay(); // 0 Sun ... 6 Sat
    const offsetToMonday = jsDay === 0 ? 6 : jsDay - 1;
    const monday = new Date(today);
    monday.setDate(today.getDate() - offsetToMonday);
    return Array.from({ length: 7 }, (_, i) => {
        const d = new Date(monday);
        d.setDate(monday.getDate() + i);
        return d;
    });
};

const computeStreakDays = (usageStats) => {
    let streak = 0;
    const date = new Date();
    while (true) {
        const key = dayKey(date);
        if ((usageStats[key] || 0) > 0) {
            streak += 1;
            date.setDate(date.getDate() - 1);
        } else {
            break;
        }
    }
    return streak;
};

export default function RightPanel() {
    const navigate = useNavigate();
    const { user, logoutUser, recentFolders, items, usageStats } = useData();
    const [avatarBroken, setAvatarBroken] = useState(false);
    const avatar = user?.picture || '';
    const fallbackFolders = items.filter((item) => item.type === 'folder').slice(0, 6);
    const visibleFolders = recentFolders.length > 0 ? recentFolders : fallbackFolders;
    const weekDates = getWeekDates();
    const daySeconds = weekDates.map((d) => usageStats[dayKey(d)] || 0);
    const maxSeconds = Math.max(...daySeconds, 1);
    const totalSeconds = daySeconds.reduce((sum, s) => sum + s, 0);
    const totalHours = (totalSeconds / 3600).toFixed(1);
    const streakDays = computeStreakDays(usageStats);
    const peakDayIndex = daySeconds.findIndex((s) => s === Math.max(...daySeconds));

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
                    onClick={logoutUser}
                    className="w-10 h-10 flex items-center justify-center border-2 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none"
                    title="Logout"
                >
                    <span className="material-icons-round">logout</span>
                </button>
            </div>
            <div className="flex flex-col items-center mb-8">
                <div onClick={() => navigate('/profile')} className="relative w-24 h-24 mb-4 cursor-pointer group rounded-full overflow-hidden border-4 border-black dark:border-white shadow-brutal dark:shadow-brutal-dark">
                    {avatar && !avatarBroken ? (
                        <img
                            alt={user.name}
                            className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-300"
                            src={avatar}
                            referrerPolicy="no-referrer"
                            onError={() => setAvatarBroken(true)}
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center group-hover:bg-gray-300 transition-colors">
                            <span className="material-icons-round text-5xl text-gray-400">person</span>
                        </div>
                    )}
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-accent-neon text-black flex items-center justify-center border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:rotate-12 transition-transform cursor-pointer">
                        <span className="material-icons-round text-sm">edit</span>
                    </div>
                </div>
                <h2 onClick={() => navigate('/profile')} className="text-2xl font-display font-black tracking-tight text-black dark:text-white uppercase mt-2 cursor-pointer hover:underline decoration-4 underline-offset-4">{user?.name}</h2>
                <p className="text-gray-500 dark:text-gray-400 font-bold tracking-widest text-xs uppercase">{user?.student_class || 'Class Not Set'}</p>
            </div>
            <div className="bg-white dark:bg-black p-5 border-2 border-black dark:border-white shadow-brutal dark:shadow-brutal-dark mb-6 hover:-translate-y-1 transition-transform duration-300">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <p className="text-xs text-black dark:text-white font-bold tracking-wider uppercase">Weekly Activity</p>
                        <h3 className="text-3xl font-display font-black text-black dark:text-white mt-1">{totalHours}<span className="text-xl">H</span> <span className="text-xs font-bold font-sans tracking-wide bg-accent-yellow text-black px-2 py-0 border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ml-2 align-middle" title={`${streakDays} Day Streak`}>🔥 {streakDays}D STRK</span></h3>
                    </div>
                    <select className="text-xs font-bold uppercase border-2 border-black bg-white text-black hover:bg-black hover:text-white focus:ring-0 cursor-pointer outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] px-2 py-1 transition-colors">
                        <option>Week</option>
                    </select>
                </div>
                <div className="flex items-end justify-between h-24 gap-2 border-b-2 border-black dark:border-white pb-2">
                    {WEEK_DAYS.map((label, idx) => {
                        const pct = Math.max(8, Math.round((daySeconds[idx] / maxSeconds) * 100));
                        const isPeak = idx === peakDayIndex && daySeconds[idx] > 0;
                        return (
                            <div key={label} className="flex flex-col items-center gap-2 w-full relative">
                                {isPeak && <div className="absolute -top-6 text-[10px] font-bold text-accent-red">{Math.round((daySeconds[idx] / Math.max(totalSeconds, 1)) * 100)}%</div>}
                                <div
                                    title={`${(daySeconds[idx] / 60).toFixed(0)} min`}
                                    className={`w-full border border-black dark:border-white hover:scale-110 transition-transform origin-bottom ${isPeak ? 'bg-accent-red' : 'bg-black dark:bg-white'}`}
                                    style={{ height: `${pct}%` }}
                                ></div>
                                <span className={`text-[10px] font-bold uppercase ${isPeak ? 'text-accent-red' : ''}`}>{label}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
            <h3 className="font-display font-black text-xl uppercase tracking-wider text-black dark:text-white mb-4 border-b-2 border-black dark:border-white pb-2 flex justify-between items-center">
                Recent Folders
                <span className="text-[10px] bg-black text-white px-2 py-1 tracking-widest border border-transparent">{recentFolders.length > 0 ? 'RECENT' : 'CLASSES'}</span>
            </h3>
            <div className="flex flex-col gap-4 overflow-y-auto pr-2 pb-4 scrollbar-hide">
                {visibleFolders.length > 0 ? (
                    visibleFolders.map((folder, idx) => (
                        <div key={`${folder.id}-${idx}`} onClick={() => navigate(`/topics?folder=${folder.id}`)} className="bg-white p-4 flex items-center justify-between border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 group relative overflow-hidden">
                            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="flex items-center gap-3 relative z-10">
                                <div className={`w-10 h-10 ${folder.color || 'bg-accent-blue'} border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
                                    <span className="material-icons-round text-black">{folder.icon || 'folder'}</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm uppercase tracking-wide text-black">{folder.name}</h4>
                                    <p className="text-[10px] font-bold uppercase opacity-70 text-black">{recentFolders.length > 0 ? 'Recently opened' : 'Class folder'}</p>
                                </div>
                            </div>
                            <div className="w-10 h-10 border-2 border-black flex items-center justify-center bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] relative z-10">
                                <span className="material-icons-round text-black text-base">arrow_forward</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="p-4 border-2 border-black bg-white font-bold text-xs uppercase tracking-wider text-black/60">
                        No folders opened yet.
                    </div>
                )}
            </div>
        </aside>
    );
}

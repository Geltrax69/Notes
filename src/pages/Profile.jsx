import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { userProfile as dummyProfile } from '../data/dummyData'; // keep dummy for stats for now

export default function Profile() {
    const navigate = useNavigate();
    const { user } = useData();
    const [avatarBroken, setAvatarBroken] = useState(false);
    const avatar = user?.picture || '';

    return (
        <div className="max-w-5xl mx-auto w-full pb-20 md:pb-8 animate-fade-in animate-slide-up animation-delay-100">
            {/* Header Area */}
            <div className="relative mb-16 bg-accent-blue border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
                <div className="h-48 md:h-64 w-full bg-stripes-pattern opacity-30"></div>

                {/* Profile Info Overlay */}
                <div className="absolute -bottom-12 left-6 md:left-12 flex items-end gap-6 w-[calc(100%-3rem)]">
                    <div className="relative w-32 h-32 md:w-40 md:h-40 border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                        {avatar && !avatarBroken ? (
                            <img
                                src={avatar}
                                alt={user.name}
                                onError={() => setAvatarBroken(true)}
                                className="w-full h-full object-cover filter grayscale contrast-125 hover:grayscale-0 transition-all duration-300"
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                <span className="material-icons-round text-6xl text-gray-500">person</span>
                            </div>
                        )}
                        <button onClick={() => navigate('/setup-profile')} className="absolute -bottom-2 -right-2 w-10 h-10 bg-accent-neon text-black flex items-center justify-center border-2 border-black hover:scale-110 active:scale-95 transition-transform shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            <span className="material-icons-round text-sm">camera_alt</span>
                        </button>
                    </div>
                </div>

                <div className="absolute top-4 right-4">
                    <span className="bg-black text-white px-4 py-2 font-black uppercase tracking-widest text-sm shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] border-2 border-white">
                        {dummyProfile.plan} PLAN
                    </span>
                </div>
            </div>

            {/* Profile Content */}
            <div className="mt-16 px-2 md:px-0 space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4 border-b-4 border-black dark:border-white pb-6">
                    <div>
                        <h1 className="text-4xl md:text-6xl font-display font-black tracking-tight uppercase text-black dark:text-white leading-none">
                            {user?.name || 'Student'}
                        </h1>
                        <p className="text-xl md:text-2xl font-bold uppercase tracking-widest text-gray-600 dark:text-gray-400 mt-2">
                            {user?.student_class || 'Class Unknown'}
                        </p>
                        <p className="text-sm font-bold uppercase tracking-wide text-gray-500 mt-1 flex items-center gap-1">
                            <span className="material-icons-round text-sm">calendar_month</span> Joined {dummyProfile.joined}
                        </p>
                    </div>
                    <button onClick={() => navigate('/setup-profile')} className="px-6 py-3 bg-white dark:bg-black text-black dark:text-white font-black border-2 border-black dark:border-white uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:-translate-y-1 hover:translate-x-1 active:translate-y-1 active:translate-x-1 hover:shadow-none transition-all flex items-center gap-2">
                        <span className="material-icons-round">edit</span> Edit Profile
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div className="bg-accent-neon border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform group">
                        <span className="material-icons-round text-4xl mb-2 group-hover:scale-110 transition-transform origin-left">menu_book</span>
                        <h3 className="text-5xl font-display font-black">{dummyProfile.stats.totalNotes}</h3>
                        <p className="text-sm font-bold uppercase tracking-widest mt-1 text-black/70">Notes Saved</p>
                    </div>

                    <div className="bg-accent-pink border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform group">
                        <span className="material-icons-round text-4xl mb-2 group-hover:scale-110 transition-transform origin-left">schedule</span>
                        <h3 className="text-5xl font-display font-black">{dummyProfile.stats.studyHours}<span className="text-2xl">H</span></h3>
                        <p className="text-sm font-bold uppercase tracking-widest mt-1 text-black/70">Study Hours</p>
                    </div>

                    <div className="col-span-2 md:col-span-1 bg-accent-yellow border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform group">
                        <span className="material-icons-round text-4xl mb-2 group-hover:scale-110 transition-transform origin-left">local_fire_department</span>
                        <h3 className="text-5xl font-display font-black">{dummyProfile.stats.streak} <span className="text-2xl">DAYS</span></h3>
                        <p className="text-sm font-bold uppercase tracking-widest mt-1 text-black/70">Current Streak</p>
                    </div>
                </div>

                {/* Detailed Courses */}
                <div className="mt-12 bg-white dark:bg-black border-4 border-black dark:border-white p-6 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
                    <div className="flex justify-between items-center mb-8 border-b-2 border-black dark:border-white pb-4">
                        <h2 className="text-3xl font-display font-black uppercase tracking-tight text-black dark:text-white">Active Courses</h2>
                        <span className="text-xs font-bold uppercase tracking-widest text-accent-blue border border-accent-blue px-3 py-1 bg-accent-blue/10">View All</span>
                    </div>

                    <div className="space-y-6">
                        {dummyProfile.courses.map((course, idx) => (
                            <div key={idx} className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-4 border-2 border-black dark:border-white hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors group cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:-translate-y-0.5">
                                <div className="flex items-center gap-4 w-full md:w-auto">
                                    <div className={`w-16 h-16 ${course.color} border-2 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:rotate-6 transition-transform`}>
                                        <span className={`material-icons-round text-3xl ${course.textWhite ? 'text-white' : 'text-black'}`}>{course.icon}</span>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-black uppercase tracking-wide text-black dark:text-white">{course.name}</h4>
                                        <p className="text-sm font-bold uppercase text-gray-500">{course.subject}</p>
                                    </div>
                                </div>
                                <div className="w-full md:w-1/3 flex items-center gap-4">
                                    <div className="flex-1 h-4 bg-gray-200 dark:bg-gray-800 border-2 border-black dark:border-white relative overflow-hidden">
                                        <div
                                            className={`absolute top-0 bottom-0 left-0 border-r-2 border-black dark:border-white ${course.color}`}
                                            style={{ width: `${course.progress}%` }}
                                        ></div>
                                    </div>
                                    <span className="font-display font-black text-xl w-12 text-right text-black dark:text-white">{course.progress}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}

import React from 'react';
import { NavLink } from 'react-router-dom';
import { userProfile } from '../data/dummyData';

export default function Sidebar() {
    return (
        <aside className="fixed bottom-0 left-0 right-0 z-50 md:relative md:w-24 flex-shrink-0 flex md:flex-col items-center justify-around md:justify-start py-3 md:py-8 bg-card-light dark:bg-card-dark border-t md:border-t-0 md:border-r border-black dark:border-white h-16 md:h-full transition-colors duration-300">
            <div className="hidden md:block mb-10">
                <div className="w-12 h-12 bg-primary dark:bg-card-light text-white dark:text-primary flex items-center justify-center transform hover:rotate-6 transition-transform shadow-brutal dark:shadow-brutal-dark">
                    <span className="material-icons-round text-3xl">school</span>
                </div>
            </div>
            <nav className="flex-1 flex md:flex-col items-center justify-around md:justify-start md:gap-6 w-full px-4 md:px-0">
                <NavLink
                    to="/"
                    className={({ isActive }) => `w-10 h-10 md:w-12 md:h-12 flex items-center justify-center transition-all group border border-transparent ${isActive ? 'bg-primary dark:bg-white text-white dark:text-black shadow-brutal dark:shadow-white' : 'text-gray-500 hover:border-black dark:hover:border-white hover:text-primary dark:hover:text-white'}`}
                >
                    <span className="material-icons-round group-hover:scale-110 transition-transform">home</span>
                </NavLink>
                <NavLink
                    to="/settings"
                    className={({ isActive }) => `w-10 h-10 md:w-12 md:h-12 flex items-center justify-center transition-all group border border-transparent ${isActive ? 'bg-primary dark:bg-white text-white dark:text-black shadow-brutal dark:shadow-white' : 'text-gray-500 hover:border-black dark:hover:border-white hover:text-primary dark:hover:text-white'}`}
                >
                    <span className="material-icons-round group-hover:scale-110 transition-transform">settings</span>
                </NavLink>
            </nav>
            <NavLink to="/profile" className={({ isActive }) => `hidden md:block mt-auto relative group cursor-pointer border-2 ${isActive ? 'border-primary dark:border-accent-neon shadow-brutal dark:shadow-brutal-dark' : 'border-black dark:border-white shadow-brutal dark:shadow-brutal-dark'} hover:translate-x-1 hover:-translate-y-1 transition-transform`}>
                <img alt={userProfile.name} className="w-12 h-12 object-cover" src={userProfile.avatar} />
            </NavLink>
        </aside>
    );
}

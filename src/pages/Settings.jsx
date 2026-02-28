import React, { useState } from 'react';
import { userProfile, applicationSettings } from '../data/dummyData';

export default function Settings() {
    const [settings, setSettings] = useState(applicationSettings);

    const handleToggle = (category, setting) => {
        setSettings(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [setting]: !prev[category][setting]
            }
        }));
    };

    const ToggleSwitch = ({ checked, onChange }) => (
        <div
            onClick={onChange}
            className={`w-14 h-8 flex items-center cursor-pointer border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] transition-colors ${checked ? 'bg-accent-neon' : 'bg-gray-300 dark:bg-gray-700'}`}
        >
            <div className={`w-6 h-6 border-2 border-black dark:border-white bg-white transform transition-transform ${checked ? 'translate-x-6' : 'translate-x-0'}`}></div>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto w-full pb-20 md:pb-8 animate-fade-in animate-slide-up animation-delay-100">
            <header className="mb-8 border-b-4 border-black dark:border-white pb-4">
                <h1 className="text-4xl md:text-5xl font-display font-black tracking-tight uppercase text-black dark:text-white">Settings</h1>
                <p className="text-gray-600 dark:text-gray-400 font-bold uppercase tracking-wider mt-2">Manage your preferences</p>
            </header>

            <div className="space-y-8">
                {/* Account Section */}
                <section className="bg-card-light dark:bg-card-dark border-2 border-black dark:border-white p-6 shadow-brutal dark:shadow-brutal-dark hover:-translate-y-1 transition-transform">
                    <h2 className="text-2xl font-display font-black uppercase text-black dark:text-white mb-6 flex items-center gap-2">
                        <span className="material-icons-round">person</span> Account
                    </h2>
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        <div className="relative w-24 h-24 border-4 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                            <img src={userProfile.avatar} alt={userProfile.name} className="w-full h-full object-cover filter grayscale contrast-125 hover:grayscale-0 transition-all" />
                            <button className="absolute -bottom-3 -right-3 w-10 h-10 bg-accent-blue text-white flex items-center justify-center border-2 border-black dark:border-white hover:scale-110 active:scale-95 transition-transform shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                <span className="material-icons-round text-sm">edit</span>
                            </button>
                        </div>
                        <div className="flex-1 space-y-4 w-full">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-black dark:text-white">Full Name</label>
                                    <input type="text" defaultValue={userProfile.name} className="w-full bg-white dark:bg-black border-2 border-black dark:border-white p-3 font-bold text-black dark:text-white focus:outline-none focus:ring-4 focus:ring-accent-neon/30 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-black dark:text-white">Email</label>
                                    <input type="email" defaultValue={`${userProfile.name.toLowerCase().replace(' ', '.')}@school.edu`} className="w-full bg-gray-100 dark:bg-gray-900 border-2 border-black dark:border-white p-3 font-bold text-gray-500 cursor-not-allowed shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]" disabled />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Notifications Section */}
                <section className="bg-card-light dark:bg-card-dark border-2 border-black dark:border-white p-6 shadow-brutal dark:shadow-brutal-dark hover:-translate-y-1 transition-transform">
                    <h2 className="text-2xl font-display font-black uppercase text-black dark:text-white mb-6 flex items-center gap-2">
                        <span className="material-icons-round">notifications_active</span> Notifications
                    </h2>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-bold text-lg text-black dark:text-white uppercase">Email Alerts</h3>
                                <p className="text-sm font-bold text-gray-500 uppercase tracking-wide">Receive updates via email</p>
                            </div>
                            <ToggleSwitch checked={settings.notifications.email} onChange={() => handleToggle('notifications', 'email')} />
                        </div>
                        <div className="flex items-center justify-between border-t border-black/20 dark:border-white/20 pt-6">
                            <div>
                                <h3 className="font-bold text-lg text-black dark:text-white uppercase">Push Notifications</h3>
                                <p className="text-sm font-bold text-gray-500 uppercase tracking-wide">Mobile and desktop push alerts</p>
                            </div>
                            <ToggleSwitch checked={settings.notifications.push} onChange={() => handleToggle('notifications', 'push')} />
                        </div>
                        <div className="flex items-center justify-between border-t border-black/20 dark:border-white/20 pt-6">
                            <div>
                                <h3 className="font-bold text-lg text-black dark:text-white uppercase">New Notes Available</h3>
                                <p className="text-sm font-bold text-gray-500 uppercase tracking-wide">Get notified when new material is posted</p>
                            </div>
                            <ToggleSwitch checked={settings.notifications.newNotes} onChange={() => handleToggle('notifications', 'newNotes')} />
                        </div>
                    </div>
                </section>

                {/* Privacy & Display */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <section className="bg-accent-pink border-2 border-black p-6 shadow-brutal hover:-translate-y-1 transition-transform">
                        <h2 className="text-2xl font-display font-black uppercase text-black mb-6 flex items-center gap-2">
                            <span className="material-icons-round">visibility</span> Privacy
                        </h2>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-bold text-lg text-black uppercase">Public Profile</h3>
                                    <p className="text-xs font-bold text-black/70 uppercase tracking-wide">Let others see you</p>
                                </div>
                                <ToggleSwitch checked={settings.privacy.publicProfile} onChange={() => handleToggle('privacy', 'publicProfile')} />
                            </div>
                            <div className="flex items-center justify-between border-t border-black pt-6">
                                <div>
                                    <h3 className="font-bold text-lg text-black uppercase">Show Activity</h3>
                                    <p className="text-xs font-bold text-black/70 uppercase tracking-wide">Display study hours</p>
                                </div>
                                <ToggleSwitch checked={settings.privacy.showActivity} onChange={() => handleToggle('privacy', 'showActivity')} />
                            </div>
                        </div>
                    </section>

                    <section className="bg-accent-yellow border-2 border-black p-6 shadow-brutal hover:-translate-y-1 transition-transform">
                        <h2 className="text-2xl font-display font-black uppercase text-black mb-6 flex items-center gap-2">
                            <span className="material-icons-round">palette</span> Display
                        </h2>
                        <div className="space-y-6">
                            <div className="flex flex-col gap-2">
                                <label className="font-bold text-lg text-black uppercase">Color Theme</label>
                                <select
                                    className="w-full bg-white border-2 border-black p-3 font-bold text-black focus:outline-none focus:ring-4 focus:ring-black/30 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] uppercase appearance-none cursor-pointer"
                                    defaultValue={settings.display.theme}
                                >
                                    <option value="system">System Default</option>
                                    <option value="light">Light Mode</option>
                                    <option value="dark">Dark Mode</option>
                                </select>
                            </div>
                            <div className="flex items-center justify-between border-t border-black pt-6">
                                <div>
                                    <h3 className="font-bold text-lg text-black uppercase">High Contrast</h3>
                                    <p className="text-xs font-bold text-black/70 uppercase tracking-wide">Maximum UI visibility</p>
                                </div>
                                <ToggleSwitch checked={settings.display.highContrast} onChange={() => handleToggle('display', 'highContrast')} />
                            </div>
                        </div>
                    </section>
                </div>

                {/* Save Block */}
                <div className="pt-8 pb-12 flex justify-end gap-4">
                    <button className="px-6 py-4 bg-white dark:bg-black text-black dark:text-white font-bold uppercase tracking-widest border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:-translate-y-1 hover:translate-x-1 hover:shadow-none active:translate-y-1 active:translate-x-1 transition-all">
                        Cancel
                    </button>
                    <button className="px-8 py-4 bg-accent-neon text-black font-black uppercase tracking-widest border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:translate-x-1 hover:shadow-none active:translate-y-1 active:translate-x-1 transition-all">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}

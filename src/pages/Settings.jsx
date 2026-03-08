import React, { useEffect, useMemo, useState } from 'react';
import { useData } from '../context/DataContext';
import { applicationSettings } from '../data/dummyData';

const SETTINGS_KEY = 'notesAppSettings';

const readSavedSettings = () => {
    try {
        const raw = localStorage.getItem(SETTINGS_KEY);
        if (!raw) return applicationSettings;
        const parsed = JSON.parse(raw);
        return {
            ...applicationSettings,
            privacy: { ...applicationSettings.privacy, ...(parsed.privacy || {}) },
            display: { ...applicationSettings.display, ...(parsed.display || {}) },
        };
    } catch {
        return applicationSettings;
    }
};

const applyDisplaySettings = (display) => {
    const root = document.documentElement;
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldDark = display.theme === 'dark' || (display.theme === 'system' && prefersDark);
    root.classList.toggle('dark', shouldDark);
    root.classList.toggle('high-contrast', Boolean(display.highContrast));
};

export default function Settings() {
    const [settings, setSettings] = useState(() => readSavedSettings());
    const [savedSettings, setSavedSettings] = useState(() => readSavedSettings());
    const [statusText, setStatusText] = useState('');
    const [avatarBroken, setAvatarBroken] = useState(false);
    const { user } = useData();
    const avatar = user?.picture || '';
    const name = user?.name || 'Student';

    useEffect(() => {
        applyDisplaySettings(settings.display);
    }, [settings.display]);

    const isDirty = useMemo(() => JSON.stringify(settings) !== JSON.stringify(savedSettings), [settings, savedSettings]);

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
            className={`w-14 h-8 flex items-center cursor-pointer border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] transition-colors ${checked ? 'bg-black' : 'bg-white'}`}
        >
            <div className={`w-6 h-6 border-2 border-black dark:border-white transform transition-transform ${checked ? 'translate-x-6 bg-white' : 'translate-x-0 bg-black'}`}></div>
        </div>
    );

    const onThemeChange = (e) => {
        const next = e.target.value;
        setSettings((prev) => ({
            ...prev,
            display: { ...prev.display, theme: next },
        }));
    };

    const onSave = () => {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
        setSavedSettings(settings);
        applyDisplaySettings(settings.display);
        setStatusText('Settings saved');
        setTimeout(() => setStatusText(''), 1800);
    };

    const onCancel = () => {
        setSettings(savedSettings);
        applyDisplaySettings(savedSettings.display);
        setStatusText('Changes reverted');
        setTimeout(() => setStatusText(''), 1800);
    };

    return (
        <div className="max-w-4xl mx-auto w-full pb-20 md:pb-8 animate-fade-in animate-slide-up animation-delay-100">
            <header className="mb-8 border-b-4 border-black dark:border-white pb-4">
                <h1 className="text-4xl md:text-5xl font-display font-black tracking-tight text-black dark:text-white">Settings</h1>
                <p className="text-gray-600 dark:text-gray-400 font-bold tracking-wider mt-2">Manage your preferences</p>
            </header>

            <div className="space-y-8">
                {/* Account Section */}
                <section className="bg-card-light dark:bg-card-dark border-2 border-black dark:border-white p-6 shadow-brutal dark:shadow-brutal-dark hover:-translate-y-1 transition-transform">
                    <h2 className="text-2xl font-display font-black text-black dark:text-white mb-6 flex items-center gap-2">
                        <span className="material-icons-round">person</span> Account
                    </h2>
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        <div className="relative w-24 h-24 border-4 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                            {avatar && !avatarBroken ? (
                                <img
                                    src={avatar}
                                    alt={name}
                                    referrerPolicy="no-referrer"
                                    onError={() => setAvatarBroken(true)}
                                    className="w-full h-full object-cover filter grayscale contrast-125 hover:grayscale-0 transition-all"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                    <span className="material-icons-round text-5xl text-gray-500">person</span>
                                </div>
                            )}
                            <button className="absolute -bottom-3 -right-3 w-10 h-10 bg-accent-blue text-white flex items-center justify-center border-2 border-black dark:border-white hover:scale-110 active:scale-95 transition-transform shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                <span className="material-icons-round text-sm">edit</span>
                            </button>
                        </div>
                        <div className="flex-1 space-y-4 w-full">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                <div>
                                    <label className="block text-xs font-bold tracking-wider mb-1 text-black dark:text-white">Full Name</label>
                                    <input type="text" defaultValue={name} className="w-full bg-white dark:bg-black border-2 border-black dark:border-white p-3 font-bold text-black dark:text-white focus:outline-none focus:ring-4 focus:ring-accent-neon/30 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold tracking-wider mb-1 text-black dark:text-white">Email</label>
                                    <input type="email" defaultValue={user?.email || `${name.toLowerCase().replace(' ', '.')}@school.edu`} className="w-full bg-gray-100 dark:bg-gray-900 border-2 border-black dark:border-white p-3 font-bold text-gray-500 cursor-not-allowed shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]" disabled />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Privacy & Display */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <section className="border-2 border-black p-6 shadow-brutal hover:-translate-y-1 transition-transform" style={{ backgroundColor: '#C2E5FF' }}>
                        <h2 className="text-2xl font-display font-black text-black mb-6 flex items-center gap-2">
                            <span className="material-icons-round">visibility</span> Privacy
                        </h2>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-bold text-lg text-black">Public profile</h3>
                                    <p className="text-xs font-bold text-black/70 tracking-wide">Let others see you</p>
                                </div>
                                <ToggleSwitch checked={settings.privacy.publicProfile} onChange={() => handleToggle('privacy', 'publicProfile')} />
                            </div>
                            <div className="flex items-center justify-between border-t border-black/30 pt-6">
                                <div>
                                    <h3 className="font-bold text-lg text-black">Show activity</h3>
                                    <p className="text-xs font-bold text-black/70 tracking-wide">Display study hours</p>
                                </div>
                                <ToggleSwitch checked={settings.privacy.showActivity} onChange={() => handleToggle('privacy', 'showActivity')} />
                            </div>
                        </div>
                    </section>

                    <section className="bg-accent-yellow border-2 border-black p-6 shadow-brutal hover:-translate-y-1 transition-transform">
                        <h2 className="text-2xl font-display font-black text-black mb-6 flex items-center gap-2">
                            <span className="material-icons-round">palette</span> Display
                        </h2>
                        <div className="space-y-6">
                            <div className="flex flex-col gap-2">
                                <label className="font-bold text-lg text-black">Color theme</label>
                                <select
                                    className="w-full bg-white border-2 border-black p-3 font-bold text-black focus:outline-none focus:ring-4 focus:ring-black/30 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] uppercase appearance-none cursor-pointer"
                                    value={settings.display.theme}
                                    onChange={onThemeChange}
                                >
                                    <option value="system">System Default</option>
                                    <option value="light">Light Mode</option>
                                    <option value="dark">Dark Mode</option>
                                </select>
                            </div>
                            <div className="flex items-center justify-between border-t border-black pt-6">
                                <div>
                                    <h3 className="font-bold text-lg text-black">High contrast</h3>
                                    <p className="text-xs font-bold text-black/70 tracking-wide">Maximum UI visibility</p>
                                </div>
                                <ToggleSwitch checked={settings.display.highContrast} onChange={() => handleToggle('display', 'highContrast')} />
                            </div>
                        </div>
                    </section>
                </div>

                {/* Save Block */}
                <div className="pt-8 pb-12 flex justify-end gap-4">
                    {statusText && (
                        <span className="self-center mr-auto text-xs font-mono font-bold tracking-widest text-black/70 dark:text-white/70">{statusText}</span>
                    )}
                    <button onClick={onCancel} className="px-6 py-4 bg-white dark:bg-black text-black dark:text-white font-bold uppercase tracking-widest border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:-translate-y-1 hover:translate-x-1 hover:shadow-none active:translate-y-1 active:translate-x-1 transition-all">
                        Cancel
                    </button>
                    <button disabled={!isDirty} onClick={onSave} className={`px-8 py-4 bg-accent-neon text-black font-black uppercase tracking-widest border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:translate-x-1 hover:shadow-none active:translate-y-1 active:translate-x-1 transition-all ${!isDirty ? 'opacity-60 cursor-not-allowed' : ''}`}>
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}

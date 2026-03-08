import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import RightPanel from './RightPanel';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../context/DataContext';

export default function Layout() {
    const location = useLocation();
    const navigate = useNavigate();
    const { searchItems, trackRecentFolder } = useData();
    const [isRightPanelOpen, setIsRightPanelOpen] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);

    const toggleDarkMode = () => document.documentElement.classList.toggle('dark');

    useEffect(() => {
        let alive = true;
        const q = searchTerm.trim();
        if (q.length < 2) {
            setSearchResults([]);
            setSearchLoading(false);
            return;
        }
        const timer = setTimeout(async () => {
            try {
                setSearchLoading(true);
                const results = await searchItems(q);
                if (alive) {
                    setSearchResults(results);
                    setSearchOpen(true);
                }
            } catch (error) {
                console.error('Search failed', error);
                if (alive) setSearchResults([]);
            } finally {
                if (alive) setSearchLoading(false);
            }
        }, 220);
        return () => {
            alive = false;
            clearTimeout(timer);
        };
    }, [searchTerm, searchItems]);

    const openResult = (item) => {
        if (item.type === 'folder') {
            trackRecentFolder(item);
            navigate(`/topics?folder=${item.id}`);
        } else {
            navigate(`/pdf?file=${item.id}`);
        }
        setSearchTerm('');
        setSearchResults([]);
        setSearchOpen(false);
    };

    const handleSearchKeyDown = (e) => {
        if (e.key === 'Enter' && searchResults.length > 0) {
            e.preventDefault();
            openResult(searchResults[0]);
        } else if (e.key === 'Escape') {
            setSearchOpen(false);
        }
    };

    return (
        <div className="flex h-screen w-full bg-background-light dark:bg-background-dark text-primary dark:text-gray-100 overflow-hidden transition-colors duration-300 md:p-6 md:gap-6 pb-16 md:pb-6">
            <Sidebar />
            <main className="flex-1 flex flex-col h-full overflow-hidden bg-card-light dark:bg-card-dark relative transition-colors duration-300 border-x md:border-2 border-black dark:border-white shadow-brutal dark:shadow-brutal-dark w-full max-w-full">
                <header className="flex items-center justify-between px-6 py-5 flex-shrink-0 z-10 bg-card-light/80 dark:bg-card-dark/80 backdrop-blur-md sticky top-0 border-b border-black dark:border-white w-full">
                    <div className="flex items-center gap-4 w-full max-w-xl group mr-4">
                        <div className="relative w-full">
                            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 material-icons-round text-black dark:text-white transition-colors">search</span>
                            <input
                                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-black border-2 border-black dark:border-white focus:outline-none focus:ring-4 focus:ring-accent-blue/20 text-black dark:text-white placeholder-gray-500 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
                                placeholder="SEARCH NOTES OR TOPICS..."
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onFocus={() => setSearchOpen(true)}
                                onKeyDown={handleSearchKeyDown}
                            />
                            {searchOpen && (searchTerm.trim().length > 0) && (
                                <div className="absolute top-[calc(100%+8px)] left-0 right-0 max-h-80 overflow-y-auto bg-white dark:bg-black border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-30">
                                    {searchLoading ? (
                                        <div className="p-3 text-xs font-bold tracking-wider uppercase text-black/60 dark:text-white/60">Searching...</div>
                                    ) : searchResults.length === 0 ? (
                                        <div className="p-3 text-xs font-bold tracking-wider uppercase text-black/60 dark:text-white/60">No results</div>
                                    ) : (
                                        searchResults.map((item) => (
                                            <button
                                                key={`${item.type}-${item.id}`}
                                                onClick={() => openResult(item)}
                                                className="w-full p-3 border-b border-black/15 dark:border-white/15 text-left hover:bg-black hover:text-white transition-colors"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <span className="material-icons-round text-sm">{item.icon}</span>
                                                    <span className="font-bold text-sm uppercase">{item.name}</span>
                                                </div>
                                                <div className="text-[10px] font-bold tracking-wider uppercase opacity-60 mt-1">{item.path}</div>
                                            </button>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
                        <button className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white dark:bg-black text-black dark:text-white border-2 border-black dark:border-white transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:translate-x-0.5 hover:-translate-y-0.5 active:translate-y-0 active:translate-x-0 active:shadow-none" onClick={toggleDarkMode}>
                            <span className="material-icons-round">dark_mode</span>
                        </button>
                        <button onClick={() => setIsRightPanelOpen(!isRightPanelOpen)} className="hidden xl:flex w-10 h-10 md:w-12 md:h-12 items-center justify-center bg-white dark:bg-black text-black dark:text-white border-2 border-black dark:border-white transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:translate-x-0.5 hover:-translate-y-0.5 active:translate-y-0 active:translate-x-0 active:shadow-none">
                            <span className="material-icons-round">{isRightPanelOpen ? 'last_page' : 'first_page'}</span>
                        </button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto scroll-smooth relative px-6 md:px-10 pb-10 w-full">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={location.pathname}
                            initial={{ y: 20, opacity: 0, filter: 'blur(4px)' }}
                            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                            exit={{ y: -20, opacity: 0, filter: 'blur(4px)' }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="h-full pt-8"
                        >
                            <Outlet />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
            {isRightPanelOpen && <RightPanel />}
        </div>
    );
}

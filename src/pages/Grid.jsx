import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useData } from '../context/DataContext';

export default function Grid() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { getItemsByParent, getItemById, trackRecentFolder } = useData();

    const folderId = searchParams.get('folder') || null;
    const [currentFolder, setCurrentFolder] = useState(null);
    const [items, setItems] = useState([]);

    useEffect(() => {
        let ignore = false;

        const load = async () => {
            try {
                const [list, folder] = await Promise.all([
                    getItemsByParent(folderId),
                    folderId ? getItemById(folderId) : Promise.resolve(null),
                ]);
                if (!ignore) {
                    setItems(list);
                    setCurrentFolder(folder);
                }
            } catch (error) {
                console.error('Failed to load grid', error);
                if (!ignore) {
                    setItems([]);
                    setCurrentFolder(null);
                }
            }
        };

        load();
        return () => {
            ignore = true;
        };
    }, [folderId, getItemsByParent, getItemById]);

    const pageTitle = currentFolder ? currentFolder.name : 'All Content';
    const pageSubtitle = currentFolder ? 'Select a subfolder to view its contents.' : 'Browse available materials.';

    return (
        <div className="animate-fade-in-up md:mt-4">
            <header className="flex items-center gap-4 mb-10">
                <button
                    onClick={() => navigate(-1)}
                    className="w-12 h-12 bg-white border-2 border-black flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:translate-x-1 active:shadow-none"
                >
                    <span className="material-icons-round">arrow_back</span>
                </button>
                <div>
                    <h1 className="text-5xl lg:text-7xl font-display font-black text-black dark:text-white mb-1 tracking-tighter leading-none capitalize">
                        {pageTitle}
                    </h1>
                    <p className="font-bold tracking-widest text-xs text-black/60 dark:text-white/60 capitalize">{pageSubtitle}</p>
                </div>
            </header>

            {items.length === 0 ? (
                <div className="text-center py-20 border-2 border-black bg-white dark:bg-black shadow-brutal dark:shadow-brutal-dark">
                    <span className="material-icons-round text-6xl mb-4 text-gray-400">folder_open</span>
                    <h2 className="text-2xl font-display font-black tracking-tight text-black dark:text-white capitalize">Empty Directory</h2>
                    <p className="font-bold text-xs tracking-widest opacity-60 mt-2 capitalize">There are no items in this section yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => {
                                if (item.type === 'folder') {
                                    trackRecentFolder(item);
                                    navigate(`/topics?folder=${item.id}`);
                                } else {
                                    navigate(`/pdf?file=${item.id}`);
                                }
                            }}
                            className={`group relative overflow-hidden ${item.color || 'bg-accent-blue'} p-5 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:translate-x-1 active:shadow-none transition-all duration-300 ease-out cursor-pointer h-64 flex flex-col justify-between border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-0`}
                        >
                            <div className="absolute -top-10 -right-10 p-8 opacity-20 transform rotate-12 scale-150 group-hover:rotate-45 group-hover:scale-125 transition-transform duration-500 pointer-events-none -z-10">
                                <span className="material-icons-round text-[12rem] text-black">
                                    {item.icon || 'folder'}
                                </span>
                            </div>
                            <div className="flex justify-between items-start z-10 w-full mb-4">
                                <div className="w-12 h-12 bg-white border-2 border-black flex items-center justify-center text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                    <span className="material-icons-round text-2xl">{item.icon || 'folder'}</span>
                                </div>
                                <div className="bg-white border-2 border-black px-3 py-1.5 font-mono font-bold text-black flex items-center gap-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                    <span className="material-icons-round text-sm">star</span>
                                    <span className="text-sm">4.8</span>
                                </div>
                            </div>
                            <div className="z-10 mt-auto bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-black flex items-center justify-center p-6 h-32 w-full">
                                <h3 className="text-2xl font-mono font-bold capitalize text-black text-center">{item.name.toLowerCase()}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

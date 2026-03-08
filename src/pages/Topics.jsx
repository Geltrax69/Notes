import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useData } from '../context/DataContext';

export default function Topics() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { getItemsByParent, getItemById, trackRecentFolder } = useData();

    const folderId = searchParams.get('folder');
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
                console.error('Failed to load topics', error);
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

    const folderName = currentFolder ? currentFolder.name : 'Topics';
    const folderColor = currentFolder ? currentFolder.color : 'bg-accent-blue';
    const subfolders = items.filter((i) => i.type === 'folder');
    const files = items.filter((i) => i.type === 'file');

    const TopicCard = ({ item }) => (
        <div
            onClick={() => {
                if (item.type === 'folder') {
                    trackRecentFolder(item);
                    navigate(`/topics?folder=${item.id}`);
                } else {
                    navigate(`/pdf?file=${item.id}`);
                }
            }}
            className={`group ${item.color || 'bg-accent-pink'} p-5 relative transition-all duration-300 ease-out cursor-pointer border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:translate-x-1 active:shadow-none flex flex-col justify-between h-64 overflow-hidden z-0`}
        >
            <div className="absolute -top-10 -right-10 p-8 opacity-20 transform rotate-12 scale-150 group-hover:rotate-45 group-hover:scale-125 transition-transform duration-500 pointer-events-none -z-10">
                <span className="material-icons-round text-[12rem] text-black">
                    {item.icon || 'folder'}
                </span>
            </div>

            <div className="flex justify-between items-start mb-4 z-10 w-full">
                <div className="w-12 h-12 bg-white border-2 border-black flex items-center justify-center text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <span className="material-icons-round text-2xl">{item.icon || 'folder'}</span>
                </div>
                <div className="bg-white px-3 py-1.5 border-2 border-black font-mono font-bold text-black flex items-center gap-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <span className="material-icons-round text-sm">star</span>
                    <span className="text-sm">4.8</span>
                </div>
            </div>
            <div className="z-10 mt-auto bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-black w-full flex items-center justify-center p-6 h-32">
                <h3 className="text-2xl font-mono font-bold capitalize text-center text-black line-clamp-2">{item.name.toLowerCase()}</h3>
            </div>
        </div>
    );

    return (
        <div className="animate-fade-in-up md:mt-4 pb-20 md:pb-6">
            <header className="flex justify-between items-center py-4 mb-8">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="w-12 h-12 bg-white border-2 border-black flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:translate-x-1 active:shadow-none">
                        <span className="material-icons-round text-xl">arrow_back</span>
                    </button>
                    <div>
                        <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-black/60 dark:text-white/60 mb-2 capitalize">
                            <span className="cursor-pointer hover:text-black dark:hover:text-white transition-colors" onClick={() => navigate('/grid')}>Path</span>
                            <span className="material-icons-round text-xs">chevron_right</span>
                            <span className="text-black dark:text-white capitalize">{folderName}</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-display font-black text-black dark:text-white tracking-tighter leading-none capitalize">{folderName} Notes</h1>
                    </div>
                </div>
            </header>

            {items.length === 0 ? (
                <div className="text-center py-20 border-2 border-black bg-white dark:bg-black shadow-brutal dark:shadow-brutal-dark">
                    <span className="material-icons-round text-6xl mb-4 text-gray-400">find_in_page</span>
                    <h2 className="text-2xl font-display font-black tracking-tight text-black dark:text-white capitalize">Empty Folder</h2>
                    <p className="font-bold text-xs tracking-widest opacity-60 mt-2 capitalize">Check back later for newly added study materials.</p>
                </div>
            ) : (
                <>
                    {subfolders.length > 0 && (
                        <div className="mb-12">
                            <h2 className="text-3xl font-display font-black tracking-tight text-black dark:text-white mb-6 flex items-center gap-4 capitalize">
                                <span className={`w-4 h-8 ${folderColor} border-2 border-black`}></span>
                                Subfolders
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {subfolders.map((item) => <TopicCard key={item.id} item={item} />)}
                            </div>
                        </div>
                    )}

                    {files.length > 0 && (
                        <div className="mb-12">
                            <h2 className="text-3xl font-display font-black tracking-tight text-black dark:text-white mb-6 flex items-center gap-4 capitalize">
                                <span className="w-4 h-8 bg-accent-neon border-2 border-black"></span>
                                PDF Notes
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {files.map((item) => <TopicCard key={item.id} item={item} />)}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

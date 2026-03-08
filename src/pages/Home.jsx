import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';

export default function Home() {
    const navigate = useNavigate();
    const { getItemsByParent, trackRecentFolder } = useData();
    const [rootFolders, setRootFolders] = useState([]);

    useEffect(() => {
        let ignore = false;

        const loadRoot = async () => {
            try {
                const folders = await getItemsByParent(null);
                if (!ignore) {
                    setRootFolders(folders.filter((item) => item.type === 'folder'));
                }
            } catch (error) {
                console.error('Failed to load root folders', error);
                if (!ignore) {
                    setRootFolders([]);
                }
            }
        };

        loadRoot();
        return () => {
            ignore = true;
        };
    }, [getItemsByParent]);

    return (
        <>
            <div className="mb-10 animate-fade-in-up md:mt-4 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h1 className="text-5xl md:text-7xl font-display font-black text-black dark:text-white mb-2 leading-none tracking-tighter capitalize">Invest in You <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-red to-accent-blue">future success</span></h1>
                    <p className="text-black dark:text-white font-bold tracking-widest mt-6 text-sm max-w-md border-l-4 border-black dark:border-white pl-4 capitalize">Select your class below to browse curated study materials & ace your exams.</p>
                </div>
            </div>

            <div className="flex gap-4 mb-10 overflow-x-auto pb-4 scrollbar-hide pt-2 pl-2 -ml-2">
                <button onClick={() => navigate('/grid')} className="flex items-center gap-2 px-6 py-3 bg-black dark:bg-white text-white dark:text-black hover:bg-accent-yellow hover:text-black border-2 border-black dark:border-white transition-all duration-300 ease-out shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] whitespace-nowrap active:translate-y-1 active:translate-x-1 active:shadow-none">
                    <span className="material-icons-round text-lg">grid_view</span>
                    <span className="font-bold tracking-widest text-sm capitalize">All Classes</span>
                </button>
            </div>

            {rootFolders.length === 0 ? (
                <div className="text-center py-20 border-2 border-black bg-white shadow-brutal mb-12">
                    <span className="material-icons-round text-6xl mb-4 text-gray-400">folder_off</span>
                    <h2 className="text-2xl font-display font-black tracking-tight text-black capitalize">No Content Available</h2>
                    <p className="font-bold text-xs tracking-widest opacity-60 mt-2 capitalize">Admin needs to create folders and upload notes first.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6 mb-12">
                    {rootFolders.map((folder) => (
                        <div key={folder.id} onClick={() => { trackRecentFolder(folder); navigate(`/grid?folder=${folder.id}`); }} className={`group relative overflow-hidden ${folder.color || 'bg-accent-pink'} p-5 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:translate-x-1 active:shadow-none transition-all duration-300 ease-out cursor-pointer h-64 flex flex-col justify-between border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-0`}>
                            {/* Background decoration */}
                            <div className="absolute -top-10 -right-10 p-8 opacity-20 transform rotate-12 scale-150 group-hover:rotate-45 group-hover:scale-125 transition-transform duration-500 pointer-events-none -z-10">
                                <span className="material-icons-round text-[12rem] text-black">
                                    {folder.icon || 'folder'}
                                </span>
                            </div>

                            <div className="flex justify-between items-start z-10 w-full mb-4">
                                <div className="w-12 h-12 bg-white border-2 border-black flex items-center justify-center text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                    <span className="material-icons-round text-2xl">{folder.icon || 'menu_book'}</span>
                                </div>
                                <div className="bg-white border-2 border-black px-3 py-1.5 font-mono font-bold text-black flex items-center gap-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                    <span className="material-icons-round text-sm">star</span>
                                    <span className="text-sm">4.8</span>
                                </div>
                            </div>

                            <div className="z-10 mt-auto bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-black flex items-center justify-center p-6 h-32 w-full">
                                <h3 className="text-2xl font-mono font-bold capitalize text-black text-center">{folder.name.toLowerCase()}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="mb-8">
                <h2 className="text-3xl font-display font-black tracking-tight text-black dark:text-white mb-6 border-b-4 border-black dark:border-white inline-block pb-1 capitalize">Featured Resources</h2>
                <div onClick={() => navigate('/grid')} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-accent-yellow p-6 border-2 border-black flex items-center gap-6 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:translate-x-1 active:shadow-none cursor-pointer transition-all duration-300 ease-out shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] group">
                        <div className="w-20 h-20 bg-white border-2 border-black flex items-center justify-center text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:bg-black group-hover:text-white transition-colors duration-300">
                            <span className="material-icons-round text-4xl">lightbulb</span>
                        </div>
                        <div>
                            <h4 className="font-mono font-black text-2xl text-black capitalize">Start Learning</h4>
                            <p className="font-mono font-bold text-black/70 text-xs mt-1 capitalize">Browse all available materials.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

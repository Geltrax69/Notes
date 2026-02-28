import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { subjectsData, featuredClasses } from '../data/dummyData';

export default function Grid() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const classId = searchParams.get('class');
    const streamId = searchParams.get('stream');
    const searchTerm = searchParams.get('search')?.toLowerCase() || '';

    let filteredSubjects = subjectsData;
    let pageTitle = "All Subjects";
    let pageSubtitle = "Select a subject to view study materials and notes.";

    if (classId) {
        filteredSubjects = filteredSubjects.filter(sub => sub.classes?.includes(classId));
        const classInfo = featuredClasses.find(c => c.id === classId);
        pageTitle = classInfo ? `${classInfo.name} Subjects` : `Class ${classId} Subjects`;
    } else if (streamId) {
        filteredSubjects = filteredSubjects.filter(sub => sub.streams?.includes(streamId.toLowerCase()));
        pageTitle = `${streamId.charAt(0).toUpperCase() + streamId.slice(1)} Stream Subjects`;
    }

    if (searchTerm) {
        filteredSubjects = filteredSubjects.filter(sub =>
            sub.name.toLowerCase().includes(searchTerm) ||
            sub.description.toLowerCase().includes(searchTerm)
        );
        pageTitle = `Search Results for "${searchTerm}"`;
    }

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
                    <h1 className="text-5xl lg:text-7xl font-display font-black text-black dark:text-white mb-1 uppercase tracking-tighter leading-none">
                        {pageTitle}
                    </h1>
                    <p className="font-bold tracking-widest text-[10px] uppercase text-black/60 dark:text-white/60">{pageSubtitle}</p>
                </div>
            </header>

            {!searchTerm && (
                <div className="flex gap-4 mb-10 overflow-x-auto pb-4 scrollbar-hide">
                    <button onClick={() => navigate('/grid')} className="flex items-center gap-2 px-6 py-3 bg-black text-white dark:bg-white dark:text-black border-2 border-black dark:border-white transition-colors shadow-brutal dark:shadow-brutal-dark whitespace-nowrap active:translate-y-1 active:translate-x-1 active:shadow-none">
                        <span className="material-icons-round text-lg">grid_view</span>
                        <span className="font-bold tracking-widest uppercase text-sm">All</span>
                    </button>
                    <button onClick={() => navigate('/grid?stream=science')} className="flex items-center gap-2 px-6 py-3 bg-white text-black dark:bg-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black border-2 border-black dark:border-white transition-colors shadow-brutal dark:shadow-brutal-dark whitespace-nowrap active:translate-y-1 active:translate-x-1 active:shadow-none">
                        <span className="material-icons-round text-lg text-accent-orange group-hover:text-current">science</span>
                        <span className="font-bold tracking-widest uppercase text-sm">Science</span>
                    </button>
                    <button onClick={() => navigate('/grid?stream=commerce')} className="flex items-center gap-2 px-6 py-3 bg-white text-black dark:bg-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black border-2 border-black dark:border-white transition-colors shadow-brutal dark:shadow-brutal-dark whitespace-nowrap active:translate-y-1 active:translate-x-1 active:shadow-none">
                        <span className="material-icons-round text-lg text-accent-blue group-hover:text-current">calculate</span>
                        <span className="font-bold tracking-widest uppercase text-sm">Commerce</span>
                    </button>
                    <button onClick={() => navigate('/grid?stream=arts')} className="flex items-center gap-2 px-6 py-3 bg-white text-black dark:bg-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black border-2 border-black dark:border-white transition-colors shadow-brutal dark:shadow-brutal-dark whitespace-nowrap active:translate-y-1 active:translate-x-1 active:shadow-none">
                        <span className="material-icons-round text-lg text-accent-purple group-hover:text-current">history_edu</span>
                        <span className="font-bold tracking-widest uppercase text-sm">Arts</span>
                    </button>
                </div>
            )}

            {filteredSubjects.length === 0 ? (
                <div className="text-center py-20 border-2 border-black bg-white dark:bg-black shadow-brutal dark:shadow-brutal-dark">
                    <span className="material-icons-round text-6xl mb-4 text-gray-400">search_off</span>
                    <h2 className="text-2xl font-display font-black uppercase tracking-tight text-black dark:text-white">No Subjects Found</h2>
                    <p className="font-bold uppercase text-xs tracking-widest opacity-60 mt-2">Try selecting a different filter or search term.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {filteredSubjects.map((subject) => (
                        <div key={subject.id} onClick={() => navigate(`/topics?subject=${subject.id}`)} className={`group relative overflow-hidden ${subject.color} p-8 hover:-translate-y-2 transition-transform duration-300 cursor-pointer h-80 flex flex-col justify-between border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`}>
                            <div className="absolute -top-10 -right-10 p-8 opacity-20 transform rotate-12 scale-150 group-hover:rotate-45 group-hover:scale-125 transition-transform duration-500">
                                <span className="material-icons-round text-[14rem] text-black mix-blend-overlay">{subject.icon}</span>
                            </div>
                            <div className="flex justify-between items-start z-10">
                                <div className="w-16 h-16 bg-white border-2 border-black flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                    <span className="material-icons-round text-4xl">{subject.icon}</span>
                                </div>
                                <span className="bg-white border-2 border-black px-4 py-1.5 font-bold text-black flex items-center gap-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                    <span className="material-icons-round text-sm">star</span> {subject.rating}
                                </span>
                            </div>
                            <div className="z-10 mt-auto bg-white/95 p-5 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:bg-black group-hover:text-white transition-colors text-black">
                                <h3 className="text-3xl font-display font-black uppercase mb-2">{subject.name}</h3>
                                <p className="text-xs font-bold opacity-80 mb-4 line-clamp-2 uppercase">{subject.description}</p>
                                <div className="flex items-center justify-between border-t-2 border-black/10 pt-4 group-hover:border-white/20">
                                    <div className="flex -space-x-3">
                                        <div className="w-8 h-8 rounded-full border-2 border-black bg-accent-blue"></div>
                                        <div className="w-8 h-8 rounded-full border-2 border-black bg-accent-orange"></div>
                                        <div className="w-8 h-8 rounded-full border-2 border-black bg-white flex items-center justify-center text-[10px] font-black">+12</div>
                                    </div>
                                    <p className="text-[10px] font-black tracking-widest uppercase">{subject.chapters} Ch • {subject.notes} Notes</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

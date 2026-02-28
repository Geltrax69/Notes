import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { topicsData, subjectsData } from '../data/dummyData';

export default function Topics() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // Get subject ID from URL, default to first subject if not found
    const subjectId = searchParams.get('subject');
    const subjectInfo = subjectsData.find(s => s.id === subjectId) || subjectsData[3]; // Default to English Grammar

    // Filter topics for this subject
    const subjectTopics = topicsData.filter(t => t.subjectId === subjectInfo.id);

    // Grouping logic (optional, but requested in original design with Fundamental vs Advanced)
    const fundamentalTopics = subjectTopics.filter(t => t.type === 'Fundamental');
    const advancedTopics = subjectTopics.filter(t => t.type === 'Advanced');

    // Reusable Topic Card Component
    const TopicCard = ({ topic }) => (
        <div onClick={() => navigate(`/pdf?topic=${topic.id}`)} className={`group ${topic.color} p-8 relative transition-transform duration-300 cursor-pointer border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 flex flex-col justify-between min-h-[250px] overflow-hidden`}>
            <div className="absolute -top-6 -right-6 p-6 opacity-20 transform rotate-12 scale-150 group-hover:rotate-45 group-hover:scale-125 transition-transform duration-500">
                <span className="material-icons-round text-[10rem] text-black">{topic.icon}</span>
            </div>
            <div className="flex justify-between items-start mb-6 z-10 w-full">
                <div className="w-14 h-14 bg-white border-2 border-black flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <span className="material-icons-round text-3xl">{topic.icon}</span>
                </div>
                {topic.isBestValue ? (
                    <div className="bg-white px-4 py-1.5 border-2 border-black font-bold text-black flex items-center gap-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] bg-accent-neon">
                        <span className="material-icons-round text-sm">emoji_events</span> Best Value
                    </div>
                ) : (
                    <div className="bg-white px-4 py-1.5 border-2 border-black font-bold text-black flex items-center gap-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        <span className="material-icons-round text-sm">star</span> {topic.rating}
                    </div>
                )}
            </div>
            <div className="z-10 mt-auto bg-white/95 p-5 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:bg-black group-hover:text-white transition-colors text-black w-full">
                <h3 className="text-2xl font-display font-black uppercase mb-2">{topic.title}</h3>
                <p className="text-xs font-bold opacity-80 mb-4 line-clamp-2 uppercase">{topic.description}</p>
                <div className="flex items-center justify-between border-t-2 border-black/10 pt-4 group-hover:border-white/20">
                    {topic.preview ? (
                        <span className="bg-white px-3 py-1.5 border-2 border-black text-[10px] font-black uppercase flex items-center gap-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-black">
                            <span className="material-icons-round text-[12px]">visibility</span> Preview
                        </span>
                    ) : (
                        <div className="flex -space-x-3">
                            <div className="h-8 w-8 rounded-full bg-white border-2 border-black flex items-center justify-center text-[10px] font-black">{topic.students}</div>
                        </div>
                    )}
                    <div className="text-right">
                        <span className="block text-[10px] uppercase font-black tracking-widest opacity-60 mb-1">Price</span>
                        <span className="text-xl font-display font-black">₹{topic.price}</span>
                    </div>
                </div>
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
                        <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-black/60 dark:text-white/60 mb-2">
                            <span className="cursor-pointer hover:text-black dark:hover:text-white transition-colors" onClick={() => navigate('/grid')}>Subjects</span>
                            <span className="material-icons-round text-xs">chevron_right</span>
                            <span className="text-black dark:text-white">{subjectInfo.name}</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-display font-black text-black dark:text-white uppercase tracking-tighter leading-none">{subjectInfo.name} Notes</h1>
                    </div>
                </div>
            </header>

            <div className="flex gap-4 overflow-x-auto pb-6 mb-4 scrollbar-hide">
                <button className="flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black border-2 border-black dark:border-white px-6 py-3 font-bold tracking-widest uppercase text-sm whitespace-nowrap shadow-brutal dark:shadow-brutal-dark transition-all active:translate-y-1 active:translate-x-1 active:shadow-none">
                    <span className="material-icons-round text-lg">grid_view</span>
                    All Topics
                </button>
                <button className="flex items-center gap-2 bg-white dark:bg-black text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black border-2 border-black dark:border-white px-6 py-3 font-bold tracking-widest uppercase text-sm whitespace-nowrap shadow-brutal dark:shadow-brutal-dark transition-all active:translate-y-1 active:translate-x-1 active:shadow-none">
                    <span className="material-icons-round text-lg">psychology</span>
                    Advanced
                </button>
                <button className="flex items-center gap-2 bg-white dark:bg-black text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black border-2 border-black dark:border-white px-6 py-3 font-bold tracking-widest uppercase text-sm whitespace-nowrap shadow-brutal dark:shadow-brutal-dark transition-all active:translate-y-1 active:translate-x-1 active:shadow-none">
                    <span className="material-icons-round text-lg">school</span>
                    Basics
                </button>
                <button className="flex items-center gap-2 bg-white dark:bg-black text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black border-2 border-black dark:border-white px-6 py-3 font-bold tracking-widest uppercase text-sm whitespace-nowrap shadow-brutal dark:shadow-brutal-dark transition-all active:translate-y-1 active:translate-x-1 active:shadow-none">
                    <span className="material-icons-round text-lg text-accent-orange group-hover:text-current">quiz</span>
                    Practice test
                </button>
            </div>

            {subjectTopics.length === 0 ? (
                <div className="text-center py-20 border-2 border-black bg-white dark:bg-black shadow-brutal dark:shadow-brutal-dark">
                    <span className="material-icons-round text-6xl mb-4 text-gray-400">find_in_page</span>
                    <h2 className="text-2xl font-display font-black uppercase tracking-tight text-black dark:text-white">No Topics Found</h2>
                    <p className="font-bold uppercase text-xs tracking-widest opacity-60 mt-2">Check back later for newly added study materials.</p>
                </div>
            ) : (
                <>
                    {fundamentalTopics.length > 0 && (
                        <div className="mb-12">
                            <h2 className="text-3xl font-display font-black tracking-tight text-black dark:text-white mb-6 uppercase flex items-center gap-4">
                                <span className={`w-4 h-8 ${subjectInfo.color} border-2 border-black`}></span>
                                Fundamental Concepts
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {fundamentalTopics.map(topic => <TopicCard key={topic.id} topic={topic} />)}
                            </div>
                        </div>
                    )}

                    {advancedTopics.length > 0 && (
                        <div className="mb-12">
                            <h2 className="text-3xl font-display font-black tracking-tight text-black dark:text-white mb-6 uppercase flex items-center gap-4">
                                <span className={`w-4 h-8 bg-accent-neon border-2 border-black`}></span>
                                Advanced Topics
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {advancedTopics.map(topic => <TopicCard key={topic.id} topic={topic} />)}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

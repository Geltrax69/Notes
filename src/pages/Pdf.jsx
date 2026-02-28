import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { topicsData, subjectsData } from '../data/dummyData';
import { Document, Page, pdfjs } from 'react-pdf';

// Setup pdf.js worker using a standard CDN approach to avoid build issues with Vite/Webpack
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function Pdf() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [numPages, setNumPages] = useState();

    // Get topic from URL or default to Active & Passive Voice
    const topicId = searchParams.get('topic');
    const topic = topicsData.find(t => t.id === topicId) || topicsData[2];
    const subject = subjectsData.find(s => s.id === topic.subjectId) || subjectsData[3];

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    // Number of pages to show as preview (maximum 3)
    const previewPagesCount = Math.min(3, numPages || 3);
    const pagesToRender = Array.from(new Array(previewPagesCount), (el, index) => index + 1);

    return (
        <div className="animate-fade-in-up h-full flex flex-col -mx-8 -my-8 px-8 py-8 bg-white dark:bg-black">
            <header className="flex items-center justify-between pb-6 border-b-4 border-black dark:border-white mb-8">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="w-12 h-12 bg-white border-2 border-black flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:translate-x-1 active:shadow-none">
                        <span className="material-icons-round">arrow_back</span>
                    </button>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-display font-black text-black dark:text-white uppercase leading-none mb-1">{topic.title}</h1>
                        <div className="flex items-center gap-3 text-[10px] font-black tracking-widest uppercase text-black/60 dark:text-white/60">
                            <span className={`px-2 py-0.5 ${subject.color} text-black border-2 border-black`}>{subject.name.substring(0, 3)} 102</span>
                            <span>•</span>
                            <span>{numPages ? `${numPages} Pages` : 'Loading...'}</span>
                            <span>•</span>
                            <div className="flex items-center text-black dark:text-white">
                                <span className="material-icons-round text-[12px]">star</span>
                                <span className="ml-1 font-black">{topic.rating}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button className="w-12 h-12 bg-white border-2 border-black flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:translate-x-1 active:shadow-none">
                        <span className="material-icons-round">file_download</span>
                    </button>
                    <button className="w-12 h-12 bg-white border-2 border-black sm:flex hidden items-center justify-center text-black hover:bg-black hover:text-white transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:translate-x-1 active:shadow-none">
                        <span className="material-icons-round">share</span>
                    </button>
                </div>
            </header>

            <div className="flex-1 flex justify-center pb-10 relative overflow-y-auto">
                <div
                    className="w-full max-w-4xl flex flex-col items-center gap-8 relative z-0"
                    onContextMenu={(e) => e.preventDefault()} // Prevent right-click to save image
                >
                    <Document
                        file="/notescheck.pdf"
                        onLoadSuccess={onDocumentLoadSuccess}
                        className="flex flex-col gap-8 w-full items-center select-none" // Disable selection highlighting visually
                    >
                        {pagesToRender.map((pageNumber) => (
                            <div
                                key={`page_${pageNumber}`}
                                className="bg-white border-2 border-black w-full max-w-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden transition-all duration-300 min-h-[600px]"
                            >
                                <div className={pageNumber === previewPagesCount ? 'filter blur-[6px] opacity-40 pointer-events-none' : ''}>
                                    <Page
                                        pageNumber={pageNumber}
                                        className="w-full flex justify-center pdf-page-container"
                                        renderTextLayer={false}
                                        renderAnnotationLayer={false}
                                        width={672}
                                    />
                                </div>
                                {/* Page Number Overlay overlay */}
                                <div className="absolute top-0 right-0 w-12 h-12 border-l-2 border-b-2 border-black bg-accent-orange flex items-center justify-center opacity-90 z-20">
                                    <span className="font-display font-black text-xl">{pageNumber}</span>
                                </div>

                                {/* Lock Overlay - Only on the final preview page */}
                                {pageNumber === previewPagesCount && (
                                    <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-4 pointer-events-none">
                                        {/* Make the actual lock box clickable by restoring pointer-events */}
                                        <div className="bg-white border-4 border-black p-6 md:p-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center text-center max-w-lg w-full relative overflow-hidden pointer-events-auto backdrop-blur-md bg-white/95">
                                            <div className="absolute -top-10 -right-10 p-6 opacity-10 transform -rotate-12 scale-150">
                                                <span className="material-icons-round text-[12rem] text-black">lock</span>
                                            </div>
                                            <div className="w-16 h-16 md:w-20 md:h-20 bg-accent-green border-4 border-black text-black flex items-center justify-center mb-4 md:mb-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transform -rotate-3 hover:rotate-0 transition-transform cursor-pointer">
                                                <span className="material-icons-round text-4xl md:text-5xl">lock</span>
                                            </div>
                                            <h3 className="text-2xl md:text-3xl font-display font-black text-black uppercase mb-3 leading-none">Unlock Premium Content</h3>
                                            <p className="text-black font-bold tracking-widest text-[10px] md:text-xs uppercase mb-6 max-w-sm mx-auto">
                                                Get instant access to all {numPages || 12} pages, high-resolution diagrams, and practice questions.
                                            </p>

                                            <div className="bg-accent-orange border-4 border-black w-full p-4 md:p-6 mb-6 flex items-center justify-between shadow-[inset_4px_4px_0px_0px_rgba(0,0,0,0.1)]">
                                                <div className="flex flex-col text-left text-black">
                                                    <span className="text-[10px] md:text-xs uppercase font-black tracking-widest mb-1 border-b-2 border-black/20 inline-block pb-1">Total Price</span>
                                                    <div className="flex items-baseline gap-2 md:gap-3 mt-1">
                                                        <span className="text-3xl md:text-4xl font-display font-black">₹{topic.price}</span>
                                                        <span className="text-base md:text-lg font-bold line-through opacity-70">₹{topic.price * 2}</span>
                                                    </div>
                                                </div>
                                                <div className="bg-black text-white text-xs md:text-sm px-3 md:px-4 py-2 font-black uppercase tracking-widest border-2 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transform rotate-3">
                                                    50% OFF
                                                </div>
                                            </div>

                                            <button className="w-full bg-black text-white hover:bg-accent-green hover:text-black border-4 border-black font-black uppercase tracking-widest py-4 md:py-5 px-6 transition-colors flex items-center justify-center gap-3 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transform active:translate-y-1 active:translate-x-1 active:shadow-none mb-4 md:mb-6 group text-base md:text-lg">
                                                <span className="material-icons-round text-xl md:text-2xl group-hover:animate-pulse">lock_open</span>
                                                Pay & Unlock PDF
                                            </button>
                                            <div className="flex items-center gap-2 text-[8px] md:text-[10px] font-black tracking-widest uppercase text-black/60">
                                                <span className="material-icons-round text-xs md:text-sm text-black">verified_user</span>
                                                Secure payment via UPI, Cards, or NetBanking
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </Document>
                </div>
            </div>

            {/* CSS to ensure react-pdf canvas elements scale correctly inside the brutally boxed div and hide any stray text selection highlights */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .pdf-page-container canvas {
                    width: 100% !important;
                    height: auto !important;
                }
                .react-pdf__Page__textContent {
                    display: none !important;
                }
            `}} />
        </div>
    );
}

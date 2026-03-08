import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-bg-light dark:bg-bg-dark pb-10">
            <div className="max-w-6xl mx-auto px-5 md:px-8 pt-6 md:pt-10">
                <header className="border-4 border-black bg-white px-5 py-4 md:px-8 md:py-5 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-fade-in-up">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-display font-black tracking-tight text-black">Notes.io</h1>
                            <p className="font-mono text-[10px] font-bold tracking-wide text-black/60 mt-1">Curated exam PDFs for students</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => navigate('/login')}
                                className="px-4 py-2 bg-white text-black border-2 border-black font-mono font-black tracking-wider text-xs shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:-translate-x-0.5 transition-all"
                            >
                                Login
                            </button>
                            <button
                                onClick={() => navigate('/login')}
                                className="px-4 py-2 bg-accent-neon text-black border-2 border-black font-mono font-black tracking-wider text-xs shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:-translate-x-0.5 transition-all"
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </header>

                <section className="mt-6 border-4 border-black bg-white p-6 md:p-10 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] animate-fade-in-up overflow-hidden" style={{ animationDelay: '80ms' }}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch min-h-[500px]">
                        <div className="flex flex-col justify-between min-h-[460px]">
                            <div>
                                <h2 className="text-4xl md:text-6xl font-display font-black leading-none text-black">Study smarter.</h2>
                            <h3 className="text-2xl md:text-4xl font-display font-black text-accent-red mt-6">Buy only what you need.</h3>
                            <p className="mt-10 text-sm md:text-base font-mono font-bold leading-relaxed tracking-normal text-black/80 border-l-4 border-black pl-4 max-w-[36rem]">
                                Find class-wise and subject-wise notes. Preview before payment, unlock instantly, and revisit purchased PDFs anytime.
                            </p>
                            </div>
                            <div className="mt-6">
                                <div className="flex flex-wrap gap-3">
                                <button
                                    onClick={() => navigate('/login')}
                                    className="px-5 py-3 bg-accent-yellow text-black border-2 border-black font-display font-black tracking-wide shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:-translate-x-0.5 transition-all"
                                >
                                    Explore Notes
                                </button>
                                    <button
                                        onClick={() => navigate('/login')}
                                        className="px-5 py-3 bg-white text-black border-2 border-black font-display font-black tracking-wide shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:-translate-x-0.5 transition-all"
                                    >
                                        View My Purchases
                                    </button>
                                </div>
                                <p className="mt-6 font-mono text-sm font-bold tracking-wide text-black/70 leading-relaxed">
                                    Secure checkout with Razorpay | Instant PDF unlock | Student-friendly pricing
                                </p>
                            </div>
                        </div>

                        <div className="relative h-full min-h-[460px]">
                            <div className="border-2 border-black p-4 bg-white text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:-translate-x-0.5 transition-all">
                                <p className="font-display font-black text-2xl text-black">How it helps</p>
                                <ul className="mt-4 space-y-2 font-mono text-xs font-bold tracking-wide leading-relaxed text-black">
                                    <li><span className="bg-black text-white px-1">Class-wise</span> organized library</li>
                                    <li><span className="bg-black text-white px-1">Subject-wise</span> focused PDFs</li>
                                    <li><span className="bg-black text-white px-1">Preview</span> before you pay</li>
                                    <li><span className="bg-black text-white px-1">One-time payment</span>, unlimited re-open</li>
                                    <li>Fast search by <span className="bg-black text-white px-1">chapter and topic</span></li>
                                </ul>
                            </div>
                            <img
                                src="/duck.jpeg"
                                alt="Duck illustration"
                                className="hidden md:block absolute right-0 bottom-[-39.3px] w-[80%] min-w-[200px] object-contain drop-shadow-[3px_3px_0_rgba(0,0,0,0.35)]"
                            />
                        </div>
                    </div>
                </section>

                <section className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 animate-fade-in-up" style={{ animationDelay: '140ms' }}>
                    <div className="border-2 border-black bg-white p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all">
                        <p className="font-mono text-[10px] font-black tracking-normal text-black/60">Classes covered</p>
                        <p className="font-display text-3xl font-black mt-1">1+</p>
                    </div>
                    <div className="border-2 border-black bg-white p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all">
                        <p className="font-mono text-[10px] font-black tracking-normal text-black/60">Subjects</p>
                        <p className="font-display text-3xl font-black mt-1">24+</p>
                    </div>
                    <div className="border-2 border-black bg-white p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all">
                        <p className="font-mono text-[10px] font-black tracking-normal text-black/60">PDFs available</p>
                        <p className="font-display text-3xl font-black mt-1">500+</p>
                    </div>
                    <div className="border-2 border-black bg-white p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all">
                        <p className="font-mono text-[10px] font-black tracking-normal text-black/60">Students using</p>
                        <p className="font-display text-3xl font-black mt-1">2k+</p>
                    </div>
                </section>

                <section className="mt-6 border-4 border-black bg-white p-6 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                    <h3 className="font-display font-black text-3xl">Why students choose Notes.io</h3>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <article className="border-2 border-black p-4 bg-accent-pink text-white hover:-translate-y-0.5 transition-all">
                            <p className="font-display font-black text-xl">Focused content</p>
                            <p className="font-mono text-xs font-bold leading-relaxed tracking-normal mt-2 text-white/95">Only exam-relevant material, curated chapter by chapter.</p>
                        </article>
                        <article className="border-2 border-black p-4 bg-[#D8F77A] hover:-translate-y-0.5 transition-all">
                            <p className="font-display font-black text-xl">Pay per need</p>
                            <p className="font-mono text-xs font-bold leading-relaxed tracking-normal mt-2">No forced subscription. Purchase only what you actually study.</p>
                        </article>
                        <article className="border-2 border-black p-4 bg-accent-blue text-white hover:-translate-y-0.5 transition-all">
                            <p className="font-display font-black text-xl">Anytime access</p>
                            <p className="font-mono text-xs font-bold leading-relaxed tracking-normal mt-2">Purchased PDFs stay in your account and open instantly.</p>
                        </article>
                    </div>
                </section>

                <section className="mt-6 border-4 border-black bg-white p-6 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] animate-fade-in-up" style={{ animationDelay: '260ms' }}>
                    <h3 className="font-display font-black text-3xl">How it works</h3>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="border-2 border-black p-4 bg-white">
                            <p className="font-mono text-[10px] font-black tracking-widest text-black/60">Step 1</p>
                            <p className="font-display text-2xl font-black mt-1">Pick class</p>
                            <p className="font-mono text-xs font-bold mt-2">Choose your class and subject stream.</p>
                        </div>
                        <div className="border-2 border-black p-4 bg-white">
                            <p className="font-mono text-[10px] font-black tracking-widest text-black/60">Step 2</p>
                            <p className="font-display text-2xl font-black mt-1">Preview PDF</p>
                            <p className="font-mono text-xs font-bold mt-2">Review sample pages before making payment.</p>
                        </div>
                        <div className="border-2 border-black p-4 bg-white">
                            <p className="font-mono text-[10px] font-black tracking-widest text-black/60">Step 3</p>
                            <p className="font-display text-2xl font-black mt-1">Unlock forever</p>
                            <p className="font-mono text-xs font-bold mt-2">Pay once and access from My Purchases anytime.</p>
                        </div>
                    </div>
                </section>

                <footer className="mt-6 border-4 border-black bg-white px-6 py-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-fade-in-up" style={{ animationDelay: '320ms' }}>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                        <div className="md:col-span-2">
                            <h4 className="font-display text-2xl font-black">Notes.io</h4>
                            <p className="font-mono text-xs font-bold tracking-widest text-black/70 mt-2">Built for students to study better and faster.</p>
                        </div>
                        <div>
                            <p className="font-display text-lg font-black">Product</p>
                            <ul className="mt-2 space-y-1 font-mono text-xs font-bold text-black/70">
                                <li>Class Library</li>
                                <li>Topic Search</li>
                                <li>My Purchases</li>
                            </ul>
                        </div>
                        <div>
                            <p className="font-display text-lg font-black">Support</p>
                            <ul className="mt-2 space-y-1 font-mono text-xs font-bold text-black/70">
                                <li>Help Center</li>
                                <li>Privacy</li>
                                <li>Terms</li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-5 pt-4 border-t-2 border-black flex items-center justify-between gap-3 flex-wrap">
                        <p className="font-mono text-[10px] font-bold tracking-widest text-black/60">Copyright 2026 Notes.io</p>
                        <button
                            onClick={() => navigate('/login')}
                            className="px-4 py-2 border-2 border-black bg-accent-neon font-mono font-black text-xs shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                        >
                            Get Started
                        </button>
                    </div>
                </footer>
            </div>
        </div>
    );
}

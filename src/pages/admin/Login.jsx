import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { loginAdmin } = useData();

    const handleLogin = (e) => {
        e.preventDefault();
        if (loginAdmin(email, password)) {
            navigate('/admin');
        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-black font-sans flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white border-4 border-black p-8 shadow-brutal active:translate-y-1 active:translate-x-1 active:shadow-none transition-all">
                <div className="text-center mb-8">
                    <span className="material-icons-round text-6xl text-accent-red mb-4">admin_panel_settings</span>
                    <h1 className="text-4xl font-display font-black uppercase text-black">Admin Login</h1>
                    <p className="font-bold text-sm tracking-widest uppercase text-black/60 mt-2">Manage folders and upload PDFs.</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-accent-red border-2 border-black text-black font-bold uppercase text-xs flex items-center gap-2">
                        <span className="material-icons-round">error</span>
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block font-bold text-sm tracking-widest uppercase text-black mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-white border-2 border-black p-4 font-bold text-black focus:outline-none focus:ring-4 focus:ring-accent-neon transition-all"
                            placeholder="notes@lalit.com"
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-bold text-sm tracking-widest uppercase text-black mb-2">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white border-2 border-black p-4 pr-14 font-bold text-black focus:outline-none focus:ring-4 focus:ring-accent-neon transition-all"
                                placeholder="••••••••"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 border-2 border-black bg-white text-black flex items-center justify-center"
                                title={showPassword ? 'Hide password' : 'Show password'}
                            >
                                <span className="material-icons-round text-xl">{showPassword ? 'visibility_off' : 'visibility'}</span>
                            </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-black text-white border-2 border-black py-4 font-black text-xl uppercase tracking-widest hover:bg-accent-neon hover:text-black transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:translate-x-1 active:shadow-none flex justify-center items-center gap-2"
                    >
                        Login <span className="material-icons-round">login</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        className="w-full bg-white text-black border-2 border-black py-4 font-black text-xl uppercase tracking-widest hover:bg-black hover:text-white transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:translate-x-1 active:shadow-none flex justify-center items-center gap-2 mt-4"
                    >
                        Back to User Site <span className="material-icons-round">home</span>
                    </button>
                </form>
            </div>
        </div>
    );
}

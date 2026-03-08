import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';

export default function AdminSidebar() {
    const navigate = useNavigate();
    const location = useLocation();
    const { logoutAdmin } = useData();

    const itemClass = (path) => {
        const active = location.pathname === path;
        return `w-full text-left px-4 py-3 border-2 border-black font-bold tracking-wider text-sm transition-all ${active ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'}`;
    };

    return (
        <aside className="w-full md:w-64 shrink-0 border-2 border-black bg-white p-4 shadow-brutal">
            <h2 className="text-2xl font-display font-black mb-4">Admin</h2>
            <div className="space-y-3">
                <button className={itemClass('/admin')} onClick={() => navigate('/admin')}>Dashboard</button>
                <button className={itemClass('/admin/purchases')} onClick={() => navigate('/admin/purchases')}>Purchases</button>
                <button className="w-full text-left px-4 py-3 border-2 border-black font-bold tracking-wider text-sm bg-white text-black hover:bg-gray-100" onClick={() => navigate('/home')}>View Site</button>
                <button
                    className="w-full text-left px-4 py-3 border-2 border-black font-bold tracking-wider text-sm bg-accent-red text-black hover:bg-black hover:text-white"
                    onClick={() => {
                        logoutAdmin();
                        navigate('/admin/login');
                    }}
                >
                    Logout
                </button>
            </div>
        </aside>
    );
}

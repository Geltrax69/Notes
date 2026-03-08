import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import AdminSidebar from './AdminSidebar';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';

export default function AdminPurchases() {
    const navigate = useNavigate();
    const { adminUser } = useData();
    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!adminUser) {
            navigate('/admin/login');
            return;
        }
        let ignore = false;
        (async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_BASE}/admin/recent-purchases/?limit=10&page=${page}`);
                if (!response.ok) return;
                const data = await response.json();
                if (!ignore) {
                    setRows(data?.results || []);
                    setTotalPages(data?.total_pages || 1);
                }
            } catch {
                if (!ignore) {
                    setRows([]);
                    setTotalPages(1);
                }
            } finally {
                if (!ignore) setLoading(false);
            }
        })();
        return () => {
            ignore = true;
        };
    }, [adminUser, navigate, page]);

    if (!adminUser) return null;

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8 text-black">
            <div className="flex flex-col md:flex-row gap-6">
                <AdminSidebar />
                <main className="flex-1 min-w-0">
                    <header className="mb-6">
                        <h1 className="text-4xl font-display font-black">All Purchases</h1>
                        <p className="text-sm font-bold tracking-wider opacity-60 mt-1">Complete purchase history</p>
                    </header>

                    <div className="border-2 border-black bg-white p-4 shadow-brutal overflow-x-auto">
                        {loading ? (
                            <p className="text-xs font-bold tracking-widest opacity-60">Loading purchases...</p>
                        ) : rows.length === 0 ? (
                            <p className="text-xs font-bold tracking-widest opacity-60">No purchases yet.</p>
                        ) : (
                            <table className="min-w-full border-2 border-black text-black">
                                <thead className="bg-gray-100 border-b-2 border-black">
                                    <tr>
                                        <th className="text-left p-2 text-xs font-bold uppercase">Name</th>
                                        <th className="text-left p-2 text-xs font-bold uppercase">Email</th>
                                        <th className="text-left p-2 text-xs font-bold uppercase">Purchased note</th>
                                        <th className="text-left p-2 text-xs font-bold uppercase">Amount</th>
                                        <th className="text-left p-2 text-xs font-bold uppercase">Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows.map((p) => (
                                        <tr key={p.id} className="border-b border-black/20">
                                            <td className="p-2 text-sm font-bold">{p.name}</td>
                                            <td className="p-2 text-sm">{p.email}</td>
                                            <td className="p-2 text-sm">
                                                <div className="font-bold">{p.note_name}</div>
                                                <div className="text-xs opacity-70">{p.note_path}</div>
                                            </td>
                                            <td className="p-2 text-sm font-black">₹{p.amount}</td>
                                            <td className="p-2 text-xs">{new Date(p.created_at).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-3">
                        <button
                            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                            disabled={page === 1}
                            className="px-4 py-2 border-2 border-black bg-white font-bold text-xs tracking-wider disabled:opacity-40 disabled:cursor-not-allowed hover:bg-black hover:text-white transition-colors"
                        >
                            Previous
                        </button>
                        <p className="text-xs font-bold tracking-widest">
                            Page {page} of {totalPages}
                        </p>
                        <button
                            onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                            disabled={page >= totalPages}
                            className="px-4 py-2 border-2 border-black bg-white font-bold text-xs tracking-wider disabled:opacity-40 disabled:cursor-not-allowed hover:bg-black hover:text-white transition-colors"
                        >
                            Next
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
}

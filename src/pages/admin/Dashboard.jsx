import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useData } from '../../context/DataContext';
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';

function computeFinalPrice(price, discountEnabled, discountPercent) {
    const p = Number(price || 0);
    const d = discountEnabled ? Number(discountPercent || 0) : 0;
    return Math.max(p - Math.round((p * d) / 100), 0);
}

export default function AdminDashboard() {
    const { adminUser, logoutAdmin, getItemsByParent, getItemById, createFolder, uploadFile, updateFilePrice, deleteItem } = useData();
    const navigate = useNavigate();
    const location = useLocation();

    const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
    const [isFileModalOpen, setIsFileModalOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [priceValue, setPriceValue] = useState('499');
    const [discountEnabled, setDiscountEnabled] = useState(false);
    const [discountPercent, setDiscountPercent] = useState('0');
    const [priceEditItem, setPriceEditItem] = useState(null);
    const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
    const [items, setItems] = useState([]);
    const [currentFolder, setCurrentFolder] = useState(null);
    const [stats, setStats] = useState({
        total_users: 0,
        active_users_7d: 0,
        total_logins: 0,
        users_with_purchases: 0,
        total_purchases: 0,
    });
    const [error, setError] = useState('');

    const searchParams = new URLSearchParams(location.search);
    const folderId = searchParams.get('folder') || null;

    const loadCurrentView = useCallback(async () => {
        try {
            const [list, folder] = await Promise.all([
                getItemsByParent(folderId),
                folderId ? getItemById(folderId) : Promise.resolve(null),
            ]);
            setItems(list);
            setCurrentFolder(folder);
            setError('');
        } catch (err) {
            setError(err.message || 'Failed to load data');
            setItems([]);
            setCurrentFolder(null);
        }
    }, [folderId, getItemsByParent, getItemById]);

    useEffect(() => {
        if (!adminUser) {
            navigate('/admin/login');
            return;
        }
        loadCurrentView();
    }, [adminUser, navigate, loadCurrentView]);

    useEffect(() => {
        let ignore = false;
        const loadStats = async () => {
            try {
                const response = await fetch(`${API_BASE}/admin/stats/`);
                if (!response.ok) return;
                const data = await response.json();
                if (!ignore) setStats(data);
            } catch {
                // Keep dashboard working even if stats endpoint fails.
            }
        };
        if (adminUser) loadStats();
        return () => {
            ignore = true;
        };
    }, [adminUser]);

    if (!adminUser) return null;

    const handleLogout = () => {
        logoutAdmin();
        navigate('/');
    };

    const confirmCreateFolder = async (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        try {
            await createFolder(inputValue.trim(), folderId);
            setIsFolderModalOpen(false);
            setInputValue('');
            await loadCurrentView();
        } catch (err) {
            setError(err.message || 'Folder creation failed');
        }
    };

    const confirmUploadFile = async (e) => {
        e.preventDefault();
        if (!inputValue.trim() || !selectedFile) return;

        try {
            await uploadFile(
                inputValue.trim(),
                folderId,
                selectedFile,
                Number(priceValue || 0),
                discountEnabled,
                Number(discountPercent || 0)
            );
            setIsFileModalOpen(false);
            setInputValue('');
            setSelectedFile(null);
            setPriceValue('499');
            setDiscountEnabled(false);
            setDiscountPercent('0');
            await loadCurrentView();
        } catch (err) {
            setError(err.message || 'Upload failed');
        }
    };

    const confirmUpdatePrice = async (e) => {
        e.preventDefault();
        if (!priceEditItem) return;
        try {
            await updateFilePrice(
                priceEditItem.id,
                Number(priceValue || 0),
                discountEnabled,
                Number(discountPercent || 0)
            );
            setIsPriceModalOpen(false);
            setPriceEditItem(null);
            setPriceValue('499');
            setDiscountEnabled(false);
            setDiscountPercent('0');
            await loadCurrentView();
        } catch (err) {
            setError(err.message || 'Price update failed');
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteItem(id);
            await loadCurrentView();
        } catch (err) {
            setError(err.message || 'Delete failed');
        }
    };

    const navigateUp = () => {
        if (currentFolder && currentFolder.parentId) {
            navigate(`/admin?folder=${currentFolder.parentId}`);
        } else {
            navigate('/admin');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans p-4 md:p-8 text-black dark:text-white">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <div>
                    <h1 className="text-4xl md:text-5xl font-display font-black capitalize tracking-tighter flex items-center gap-3">
                        <span className="material-icons-round text-accent-red text-5xl">admin_panel_settings</span>
                        Admin Dashboard
                    </h1>
                    <div className="flex items-center gap-2 mt-2 font-bold capitalize text-xs tracking-widest opacity-60">
                        <span className="cursor-pointer hover:underline" onClick={() => navigate('/admin')}>Root</span>
                        {currentFolder && (
                            <>
                                <span className="material-icons-round text-sm">chevron_right</span>
                                <span>{currentFolder.name}</span>
                            </>
                        )}
                    </div>
                </div>
                <div className="flex gap-4">
                    <button onClick={() => navigate('/')} className="px-6 py-3 bg-white text-black border-2 border-black font-bold capitalize text-sm flex items-center gap-2 shadow-brutal hover:bg-black hover:text-white transition-colors active:translate-y-1 active:translate-x-1 active:shadow-none">
                        <span className="material-icons-round text-lg">public</span> View Site
                    </button>
                    <button onClick={handleLogout} className="px-6 py-3 bg-accent-red text-black border-2 border-black font-bold capitalize text-sm flex items-center gap-2 shadow-brutal hover:bg-black hover:text-white transition-colors active:translate-y-1 active:translate-x-1 active:shadow-none">
                        <span className="material-icons-round text-lg">logout</span> Logout
                    </button>
                </div>
            </header>

            {error && (
                <div className="mb-6 p-4 border-2 border-black bg-red-100">
                    <p className="font-black text-sm tracking-wide">Request failed</p>
                    <p className="text-sm mt-1 break-words">{error}</p>
                </div>
            )}

            <div className="sticky top-0 z-20 bg-gray-50 dark:bg-gray-900 py-3 flex flex-wrap gap-4 mb-8">
                {currentFolder && (
                    <button onClick={navigateUp} className="w-12 h-12 bg-white text-black border-2 border-black flex flex-col justify-center items-center shadow-brutal hover:bg-black hover:text-white transition-colors active:translate-y-1 active:translate-x-1 active:shadow-none">
                        <span className="material-icons-round">arrow_upward</span>
                    </button>
                )}
                <button onClick={() => { setInputValue(''); setIsFolderModalOpen(true); }} className="min-w-[220px] px-6 py-3 bg-accent-neon text-black border-2 border-black font-black capitalize tracking-widest text-sm flex items-center justify-center gap-2 shadow-brutal hover:bg-white transition-colors active:translate-y-1 active:translate-x-1 active:shadow-none">
                    <span className="material-icons-round">create_new_folder</span> Create Folder
                </button>
                <button onClick={() => { setInputValue(''); setSelectedFile(null); setPriceValue('499'); setDiscountEnabled(false); setDiscountPercent('0'); setIsFileModalOpen(true); }} className="min-w-[220px] px-6 py-3 bg-accent-blue text-black border-2 border-black font-black capitalize tracking-widest text-sm flex items-center justify-center gap-2 shadow-brutal hover:bg-white transition-colors active:translate-y-1 active:translate-x-1 active:shadow-none">
                    <span className="material-icons-round">upload_file</span> Upload Note PDF
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 mb-8">
                <div className="bg-white border-2 border-black p-4 shadow-brutal">
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">Total Users</p>
                    <p className="text-3xl font-display font-black mt-1">{stats.total_users}</p>
                </div>
                <div className="bg-white border-2 border-black p-4 shadow-brutal">
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">Active (7d)</p>
                    <p className="text-3xl font-display font-black mt-1">{stats.active_users_7d}</p>
                </div>
                <div className="bg-white border-2 border-black p-4 shadow-brutal">
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">Total Logins</p>
                    <p className="text-3xl font-display font-black mt-1">{stats.total_logins}</p>
                </div>
                <div className="bg-white border-2 border-black p-4 shadow-brutal">
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">Users Purchased</p>
                    <p className="text-3xl font-display font-black mt-1">{stats.users_with_purchases}</p>
                </div>
                <div className="bg-white border-2 border-black p-4 shadow-brutal">
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">Notes Purchased</p>
                    <p className="text-3xl font-display font-black mt-1">{stats.total_purchases}</p>
                </div>
            </div>

            {items.length === 0 ? (
                <div className="text-center py-20 border-2 border-black border-dashed bg-white dark:bg-black">
                    <span className="material-icons-round text-6xl mb-4 text-gray-400">folder_open</span>
                    <h2 className="text-2xl font-display font-black capitalize tracking-tight">Empty Folder</h2>
                    <p className="font-bold capitalize text-xs tracking-widest opacity-60 mt-2">Create a new folder or upload a note here.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item) => (
                        <div key={item.id} className="group relative bg-white dark:bg-black border-2 border-black p-6 shadow-brutal hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all flex flex-col">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`w-14 h-14 border-2 border-black flex items-center justify-center text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${item.color}`}>
                                    <span className="material-icons-round text-3xl">{item.icon}</span>
                                </div>
                                <button onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }} className="w-10 h-10 bg-white border-2 border-black flex items-center justify-center text-black hover:bg-accent-red hover:text-white transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                    <span className="material-icons-round text-sm">delete</span>
                                </button>
                            </div>

                            <h3 className="text-2xl font-display font-black capitalize mb-1 line-clamp-1">{item.name}</h3>
                            <p className="text-xs font-bold capitalize tracking-widest opacity-60 mb-6">{item.type === 'folder' ? 'Folder' : 'PDF Note'}</p>
                            {item.type === 'file' && (
                                <p className="text-sm font-black capitalize mb-4">
                                    Price: ₹{item.finalPrice ?? item.price ?? 499}
                                    {item.discount_enabled && item.discount_percent > 0 ? ` (${item.discount_percent}% off)` : ''}
                                </p>
                            )}

                            <button
                                onClick={() => {
                                    if (item.type === 'folder') {
                                        navigate(`/admin?folder=${item.id}`);
                                    } else if (item.url) {
                                        window.open(item.url, '_blank', 'noopener,noreferrer');
                                    }
                                }}
                                className="mt-auto w-full bg-black text-white border-2 border-black py-3 font-bold capitalize tracking-widest text-sm hover:bg-white hover:text-black transition-colors"
                            >
                                {item.type === 'folder' ? 'Open Folder' : 'View PDF'}
                            </button>
                            {item.type === 'file' && (
                                <button
                                    onClick={() => {
                                        setPriceEditItem(item);
                                        setPriceValue(String(item.price ?? 499));
                                        setDiscountEnabled(Boolean(item.discount_enabled));
                                        setDiscountPercent(String(item.discount_percent ?? 0));
                                        setIsPriceModalOpen(true);
                                    }}
                                    className="mt-3 w-full bg-accent-orange text-black border-2 border-black py-3 font-bold capitalize tracking-widest text-sm hover:bg-white transition-colors"
                                >
                                    Update Price
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {isFolderModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white dark:bg-black border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] max-w-md w-full animate-fade-in-up max-h-[90vh] overflow-y-auto">
                        <h2 className="text-3xl font-display font-black capitalize mb-4 text-black dark:text-white">Create New Folder</h2>
                        <form onSubmit={confirmCreateFolder}>
                            <div className="mb-6">
                                <label className="block text-xs font-bold capitalize tracking-widest mb-2 text-black dark:text-white">Folder Name</label>
                                <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="e.g. Class 5" className="w-full border-2 border-black p-4 text-black focus:outline-none focus:ring-4 focus:ring-accent-neon shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" autoFocus />
                            </div>
                            <div className="flex gap-4 justify-end pt-2">
                                <button type="button" onClick={() => setIsFolderModalOpen(false)} className="px-6 py-3 bg-gray-200 text-black border-2 border-black font-bold capitalize tracking-widest hover:bg-gray-300 transition-colors active:translate-y-1 active:translate-x-1">Cancel</button>
                                <button type="submit" className="px-6 py-3 bg-accent-neon text-black border-2 border-black font-bold capitalize tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-white transition-colors active:translate-y-1 active:translate-x-1 active:shadow-none">Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {isFileModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white dark:bg-black border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] max-w-md w-full animate-fade-in-up max-h-[90vh] overflow-y-auto">
                        <h2 className="text-3xl font-display font-black capitalize mb-4 text-black dark:text-white">Upload PDF Note</h2>
                        <form onSubmit={confirmUploadFile}>
                            <div className="mb-4">
                                <label className="block text-xs font-bold capitalize tracking-widest mb-2 text-black dark:text-white">Note Title</label>
                                <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="e.g. Grammar Basics" className="w-full border-2 border-black p-4 text-black focus:outline-none focus:ring-4 focus:ring-accent-blue shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" autoFocus />
                            </div>
                            <div className="mb-6">
                                <label className="block text-xs font-bold capitalize tracking-widest mb-2 text-black dark:text-white">PDF File</label>
                                <input type="file" accept="application/pdf" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} className="w-full border-2 border-black p-3 text-black bg-white" />
                            </div>
                            <div className="mb-6">
                                <label className="block text-xs font-bold capitalize tracking-widest mb-2 text-black dark:text-white">Price (INR)</label>
                                <input type="number" min="0" value={priceValue} onChange={(e) => setPriceValue(e.target.value)} className="w-full border-2 border-black p-4 text-black focus:outline-none focus:ring-4 focus:ring-accent-blue shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" />
                            </div>
                            <div className="mb-4 flex items-center gap-3">
                                <input id="uploadDiscountEnabled" type="checkbox" checked={discountEnabled} onChange={(e) => setDiscountEnabled(e.target.checked)} className="w-5 h-5" />
                                <label htmlFor="uploadDiscountEnabled" className="text-xs font-bold capitalize tracking-widest text-black dark:text-white">Give discount?</label>
                            </div>
                            {discountEnabled && (
                                <div className="mb-6">
                                    <label className="block text-xs font-bold capitalize tracking-widest mb-2 text-black dark:text-white">Discount Percent</label>
                                    <input type="number" min="0" max="100" value={discountPercent} onChange={(e) => setDiscountPercent(e.target.value)} className="w-full border-2 border-black p-4 text-black focus:outline-none focus:ring-4 focus:ring-accent-blue shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" />
                                </div>
                            )}
                            <div className="mb-6 p-3 border-2 border-black bg-gray-100">
                                <p className="text-xs font-bold capitalize tracking-widest">Final Price Preview</p>
                                <p className="text-lg font-black">₹{computeFinalPrice(priceValue, discountEnabled, discountPercent)}</p>
                            </div>
                            <div className="flex gap-4 justify-end pt-2">
                                <button type="button" onClick={() => setIsFileModalOpen(false)} className="px-6 py-3 bg-gray-200 text-black border-2 border-black font-bold capitalize tracking-widest hover:bg-gray-300 transition-colors active:translate-y-1 active:translate-x-1">Cancel</button>
                                <button type="submit" className="px-6 py-3 bg-accent-blue text-black border-2 border-black font-bold capitalize tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-white transition-colors active:translate-y-1 active:translate-x-1 active:shadow-none">Upload</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {isPriceModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white dark:bg-black border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] max-w-md w-full animate-fade-in-up">
                        <h2 className="text-3xl font-display font-black capitalize mb-4 text-black dark:text-white">Update Price</h2>
                        <form onSubmit={confirmUpdatePrice}>
                            <div className="mb-4">
                                <p className="text-xs font-bold capitalize tracking-widest mb-2 opacity-70">File</p>
                                <p className="font-black capitalize">{priceEditItem?.name}</p>
                            </div>
                            <div className="mb-6">
                                <label className="block text-xs font-bold capitalize tracking-widest mb-2 text-black dark:text-white">Price (INR)</label>
                                <input type="number" min="0" value={priceValue} onChange={(e) => setPriceValue(e.target.value)} className="w-full border-2 border-black p-4 text-black focus:outline-none focus:ring-4 focus:ring-accent-orange shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" />
                            </div>
                            <div className="mb-4 flex items-center gap-3">
                                <input id="editDiscountEnabled" type="checkbox" checked={discountEnabled} onChange={(e) => setDiscountEnabled(e.target.checked)} className="w-5 h-5" />
                                <label htmlFor="editDiscountEnabled" className="text-xs font-bold capitalize tracking-widest text-black dark:text-white">Give discount?</label>
                            </div>
                            {discountEnabled && (
                                <div className="mb-6">
                                    <label className="block text-xs font-bold capitalize tracking-widest mb-2 text-black dark:text-white">Discount Percent</label>
                                    <input type="number" min="0" max="100" value={discountPercent} onChange={(e) => setDiscountPercent(e.target.value)} className="w-full border-2 border-black p-4 text-black focus:outline-none focus:ring-4 focus:ring-accent-orange shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" />
                                </div>
                            )}
                            <div className="mb-6 p-3 border-2 border-black bg-gray-100">
                                <p className="text-xs font-bold capitalize tracking-widest">Final Price Preview</p>
                                <p className="text-lg font-black">₹{computeFinalPrice(priceValue, discountEnabled, discountPercent)}</p>
                            </div>
                            <div className="flex gap-4 justify-end pt-2">
                                <button type="button" onClick={() => setIsPriceModalOpen(false)} className="px-6 py-3 bg-gray-200 text-black border-2 border-black font-bold capitalize tracking-widest hover:bg-gray-300 transition-colors active:translate-y-1 active:translate-x-1">Cancel</button>
                                <button type="submit" className="px-6 py-3 bg-accent-orange text-black border-2 border-black font-bold capitalize tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-white transition-colors active:translate-y-1 active:translate-x-1 active:shadow-none">Save Price</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

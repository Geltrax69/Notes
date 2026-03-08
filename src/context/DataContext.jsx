import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const DataContext = createContext(null);
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';
const RECENT_FOLDERS_KEY = 'notesRecentFolders';
const USAGE_STATS_KEY = 'notesUsageStats';

async function parseApiResponse(response) {
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
        throw new Error(data.detail || 'API request failed');
    }
    return data;
}

const getAuthHeaders = () => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        return { 'Authorization': `Bearer ${token}` };
    }
    return {};
};

const readRecentFolders = () => {
    try {
        const raw = localStorage.getItem(RECENT_FOLDERS_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
};

const readUsageStats = () => {
    try {
        const raw = localStorage.getItem(USAGE_STATS_KEY);
        return raw ? JSON.parse(raw) : {};
    } catch {
        return {};
    }
};

const dayKey = (date = new Date()) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
};

export const DataProvider = ({ children }) => {
    const [items, setItems] = useState([]);
    const [user, setUser] = useState(null);
    const [userLoading, setUserLoading] = useState(true);
    const [recentFolders, setRecentFolders] = useState(() => readRecentFolders());
    const [usageStats, setUsageStats] = useState(() => readUsageStats());
    const [adminUser, setAdminUser] = useState(() => localStorage.getItem('adminUser') === 'true');
    const [loading, setLoading] = useState(false);

    const loadItems = useCallback(async (parentId = null) => {
        const query = parentId === null ? '' : `?parentId=${parentId}`;
        const response = await fetch(`${API_BASE}/items/${query}`);
        return parseApiResponse(response);
    }, []);

    const refreshRoot = useCallback(async () => {
        setLoading(true);
        try {
            const rootItems = await loadItems(null);
            setItems(rootItems);
        } finally {
            setLoading(false);
        }
    }, [loadItems]);

    const loadUser = useCallback(async () => {
        try {
            setUserLoading(true);
            const token = localStorage.getItem('accessToken');
            if (!token) {
                setUser(null);
                return;
            }
            const response = await fetch(`${API_BASE}/users/me/`, {
                headers: getAuthHeaders(),
            });
            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
            } else {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                setUser(null);
            }
        } catch (error) {
            console.error('Failed to load user', error);
        } finally {
            setUserLoading(false);
        }
    }, []);

    useEffect(() => {
        refreshRoot().catch((error) => {
            console.error('Failed to load root items', error);
            setItems([]);
        });
        loadUser();
    }, [refreshRoot, loadUser]);

    useEffect(() => {
        let sessionStart = Date.now();

        const flushUsage = () => {
            const now = Date.now();
            const seconds = Math.max(0, Math.floor((now - sessionStart) / 1000));
            if (!seconds) return;
            const key = dayKey(new Date());
            setUsageStats((prev) => {
                const next = { ...prev, [key]: (prev[key] || 0) + seconds };
                localStorage.setItem(USAGE_STATS_KEY, JSON.stringify(next));
                return next;
            });
            sessionStart = now;
        };

        const onVisibility = () => {
            if (document.visibilityState === 'hidden') flushUsage();
            if (document.visibilityState === 'visible') sessionStart = Date.now();
        };

        document.addEventListener('visibilitychange', onVisibility);
        window.addEventListener('beforeunload', flushUsage);
        const timer = setInterval(flushUsage, 30000);

        return () => {
            flushUsage();
            clearInterval(timer);
            document.removeEventListener('visibilitychange', onVisibility);
            window.removeEventListener('beforeunload', flushUsage);
        };
    }, []);

    const loginAdmin = (email, password) => {
        if (email === 'notes@lalit.com' && password === 'notes2113') {
            setAdminUser(true);
            localStorage.setItem('adminUser', 'true');
            return true;
        }
        return false;
    };

    const logoutAdmin = () => {
        setAdminUser(false);
        localStorage.removeItem('adminUser');
    };

    const loginWithGoogle = async (credential) => {
        const response = await fetch(`${API_BASE}/auth/google/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: credential })
        });
        const data = await parseApiResponse(response);
        localStorage.setItem('accessToken', data.access);
        localStorage.setItem('refreshToken', data.refresh);
        setUser(data.user);
        return data.user;
    };

    const loginWithEmail = async ({ email, password, name = '' }) => {
        const response = await fetch(`${API_BASE}/auth/manual/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, name }),
        });
        const data = await parseApiResponse(response);
        localStorage.setItem('accessToken', data.access);
        localStorage.setItem('refreshToken', data.refresh);
        setUser(data.user);
        return data.user;
    };

    const logoutUser = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setUser(null);
    };

    const updateProfile = async (formData) => {
        const response = await fetch(`${API_BASE}/users/me/`, {
            method: 'PUT',
            headers: getAuthHeaders(), // Note: Do not set Content-Type to application/json if using FormData
            body: formData
        });
        const data = await parseApiResponse(response);
        setUser(data);
        return data;
    };

    const createFolder = async (name, parentId = null) => {
        const response = await fetch(`${API_BASE}/folders/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
            body: JSON.stringify({ name, parentId })
        });
        const created = await parseApiResponse(response);
        return created;
    };

    const uploadFile = async (
        name,
        parentId,
        file,
        price = 499,
        discountEnabled = false,
        discountPercent = 0,
        onProgress = null
    ) => {
        const form = new FormData();
        form.append('name', name);
        if (parentId !== null && parentId !== undefined) {
            form.append('parentId', parentId);
        }
        form.append('file', file);
        form.append('price', String(price));
        form.append('discountEnabled', String(discountEnabled));
        form.append('discountPercent', String(discountPercent));

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', `${API_BASE}/files/`);

            const authHeaders = getAuthHeaders();
            if (authHeaders.Authorization) {
                xhr.setRequestHeader('Authorization', authHeaders.Authorization);
            }

            if (typeof onProgress === 'function') {
                xhr.upload.onprogress = (event) => {
                    if (!event.lengthComputable) return;
                    const percent = Math.min(100, Math.round((event.loaded / event.total) * 100));
                    onProgress(percent);
                };
            }

            xhr.onload = async () => {
                const responseLike = {
                    ok: xhr.status >= 200 && xhr.status < 300,
                    json: async () => {
                        try {
                            return xhr.responseText ? JSON.parse(xhr.responseText) : {};
                        } catch {
                            return {};
                        }
                    },
                };
                try {
                    const data = await parseApiResponse(responseLike);
                    resolve(data);
                } catch (error) {
                    reject(error);
                }
            };

            xhr.onerror = () => reject(new Error('Upload failed. Please check your network and try again.'));
            xhr.send(form);
        });
    };

    const deleteItem = async (id) => {
        const response = await fetch(`${API_BASE}/items/${id}/delete/`, {
            method: 'DELETE',
            headers: getAuthHeaders(),
        });
        if (!response.ok) {
            const data = await response.json().catch(() => ({}));
            throw new Error(data.detail || 'Delete failed');
        }
        return true;
    };

    const updateFilePrice = async (id, price, discountEnabled = false, discountPercent = 0) => {
        const response = await fetch(`${API_BASE}/files/${id}/price/`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
            body: JSON.stringify({ price, discountEnabled, discountPercent }),
        });
        return parseApiResponse(response);
    };

    const getItemsByParent = async (parentId) => {
        return loadItems(parentId ?? null);
    };

    const getItemById = async (id) => {
        const response = await fetch(`${API_BASE}/items/${id}/`);
        return parseApiResponse(response);
    };

    const getMyPurchases = async () => {
        const response = await fetch(`${API_BASE}/purchases/`, {
            headers: getAuthHeaders(),
        });
        return parseApiResponse(response);
    };

    const getPaymentConfig = async () => {
        const response = await fetch(`${API_BASE}/payments/config/`);
        return parseApiResponse(response);
    };

    const createPaymentOrder = async (itemId) => {
        const response = await fetch(`${API_BASE}/payments/order/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
            body: JSON.stringify({ itemId }),
        });
        return parseApiResponse(response);
    };

    const verifyPayment = async (payload) => {
        const response = await fetch(`${API_BASE}/payments/verify/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
            body: JSON.stringify(payload),
        });
        return parseApiResponse(response);
    };

    const searchItems = async (query) => {
        const q = String(query || '').trim();
        if (q.length < 2) return [];
        const response = await fetch(`${API_BASE}/search/?q=${encodeURIComponent(q)}`);
        return parseApiResponse(response);
    };

    const trackRecentFolder = (folder) => {
        if (!folder || folder.type !== 'folder') return;
        const entry = {
            id: folder.id,
            name: folder.name,
            color: folder.color || 'bg-accent-blue',
            icon: folder.icon || 'folder',
            parentId: folder.parentId ?? null,
            viewedAt: Date.now(),
        };
        setRecentFolders((prev) => {
            const next = [entry, ...prev.filter((f) => String(f.id) !== String(entry.id))].slice(0, 6);
            localStorage.setItem(RECENT_FOLDERS_KEY, JSON.stringify(next));
            return next;
        });
    };

    const value = {
        items,
        user,
        userLoading,
        loading,
        adminUser,
        loginAdmin,
        logoutAdmin,
        loginWithGoogle,
        loginWithEmail,
        logoutUser,
        updateProfile,
        createFolder,
        uploadFile,
        updateFilePrice,
        deleteItem,
        getItemsByParent,
        getItemById,
        getMyPurchases,
        getPaymentConfig,
        createPaymentOrder,
        verifyPayment,
        searchItems,
        recentFolders,
        usageStats,
        trackRecentFolder,
        refreshRoot,
    };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};

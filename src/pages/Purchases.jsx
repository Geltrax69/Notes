import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';

export default function Purchases() {
    const navigate = useNavigate();
    const { getMyPurchases } = useData();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                setLoading(true);
                const data = await getMyPurchases();
                if (alive) setItems(data || []);
            } catch (error) {
                console.error('Failed to load purchases', error);
                if (alive) setItems([]);
            } finally {
                if (alive) setLoading(false);
            }
        })();

        return () => {
            alive = false;
        };
    }, [getMyPurchases]);

    if (loading) {
        return <div className="font-mono font-bold uppercase tracking-widest">Loading Purchases...</div>;
    }

    if (!items.length) {
        return (
            <div className="border-4 border-black bg-white p-8 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] max-w-xl">
                <h2 className="font-display text-3xl font-black uppercase">My Purchases</h2>
                <p className="font-mono font-bold tracking-wider text-sm mt-4 uppercase text-black/70">No purchased PDFs yet.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h1 className="font-display text-4xl font-black uppercase tracking-tight">My Purchases</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {items.map((item) => (
                    <div key={item.id} className="border-4 border-black bg-white p-5 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <p className="font-display text-2xl font-black uppercase leading-none">{item.name}</p>
                                <p className="font-mono font-bold text-xs tracking-wider uppercase text-black/60 mt-2">Purchased PDF</p>
                            </div>
                            <span className="material-icons-round text-3xl">picture_as_pdf</span>
                        </div>
                        <div className="mt-4 space-y-1.5 border-2 border-black/20 p-3 bg-gray-50">
                            <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-black/80">
                                Class: <span className="text-black">{item.className || 'N/A'}</span>
                            </p>
                            <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-black/80">
                                Subject: <span className="text-black">{item.subjectName || 'N/A'}</span>
                            </p>
                            <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-black/70">
                                Path: {item.path || item.name}
                            </p>
                            <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-black/70">
                                Paid: Rs {item.purchaseAmount || item.finalPrice || item.price || 0}
                            </p>
                        </div>
                        <button
                            onClick={() => navigate(`/pdf?file=${item.id}`)}
                            className="mt-5 w-full py-3 border-2 border-black bg-accent-neon font-display font-black uppercase tracking-widest shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:-translate-x-0.5 transition-all"
                        >
                            Open PDF
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

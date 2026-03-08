import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function Pdf() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { getItemById, getMyPurchases, createPaymentOrder, verifyPayment } = useData();
    const [numPages, setNumPages] = useState();
    const [fileItem, setFileItem] = useState(null);
    const [isPurchased, setIsPurchased] = useState(false);
    const [processingPayment, setProcessingPayment] = useState(false);
    const [viewMode, setViewMode] = useState('single');

    const fileId = searchParams.get('file');

    useEffect(() => {
        let ignore = false;

        const loadFile = async () => {
            if (!fileId) {
                setFileItem(null);
                return;
            }
            try {
                const data = await getItemById(fileId);
                const purchased = await getMyPurchases();
                if (!ignore) {
                    setFileItem(data);
                    setIsPurchased((purchased || []).some((p) => String(p.id) === String(fileId)));
                }
            } catch (error) {
                console.error('Failed to load file details', error);
                if (!ignore) {
                    setFileItem(null);
                    setIsPurchased(false);
                }
            }
        };

        loadFile();
        return () => {
            ignore = true;
        };
    }, [fileId, getItemById, getMyPurchases]);

    const title = fileItem ? fileItem.name : 'Document';
    const fileUrl = fileItem ? fileItem.url : '/notescheck.pdf';
    const originalPrice = fileItem?.price ?? 499;
    const discountEnabled = Boolean(fileItem?.discount_enabled);
    const discountPercent = Number(fileItem?.discount_percent ?? 0);
    const finalPrice = Number(fileItem?.finalPrice ?? originalPrice);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    const previewPagesCount = isPurchased ? (numPages || 3) : Math.min(3, numPages || 3);
    const pagesToRender = Array.from(new Array(previewPagesCount), (el, index) => index + 1);

    const loadRazorpayScript = () => new Promise((resolve) => {
        if (window.Razorpay) {
            resolve(true);
            return;
        }
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });

    const handleUnlock = async () => {
        if (!fileItem || processingPayment) return;
        setProcessingPayment(true);
        try {
            const scriptLoaded = await loadRazorpayScript();
            if (!scriptLoaded) {
                alert('Failed to load Razorpay checkout.');
                return;
            }

            const order = await createPaymentOrder(fileItem.id);
            if (order.alreadyPurchased) {
                setIsPurchased(true);
                return;
            }

            const razorpay = new window.Razorpay({
                key: order.key_id,
                amount: order.amount,
                currency: order.currency,
                name: 'Notes App',
                description: `Unlock ${order.itemName}`,
                order_id: order.order_id,
                handler: async (response) => {
                    await verifyPayment({
                        itemId: fileItem.id,
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                    });
                    setIsPurchased(true);
                },
                prefill: {},
                theme: { color: '#000000' },
                modal: {
                    ondismiss: () => setProcessingPayment(false),
                },
            });
            razorpay.open();
        } catch (error) {
            console.error('Payment failed', error);
            alert(error.message || 'Payment failed. Please try again.');
        } finally {
            setProcessingPayment(false);
        }
    };

    if (!fileItem) {
        return (
            <div className="animate-fade-in-up h-screen w-full flex flex-col items-center justify-center bg-white dark:bg-black">
                <div className="text-center py-20 px-10 border-4 border-black bg-white shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
                    <span className="material-icons-round text-6xl mb-4 text-accent-red">error_outline</span>
                    <h2 className="text-2xl font-display font-black tracking-tight text-black capitalize">File Not Found</h2>
                    <p className="font-bold text-xs tracking-widest opacity-60 mt-2 mb-8 capitalize">The requested document does not exist.</p>
                    <button onClick={() => navigate(-1)} className="px-8 py-4 bg-black text-white border-2 border-black font-bold tracking-widest hover:bg-white hover:text-black transition-colors shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:translate-x-1 active:shadow-none capitalize">
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-full flex flex-col animate-fade-in-up">
            {/* PDF Header */}
            <div className="flex justify-between items-start mb-12 pb-6 border-b-4 border-black dark:border-white">
                <div className="flex items-start gap-4 md:gap-6">
                    <button onClick={() => navigate(-1)} className="w-12 h-12 md:w-14 md:h-14 bg-white dark:bg-black border-2 border-black dark:border-white flex items-center justify-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] active:shadow-none active:translate-y-1 active:translate-x-1 shrink-0"><span className="material-icons-round">arrow_back</span></button>
                    <div className="pt-1">
                        <h1 className="text-2xl md:text-3xl font-display font-black leading-none mb-2 md:mb-3 capitalize tracking-tight text-black dark:text-white">{title}</h1>
                        <div className="flex flex-wrap items-center gap-2 md:gap-3 text-[10px] md:text-xs font-bold tracking-widest text-black/60 dark:text-white/60">
                            <span className="border-2 border-black dark:border-white px-2 py-0.5 bg-white dark:bg-black text-black dark:text-white font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] capitalize">PDF</span>
                            <span>•</span>
                            <span className="capitalize">{numPages ? `${numPages} Pages` : 'Loading...'}</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <select
                        value={viewMode}
                        onChange={(e) => setViewMode(e.target.value)}
                        className="h-12 md:h-14 px-3 bg-white dark:bg-black border-2 border-black dark:border-white font-mono font-bold uppercase text-xs tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
                        title="Page View"
                    >
                        <option value="single">Single Page</option>
                        <option value="double">Two Pages</option>
                    </select>
                    <a href={fileUrl} target="_blank" rel="noreferrer" className="w-12 h-12 md:w-14 md:h-14 bg-white dark:bg-black border-2 border-black dark:border-white flex items-center justify-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] active:shadow-none active:translate-y-1 active:translate-x-1 shrink-0">
                        <span className="material-icons-round text-xl">file_download</span>
                    </a>
                </div>
            </div>

            {/* PDF Render Container */}
            <div className="w-full flex flex-col items-center gap-10 pb-20" onContextMenu={(e) => e.preventDefault()}>
                <Document
                    file={fileUrl}
                    onLoadSuccess={onDocumentLoadSuccess}
                    className={`w-full select-none ${viewMode === 'double' ? 'flex flex-wrap gap-6 justify-center items-start' : 'flex flex-col gap-10 items-center'}`}
                >
                    {pagesToRender.map((pageNumber) => (
                        <div
                            key={`page_${pageNumber}`}
                            className={`bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,255,255,0.2)] relative overflow-hidden transition-all duration-300 min-h-[600px] ${
                                viewMode === 'double' ? 'w-full xl:w-[calc(50%-1rem)] max-w-[950px]' : 'w-full max-w-2xl'
                            }`}
                        >
                            <div className={pageNumber === previewPagesCount && numPages > 3 && !isPurchased ? 'filter blur-[8px] opacity-30 pointer-events-none transition-all' : ''}>
                                <Page pageNumber={pageNumber} className="w-full flex justify-center pdf-page-container" renderTextLayer={false} renderAnnotationLayer={false} width={800} />
                            </div>

                            {/* Page Number Badge */}
                            <div className="absolute top-0 right-0 w-12 h-12 md:w-14 md:h-14 border-l-4 border-b-4 border-black bg-accent-orange flex items-center justify-center z-20 shadow-[-4px_4px_0px_0px_rgba(0,0,0,1)]">
                                <span className="font-display font-black text-xl md:text-2xl text-black">{pageNumber}</span>
                            </div>

                            {/* Paywall Overlay */}
                            {pageNumber === previewPagesCount && numPages > 3 && !isPurchased && (
                                <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-4 pointer-events-none">
                                    <div className="bg-white border-4 border-black p-8 md:p-12 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center text-center max-w-[90%] md:max-w-md w-full relative overflow-hidden pointer-events-auto backdrop-blur-xl bg-white/95 transition-transform hover:-translate-y-1">

                                        {/* Decorative BG Icon */}
                                        <div className="absolute -top-12 -right-12 p-6 opacity-[0.03] transform -rotate-12 scale-150 pointer-events-none">
                                            <span className="material-icons-round text-[16rem] text-black">lock</span>
                                        </div>

                                        {/* Green Lock Icon exactly like styling */}
                                        <div className="w-20 h-20 md:w-24 md:h-24 bg-accent-green border-4 border-black text-black flex items-center justify-center mb-6 md:mb-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform -rotate-3 hover:rotate-2 transition-transform cursor-pointer">
                                            <span className="material-icons-round text-5xl md:text-6xl">lock</span>
                                        </div>

                                        <h3 className="text-3xl md:text-4xl font-display font-black text-black capitalize mb-4 leading-none tracking-tight">Unlock Premium Content</h3>
                                        <p className="text-black font-bold tracking-widest text-xs capitalize mb-8 max-w-sm mx-auto opacity-70">
                                            Get instant access to all {numPages} pages, high-resolution diagrams, and practice questions.
                                        </p>

                                        {/* Price Box */}
                                        <div className="bg-accent-orange border-4 border-black w-full p-5 md:p-6 mb-8 flex items-center justify-between shadow-[inset_4px_4px_0px_0px_rgba(0,0,0,0.1)] relative">
                                            <div className="flex flex-col text-left text-black">
                                                <span className="text-[10px] md:text-xs capitalize font-black tracking-widest mb-1 border-b-2 border-black/20 inline-block pb-1">Total Price</span>
                                                <div className="flex items-baseline gap-2 md:gap-3 mt-1">
                                                    <span className="text-4xl md:text-5xl font-display font-black tracking-tighter">₹{finalPrice}</span>
                                                    {discountEnabled && discountPercent > 0 && (
                                                        <span className="text-lg md:text-xl font-bold line-through opacity-70">₹{originalPrice}</span>
                                                    )}
                                                </div>
                                            </div>
                                            {/* Discount Tag */}
                                            {discountEnabled && discountPercent > 0 && (
                                                <div className="absolute -right-4 top-1/2 -translate-y-1/2 bg-black text-white text-xs md:text-sm px-4 py-3 font-black capitalize tracking-widest border-2 border-white shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] transform rotate-[10deg] hover:rotate-[15deg] transition-transform">
                                                    {discountPercent}% OFF
                                                </div>
                                            )}
                                        </div>

                                        {/* Pay Button */}
                                        <button onClick={handleUnlock} disabled={processingPayment} className={`w-full bg-accent-green text-black hover:bg-black hover:text-white border-4 border-black font-black capitalize tracking-widest py-5 px-6 transition-colors flex items-center justify-center gap-3 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-y-2 active:translate-x-2 active:shadow-none mb-6 group text-lg md:text-xl z-10 ${processingPayment ? 'opacity-70 cursor-wait' : ''}`}>
                                            <span className="material-icons-round text-2xl md:text-3xl group-hover:animate-bounce">lock_open</span>
                                            {processingPayment ? 'Processing...' : 'Pay & Unlock PDF'}
                                        </button>

                                        {/* Secure Payment Note */}
                                        <div className="flex items-center justify-center gap-2 text-[10px] font-black tracking-widest capitalize text-black/60 pt-2 border-t-2 border-dashed border-black/20 w-full mt-2">
                                            <span className="material-icons-round text-sm">verified_user</span>
                                            Secure payment via UPI, Cards, or NetBanking
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </Document>
            </div>

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

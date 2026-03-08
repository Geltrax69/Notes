import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';

export default function SetupProfile() {
    const navigate = useNavigate();
    const { user, userLoading, updateProfile } = useData();
    const [selectedClass, setSelectedClass] = useState('');
    const [photo, setPhoto] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [avatarLoadFailed, setAvatarLoadFailed] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const classOptions = [
        { value: 'Nursery', icon: 'child_care' },
        { value: 'LKG', icon: 'toys' },
        { value: 'UKG', icon: 'auto_stories' },
        { value: 'Class 1', icon: 'looks_one' },
        { value: 'Class 2', icon: 'looks_two' },
        { value: 'Class 3', icon: 'looks_3' },
        { value: 'Class 4', icon: 'filter_4' },
        { value: 'Class 5', icon: 'filter_5' },
        { value: 'Class 6', icon: 'filter_6' },
        { value: 'Class 7', icon: 'filter_7' },
        { value: 'Class 8', icon: 'filter_8' },
        { value: 'Class 9', icon: 'filter_9' },
        { value: 'Class 10', icon: 'calculate' },
        { value: 'Class 11', icon: 'science' },
        { value: 'Class 12', icon: 'emoji_events' },
        { value: 'University', icon: 'school' },
        { value: 'Other', icon: 'category' },
    ];

    useEffect(() => {
        if (!userLoading && !user) {
            navigate('/login', { replace: true });
        } else if (!userLoading && user?.student_class) {
            navigate('/home', { replace: true });
        }
    }, [user, userLoading, navigate]);

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhoto(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.submitter?.blur();
        e.preventDefault();

        if (!selectedClass) {
            alert('Please select your class.');
            return;
        }

        setIsSaving(true);
        try {
            const formData = new FormData();
            formData.append('student_class', selectedClass);
            if (photo) {
                formData.append('profile_photo', photo);
            }

            await updateProfile(formData);
            navigate('/home', { replace: true });
        } catch (error) {
            console.error('Failed to update profile', error);
            alert('Failed to save profile. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    if (userLoading || !user) {
        return (
            <div className="min-h-screen bg-bg-light dark:bg-bg-dark flex items-center justify-center">
                <p className="font-mono font-bold uppercase tracking-widest text-black dark:text-white animate-pulse">Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-bg-light dark:bg-bg-dark flex flex-col items-center justify-center p-4">
            <div className="max-w-lg w-full bg-white dark:bg-black p-8 border-4 border-black dark:border-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)]">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-display font-black tracking-tight text-black dark:text-white uppercase relative inline-block">
                        Complete Your Profile
                        <span className="absolute -bottom-2 left-0 w-full h-2 bg-accent-yellow -z-10"></span>
                    </h1>
                    <p className="font-mono font-bold tracking-widest mt-4 uppercase text-sm text-black/70 dark:text-white/70">Just a few more details to get started</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex flex-col items-center mb-6">
                        <div className="relative w-32 h-32 mb-4 group cursor-pointer border-4 border-black dark:border-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-gray-200 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                            {previewUrl ? (
                                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-110 transition-transform duration-300" />
                            ) : user.picture && !avatarLoadFailed ? (
                                <img
                                    src={user.picture}
                                    alt="Google Avatar"
                                    onError={() => setAvatarLoadFailed(true)}
                                    className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-110 transition-transform duration-300"
                                />
                            ) : (
                                <span className="material-icons-round text-6xl text-gray-400 group-hover:text-black transition-colors">person</span>
                            )}

                            <label className="absolute inset-0 bg-black/50 text-white flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                <span className="material-icons-round text-3xl mb-1">upload_file</span>
                                <span className="font-mono text-xs font-bold">UPLOAD IMAGE</span>
                                <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                            </label>
                        </div>
                        <p className="font-mono text-xs font-bold uppercase text-black/50 dark:text-white/50">Upload Profile Photo (Optional)</p>
                    </div>

                    <div className="space-y-3">
                        <label className="block font-mono font-bold text-black dark:text-white uppercase tracking-widest text-sm">Select Your Class</label>
                        <div className="grid grid-cols-2 gap-2.5 max-h-80 overflow-y-auto pr-1">
                            {classOptions.map((opt) => {
                                const active = selectedClass === opt.value;
                                return (
                                    <button
                                        key={opt.value}
                                        type="button"
                                        onClick={() => setSelectedClass(opt.value)}
                                        className={`border-2 border-black px-3 py-2.5 text-left flex items-center gap-2 transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] ${
                                            active
                                                ? 'bg-black text-white -translate-y-0.5 -translate-x-0.5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]'
                                                : 'bg-white text-black hover:bg-gray-100'
                                        }`}
                                    >
                                        <span className={`material-icons-round text-lg ${active ? 'text-white' : 'text-black/70'}`}>{opt.icon}</span>
                                        <span className="font-display font-black uppercase text-sm">{opt.value}</span>
                                    </button>
                                );
                            })}
                        </div>
                        {selectedClass && (
                            <p className="font-mono text-xs font-bold uppercase tracking-widest text-black/70 dark:text-white/70">
                                Selected: {selectedClass}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSaving}
                        className={`w-full py-4 bg-accent-neon dark:bg-accent-neon text-black font-display font-black tracking-widest uppercase border-2 border-black dark:border-current shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[10px_10px_0px_0px_rgba(255,255,255,1)] transition-all duration-300 active:translate-y-1 active:translate-x-1 active:shadow-none flex items-center justify-center gap-2 ${isSaving ? 'opacity-70 cursor-wait' : ''}`}
                    >
                        {isSaving ? (
                            <>
                                <span className="material-icons-round animate-spin">refresh</span>
                                SAVING...
                            </>
                        ) : (
                            <>
                                CONTINUE
                                <span className="material-icons-round">arrow_forward</span>
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}

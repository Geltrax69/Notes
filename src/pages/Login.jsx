import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useData } from '../context/DataContext';

export default function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const { loginWithGoogle, loginWithEmail, updateProfile, user, userLoading } = useData();
    const [mode, setMode] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [studentClass, setStudentClass] = useState('');
    const [photo, setPhoto] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // If user is already logged in, redirect them
    useEffect(() => {
        if (!userLoading && user) {
            const dest = location.state?.from || '/home';
            navigate(dest, { replace: true });
        }
    }, [user, userLoading, navigate, location]);

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const userData = await loginWithGoogle(credentialResponse.credential);
            navigate('/home', { replace: true });
        } catch (error) {
            console.error('Login Failed', error);
            alert('Failed to login with Google.');
        }
    };

    const handleManualSubmit = async (e) => {
        e.preventDefault();
        if (!email.trim() || !password.trim() || (mode === 'signup' && !name.trim())) {
            alert(mode === 'signup' ? 'Name, email and password are required.' : 'Email and password are required.');
            return;
        }
        if (mode === 'signup' && !studentClass) {
            alert('Please select your class.');
            return;
        }

        setIsSubmitting(true);
        try {
            await loginWithEmail({
                email: email.trim(),
                password,
                name: name.trim(),
            });
            if (mode === 'signup') {
                const formData = new FormData();
                formData.append('student_class', studentClass);
                if (photo) formData.append('profile_photo', photo);
                await updateProfile(formData);
            }
            navigate('/home', { replace: true });
        } catch (error) {
            console.error('Manual login failed', error);
            alert(error.message || (mode === 'signup' ? 'Unable to sign up.' : 'Unable to log in.'));
        } finally {
            setIsSubmitting(false);
        }
    };

    if (userLoading) {
        return (
            <div className="min-h-screen bg-bg-light dark:bg-bg-dark flex items-center justify-center">
                <p className="font-mono font-bold uppercase tracking-widest text-black dark:text-white animate-pulse">Loading Account...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-bg-light dark:bg-bg-dark flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full bg-white dark:bg-black p-8 border-4 border-black dark:border-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)]">
                <div className="text-center mb-8">
                    <div className="inline-flex w-20 h-20 items-center justify-center bg-accent-neon border-4 border-black dark:border-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] mb-6 transform -rotate-12">
                        <span className="material-icons-round text-5xl text-black">auto_stories</span>
                    </div>
                    <h1 className="text-4xl font-display font-black tracking-tight text-black dark:text-white uppercase">Notes<span className="text-accent-red">.io</span></h1>
                    <p className="font-mono font-bold tracking-widest mt-2 uppercase text-sm text-black/70 dark:text-white/70">
                        {mode === 'signup' ? 'Create your account' : 'Welcome back, student'}
                    </p>
                </div>

                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-2">
                        <button
                            type="button"
                            onClick={() => setMode('login')}
                            className={`py-2 border-2 border-black font-mono font-bold text-xs tracking-wider ${mode === 'login' ? 'bg-black text-white' : 'bg-white text-black'}`}
                        >
                            Log in
                        </button>
                        <button
                            type="button"
                            onClick={() => setMode('signup')}
                            className={`py-2 border-2 border-black font-mono font-bold text-xs tracking-wider ${mode === 'signup' ? 'bg-black text-white' : 'bg-white text-black'}`}
                        >
                            Sign up
                        </button>
                    </div>

                    <form onSubmit={handleManualSubmit} className="space-y-3">
                        {mode === 'signup' && (
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Name"
                                className="w-full border-2 border-black px-4 py-3 font-mono font-bold tracking-wide text-sm bg-white text-black"
                                required
                            />
                        )}
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className="w-full border-2 border-black px-4 py-3 font-mono font-bold tracking-wide text-sm bg-white text-black"
                            required
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="w-full border-2 border-black px-4 py-3 font-mono font-bold tracking-wide text-sm bg-white text-black"
                            required
                        />
                        {mode === 'signup' && (
                            <>
                                <select
                                    value={studentClass}
                                    onChange={(e) => setStudentClass(e.target.value)}
                                    className="w-full border-2 border-black px-4 py-3 font-mono font-bold tracking-wide text-sm bg-white text-black"
                                    required
                                >
                                    <option value="">Select class</option>
                                    <option>Nursery</option>
                                    <option>LKG</option>
                                    <option>UKG</option>
                                    <option>Class 1</option>
                                    <option>Class 2</option>
                                    <option>Class 3</option>
                                    <option>Class 4</option>
                                    <option>Class 5</option>
                                    <option>Class 6</option>
                                    <option>Class 7</option>
                                    <option>Class 8</option>
                                    <option>Class 9</option>
                                    <option>Class 10</option>
                                    <option>Class 11</option>
                                    <option>Class 12</option>
                                    <option>University</option>
                                    <option>Other</option>
                                </select>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setPhoto(e.target.files?.[0] || null)}
                                    className="w-full border-2 border-black px-3 py-2 font-mono text-xs bg-white text-black"
                                />
                            </>
                        )}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-3 bg-accent-neon text-black font-display font-black tracking-widest uppercase border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 ${isSubmitting ? 'opacity-70 cursor-wait' : 'hover:-translate-y-0.5 hover:-translate-x-0.5'}`}
                        >
                            {isSubmitting ? 'Please wait...' : mode === 'signup' ? 'Create account' : 'Log in'}
                        </button>
                    </form>

                    <div className="flex items-center gap-3">
                        <div className="h-[2px] bg-black/20 flex-1" />
                        <span className="font-mono text-xs font-bold uppercase tracking-widest text-black/60">OR</span>
                        <div className="h-[2px] bg-black/20 flex-1" />
                    </div>

                    <div className="space-y-2">
                        {mode === 'signup' && (
                            <p className="text-center font-mono text-[11px] font-bold uppercase tracking-wider text-black/60">
                                Sign up instantly with Google
                            </p>
                        )}
                        <div className="flex justify-center w-full">
                            <GoogleLogin
                                onSuccess={handleGoogleSuccess}
                                onError={() => {
                                    console.error('Google Login Failed');
                                    alert('Failed to connect to Google.');
                                }}
                                theme="filled_black"
                                shape="rectangular"
                                size="large"
                                text="continue_with"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

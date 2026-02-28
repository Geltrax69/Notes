export const userProfile = {
    name: "Annette Black",
    class: "12",
    stream: "Science",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB4qAEVm-5GkG16_gxuXYuDx0hryS8SwKoUcj5dRErJp23PciAaPqAszEfReo1n0OvsmfXy22dZ0cSeYonblHlszBy1gTMGCcbqDSOOcT6cMQZJWnq3W52IkFQJFVS2d2LuNbjG3fJ7pXoQS_67_YZx4Q0MtSkn5KjRY6gRl7tMZurQjI8BcSn9PwxnDHjTVa71dhN0dgZkFMBhPtCd_bZrdSCTNQOeXASJ9Ehb369p9kkIV_AYaBQd11ZPh3eERaBH3-On2qsyeP_6",
    plan: "Pro",
    joined: "Aug 2025",
    stats: {
        totalNotes: 142,
        studyHours: "14.5",
        streak: 12
    },
    courses: [
        { name: "Mathematics", subject: "Calculus II", progress: 85, color: "bg-accent-neon", icon: "functions" },
        { name: "Physics", subject: "Thermodynamics", progress: 40, color: "bg-accent-blue", icon: "science", textWhite: true },
        { name: "Chemistry", subject: "Organic Chemistry", progress: 65, color: "bg-accent-orange", icon: "biotech" }
    ]
};

export const applicationSettings = {
    notifications: {
        email: true,
        push: true,
        newNotes: true,
        reminders: false
    },
    display: {
        theme: "system",
        reduceMotion: false,
        highContrast: true
    },
    privacy: {
        publicProfile: false,
        showActivity: true
    }
};

export const featuredClasses = [
    { id: "10", name: "Class 10", description: "Board Exam Prep", subjects: 6, notes: 342, members: "12k", color: "bg-accent-neon", icon: "school" },
    { id: "11", name: "Class 11", description: "Science & Commerce", subjects: 8, notes: 521, members: "8.5k", color: "bg-accent-blue", icon: "science" },
    { id: "12", name: "Class 12", description: "Advanced Subjects", subjects: 8, notes: 684, members: "15k", color: "bg-accent-orange", icon: "menu_book" },
];

export const subjectsData = [
    { id: "s1", name: "Physics", description: "Mechanics, Thermodynamics, and Electromagnetism concepts.", chapters: 24, notes: 156, rating: 4.8, color: "bg-accent-pink", icon: "bolt", classes: ["11", "12"], streams: ["science"] },
    { id: "s2", name: "Chemistry", description: "Organic, Inorganic, and Physical Chemistry detailed notes.", chapters: 20, notes: 142, rating: 4.9, color: "bg-accent-orange", icon: "science", classes: ["11", "12"], streams: ["science"] },
    { id: "s3", name: "Mathematics", description: "Calculus, Algebra, and Trigonometry problem sets.", chapters: 18, notes: 210, rating: 5.0, color: "bg-accent-purple", icon: "functions", classes: ["10", "11", "12"], streams: ["science", "commerce"] },
    { id: "s4", name: "English Grammar", description: "Mastering syntax, vocabulary, and composition skills.", chapters: 12, notes: 98, rating: 4.7, color: "bg-accent-green", icon: "menu_book", classes: ["10", "11", "12"], streams: ["science", "commerce", "arts"] },
    { id: "s5", name: "Biology", description: "Zoology and Botany comprehensive study materials.", chapters: 22, notes: 175, rating: 4.8, color: "bg-accent-blue", icon: "biotech", classes: ["11", "12"], streams: ["science"] },
    { id: "cs", name: "Computer Science", description: "Learn Python, Java & Web Dev.", chapters: 15, notes: 120, rating: 4.7, color: "bg-accent-green", icon: "computer", classes: ["11", "12"], streams: ["science", "commerce"] },
    { id: "economics", name: "Economics", description: "Micro & Macro fundamentals.", chapters: 10, notes: 85, rating: 4.6, color: "bg-accent-blue", icon: "analytics", classes: ["11", "12"], streams: ["commerce", "arts"] }
];

export const topicsData = [
    // English Grammar Topics
    { id: "t1", subjectId: "s4", title: "Parts of Speech", description: "Detailed notes on Nouns, Verbs, Adjectives, Adverbs and more.", type: "Fundamental", price: 20, rating: 4.8, students: "+2k", color: "bg-accent-pink", icon: "category" },
    { id: "t2", subjectId: "s4", title: "Tenses Masterclass", description: "Complete guide to all 12 tenses with timeline diagrams.", type: "Fundamental", price: 35, rating: 4.9, preview: true, color: "bg-accent-orange", icon: "schedule" },
    { id: "t3", subjectId: "s4", title: "Active & Passive Voice", description: "Rules for conversion with emphasis on academic writing.", type: "Advanced", price: 25, rating: 5.0, preview: true, color: "bg-accent-purple", icon: "record_voice_over" },
    { id: "t4", subjectId: "s4", title: "Direct & Indirect Speech", description: "Understanding narration changes for reporting.", type: "Advanced", price: 22, students: "+850", isBestValue: true, color: "bg-accent-green", icon: "format_quote" },

    // Physics Topics
    { id: "t5", subjectId: "s1", title: "Kinematics", description: "Motion in one and two dimensions with practice problems.", type: "Fundamental", price: 30, rating: 4.7, students: "+1k", color: "bg-accent-blue", icon: "speed" },
    { id: "t6", subjectId: "s1", title: "Thermodynamics", description: "Laws of thermodynamics and heat transfer.", type: "Advanced", price: 40, rating: 4.9, preview: true, color: "bg-accent-orange", icon: "thermostat" },

    // Math Topics
    { id: "t7", subjectId: "s3", title: "Calculus I", description: "Limits, derivatives, and applications.", type: "Fundamental", price: 40, rating: 5.0, students: "+3k", color: "bg-accent-purple", icon: "functions" },
    { id: "t8", subjectId: "s3", title: "Linear Algebra", description: "Matrices, vectors, and linear transformations.", type: "Advanced", price: 35, rating: 4.8, isBestValue: true, color: "bg-accent-green", icon: "border_all" },

    // Chemistry Topics
    { id: "t9", subjectId: "s2", title: "Organic Chemistry", description: "Carbon compounds and reactions.", type: "Advanced", price: 45, rating: 4.9, students: "+5k", preview: true, color: "bg-accent-neon", icon: "science" },

    // CS Topics
    { id: "t10", subjectId: "cs", title: "Data Structures", description: "Arrays, Linked Lists, Trees, and Graphs.", type: "Advanced", price: 50, rating: 4.8, students: "+4k", color: "bg-accent-blue", icon: "account_tree" }
];

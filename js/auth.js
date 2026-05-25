console.log("✅ auth.js loaded");

if (!window.supabase) {
    console.error("❌ Supabase CDN not loaded!");
}

const SUPABASE_URL = "https://rtcszidmnmpyvrikbimi.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0Y3N6aWRtbm1weXZyaWtiaW1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc4MTUyNTUsImV4cCI6MjA5MzM5MTI1NX0.FhqmFZQf9US4fAr9CWQRu9UxsqSXR77BEhY_huKwyNU";

console.log("Initializing Supabase...");

const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);

console.log("✅ Supabase client created");

async function signUpUser(email, password) {

    console.log("🔄 Signup started");

    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password
        });

        console.log("Signup result:", data, error);

        if (error) {
            alert("Error: " + error.message);
            return false;
        }

        alert("Signup successful!");
        return true;

    } catch (err) {
        console.error("Unexpected error:", err);
        alert("Unexpected error occurred");
        return false;
    }
}

async function loginUser(email, password) {

    console.log("🔄 Login started");

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    console.log("Login result:", data, error);

    if (error) {
        alert("Error: " + error.message);
        return false;
    }

    alert("Login successful!");
    return true;
}


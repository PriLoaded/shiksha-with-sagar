console.log("✅ auth.js starting...");

/* ============================================
   CHECK IF SUPABASE CDN EXISTS
   ============================================ */

if (!window.supabase) {
    console.error("❌ Supabase CDN not loaded!");
} else {
    console.log("✅ Supabase CDN loaded");
}

/* ============================================
   PREVENT DUPLICATE CLIENT CREATION
   ============================================ */

if (!window.mySupabaseClient) {

    console.log("🔄 Creating Supabase client...");

    const SUPABASE_URL = "YOUR_SUPABASE_URL";
    const SUPABASE_ANON_KEY = "YOUR_ANON_KEY";

    window.mySupabaseClient = window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_ANON_KEY
    );

    console.log("✅ Supabase client created");

} else {

    console.log("✅ Reusing existing Supabase client");

}

/* ============================================
   GLOBAL CLIENT
   ============================================ */

const supabase = window.mySupabaseClient;

console.log("✅ auth.js fully loaded");
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


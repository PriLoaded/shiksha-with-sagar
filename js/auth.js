/* ============================================
   SUPABASE AUTH CONFIGURATION
   ============================================ */

const SUPABASE_URL = "https://rtcszidmnmpyvrikbimi.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_fS8y-6uN62Wp-OgvUB1TkQ_v0eQMBTW";

const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);

/* ============================================
   SIGN UP
   ============================================ */

async function signUpUser(email, password) {

    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password
    });

    if (error) {
        alert("Signup Error: " + error.message);
        return false;
    }

    alert("Account created successfully! Please check your email for verification.");
    return true;
}

/* ============================================
   LOGIN
   ============================================ */

async function loginUser(email, password) {

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) {
        alert("Login Error: " + error.message);
        return false;
    }

    return true;
}

/* ============================================
   LOGOUT
   ============================================ */

async function logoutUser() {
    await supabase.auth.signOut();
    window.location.href = "login.html";
}

/* ============================================
   CHECK SESSION
   ============================================ */

async function checkUserSession() {

    const { data: { session } } = await supabase.auth.getSession();

    return session;
}

/* ============================================
   PROTECT PAGE
   ============================================ */

async function protectPage() {

    const session = await checkUserSession();

    if (!session) {
        window.location.href = "login.html";
    }
}

/* ============================================
   REDIRECT IF LOGGED IN
   ============================================ */

async function redirectIfLoggedIn() {

    const session = await checkUserSession();

    if (session) {
        window.location.href = "student-dashboard.html";
    }
}
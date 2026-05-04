/* ============================================
   SUPABASE AUTH CONFIGURATION
   ============================================ */

console.log("✅ auth.js loaded");

const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_ANON_KEY = "YOUR_ANON_KEY";

if (!window.supabase) {
    console.error("❌ Supabase CDN not loaded!");
}

const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);

console.log("✅ Supabase client initialized");

/* ============================================
   HELPER: SHOW MESSAGE
   ============================================ */

function showMessage(message, type = "info") {
    let msgDiv = document.getElementById("auth-message");

    if (!msgDiv) {
        msgDiv = document.createElement("div");
        msgDiv.id = "auth-message";
        msgDiv.style.marginTop = "15px";
        msgDiv.style.fontWeight = "600";
        document.body.appendChild(msgDiv);
    }

    msgDiv.style.color = type === "error" ? "red" : "green";
    msgDiv.innerText = message;
}

/* ============================================
   SIGN UP
   ============================================ */

async function signUpUser(email, password) {

    console.log("🔄 Attempting signup:", email);

    try {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password
        });

        if (error) {
            console.error("❌ Signup error:", error);
            showMessage(error.message, "error");
            return false;
        }

        console.log("✅ Signup success:", data);
        showMessage("Signup successful! Check your email.", "success");
        return true;

    } catch (err) {
        console.error("❌ Unexpected signup error:", err);
        showMessage("Unexpected error occurred.", "error");
        return false;
    }
}

/* ============================================
   LOGIN
   ============================================ */

async function loginUser(email, password) {

    console.log("🔄 Attempting login:", email);

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            console.error("❌ Login error:", error);
            showMessage(error.message, "error");
            return false;
        }

        console.log("✅ Login success:", data);
        showMessage("Login successful!", "success");
        return true;

    } catch (err) {
        console.error("❌ Unexpected login error:", err);
        showMessage("Unexpected error occurred.", "error");
        return false;
    }
}

/* ============================================
   LOGOUT
   ============================================ */

async function logoutUser() {
    console.log("🔄 Logging out...");
    await supabase.auth.signOut();
    window.location.href = "login.html";
}

/* ============================================
   CHECK SESSION
   ============================================ */

async function checkUserSession() {
    const { data: { session } } = await supabase.auth.getSession();
    console.log("🔎 Current session:", session);
    return session;
}

/* ============================================
   PROTECT PAGE
   ============================================ */

async function protectPage() {
    const session = await checkUserSession();
    if (!session) {
        console.log("🚫 No session. Redirecting to login.");
        window.location.href = "login.html";
    }
}

/* ============================================
   REDIRECT IF LOGGED IN
   ============================================ */

async function redirectIfLoggedIn() {
    const session = await checkUserSession();
    if (session) {
        console.log("✅ Already logged in. Redirecting to dashboard.");
        window.location.href = "student-dashboard.html";
    }
}/* ============================================
   SUPABASE AUTH CONFIGURATION
   ============================================ */

console.log("✅ auth.js loaded");

const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_ANON_KEY = "YOUR_ANON_KEY";

if (!window.supabase) {
    console.error("❌ Supabase CDN not loaded!");
}

const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);

console.log("✅ Supabase client initialized");

/* ============================================
   HELPER: SHOW MESSAGE
   ============================================ */

function showMessage(message, type = "info") {
    let msgDiv = document.getElementById("auth-message");

    if (!msgDiv) {
        msgDiv = document.createElement("div");
        msgDiv.id = "auth-message";
        msgDiv.style.marginTop = "15px";
        msgDiv.style.fontWeight = "600";
        document.body.appendChild(msgDiv);
    }

    msgDiv.style.color = type === "error" ? "red" : "green";
    msgDiv.innerText = message;
}

/* ============================================
   SIGN UP
   ============================================ */

async function signUpUser(email, password) {

    console.log("🔄 Attempting signup:", email);

    try {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password
        });

        if (error) {
            console.error("❌ Signup error:", error);
            showMessage(error.message, "error");
            return false;
        }

        console.log("✅ Signup success:", data);
        showMessage("Signup successful! Check your email.", "success");
        return true;

    } catch (err) {
        console.error("❌ Unexpected signup error:", err);
        showMessage("Unexpected error occurred.", "error");
        return false;
    }
}

/* ============================================
   LOGIN
   ============================================ */

async function loginUser(email, password) {

    console.log("🔄 Attempting login:", email);

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            console.error("❌ Login error:", error);
            showMessage(error.message, "error");
            return false;
        }

        console.log("✅ Login success:", data);
        showMessage("Login successful!", "success");
        return true;

    } catch (err) {
        console.error("❌ Unexpected login error:", err);
        showMessage("Unexpected error occurred.", "error");
        return false;
    }
}

/* ============================================
   LOGOUT
   ============================================ */

async function logoutUser() {
    console.log("🔄 Logging out...");
    await supabase.auth.signOut();
    window.location.href = "login.html";
}

/* ============================================
   CHECK SESSION
   ============================================ */

async function checkUserSession() {
    const { data: { session } } = await supabase.auth.getSession();
    console.log("🔎 Current session:", session);
    return session;
}

/* ============================================
   PROTECT PAGE
   ============================================ */

async function protectPage() {
    const session = await checkUserSession();
    if (!session) {
        console.log("🚫 No session. Redirecting to login.");
        window.location.href = "login.html";
    }
}

/* ============================================
   REDIRECT IF LOGGED IN
   ============================================ */

async function redirectIfLoggedIn() {
    const session = await checkUserSession();
    if (session) {
        console.log("✅ Already logged in. Redirecting to dashboard.");
        window.location.href = "student-dashboard.html";
    }
}
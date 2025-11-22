import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function AuthPage({ onLogin }) {
  const [mode, setMode] = useState("login"); // 'login' | 'register'
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((f) => ({
      ...f,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email || !form.password || (mode === "register" && !form.name)) {
      alert("Please fill in all required fields.");
      return;
    }

    const exampleStats = {
      totalTimeSavedMinutes: 186,
      tripsTracked: 24,
      avgParkingSearchBeforeMinutes: 11,
      avgParkingSearchNowMinutes: 6,
      lastWeekTimeSavedMinutes: 32,
    };

    const fakeUser = {
      id: "123",
      name: mode === "register" ? form.name : "Alex Driver",
      email: form.email,
      stats: exampleStats,
    };

    onLogin(fakeUser);

    // ⬇️ Go to the main app page: the map
    navigate("/map");
  };

  return (
    <div className="screen">
      <header className="header">
        <h1 className="logo">ParkTime</h1>
      </header>

      <main className="screen-main">
        <div className="card">
          <div className="auth-toggle">
            <button
              type="button"
              className={`auth-tab ${mode === "login" ? "auth-tab--active" : ""}`}
              onClick={() => setMode("login")}
            >
              Login
            </button>
            <button
              type="button"
              className={`auth-tab ${mode === "register" ? "auth-tab--active" : ""}`}
              onClick={() => setMode("register")}
            >
              Register
            </button>
          </div>

          <form className="form" onSubmit={handleSubmit}>
            {mode === "register" && (
              <div className="form-group">
                <label className="label" htmlFor="name">
                  Name
                </label>
                <input
                  className="input"
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>
            )}

            <div className="form-group">
              <label className="label" htmlFor="email">
                Email
              </label>
              <input
                className="input"
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <label className="label" htmlFor="password">
                Password
              </label>
              <input
                className="input"
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                autoComplete={mode === "login" ? "current-password" : "new-password"}
              />
            </div>

            <button type="submit" className="btn-primary">
              {mode === "login" ? "Login" : "Create account"}
            </button>
          </form>

          <p className="auth-helper">
            {mode === "login" ? (
              <>
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  className="text-link"
                  onClick={() => setMode("register")}
                >
                  Register
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  className="text-link"
                  onClick={() => setMode("login")}
                >
                  Login
                </button>
              </>
            )}
          </p>
        </div>

        <Link to="/" className="text-link small-link">
          ← Back to landing
        </Link>
      </main>
    </div>
  );
}

export default AuthPage;

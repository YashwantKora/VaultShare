import { useState } from "react";
import "./App.css";

type User = {
  name: string;
  email: string;
};

type SharedFile = {
  id: number;
  name: string;
  recipient: string;
  expires: string;
  status: "ACTIVE" | "REVOKED";
};

type ReceivedShare = {
  id: number;
  name: string;
  sender: string;
  received: string;
  expires: string;
  status: "PENDING" | "ACCEPTED" | "DECLINED";
  siftOpened: boolean;
  message: string;
};

const demoShares: SharedFile[] = [
  {
    id: 1,
    name: "project-proposal.pdf",
    recipient: "teammate@example.com",
    expires: "Oct 25, 2026",
    status: "ACTIVE",
  },
  {
    id: 2,
    name: "design-notes.docx",
    recipient: "alex@example.com",
    expires: "Oct 20, 2026",
    status: "ACTIVE",
  },
];

const demoReceivedShares: ReceivedShare[] = [
  {
    id: 101,
    name: "Q4-financial-overview.pdf",
    sender: "morgan@example.com",
    received: "Today",
    expires: "Nov 6, 2026",
    status: "PENDING",
    siftOpened: false,
    message: "",
  },
  {
    id: 102,
    name: "team-photo.jpg",
    sender: "casey@example.com",
    received: "Yesterday",
    expires: "Nov 2, 2026",
    status: "PENDING",
    siftOpened: false,
    message: "",
  },
];

const siftTips = {
  sharing: {
    label: "Safer sharing",
    text: "Share with a specific person, use the shortest practical expiry, and revoke access when it is no longer needed.",
  },
  links: {
    label: "Check links",
    text: "Before opening a shared-file link, confirm who sent it and check that the web address matches the service you expect.",
  },
  files: {
    label: "Handle files",
    text: "Be cautious with unexpected attachments. Keep your software updated and avoid enabling macros or other active content unless you trust the source.",
  },
} as const;

const siftTipKeys = ["sharing", "links", "files"] as const;
type SiftTipKey = (typeof siftTipKeys)[number];

function App() {
  const [screen, setScreen] = useState<
    "login" | "signup" | "dashboard" | "receiving" | "profile"
  >("login");
  const [user, setUser] = useState<User | null>(null);
  const [shares, setShares] = useState(demoShares);
  const [receivedShares, setReceivedShares] = useState(demoReceivedShares);
  const pendingReceivedCount = receivedShares.filter(
    (share) => share.status === "PENDING"
  ).length;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [recipient, setRecipient] = useState("");
  const [expiry, setExpiry] = useState("7");
  const [activeSiftTip, setActiveSiftTip] = useState<SiftTipKey>("sharing");

  function handleAuth(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // DEMO ONLY: this does not validate credentials or create a real account.
    const displayName =
      screen === "signup" ? name.trim() : email.split("@")[0];

    setUser({ name: displayName || "VaultShare user", email });
    setScreen("dashboard");
    setPassword("");
  }

  function handleShare(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedFile || !recipient.trim()) return;

    const expiration = new Date();
    expiration.setDate(expiration.getDate() + Number(expiry));

    const newShare: SharedFile = {
      id: Date.now(),
      name: selectedFile.name,
      recipient: recipient.trim(),
      expires: expiration.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      status: "ACTIVE",
    };

    setShares((current) => [newShare, ...current]);
    setSelectedFile(null);
    setRecipient("");

    // This creates a visual demo entry only—not a real share link.
  }

  function revokeShare(id: number) {
    setShares((current) =>
      current.map((share) =>
        share.id === id ? { ...share, status: "REVOKED" } : share
      )
    );
  }

  function updateReceivedShare(
    id: number,
    updates: Partial<ReceivedShare>
  ) {
    setReceivedShares((current) =>
      current.map((share) =>
        share.id === id ? { ...share, ...updates } : share
      )
    );
  }

  function logout() {
    setUser(null);
    setScreen("login");
    setEmail("");
    setPassword("");
  }

  if (screen === "login" || screen === "signup") {
    const isSignup = screen === "signup";

    return (
      <main className="auth-page">
        <div className="auth-brand">
          <div className="brand-mark">V<span>!</span></div>
          <span>VAULTSHARE</span>
        </div>

        <section className="auth-card">
          <div className="auth-card-top">
            <span className="eyebrow">PRIVATE BY DESIGN / 01</span>
            <span className="auth-sticker">NO<br />SNOOPING.</span>
          </div>

          <h1>{isSignup ? "MAKE AN\nACCOUNT." : "GOOD TO\nSEE YOU."}</h1>
          <p className="auth-subtitle">
            {isSignup
              ? "Create your account. Share files on your terms."
              : "Log in to manage your secure file shares."}
          </p>

          <form className="auth-form" onSubmit={handleAuth}>
            {isSignup && (
              <label>
                YOUR NAME
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="e.g. Sam"
                  autoComplete="name"
                  required
                />
              </label>
            )}

            <label>
              EMAIL ADDRESS
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </label>

            <label>
              PASSWORD
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter a password"
                autoComplete={isSignup ? "new-password" : "current-password"}
                minLength={8}
                required
              />
              {isSignup && <small>Use at least 8 characters for this demo.</small>}
            </label>

            <button className="brutal-button" type="submit">
              {isSignup ? "CREATE DEMO ACCOUNT" : "LOG IN"} <span>↗</span>
            </button>
          </form>

          <div className="auth-switch">
            {isSignup ? "Already have an account?" : "New to VaultShare?"}
            <button
              type="button"
              onClick={() => setScreen(isSignup ? "login" : "signup")}
            >
              {isSignup ? "Log in" : "Create account"}
            </button>
          </div>

          {/* <p className="demo-warning">
            Prototype only: authentication is simulated. Don’t use a real password.
          </p> */}
        </section>

        <footer className="auth-footer">
          <span>VAULTSHARE © 2026</span>
          <span>SHARE WITH CARE ✳</span>
        </footer>
      </main>
    );
  }

  if (!user) return null;

  if (screen === "profile") {
    return (
      <main className="app-shell">
        <Sidebar
          user={user}
          screen={screen}
          setScreen={setScreen}
          logout={logout}
          pendingReceivedCount={pendingReceivedCount}
        />

        <section className="main-content">
          <Topbar />
          <div className="page-heading">
            <p className="eyebrow">ACCOUNT / SETTINGS</p>
            <h1>YOUR PROFILE.</h1>
            {/* <p>Manage the account details shown in your VaultShare profile.</p> */}
          </div>

          <section className="profile-card">
            <div className="profile-avatar">{user.name.slice(0, 2).toUpperCase()}</div>
            <div className="profile-fields">
              <label>
                DISPLAY NAME
                <input
                  value={user.name}
                  onChange={(event) =>
                    setUser({ ...user, name: event.target.value })
                  }
                />
              </label>
              <label>
                EMAIL
                <input value={user.email} readOnly />
                {/* //<small>Email editing will need backend verification.</small> */}
              </label>
              {/* <div className="profile-note"> */}
                {/* <strong>ACCOUNT SECURITY</strong> */}
                {/* <span>Real password changes and account verification are not connected yet.</span> */}
              {/* </div> */}
              <button className="brutal-button" onClick={() => setScreen("dashboard")}>
                BACK TO SHARING <span>↗</span>
              </button>
            </div>
          </section>
        </section>
      </main>
    );
  }

  if (screen === "receiving") {
    return (
      <main className="app-shell">
        <Sidebar
          user={user}
          screen={screen}
          setScreen={setScreen}
          logout={logout}
          pendingReceivedCount={pendingReceivedCount}
        />

        <section className="main-content">
          <Topbar />

          <section className="receiving-heading">
            <p className="eyebrow">INCOMING / FILES SHARED WITH YOU</p>
            <h1>YOUR INBOX.</h1>
            <p>Review incoming files, ask SIFT for help, then choose what to do.</p>
          </section>

          <section className="received-section" aria-labelledby="received-heading">
            <div className="section-heading">
              <div>
                <h2 id="received-heading">SHARED WITH YOU.</h2>
              </div>
              <span className="file-count">{pendingReceivedCount} NEW</span>
            </div>

            {receivedShares.length === 0 ? (
              <div className="received-empty">
                <strong>ALL CAUGHT UP.</strong>
                <span>New file shares will show up here.</span>
              </div>
            ) : (
              <div className="received-list">
                {receivedShares.map((share) => (
                  <article className="received-card" key={share.id}>
                    <div className="received-card-heading">
                      <div className="file-icon" aria-hidden="true">↙</div>
                      <div className="received-info">
                        <strong>{share.name}</strong>
                        <small>FROM: {share.sender}</small>
                        <small>RECEIVED: {share.received} · EXPIRES: {share.expires}</small>
                      </div>
                      <span className={`file-status ${share.status === "PENDING" ? "yellow" : share.status === "ACCEPTED" ? "accepted" : "muted"}`}>
                        {share.status}
                      </span>
                    </div>

                    {share.status === "PENDING" && (
                      <div className="received-actions">
                        <button
                          className="sift-scan-button"
                          type="button"
                          onClick={() =>
                            updateReceivedShare(share.id, {
                              siftOpened: !share.siftOpened,
                              message: "",
                            })
                          }
                        >
                          <span>S</span> {share.siftOpened ? "CLOSE SIFT PREVIEW" : "SCAN WITH SIFT"}
                        </button>
                        <button
                          className="received-decline"
                          type="button"
                          onClick={() =>
                            updateReceivedShare(share.id, {
                              status: "DECLINED",
                              message: "",
                            })
                          }
                        >
                          DECLINE
                        </button>
                        <button
                          className="received-accept"
                          type="button"
                          onClick={() =>
                            updateReceivedShare(share.id, {
                              status: "ACCEPTED",
                              message: "",
                            })
                          }
                        >
                          ACCEPT FILE <span>↗</span>
                        </button>
                      </div>
                    )}

                    {share.status === "ACCEPTED" && (
                      <div className="received-actions">
                        <button
                          className="received-secondary"
                          type="button"
                          onClick={() =>
                            updateReceivedShare(share.id, {
                              message: "File preview is not connected in this demo.",
                            })
                          }
                        >
                          VIEW FILE
                        </button>
                        <button
                          className="received-accept"
                          type="button"
                          onClick={() =>
                            updateReceivedShare(share.id, {
                              message: "File download is not connected in this demo.",
                            })
                          }
                        >
                          DOWNLOAD FILE <span>↓</span>
                        </button>
                      </div>
                    )}

                    {share.siftOpened && share.status === "PENDING" && (
                      <div className="received-sift-preview">
                        <span className="received-sift-label">SIFT / PREVIEW</span>
                        <strong>SCANNING ISN’T CONNECTED YET.</strong>
                        <p>
                          SIFT’s file risk check and document summary will appear
                          here when the AI service is connected.
                        </p>
                      </div>
                    )}

                    {share.message && (
                      <p className="received-message" role="status">{share.message}</p>
                    )}
                  </article>
                ))}
              </div>
            )}
          </section>

          <footer className="footer">
            <span>VAULTSHARE © 2026</span>
            <span>SHARE WITH CARE ✳</span>
          </footer>
        </section>
      </main>
    );
  }

  return (
    <main className="app-shell">
      <Sidebar
        user={user}
        screen={screen}
        setScreen={setScreen}
        logout={logout}
        pendingReceivedCount={pendingReceivedCount}
      />

      <section className="main-content">
        <Topbar />

        <section className="hero">
          <div>
            <p className="eyebrow">YOUR PRIVATE SHARING SPACE</p>
            <h1>SHARE IT.<br /><span>SECURE IT.</span></h1>
            <p className="hero-description">
              Send files to the right people. Set the rules. Stay in control.
            </p>
          </div>
          <div className="hero-sticker">
            <span>ACCESS</span>
            <strong>ON<br />YOUR<br />TERMS.</strong>
          </div>
        </section>

        <section className="share-panel">
          <div className="section-heading">
            <div>
              {/* <p className="eyebrow">01 / CREATE A SHARE</p> */}
              <h2>WHO NEEDS THE FILE?</h2>
            </div>
            <span className="mini-stamp">CONTROL ACCESS</span>
          </div>

          <form onSubmit={handleShare}>
            <label className="file-drop">
              <span className="upload-icon">＋</span>
              <strong>{selectedFile ? selectedFile.name : "Choose a file to share"}</strong>
              <small>Select a file from your device</small>
              <input
                type="file"
                onChange={(event) =>
                  setSelectedFile(event.target.files?.[0] ?? null)
                }
              />
            </label>

            <div className="share-fields">
              <label>
                RECIPIENT’S VAULTSHARE EMAIL
                <input
                  type="email"
                  value={recipient}
                  onChange={(event) => setRecipient(event.target.value)}
                  placeholder="recipient@example.com"
                  required
                />
              </label>

              <label>
                LINK EXPIRY
                <select value={expiry} onChange={(event) => setExpiry(event.target.value)}>
                  <option value="1">1 day</option>
                  <option value="7">7 days</option>
                  <option value="30">30 days</option>
                  <option value="30">Custom</option>
                </select>
              </label>
            </div>

            {/* <div className="security-strip">
              <span>✳ RECIPIENT LOGIN REQUIRED</span>
              <span>✳ EXPIRING ACCESS</span>
            </div> */}

            <button className="brutal-button" type="submit" disabled={!selectedFile}>
              CREATE DEMO SHARE <span>↗</span>
            </button>

            {/* <p className="demo-warning">
              Demo: this adds a mock share to the list. It does not upload the file,
              notify the recipient, or create a secure link.
            </p> */}
          </form>
        </section>

        <section className="sift-panel" aria-labelledby="sift-heading">
          <div className="sift-main">
            <div className="sift-heading">
              <span className="sift-mark" aria-hidden="true">S</span>
              <div>
                <p className="eyebrow">YOUR SECURITY SIDEKICK</p>
                <h2 id="sift-heading">MEET SIFT.</h2>
              </div>
              {/* <span className="sift-preview-badge">UI PREVIEW</span> */}
            </div>

            <p className="sift-description">
              SIFT is designed to flag potential file risks and summarize supported
              documents.
            </p>

            <div className="sift-capabilities" aria-label="Planned SIFT features">
              <span>01 / FILE RISK CHECKS</span>
              <span>02 / DOCUMENT SUMMARIES</span>
              <span>03 / Talk to SIFT</span>
            </div>

            <div className="sift-scan-preview" aria-label="Example scan statuses">
              <div>
                <span>FILE SECURITY CHECK</span>
                <strong>NOT CONNECTED</strong>
              </div>
              <div>
                <span>DOCUMENT SUMMARY</span>
                <strong>NOT CONNECTED</strong>
              </div>
            </div>
          </div>

          <aside className="sift-tips">
            <p className="eyebrow">QUICK SECURITY GUIDE</p>
            <h3>Small habits. Safer sharing.</h3>
            <div className="sift-tip-tabs" aria-label="Security guide topics">
              {siftTipKeys.map((key) => (
                <button
                  className={activeSiftTip === key ? "active" : ""}
                  key={key}
                  type="button"
                  aria-pressed={activeSiftTip === key}
                  onClick={() => setActiveSiftTip(key)}
                >
                  {siftTips[key].label}
                </button>
              ))}
            </div>
            <p className="sift-tip-copy" aria-live="polite">
              {siftTips[activeSiftTip].text}
            </p>

            <div className="sift-search">
              <label htmlFor="sift-search-input" className="sr-only">
                Ask SIFT
              </label>
              <input
                id="sift-search-input"
                type="text"
                placeholder="Ask SIFT..."
                aria-label="Ask SIFT"
              />
            </div>
          </aside>
        </section>

        <section className="shares-section">
          <div className="section-heading">
            <div>
              {/* <p className="eyebrow">02 / ACCESS YOU CONTROL</p> */}
              <h2>SHARED BY YOU.</h2>
            </div>
            <span className="file-count">{shares.length} SHARES</span>
          </div>

          <div className="share-list">
            {shares.map((share) => (
              <article className="share-row" key={share.id}>
                <div className="file-icon">↗</div>
                <div className="share-info">
                  <strong>{share.name}</strong>
                  <small>TO: {share.recipient}</small>
                  <small>EXPIRES: {share.expires}</small>
                </div>
                <span className={`file-status ${share.status === "ACTIVE" ? "yellow" : "muted"}`}>
                  {share.status}
                </span>
                {share.status === "ACTIVE" && (
                  <button
                    className="revoke-button"
                    onClick={() => revokeShare(share.id)}
                  >
                    REVOKE
                  </button>
                )}
              </article>
            ))}
          </div>
        </section>

        <footer className="footer">
          <span>VAULTSHARE © 2026</span>
          <span>SHARE WITH CARE ✳</span>
        </footer>
      </section>
    </main>
  );
}

function Sidebar({
  user,
  screen,
  setScreen,
  logout,
  pendingReceivedCount,
}: {
  user: User;
  screen: string;
  setScreen: (
    screen: "login" | "signup" | "dashboard" | "receiving" | "profile"
  ) => void;
  logout: () => void;
  pendingReceivedCount: number;
}) {
  return (
    <aside className="sidebar">
      <div className="brand-mark">V<span>!</span></div>
      <p className="brand-name">VAULTSHARE</p>
      <p className="sidebar-caption">YOUR FILES. YOUR RULES.</p>

      <nav className="nav-menu">
        <button
          className={`nav-item ${screen === "dashboard" ? "active" : ""}`}
          onClick={() => setScreen("dashboard")}
        >
          ↗ <span>Sharing</span>
        </button>
        <button
          className={`nav-item ${screen === "receiving" ? "active" : ""}`}
          onClick={() => setScreen("receiving")}
          aria-label={`Receiving${pendingReceivedCount > 0 ? `, ${pendingReceivedCount} new shares` : ""}`}
        >
          ↓ <span>Receiving</span>
          {pendingReceivedCount > 0 && (
            <span className="nav-count">{pendingReceivedCount}</span>
          )}
        </button>
        <button
          className={`nav-item ${screen === "profile" ? "active" : ""}`}
          onClick={() => setScreen("profile")}
        >
          ◉ <span>My profile</span>
        </button>
      </nav>

      <div className="sidebar-bottom">
        <div className="avatar">{user.name.slice(0, 2).toUpperCase()}</div>
        <div className="sidebar-user">
          <strong>{user.name}</strong>
          <small>{user.email}</small>
          <button onClick={logout}>LOG OUT ↗</button>
        </div>
      </div>
    </aside>
  );
}

function Topbar() {
  return (
    <header className="topbar">
      <span className="breadcrumb">VAULT / SECURE SHARING</span>
      {/* <span className="topbar-status"><i /> DEMO MODE</span> */}
    </header>
  );
}

export default App;
/* Survey Campaigns grid + Create New Survey Campaign form. */

const CAMPAIGNS = [
  { id: 1, name: "Post-Chat CSAT — Tier 1 Billing",
    status: "active", channels: ["digital"], surveyDesignId: "csat-quick",
    hasWorkingCopy: true, workingCopyVersion: 4, publishedVersion: 3, publishedAt: "May 04, 2026", workingCopyEditedBy: "Maria Cohen", workingCopyEditedAt: "May 10, 2026",
    sampling: 50, sent: 12480, completion: 31.2, vu: 76,
    owner: "Maria Cohen", created: "Mar 14, 2026", updated: "May 02, 2026" },
  { id: 2, name: "Negative Sentiment Catcher — All Digital",
    status: "active", channels: ["digital"], surveyDesignId: "csat-quick",
    sampling: 100, sent: 4220, completion: 28.6, vu: 41,
    owner: "Dev Patel", created: "Jan 22, 2026", updated: "May 08, 2026" },
  { id: 3, name: "Email Support — Resolution Quality",
    status: "active", channels: ["digital"], surveyDesignId: "csat-list",
    sampling: 25, sent: 8910, completion: 22.4, vu: 68,
    owner: "Maria Cohen", created: "Feb 04, 2026", updated: "Apr 28, 2026" },
  { id: 4, name: "Cognigy AI Session — Bot Handoff Audit",
    status: "active", channels: ["digital"], surveyDesignId: "bot-simple",
    sampling: 80, sent: 6122, completion: 19.7, vu: 54,
    owner: "Tomás Reyes", created: "Mar 30, 2026", updated: "May 09, 2026" },
  { id: 5, name: "Social DM — Brand Health Pulse",
    status: "paused", channels: ["digital"], surveyDesignId: "brand-pulse",
    sampling: 100, sent: 1840, completion: 14.1, vu: 62,
    owner: "Aisha Khan", created: "Dec 01, 2025", updated: "Apr 12, 2026" },
  { id: 6, name: "VIP Escalation Follow-Up",
    status: "draft", channels: ["digital"], surveyDesignId: "vip-followup",
    sampling: 100, sent: 0, completion: 0, vu: null,
    owner: "Maria Cohen", created: "May 06, 2026", updated: "May 06, 2026" },
  { id: 7, name: "Holiday Returns — Email",
    status: "ended", channels: ["digital"], surveyDesignId: "csat-quick",
    sampling: 100, sent: 21450, completion: 26.8, vu: 71,
    owner: "Dev Patel", created: "Nov 12, 2025", updated: "Jan 15, 2026" },
];

function ChannelChip({ kind }) {
  const map = {
    digital: <><path d="M7 4h9a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3h-1v2.5a.5.5 0 0 1-.82.39L10.5 16H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3z"/><circle cx="9" cy="10" r="0.9" fill="currentColor" stroke="none"/><circle cx="12" cy="10" r="0.9" fill="currentColor" stroke="none"/><circle cx="15" cy="10" r="0.9" fill="currentColor" stroke="none"/></>,
    voice:  <><path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></>,
  };
  return (
    <span className="channel-chip" title={kind}>
      <svg viewBox="0 0 24 24">{map[kind] || map.digital}</svg>
    </span>
  );
}

function StatusPill({ s }) {
  const label = { active: "Active", paused: "Paused", draft: "Draft", ended: "Ended", working: "Working Copy" }[s] || s;
  return <span className={`fi-pill ${s}`}><span className="dot"/>{label}</span>;
}

function WorkingCopyChip() {
  return (
    <span className="fi-pill working" title="This campaign has unpublished changes">
      <svg viewBox="0 0 24 24" width="10" height="10" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>
      Working Copy
    </span>
  );
}

function DesignPreviewCard({ design, compact }) {
  if (!design) return null;
  return (
    <div style={{
      marginTop: 8,
      border: "1px solid rgba(0,0,0,0.08)",
      borderRadius: 8,
      background: "var(--lyra-white)",
      overflow: "hidden",
      maxWidth: 460,
    }}>
      <div style={{
        padding: "10px 14px",
        background: "var(--fi-accent-bg)",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <svg viewBox="0 0 24 24" width="14" height="14" stroke="var(--fi-accent-strong)" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="3" width="16" height="18" rx="2"/><line x1="8" y1="8" x2="16" y2="8"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="8" y1="16" x2="13" y2="16"/>
        </svg>
        <div style={{ flex: 1, font: "500 14px/20px Inter", color: "var(--fi-accent-strong)" }}>
          {design.name}
        </div>
        <a className="agent-link" href="#" onClick={e => e.preventDefault()}
          style={{ font: "500 12px/16px Inter" }}>
          Open design →
        </a>
      </div>
      <div style={{ padding: "10px 14px", display: "flex", flexWrap: "wrap", gap: 8 }}>
        <DesignChip label={design.surveyType}/>
        <DesignChip label={design.displayStyle}/>
        <DesignChip label={`AI questions ${design.aiQuestions ? "on" : "off"}`} on={design.aiQuestions}/>
        <DesignChip label={`${design.maxQuestions} question${design.maxQuestions !== 1 ? "s" : ""}`}/>
        <DesignChip label={`Free text: ${design.freeText}`}/>
        <DesignChip label={`${design.expiryMinutes} min expiry`}/>
        {design.realtimeAlerts ? <DesignChip label="Real-time alerts" on/> : null}
      </div>
    </div>
  );
}

function DesignChip({ label, on }) {
  return (
    <span style={{
      font: "500 12px/16px Inter",
      color: on ? "var(--fi-green)" : "var(--lyra-slate-600)",
      background: on ? "rgba(28,94,37,0.08)" : "rgba(0,0,0,0.04)",
      padding: "3px var(--space-2)", borderRadius: 4,
    }}>{label}</span>
  );
}

function Sparkline({ seed = 1, color = "var(--fi-accent)" }) {
  // Deterministic pseudo-random sparkline.
  const pts = [];
  let x = seed * 17;
  for (let i = 0; i < 14; i++) {
    x = (x * 9301 + 49297) % 233280;
    pts.push(8 + (x % 14));
  }
  const max = Math.max(...pts), min = Math.min(...pts);
  const d = pts.map((p, i) => {
    const xi = (i / (pts.length - 1)) * 80;
    const yi = 22 - ((p - min) / (max - min || 1)) * 18;
    return `${i === 0 ? "M" : "L"}${xi.toFixed(1)} ${yi.toFixed(1)}`;
  }).join(" ");
  return (
    <svg className="spark" viewBox="0 0 80 22">
      <path d={d} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* Reusable Lyra filter chip with click-outside dropdown menu.
   Renders as: [Label] [: Value] [▾]  [×] when active, or [Label ▾] when empty. */
function FilterChip({ label, value, options, onSelect, onClear }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  const isActive = value != null && value !== "";

  React.useEffect(() => {
    if (!open) return;
    function onDocClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  return (
    <div className={`filter-chip ${isActive ? "active" : "muted"}`} ref={ref}>
      <span className="filter-chip-trigger" onClick={() => setOpen(o => !o)}>
        <span>{label}{isActive ? ":" : ""}</span>
        {isActive && <span className="filter-chip-value">{value}</span>}
        <svg className="chev" viewBox="0 0 16 16">
          <polyline points="4 6 8 10 12 6" stroke="currentColor" strokeWidth="1.5"
            fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
      {isActive && (
        <button className="filter-chip-x" onClick={onClear} title={`Remove ${label} filter`}>
          <svg viewBox="0 0 16 16">
            <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeLinecap="round"/>
          </svg>
        </button>
      )}
      {open && (
        <div className="filter-chip-menu">
          {options.map(opt => (
            <button key={opt}
              className={`filter-chip-menu-item ${opt === value ? "selected" : ""}`}
              onClick={() => { onSelect(opt); setOpen(false); }}>
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function SurveyCampaignsGrid({ onCreate, onOpen }) {
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState(null);   // null = no filter (show all)
  const [ownerFilter, setOwnerFilter] = React.useState(null);
  const [order, setOrder] = React.useState(() => CAMPAIGNS.map(c => c.id));
  const [dragId, setDragId] = React.useState(null);
  const [dropBeforeId, setDropBeforeId] = React.useState(null);
  const [selectedIds, setSelectedIds] = React.useState(() => new Set());
  const [statusOverride, setStatusOverride] = React.useState({}); // id -> status
  const [deletedIds, setDeletedIds] = React.useState(() => new Set());

  const statusOf = (c) => statusOverride[c.id] || c.status;
  const toggleSelect = (id) => setSelectedIds(prev => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });
  const clearSelection = () => setSelectedIds(new Set());
  const selCount = selectedIds.size;
  const selectedRows = () => [...selectedIds].map(id => CAMPAIGNS.find(c => c.id === id)).filter(Boolean);
  const canActivate = selCount > 0 && selectedRows().some(c => statusOf(c) !== "active" && statusOf(c) !== "ended");
  const canDeactivate = selCount > 0 && selectedRows().some(c => statusOf(c) === "active");
  const canDelete = selCount > 0;
  const bulkSetStatus = (status) => {
    setStatusOverride(prev => {
      const next = { ...prev };
      selectedRows().forEach(c => {
        if (status === "active" && statusOf(c) === "ended") return;
        next[c.id] = status;
      });
      return next;
    });
    clearSelection();
  };
  const bulkDelete = () => {
    setDeletedIds(prev => {
      const next = new Set(prev);
      selectedIds.forEach(id => next.add(id));
      return next;
    });
    clearSelection();
  };

  // Routing-active = active + paused. Draft/Ended don't participate in priority.
  const isRouting = c => {
    if (deletedIds.has(c.id)) return false;
    const s = statusOf(c);
    return s === "active" || s === "paused";
  };
  const orderedAll = order.map(id => CAMPAIGNS.find(c => c.id === id)).filter(Boolean);
  const priorityMap = {};
  let p = 0;
  orderedAll.forEach(c => { if (isRouting(c)) { p++; priorityMap[c.id] = p; } });

  function reorder(srcId, beforeId) {
    if (srcId === beforeId) return;
    const next = order.filter(id => id !== srcId);
    if (beforeId == null) next.push(srcId);
    else {
      const i = next.indexOf(beforeId);
      next.splice(i, 0, srcId);
    }
    setOrder(next);
  }

  const liveCampaigns = CAMPAIGNS.filter(c => !deletedIds.has(c.id));
  /* Owner options come from the dataset itself so the menu stays in sync. */
  const ownerOptions = Array.from(new Set(liveCampaigns.map(c => c.owner))).sort();
  const statusOptions = ["Active", "Paused", "Draft", "Ended"];
  const hasAnyFilter = !!(search || statusFilter || ownerFilter);
  const clearAllFilters = () => { setSearch(""); setStatusFilter(null); setOwnerFilter(null); };

  const rows = orderedAll.filter(c => {
    if (deletedIds.has(c.id)) return false;
    const s = statusOf(c);
    if (statusFilter && s !== statusFilter.toLowerCase()) return false;
    if (ownerFilter && c.owner !== ownerFilter) return false;
    if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });
  const allRowsSelected = rows.length > 0 && rows.every(r => selectedIds.has(r.id));
  const someRowsSelected = rows.some(r => selectedIds.has(r.id)) && !allRowsSelected;

  return (
    <div className="pane">
      <div className="pane-head">
        <h1>Survey Campaigns</h1>
        <div className="head-actions">
          <button className="btn primary" onClick={onCreate}>
            <svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Create Campaign
          </button>
        </div>
      </div>

      {/* Lyra Filter Bar — Search on the left, filter chips, then Clear */}
      <div className="toolbar" style={{ paddingTop: 14 }}>
        <div className="search">
          <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
          <input placeholder="Search campaigns"
            value={search} onChange={e => setSearch(e.target.value)}/>
        </div>
        <FilterChip label="Status" value={statusFilter} options={statusOptions}
          onSelect={setStatusFilter} onClear={() => setStatusFilter(null)}/>
        <FilterChip label="Owner" value={ownerFilter} options={ownerOptions}
          onSelect={setOwnerFilter} onClear={() => setOwnerFilter(null)}/>
        {hasAnyFilter && (
          <button className="clear-link" onClick={clearAllFilters}>Clear</button>
        )}
        <span style={{ flex: 1 }}/>
        {selCount > 0 && (
          <span style={{ font: "500 12px/16px Inter", color: "var(--fi-accent-strong)", marginRight: 4 }}>
            {selCount} selected
            <span style={{ color: "var(--lyra-slate-400)", marginLeft: 8, cursor: "pointer", textDecoration: "underline" }} onClick={clearSelection}>Clear</span>
          </span>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <button className="btn" disabled={!canActivate}
            style={!canActivate ? { opacity: 0.5, cursor: "not-allowed" } : undefined}
            title={selCount === 0 ? "Select campaigns to enable" : "Activate selected"}
            onClick={() => canActivate && bulkSetStatus("active")}>
            <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
            Activate
          </button>
          <button className="btn" disabled={!canDeactivate}
            style={!canDeactivate ? { opacity: 0.5, cursor: "not-allowed" } : undefined}
            title={selCount === 0 ? "Select campaigns to enable" : "Pause selected"}
            onClick={() => canDeactivate && bulkSetStatus("paused")}>
            <svg viewBox="0 0 24 24"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>
            Deactivate
          </button>
          <button className="btn" disabled={!canDelete}
            style={!canDelete ? { opacity: 0.5, cursor: "not-allowed" } : { color: "var(--fi-red)" }}
            title={selCount === 0 ? "Select campaigns to enable" : "Delete selected"}
            onClick={() => canDelete && window.confirm(`Delete ${selCount} campaign${selCount===1?"":"s"}? This cannot be undone.`) && bulkDelete()}>
            <svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/></svg>
            Delete
          </button>
        </div>
      </div>

      <div className="info-banner">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="9"/>
          <path d="M12 16v-4M12 8h.01"/>
        </svg>
        <span>Drag any row by its grip handle to reorder routing priority. When an interaction matches multiple campaigns, the lower-numbered campaign wins. Draft and ended campaigns don't participate.</span>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th style={{ width: 28, padding: 0 }}></th>
              <th style={{ width: 36 }}>
                <input type="checkbox"
                  checked={allRowsSelected}
                  ref={el => { if (el) el.indeterminate = someRowsSelected; }}
                  onChange={e => {
                    if (e.target.checked) setSelectedIds(new Set(rows.map(r => r.id)));
                    else clearSelection();
                  }}/>
              </th>
              <th style={{ width: 110 }} title="Drag rows to reorder routing priority">
                Campaign priority
                <svg viewBox="0 0 24 24" width="11" height="11" style={{ marginLeft: 4, opacity: 0.5, verticalAlign: "-1px" }} stroke="currentColor" fill="none" strokeWidth="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 16h.01"/></svg>
              </th>
              <th>Campaign</th>
              <th>Status</th>
              <th>Channels</th>
              <th>Sampling</th>
              <th>Owner</th>
              <th>Last updated</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((c, idx) => {
              const routing = isRouting(c);
              const isDragging = dragId === c.id;
              const dropAbove = dropBeforeId === c.id;
              const isRowSelected = selectedIds.has(c.id);
              return (
                <tr key={c.id}
                  className={isRowSelected ? "selected" : ""}
                  draggable={routing}
                  onDragStart={e => {
                    if (!routing) { e.preventDefault(); return; }
                    setDragId(c.id);
                    e.dataTransfer.effectAllowed = "move";
                    e.dataTransfer.setData("text/plain", String(c.id));
                  }}
                  onDragOver={e => {
                    if (dragId == null || !routing) return;
                    e.preventDefault();
                    e.dataTransfer.dropEffect = "move";
                    const rect = e.currentTarget.getBoundingClientRect();
                    const above = (e.clientY - rect.top) < rect.height / 2;
                    setDropBeforeId(above ? c.id : (rows[idx+1]?.id ?? null));
                  }}
                  onDragLeave={() => { /* no-op */ }}
                  onDrop={e => {
                    e.preventDefault();
                    if (dragId != null) reorder(dragId, dropBeforeId);
                    setDragId(null);
                    setDropBeforeId(null);
                  }}
                  onDragEnd={() => { setDragId(null); setDropBeforeId(null); }}
                  style={{
                    opacity: isDragging ? 0.4 : 1,
                    boxShadow: dropAbove ? "inset 0 2px 0 var(--fi-accent-strong)" : undefined,
                    cursor: routing ? "default" : undefined,
                  }}>
                  <td style={{ padding: 0, textAlign: "center", color: "var(--lyra-slate-400)",
                    cursor: routing ? "grab" : "not-allowed",
                    opacity: routing ? 1 : 0.25 }}
                    title={routing ? "Drag to reorder" : "Draft/Ended campaigns don't participate in routing"}>
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                      <circle cx="9" cy="6" r="1.3"/><circle cx="15" cy="6" r="1.3"/>
                      <circle cx="9" cy="12" r="1.3"/><circle cx="15" cy="12" r="1.3"/>
                      <circle cx="9" cy="18" r="1.3"/><circle cx="15" cy="18" r="1.3"/>
                    </svg>
                  </td>
                  <td onClick={e => e.stopPropagation()}>
                    <input type="checkbox"
                      checked={selectedIds.has(c.id)}
                      onChange={() => toggleSelect(c.id)}/>
                  </td>
                  <td>
                    {routing ? (
                      /* Priority badge — bold so it's recognizable as main grid text (per Lyra instructions).
                         All priorities use the same style for consistency; the order itself conveys ranking. */
                      <div style={{
                        display: "inline-flex", alignItems: "center", justifyContent: "center",
                        minWidth: 28, height: 24, padding: "0 var(--space-2)", borderRadius: 6,
                        background: "var(--color-bg-active-moderate)",   /* Lyra: #d3e6fd */
                        color: "var(--color-fg-active-strong)",          /* Lyra: brand-700 */
                        font: "600 14px/20px Inter", letterSpacing: 0,   /* Lyra Heading-sm bold */
                      }}>
                        {priorityMap[c.id]}
                      </div>
                    ) : (
                      <span style={{ color: "var(--lyra-slate-400)", font: "600 14px/20px Inter" }}>—</span>
                    )}
                  </td>
                  <td>
                    <a className="agent-link" href="#" onClick={e => { e.preventDefault(); onOpen && onOpen(c); }}>
                      {c.name}
                    </a>
                    <div style={{ font: "400 12px/16px Inter", color: "var(--color-fg-secondary)", marginTop: 4 }}>
                      Created {c.created}
                    </div>
                  </td>
                  <td>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                      <StatusPill s={statusOf(c)}/>
                      {c.hasWorkingCopy ? <WorkingCopyChip/> : null}
                    </div>
                  </td>
                  <td>
                    <div className="channel-stack">
                      {c.channels.map(k => <ChannelChip key={k} kind={k}/>)}
                    </div>
                  </td>
                  <td>{c.sampling}%</td>
                  <td>{c.owner}</td>
                  <td>{c.updated}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ========================= Create New Survey Campaign ========================= */

const DEFAULT_CAMPAIGN = {
  name: "",
  description: "",
  ongoing: true,
  startDate: "2026-05-12",
  endDate: "",
  channels: ["digital"],
  queues: ["All queues"],
  teams: ["All teams"],

  samplingPct: 50,
  minCustomerTurns: 3,
  minAgentTurns: 2,
  perAgentPerDay: 3,

  suppressOptOut: true,
  suppressRecent: true,
  recentDays: 30,
  suppressInternal: true,

  triggerEvent: "Post-digital interaction",
  delay: "Immediate",
  delayValue: 0,

  surveyDesignId: "csat-quick",
};

function FieldRow({ label, hint, req, children }) {
  return (
    <div className="field-row">
      <label className="field-label">
        {label}{req ? <span className="req">*</span> : null}
        {hint ? <span className="hint">{hint}</span> : null}
      </label>
      <div className="field-control">{children}</div>
    </div>
  );
}

function Segmented({ options, value, onChange }) {
  return (
    <div className="seg">
      {options.map(o => (
        <button key={o} className={value === o ? "on" : ""} onClick={() => onChange(o)}>{o}</button>
      ))}
    </div>
  );
}

function Toggle({ checked, onChange, label }) {
  return (
    <label className="switch-row">
      <span className="switch">
        <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)}/>
        <span className="slider"/>
      </span>
      {label ? <span>{label}</span> : null}
    </label>
  );
}

function ChipWell({ values, onChange, placeholder, brand }) {
  const [draft, setDraft] = React.useState("");
  function addChip(v) {
    v = v.trim();
    if (!v) return;
    if (values.includes(v)) return;
    onChange([...values, v]);
    setDraft("");
  }
  return (
    <div className="chip-well">
      {values.map(v => (
        <span key={v} className={`chip ${brand ? "brand" : ""}`}>
          {v}
          <span className="x" onClick={() => onChange(values.filter(x => x !== v))}>
            <svg viewBox="0 0 16 16" width="10" height="10"><line x1="4" y1="4" x2="12" y2="12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/><line x1="12" y1="4" x2="4" y2="12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
          </span>
        </span>
      ))}
      <input
        placeholder={placeholder}
        value={draft}
        onChange={e => setDraft(e.target.value)}
        onKeyDown={e => { if (e.key === "Enter" || e.key === ",") { e.preventDefault(); addChip(draft); } }}
        onBlur={() => addChip(draft)}
      />
    </div>
  );
}

function FormSection({ num, title, sub, defaultOpen = true, complete, children, id }) {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <section className={`form-section ${open ? "" : "collapsed"}`} id={id}>
      <header className={`form-section-head ${complete ? "complete" : ""}`} onClick={() => setOpen(!open)}>
        <span className="step-num">{num}</span>
        <div>
          <h3>{title}</h3>
          {sub ? <div className="sub">{sub}</div> : null}
        </div>
        <svg className="chev" viewBox="0 0 16 16"><path d="M3.5 6 8 10.5 12.5 6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </header>
      <div className="form-section-body">{children}</div>
    </section>
  );
}

function FiDatePicker({ value, onChange, disabled, placeholder = "Select date" }) {
  const ref = React.useRef(null);
  const fmt = (iso) => {
    if (!iso) return "";
    const [y, m, d] = iso.split("-").map(Number);
    if (!y || !m || !d) return "";
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return `${months[m-1]} ${String(d).padStart(2,"0")}, ${y}`;
  };
  return (
    <div style={{ position: "relative", flex: 1, minWidth: 160 }}>
      <input
        type="text"
        readOnly
        className="fi-input"
        placeholder={placeholder}
        disabled={disabled}
        value={fmt(value)}
        onClick={() => !disabled && (ref.current?.showPicker ? ref.current.showPicker() : ref.current?.focus())}
        style={{ cursor: disabled ? "not-allowed" : "pointer", paddingRight: 36 }}
      />
      <svg viewBox="0 0 24 24" width="14" height="14"
        style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
          color: disabled ? "var(--lyra-slate-300)" : "var(--lyra-slate-500)", pointerEvents: "none" }}
        stroke="currentColor" fill="none" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="16" rx="2"/>
        <line x1="3" y1="9" x2="21" y2="9"/>
        <line x1="8" y1="3" x2="8" y2="7"/>
        <line x1="16" y1="3" x2="16" y2="7"/>
      </svg>
      <input
        ref={ref}
        type="date"
        value={value || ""}
        disabled={disabled}
        onChange={e => onChange(e.target.value)}
        style={{
          position: "absolute", inset: 0, opacity: 0, pointerEvents: "none",
          width: "100%", height: "100%", border: 0,
        }}
      />
    </div>
  );
}

function CreateCampaign({ onCancel, onSave }) {
  const [c, setC] = React.useState(DEFAULT_CAMPAIGN);
  const [activeStep, setActiveStep] = React.useState(1);
  const set = (k, v) => setC(prev => ({ ...prev, [k]: v }));

  const STEPS = [
    { n: 1, label: "Identity & Scope", id: "sec-1", done: !!c.name },
    { n: 2, label: "Volume & Sampling", id: "sec-2", done: c.samplingPct > 0 },
    { n: 3, label: "Suppression Rules", id: "sec-3", done: true },
    { n: 4, label: "Trigger Rules", id: "sec-4", done: true },
  ];

  return (
    <div className="pane" style={{ overflow: "hidden" }}>
      <div className="crumbs">
        <a href="#" onClick={e => { e.preventDefault(); onCancel(); }}>Feedback Intelligence</a>
        <span className="sep">/</span>
        <a href="#" onClick={e => { e.preventDefault(); onCancel(); }}>Survey Campaigns</a>
        <span className="sep">/</span>
        <span className="last">Create New Survey Campaign</span>
      </div>

      <div className="pane-head" style={{ paddingTop: 6 }}>
        <h1>Create New Survey Campaign</h1>
        <div className="head-actions">
          <button className="ai-sparkle-btn">
            <svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2 13.5 10.5 22 12 13.5 13.5 12 22 10.5 13.5 2 12 10.5 10.5Z"/></svg>
            Suggest from past campaigns
          </button>
          <button className="btn" onClick={onCancel}>Cancel</button>
          <button className="btn" onClick={() => onSave({ ...c, status: "draft" })}>Save as draft</button>
          <button className="btn primary" disabled={!c.name} onClick={() => onSave({ ...c, status: "active" })}>
            Review &amp; activate
          </button>
        </div>
      </div>

      <div className="create-grid">
        {/* Side TOC */}
        <nav className="form-toc">
          {STEPS.map(s => (
            <div key={s.n}
              className={`toc-item ${activeStep === s.n ? "on" : ""} ${s.done ? "done" : ""}`}
              onClick={() => {
                setActiveStep(s.n);
                document.getElementById(s.id)?.scrollIntoView({ block: "start", behavior: "smooth" });
              }}>
              <span className="num">{s.n}</span>
              {s.label}
            </div>
          ))}
        </nav>

        {/* Form pane */}
        <div className="form-pane">
          <FormSection num={1} title="Campaign Identity & Scope"
            sub="Name, scope, channels & agent teams. Routing priority is set on the campaign lists."
            id="sec-1" complete={!!c.name}>
            {/* 2-col: Name + Description with char counter (Lyra layout) */}
            <div className="field-grid-2">
              <div className="field-cell">
                <label className="field-label">Campaign Name<span className="req">*</span></label>
                <input className="fi-input" placeholder="Type"
                  value={c.name} onChange={e => set("name", e.target.value)}/>
              </div>
              <div className="field-cell">
                <label className="field-label">
                  Description
                  <span className="char-counter">{(c.description || "").length}/100</span>
                </label>
                <input className="fi-input" maxLength={100} placeholder="Type"
                  value={c.description} onChange={e => set("description", e.target.value)}/>
              </div>
            </div>

            {/* Inline warning banner when name is missing (Lyra alert/warning style) */}
            {!c.name && (
              <div className="val-banner" style={{ margin: "var(--space-2) 0 var(--space-3)" }}>
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="1.8" fill="none">
                  <circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12" y2="12"/><circle cx="12" cy="16" r=".8" fill="currentColor"/>
                </svg>
                Campaign needs a name before it can be activated.
              </div>
            )}

            {/* Active Date Range — 2-col grid: Start Date | End Date */}
            <div style={{ padding: "var(--space-3) 0", borderTop: "1px solid var(--color-border-subtle)" }}>
              <div className="field-label" style={{ marginBottom: "var(--space-3)" }}>Active Date Range</div>
              <div className="field-grid-2" style={{ padding: 0, borderTop: 0 }}>
                <div className="field-cell">
                  <label className="field-label" style={{ fontWeight: 400, color: "var(--color-fg-default)" }}>Start Date</label>
                  <FiDatePicker value={c.startDate} onChange={v => set("startDate", v)} placeholder="Oct 30, 2025"/>
                </div>
                <div className="field-cell">
                  <label className="field-label" style={{ fontWeight: 400, color: "var(--color-fg-default)" }}>End Date</label>
                  <FiDatePicker value={c.endDate} onChange={v => set("endDate", v)} disabled={c.ongoing} placeholder="Oct 30, 2025"/>
                </div>
              </div>
            </div>

            {/* Lyra checkboxes for Channels */}
            <FieldRow label="Channels" req hint="Voice arrives later — articulation planning">
              <div className="lyra-check-group">
                {[
                  { k: "digital", l: "Digital", icon: "digital" },
                  { k: "voice",   l: "Voice (Later)", icon: "voice", disabled: true },
                ].map(opt => {
                  const on = c.channels.includes(opt.k);
                  return (
                    <label key={opt.k} className={`lyra-check ${opt.disabled ? "disabled" : ""}`}>
                      <input type="checkbox" checked={on} disabled={opt.disabled}
                        onChange={() => set("channels",
                          on ? c.channels.filter(x => x !== opt.k) : [...c.channels, opt.k])}/>
                      <ChannelChip kind={opt.icon}/>
                      <span>{opt.l}</span>
                    </label>
                  );
                })}
              </div>
            </FieldRow>

            {/* Agents section — heading + 2-col select dropdowns + bordered total */}
            <div className="section-heading">Agents</div>
            <div className="field-grid-2">
              <div className="field-cell">
                <label className="field-label">Agent Teams<span className="req">*</span></label>
                <select className="fi-input"
                  value={c.queues?.[0] || ""}
                  onChange={e => set("queues", e.target.value ? [e.target.value] : [])}>
                  <option value="">Select Teams</option>
                  <option value="Tier 1 Billing">Tier 1 Billing</option>
                  <option value="Tier 2 Support">Tier 2 Support</option>
                  <option value="Sales">Sales</option>
                  <option value="Retention">Retention</option>
                </select>
                <span className="hint" style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 400, lineHeight: "16px", letterSpacing: "0.2px", color: "var(--color-fg-secondary)" }}>
                  You must select atleast one team
                </span>
              </div>
              <div className="field-cell">
                <label className="field-label">Agent Group<span className="req">*</span></label>
                <select className="fi-input"
                  value={c.teams?.[0] || ""}
                  onChange={e => set("teams", e.target.value ? [e.target.value] : [])}>
                  <option value="">Select Group</option>
                  <option value="North America">North America</option>
                  <option value="EMEA">EMEA</option>
                  <option value="APAC">APAC</option>
                </select>
              </div>
            </div>
            {/* "Current Total..." in a bordered box — looks like a read-only input */}
            <div style={{
              display: "flex", alignItems: "center",
              marginTop: "var(--space-3)",
              padding: "0 var(--space-3)",
              height: 36,
              background: "var(--lyra-white)",
              border: "1px solid var(--color-border-soft)",
              borderRadius: "var(--radius-md)",
              fontFamily: "var(--font-sans)",
              fontSize: 14, fontWeight: 400, lineHeight: "20px",
              color: "var(--color-fg-default)",
            }}>
              Current Total Number Of Agents Selected: <strong style={{ marginLeft: 4 }}>{(c.queues?.length || 0) + (c.teams?.length || 0)}</strong>
            </div>

            <FieldRow label="Routing Priority">
              <div className="info-banner" style={{ margin: 0 }}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="9"/><path d="M12 16v-4M12 8h.01"/>
                </svg>
                <span>Priority is now set by drag-to-reorder on the campaigns list — not on this form.</span>
              </div>
            </FieldRow>

            {/* Lyra checkboxes for Language */}
            <FieldRow label="Language" hint="Locked for MVP — additional languages coming post-GA">
              <div className="lyra-check-group">
                <label className="lyra-check">
                  <input type="checkbox" checked readOnly disabled/>
                  <span>English</span>
                </label>
                <label className="lyra-check disabled">
                  <input type="checkbox" disabled/>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                    <svg viewBox="0 0 24 24" width="11" height="11" stroke="currentColor" fill="none" strokeWidth="1.8">
                      <rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>
                    </svg>
                    MVP
                  </span>
                </label>
              </div>
            </FieldRow>
          </FormSection>

          <FormSection num={2} title="Volume & Sampling"
            sub="How many interactions get a survey, & which ones."
            id="sec-2" complete={c.samplingPct > 0}>
            {/* Sampling % slider with 0–100 marker labels and "Interactions Surveyed" line */}
            <FieldRow label="Sampling %" hint="">
              <div>
                <input type="range" min="0" max="100" step="10" value={c.samplingPct}
                  style={{ width: "100%", accentColor: "var(--color-fg-active-strong)" }}
                  onChange={e => set("samplingPct", parseInt(e.target.value))}/>
                <div style={{
                  display: "flex", justifyContent: "space-between",
                  marginTop: 4,
                  fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 400, lineHeight: "16px",
                  letterSpacing: "0.2px", color: "var(--color-fg-secondary)",
                }}>
                  {[0,10,20,30,40,50,60,70,80,90,100].map(n => <span key={n}>{n}</span>)}
                </div>
                {/* Interactions Surveyed — Lyra read-only style bordered box */}
                <div style={{
                  display: "flex", alignItems: "center",
                  marginTop: "var(--space-3)",
                  padding: "0 var(--space-3)",
                  height: 36,
                  background: "var(--lyra-white)",
                  border: "1px solid var(--color-border-soft)",
                  borderRadius: "var(--radius-md)",
                  fontFamily: "var(--font-sans)",
                  fontSize: 14, fontWeight: 400, lineHeight: "20px",
                  color: "var(--color-fg-default)",
                }}>
                  Interactions Surveyed: <strong style={{ marginLeft: 4 }}>{Math.round(c.samplingPct * 2 / 3)} Interactions Daily</strong>
                </div>
              </div>
            </FieldRow>

            {/* Interaction Length Filter — Customer turns + Agent turns in 2-col grid */}
            <div className="section-heading">Interaction Length Filter</div>
            <div className="field-grid-2">
              <div className="field-cell">
                <label className="field-label">Customer turns greater than</label>
                <input type="number" min="1" max="20" className="fi-input"
                  value={c.minCustomerTurns} onChange={e => set("minCustomerTurns", parseInt(e.target.value || 0))}/>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 400, lineHeight: "16px", letterSpacing: "0.2px", color: "var(--color-fg-secondary)" }}>
                  Help text
                </span>
              </div>
              <div className="field-cell">
                <label className="field-label">Agent turns greater than</label>
                <input type="number" min="1" max="20" className="fi-input"
                  value={c.minAgentTurns} onChange={e => set("minAgentTurns", parseInt(e.target.value || 0))}/>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 400, lineHeight: "16px", letterSpacing: "0.2px", color: "var(--color-fg-secondary)" }}>
                  Help text
                </span>
              </div>
            </div>

            <FieldRow label="Surveys per agent per day"
              hint="Caps how many of one agent's interactions can be surveyed daily">
              <input type="number" className="fi-input" style={{ maxWidth: 240 }}
                value={c.perAgentPerDay} onChange={e => set("perAgentPerDay", parseInt(e.target.value || 0))}/>
            </FieldRow>
          </FormSection>

          <FormSection num={3} title="Suppression Rules"
            sub="When not to send surveys, even if everything else qualifies"
            id="sec-3" complete>
            <div className="sup-row">
              <Toggle checked={c.suppressOptOut} onChange={v => set("suppressOptOut", v)}/>
              <div className="meta">
                <div className="title">
                  Opt-Out Tag
                  <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" fill="none" strokeWidth="1.8" style={{ marginLeft: 4, color: "var(--color-fg-secondary)" }}>
                    <circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 0 1 5 .5c0 1.5-2 2.2-2.5 3.2"/><circle cx="12" cy="16.5" r=".6" fill="currentColor"/>
                  </svg>
                </div>
                <div className="ex">Skip any customer flagged as opted out in the platform. A customer who previously unsubscribed — sending anyway destroys trust and risks compliance.</div>
              </div>
            </div>
            <div className="sup-row">
              <Toggle checked={c.suppressRecent} onChange={v => set("suppressRecent", v)}/>
              <div className="meta">
                <div className="title">
                  Recency window
                  <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" fill="none" strokeWidth="1.8" style={{ marginLeft: 4, color: "var(--color-fg-secondary)" }}>
                    <circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 0 1 5 .5c0 1.5-2 2.2-2.5 3.2"/><circle cx="12" cy="16.5" r=".6" fill="currentColor"/>
                  </svg>
                </div>
                <div className="ex" style={{ marginTop: 6 }}>Don't send if the same customer was surveyed within (X Days)</div>
                <div className="inline-row" style={{ marginTop: 8 }}>
                  <input type="number" className="fi-input" style={{ width: 120 }}
                    value={c.recentDays} onChange={e => set("recentDays", parseInt(e.target.value || 0))}
                    disabled={!c.suppressRecent}/>
                  <span style={{ color: "var(--color-fg-secondary)", fontSize: 14, lineHeight: "20px" }}>Days</span>
                </div>
              </div>
            </div>
            <div className="sup-row">
              <Toggle checked={c.suppressInternal} onChange={() => {}} disabled/>
              <div className="meta">
                <div className="title">
                  Internal / test interactions
                  <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" fill="none" strokeWidth="1.8" style={{ marginLeft: 4, color: "var(--color-fg-secondary)" }}>
                    <circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 0 1 5 .5c0 1.5-2 2.2-2.5 3.2"/><circle cx="12" cy="16.5" r=".6" fill="currentColor"/>
                  </svg>
                </div>
                <div className="ex">Suppress interactions flagged as internal or test. Hard-coded — QA agents testing IVR flows never generate customer surveys.</div>
              </div>
            </div>
          </FormSection>

          <FormSection num={4} title="Trigger Rules"
            sub="Event and delay conditions that fire a survey"
            id="sec-4" complete>
            {/* Trigger Event as Lyra checkboxes (Post Digital Interaction + Post Call) */}
            <FieldRow label="Trigger Event" req hint="">
              <div className="lyra-check-group">
                <label className="lyra-check">
                  <input type="checkbox"
                    checked={c.triggerEvent === "Post-digital interaction"}
                    onChange={() => set("triggerEvent", "Post-digital interaction")}/>
                  <ChannelChip kind="digital"/>
                  <span>Post Digital Interaction</span>
                </label>
                <label className="lyra-check disabled">
                  <input type="checkbox" disabled/>
                  <ChannelChip kind="voice"/>
                  <span>Post Call</span>
                </label>
              </div>
            </FieldRow>

            {/* Delay — Lyra toggle group: Immediate | Minutes | Hours */}
            <FieldRow label="Delay" hint="Allows a cooling-off period before the survey lands">
              <Segmented options={["Immediate", "Minutes", "Hours"]}
                value={c.delay} onChange={v => set("delay", v)}/>
              {c.delay !== "Immediate" && (
                <div className="inline-row" style={{ marginTop: "var(--space-2)" }}>
                  <input type="number" className="fi-input" style={{ width: 100 }}
                    value={c.delayValue || 5} onChange={e => set("delayValue", parseInt(e.target.value || 0))}/>
                  <span style={{ color: "var(--color-fg-secondary)", fontSize: 14, lineHeight: "20px" }}>{c.delay.toLowerCase()} after end</span>
                </div>
              )}
            </FieldRow>
          </FormSection>


          {!c.name ? (
            <div className="val-banner">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="1.8" fill="none"><circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12" y2="12"/><circle cx="12" cy="16" r=".8" fill="currentColor"/></svg>
              Campaign needs a name before it can be activated.
            </div>
          ) : null}

          <div className="form-foot">
            <span className="muted" style={{ font: "400 12px/16px Inter" }}>
              All changes auto-saved as draft · Last edited just now
            </span>
            <span className="grow"/>
            <button className="btn" onClick={onCancel}>Cancel</button>
            <button className="btn" onClick={() => onSave({ ...c, status: "draft" })}>Save as draft</button>
            <button className="btn primary" disabled={!c.name}
              onClick={() => onSave({ ...c, status: "active" })}>
              Review &amp; activate
            </button>
          </div>
        </div>

        {/* Right side: Campaign Summary side panel (per Lyra Full Page layout) */}
        <aside className="summary-pane">
          <FloatingMetrics campaign={c}/>
        </aside>
      </div>
    </div>
  );
}

/* ============================== Campaign Detail ============================== */

function MiniBar({ data, max, color = "var(--fi-accent)", labels }) {
  const m = max || Math.max(...data, 1);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 120, padding: "0 var(--space-1)" }}>
      {data.map((v, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <div style={{
            width: "100%",
            height: `${(v / m) * 100}%`,
            background: color,
            borderRadius: "4px 4px 0 0",
            minHeight: 2,
            opacity: 0.85,
          }}/>
          <div style={{ font: "400 12px/16px Inter", color: "var(--lyra-slate-500)" }}>{labels?.[i]}</div>
        </div>
      ))}
    </div>
  );
}

function DonutRing({ value, max = 100, color = "var(--fi-accent)", size = 96, label, sub }) {
  const r = (size - 14) / 2;
  const C = 2 * Math.PI * r;
  const off = C - (value / max) * C;
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--lyra-slate-200)" strokeWidth="10"/>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="10"
          strokeDasharray={C} strokeDashoffset={off} strokeLinecap="round"
          transform={`rotate(-90 ${size/2} ${size/2})`}/>
      </svg>
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
      }}>
        <div style={{ font: "700 20px/24px Inter", color: "var(--lyra-slate-900)", letterSpacing: "-0.02em" }}>{label}</div>
        {sub ? <div style={{ font: "500 12px/16px Inter", color: "var(--lyra-slate-500)" }}>{sub}</div> : null}
      </div>
    </div>
  );
}

const RECENT_RESPONSES = [
  { id: 1, rating: 1, customer: "C-48201", agent: "Alice Johnson", topic: "Billing dispute", sentiment: "Negative", time: "2m ago", flagged: true, comment: "Agent transferred me 3 times. Still no resolution on the duplicate charge." },
  { id: 2, rating: 5, customer: "C-48198", agent: "Bob Smith",     topic: "Plan upgrade",    sentiment: "Positive", time: "8m ago", flagged: false, comment: "Bob made it painless. Upgrade took 4 minutes." },
  { id: 3, rating: 2, customer: "C-48177", agent: "Charlie Davis", topic: "Modem swap",      sentiment: "Negative", time: "23m ago", flagged: true, comment: "Was promised same-day shipping, but tracking still shows pending." },
  { id: 4, rating: 4, customer: "C-48160", agent: "Diana Evans",   topic: "Address change",  sentiment: "Neutral",  time: "41m ago", flagged: false, comment: "Easy enough. Took a bit longer than I expected." },
  { id: 5, rating: 5, customer: "C-48142", agent: "Ethan Foster",  topic: "Refund inquiry",  sentiment: "Positive", time: "1h ago",  flagged: false, comment: "Ethan went the extra mile to find the missing transaction." },
  { id: 6, rating: 1, customer: "C-48129", agent: "Hannah Hall",   topic: "Service outage",  sentiment: "Negative", time: "1h ago",  flagged: true, comment: "Third outage this month. No credit offered without me asking." },
];

const TOP_TOPICS = [
  { name: "Billing dispute", pct: 24, delta: "+6", trend: "up" },
  { name: "Service outage",  pct: 18, delta: "+3", trend: "up" },
  { name: "Plan upgrade",    pct: 12, delta: "-1", trend: "down" },
  { name: "Address change",  pct: 9,  delta: "0",  trend: "flat" },
  { name: "Refund inquiry",  pct: 8,  delta: "-2", trend: "down" },
];

function Stars({ n, size = 14 }) {
  return (
    <span style={{ display: "inline-flex", gap: 1, color: "#efb840" }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} viewBox="0 0 24 24" width={size} height={size}
          fill={i <= n ? "currentColor" : "var(--lyra-slate-200)"}>
          <polygon points="12 2 15 9 22 9.3 16.5 14 18.5 21 12 17 5.5 21 7.5 14 2 9.3 9 9"/>
        </svg>
      ))}
    </span>
  );
}

function FloatingMetrics({ campaign }) {
  const c = campaign;
  const hasData = c.sent > 0;
  /* Lyra "Campaign Summary" side panel — clean title + two stacked metric blocks. */
  const sectionStyle = {
    padding: "var(--space-4)",
    borderBottom: "1px solid var(--color-border-subtle)",
  };
  const labelStyle = {
    fontFamily: "var(--font-sans)",
    fontSize: 12, fontWeight: 500, lineHeight: "16px",
    letterSpacing: "0.06em", textTransform: "uppercase",
    color: "var(--color-fg-secondary)",
  };
  const valueStyle = {
    marginTop: "var(--space-2)",
    fontFamily: "var(--font-sans)",
    fontSize: 24, fontWeight: 600, lineHeight: "28px", letterSpacing: "-0.02rem",
    color: hasData ? "var(--color-fg-default)" : "var(--lyra-slate-300)",
  };
  const hintStyle = {
    marginTop: "var(--space-1)",
    fontFamily: "var(--font-sans)",
    fontSize: 12, fontWeight: 400, lineHeight: "16px", letterSpacing: "0.2px",
    color: "var(--color-fg-secondary)",
  };
  return (
    <div style={{
      width: "100%",
      background: "var(--lyra-white)",
      border: "1px solid var(--color-border-subtle)",   /* Lyra: border/subtle */
      borderRadius: "var(--radius-lg)",                  /* Lyra: radius/lg = 12px */
      boxShadow: "0px 2px 6px 0px rgba(0,0,0,0.04)",     /* Lyra: Shadow sm */
      overflow: "hidden",
    }}>
      <div style={{ ...sectionStyle, paddingBottom: "var(--space-3)" }}>
        <div style={labelStyle}>Campaign Summary</div>
      </div>
      <div style={sectionStyle}>
        <div style={labelStyle}>Total Surveys Sent</div>
        <div style={valueStyle}>{hasData ? c.sent.toLocaleString() : "—"}</div>
        <div style={hintStyle}>{hasData ? `Since ${c.created}` : "No surveys sent yet"}</div>
      </div>
      <div style={{ ...sectionStyle, borderBottom: 0 }}>
        <div style={labelStyle}>Avg Completion Rate</div>
        <div style={valueStyle}>{hasData ? `${c.completion.toFixed(1)}%` : "—"}</div>
        <div style={hintStyle}>Industry benchmark: 25–35%</div>
      </div>
    </div>
  );
}

function CampaignDetail({ campaign, onBack, onEdit }) {
  const [c, setC] = React.useState(campaign);
  const [toast, setToast] = React.useState(null);
  React.useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2800);
    return () => clearTimeout(t);
  }, [toast]);

  const publishWorkingCopy = () => {
    setC({ ...c, hasWorkingCopy: false, publishedVersion: c.workingCopyVersion, publishedAt: "May 13, 2026" });
    setToast({ msg: `Working copy published as v${c.workingCopyVersion}. Campaign is now live with new configuration.` });
  };
  const discardWorkingCopy = () => {
    if (!window.confirm("Discard all unpublished changes? The campaign will return to v" + c.publishedVersion + ".")) return;
    setC({ ...c, hasWorkingCopy: false });
    setToast({ msg: `Working copy discarded. v${c.publishedVersion} remains active.` });
  };

  const routingPos = (() => {
    const routing = CAMPAIGNS.filter(x => x.status === "active" || x.status === "paused");
    const idx = routing.findIndex(x => x.id === c.id);
    return idx >= 0 ? { pos: idx + 1, total: routing.length } : null;
  })();

  return (
    <div className="pane" style={{ overflow: "hidden" }}>
      <div className="crumbs">
        <a href="#" onClick={e => { e.preventDefault(); onBack(); }}>Feedback Intelligence</a>
        <span className="sep">/</span>
        <a href="#" onClick={e => { e.preventDefault(); onBack(); }}>Survey Campaigns</a>
        <span className="sep">/</span>
        <span className="last">{c.name}</span>
      </div>

      {/* Page header — title + action buttons (no inline badges per design) */}
      <div className="pane-head" style={{ paddingTop: 6 }}>
        <h1 style={{ flex: 1, margin: 0 }}>{c.name}</h1>
        <div className="head-actions">
          <button className="btn">
            <svg viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
            {c.status === "active" ? "Pause" : "Resume"}
          </button>
          <button className="btn">
            <svg viewBox="0 0 24 24"><rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/></svg>
            Duplicate
          </button>
          <button className="btn primary" onClick={() => onEdit(c)}>
            <svg viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>
            Edit Configuration
          </button>
          <div className="kebab">
            <svg viewBox="0 0 24 24"><circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/></svg>
          </div>
        </div>
      </div>

      {/* Meta row — info dot-separated on left, status badges on right */}
      <div style={{
        display: "flex", alignItems: "center", gap: "var(--space-3)",
        padding: "0 var(--space-8) var(--space-4)",
      }}>
        <div style={{
          flex: 1,
          fontFamily: "var(--font-sans)",
          fontSize: 14, fontWeight: 400, lineHeight: "20px", letterSpacing: 0,
          color: "var(--color-fg-secondary)",
        }}>
          <strong style={{ color: "var(--color-fg-default)", fontWeight: 500 }}>Owner:</strong> {c.owner}
          <span style={{ margin: "0 var(--space-2)" }}>•</span>
          <strong style={{ color: "var(--color-fg-default)", fontWeight: 500 }}>Created:</strong> {c.created}
          <span style={{ margin: "0 var(--space-2)" }}>•</span>
          <strong style={{ color: "var(--color-fg-default)", fontWeight: 500 }}>Last Updated:</strong> {c.updated}
          {routingPos && (
            <>
              <span style={{ margin: "0 var(--space-2)" }}>•</span>
              <strong style={{ color: "var(--color-fg-default)", fontWeight: 500 }}>Routing Position:</strong> {routingPos.pos} out of {routingPos.total}
            </>
          )}
        </div>
        <div style={{ display: "flex", gap: "var(--space-2)" }}>
          <StatusPill s={c.status}/>
          {c.hasWorkingCopy ? <WorkingCopyChip/> : null}
        </div>
      </div>

      {c.hasWorkingCopy ? (
        <div className="working-banner" style={{ margin: "0 var(--space-8) var(--space-4)" }}>
          <div className="working-banner-ico">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/>
            </svg>
          </div>
          <div className="working-banner-body">
            <div className="working-banner-title">This campaign has unpublished changes</div>
            <div className="working-banner-sub">
              Active version <strong>v{c.publishedVersion}</strong> (published {c.publishedAt}) continues to run.
              Working copy <strong>v{c.workingCopyVersion}</strong> was edited by {c.workingCopyEditedBy} on {c.workingCopyEditedAt}.
            </div>
          </div>
          <div className="working-banner-actions">
            <button className="btn" onClick={discardWorkingCopy}>
              <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>
              Discard Changes
            </button>
            <button className="btn primary" onClick={publishWorkingCopy}>
              <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 13 10 19 20 5"/></svg>
              Publish V{c.workingCopyVersion}
            </button>
          </div>
        </div>
      ) : null}

      <div style={{ flex: 1, overflow: "auto", padding: "0 var(--space-8) var(--space-6)", background: "var(--lyra-white)" }}>
        <CampaignSummaryCard campaign={c}/>
        <ConfigurationView campaign={c}/>
      </div>
      {toast ? (
        <div className="toast">
          <svg viewBox="0 0 24 24"><polyline points="4 13 10 19 20 5"/></svg>
          {toast.msg}
        </div>
      ) : null}
    </div>
  );
}

/* Campaign Summary horizontal card — sits between meta row and config sections */
function CampaignSummaryCard({ campaign }) {
  const c = campaign;
  const hasData = c.sent > 0;
  return (
    <div style={{
      background: "var(--lyra-white)",
      border: "1px solid var(--color-border-subtle)",
      borderRadius: "var(--radius-lg)",
      boxShadow: "0px 2px 6px 0px rgba(0,0,0,0.04)",
      padding: "var(--space-5)",
      marginBottom: "var(--space-3)",
    }}>
      <div style={{
        fontFamily: "var(--font-sans)",
        fontSize: 16, fontWeight: 500, lineHeight: "24px", letterSpacing: "-0.01rem",
        color: "var(--color-fg-default)",
        marginBottom: "var(--space-4)",
      }}>
        Campaign Summary
      </div>
      <div style={{ display: "flex", gap: "var(--space-8)" }}>
        <SummaryMetric
          hint={hasData ? `Since ${c.created}` : "No surveys sent yet"}
          value={hasData ? c.sent.toLocaleString() : "—"}
          label="Total Surveys Sent"
        />
        <SummaryMetric
          hint="Industry benchmark: 25–35%"
          value={hasData ? `${c.completion.toFixed(1)}%` : "—"}
          label="Avg Completion Rate"
        />
      </div>
    </div>
  );
}

function SummaryMetric({ hint, value, label }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <div style={{
        fontFamily: "var(--font-sans)",
        fontSize: 12, fontWeight: 400, lineHeight: "16px", letterSpacing: "0.2px",
        color: "var(--color-fg-secondary)",
      }}>
        {hint}
      </div>
      <div style={{
        fontFamily: "var(--font-sans)",
        fontSize: 24, fontWeight: 600, lineHeight: "28px", letterSpacing: "-0.02rem",
        color: "var(--color-fg-default)",
      }}>
        {value}
      </div>
      <div style={{
        fontFamily: "var(--font-sans)",
        fontSize: 14, fontWeight: 400, lineHeight: "20px", letterSpacing: 0,
        color: "var(--color-fg-default)",
      }}>
        {label}
      </div>
    </div>
  );
}

/* DefRow — read-only label/value row inside a config section.
   Matches the design: "Label:" on left at 200px width, value on right with the
   regular Lyra Body-md weight; rows separated by border/subtle. */
function DefRow({ label, children }) {
  return (
    <div style={{
      display: "flex", alignItems: "flex-start",
      padding: "var(--space-3) 0",
      borderTop: "1px solid var(--color-border-subtle)",
      fontFamily: "var(--font-sans)",
      fontSize: 14, fontWeight: 400, lineHeight: "20px", letterSpacing: 0,
      color: "var(--color-fg-default)",
    }}>
      <div style={{
        flex: "0 0 200px",
        fontWeight: 500,
        color: "var(--color-fg-default)",
      }}>
        {label}:
      </div>
      <div style={{ flex: 1, fontWeight: 400 }}>{children}</div>
    </div>
  );
}

/* ConfigGroup — collapsible Lyra form-section card for read-only display. */
function ConfigGroup({ title, num, children, defaultOpen = true }) {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <section className={`form-section ${open ? "" : "collapsed"}`} style={{ marginBottom: "var(--space-3)" }}>
      <header className="form-section-head" onClick={() => setOpen(!open)}>
        <span className="step-num">{num}</span>
        <h3 style={{ margin: 0 }}>{title}</h3>
        <svg className="chev" viewBox="0 0 16 16">
          <path d="M3.5 6 8 10.5 12.5 6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </header>
      <div className="form-section-body">{children}</div>
    </section>
  );
}

function ConfigurationView({ campaign }) {
  /* Read-only summary of the campaign config — matches the design exactly. */
  const routing = CAMPAIGNS.filter(x => x.status === "active" || x.status === "paused");
  const routingIdx = routing.findIndex(x => x.id === campaign.id);
  const routingText = (campaign.status === "active" || campaign.status === "paused") && routingIdx >= 0
    ? `Position ${routingIdx + 1} of ${routing.length} · You Can Reorder On The Campaigns List`
    : "—";

  return (
    <div>
      <ConfigGroup num="1" title="Campaign Identity & Scope">
        <DefRow label="Campaign Name">{campaign.name}</DefRow>
        <DefRow label="Active Date Range">Ongoing from {campaign.created}</DefRow>
        <DefRow label="Channels">
          <div className="channel-stack" style={{ gap: "var(--space-3)" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <ChannelChip kind="digital"/> Digital
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <ChannelChip kind="voice"/> Voice
            </span>
          </div>
        </DefRow>
        <DefRow label="Agent Teams">All Teams</DefRow>
        <DefRow label="Agents Groups">All Groups</DefRow>
        <DefRow label="Routing Priority">{routingText}</DefRow>
        <DefRow label="Language">English</DefRow>
      </ConfigGroup>

      <ConfigGroup num="2" title="Volume & Sampling">
        <DefRow label="Sampling">{campaign.sampling}% (Daily 20 Interactions Would Be Surveyed)</DefRow>
        <DefRow label="Min interaction length">≥ 3 customer turns • ≥ 2 agent turns</DefRow>
        <DefRow label="Per-agent cap">3 surveys / day</DefRow>
      </ConfigGroup>

      <ConfigGroup num="3" title="Suppression Rules">
        <DefRow label="Opt-out tag">Enabled</DefRow>
        <DefRow label="Recency window">Enabled • 30 Days</DefRow>
        <DefRow label="Internal / test">Always on (hard-coded)</DefRow>
      </ConfigGroup>

      <ConfigGroup num="4" title="Trigger Rules">
        <DefRow label="Trigger event">Post-digital interaction</DefRow>
        <DefRow label="Delay">Immediate</DefRow>
      </ConfigGroup>
    </div>
  );
}

Object.assign(window, { SurveyCampaignsGrid, CreateCampaign, CampaignDetail, ChannelChip, StatusPill, Sparkline, CAMPAIGNS, WorkingCopyChip, FilterChip });

import { useState, useRef, useEffect } from "react";

const CSS = `
*{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#f8f5ff;--card:#ffffff;--surface:#f3eeff;
  --purple:#7c3aed;--purple2:#6d28d9;--purpleL:#a78bfa;
  --purpleXL:#ede9fe;--purpleBorder:#e9d5ff;
  --text:#1a0a2e;--muted:#6b7280;--hint:#9ca3af;
  --border:rgba(124,58,237,.15);--b2:rgba(124,58,237,.08);
  --red:#dc2626;--rbg:rgba(220,38,38,.05);--rbc:rgba(220,38,38,.2);
  --green:#16a34a;--gbg:rgba(22,163,74,.05);--gbc:rgba(22,163,74,.18);
  --font:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
}
body{background:var(--bg);color:var(--text);font-family:var(--font);font-size:16px;
  -webkit-text-size-adjust:100%;min-height:100vh}
body{background:#ddd5f5;min-height:100vh}
.app{min-height:100vh;width:100%;max-width:430px;margin:0 auto;
  position:relative;background:#f8f5ff;overflow-x:hidden}
@media(min-width:431px){
  .app{box-shadow:0 0 40px rgba(124,58,237,.18),0 0 0 1px rgba(124,58,237,.12)}
  .share-modal{justify-content:center}
  .share-sheet{border-radius:20px}
}

/* HEADER */
.hdr{text-align:center;padding:24px 16px 16px}
.hdr-icon{font-size:28px;display:block;margin-bottom:6px;color:var(--purple)}
.hdr-title{font-size:26px;font-weight:600;color:var(--purple2);letter-spacing:-.01em}
.hdr-sub{font-size:12px;color:var(--muted);margin-top:3px;letter-spacing:.06em;text-transform:uppercase}

/* HISTORY STRIP */
.hist{background:var(--purpleXL);border:1px solid var(--purpleBorder);border-radius:12px;
  padding:12px 14px;margin:0 16px 12px;display:flex;gap:10px;align-items:flex-start}
.hist-icon{font-size:15px;flex-shrink:0;margin-top:2px}
.hist-text{font-size:12.5px;color:var(--purple2);line-height:1.6;font-style:italic}

/* WRAP */
.wrap{padding:0 16px 90px}

/* CTA BUTTON */
.btn-cta{width:100%;background:var(--purple);color:white;border:none;border-radius:14px;
  padding:16px;font-size:15px;font-weight:600;letter-spacing:.02em;cursor:pointer;
  display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:14px;
  transition:background .18s;-webkit-tap-highlight-color:transparent}
.btn-cta:active{background:var(--purple2)}
.btn-cta-icon{font-size:18px}

/* TODAY STRIP */
.today{background:var(--card);border:1px solid var(--purpleBorder);border-radius:12px;
  padding:12px 14px;margin-bottom:14px}
.today-lbl{font-size:10px;letter-spacing:.14em;color:var(--purpleL);text-transform:uppercase;
  font-weight:600;margin-bottom:8px}
.today-row{display:flex;gap:6px}
.today-item{flex:1;text-align:center}
.tv{font-size:12px;font-weight:600;color:var(--purple2)}
.tk{font-size:10px;color:var(--hint);margin-top:2px}

/* FEATURE GRID */
.feat-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px}
.fc{background:var(--card);border:1px solid var(--purpleBorder);border-radius:12px;
  padding:14px 12px;cursor:pointer;transition:all .18s;-webkit-tap-highlight-color:transparent}
.fc:active{background:var(--purpleXL);transform:scale(.98)}
.fc.hi{background:var(--purple);border-color:var(--purple)}
.fc-icon{font-size:22px;display:block;margin-bottom:6px}
.fc-name{font-size:13px;font-weight:600;color:var(--text)}
.fc.hi .fc-name{color:white}
.fc-desc{font-size:11px;color:var(--muted);margin-top:2px;line-height:1.4}
.fc.hi .fc-desc{color:rgba(255,255,255,.75)}

/* BOTTOM NAV */
.bnav{position:fixed;bottom:0;left:50%;transform:translateX(-50%);
  width:100%;max-width:430px;
  background:var(--card);border-top:1px solid var(--purpleBorder);
  display:flex;height:62px;z-index:100;padding-bottom:env(safe-area-inset-bottom)}
.bn{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;
  gap:3px;cursor:pointer;-webkit-tap-highlight-color:transparent}
.bn-icon{font-size:20px;color:var(--hint)}
.bn-label{font-size:9px;letter-spacing:.04em;color:var(--hint);text-transform:uppercase;font-weight:500}
.bn.act .bn-icon{color:var(--purple)}
.bn.act .bn-label{color:var(--purple)}
.bn-fab{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px}
.fab-circle{width:44px;height:44px;border-radius:50%;background:var(--purple);
  display:flex;align-items:center;justify-content:center;margin-top:-20px;
  box-shadow:0 4px 12px rgba(124,58,237,.35)}
.fab-icon{font-size:20px;color:white}
.fab-label{font-size:9px;letter-spacing:.04em;color:var(--purple);text-transform:uppercase;font-weight:600}

/* SCREEN HEADER BAR */
.screen-hdr{display:flex;align-items:center;gap:10px;padding:16px 16px 8px}
.back-btn{font-size:20px;color:var(--purple);cursor:pointer;padding:4px;
  -webkit-tap-highlight-color:transparent}
.screen-title{font-size:17px;font-weight:600;color:var(--text);flex:1}
.screen-action{font-size:12px;color:var(--purple);font-weight:500;cursor:pointer}

/* CARDS */
.card{background:var(--card);border:1px solid var(--purpleBorder);border-radius:14px;
  padding:16px;margin-bottom:12px}
.card-title{font-size:11px;letter-spacing:.14em;color:var(--purpleL);text-transform:uppercase;
  font-weight:600;margin-bottom:10px}
.card-value{font-size:22px;font-weight:600;color:var(--purple2);margin-bottom:4px}
.card-desc{font-size:14px;color:var(--muted);line-height:1.6}

/* SNAP BAR */
.snap-bar{display:flex;gap:6px;margin-bottom:14px;overflow-x:auto;
  padding:0 16px;-webkit-overflow-scrolling:touch}
.snap-bar::-webkit-scrollbar{display:none}
.snap-pill{background:var(--card);border:1px solid var(--purpleBorder);border-radius:20px;
  padding:7px 14px;flex-shrink:0;text-align:center}
.sp-val{font-size:12px;font-weight:600;color:var(--purple2)}
.sp-key{font-size:10px;color:var(--hint);margin-top:1px}

/* TOGGLE ROW */
.toggle-row{display:flex;gap:4px;background:var(--surface);border-radius:10px;
  padding:3px;margin-bottom:14px}
.tg-btn{flex:1;padding:7px 4px;text-align:center;border-radius:8px;
  font-size:11px;font-weight:500;color:var(--muted);cursor:pointer;
  transition:all .18s;-webkit-tap-highlight-color:transparent}
.tg-btn.on{background:var(--card);color:var(--purple);
  box-shadow:0 1px 4px rgba(0,0,0,.08)}

/* PLANET TABLE */
.ptable{width:100%;border-collapse:collapse;font-size:13px}
.ptable th{font-size:9.5px;letter-spacing:.1em;color:var(--purpleL);text-transform:uppercase;
  font-weight:600;padding:0 0 8px;text-align:left;border-bottom:1px solid var(--purpleBorder)}
.ptable td{padding:9px 0;border-bottom:1px solid var(--b2);vertical-align:middle}
.ptable tr:last-child td{border-bottom:none}
.p-sym{font-size:16px;width:28px}
.p-name{font-weight:500;color:var(--text)}
.p-sign{color:var(--purple2)}
.p-house{background:var(--purpleXL);color:var(--purple2);border-radius:4px;
  padding:2px 7px;font-size:11px;font-weight:500}
.p-deg{color:var(--hint);font-size:11.5px;font-family:monospace}

/* DAILY GUIDE GRID */
.dg-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.dg-card{background:var(--card);border:1px solid var(--purpleBorder);border-radius:12px;padding:12px}
.dg-label{font-size:9.5px;letter-spacing:.12em;color:var(--purpleL);text-transform:uppercase;
  font-weight:600;margin-bottom:4px}
.dg-value{font-size:14px;font-weight:600;color:var(--text)}
.dg-sub{font-size:11px;color:var(--muted);margin-top:2px}
.dg-badge{display:inline-block;font-size:10px;padding:2px 8px;border-radius:10px;margin-top:4px;font-weight:500}
.dg-badge.good{background:var(--gbg);color:var(--green)}
.dg-badge.bad{background:var(--rbg);color:var(--red)}
.dg-badge.neutral{background:var(--purpleXL);color:var(--purple2)}

/* TIME QUALITY GRID */
.tq-grid{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:10px}
.tq{border-radius:9px;padding:9px 11px;border:1px solid}
.tq.good{background:var(--gbg);border-color:var(--gbc)}
.tq.bad{background:var(--rbg);border-color:var(--rbc)}
.tq.neutral{background:var(--surface);border-color:var(--purpleBorder)}
.tq-name{font-size:12px;font-weight:600;color:var(--text);margin-bottom:2px}
.tq-time{font-size:11px;color:var(--muted);font-family:monospace}
.tq-tag{font-size:9.5px;font-weight:500;margin-top:3px;
  display:inline-block;padding:1px 6px;border-radius:6px}
.tq.good .tq-tag{background:var(--gbg);color:var(--green)}
.tq.bad .tq-tag{background:var(--rbg);color:var(--red)}
.tq.neutral .tq-tag{background:var(--purpleXL);color:var(--purple2)}

/* LIFE CYCLES (Dasha) */
.cycle-tree{display:flex;flex-direction:column;gap:6px}
.cycle-node{border-radius:12px;border:1px solid var(--purpleBorder);overflow:hidden}
.cycle-hdr{display:flex;align-items:center;gap:10px;padding:13px 14px;cursor:pointer;
  background:var(--card);-webkit-tap-highlight-color:transparent}
.cycle-hdr:active{background:var(--purpleXL)}
.cycle-node.curr>.cycle-hdr{background:var(--purpleXL);border-color:var(--purple)}
.cycle-node.past>.cycle-hdr{opacity:.4}
.cycle-lord{font-size:14px;font-weight:600;color:var(--text);flex:1}
.cycle-node.curr>.cycle-hdr .cycle-lord{color:var(--purple2)}
.cycle-yrs{font-size:12px;color:var(--muted)}
.cycle-arr{font-size:11px;color:var(--hint);transition:transform .2s;margin-left:4px}
.cycle-arr.open{transform:rotate(90deg)}
.cycle-children{padding:4px 8px 8px 26px;display:flex;flex-direction:column;gap:4px;
  border-top:1px solid var(--b2);background:var(--surface)}
.cycle-child{border-radius:9px;border:1px solid var(--b2);overflow:hidden}
.cycle-child-hdr{display:flex;align-items:center;gap:8px;padding:9px 12px;cursor:pointer;
  background:var(--card);-webkit-tap-highlight-color:transparent}
.cycle-child-hdr:active{background:var(--purpleXL)}
.cycle-child.curr-child>.cycle-child-hdr{background:var(--purpleXL);color:var(--purple2)}
.cycle-child-lord{font-size:12px;font-weight:500;color:var(--text);flex:1}
.cycle-child-yrs{font-size:11px;color:var(--muted)}
.cycle-child-arr{font-size:9px;color:var(--hint);transition:transform .2s}
.cycle-child-arr.open{transform:rotate(90deg)}
.cycle-grandchildren{padding:3px 6px 6px 20px;display:flex;flex-direction:column;gap:3px;
  background:var(--purpleXL)}
.cycle-grand{display:flex;align-items:center;gap:8px;padding:7px 10px;border-radius:8px;
  border:1px solid var(--purpleBorder);background:var(--card)}
.cycle-grand.curr-grand{background:var(--purpleXL);border-color:var(--purple)}
.cycle-grand-lord{font-size:11px;font-weight:500;color:var(--text);flex:1}
.cycle-grand.curr-grand .cycle-grand-lord{color:var(--purple2)}
.cycle-grand-yrs{font-size:10px;color:var(--muted);font-family:monospace}

/* INFLUENCES (Doshas) */
.inf-block{margin-bottom:16px}
.inf-header{display:flex;align-items:center;gap:10px;margin-bottom:8px}
.inf-icon{font-size:22px}
.inf-title{font-size:15px;font-weight:600;color:var(--text)}
.inf-sub{font-size:12px;color:var(--muted);margin-top:1px}
.inf-card{border-radius:12px;padding:14px 15px;border:1px solid;margin-bottom:6px}
.inf-card.active{background:var(--rbg);border-color:var(--rbc)}
.inf-card.clear{background:var(--gbg);border-color:var(--gbc)}
.inf-card.partial{background:var(--purpleXL);border-color:var(--purpleBorder)}
.inf-status{font-size:10px;letter-spacing:.12em;text-transform:uppercase;font-weight:600;margin-bottom:5px}
.inf-card.active .inf-status{color:var(--red)}
.inf-card.clear .inf-status{color:var(--green)}
.inf-card.partial .inf-status{color:var(--purple2)}
.inf-desc{font-size:14px;line-height:1.7;color:var(--text)}
.inf-detail{margin-top:10px;padding-top:10px;border-top:1px solid rgba(0,0,0,.06)}
.inf-row{display:flex;gap:6px;margin-bottom:4px;font-size:13px}
.inf-rl{font-size:10px;letter-spacing:.08em;color:var(--muted);text-transform:uppercase;
  min-width:60px;flex-shrink:0;font-weight:500}
.inf-rv{color:var(--text);flex:1}
.saturn-phases{display:flex;gap:5px;flex-wrap:wrap;margin-top:8px}
.saturn-ph{padding:6px 10px;border-radius:10px;font-size:10px;font-weight:500;
  border:1px solid var(--purpleBorder);color:var(--muted);text-align:center;line-height:1.5}
.saturn-ph.on{background:var(--rbg);color:var(--red);border-color:var(--rbc)}
.saturn-ph.off{opacity:.35}

/* COSMIC GIFTS (Yogas) */
.gift-group-title{font-size:10px;letter-spacing:.16em;color:var(--purpleL);
  text-transform:uppercase;font-weight:600;margin:16px 0 8px;
  padding-bottom:6px;border-bottom:1px solid var(--purpleBorder)}
.gift-group-title:first-child{margin-top:0}
.gift-grid{display:grid;grid-template-columns:1fr;gap:8px}
@media(min-width:380px){.gift-grid{grid-template-columns:1fr 1fr}}
.gift-card{border-radius:12px;padding:12px 14px;border:1px solid}
.gift-card.present{background:var(--purpleXL);border-color:var(--purpleBorder)}
.gift-card.absent{background:var(--card);border-color:var(--b2);opacity:.5}
.gift-type{font-size:9px;letter-spacing:.1em;text-transform:uppercase;
  color:var(--purpleL);font-weight:600;margin-bottom:4px}
.gift-name{font-size:12px;font-weight:600;color:var(--purple2);margin-bottom:4px}
.gift-desc{font-size:12px;line-height:1.6;color:var(--muted)}
.gift-detail{font-size:10.5px;color:var(--hint);margin-top:4px}
.gift-badge{display:inline-block;font-size:9.5px;font-weight:500;
  padding:2px 8px;border-radius:8px;margin-top:5px}
.gift-badge.yes{background:rgba(124,58,237,.12);color:var(--purple2)}
.gift-badge.no{background:var(--b2);color:var(--muted)}

/* TRANSITS */
.transit-row{display:flex;align-items:center;gap:10px;padding:10px 0;
  border-bottom:1px solid var(--b2)}
.transit-row:last-child{border-bottom:none}
.t-planet{font-size:11px;font-weight:600;color:var(--text);width:68px;flex-shrink:0}
.t-sign{color:var(--purple2);font-size:13px;flex:1}
.t-house{background:var(--purpleXL);color:var(--purple2);border-radius:5px;
  padding:2px 8px;font-size:10.5px;font-weight:500}

/* CHAT */
.chat-wrap{display:flex;flex-direction:column;height:calc(100vh - 140px);padding:0 16px}
.chat-msgs{flex:1;overflow-y:auto;padding:4px 0 10px;display:flex;flex-direction:column;gap:10px}
.chat-msgs::-webkit-scrollbar{width:3px}
.chat-msgs::-webkit-scrollbar-thumb{background:var(--purpleBorder);border-radius:2px}
.cm{max-width:86%}
.cm.u{align-self:flex-end}
.cm.a{align-self:flex-start}
.cm-label{font-size:9px;letter-spacing:.1em;color:var(--hint);text-transform:uppercase;
  font-weight:500;margin-bottom:3px}
.cm-bubble{padding:11px 14px;border-radius:14px;font-size:14.5px;line-height:1.7}
.cm.u .cm-bubble{background:var(--purple);color:white;border-radius:14px 14px 3px 14px}
.cm.a .cm-bubble{background:var(--card);border:1px solid var(--purpleBorder);
  color:var(--text);border-radius:14px 14px 14px 3px}
.typing{display:flex;align-items:center;gap:4px;padding:11px 14px;
  background:var(--card);border:1px solid var(--purpleBorder);
  border-radius:14px 14px 14px 3px;align-self:flex-start}
.dot{width:5px;height:5px;border-radius:50%;background:var(--purpleL);
  animation:dp 1.4s ease infinite}
.dot:nth-child(2){animation-delay:.2s}.dot:nth-child(3){animation-delay:.4s}
@keyframes dp{0%,60%,100%{opacity:.3;transform:scale(1)}30%{opacity:1;transform:scale(1.3)}}
.chat-suggs{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px}
.sg{background:var(--card);border:1px solid var(--purpleBorder);border-radius:18px;
  padding:7px 12px;font-size:11.5px;font-weight:500;cursor:pointer;
  color:var(--purple2);transition:all .17s;white-space:nowrap;
  -webkit-tap-highlight-color:transparent}
.sg:active{background:var(--purpleXL)}
.chat-input-row{display:flex;gap:8px;padding:10px 0;border-top:1px solid var(--purpleBorder)}
.chat-inp{flex:1;background:var(--card);border:1.5px solid var(--purpleBorder);
  border-radius:12px;color:var(--text);font-family:var(--font);font-size:15px;
  padding:10px 13px;outline:none;resize:none;transition:border-color .18s}
.chat-inp:focus{border-color:var(--purple)}
.chat-send{width:40px;height:40px;border-radius:50%;background:var(--purple);
  border:none;color:white;font-size:18px;cursor:pointer;flex-shrink:0;
  display:flex;align-items:center;justify-content:center;align-self:flex-end}
.chat-send:active{background:var(--purple2)}

/* READING */
.reading h3{font-size:10.5px;letter-spacing:.16em;color:var(--purpleL);
  text-transform:uppercase;font-weight:600;margin:18px 0 8px;
  padding-bottom:6px;border-bottom:1px solid var(--purpleBorder)}
.reading h3:first-child{margin-top:0}
.reading p{font-size:15px;line-height:1.85;margin-bottom:8px;color:var(--text)}
.reading ul{list-style:none;padding:0;margin-bottom:8px}
.reading li{font-size:14.5px;line-height:1.75;padding-left:16px;position:relative;margin-bottom:3px;color:var(--text)}
.reading li::before{content:'◆';position:absolute;left:0;color:var(--purpleL);font-size:7px;top:7px}
.reading-quote{background:var(--purpleXL);border-left:3px solid var(--purple);
  border-radius:0 10px 10px 0;padding:12px 14px;margin:10px 0;
  font-style:italic;font-size:14.5px;color:var(--purple2);line-height:1.75}

/* COMPATIBILITY */
.compat-intro{background:var(--card);border:1px solid var(--purpleBorder);border-radius:14px;
  padding:18px;margin-bottom:14px;text-align:center}
.compat-title{font-size:18px;font-weight:600;color:var(--purple2);margin-bottom:6px}
.compat-sub{font-size:14px;color:var(--muted);line-height:1.6}
.compat-type-row{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px}
.compat-type{background:var(--card);border:2px solid var(--purpleBorder);border-radius:14px;
  padding:16px;text-align:center;cursor:pointer;transition:all .18s;
  -webkit-tap-highlight-color:transparent}
.compat-type:active,.compat-type.sel{background:var(--purpleXL);border-color:var(--purple)}
.ct-icon{font-size:28px;margin-bottom:6px;display:block}
.ct-label{font-size:13px;font-weight:600;color:var(--text)}
.ct-desc{font-size:11px;color:var(--muted);margin-top:3px;line-height:1.4}
.score-ring{width:90px;height:90px;border-radius:50%;display:flex;flex-direction:column;
  align-items:center;justify-content:center;margin:0 auto 14px;border:3px solid}
.score-num{font-size:28px;font-weight:700;line-height:1}
.score-den{font-size:11px;opacity:.5;font-weight:500}
.kuta-grid{display:grid;grid-template-columns:1fr 1fr;gap:6px}
.kuta{background:var(--surface);border:1px solid var(--purpleBorder);border-radius:10px;padding:9px 11px}
.kuta-name{font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);
  font-weight:600;margin-bottom:3px}
.kuta-score{font-size:14px;font-weight:600;color:var(--purple2)}
.kuta-max{font-size:10px;color:var(--hint)}
.kuta-bar{height:3px;border-radius:2px;background:var(--purpleBorder);margin-top:4px;overflow:hidden}
.kuta-fill{height:100%;border-radius:2px;background:var(--purple)}
.match-warn{background:var(--rbg);border:1px solid var(--rbc);border-radius:10px;
  padding:10px 13px;margin-bottom:10px;font-size:13px;color:var(--red)}

/* FORM */
.form-wrap{padding:0 16px}
.fg{margin-bottom:12px}
.fg.full{grid-column:span 2}
.flbl{font-size:12px;font-weight:600;color:var(--text);margin-bottom:6px;display:block}
.fi{width:100%;background:var(--card);border:1.5px solid var(--purpleBorder);
  border-radius:10px;color:var(--text);font-family:var(--font);font-size:15px;
  padding:11px 13px;outline:none;transition:border-color .18s;-webkit-appearance:none}
.fi:focus{border-color:var(--purple)}
.fgrid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.fhint{font-size:11px;color:var(--hint);margin-top:5px}
.fhint.ok{color:var(--green)}
.btn-primary{width:100%;background:var(--purple);color:white;border:none;
  border-radius:12px;padding:14px;font-size:15px;font-weight:600;cursor:pointer;
  margin-top:4px;transition:background .18s;-webkit-tap-highlight-color:transparent}
.btn-primary:active{background:var(--purple2)}
.btn-primary:disabled{opacity:.5;cursor:not-allowed}
.btn-ghost{background:transparent;border:1.5px solid var(--purpleBorder);
  border-radius:12px;padding:11px;font-size:14px;font-weight:500;
  color:var(--purple2);cursor:pointer;transition:all .18s;
  -webkit-tap-highlight-color:transparent}
.btn-ghost:active{background:var(--purpleXL)}

/* AUTOCOMPLETE */
.ac-wrap{position:relative}
.ac-drop{position:absolute;top:100%;left:0;right:0;background:var(--card);
  border:1.5px solid var(--purple);border-top:none;border-radius:0 0 10px 10px;
  z-index:100;max-height:220px;overflow-y:auto;box-shadow:0 6px 16px rgba(0,0,0,.1)}
.ac-item{padding:10px 13px;cursor:pointer;font-size:14px;border-bottom:1px solid var(--b2)}
.ac-item:last-child{border-bottom:none}
.ac-item:active{background:var(--purpleXL)}
.ac-city{font-weight:500;color:var(--text)}
.ac-region{font-size:11.5px;color:var(--muted);margin-top:1px}

/* SVG KUNDALI */
.chart-svg-wrap{background:var(--card);border:1px solid var(--purpleBorder);
  border-radius:14px;padding:12px;margin-bottom:14px}

/* LOADER */
.loader{text-align:center;padding:40px 20px}
.spinner{width:36px;height:36px;border-radius:50%;border:2.5px solid var(--purpleBorder);
  border-top-color:var(--purple);animation:spin 1s linear infinite;margin:0 auto 12px}
@keyframes spin{to{transform:rotate(360deg)}}
.loader-text{font-size:13px;color:var(--purple2);font-weight:500;letter-spacing:.04em}
.loader-sub{font-size:12px;color:var(--muted);margin-top:4px}

/* EMPTY STATE */
.empty{text-align:center;padding:40px 20px}
.empty-icon{font-size:40px;display:block;margin-bottom:12px;opacity:.5}
.empty-title{font-size:16px;font-weight:600;color:var(--text);margin-bottom:6px}
.empty-desc{font-size:13px;color:var(--muted);line-height:1.6}

/* MORE SCREEN */
.more-list{display:flex;flex-direction:column;gap:6px}
.more-item{background:var(--card);border:1px solid var(--purpleBorder);border-radius:12px;
  padding:14px 16px;display:flex;align-items:center;gap:12px;cursor:pointer;
  -webkit-tap-highlight-color:transparent}
.more-item:active{background:var(--purpleXL)}
.more-icon{font-size:22px;width:32px;text-align:center;flex-shrink:0}
.more-text{flex:1}
.more-name{font-size:14px;font-weight:600;color:var(--text)}
.more-sub{font-size:12px;color:var(--muted);margin-top:2px}
.more-arr{font-size:16px;color:var(--hint)}


/* VARSHPAL */
.vp-header{background:linear-gradient(135deg,var(--purple),var(--purple2));border-radius:14px;
  padding:16px;margin-bottom:14px;color:white}
.vp-year{font-size:11px;letter-spacing:.18em;text-transform:uppercase;
  opacity:.7;margin-bottom:4px}
.vp-title{font-size:18px;font-weight:600;margin-bottom:4px}
.vp-date{font-size:12px;opacity:.75}
.vp-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px}
.vp-card{background:var(--card);border:1px solid var(--purpleBorder);border-radius:12px;
  padding:12px 14px}
.vp-card-label{font-size:9.5px;letter-spacing:.12em;color:var(--purpleL);
  text-transform:uppercase;font-weight:600;margin-bottom:4px}
.vp-card-value{font-size:16px;font-weight:600;color:var(--purple2)}
.vp-card-sub{font-size:11px;color:var(--muted);margin-top:2px}
.vp-card.highlight{background:var(--purpleXL);border-color:var(--purple)}
.mudda-row{display:flex;align-items:center;gap:10px;padding:9px 0;
  border-bottom:1px solid var(--b2)}
.mudda-row:last-child{border-bottom:none}
.mudda-row.active{background:var(--purpleXL);border-radius:8px;padding:9px 10px;
  margin:0 -10px;border-bottom:none;margin-bottom:4px}
.mudda-lord{font-size:13px;font-weight:600;color:var(--text);width:70px;flex-shrink:0}
.mudda-row.active .mudda-lord{color:var(--purple2)}
.mudda-dates{font-size:11px;color:var(--muted);flex:1}
.mudda-badge{font-size:9px;font-weight:600;color:var(--purple);
  background:var(--purpleXL);padding:2px 7px;border-radius:6px}
.yr-selector{display:flex;gap:6px;margin-bottom:14px;align-items:center}
.yr-btn{width:32px;height:32px;border-radius:50%;border:1.5px solid var(--purpleBorder);
  background:var(--card);color:var(--purple2);font-size:16px;cursor:pointer;
  display:flex;align-items:center;justify-content:center;font-weight:600;
  -webkit-tap-highlight-color:transparent}
.yr-btn:active{background:var(--purpleXL)}
.yr-display{font-size:16px;font-weight:600;color:var(--text);flex:1;text-align:center}


/* NAK IDENTITY CARD */
.nak-card{background:#1a0a2e;border-radius:14px;padding:18px 16px;margin-bottom:12px;color:white}
.nak-emoji{font-size:36px;display:block;margin-bottom:8px}
.nak-label{font-size:9.5px;letter-spacing:.18em;color:rgba(167,139,250,.7);text-transform:uppercase;font-weight:600;margin-bottom:4px}
.nak-title{font-size:20px;font-weight:600;color:#e8e0ff;margin-bottom:8px}
.nak-desc{font-size:14px;line-height:1.75;color:rgba(255,255,255,.7)}
.nak-keywords{display:flex;gap:6px;flex-wrap:wrap;margin-top:10px}
.nak-kw{background:rgba(124,58,237,.3);color:#c4b5fd;font-size:10px;font-weight:600;
  padding:3px 10px;border-radius:12px;letter-spacing:.06em;text-transform:uppercase}

/* SOUL PURPOSE CARD */
.soul-card{background:linear-gradient(135deg,var(--purple),#9333ea);border-radius:14px;
  padding:16px;margin-bottom:12px;color:white}
.soul-label{font-size:9.5px;letter-spacing:.18em;text-transform:uppercase;
  font-weight:600;opacity:.7;margin-bottom:6px}
.soul-planet{font-size:16px;font-weight:600;margin-bottom:6px}
.soul-meaning{font-size:14px;line-height:1.7;opacity:.9}

/* WESTERN VS VEDIC CARD */
.wv-card{background:var(--card);border:1px solid var(--purpleBorder);border-radius:14px;
  padding:16px;margin-bottom:12px}
.wv-title{font-size:10px;letter-spacing:.16em;color:var(--purpleL);text-transform:uppercase;
  font-weight:600;margin-bottom:12px}
.wv-row{display:flex;align-items:center;gap:10px;margin-bottom:8px}
.wv-row:last-child{margin-bottom:0}
.wv-label{font-size:11px;color:var(--hint);width:32px;flex-shrink:0}
.wv-western{font-size:13px;color:var(--hint);text-decoration:line-through;flex:1}
.wv-vedic{font-size:14px;font-weight:600;color:var(--purple2);flex:1}
.wv-arrow{font-size:12px;color:var(--purpleL)}
.wv-note{font-size:11.5px;color:var(--muted);line-height:1.6;margin-top:10px;
  padding-top:10px;border-top:1px solid var(--b2)}

/* D9 CHART */
.d9-label{font-size:9.5px;letter-spacing:.14em;color:var(--purpleL);text-transform:uppercase;
  font-weight:600;margin-bottom:8px;text-align:center}


/* WELCOME SLIDES */
.welcome{position:fixed;top:0;bottom:0;left:50%;transform:translateX(-50%);
  width:100%;max-width:430px;background:#f8f5ff;z-index:200;overflow-y:auto;
  display:flex;flex-direction:column;align-items:center;justify-content:center;padding:32px 28px}
.welcome-skip{position:absolute;top:20px;right:20px;font-size:13px;color:var(--hint);
  cursor:pointer;padding:8px;-webkit-tap-highlight-color:transparent}
.welcome-icon{font-size:64px;margin-bottom:24px;display:block;text-align:center}
.welcome-title{font-size:26px;font-weight:700;color:var(--purple2);text-align:center;
  line-height:1.25;margin-bottom:12px}
.welcome-desc{font-size:15px;color:var(--muted);text-align:center;line-height:1.75;margin-bottom:28px}
.welcome-features{width:100%;display:flex;flex-direction:column;gap:10px;margin-bottom:28px}
.welcome-feat{display:flex;align-items:center;gap:12px;background:var(--card);
  border:1px solid var(--purpleBorder);border-radius:12px;padding:12px 14px}
.welcome-feat-icon{font-size:20px;flex-shrink:0}
.welcome-feat-text{font-size:14px;color:var(--text);font-weight:500}
.welcome-dots{display:flex;gap:6px;margin-bottom:24px}
.welcome-dot{width:8px;height:8px;border-radius:50%;background:var(--purpleBorder);transition:all .2s}
.welcome-dot.on{background:var(--purple);width:22px;border-radius:4px}
.welcome-btn{width:100%;background:var(--purple);color:white;border:none;border-radius:14px;
  padding:16px;font-size:16px;font-weight:600;cursor:pointer;-webkit-tap-highlight-color:transparent}
.welcome-btn:active{background:var(--purple2)}

/* CONSTELLATION LOADER */
.constellation-loader{display:flex;flex-direction:column;align-items:center;
  justify-content:center;padding:40px 20px;min-height:220px}
.constellation-svg{width:200px;height:150px;margin-bottom:20px}
.constellation-star{fill:#a78bfa;animation:starPulse 1.5s ease-in-out infinite}
.constellation-star:nth-child(2){animation-delay:.2s}
.constellation-star:nth-child(3){animation-delay:.4s}
.constellation-star:nth-child(4){animation-delay:.6s}
.constellation-star:nth-child(5){animation-delay:.8s}
.constellation-star:nth-child(6){animation-delay:1s}
.constellation-star:nth-child(7){animation-delay:1.2s}
@keyframes starPulse{0%,100%{opacity:.4}50%{opacity:1}}
.constellation-line{stroke:#a78bfa;stroke-width:1.2;opacity:0;
  animation:drawLine 2.5s ease-in-out infinite}
.constellation-line:nth-child(8){animation-delay:.3s}
.constellation-line:nth-child(9){animation-delay:.6s}
.constellation-line:nth-child(10){animation-delay:.9s}
.constellation-line:nth-child(11){animation-delay:1.2s}
.constellation-line:nth-child(12){animation-delay:1.5s}
@keyframes drawLine{0%,100%{opacity:0}40%,70%{opacity:.55}}
.constellation-text{font-size:14px;font-weight:600;color:var(--purple2);margin-bottom:4px}
.constellation-sub{font-size:12px;color:var(--hint)}

/* COSMIC CHEMISTRY */
.cc-hero{border-radius:16px;padding:28px 20px;text-align:center;margin-bottom:16px;
  position:relative;overflow:hidden}
.cc-hero.v-stars{background:linear-gradient(160deg,#1a0a2e 0%,#2d1461 60%,#1a0a2e 100%)}
.cc-hero.v-moon{background:linear-gradient(160deg,#1a1028 0%,#2d2060 60%,#1a1028 100%)}
.cc-hero.v-waves{background:linear-gradient(160deg,#0a1a2e 0%,#102040 60%,#0a1a2e 100%)}
.cc-stars-bg{position:absolute;inset:0;pointer-events:none;overflow:hidden}
.cc-star-dot{position:absolute;border-radius:50%;background:white;
  animation:ccTwinkle 2s ease-in-out infinite}
@keyframes ccTwinkle{0%,100%{opacity:.15}50%{opacity:.9}}
.cc-verdict-emoji{font-size:36px;margin-bottom:10px;display:block}
.cc-verdict-label{font-size:10px;letter-spacing:.2em;text-transform:uppercase;
  font-weight:600;color:rgba(255,255,255,.5);margin-bottom:8px}
.cc-verdict-text{font-size:22px;font-weight:700;color:white;margin-bottom:8px;line-height:1.2}
.cc-verdict-sub{font-size:13px;color:rgba(255,255,255,.7);line-height:1.65;max-width:280px}
.cc-names-badge{display:inline-block;background:rgba(255,255,255,.12);color:rgba(255,255,255,.75);
  font-size:11px;font-weight:500;padding:4px 14px;border-radius:20px;margin-top:10px}
.cc-flags-title{font-size:10px;letter-spacing:.16em;color:var(--purpleL);
  text-transform:uppercase;font-weight:600;margin-bottom:10px}
.cc-flags{display:flex;flex-direction:column;gap:7px;margin-bottom:14px}
.cc-flag{border-radius:11px;padding:12px 14px;display:flex;align-items:flex-start;gap:11px}
.cc-flag.g{border:1px solid rgba(22,163,74,.25);background:rgba(22,163,74,.04)}
.cc-flag.y{border:1px solid rgba(202,138,4,.25);background:rgba(202,138,4,.04)}
.cc-flag.r{border:1px solid rgba(220,38,38,.22);background:rgba(220,38,38,.04)}
.cc-flag-icon{font-size:17px;flex-shrink:0;margin-top:1px}
.cc-flag-content{flex:1}
.cc-flag-name{font-size:13px;font-weight:600;color:var(--text)}
.cc-flag-desc{font-size:11px;color:var(--muted);line-height:1.4;margin-top:2px}
.cc-flag-badge{display:inline-block;font-size:9.5px;font-weight:600;padding:2px 7px;
  border-radius:5px;margin-top:4px}
.cc-flag.g .cc-flag-badge{background:rgba(22,163,74,.1);color:#15803d}
.cc-flag.y .cc-flag-badge{background:rgba(202,138,4,.1);color:#92400e}
.cc-flag.r .cc-flag-badge{background:rgba(220,38,38,.08);color:#b91c1c}
.cc-share-btn{width:100%;background:linear-gradient(135deg,var(--purple),#9333ea);
  border:none;border-radius:12px;padding:14px;color:white;font-size:14px;
  font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;
  gap:8px;margin-top:4px;-webkit-tap-highlight-color:transparent}
.cc-share-btn:active{opacity:.85}

/* LIFE TIMING */
.lt-now{background:linear-gradient(135deg,var(--purple),#9333ea);border-radius:14px;
  padding:16px;color:white;margin-bottom:12px}
.lt-now-label{font-size:9.5px;letter-spacing:.18em;text-transform:uppercase;
  font-weight:600;opacity:.65;margin-bottom:5px}
.lt-now-title{font-size:18px;font-weight:700;margin-bottom:4px}
.lt-now-sub{font-size:13px;opacity:.8;margin-bottom:10px;line-height:1.5}
.lt-now-meaning{font-size:14px;line-height:1.75;opacity:.92}
.lt-timeline{display:flex;flex-direction:column;gap:0}
.lt-row{display:flex;align-items:flex-start;gap:12px;padding:12px 0;
  border-bottom:1px solid var(--b2)}
.lt-row:last-child{border-bottom:none}
.lt-dot{width:10px;height:10px;border-radius:50%;flex-shrink:0;margin-top:4px}
.lt-dot.curr{background:var(--purple)}
.lt-dot.future{background:var(--purpleL)}
.lt-dot.past{background:var(--hint)}
.lt-row-body{flex:1}
.lt-row-period{font-size:13px;font-weight:600;color:var(--text)}
.lt-row-period.curr{color:var(--purple2)}
.lt-row-dates{font-size:11px;color:var(--hint);margin-top:1px}
.lt-row-meaning{font-size:12px;color:var(--muted);margin-top:4px;line-height:1.5}
.lt-row-tag{display:inline-block;font-size:9.5px;font-weight:600;padding:2px 7px;
  border-radius:5px;margin-top:4px}
.lt-row-tag.curr{background:var(--purpleXL);color:var(--purple2)}

/* SHARE SHEET */
.share-modal{position:fixed;inset:0;z-index:300;background:rgba(10,0,20,.85);
  display:flex;align-items:flex-end;justify-content:center}
.share-sheet{background:var(--card);border-radius:20px 20px 0 0;
  width:100%;max-width:480px;padding:20px 20px 40px}
.share-handle{width:36px;height:4px;border-radius:2px;background:var(--purpleBorder);
  margin:0 auto 20px}
.share-preview{background:linear-gradient(160deg,#1a0a2e,#2d1461);border-radius:14px;
  padding:20px;text-align:center;margin-bottom:16px;color:white}
.share-preview-app{font-size:10px;letter-spacing:.2em;text-transform:uppercase;
  opacity:.5;margin-bottom:12px}
.share-preview-emoji{font-size:40px;display:block;margin-bottom:8px}
.share-preview-title{font-size:18px;font-weight:700;margin-bottom:4px}
.share-preview-sub{font-size:13px;opacity:.75}
.share-actions{display:flex;gap:8px}
.share-action{flex:1;background:var(--purpleXL);border:1px solid var(--purpleBorder);
  border-radius:10px;padding:12px;font-size:13px;font-weight:600;color:var(--purple2);
  cursor:pointer;text-align:center;-webkit-tap-highlight-color:transparent}
.share-action:active{background:var(--purpleBorder)}

@media(max-width:360px){
  .feat-grid{grid-template-columns:1fr 1fr}
  .fc-name{font-size:12px}
}
`;

// ─── EPHEMERIS (identical to Jyotish AI) ─────────────────────────────────────
const R=Math.PI/180,D=180/Math.PI,n360=x=>((x%360)+360)%360;
function JD(y,mo,d,h){if(mo<=2){y--;mo+=12;}const A=Math.floor(y/100),B=2-A+Math.floor(A/4);return Math.floor(365.25*(y+4716))+Math.floor(30.6001*(mo+1))+d+h/24+B-1524.5;}
const TC=j=>(j-2451545)/36525;
const eps=j=>{const t=TC(j);return 23.4393-0.013004*t;};
const GMST=j=>{const t=TC(j);return n360(280.46061837+360.98564736629*(j-2451545)+3.87933e-4*t*t);};
const ayanamsa=j=>23.85+(j-2451545)*50.29/1314900;
function sunLon(j){const t=TC(j),L0=n360(280.46646+36000.76983*t),M=n360(357.52911+35999.05029*t),Mr=M*R,C=(1.914602-0.004817*t)*Math.sin(Mr)+(0.019993-1.01e-4*t)*Math.sin(2*Mr);return n360(L0+C-0.00569-0.00478*Math.sin((125.04-1934.136*t)*R));}
function moonLon(j){const t=TC(j),t2=t*t,t3=t2*t,t4=t3*t,Lp=n360(218.3164477+481267.88123421*t-1.5786e-3*t2+t3/538841-t4/65194000),Dv=n360(297.8501921+445267.1114034*t-1.8819e-3*t2),Mv=n360(357.5291092+35999.0502909*t),Mp=n360(134.9633964+477198.8675055*t+8.7414e-3*t2),Fv=n360(93.2720950+483202.0175233*t),E=1-2.516e-3*t,E2=E*E;const T=[[0,0,1,0,6288774],[2,0,-1,0,1274027],[2,0,0,0,658314],[0,0,2,0,213618],[0,1,0,0,-185116],[0,0,0,2,-114332],[2,0,-2,0,58793],[2,-1,-1,0,57066],[2,0,1,0,53322],[2,-1,0,0,45758],[0,1,-1,0,-40923],[1,0,0,0,-34720],[0,1,1,0,-30383],[2,0,0,-2,15327],[0,0,1,-2,10980],[4,0,-1,0,10675],[0,0,3,0,10034],[4,0,-2,0,8548],[2,1,-1,0,-7888],[2,1,0,0,-6766],[2,-1,1,0,4036],[2,0,2,0,3994],[4,0,0,0,3861]];let s=0;for(const[dv,m,mp,fv,c]of T){const a=(dv*Dv+m*Mv+mp*Mp+fv*Fv)*R;let cf=c;if(Math.abs(m)===1)cf*=E;if(Math.abs(m)===2)cf*=E2;s+=cf*Math.sin(a);}return n360(Lp+s/1e6);}
const rahuLon=j=>{const t=TC(j);return n360(125.0445479-1934.1362608*t+2.0754e-3*t*t);};
const EL={Mercury:[.38709927,3.7e-5,.20563593,1.906e-5,7.00497902,-5.9475e-3,252.25032350,149472.67411175,77.45779628,.16047689,48.33076593,-.12534081],Venus:[.72333566,3.9e-5,.00677672,-4.107e-5,3.39467605,-7.889e-4,181.97909950,58517.81538729,131.60246718,2.6833e-3,76.67984255,-.27769418],Earth:[1.00000261,5.62e-5,.01671123,-4.392e-5,-1.531e-5,-.01294668,100.46457166,35999.37244981,102.93768193,.32327364,0,0],Mars:[1.52371034,1.847e-5,.09339410,7.882e-5,1.84969142,-8.1313e-3,-4.55343205,19140.30268499,-23.94362959,.44441088,49.55953891,-.29257343],Jupiter:[5.20288700,-1.1607e-4,.04838624,-1.3253e-4,1.30439695,-1.8371e-3,34.39644051,3034.74612775,14.72847983,.21252668,100.47390909,.20469106],Saturn:[9.53667594,-1.2506e-3,.05386179,-5.0991e-4,2.48599187,1.9361e-3,49.95424423,1222.49362201,92.59887831,-.41897216,113.66242448,-.28867794]};
function keplSolve(M,e){let E=M;for(let i=0;i<50;i++){const dE=(M-E+e*Math.sin(E))/(1-e*Math.cos(E));E+=dE;if(Math.abs(dE)<1e-11)break;}return E;}
function helioXYZ(t,el){const[a0,da,e0,de,i0,di,L0,dL,w0,dw,N0,dN]=el,a=a0+da*t,e=e0+de*t,I=(i0+di*t)*R,L=n360(L0+dL*t)*R,w=n360(w0+dw*t)*R,N=n360(N0+dN*t)*R,om=w-N,M=n360((L-w)*D)*R,Ev=keplSolve(M,e),xp=a*(Math.cos(Ev)-e),yp=a*Math.sqrt(1-e*e)*Math.sin(Ev);const[cN,sN,cI,sI,cO,sO]=[Math.cos(N),Math.sin(N),Math.cos(I),Math.sin(I),Math.cos(om),Math.sin(om)];return{x:(cN*cO-sN*sO*cI)*xp+(-cN*sO-sN*cO*cI)*yp,y:(sN*cO+cN*sO*cI)*xp+(-sN*sO+cN*cO*cI)*yp,z:sO*sI*xp+cO*sI*yp};}
function planetLon(j,nm){const t=TC(j),p=helioXYZ(t,EL[nm]),e=helioXYZ(t,EL.Earth);return n360(Math.atan2(p.y-e.y,p.x-e.x)*D);}
function calcLagna(j,lat,lon){const LST=n360(GMST(j)+lon)*R,e=eps(j)*R,phi=lat*R;return n360(Math.atan2(Math.cos(LST),-(Math.sin(LST)*Math.cos(e)+Math.sin(e)*Math.tan(phi)))*D);}
function computeChart(y,mo,d,h,mi,tz,lat,lon){const utH=h+mi/60-tz,j=JD(y,mo,d,utH),ay=ayanamsa(j);const trop={Sun:sunLon(j),Moon:moonLon(j),Mercury:planetLon(j,'Mercury'),Venus:planetLon(j,'Venus'),Mars:planetLon(j,'Mars'),Jupiter:planetLon(j,'Jupiter'),Saturn:planetLon(j,'Saturn'),Rahu:rahuLon(j),Ketu:n360(rahuLon(j)+180)};const sid={};for(const[k,v]of Object.entries(trop))sid[k]=n360(v-ay);const tropSun=sunLon(j);
  return{sid,lagna:n360(calcLagna(j,lat,lon)-ay),jde:j,ay,tropSun};}

// ─── VEDIC DATA ───────────────────────────────────────────────────────────────
const RE=['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
const RS=['Mesha','Vrishabha','Mithuna','Karka','Simha','Kanya','Tula','Vrischika','Dhanu','Makara','Kumbha','Meena'];
const RSH=['Ari','Tau','Gem','Can','Leo','Vir','Lib','Sco','Sag','Cap','Aqu','Pis'];
const NK=['Ashwini','Bharani','Krittika','Rohini','Mrigashira','Ardra','Punarvasu','Pushya','Ashlesha','Magha','Purva Phalguni','Uttara Phalguni','Hasta','Chitra','Swati','Vishakha','Anuradha','Jyeshtha','Mula','Purva Ashadha','Uttara Ashadha','Shravana','Dhanishtha','Shatabhisha','Purva Bhadrapada','Uttara Bhadrapada','Revati'];
const NL=['Ke','Ve','Su','Mo','Ma','Ra','Ju','Sa','Me','Ke','Ve','Su','Mo','Ma','Ra','Ju','Sa','Me','Ke','Ve','Su','Mo','Ma','Ra','Ju','Sa','Me'];
const DY={Ke:7,Ve:20,Su:6,Mo:10,Ma:7,Ra:18,Ju:16,Sa:19,Me:17};
const DS=['Ke','Ve','Su','Mo','Ma','Ra','Ju','Sa','Me'];
const FN={Ke:'Ketu',Ve:'Venus',Su:'Sun',Mo:'Moon',Ma:'Mars',Ra:'Rahu',Ju:'Jupiter',Sa:'Saturn',Me:'Mercury'};
const GL={Sun:'☉',Moon:'☽',Mercury:'☿',Venus:'♀',Mars:'♂',Jupiter:'♃',Saturn:'♄',Rahu:'☊',Ketu:'☋'};
const PC={Sun:'#b07000',Moon:'#3b6faa',Mercury:'#1f7a45',Venus:'#aa2a7a',Mars:'#b02020',Jupiter:'#886000',Saturn:'#6040a0',Rahu:'#555',Ketu:'#777'};
const TN=['Pratipada','Dwitiya','Tritiya','Chaturthi','Panchami','Shashthi','Saptami','Ashtami','Navami','Dashami','Ekadashi','Dwadashi','Trayodashi','Chaturdashi','Purnima','Pratipada','Dwitiya','Tritiya','Chaturthi','Panchami','Shashthi','Saptami','Ashtami','Navami','Dashami','Ekadashi','Dwadashi','Trayodashi','Chaturdashi','Amavasya'];
const YN=['Vishkumbha','Priti','Ayushman','Saubhagya','Shobhana','Atiganda','Sukarma','Dhriti','Shula','Ganda','Vriddhi','Dhruva','Vyaghata','Harshana','Vajra','Siddhi','Vyatipata','Variyan','Parigha','Shiva','Siddha','Sadhya','Shubha','Shukla','Brahma','Indra','Vaidhriti'];
const YB=new Set(['Vishkumbha','Atiganda','Shula','Ganda','Vyaghata','Vajra','Vyatipata','Parigha','Vaidhriti']);
const KR=['Bava','Balava','Kaulava','Taitila','Gara','Vanija','Vishti'];
const VN=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const VL=['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn'];
const RKS=[8,2,7,5,6,4,3];
const KN=['Ananta','Kulika','Vasuki','Shankhapala','Padma','Mahapadma','Takshaka','Karkotaka','Shankhachuda','Ghatak','Vishdhar','Sheshanaga'];
const so=l=>Math.floor(n360(l)/30),di=l=>n360(l)%30,no=l=>Math.floor(n360(l)/(360/27)),po=l=>Math.floor((n360(l)%(360/27))/(360/108))+1;

// US-friendly time quality names
const TQ_NAMES={Amrit:'Flow',Shubh:'Harmony',Labh:'Abundance',Char:'Movement',Kaal:'Stillness',Rog:'Challenge',Udveg:'Caution'};
const TQ_DESC={Amrit:'Excellent for new starts',Shubh:'Good for most things',Labh:'Good for business',Char:'Good for travel',Kaal:'Rest, avoid major decisions',Rog:'Avoid health decisions',Udveg:'Take it slow today'};

function getPanchang(j,ay){
  const sS=n360(sunLon(j)-ay),mS=n360(moonLon(j)-ay),diff=n360(mS-sS),
    ti=Math.floor(diff/12),vara=Math.floor(j+1.5)%7,nak=no(mS),
    yi=Math.floor(n360(sS+mS)/(360/27))%27,ki=Math.floor(diff/6)%60,
    kar=ki===0?'Kimstughna':ki<=56?KR[(ki-1)%7]:['Shakuni','Chatushpada','Naga'][ki-57]||'Naga',
    sl=RKS[vara]-1,rhs=6+sl*1.5,rhe=rhs+1.5;
  const fh=h=>{const hh=Math.floor(h),mm=Math.round((h-hh)*60);return`${hh===0?12:hh>12?hh-12:hh}:${mm.toString().padStart(2,'0')} ${hh<12?'AM':'PM'}`;};
  const paksha=ti<15?'Waxing':'Waning';
  const tithiNum=ti<15?ti+1:ti-14;
  return{tithi:TN[ti],tnum:tithiNum,paksha,vara,varaName:VN[vara],nakName:NK[nak],nak,
    yogaName:YN[yi],yogaBad:YB.has(YN[yi]),karana:kar,
    rahuWindow:`${fh(rhs)} – ${fh(rhe)}`,moonSign:so(mS),
    moonPhase:paksha==='Waxing'?`Waxing Moon · Day ${tithiNum}`:`Waning Moon · Day ${tithiNum}`};}

function getChog(vara){
  const sl=[['Udveg','Char','Labh','Amrit','Kaal','Shubh','Rog','Udveg'],['Amrit','Kaal','Shubh','Rog','Udveg','Char','Labh','Amrit'],['Rog','Udveg','Char','Labh','Amrit','Kaal','Shubh','Rog'],['Labh','Amrit','Kaal','Shubh','Rog','Udveg','Char','Labh'],['Shubh','Rog','Udveg','Char','Labh','Amrit','Kaal','Shubh'],['Char','Labh','Amrit','Kaal','Shubh','Rog','Udveg','Char'],['Kaal','Shubh','Rog','Udveg','Char','Labh','Amrit','Kaal']];
  const q={Amrit:'good',Shubh:'good',Labh:'good',Char:'good',Kaal:'bad',Rog:'bad',Udveg:'bad'};
  const fh=h=>{const hh=Math.floor(h%24),mm=Math.round((h-Math.floor(h))*60);const h12=hh===0?12:hh>12?hh-12:hh;return`${h12}:${mm.toString().padStart(2,'0')} ${hh<12?'AM':'PM'}`;};
  return sl[vara].map((n,i)=>{const s=6+i*1.5;return{name:TQ_NAMES[n]||n,raw:n,qual:q[n]||'neutral',desc:TQ_DESC[n]||'',time:`${fh(s)}–${fh(s+1.5)}`};});
}

function getMarsInfluence(sid,lagna){
  const ls=so(lagna),ms=so(sid.Mars),mh=((ms-ls+12)%12)+1,
    d=[1,2,4,7,8,12].includes(mh),exc=[];
  if([0,7].includes(ms))exc.push('Mars in own sign');
  if(ms===9)exc.push('Mars elevated in Capricorn');
  if(so(sid.Jupiter)===ms)exc.push('Jupiter balances Mars');
  if([3,4].includes(ls))exc.push('Cancer/Leo Rising exception');
  return{active:d,effective:d&&!exc.length,marsHouse:mh,marsSign:ms,exceptions:exc};
}

function getRahuKetuAxis(sid){
  const rahu=sid.Rahu,pl=['Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn'],
    inR=p=>n360(sid[p]-rahu)<180,allR=pl.every(inR),allK=pl.every(p=>n360(sid[p]-rahu)>180);
  return{active:allR||allK,type:KN[so(rahu)],
    desc:allR?'All planets on one side of the Rahu-Ketu axis':'All planets on the Ketu side',
    rahuSign:so(rahu)};
}

function getSaturnPassage(sid){
  const tj=JD(2026,4,2,6),ta=ayanamsa(tj),sn=n360(planetLon(tj,'Saturn')-ta),
    ss=so(sn),ms=so(sid.Moon),df=(ss-ms+12)%12,
    inSati=df===0||df===1||df===11,inDh=df===3||df===7;
  return{active:inSati,phase:df===11?'Approaching':df===0?'Peak':df===1?'Departing':null,
    satSignName:RE[ss],moonSignName:RE[ms],
    phases:[{name:'Approaching',sign:RE[(ms+11)%12],active:df===11},{name:'Peak',sign:RE[ms],active:df===0},{name:'Departing',sign:RE[(ms+1)%12],active:df===1}]};
}

function getLifeCycles(ml,y,mo,d){
  const nak=no(ml),lord=NL[nak],nakLen=360/27,frac=(n360(ml)%nakLen)/nakLen,
    bd=y+(mo-1)/12+(d-1)/365.25,fs=bd-frac*DY[lord],idx=DS.indexOf(lord),seq=[];
  let c=fs;
  for(let i=0;i<9;i++){const dk=DS[(idx+i)%9];seq.push({lord:dk,start:c,end:c+DY[dk]});c+=DY[dk];}
  const NOW=2026.25;
  return{nak,lord,seq,curr:seq.find(s=>s.start<=NOW&&s.end>NOW)};
}

function getCycleSubs(mahaLord,mahaStart,mahaEnd){
  const totalYrs=mahaEnd-mahaStart,idx=DS.indexOf(mahaLord),NOW=2026.25;
  let cursor=mahaStart;
  return DS.map((_,i)=>{const al=DS[(idx+i)%9],dur=totalYrs*DY[al]/120,s=cursor,e=cursor+dur;cursor=e;return{lord:al,start:s,end:e,curr:s<=NOW&&e>NOW};});
}

function getCycleMicro(mahaLord,antarLord,antarStart,antarEnd){
  const totalYrs=antarEnd-antarStart,idx=DS.indexOf(antarLord),NOW=2026.25;
  let cursor=antarStart;
  return DS.map((_,i)=>{const pl=DS[(idx+i)%9],dur=totalYrs*DY[pl]/120,s=cursor,e=cursor+dur;cursor=e;return{lord:pl,start:s,end:e,curr:s<=NOW&&e>NOW};});
}

function getTransits(lagna){
  const j=JD(2026,4,2,6),ay=ayanamsa(j),ls=so(lagna),
    t={Sun:n360(sunLon(j)-ay),Moon:n360(moonLon(j)-ay),Rahu:n360(rahuLon(j)-ay)};
  ['Mercury','Venus','Mars','Jupiter','Saturn'].forEach(p=>{t[p]=n360(planetLon(j,p)-ay);});
  return['Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn','Rahu'].map(p=>{
    const l=t[p],s=so(l),h=((s-ls+12)%12)+1;
    return{planet:p,lon:l,sign:s,signName:RE[s],house:h,deg:di(l).toFixed(1)};
  });
}

function getCosmicGifts(sid,lagna){
  const ls=so(lagna),h=p=>((so(sid[p])-ls+12)%12)+1,sign=p=>so(sid[p]);
  const exalted={Sun:0,Moon:1,Mars:9,Mercury:5,Jupiter:3,Venus:11,Saturn:6};
  const ownSign={Sun:[4],Moon:[3],Mars:[0,7],Mercury:[2,5],Jupiter:[8,11],Venus:[1,6],Saturn:[9,10]};
  const isExalted=p=>sign(p)===exalted[p],isOwn=p=>(ownSign[p]||[]).includes(sign(p)),isStrong=p=>isExalted(p)||isOwn(p);
  const kendras=[1,4,7,10],trikonas=[1,5,9];
  const inKendra=p=>kendras.includes(h(p)),inTrikona=p=>trikonas.includes(h(p));
  const gifts=[];
  const add=(name,type,present,desc,detail='')=>gifts.push({name,type,present,desc,detail});

  add('Mars Power','Leadership',isStrong('Mars')&&inKendra('Mars'),'Natural leadership, physical energy, courage and decisive action.',`Mars in ${RE[sign('Mars')]} — House ${h('Mars')}`);
  add('Mercury Brilliance','Intellect',isStrong('Mercury')&&inKendra('Mercury'),'Sharp intellect, communication gifts, business acumen.',`Mercury in ${RE[sign('Mercury')]} — House ${h('Mercury')}`);
  add('Jupiter Wisdom','Abundance',isStrong('Jupiter')&&inKendra('Jupiter'),'Wisdom, spiritual depth, generosity and good fortune.',`Jupiter in ${RE[sign('Jupiter')]} — House ${h('Jupiter')}`);
  add('Venus Grace','Beauty',isStrong('Venus')&&inKendra('Venus'),'Charm, artistic talent, love of beauty and comfortable pleasures.',`Venus in ${RE[sign('Venus')]} — House ${h('Venus')}`);
  add('Saturn Strength','Discipline',isStrong('Saturn')&&inKendra('Saturn'),'Authority, persistence, long-term success through disciplined effort.',`Saturn in ${RE[sign('Saturn')]} — House ${h('Saturn')}`);
  add('Jupiter-Moon Connection','Wisdom',[1,4,7,10].includes(((sign('Jupiter')-sign('Moon')+12)%12)),'Jupiter within four signs of Moon. One of the most auspicious gifts — wisdom, wealth and a noble heart.',`Moon in ${RE[sign('Moon')]}, Jupiter in ${RE[sign('Jupiter')]}`);
  add('Sun-Mercury Union','Intelligence',sign('Sun')===sign('Mercury'),'Sun and Mercury together. Administrative brilliance, fame and communication excellence.',`Together in ${RE[sign('Sun')]}`);
  add('Moon-Mars Drive','Ambition',[0,6].includes(Math.abs(sign('Moon')-sign('Mars'))),'Moon and Mars in connection. Bold entrepreneur energy and wealth through action.',`Moon in ${RE[sign('Moon')]}, Mars in ${RE[sign('Mars')]}`);
  add('Venus-Moon Abundance','Comfort',(isStrong('Venus')||inKendra('Venus')||inTrikona('Venus'))&&(isStrong('Moon')||inTrikona('Moon')),'Venus and Moon both well-placed. Prosperity, beauty and deep emotional fulfillment.',`Venus House ${h('Venus')}, Moon House ${h('Moon')}`);
  add('Prosperity Pattern','Wealth',(inKendra('Jupiter')||inTrikona('Jupiter'))&&(inKendra('Venus')||inTrikona('Venus')),'Jupiter and Venus in angular or trine houses. Financial abundance throughout life.',`Jupiter House ${h('Jupiter')}, Venus House ${h('Venus')}`);
  add('Reversal into Strength','Resilience',['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn'].filter(p=>{const hp=h(p);return[6,8,12].includes(hp)&&['Mercury','Jupiter','Venus','Saturn'].includes(p);}).length>=2,'Challenging house placements that transform into remarkable strength. Adversity becomes your greatest asset.','Multiple planets in challenging houses');
  add('Intelligence Triangle','Knowledge',(inKendra('Jupiter')||inTrikona('Jupiter'))&&(isStrong('Venus')||inKendra('Venus')||inTrikona('Venus'))&&(isStrong('Mercury')||inKendra('Mercury')||inTrikona('Mercury')),'Jupiter, Venus and Mercury all strong. Exceptional creative and intellectual gifts.',`Jupiter H${h('Jupiter')}, Venus H${h('Venus')}, Mercury H${h('Mercury')}`);
  add('Reputation Gift','Career',['Jupiter','Venus','Mercury'].some(p=>h(p)===10),'A benefic planet in the 10th house of career. Public recognition and a legacy that lasts.',['Jupiter','Venus','Mercury'].filter(p=>h(p)===10).map(p=>`${p} in 10th (${RE[sign(p)]})`).join(', ')||'None');

  return gifts.sort((a,b)=>b.present-a.present);
}



// ─── NAKSHATRA IDENTITY PROFILES (Western language) ─────────────────────────
const NAK_PROFILES = [
  {title:'The Trailblazer',emoji:'⚡',desc:'You arrived here to initiate. Restless, fearless, and magnetically charged — you sense opportunity before others even notice it exists. Your challenge is learning when to pause.',keywords:['bold','instinctive','pioneering']},
  {title:'The Catalyst',emoji:'🔥',desc:'Intensity runs through everything you touch. You carry an unspoken knowing about transformation — and you are drawn to edges, thresholds, and the sacred fire of becoming.',keywords:['fierce','magnetic','transformative']},
  {title:'The Builder',emoji:'⚒',desc:'You have a gift for creating things that last. Methodical and devoted, you build slowly but surely — homes, ideas, relationships — all meant to endure through time.',keywords:['reliable','creative','grounded']},
  {title:'The Nurturer',emoji:'🌱',desc:'Your presence calms. You absorb the emotional world around you and transmute it into care, nourishment, and growth. Others feel held in your company without knowing why.',keywords:['empathic','devoted','life-giving']},
  {title:'The Seeker',emoji:'🦌',desc:'Curiosity is your compass. You are drawn toward the new, the undiscovered, the horizon just out of reach. Your gift is finding meaning in movement.',keywords:['curious','gentle','adventurous']},
  {title:'The Storm',emoji:'🌩',desc:'You arrived in a time of disruption — and you carry that energy. Sharp, brilliant, and sometimes overwhelming, you have the power to cut through illusion.',keywords:['electric','intense','truth-seeking']},
  {title:'The Restorer',emoji:'🌅',desc:'You have been here before. A natural healer and rebuilder, you know how to bring things back from the edge. Renewal follows wherever you go.',keywords:['resilient','wise','healing']},
  {title:'The Guardian',emoji:'🛡',desc:'You offer shelter. Protective by instinct, deeply loyal, you create safety for those you love. You feel most alive when you are needed — and most at peace when all is well.',keywords:['protective','loyal','nurturing']},
  {title:'The Mystic',emoji:'🐍',desc:'Old soul. You see beneath surfaces and sense what others miss. Intensely knowing, you are drawn to depth, mystery, and the hidden architecture of life.',keywords:['perceptive','complex','transformative']},
  {title:'The Sovereign',emoji:'👑',desc:'You carry authority naturally. Born to lead and be recognized, you have a kingly quality — not of arrogance, but of earned dignity. Others follow your light.',keywords:['noble','commanding','generous']},
  {title:'The Artist',emoji:'🌹',desc:'Beauty is your language. You are drawn to love, pleasure, and creative expression in every form. Your gifts flourish when you give yourself permission to fully enjoy life.',keywords:['sensual','creative','loving']},
  {title:'The Benefactor',emoji:'🌟',desc:'Generous, radiant, quietly brilliant — you are the kind of person whose help actually helps. You have a natural gift for seeing what someone truly needs.',keywords:['giving','brilliant','kind']},
  {title:'The Craftsperson',emoji:'🙌',desc:'Skill is your signature. Patient, precise, and devoted to excellence, you build mastery through repetition. You understand that great work takes time.',keywords:['precise','skilled','devoted']},
  {title:'The Architect',emoji:'✨',desc:'You see the blueprint others cannot see. Visually gifted and spatially brilliant, you can design and create at a level that surprises even yourself.',keywords:['visionary','artistic','precise']},
  {title:'The Wanderer',emoji:'💨',desc:'Freedom is non-negotiable for you. Independently minded, intellectually restless, you need space to move, explore, and follow your own wind.',keywords:['free','social','curious']},
  {title:'The Alchemist',emoji:'🔮',desc:'You understand that opposites must meet. Part scientist, part mystic, you have a rare ability to hold complexity and distill it into something useful.',keywords:['balanced','insightful','transformative']},
  {title:'The Devoted',emoji:'💫',desc:'Friendship, loyalty, and spiritual connection are your currencies. You love deeply and carefully. You are drawn to those who honor the sacred in everyday life.',keywords:['devoted','spiritual','warm']},
  {title:'The Elder',emoji:'🦅',desc:'There is a gravitas to you that comes from deep within. You have lived much — and you carry that weight with a quiet dignity that others find anchoring.',keywords:['wise','powerful','discerning']},
  {title:'The Root',emoji:'🌿',desc:'Your power is in your groundedness. Wild-hearted but deeply rooted, you carry an ancestral wisdom that runs beneath the surface of everything you do.',keywords:['rooted','untamed','ancestral']},
  {title:'The Visionary',emoji:'🌊',desc:'You live in the water of possibility. Dreamy, creative, and forward-looking, you sense the shape of what is coming before it arrives.',keywords:['intuitive','creative','inspired']},
  {title:'The Achiever',emoji:'🏆',desc:'Victory calls to you. Disciplined, driven, and quietly ambitious, you have the endurance to outlast almost any challenge that appears in your path.',keywords:['driven','enduring','noble']},
  {title:'The Listener',emoji:'👂',desc:'You hear what is not said. Sensitive to sound, energy, and emotional nuance, you are the person others seek when they need to feel truly understood.',keywords:['receptive','wise','empathic']},
  {title:'The Channel',emoji:'🥁',desc:'You are a conduit for something larger than yourself. Rhythmic, expressive, and intensely present, you bring energy into any room you enter.',keywords:['energetic','expressive','magnetic']},
  {title:'The Healer',emoji:'💊',desc:'You carry ancient medicine. Whether through words, presence, or tangible skill, you have a rare ability to restore what has been broken or lost.',keywords:['healing','precise','compassionate']},
  {title:'The Pilgrim',emoji:'⚓',desc:'Your life is a journey of meaning-making. Philosophical, adventurous, and spiritually oriented, you are happiest when you feel you are moving toward something true.',keywords:['philosophical','adventurous','deep']},
  {title:'The Adept',emoji:'🐟',desc:'Depth is your home. Introspective, spiritually mature, and quietly wise, you understand the inner world in ways most people never access.',keywords:['contemplative','serene','wise']},
  {title:'The Timekeeper',emoji:'🌙',desc:'You understand cycles. Rhythmic, intuitive, and deeply in tune with natural time, you know when to move and when to rest — and you honor both.',keywords:['intuitive','rhythmic','timeless']},
];

// ─── SOUL PURPOSE (ATMAKARAKA) ────────────────────────────────────────────────
const SOUL_MEANINGS = {
  Sun:'Soul of Purpose. You are here to develop authentic self-expression and step fully into your own light.',
  Moon:'Soul of Feeling. You are here to develop emotional intelligence and learn the alchemy of care.',
  Mercury:'Soul of Understanding. You are here to develop clarity of mind and become a bridge between worlds.',
  Venus:'Soul of Beauty. You are here to develop the capacity for love, abundance, and creative joy.',
  Mars:'Soul of Courage. You are here to develop strength of will and learn when to act and when to be still.',
  Jupiter:'Soul of Wisdom. You are here to develop integrity and become a teacher, guide, or keeper of meaning.',
  Saturn:'Soul of Mastery. You are here to develop patience, discipline, and the quiet authority that comes from earned experience.',
  Rahu:'Soul of Transformation. You are here to step into unfamiliar territory and grow beyond every boundary.',
};

function getAtmakaraka(sid) {
  // Atmakaraka = planet with highest degree within its sign (ignoring Rahu/Ketu)
  const planets = ['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn'];
  let maxDeg = -1, atmakaraka = 'Sun';
  for (const p of planets) {
    const deg = di(sid[p]); // degree within sign
    if (deg > maxDeg) { maxDeg = deg; atmakaraka = p; }
  }
  return atmakaraka;
}

function getWesternSign(tropLon) {
  // Tropical zodiac (no ayanamsa) — Western sun sign
  return Math.floor(((tropLon % 360) + 360) % 360 / 30);
}


// ─── NAVAMSA (D9) CALCULATION ─────────────────────────────────────────────────
// Correct navamsa start signs per rashi: [Ar,Ta,Ge,Ca,Le,Vi,Li,Sc,Sa,Ca,Aq,Pi]
const NAVAMSA_START = [0,9,6,3,0,9,6,3,0,9,6,3]; // 0=Aries,3=Cancer,6=Libra,9=Capricorn

function getNavamsaSign(lon) {
  const sign = so(lon);
  const deg = di(lon);
  const pada = Math.floor(deg / (30/9)); // 0-8
  return (NAVAMSA_START[sign] + pada) % 12;
}

function getNavamsaChart(sid) {
  const d9 = {};
  for (const [planet, lon] of Object.entries(sid)) {
    d9[planet] = getNavamsaSign(lon) * 30 + (di(lon) % (30/9)) * 9;
  }
  return d9;
}

// True Node Rahu — Meeus Ch.47 with perturbation corrections (more accurate than mean node)
function trueRahuLon(j) {
  const t = TC(j);
  const om = n360(125.04455501 - 1934.13626197*t + 2.0708e-3*t*t);
  // 5-term perturbation corrections
  const corr = 
    -1.4979*Math.sin((2*(93.272+483202.0175*t))*R) +
    -0.1500*Math.sin((357.529+35999.050*t)*R) +
    -0.1226*Math.sin((2*(297.850+445267.111*t))*R) +
     0.1176*Math.sin((2*om*R)) +
    -0.0801*Math.sin((2*(134.963+477198.868*t) - om)*R);
  return n360(om + corr/3600);
}

// ─── VARSHPAL (SOLAR RETURN) ENGINE ──────────────────────────────────────────
// Finds exact Julian Day when Sun returns to its natal longitude in target year
function findSolarReturn(natalSunLon, birthYear, targetYear, birthLat, birthLon) {
  // Start search from ~10 days before birthday in target year
  const approxMonth = 3; // rough start - will converge regardless
  let j = JD(targetYear, approxMonth, 1, 12);

  // First pass: step by 1 day to get close
  for (let i = 0; i < 400; i++) {
    const sl = sunLon(j);
    const diff = n360(natalSunLon - sl);
    if (diff < 1 || diff > 359) break;
    j += diff > 180 ? 1 : diff / 360;
  }

  // Newton-Raphson refinement: iterate until within 0.0001 degrees
  for (let i = 0; i < 20; i++) {
    const sl = sunLon(j);
    let diff = n360(natalSunLon - sl);
    if (diff > 180) diff -= 360;
    if (Math.abs(diff) < 0.00001) break;
    j += diff / 360; // Sun moves ~1 degree per day
  }

  return j;
}

function getVarshpal(birthData, targetYear) {
  const { year, month, day, hour, min, tz, lat, lon } = birthData;
  const bh = +(hour||0), bm = +(min||0);
  const birthJD = JD(+year, +month, +day, bh + bm/60 - +tz);
  const birthAy = ayanamsa(birthJD);

  // Natal sun longitude (sidereal)
  const natalSunLon = n360(sunLon(birthJD) - birthAy);

  // Find solar return JDE for target year
  const srJD = findSolarReturn(natalSunLon, +year, targetYear, +lat, +lon);
  const srAy = ayanamsa(srJD);

  // Calculate full chart at solar return moment (UTC)
  // Solar return is a universal moment — use birth lat/lon for lagna
  const srLagna = n360(calcLagna(srJD, +lat, +lon) - srAy);

  // All planet positions at solar return
  const trop = {
    Sun: sunLon(srJD),
    Moon: moonLon(srJD),
    Mercury: planetLon(srJD, 'Mercury'),
    Venus: planetLon(srJD, 'Venus'),
    Mars: planetLon(srJD, 'Mars'),
    Jupiter: planetLon(srJD, 'Jupiter'),
    Saturn: planetLon(srJD, 'Saturn'),
    Rahu: rahuLon(srJD),
    Ketu: n360(rahuLon(srJD) + 180),
  };
  const srSid = {};
  for (const [k, v] of Object.entries(trop)) srSid[k] = n360(v - srAy);

  // Muntha: natal lagna sign + (targetYear - birthYear) signs, mod 12
  const natalLagna = n360(calcLagna(birthJD, +lat, +lon) - birthAy);
  const natalLagnaSign = so(natalLagna);
  const yearsElapsed = targetYear - +year;
  const munthaSign = (natalLagnaSign + yearsElapsed) % 12;
  const ls = so(srLagna);
  const munthaHouse = ((munthaSign - ls + 12) % 12) + 1;

  // Varshesh (Year Lord): lord of the day of solar return
  // Day lord sequence: Sun Mon Tue Wed Thu Fri Sat = 0..6
  const dayOfWeek = Math.floor(srJD + 1.5) % 7;
  const dayLords = ['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn'];
  const varshesh = dayLords[dayOfWeek];

  // Mudda Dasha: starts from solar return Moon nakshatra
  // Same Vimshottari sequence but 1 year total instead of 120 years
  const srMoonNak = no(srSid.Moon);
  const srMoonLord = NL[srMoonNak];
  const srMoonFrac = (n360(srSid.Moon) % (360/27)) / (360/27);
  const muddaIdx = DS.indexOf(srMoonLord);
  let muddaStart = srJD - srMoonFrac * (DY[srMoonLord] / 120) * 365.25;
  const muddaDashas = [];
  for (let i = 0; i < 9; i++) {
    const lord = DS[(muddaIdx + i) % 9];
    const durDays = (DY[lord] / 120) * 365.25;
    const s = muddaStart, e = muddaStart + durDays;
    muddaDashas.push({ lord, startJD: s, endJD: e,
      startDate: jdToDate(s), endDate: jdToDate(e),
      curr: s <= srJD + 180 && e > srJD  // highlight active mudda
    });
    muddaStart = e;
  }

  // Convert JD to readable date
  function jdToDate(jd) {
    const z = Math.floor(jd + 0.5), f = jd + 0.5 - z;
    let a = z;
    if (z >= 2299161) { const g = Math.floor((z - 1867216.25) / 36524.25); a = z + 1 + g - Math.floor(g/4); }
    const b = a + 1524, dd = Math.floor(365.25*(b-122)), e2 = Math.floor((b-dd)/30.6001);
    const day2 = b - dd - Math.floor(30.6001*e2);
    const mo2 = e2 < 14 ? e2-1 : e2-13;
    const yr2 = mo2 > 2 ? b - 4716 : b - 4715;
    const hr = f * 24, hh = Math.floor(hr), mm = Math.round((hr-hh)*60);
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const h12 = hh===0?12:hh>12?hh-12:hh, ampm = hh<12?'AM':'PM';
    return `${day2} ${months[mo2-1]} ${yr2} · ${h12}:${mm.toString().padStart(2,'0')} ${ampm}`;
  }

  return {
    targetYear,
    srJD,
    srDate: jdToDate(srJD),
    srLagna,
    srLagnaSign: so(srLagna),
    srLagnaName: RE[so(srLagna)],
    srSid,
    munthaSign,
    munthaName: RE[munthaSign],
    munthaHouse,
    varshesh,
    varsheshName: varshesh,
    muddaDashas,
    ay: srAy,
  };
}

// Kundali matching (compatibility)
const NG=[0,1,2,0,0,1,0,0,2,1,0,0,0,1,0,0,0,2,2,0,0,0,2,1,0,0,0];
const NN=[0,1,2,0,1,2,0,1,2,0,1,2,0,1,2,0,1,2,0,1,2,0,1,2,0,1,2];
const NY=[0,1,2,3,4,5,6,7,8,9,10,10,11,12,6,12,13,14,3,1,0,7,9,2,11,4,13];
const YE={0:[4],1:[9],2:[13],3:[14],4:[0],5:[6],6:[5],7:[9],8:[9],9:[0,1,7,8],10:[12],11:[3],12:[10],13:[2]};
const VR={0:2,1:1,2:0,3:3,4:2,5:1,6:0,7:3,8:2,9:1,10:0,11:3};
const SL={0:'Mars',1:'Venus',2:'Mercury',3:'Moon',4:'Sun',5:'Mercury',6:'Venus',7:'Mars',8:'Jupiter',9:'Saturn',10:'Saturn',11:'Jupiter'};
const PF={Sun:['Moon','Mars','Jupiter'],Moon:['Sun','Mercury'],Mars:['Sun','Moon','Jupiter'],Mercury:['Sun','Venus'],Jupiter:['Sun','Moon','Mars'],Venus:['Mercury','Saturn'],Saturn:['Mercury','Venus']};
const PE={Sun:['Venus','Saturn'],Moon:['Rahu'],Mars:['Mercury'],Mercury:['Moon'],Jupiter:['Mercury','Venus'],Venus:['Sun','Moon'],Saturn:['Sun','Moon','Mars']};
const pr=(a,b)=>(PF[a]||[]).includes(b)?'f':(PE[a]||[]).includes(b)?'e':'n';

function checkCompatibility(bn,bs,gn,gs){
  const varna=VR[bs]>=VR[gs]?1:0;
  const VG={0:0,1:0,2:1,3:2,4:0,5:1,6:1,7:3,8:1,9:0,10:1,11:2},bv=VG[bs],gv=VG[gs];
  const vashya=bv===gv?2:(bv===0&&gv===1)||(bv===1&&gv===0)?1:0;
  const b2g=((gn-bn+27)%27)+1,g2b=((bn-gn+27)%27)+1,tg=r=>[1,3,5,7].includes(r%9||9);
  const tara=(tg(b2g)?1.5:0)+(tg(g2b)?1.5:0);
  const by=NY[bn],gy=NY[gn],yoni=(YE[by]||[]).includes(gy)?0:by===gy?4:2;
  const bl=SL[bs],gl=SL[gs],br=pr(bl,gl),gr=pr(gl,bl);
  const graha=br==='f'&&gr==='f'?5:br==='f'&&gr==='n'?4:br==='n'&&gr==='f'?4:br==='n'&&gr==='n'?3:1;
  const bg=NG[bn],gg=NG[gn],gana=bg===gg?6:(bg===0&&gg===1)||(bg===1&&gg===0)?5:(bg===0&&gg===2)||(bg===2&&gg===0)?1:0;
  const rel=((gs-bs+12)%12)+1,relR=((bs-gs+12)%12)+1;
  const bhakuta=[[6,8],[8,6],[5,9],[9,5],[3,11],[11,3]].some(([a,b])=>a===rel&&b===relR)?0:7;
  const nadiScore=NN[bn]===NN[gn]?0:8;
  const total=Math.round((varna+vashya+tara+yoni+graha+gana+bhakuta+nadiScore)*10)/10;
  return{total,nadiTension:nadiScore===0,energyMismatch:gana===0,
    kutas:[
      {n:'Purpose Alignment',s:varna,m:1,d:'Shared values & direction'},
      {n:'Natural Attraction',s:vashya,m:2,d:'Magnetic pull between you'},
      {n:'Health & Wellbeing',s:tara,m:3,d:'Physical compatibility'},
      {n:'Intimacy',s:yoni,m:4,d:'Deep personal connection'},
      {n:'Mental Bond',s:graha,m:5,d:'Intellectual harmony'},
      {n:'Temperament',s:gana,m:6,d:'Personality compatibility'},
      {n:'Emotional Harmony',s:bhakuta,m:7,d:'Heart-level connection'},
      {n:'Life Energy',s:nadiScore,m:8,d:'Long-term vitality together'}
    ]};
}

// SVG Chart
const SIP=[[1,0],[2,0],[3,0],[3,1],[3,2],[3,3],[2,3],[1,3],[0,3],[0,2],[0,1],[0,0]];
function ChartSVG({sid,lagna}){
  const ls=so(lagna),by=Array.from({length:12},()=>[]);
  const ab={Sun:'Sun',Moon:'Moon',Mercury:'Mer',Venus:'Ven',Mars:'Mars',Jupiter:'Jup',Saturn:'Sat',Rahu:'Ra',Ketu:'Ke'};
  for(const[n,l]of Object.entries(sid))by[so(l)].push(ab[n]);
  return(<svg viewBox="0 0 400 400" style={{width:'100%',maxWidth:360,display:'block',margin:'0 auto'}}>
    <defs>
      <linearGradient id="ng1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#ffffff"/><stop offset="100%" stopColor="#f8f5ff"/></linearGradient>
      <linearGradient id="ngL" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#ede9fe"/><stop offset="100%" stopColor="#ddd6fe"/></linearGradient>
    </defs>
    {SIP.map(([c,r],sign)=>{
      const x=c*100,y=r*100,isL=sign===ls,h=((sign-ls+12)%12)+1,pl=by[sign];
      return(<g key={sign}>
        <rect x={x+.5} y={y+.5} width={99} height={99} fill={isL?'url(#ngL)':'url(#ng1)'} stroke={isL?'#7c3aed':'#e9d5ff'} strokeWidth={isL?1.5:.7}/>
        {isL&&<><line x1={x+1.5} y1={y+1.5} x2={x+20} y2={y+1.5} stroke="#7c3aed" strokeWidth="2"/><line x1={x+1.5} y1={y+1.5} x2={x+1.5} y2={y+20} stroke="#7c3aed" strokeWidth="2"/></>}
        <text x={x+50} y={y+13} textAnchor="middle" fontSize="8" fill="#a78bfa" fontFamily="sans-serif" fontWeight="600">{RSH[sign]}</text>
        <text x={x+95} y={y+13} textAnchor="end" fontSize="7" fill="#9ca3af">{h}</text>
        {pl.map((a,i)=><text key={i} x={x+7+(i%2)*44} y={y+27+Math.floor(i/2)*14} fontSize="9" fill={PC[Object.keys(ab).find(k=>ab[k]===a)]||'#1a0a2e'} fontFamily="sans-serif" fontWeight="500">{a}</text>)}
      </g>);
    })}
    <rect x={100.5} y={100.5} width={199} height={199} fill="#f8f5ff" stroke="#e9d5ff" strokeWidth=".6"/>
    <line x1={100} y1={100} x2={300} y2={300} stroke="#e9d5ff" strokeWidth=".6" strokeDasharray="5,4"/>
    <line x1={300} y1={100} x2={100} y2={300} stroke="#e9d5ff" strokeWidth=".6" strokeDasharray="5,4"/>
    <text x={200} y={194} textAnchor="middle" fontSize="24" fill="#a78bfa" fontFamily="serif" opacity=".8">✦</text>
    <text x={200} y={212} textAnchor="middle" fontSize="7" fill="#9ca3af" fontFamily="sans-serif" letterSpacing="3">NATAL</text>
  </svg>);
}

function ReadingText({text}){
  const secs=[];let cur=null;
  text.split('\n').forEach(line=>{const t=line.trim();if(!t)return;if(t.startsWith('## ')){if(cur)secs.push(cur);cur={title:t.slice(3),items:[]};}else{if(!cur)cur={title:null,items:[]};cur.items.push(t);}});
  if(cur)secs.push(cur);
  return(<div className="reading">{secs.map((s,i)=>(<div key={i}>{s.title&&<h3>{s.title}</h3>}{s.items.map((it,j)=>{if(it.startsWith('- ')||it.startsWith('• '))return<ul key={j}><li>{it.replace(/^[-•]\s*/,'')}</li></ul>;if(it.startsWith('"'))return<div key={j} className="reading-quote">{it}</div>;return<p key={j}>{it}</p>;})}</div>))}</div>);
}

const CITIES={delhi:[28.6517,77.2219],'new delhi':[28.6517,77.2219],mumbai:[19.076,72.8777],bangalore:[12.9716,77.5946],chennai:[13.0827,80.2707],kolkata:[22.5726,88.3639],hyderabad:[17.385,78.4867],pune:[18.5204,73.8567],ahmedabad:[23.0225,72.5714],jaipur:[26.9124,75.7873],lucknow:[26.8467,80.9462],surat:[21.1702,72.8311],kochi:[9.9312,76.2673],varanasi:[25.3176,82.9739],chandigarh:[30.7333,76.7794],gurgaon:[28.4595,77.0266],noida:[28.5355,77.391],amritsar:[31.634,74.8723],jodhpur:[26.2389,73.0243],udaipur:[24.5854,73.7125],mysore:[12.2958,76.6394],dehradun:[30.3165,78.0322],goa:[15.2993,74.124],tirupati:[13.6288,79.4192],madurai:[9.9252,78.1198],coimbatore:[11.0168,76.9558],kathmandu:[27.7172,85.324],dhaka:[23.8103,90.4125],colombo:[6.9271,79.8612],dubai:[25.2048,55.2708],riyadh:[24.7136,46.6753],doha:[25.2854,51.531],singapore:[1.3521,103.8198],'kuala lumpur':[3.139,101.6869],bangkok:[13.7563,100.5018],tokyo:[35.6762,139.6503],beijing:[39.9042,116.4074],'hong kong':[22.3193,114.1694],london:[51.5074,-0.1278],'new york':[40.7128,-74.006],'los angeles':[34.0522,-118.2437],'san francisco':[37.7749,-122.4194],chicago:[41.8781,-87.6298],houston:[29.7604,-95.3698],phoenix:[33.4484,-112.074],philadelphia:[39.9526,-75.1652],'san antonio':[29.4241,-98.4936],'san diego':[32.7157,-117.1611],dallas:[32.7767,-96.797],austin:[30.2672,-97.7431],toronto:[43.6532,-79.3832],sydney:[-33.8688,151.2093],melbourne:[-37.8136,144.9631],paris:[48.8566,2.3522],berlin:[52.52,13.405],amsterdam:[52.3676,4.9041],rome:[41.9028,12.4964],madrid:[40.4168,-3.7038],moscow:[55.7558,37.6173],istanbul:[41.0082,28.9784]};
function cityLookup(q){const s=q.toLowerCase().trim();if(CITIES[s])return CITIES[s];for(const[k,v]of Object.entries(CITIES))if(k.includes(s)||s.includes(k))return v;return null;}

async function callAI(messages,max_tokens=1000){
  const res=await fetch('/api/reading',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens,messages})});
  const d=await res.json();if(d.error)throw new Error(d.error.message);
  return d.content?.map(b=>b.text||'').join('')||'';
}

const CHAT_SUGGS=['Why do I keep attracting the wrong people?','Is 2026 good for a career change?','Am I in a good period right now?','What does my rising sign really say?','When is my next relationship window?','What are my biggest strengths?'];

// ─── BIRTH FORM (standalone to prevent focus loss on re-render) ─────────────
async function searchPlacesUtil(query, setResults) {
  if(!query||query.length<2){setResults([]);return;}
  try{
    const r=await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=6&language=en&format=json`);
    const d=await r.json();setResults(d.results||[]);
  }catch{setResults([]);}
}

function BirthForm({formData,setFormData,onSubmit,loading,error,placeRes,setPlaceRes,title='Your Birth Details'}){
  const setF=(k,v)=>setFormData(p=>({...p,[k]:v}));
  return(
    <div className="form-wrap">
      <div className="screen-hdr"><div className="screen-title">{title}</div></div>
      <div style={{display:'flex',flexDirection:'column',gap:0,padding:'0 0 16px'}}>
        <div className="fg"><label className="flbl">Your name (optional)</label>
          <input className="fi" placeholder="e.g. Sarah" value={formData.name} onChange={e=>setF('name',e.target.value)}/>
        </div>
        <div style={{marginBottom:12}}><label className="flbl">Date of Birth</label>
          <div className="fgrid">
            <input className="fi" placeholder="Day" maxLength={2} value={formData.day} onChange={e=>setF('day',e.target.value)}/>
            <input className="fi" placeholder="Month" maxLength={2} value={formData.month} onChange={e=>setF('month',e.target.value)}/>
          </div>
          <div style={{marginTop:8}}><input className="fi" placeholder="Year (e.g. 1990)" maxLength={4} value={formData.year} onChange={e=>setF('year',e.target.value)}/></div>
        </div>
        <div style={{marginBottom:12}}><label className="flbl">Time of Birth</label>
          <div className="fgrid">
            <input className="fi" placeholder="Hour (0–23)" maxLength={2} value={formData.hour} onChange={e=>setF('hour',e.target.value)}/>
            <input className="fi" placeholder="Minutes" maxLength={2} value={formData.min} onChange={e=>setF('min',e.target.value)}/>
          </div>
          <div className="fhint">24-hour format · e.g. 14 30 for 2:30 PM</div>
        </div>
        <div style={{marginBottom:12}}><label className="flbl">UTC Offset</label>
          <input className="fi" placeholder="e.g. 5.5 for India, -5 for New York" value={formData.tz} onChange={e=>setF('tz',e.target.value)}/>
        </div>
        <div style={{marginBottom:16}}><label className="flbl">Birth Location</label>
          <div className="ac-wrap">
            <input className="fi" placeholder="Type your city..." value={formData.place}
              onChange={e=>{setF('place',e.target.value);searchPlacesUtil(e.target.value,setPlaceRes);}}
              onBlur={()=>setTimeout(()=>setPlaceRes([]),200)}
              autoComplete="off"/>
            {placeRes.length>0&&(
              <div className="ac-drop">
                {placeRes.map((r,i)=>(
                  <div key={i} className="ac-item" onMouseDown={()=>{
                    setF('place',r.name);
                    setF('lat',r.latitude.toFixed(4));
                    setF('lon',r.longitude.toFixed(4));
                    setPlaceRes([]);
                  }}>
                    <div className="ac-city">{r.name}</div>
                    <div className="ac-region">{[r.admin1,r.country].filter(Boolean).join(', ')}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {formData.lat&&formData.lon&&<div className="fhint ok">✓ {formData.place} · {formData.lat}°, {formData.lon}°</div>}
        </div>
        {error&&<div style={{color:'var(--red)',fontSize:13,marginBottom:10,padding:'10px 12px',background:'var(--rbg)',borderRadius:8,border:'1px solid var(--rbc)'}}>{error}</div>}
        <button className="btn-primary" onClick={onSubmit} disabled={loading}>
          {loading?'Calculating…':'Calculate My Chart →'}
        </button>
      </div>
    </div>
  );
}


// ─── DASHA MEANINGS ──────────────────────────────────────────────────────────
const DASHA_MEANINGS = {
  Su:'A period of self-definition and visibility. Your identity steps forward. Career and recognition tend to expand.',
  Mo:'An inward, emotionally rich period. Intuition heightens, relationships deepen, and the inner world asks for attention.',
  Ma:'A period of drive and decisive action. Energy is high, ambitions push forward, results come through bold moves.',
  Ra:'A period of rapid change and transformation. Ambitious, disorienting, and often the most pivotal chapter of life.',
  Ju:'An expansive, fortunate period. Opportunities multiply, wisdom deepens, and life tends to grow in meaningful ways.',
  Sa:'A period of discipline and long-term building. Slow but lasting. What you build now tends to endure.',
  Me:'A period of communication, learning, and mental expansion. Writing, business, and ideas tend to flourish.',
  Ke:'A spiritual, reflective period. Outer ambition quiets. Inner knowing and detachment bring a different kind of clarity.',
  Ve:'A period of pleasure, creativity, and connection. Love, beauty, and abundance tend to flow more easily.',
};

// ─── CONSTELLATION LOADER ────────────────────────────────────────────────────
function ConstellationLoader({text,sub}){
  const stars=[
    {cx:40,cy:110},{cx:65,cy:95},{cx:90,cy:88},{cx:115,cy:92},
    {cx:130,cy:68},{cx:150,cy:50},{cx:160,cy:30}
  ];
  const lines=[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6]];
  return(
    <div className="constellation-loader">
      <svg className="constellation-svg" viewBox="0 0 200 140">
        {lines.map(([a,b],i)=>(
          <line key={i} className="constellation-line"
            x1={stars[a].cx} y1={stars[a].cy}
            x2={stars[b].cx} y2={stars[b].cy}/>
        ))}
        {stars.map((s,i)=>(
          <circle key={i} className="constellation-star" cx={s.cx} cy={s.cy} r="3"/>
        ))}
      </svg>
      <div className="constellation-text">{text||'Reading the stars...'}</div>
      {sub&&<div className="constellation-sub">{sub}</div>}
    </div>
  );
}

// ─── SHARE SHEET ─────────────────────────────────────────────────────────────
function ShareSheet({emoji,title,sub,onClose}){
  const doShare=()=>{
    const txt=emoji+' '+title+'\n'+sub+'\n\nDiscover yours free at natalai.live';
    if(navigator.share){navigator.share({title:'Natal AI',text:txt}).catch(()=>{});}
    else if(navigator.clipboard){navigator.clipboard.writeText(txt).then(()=>alert('Copied!'));}
    onClose();
  };
  return(
    <div className="share-modal" onClick={onClose}>
      <div className="share-sheet" onClick={e=>e.stopPropagation()}>
        <div className="share-handle"/>
        <div className="share-preview">
          <div className="share-preview-app">NATAL AI</div>
          <span className="share-preview-emoji">{emoji}</span>
          <div className="share-preview-title">{title}</div>
          <div className="share-preview-sub">{sub}</div>
        </div>
        <div className="share-actions">
          <div className="share-action" onClick={doShare}>Share</div>
          <div className="share-action" onClick={onClose}>Cancel</div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App(){
  const [nav,setNav]=useState('home'); // home|chart|reading|chat|more
  const [chartTab,setChartTab]=useState('chart'); // chart|planets|daily|cycles|influences|gifts|transits
  const [moreScreen,setMoreScreen]=useState(null); // null|compat|guidance|privacy
  const [showForm,setShowForm]=useState(false);
  const [chart,setChart]=useState(null);
  const [cycles,setCycles]=useState(null);
  const [transits,setTransits]=useState(null);
  const [influences,setInfluences]=useState(null);
  const [gifts,setGifts]=useState(null);
  const [panchang,setPanchang]=useState(null);
  const [chog,setChog]=useState(null);
  const [chartStyle,setChartStyle]=useState('south');
  const [expandedCycle,setExpandedCycle]=useState(null);
  const [expandedSub,setExpandedSub]=useState(null);
  const [varshpal,setVarshpal]=useState(null);
  const [welcomeStep,setWelcomeStep]=useState(1);
  const [shareData,setShareData]=useState(null);
  const [d9,setD9]=useState(null);
  const [atmakaraka,setAtmakaraka]=useState(null);
  const [varshpalYear,setVarshpalYear]=useState(2026);

  // Reading
  const [reading,setReading]=useState('');
  const [readLoad,setReadLoad]=useState(false);
  const [readErr,setReadErr]=useState('');

  // Chat
  const [msgs,setMsgs]=useState([]);
  const [chatInput,setChatInput]=useState('');
  const [chatLoad,setChatLoad]=useState(false);
  const msgsEndRef=useRef(null);

  // Compatibility
  const [compatType,setCompatType]=useState(null); // 'partner'|'friend'
  const [compatResult,setCompatResult]=useState(null);

  // Guidance (remedies)
  const [guidance,setGuidance]=useState('');
  const [guidLoad,setGuidLoad]=useState(false);

  // Transit reading
  const [transitR,setTransitR]=useState('');
  const [trLoad,setTrLoad]=useState(false);

  // Form
  const [f,sf]=useState({name:'',day:'',month:'',year:'',hour:'',min:'',tz:'0',place:'',lat:'',lon:''});
  const [casting,setCasting]=useState(false);
  const [castErr,setCastErr]=useState('');
  const [geoLoad,setGeoLoad]=useState(false);
  const [placeResults,setPlaceResults]=useState([]);

  // Compatibility form
  const [cf,scf]=useState({name:'',day:'',month:'',year:'',hour:'',min:'',tz:'0',place:'',lat:'',lon:''});
  const [cf2,scf2]=useState({name:'',day:'',month:'',year:'',hour:'',min:'',tz:'0',place:'',lat:'',lon:''});
  const [compatStep,setCompatStep]=useState(0); // 0=type, 1=person1, 2=person2, 3=result
  const [compatLoad,setCompatLoad]=useState(false);
  const [compatErr,setCompatErr]=useState('');
  const [cfGeoLoad,setCfGeoLoad]=useState(false);
  const [cf2GeoLoad,setCf2GeoLoad]=useState(false);
  const [cfResults,setCfResults]=useState([]);
  const [cf2Results,setCf2Results]=useState([]);

  useEffect(()=>{msgsEndRef.current?.scrollIntoView({behavior:'smooth'});},[msgs]);

  const set=(k,v)=>sf(p=>({...p,[k]:v}));



  const castChart=async()=>{
    if(!f.day||!f.month||!f.year){setCastErr('Please enter your birth date.');return;}
    let lat=parseFloat(f.lat),lon=parseFloat(f.lon);
    if((!lat||!lon)&&f.place){
      const loc=cityLookup(f.place);
      if(loc){lat=loc[0];lon=loc[1];}
      else{
        setCasting(true);setGeoLoad(true);
        try{const r=await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(f.place)}&count=1&language=en&format=json`);const d=await r.json();if(d.results?.[0]){lat=d.results[0].latitude;lon=d.results[0].longitude;}else{setCastErr('Location not found. Please enter coordinates.');setCasting(false);setGeoLoad(false);return;}}
        catch{setCastErr('Network error. Please try again.');setCasting(false);setGeoLoad(false);return;}
        setGeoLoad(false);
      }
    }
    if(!lat||!lon){setCastErr('Please enter a birth location.');return;}
    setCasting(true);setCastErr('');
    try{
      const c=computeChart(+f.year,+f.month,+f.day,+(f.hour||0),+(f.min||0),+f.tz,lat,lon);
      const j=JD(+f.year,+f.month,+f.day,(+(f.hour||0)+(+(f.min||0)/60)-+f.tz));
      const ay=ayanamsa(j);
      setChart(c);setCycles(getLifeCycles(c.sid.Moon,+f.year,+f.month,+f.day));
      setTransits(getTransits(c.lagna));
      setInfluences({mars:getMarsInfluence(c.sid,c.lagna),rk:getRahuKetuAxis(c.sid),saturn:getSaturnPassage(c.sid)});
      setGifts(getCosmicGifts(c.sid,c.lagna));
      setD9(getNavamsaChart(c.sid));
      setAtmakaraka(getAtmakaraka(c.sid));
      try{setVarshpal(getVarshpal({year:f.year,month:f.month,day:f.day,hour:f.hour,min:f.min,tz:f.tz,lat,lon},2026));}catch(ve){console.log('varshpal err',ve);}
      const pg=getPanchang(j,ay);setPanchang(pg);setChog(getChog(pg.vara));
      setReading('');setMsgs([]);setCompatResult(null);setTransitR('');setGuidance('');
      setExpandedCycle(null);setExpandedSub(null);
      setShowForm(false);setNav('chart');setChartTab('chart');
    }catch(e){setCastErr('Error calculating chart. Please check your details.');}
    setCasting(false);
  };

  const buildCtx=()=>{
    if(!chart)return'';
    const{sid,lagna}=chart,ls=so(lagna);
    const bh=+(f.hour||12),bm=+(f.min||0),ampm=bh<12?'AM':'PM',h12=bh===0?12:bh>12?bh-12:bh;
    return`${f.name||'Native'} | Born ${f.day}/${f.month}/${f.year} ${h12}:${bm.toString().padStart(2,'0')} ${ampm} UTC+${f.tz} | ${f.place}\nRising Sign: ${RE[ls]} | Moon Sign: ${RE[so(sid.Moon)]} | Birth Star: ${NK[no(sid.Moon)]}\n${Object.entries(sid).map(([n,l])=>`${n}: ${RE[so(l)]} House ${((so(l)-ls+12)%12)+1}`).join(', ')}\n${cycles?.curr?`Current Life Cycle: ${FN[cycles.curr.lord]} until ${cycles.curr.end.toFixed(1)}`:''}`; 
  };

  const doReading=async()=>{
    setReadLoad(true);setReadErr('');
    try{
      setReading(await callAI([{role:'user',content:`You are Acharya Adi Yogi, a warm wise Vedic astrologer. Write a personal reading. Plain English only — no Sanskrit. Chart:\n${buildCtx()}\n\nFour rules for every section: (1) Patterns not predictions — describe tendencies not fixed events. (2) Self not others — only describe what this person may experience, never what partners or family will do. (3) Use phrases like traditionally associated with or may tend toward. (4) Offer insight not instructions.\n\nTone: warm, intelligent, specific. Like a wise friend who reads charts. Never use dramatic words like destined, doom, or calamity.\n\nStructure — ## heading, max 3 short sentences per section:\n## The Story That Shaped You\n## What Is Unfolding Right Now\n## Your Natural Strengths\n## Where You May Face Resistance\n## Career and Purpose\n## Love and Connection\n## What Is Coming\n## One Practice That May Help\n## A Personal Message`}]));
    }catch(e){setReadErr('Could not generate reading. Please check your connection.');}
    setReadLoad(false);
  };

  const doGuidance=async()=>{
    setGuidLoad(true);
    try{
      setGuidance(await callAI([{role:'user',content:`You are Acharya Adi Yogi. Give practical personal guidance for this chart:\n${buildCtx()}\n\nRules: use ## for each section, plain English, be very specific, explain WHY each suggestion helps this specific person.\n## Your Daily Practice (specific mantra or affirmation with count and timing)\n## Your Gemstone (specific stone, why it helps, how to wear it)\n## Your Best Day of the Week (and what to do on it)\n## Your Charity (specific act of giving that balances this chart)\n## Your Most Important Practice`}]));
    }catch{}
    setGuidLoad(false);
  };

  const doTransitReading=async()=>{
    setTrLoad(true);
    try{
      const ts=(transits||[]).map(t=>`${t.planet} in ${t.signName} House ${t.house}`).join(', ');
      setTransitR(await callAI([{role:'user',content:`You are Acharya Adi Yogi. April 2026 transit reading for:\n${buildCtx()}\nCurrent planetary positions: ${ts}\n\nPlain English, no Sanskrit. ## headings, 2-3 sentences each, direct and personal.\n## What April 2026 Holds For You\n## Career & Opportunities This Month\n## Love & Relationships\n## Your Health Focus\n## Your Best Action This Month`}]));
    }catch{}
    setTrLoad(false);
  };

  const sendChat=async(text)=>{
    if(!text.trim()||chatLoad)return;
    const userMsg={role:'user',content:text};
    const newMsgs=[...msgs,userMsg];
    setMsgs(m=>[...m,{role:'user',content:text}]);
    setChatInput('');setChatLoad(true);
    try{
      const reply=await callAI([{role:'user',content:`You are Acharya Adi Yogi, a warm wise Vedic astrologer. Plain English only — no Sanskrit. Chart:\n${buildCtx()}\n\nRules: max 3-4 short sentences. Speak as patterns not predictions (say traditionally associated with, may tend toward). Never describe what other people will do — only what this person may experience. Warm, specific, like a wise friend. No dramatic language.`},{role:'assistant',content:'Hello! I am here to guide you.'}, ...newMsgs],400);
      setMsgs(m=>[...m,{role:'assistant',content:reply}]);
    }catch{setMsgs(m=>[...m,{role:'assistant',content:'I had trouble connecting. Please try again.'}]);}
    setChatLoad(false);
  };

  // Compatibility calculation
  const castCompat=async(isFirst)=>{
    const form=isFirst?cf:cf2;
    const setForm=isFirst?scf:scf2;
    if(!form.day||!form.month||!form.year){setCompatErr('Please enter birth date.');return;}
    let lat=parseFloat(form.lat),lon=parseFloat(form.lon);
    if((!lat||!lon)&&form.place){
      const loc=cityLookup(form.place);
      if(loc){lat=loc[0];lon=loc[1];setForm(p=>({...p,lat:loc[0].toFixed(4),lon:loc[1].toFixed(4)}));}
      else{
        const gl=isFirst?setCfGeoLoad:setCf2GeoLoad;gl(true);
        try{const r=await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(form.place)}&count=1&language=en&format=json`);const d=await r.json();if(d.results?.[0]){lat=d.results[0].latitude;lon=d.results[0].longitude;setForm(p=>({...p,lat:lat.toFixed(4),lon:lon.toFixed(4)}));}else{setCompatErr('Location not found.');gl(false);return;}}
        catch{setCompatErr('Network error.');const gl2=isFirst?setCfGeoLoad:setCf2GeoLoad;gl2(false);return;}
        const gl2=isFirst?setCfGeoLoad:setCf2GeoLoad;gl2(false);
      }
    }
    if(!lat||!lon){setCompatErr('Please enter birth location.');return;}
    setCompatErr('');
    try{
      const c=computeChart(+form.year,+form.month,+form.day,+(form.hour||0),+(form.min||0),+form.tz,lat,lon);
      setForm(p=>({...p,lat:lat.toFixed(4),lon:lon.toFixed(4),_chart:c}));
      if(isFirst){setCompatStep(2);}
      else{
        const c1=cf._chart;if(!c1){setCompatErr('Please complete Person 1 first.');return;}
        const bn=no(c1.sid.Moon),bs=so(c1.sid.Moon),gn=no(c.sid.Moon),gs=so(c.sid.Moon);
        setCompatResult(checkCompatibility(bn,bs,gn,gs));setCompatStep(3);
      }
    }catch(e){setCompatErr('Error calculating chart.');}
  };

  // ── RENDER HELPERS ──
  const Loader=({text='Calculating...',sub=''})=>(<div className="loader"><div className="spinner"/><div className="loader-text">{text}</div>{sub&&<div className="loader-sub">{sub}</div>}</div>);
  const Btn=({onClick,children,disabled,style})=>(<button className="btn-primary" onClick={onClick} disabled={disabled} style={style}>{children}</button>);



  // ── SCREENS ──



  const ChartScreen=()=>{
    if(!chart)return(<div className="wrap"><div className="empty"><span className="empty-icon">✦</span><div className="empty-title">No chart yet</div><div className="empty-desc">Go to Home and enter your birth details to generate your natal chart.</div></div><button className="btn-ghost" style={{margin:'0 16px',width:'calc(100% - 32px)'}} onClick={()=>{setNav('home');setShowForm(true);}}>Enter birth details →</button></div>);

    return(<>
      <div className="screen-hdr">
        <div className="screen-title">{f.name?`${f.name} — Natal Chart`:'Your Natal Chart'}</div>
        <div className="screen-action" onClick={()=>{setChart(null);setNav('home');setShowForm(true);}}>Edit</div>
      </div>
      <div className="snap-bar">
        <div className="snap-pill"><div className="sp-val">{RE[so(chart.lagna)]}</div><div className="sp-key">Rising</div></div>
        <div className="snap-pill"><div className="sp-val">{RE[so(chart.sid.Moon)]}</div><div className="sp-key">Moon</div></div>
        <div className="snap-pill"><div className="sp-val">{NK[no(chart.sid.Moon)].split(' ')[0]}</div><div className="sp-key">Birth Star</div></div>
        {cycles?.curr&&<div className="snap-pill"><div className="sp-val">{FN[cycles.curr.lord]}</div><div className="sp-key">Cycle</div></div>}
        {panchang&&<div className="snap-pill"><div className="sp-val">{panchang.varaName}</div><div className="sp-key">Today</div></div>}
      </div>

      <div style={{padding:'0 16px',marginBottom:10}}>
        <div className="toggle-row">
          {[['chart','Chart'],['planets','Planets'],['daily','Daily Guide'],['cycles','Life Cycles'],['timing','Life Timing'],['influences','Influences'],['gifts','Cosmic Gifts'],['transits','Transits'],['varshpal','Year Chart']].map(([id,label])=>(
            <div key={id} className={`tg-btn${chartTab===id?' on':''}`} style={{fontSize:10,padding:'7px 2px'}} onClick={()=>setChartTab(id)}>{label}</div>
          ))}
        </div>
      </div>

      <div className="wrap" style={{paddingTop:0}}>

        {chartTab==='chart'&&(<>
          {/* Western vs Vedic comparison — the "wow moment" for US users */}
          {chart.tropSun!==undefined&&(()=>{
            const westernSun=getWesternSign(chart.tropSun);
            const vedicSun=so(chart.sid.Sun);
            const westernRising=getWesternSign(chart.lagna+ayanamsa(chart.jde)*0+0); // approx
            const show=westernSun!==vedicSun;
            if(!show)return null;
            return(<div className="wv-card">
              <div className="wv-title">Your Vedic Signs Differ From Western</div>
              <div className="wv-row">
                <span className="wv-label">Sun</span>
                <span className="wv-western">{RE[westernSun]}</span>
                <span className="wv-arrow">→</span>
                <span className="wv-vedic">{RE[vedicSun]}</span>
              </div>
              <div className="wv-row">
                <span className="wv-label">Rising</span>
                <span className="wv-western">~{RE[(so(chart.lagna)+1)%12]}</span>
                <span className="wv-arrow">→</span>
                <span className="wv-vedic">{RE[so(chart.lagna)]}</span>
              </div>
              <div className="wv-note">Vedic astrology uses the sidereal zodiac — aligned with actual star positions. Western astrology uses the tropical zodiac. This ~24° difference shifts most signs back by one. Vedic tends to be more precise for life timing.</div>
            </div>);
          })()}

          {/* D1 Birth Chart */}
          <div className="chart-svg-wrap">
            <div className="d9-label">D1 · Birth Chart</div>
            <ChartSVG sid={chart.sid} lagna={chart.lagna}/>
          </div>

          {/* D9 Navamsa Chart */}
          {d9&&(<div className="chart-svg-wrap" style={{marginTop:12}}>
            <div className="d9-label">D9 · Soul Chart (Navamsa)</div>
            <ChartSVG sid={d9} lagna={chart.lagna}/>
          </div>)}

          <div style={{textAlign:'center',fontSize:11,color:'var(--hint)',marginBottom:8}}>
            Meeus algorithms · Lahiri Ayanamsa {chart.ay.toFixed(2)}° · Whole Sign
          </div>

          {/* Nakshatra Identity */}
          {(()=>{const nak=no(chart.sid.Moon),p=NAK_PROFILES[nak];return p?(
            <div className="nak-card">
              <span className="nak-label">Your Birth Star — {NK[nak]}</span>
              <span className="nak-emoji">{p.emoji}</span>
              <div className="nak-title">{p.title}</div>
              <div className="nak-desc">{p.desc}</div>
              <div className="nak-keywords">{p.keywords.map((k,i)=><span key={i} className="nak-kw">{k}</span>)}</div>
            </div>
          ):null;})()}

          {/* Soul Purpose — Atmakaraka */}
          {atmakaraka&&SOUL_MEANINGS[atmakaraka]&&(
            <div className="soul-card">
              <div className="soul-label">Your Soul Planet</div>
              <div className="soul-planet">{atmakaraka} · {SOUL_MEANINGS[atmakaraka].split('.')[0]}</div>
              <div className="soul-meaning">{SOUL_MEANINGS[atmakaraka]}</div>
            </div>
          )}
        </>)}

        {chartTab==='planets'&&(<div className="card">
          <table className="ptable">
            <thead><tr><th>Planet</th><th>Sign</th><th>House</th><th>Degree</th></tr></thead>
            <tbody>{Object.entries(chart.sid).map(([planet,lon])=>{
              const s=so(lon),h=((s-so(chart.lagna)+12)%12)+1;
              return(<tr key={planet}>
                <td><span className="p-sym">{GL[planet]}</span><span className="p-name">{planet}</span></td>
                <td><span className="p-sign">{RE[s]}</span></td>
                <td><span className="p-house">H{h}</span></td>
                <td><span className="p-deg">{di(lon).toFixed(1)}°</span></td>
              </tr>);
            })}</tbody>
          </table>
        </div>)}

        {chartTab==='daily'&&panchang&&(<>
          <div className="dg-grid">
            <div className="dg-card"><div className="dg-label">Moon Phase</div><div className="dg-value">{panchang.moonPhase?.split('·')[1]?.trim()||panchang.paksha}</div><div className="dg-sub">{panchang.paksha} Moon</div></div>
            <div className="dg-card"><div className="dg-label">Lunar Mansion</div><div className="dg-value">{panchang.nakName}</div><div className="dg-sub">{panchang.varaName}</div></div>
            <div className="dg-card"><div className="dg-label">Shadow Window</div><div className="dg-value" style={{fontSize:13}}>{panchang.rahuWindow}</div><div className="dg-sub">Avoid new starts</div><span className="dg-badge bad">Caution</span></div>
            <div className="dg-card"><div className="dg-label">Day Energy</div><div className="dg-value">{panchang.varaName}</div><div className="dg-sub">Ruled by {panchang.varaName?.includes('Sun')?'Sun':panchang.varaName?.includes('Mon')?'Moon':panchang.varaName?.includes('Tue')?'Mars':panchang.varaName?.includes('Wed')?'Mercury':panchang.varaName?.includes('Thu')?'Jupiter':panchang.varaName?.includes('Fri')?'Venus':'Saturn'}</div></div>
          </div>
          <div className="card" style={{marginTop:12}}>
            <div className="card-title">Time Quality Today</div>
            <div className="tq-grid">{chog?.map((c,i)=>(<div key={i} className={`tq ${c.qual}`}><div className="tq-name">{c.name}</div><div className="tq-time">{c.time}</div><div className={`tq-tag ${c.qual}`}>{c.desc}</div></div>))}</div>
          </div>
          <div className="card">
            <div className="card-title">April 2026 Transits</div>
            {trLoad?<Loader text="Reading the sky..."/>:transitR?<ReadingText text={transitR}/>:<button className="btn-ghost" onClick={doTransitReading}>Get transit reading →</button>}
          </div>
        </>)}

        {chartTab==='cycles'&&cycles&&(<>
          <div className="card">
            <div className="card-title">Currently Running</div>
            <div className="card-value">{FN[cycles.curr?.lord]} Cycle</div>
            <div className="card-desc">{cycles.curr?.start.toFixed(1)} — {cycles.curr?.end.toFixed(1)} · {DY[cycles.curr?.lord]} years</div>
          </div>
          <div className="cycle-tree">{cycles.seq.map((major,i)=>{
            const isExp=expandedCycle===major.lord+'_'+i;
            const subs=isExp?getCycleSubs(major.lord,major.start,major.end):[];
            const isPast=major.end<2026.25;
            const isCurr=cycles.curr?.lord===major.lord&&Math.abs((cycles.curr?.start||0)-major.start)<.01;
            return(<div key={i} className={`cycle-node${isCurr?' curr':isPast?' past':''}`}>
              <div className="cycle-hdr" onClick={()=>setExpandedCycle(isExp?null:major.lord+'_'+i)}>
                <span className="cycle-lord">{FN[major.lord]} Major Cycle</span>
                <span className="cycle-yrs">{Math.round(major.start)}–{Math.round(major.end)}</span>
                <span className={`cycle-arr${isExp?' open':''}`}>▶</span>
              </div>
              {isExp&&<div className="cycle-children">{subs.map((sub,j)=>{
                const isAExp=expandedSub===sub.lord+'_'+i+'_'+j;
                const micros=isAExp?getCycleMicro(major.lord,sub.lord,sub.start,sub.end):[];
                return(<div key={j} className={`cycle-child${sub.curr?' curr-child':''}`}>
                  <div className="cycle-child-hdr" onClick={()=>setExpandedSub(isAExp?null:sub.lord+'_'+i+'_'+j)}>
                    <span className="cycle-child-lord">{FN[sub.lord]} Sub-Cycle</span>
                    <span className="cycle-child-yrs">{sub.start.toFixed(1)}–{sub.end.toFixed(1)}</span>
                    <span className={`cycle-child-arr${isAExp?' open':''}`}>▶</span>
                  </div>
                  {isAExp&&<div className="cycle-grandchildren">{micros.map((m,k)=>(
                    <div key={k} className={`cycle-grand${m.curr?' curr-grand':''}`}>
                      <span className="cycle-grand-lord">{FN[m.lord]}</span>
                      <span className="cycle-grand-yrs">{m.start.toFixed(2)}–{m.end.toFixed(2)}</span>
                    </div>
                  ))}</div>}
                </div>);
              })}</div>}
            </div>);
          })}</div>
        </>)}

        {chartTab==='influences'&&influences&&(<>
          <div className="inf-block">
            <div className="inf-header"><span className="inf-icon">♂</span><div><div className="inf-title">Mars Influence</div><div className="inf-sub">Energy, drive and relationships</div></div></div>
            <div className={`inf-card ${influences.mars.effective?'active':influences.mars.active?'partial':'clear'}`}>
              <div className="inf-status">{influences.mars.effective?'Active — Significant influence':'Active — Mitigated'||'Clear'}</div>
              <div className="inf-desc">{influences.mars.effective?`Mars is placed in your ${['1st','2nd','3rd','4th','5th','6th','7th','8th','9th','10th','11th','12th'][influences.mars.marsHouse-1]} house (House ${influences.mars.marsHouse}). This creates intensity in relationships and partnerships. Awareness and conscious effort bring balance.`:`Mars is in House ${influences.mars.marsHouse} of your chart. While there's a technical placement here, mitigating factors soften its influence significantly.`}</div>
              {influences.mars.exceptions.length>0&&<div className="inf-detail">{influences.mars.exceptions.map((e,i)=><div key={i} className="inf-row"><span className="inf-rl">Balance</span><span className="inf-rv">{e}</span></div>)}</div>}
            </div>
          </div>
          <div className="inf-block">
            <div className="inf-header"><span className="inf-icon">☊</span><div><div className="inf-title">Rahu-Ketu Axis</div><div className="inf-sub">Karmic direction and soul path</div></div></div>
            <div className={`inf-card ${influences.rk.active?'active':'clear'}`}>
              <div className="inf-status">{influences.rk.active?'Axis Pattern Present':'Clear'}</div>
              <div className="inf-desc">{influences.rk.active?`The ${influences.rk.type} pattern is present — all planets are concentrated on one side of the Rahu-Ketu axis. This creates focus and intensity, channeling energy powerfully in one direction. Great for achievement, requires balance.`:'Your planets are distributed across both sides of the Rahu-Ketu axis, creating natural balance and versatility in life.'}</div>
            </div>
          </div>
          <div className="inf-block">
            <div className="inf-header"><span className="inf-icon">♄</span><div><div className="inf-title">Saturn Passage</div><div className="inf-sub">Saturn's 7.5-year journey through your Moon sign</div></div></div>
            <div className={`inf-card ${influences.saturn.active?'active':'clear'}`}>
              <div className="inf-status">{influences.saturn.active?`In Progress — ${influences.saturn.phase} Phase`:'Currently Clear'}</div>
              <div className="inf-desc">{influences.saturn.active?`Saturn (currently in ${influences.saturn.satSignName}) is in the ${influences.saturn.phase?.toLowerCase()} phase of your 7.5-year Saturn Passage. Your Moon sign is ${influences.saturn.moonSignName}. This is a period of deep transformation, maturation and building lasting foundations. Challenges are teachers.`:`Saturn's passage through your Moon sign area (${influences.saturn.moonSignName}) is not currently active. This is a relatively lighter period in Saturn's cycle.`}</div>
              <div className="inf-detail">
                <div className="saturn-phases">{influences.saturn.phases.map((p,i)=>(<div key={i} className={`saturn-ph ${p.active?'on':'off'}`}>{p.name}<br/><small>{p.sign}</small></div>))}</div>
              </div>
            </div>
          </div>
        </>)}

        {chartTab==='gifts'&&gifts&&(<>
          {['Leadership','Intellect','Abundance','Beauty','Discipline','Wisdom','Intelligence','Ambition','Comfort','Wealth','Resilience','Knowledge','Career'].filter(type=>gifts.some(g=>g.type===type)).map(type=>{
            const group=gifts.filter(g=>g.type===type);
            if(!group.length)return null;
            return(<div key={type}>
              <div className="gift-group-title">{type}</div>
              <div className="gift-grid">{group.map((g,i)=>(
                <div key={i} className={`gift-card ${g.present?'present':'absent'}`}>
                  <div className="gift-type">{g.type}</div>
                  <div className="gift-name">{g.name}</div>
                  <div className="gift-desc">{g.desc}</div>
                  {g.detail&&<div className="gift-detail">{g.detail}</div>}
                  <span className={`gift-badge ${g.present?'yes':'no'}`}>{g.present?'✓ Active':'✗ Not present'}</span>
                </div>
              ))}</div>
            </div>);
          })}
        </>)}

        {chartTab==='varshpal'&&(<>
          <div className="yr-selector">
            <button className="yr-btn" onClick={()=>{const y=varshpalYear-1;setVarshpalYear(y);if(chart&&f.lat&&f.lon)try{setVarshpal(getVarshpal({year:f.year,month:f.month,day:f.day,hour:f.hour,min:f.min,tz:f.tz,lat:parseFloat(f.lat),lon:parseFloat(f.lon)},y));}catch{}}}>‹</button>
            <div className="yr-display">Solar Return {varshpalYear}</div>
            <button className="yr-btn" onClick={()=>{const y=varshpalYear+1;setVarshpalYear(y);if(chart&&f.lat&&f.lon)try{setVarshpal(getVarshpal({year:f.year,month:f.month,day:f.day,hour:f.hour,min:f.min,tz:f.tz,lat:parseFloat(f.lat),lon:parseFloat(f.lon)},y));}catch{}}}>›</button>
          </div>
          {varshpal&&(<>
            <div className="vp-header">
              <div className="vp-year">Solar Return {varshpal.targetYear}</div>
              <div className="vp-title">Sun returns to natal position</div>
              <div className="vp-date">📅 {varshpal.srDate}</div>
            </div>
            <div className="vp-grid">
              <div className="vp-card highlight">
                <div className="vp-card-label">Year Rising Sign</div>
                <div className="vp-card-value">{varshpal.srLagnaName}</div>
                <div className="vp-card-sub">Your year lagna</div>
              </div>
              <div className="vp-card highlight">
                <div className="vp-card-label">Muntha</div>
                <div className="vp-card-value">{varshpal.munthaName}</div>
                <div className="vp-card-sub">House {varshpal.munthaHouse} · Year focus</div>
              </div>
              <div className="vp-card">
                <div className="vp-card-label">Year Lord (Varshesh)</div>
                <div className="vp-card-value">{varshpal.varsheshName}</div>
                <div className="vp-card-sub">Rules this solar year</div>
              </div>
              <div className="vp-card">
                <div className="vp-card-label">Ayanamsa</div>
                <div className="vp-card-value">{varshpal.ay.toFixed(4)}°</div>
                <div className="vp-card-sub">Lahiri correction</div>
              </div>
            </div>
            <div className="card">
              <div className="card-title">Year Chart — Planet Positions</div>
              <table className="ptable">
                <thead><tr><th>Planet</th><th>Sign</th><th>House</th><th>Degree</th></tr></thead>
                <tbody>{Object.entries(varshpal.srSid).map(([planet,lon])=>{
                  const s=so(lon),h=((s-so(varshpal.srLagna)+12)%12)+1;
                  return(<tr key={planet}>
                    <td><span className="p-sym">{GL[planet]}</span><span className="p-name">{planet}</span></td>
                    <td><span className="p-sign">{RE[s]}</span></td>
                    <td><span className="p-house">H{h}</span></td>
                    <td><span className="p-deg">{di(lon).toFixed(1)}°</span></td>
                  </tr>);
                })}</tbody>
              </table>
            </div>
            <div className="card">
              <div className="card-title">Mudda Dasha — Monthly Cycles</div>
              <div style={{padding:'0 4px'}}>{varshpal.muddaDashas.map((m,i)=>(
                <div key={i} className={`mudda-row${m.curr?' active':''}`}>
                  <span className="mudda-lord">{FN[m.lord]}</span>
                  <span className="mudda-dates">{m.startDate.split('·')[0].trim()} → {m.endDate.split('·')[0].trim()}</span>
                  {m.curr&&<span className="mudda-badge">Now</span>}
                </div>
              ))}</div>
            </div>
          </>)}
        </>)}


        {chartTab==='timing'&&cycles&&(<>
          <div className="lt-now">
            <div className="lt-now-label">Your Current Life Chapter</div>
            <div className="lt-now-title">{FN[cycles.curr.lord]} Chapter</div>
            <div className="lt-now-sub">{cycles.curr.start.toFixed(1)} — {cycles.curr.end.toFixed(1)} · {DY[cycles.curr.lord]} year period</div>
            <div className="lt-now-meaning">{DASHA_MEANINGS[cycles.curr.lord]||''}</div>
          </div>
          {cycles.curr&&(()=>{
            const subs=getCycleSubs(cycles.curr.lord,cycles.curr.start,cycles.curr.end);
            const currSub=subs.find(s=>s.curr);
            if(!currSub)return null;
            return(
              <div className="card">
                <div className="card-title">Active Sub-Period</div>
                <div className="card-value">{FN[currSub.lord]}</div>
                <div className="card-desc">{currSub.start.toFixed(1)} — {currSub.end.toFixed(1)}</div>
              </div>
            );
          })()}
          <div className="card">
            <div className="card-title">Your Chapter Timeline</div>
            <div className="lt-timeline">{cycles.seq.map((d,i)=>{
              const isPast=d.end<2026.25;
              const isCurr=cycles.curr?.lord===d.lord&&Math.abs((cycles.curr?.start||0)-d.start)<.01;
              const isFuture=d.start>2026.25;
              if(isPast)return null; // only show current + future
              return(
                <div key={i} className="lt-row">
                  <div className={`lt-dot ${isCurr?'curr':'future'}`}/>
                  <div className="lt-row-body">
                    <div className={`lt-row-period${isCurr?' curr':''}`}>{FN[d.lord]} Chapter</div>
                    <div className="lt-row-dates">{Math.round(d.start)} — {Math.round(d.end)} · {DY[d.lord]} years</div>
                    <div className="lt-row-meaning">{DASHA_MEANINGS[d.lord]||''}</div>
                    {isCurr&&<span className="lt-row-tag curr">Now</span>}
                  </div>
                </div>
              );
            })}</div>
          </div>
        </>)}

        {chartTab==='transits'&&(<>
          <div className="card">
            <div className="card-title">Planets Now vs Your Chart</div>
            {transits?.map((t,i)=>(
              <div key={i} className="transit-row">
                <span className="t-planet">{GL[t.planet]} {t.planet}</span>
                <span className="t-sign">{t.signName}</span>
                <span className="t-house">H{t.house}</span>
              </div>
            ))}
          </div>
        </>)}

      </div>
    </>);
  };





  const CompatScreen=()=>{
    if(compatStep===0)return(<>
      <div className="screen-hdr"><div className="back-btn" onClick={()=>setMoreScreen(null)}>←</div><div className="screen-title">Cosmic Chemistry</div></div>
      <div className="wrap">
        <div className="compat-intro">
          <div className="compat-title">Is it written in the stars?</div>
          <div className="compat-sub">Enter two birth charts and discover your cosmic chemistry — what draws you together, where you flow naturally, and where friction may arise.</div>
        </div>
        <div className="compat-type-row">
          <div className={`compat-type${compatType==='partner'?' sel':''}`} onClick={()=>{setCompatType('partner');setCompatStep(1);}}>
            <span className="ct-icon">♥</span><div className="ct-label">Romantic Partner</div><div className="ct-desc">Love, long-term chemistry, intimacy</div>
          </div>
          <div className={`compat-type${compatType==='friend'?' sel':''}`} onClick={()=>{setCompatType('friend');setCompatStep(1);}}>
            <span className="ct-icon">✦</span><div className="ct-label">Friend or Colleague</div><div className="ct-desc">Friendship, energy match, teamwork</div>
          </div>
        </div>
      </div>
    </>);
    if(compatStep===1)return(<BirthForm formData={cf} setFormData={scf} onSubmit={()=>castCompat(true)} loading={compatLoad} error={compatErr} placeRes={cfResults} setPlaceRes={setCfResults} title="Person 1 — Birth Details"/>);
    if(compatStep===2)return(<BirthForm formData={cf2} setFormData={scf2} onSubmit={()=>castCompat(false)} loading={compatLoad} error={compatErr} placeRes={cf2Results} setPlaceRes={setCf2Results} title="Person 2 — Birth Details"/>);
    if(compatStep===3&&compatResult){
      const pct=compatResult.total/36;
      const verdict=pct>=0.72
        ?{text:'Written in the Stars',sub:'Your charts align with rare harmony. The cosmic forces that shaped each of you pull toward each other.',emoji:'✨',theme:'v-stars'}
        :pct>=0.50
        ?{text:'Complicated Chemistry',sub:'Real connection with genuine complexity. The friction between you can become something extraordinary if you lean into understanding.',emoji:'🌙',theme:'v-moon'}
        :{text:'Different Cosmic Frequencies',sub:'Your charts vibrate at very different frequencies. Not impossible — but this connection asks for deep awareness and acceptance.',emoji:'🌊',theme:'v-waves'};
      const flagType=r=>r>=0.7?'g':r>=0.4?'y':'r';
      const flagIcon=r=>r>=0.7?'✅':r>=0.4?'⚠️':'🚩';
      const flagBadge=r=>r>=0.7?'Green Flag':r>=0.4?'Worth Watching':'Red Flag';
      const FLAG_META=[
        {n:'Shared Values',d:'Do you want the same things from life?'},
        {n:'Natural Attraction',d:'The magnetic pull between your charts'},
        {n:'Wellbeing Together',d:'Physical and emotional compatibility'},
        {n:'Deep Intimacy',d:'Capacity for personal closeness'},
        {n:'Mental Chemistry',d:'How your minds meet and understand each other'},
        {n:'Core Temperament',d:'Whether your natures complement or clash'},
        {n:'Emotional Harmony',d:'Heart-level resonance and long-term ease'},
        {n:'Life Energy',d:'Whether your vital forces align for the long run'},
      ];
      const n1=cf.name||'Person 1', n2=cf2.name||'Person 2';
      const dots=Array.from({length:16},(_,i)=>({
        left:(10+Math.sin(i*2.3)*38+38)+'%',
        top:(10+Math.cos(i*1.7)*32+38)+'%',
        sz:Math.sin(i)+1.5,
        del:(i*0.25%2)+'s'
      }));
      return(<>
        <div className="screen-hdr"><div className="back-btn" onClick={()=>setCompatStep(0)}>←</div><div className="screen-title">Cosmic Chemistry</div></div>
        <div className="wrap">
          <div className={`cc-hero ${verdict.theme}`}>
            <div className="cc-stars-bg">
              {dots.map((d,i)=><div key={i} className="cc-star-dot" style={{left:d.left,top:d.top,width:d.sz+'px',height:d.sz+'px',animationDelay:d.del}}/>)}
            </div>
            <div className="cc-verdict-label">Cosmic Chemistry</div>
            <div className="cc-verdict-emoji">{verdict.emoji}</div>
            <div className="cc-verdict-text">{verdict.text}</div>
            <div className="cc-verdict-sub">{verdict.sub}</div>
            <div className="cc-names-badge">{n1} • {n2}</div>
          </div>
          <div className="card">
            <div className="cc-flags-title">The 8 Dimensions</div>
            <div className="cc-flags">{compatResult.kutas.map((k,i)=>{
              const r=k.m>0?k.s/k.m:0;
              return(<div key={i} className={`cc-flag ${flagType(r)}`}>
                <span className="cc-flag-icon">{flagIcon(r)}</span>
                <div className="cc-flag-content">
                  <div className="cc-flag-name">{FLAG_META[i]?.n||k.n}</div>
                  <div className="cc-flag-desc">{FLAG_META[i]?.d||''}</div>
                  <span className="cc-flag-badge">{flagBadge(r)}</span>
                </div>
              </div>);
            })}</div>
          </div>
          {(compatResult.nadiTension||compatResult.energyMismatch)&&(
            <div className="match-warn">
              {compatResult.nadiTension&&'⚠️ Life energy: You share the same cosmic energy type — traditionally worth being mindful of in long-term partnerships. '}
              {compatResult.energyMismatch&&'⚠️ Core temperament: Very different natures. Deeply rewarding when understood.'}
            </div>
          )}
          <button className="cc-share-btn" onClick={()=>setShareData({emoji:verdict.emoji,title:verdict.text,sub:n1+' and '+n2})}>
            ✨ Share Your Chemistry
          </button>
          <button className="btn-ghost" style={{width:'100%',marginTop:8}} onClick={()=>{
            setCompatStep(0);setCompatResult(null);
            scf({name:'',day:'',month:'',year:'',hour:'',min:'',tz:'0',place:'',lat:'',lon:''});
            scf2({name:'',day:'',month:'',year:'',hour:'',min:'',tz:'0',place:'',lat:'',lon:''});
          }}>Check Another Pair</button>
        </div>
      </>);
    }
    return null;
  };

  const GuidanceScreen=()=>(<>
    <div className="screen-hdr"><div className="back-btn" onClick={()=>setMoreScreen(null)}>←</div><div className="screen-title">Personal Guidance</div></div>
    {!chart?(<div className="wrap"><div className="empty"><span className="empty-icon">🙏</span><div className="empty-title">Enter your birth details first</div></div><button className="btn-ghost" style={{margin:'0 16px',width:'calc(100% - 32px)'}} onClick={()=>{setNav('home');setShowForm(true);}}>Enter birth details →</button></div>):(
      <div className="wrap">
        {guidLoad?<Loader text="Preparing your guidance..." sub="Based on your exact chart"/>:guidance?<ReadingText text={guidance}/>:(
          <div className="card" style={{textAlign:'center'}}>
            <div style={{fontSize:28,marginBottom:8}}>🙏</div>
            <div style={{fontSize:16,fontWeight:600,color:'var(--purple2)',marginBottom:6}}>Personal Guidance</div>
            <div style={{fontSize:13,color:'var(--muted)',lineHeight:1.6,marginBottom:16}}>Specific practices, gemstones and rituals selected for your exact chart by Acharya Adi Yogi.</div>
            <button className="btn-cta" style={{margin:0}} onClick={doGuidance}><span>🙏</span>Get My Guidance</button>
          </div>
        )}
        {guidance&&<button className="btn-ghost" style={{width:'100%',marginTop:8}} onClick={doGuidance}>Refresh guidance ↺</button>}
      </div>
    )}
  </>);

  const MoreScreen=()=>{
    if(moreScreen==='compat')return<CompatScreen/>;
    if(moreScreen==='guidance')return<GuidanceScreen/>;
    if(moreScreen==='privacy')return(<>
      <div className="screen-hdr"><div className="back-btn" onClick={()=>setMoreScreen(null)}>←</div><div className="screen-title">Privacy</div></div>
      <div className="wrap" style={{fontSize:14,color:'var(--muted)',lineHeight:1.8}}>
        <p style={{marginBottom:12,color:'var(--text)'}}>Natal AI takes your privacy seriously.</p>
        <p style={{marginBottom:12}}><strong>Your birth data</strong> is processed locally in your browser and never stored on our servers. Each session starts fresh.</p>
        <p style={{marginBottom:12}}><strong>AI features</strong> send your chart data to Anthropic's API for reading generation. No conversations are stored.</p>
        <p style={{marginBottom:12}}><strong>Analytics:</strong> We use Vercel Analytics for anonymous page view tracking only.</p>
        <p>Questions? <a href="mailto:hello@natalai.app" style={{color:'var(--purple)'}}>hello@natalai.app</a></p>
      </div>
    </>);
    return(<>
      <div className="screen-hdr"><div className="screen-title">More</div></div>
      <div className="wrap">
        <div className="more-list">
          <div className="more-item" onClick={()=>setMoreScreen('compat')}><span className="more-icon">♡</span><div className="more-text"><div className="more-name">Cosmic Chemistry</div><div className="more-sub">Are you compatible with your partner or friend?</div></div><span className="more-arr">›</span></div>
          <div className="more-item" onClick={()=>setMoreScreen('guidance')}><span className="more-icon">🙏</span><div className="more-text"><div className="more-name">Personal Guidance</div><div className="more-sub">Practices, gemstones and rituals for your chart</div></div><span className="more-arr">›</span></div>
          <div className="more-item" onClick={()=>{setNav('chart');setChartTab('daily')}}><span className="more-icon">📅</span><div className="more-text"><div className="more-name">Daily Cosmic Guide</div><div className="more-sub">Today's energies, shadow window, time quality</div></div><span className="more-arr">›</span></div>
          <div className="more-item" onClick={()=>{setNav('chart');setChartTab('transits')}}><span className="more-icon">🔭</span><div className="more-text"><div className="more-name">Current Transits</div><div className="more-sub">Where the planets are now vs your chart</div></div><span className="more-arr">›</span></div>
          <div className="more-item" onClick={()=>setMoreScreen('privacy')}><span className="more-icon">🔒</span><div className="more-text"><div className="more-name">Privacy Policy</div><div className="more-sub">How we handle your data</div></div><span className="more-arr">›</span></div>
        </div>
        <div style={{marginTop:24,textAlign:'center',fontSize:11,color:'var(--hint)'}}>
          <div style={{marginBottom:4}}>Natal AI · Vedic Astrology</div>
          <div>Meeus Algorithms · Lahiri Ayanamsa · Brihat Parashara Hora Shastra</div>
        </div>
      </div>
    </>);
  };

  return(<>
    <style>{CSS}</style>
    {shareData&&<ShareSheet emoji={shareData.emoji} title={shareData.title} sub={shareData.sub} onClose={()=>setShareData(null)}/>}
    {welcomeStep>0?(
      <div className="welcome">
        <div className="welcome-skip" onClick={()=>setWelcomeStep(0)}>Skip</div>
        {welcomeStep===1&&(<>
          <span className="welcome-icon">✦</span>
          <h1 className="welcome-title">Your cosmic blueprint has been here all along</h1>
          <p className="welcome-desc">At the exact moment you were born, the sky held a precise configuration. Vedic astrology has mapped this science for over 5,000 years.</p>
          <div className="welcome-dots"><div className="welcome-dot on"/><div className="welcome-dot"/><div className="welcome-dot"/></div>
          <button className="welcome-btn" onClick={()=>setWelcomeStep(2)}>Continue →</button>
        </>)}
        {welcomeStep===2&&(<>
          <span className="welcome-icon">🌙</span>
          <h1 className="welcome-title">You are not your Western zodiac sign</h1>
          <p className="welcome-desc">Most people are surprised to discover their Vedic signs are different. The sidereal zodiac, aligned with actual star positions, tells a more precise story.</p>
          <div className="welcome-dots"><div className="welcome-dot"/><div className="welcome-dot on"/><div className="welcome-dot"/></div>
          <button className="welcome-btn" onClick={()=>setWelcomeStep(3)}>Continue →</button>
        </>)}
        {welcomeStep===3&&(<>
          <span className="welcome-icon">🔮</span>
          <h1 className="welcome-title">What your chart reveals</h1>
          <div className="welcome-features">
            <div className="welcome-feat"><span className="welcome-feat-icon">✶</span><span className="welcome-feat-text">Your birth chart and soul chart (D9 Navamsa)</span></div>
            <div className="welcome-feat"><span className="welcome-feat-icon">⏳</span><span className="welcome-feat-text">Your current life chapter and what it means</span></div>
            <div className="welcome-feat"><span className="welcome-feat-icon">✦</span><span className="welcome-feat-text">Your nakshatra identity and soul purpose</span></div>
            <div className="welcome-feat"><span className="welcome-feat-icon">♥</span><span className="welcome-feat-text">Cosmic chemistry with anyone</span></div>
          </div>
          <div className="welcome-dots"><div className="welcome-dot"/><div className="welcome-dot"/><div className="welcome-dot on"/></div>
          <button className="welcome-btn" onClick={()=>setWelcomeStep(0)}>Discover My Chart →</button>
        </>)}
      </div>
    ):(
    <div className="app">
      {nav==='home'&&(<>
        <div className="hdr">
          <span className="hdr-icon">✦</span>
          <div className="hdr-title">Natal AI</div>
          <div className="hdr-sub">Vedic Astrology · Ancient Wisdom</div>
        </div>
        <div className="hist">
          <span className="hist-icon">📜</span>
          <span className="hist-text">Vedic astrology is a 5,000-year science of self-discovery from ancient India. Your birth chart is a precise map of your soul's journey — calculated using precise Meeus astronomical algorithms.</span>
        </div>
        <div className="wrap">
          {!chart?(<>
            {casting?(
              <ConstellationLoader text="Mapping the sky at your birth..." sub="Calculating planet positions"/>
            ):(
              <>
                <button className="btn-cta" onClick={()=>setShowForm(true)}><span className="btn-cta-icon">✦</span>Discover your birth chart</button>
                {showForm&&<BirthForm formData={f} setFormData={sf} onSubmit={castChart} loading={casting} error={castErr} placeRes={placeResults} setPlaceRes={setPlaceResults}/>}
              </>
            )}
          </>):(
            <button className="btn-cta" onClick={()=>{setNav('chart');setChartTab('chart');}}><span className="btn-cta-icon">✦</span>View your birth chart</button>
          )}
          {panchang&&<div className="today">
            <div className="today-lbl">Today's Cosmic Energy</div>
            <div className="today-row">
              <div className="today-item"><div className="tv">{panchang.moonPhase?.split('·')[0].trim()}</div><div className="tk">Moon Phase</div></div>
              <div className="today-item"><div className="tv">{panchang.nakName}</div><div className="tk">Lunar Mansion</div></div>
              <div className="today-item"><div className="tv">{panchang.rahuWindow.split('–')[0].trim()}</div><div className="tk">Shadow Window</div></div>
            </div>
          </div>}
          <div className="feat-grid">
            <div className="fc" onClick={()=>{if(chart){setNav('chart');setChartTab('chart');}else setShowForm(true)}}><span className="fc-icon">✦</span><div className="fc-name">Birth Chart</div><div className="fc-desc">Sidereal · Vedic</div></div>
            <div className="fc" onClick={()=>{if(chart){setNav('chart');setChartTab('cycles');}else setShowForm(true)}}><span className="fc-icon">⏳</span><div className="fc-name">Life Cycles</div><div className="fc-desc">Your current period</div></div>
            <div className="fc" onClick={()=>{if(chart){setNav('chart');setChartTab('influences');}else setShowForm(true)}}><span className="fc-icon">◎</span><div className="fc-name">Influences</div><div className="fc-desc">Planetary patterns</div></div>
            <div className="fc" onClick={()=>{if(chart){setNav('chart');setChartTab('gifts');}else setShowForm(true)}}><span className="fc-icon">★</span><div className="fc-name">Cosmic Gifts</div><div className="fc-desc">Your strengths</div></div>
            <div className="fc" onClick={()=>{setNav('more');setMoreScreen('compat');}}><span className="fc-icon">♡</span><div className="fc-name">Cosmic Chemistry</div><div className="fc-desc">Written in the stars?</div></div>
            <div className="fc hi" onClick={()=>setNav('chat')}><span className="fc-icon">✧</span><div className="fc-name">Ask a Question</div><div className="fc-desc">Chat with your guide</div></div>
          </div>
        </div>
      </>)}
      {nav==='chart'&&<ChartScreen/>}
      {nav==='reading'&&(<>
        <div className="screen-hdr"><div className="screen-title">Your Personal Reading</div></div>
        {!chart?(<div className="wrap"><div className="empty"><span className="empty-icon">✦</span><div className="empty-title">Enter your birth details first</div><div className="empty-desc">Go to Home and calculate your birth chart to get a personal reading.</div></div><button className="btn-ghost" style={{margin:'0 16px',width:'calc(100% - 32px)'}} onClick={()=>{setNav('home');setShowForm(true);}}>Enter birth details →</button></div>):(
          <div className="wrap" style={{paddingTop:4}}>
            <div className="card" style={{background:'var(--purpleXL)',border:'1px solid var(--purpleBorder)',borderRadius:12,padding:'10px 14px',marginBottom:14,fontSize:12,color:'var(--purple2)',lineHeight:1.6}}>
              ✦ For entertainment and self-reflection only. Not a substitute for professional advice.
            </div>
            {readLoad?<Loader text="Reading your chart..." sub="Takes about 15 seconds"/>:reading?<><ReadingText text={reading}/><button className="btn-ghost" style={{width:'100%',marginTop:8}} onClick={doReading}>Regenerate ↺</button></>:(
              <div className="card" style={{textAlign:'center',marginBottom:16}}>
                <div style={{fontSize:32,marginBottom:8}}>✦</div>
                <div style={{fontSize:16,fontWeight:600,color:'var(--purple2)',marginBottom:6}}>Your Complete Reading</div>
                <div style={{fontSize:13,color:'var(--muted)',lineHeight:1.6,marginBottom:16}}>Your past, present and future — based on the exact positions of the planets at your birth.</div>
                <button className="btn-cta" style={{margin:0}} onClick={doReading}><span>✦</span>Generate My Reading</button>
              </div>
            )}
            {readErr&&<div style={{color:'var(--red)',fontSize:13,padding:'10px 12px',background:'var(--rbg)',borderRadius:8,border:'1px solid var(--rbc)',marginBottom:12}}>{readErr}</div>}
          </div>
        )}
      </>)}
      {nav==='chat'&&(<>
        <div className="screen-hdr"><div className="screen-title">Ask Your Guide</div></div>
        {!chart?(<div className="wrap"><div className="empty"><span className="empty-icon">✧</span><div className="empty-title">Enter your birth details first</div><div className="empty-desc">Your birth chart needs to be loaded to give you personal guidance.</div></div><button className="btn-ghost" style={{margin:'0 16px',width:'calc(100% - 32px)'}} onClick={()=>{setNav('home');setShowForm(true);}}>Enter birth details →</button></div>):(
          <div className="chat-wrap">
            <div className="chat-msgs">
              {msgs.length===0&&(<div style={{textAlign:'center',padding:'20px 10px'}}>
                <div style={{fontSize:28,marginBottom:8}}>✧</div>
                <div style={{fontSize:14,fontWeight:500,color:'var(--purple2)',marginBottom:4}}>Acharya Adi Yogi</div>
                <div style={{fontSize:12,color:'var(--muted)',lineHeight:1.6,marginBottom:8}}>Your chart is loaded. Ask me anything.</div>
                <div style={{fontSize:11,color:'var(--hint)'}}>For self-reflection only · Not professional advice</div>
              </div>)}
              <div className="chat-suggs">{CHAT_SUGGS.map((s,i)=><div key={i} className="sg" onClick={()=>sendChat(s)}>{s}</div>)}</div>
              {msgs.map((m,i)=>(
                <div key={i} className={`cm ${m.role==='user'?'u':'a'}`}>
                  <div className="cm-label">{m.role==='user'?'You':'Acharya Adi Yogi'}</div>
                  <div className="cm-bubble">{m.content}</div>
                </div>
              ))}
              {chatLoad&&<div className="typing"><div className="dot"/><div className="dot"/><div className="dot"/></div>}
              <div ref={msgsEndRef}/>
            </div>
            <div className="chat-input-row">
              <textarea className="chat-inp" rows={1} placeholder="Ask about your chart..." value={chatInput}
                onChange={e=>setChatInput(e.target.value)}
                onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendChat(chatInput);}}}/>
              <button className="chat-send" onClick={()=>sendChat(chatInput)} disabled={chatLoad}>→</button>
            </div>
          </div>
        )}
      </>)}
      {nav==='more'&&<MoreScreen/>}
      <div className="bnav">
        <div className={`bn${nav==='home'?' act':''}`} onClick={()=>setNav('home')}><span className="bn-icon">⌂</span><span className="bn-label">Home</span></div>
        <div className={`bn${nav==='chart'?' act':''}`} onClick={()=>setNav('chart')}><span className="bn-icon">✦</span><span className="bn-label">Chart</span></div>
        <div className="bn-fab" onClick={()=>setNav('reading')}><div className="fab-circle"><span className="fab-icon">✧</span></div><span className="fab-label">Reading</span></div>
        <div className={`bn${nav==='chat'?' act':''}`} onClick={()=>setNav('chat')}><span className="bn-icon">✧</span><span className="bn-label">Chat</span></div>
        <div className={`bn${nav==='more'?' act':''}`} onClick={()=>setNav('more')}><span className="bn-icon">≡</span><span className="bn-label">More</span></div>
      </div>
    </div>
    )}
  </>);
}

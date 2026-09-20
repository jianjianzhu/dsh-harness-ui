// Source bundle entry. Run `npm run build` to reproduce lib/client.js.
window.__ModuleLoader__.load({ id: "dsh-harness-ui", factory: (require) => {
  var module = { exports: {} }; var exports = module.exports;
  const React = require("react")
  const h = React.createElement

  const STYLE_ID = "dsh-harness-ui-style"
  const ROOT_CLASS = "hui-root"
  const THEME_KEY = "dsh-harness-ui.theme"
  const DENSITY_KEY = "dsh-harness-ui.density"
  const PANEL_ID = "harness-ui"
  const LABEL = "Harness 控制台"
  const LLM_NS = "llm-pi-ai"
  const MARKET_API = "https://api.github.com/search/repositories?q=topic:dsh-plugin&sort=stars&order=desc&per_page=30"

  /* ---------------- design tokens (极简白底 + 朱砂) ---------------- */
  const CSS = `
  .${ROOT_CLASS}{
    --hui-bg:#fcfcfc; --hui-surface:#ffffff; --hui-surface-2:#fafaf9; --hui-surface-3:#f4f3f1;
    --hui-border:#e6e4e1; --hui-border-strong:#d5d2ce; --hui-border-soft:#efedeb;
    --hui-text:#17150f; --hui-text-2:#5c574f; --hui-text-3:#8a847a; --hui-text-4:#b3ada3;
    --hui-accent:#c0392b; --hui-accent-hover:#a53125; --hui-accent-soft:#fdf1ef; --hui-accent-line:#f0d9d5;
    --hui-ok:#2f7d5d; --hui-ok-soft:#eef6f1; --hui-warn:#9a6a12; --hui-warn-soft:#fdf6e8;
    --hui-info:#3a5fa8; --hui-info-soft:#eef2fa;
    --hui-shadow-sm:0 1px 2px rgb(23 21 15 / .04);
    --hui-shadow-md:0 1px 2px rgb(23 21 15 / .04),0 8px 24px rgb(23 21 15 / .05);
    --hui-shadow-lg:0 12px 48px rgb(23 21 15 / .13),0 2px 8px rgb(23 21 15 / .06);
    --hui-sans:"Inter","SF Pro Text","PingFang SC","Noto Sans SC",system-ui,-apple-system,sans-serif;
    --hui-mono:ui-monospace,"SF Mono","JetBrains Mono",Menlo,Consolas,monospace;
    --hui-r-sm:6px; --hui-r-md:10px; --hui-r-lg:14px;
    font-family:var(--hui-sans); background:var(--hui-bg); color:var(--hui-text);
    line-height:1.6; -webkit-font-smoothing:antialiased;
    position:absolute; inset:0; display:flex; flex-direction:column; overflow:hidden;
  }
  .${ROOT_CLASS}[data-hui-theme="dark"]{
    --hui-bg:#0d1117; --hui-surface:#161b22; --hui-surface-2:#12171e; --hui-surface-3:#1a2029;
    --hui-border:#262c35; --hui-border-strong:#3a424e; --hui-border-soft:#1d232b;
    --hui-text:#e6edf3; --hui-text-2:#a8b3c1; --hui-text-3:#78828f; --hui-text-4:#586069;
    --hui-accent:#ff6b4a; --hui-accent-hover:#ff8368; --hui-accent-soft:#2a1a16; --hui-accent-line:#43261f;
    --hui-ok:#3fb950; --hui-ok-soft:#12261a; --hui-warn:#d29922; --hui-warn-soft:#241d0e;
    --hui-info:#6ea8fe; --hui-info-soft:#15202e;
  }
  .${ROOT_CLASS}[data-hui-density="compact"]{ --hui-pad:1rem; }
  .${ROOT_CLASS} *{box-sizing:border-box}
  .${ROOT_CLASS} button{font-family:inherit;color:inherit;cursor:pointer;background:none;border:none}
  .${ROOT_CLASS} input,.${ROOT_CLASS} select{font-family:inherit;color:inherit}
  .${ROOT_CLASS} ::-webkit-scrollbar{width:10px;height:10px}
  .${ROOT_CLASS} ::-webkit-scrollbar-thumb{background:var(--hui-border-strong);border-radius:99px;border:3px solid transparent;background-clip:content-box}

  .hui-head{flex:none;display:flex;align-items:center;gap:.6rem;padding:.7rem 1.1rem;border-bottom:1px solid var(--hui-border);background:var(--hui-surface-2);flex-wrap:wrap}
  .hui-head .hui-title{display:flex;align-items:center;gap:.5rem;font-weight:650;font-size:.92rem;letter-spacing:-.01em}
  .hui-head .hui-mark{width:22px;height:22px;border-radius:6px;background:var(--hui-accent);color:#fff;display:grid;place-items:center;font-size:.7rem;font-weight:800}
  .hui-tabs{display:flex;gap:2px;margin-left:.6rem;flex-wrap:wrap}
  .hui-tab{padding:.32rem .62rem;border-radius:var(--hui-r-sm);font-size:.79rem;color:var(--hui-text-2);font-weight:520;transition:all .12s}
  .hui-tab:hover{background:var(--hui-border-soft);color:var(--hui-text)}
  .hui-tab.on{background:var(--hui-surface);color:var(--hui-text);box-shadow:var(--hui-shadow-sm);font-weight:600}
  .hui-tab.on::after{content:"";display:block;height:2px;margin-top:2px;border-radius:2px;background:var(--hui-accent)}
  .hui-head .hui-spacer{flex:1}
  .hui-ibtn{width:28px;height:28px;border-radius:var(--hui-r-sm);display:grid;place-items:center;color:var(--hui-text-3);transition:all .12s;flex:none}
  .hui-ibtn:hover{background:var(--hui-border-soft);color:var(--hui-text)}
  .hui-ibtn svg{width:15px;height:15px}
  .hui-seg{display:flex;background:var(--hui-surface);border:1px solid var(--hui-border);border-radius:var(--hui-r-sm);padding:2px}
  .hui-seg button{padding:.2rem .5rem;font-size:.74rem;border-radius:5px;color:var(--hui-text-3);font-weight:520}
  .hui-seg button.on{background:var(--hui-text);color:var(--hui-bg)}

  .hui-scroll{flex:1;overflow-y:auto;min-height:0}
  .hui-inner{max-width:64rem;margin:0 auto;padding:1.6rem 1.5rem 3rem}
  .hui-ph{display:flex;align-items:flex-start;gap:1rem;margin-bottom:1.4rem;flex-wrap:wrap}
  .hui-ph h2{font-size:1.3rem;font-weight:680;letter-spacing:-.02em}
  .hui-ph p{font-size:.85rem;color:var(--hui-text-3);margin-top:.2rem}
  .hui-ph .hui-act{margin-left:auto;display:flex;gap:.5rem;align-items:center;flex-wrap:wrap}
  .hui-toolbar{display:flex;align-items:center;gap:.5rem;margin-bottom:1rem;flex-wrap:wrap}
  .hui-search{flex:1;min-width:13rem;position:relative}
  .hui-search input{width:100%;padding:.5rem .7rem .5rem 2rem;border:1px solid var(--hui-border);border-radius:var(--hui-r-sm);background:var(--hui-surface);font-size:.85rem;outline:none;transition:all .14s}
  .hui-search input:focus{border-color:var(--hui-accent);box-shadow:0 0 0 3px var(--hui-accent-soft)}
  .hui-search svg{position:absolute;left:.65rem;top:50%;transform:translateY(-50%);width:15px;height:15px;color:var(--hui-text-4);pointer-events:none}
  .hui-chips{display:flex;flex-wrap:wrap;gap:.35rem}
  .hui-chip{font-size:.75rem;padding:.24rem .62rem;border:1px solid var(--hui-border);border-radius:99px;color:var(--hui-text-2);background:var(--hui-surface);transition:all .12s;white-space:nowrap}
  .hui-chip:hover{border-color:var(--hui-border-strong)}
  .hui-chip.on{background:var(--hui-text);border-color:var(--hui-text);color:var(--hui-bg);font-weight:540}
  .hui-chip .n{opacity:.55;margin-left:.25rem;font-size:.72em}

  .hui-card{background:var(--hui-surface);border:1px solid var(--hui-border);border-radius:var(--hui-r-lg);box-shadow:var(--hui-shadow-sm)}
  .hui-grid{display:grid;gap:.8rem}
  .hui-g2{grid-template-columns:repeat(auto-fill,minmax(19rem,1fr))}
  .hui-g4{grid-template-columns:repeat(auto-fill,minmax(11rem,1fr))}

  .hui-pcard{padding:1rem 1.1rem;display:flex;flex-direction:column;gap:.6rem;transition:all .15s}
  .hui-pcard:hover{box-shadow:var(--hui-shadow-md);border-color:var(--hui-border-strong)}
  .hui-pc-top{display:flex;align-items:center;gap:.6rem}
  .hui-pc-ico{width:34px;height:34px;border-radius:9px;background:var(--hui-surface-3);display:grid;place-items:center;font-size:.95rem;flex:none;border:1px solid var(--hui-border-soft)}
  .hui-pc-name{font-size:.9rem;font-weight:600;display:flex;align-items:center;gap:.4rem;min-width:0}
  .hui-pc-name span{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .hui-pc-sub{font-size:.73rem;color:var(--hui-text-4);font-family:var(--hui-mono);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .hui-pc-desc{font-size:.81rem;color:var(--hui-text-2);line-height:1.55;flex:1}
  .hui-pc-foot{display:flex;align-items:center;gap:.5rem;margin-top:.2rem}
  .hui-pc-foot .hui-spacer{flex:1}
  .hui-stars{font-size:.75rem;color:var(--hui-text-3);display:flex;align-items:center;gap:.25rem}
  .hui-stars svg{width:12px;height:12px;color:var(--hui-warn)}

  .hui-badge{font-size:.67rem;font-weight:600;padding:.08rem .4rem;border-radius:99px;white-space:nowrap}
  .hui-badge.ok{background:var(--hui-ok-soft);color:var(--hui-ok)}
  .hui-badge.run{background:var(--hui-warn-soft);color:var(--hui-warn)}
  .hui-badge.err{background:var(--hui-accent-soft);color:var(--hui-accent)}
  .hui-badge.info{background:var(--hui-info-soft);color:var(--hui-info)}
  .hui-badge.grey{background:var(--hui-surface-3);color:var(--hui-text-3)}

  .hui-btn{padding:.38rem .8rem;border-radius:var(--hui-r-sm);font-size:.8rem;font-weight:560;transition:all .13s;border:1px solid transparent;display:inline-flex;align-items:center;gap:.35rem;white-space:nowrap}
  .hui-btn svg{width:14px;height:14px}
  .hui-btn.primary{background:var(--hui-accent);color:#fff}
  .hui-btn.primary:hover{background:var(--hui-accent-hover)}
  .hui-btn.ghost{background:var(--hui-surface);border-color:var(--hui-border);color:var(--hui-text-2)}
  .hui-btn.ghost:hover{border-color:var(--hui-border-strong);color:var(--hui-text)}
  .hui-btn.dark{background:var(--hui-text);color:var(--hui-bg)}
  .hui-btn.dark:hover{background:var(--hui-accent)}
  .hui-btn.sm{padding:.26rem .58rem;font-size:.76rem}
  .hui-btn[disabled]{opacity:.5;cursor:not-allowed}

  .hui-switch{width:34px;height:19px;border-radius:99px;background:var(--hui-border-strong);position:relative;transition:background .18s;flex:none;cursor:pointer}
  .hui-switch::after{content:"";position:absolute;top:2px;left:2px;width:15px;height:15px;border-radius:50%;background:#fff;transition:transform .18s}
  .hui-switch.on{background:var(--hui-ok)}
  .hui-switch.on::after{transform:translateX(15px)}

  .hui-tbl{width:100%;border-collapse:collapse;font-size:.83rem}
  .hui-tbl th{text-align:left;font-size:.69rem;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:var(--hui-text-4);padding:.6rem .8rem;border-bottom:1px solid var(--hui-border)}
  .hui-tbl td{padding:.66rem .8rem;border-bottom:1px solid var(--hui-border-soft);vertical-align:middle}
  .hui-tbl tr:hover td{background:var(--hui-surface-2)}
  .hui-tbl tr:last-child td{border-bottom:none}
  .hui-tbl .main{font-weight:540}
  .hui-tbl .sub{font-size:.73rem;color:var(--hui-text-4)}
  .hui-tbl .num{font-family:var(--hui-mono);font-size:.79rem;text-align:right}

  .hui-stat{padding:1rem 1.1rem}
  .hui-stat .l{font-size:.73rem;color:var(--hui-text-4);font-weight:540}
  .hui-stat .v{font-size:1.55rem;font-weight:700;letter-spacing:-.02em;margin-top:.12rem;font-variant-numeric:tabular-nums}
  .hui-stat .v small{font-size:.82rem;font-weight:500;color:var(--hui-text-3)}
  .hui-stat .d{font-size:.74rem;margin-top:.18rem;color:var(--hui-text-4)}
  .hui-meter{height:6px;border-radius:99px;background:var(--hui-border);overflow:hidden;margin-top:.4rem}
  .hui-meter i{display:block;height:100%;border-radius:99px;background:var(--hui-accent)}
  .hui-meter i.ok{background:var(--hui-ok)} .hui-meter i.warn{background:var(--hui-warn)} .hui-meter i.info{background:var(--hui-info)}
  .hui-sec{font-size:.71rem;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--hui-text-4);margin:0 0 .65rem}
  .hui-kv{display:flex;justify-content:space-between;font-size:.79rem;padding:.26rem 0;color:var(--hui-text-2);gap:1rem}
  .hui-kv b{font-weight:560;color:var(--hui-text);text-align:right}

  .hui-chart{display:flex;align-items:flex-end;gap:.5rem;height:160px;padding:.9rem .3rem .3rem}
  .hui-chart .bar{flex:1;display:flex;flex-direction:column;justify-content:flex-end;align-items:center;gap:.4rem;height:100%}
  .hui-chart .bar i{width:100%;max-width:34px;border-radius:6px 6px 3px 3px;background:linear-gradient(to top,var(--hui-accent),#e07a5f);min-height:3px;transition:height .5s}
  .hui-chart .bar span{font-size:.67rem;color:var(--hui-text-4)}

  .hui-row{display:flex;align-items:center;gap:.8rem;padding:.8rem 1rem;border-bottom:1px solid var(--hui-border-soft)}
  .hui-row:last-child{border-bottom:none}
  .hui-row:hover{background:var(--hui-surface-2)}
  .hui-dot{width:8px;height:8px;border-radius:50%;flex:none}
  .hui-dot.live{background:var(--hui-ok);box-shadow:0 0 0 3px var(--hui-ok-soft)}
  .hui-dot.off{background:var(--hui-text-4)}
  .hui-dot.warn{background:var(--hui-warn);box-shadow:0 0 0 3px var(--hui-warn-soft)}
  .hui-row .rinfo{flex:1;min-width:0}
  .hui-row .rinfo b{font-size:.87rem;font-weight:580;display:block}
  .hui-row .rinfo span{font-size:.75rem;color:var(--hui-text-4);font-family:var(--hui-mono);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block}
  .hui-row .tools{font-size:.75rem;color:var(--hui-text-3);white-space:nowrap}
  .hui-ico{width:28px;height:28px;border-radius:7px;background:var(--hui-surface-3);display:grid;place-items:center;font-size:.8rem;flex:none;border:1px solid var(--hui-border-soft)}

  .hui-callout{border:1px solid var(--hui-accent-line);border-left:3px solid var(--hui-accent);background:var(--hui-accent-soft);border-radius:var(--hui-r-md);padding:.72rem .92rem;font-size:.82rem;color:var(--hui-text-2);display:flex;gap:.6rem;align-items:flex-start;margin-bottom:1rem}
  .hui-callout svg{width:16px;height:16px;color:var(--hui-accent);flex:none;margin-top:.12rem}
  .hui-callout b{color:var(--hui-accent-hover)}
  .hui-callout code{font-family:var(--hui-mono);font-size:.78em;background:var(--hui-surface);border:1px solid var(--hui-accent-line);border-radius:4px;padding:.05rem .3rem}
  .hui-empty{padding:2.6rem 1.2rem;text-align:center}
  .hui-empty .e-ico{width:40px;height:40px;border-radius:11px;background:var(--hui-surface-3);display:grid;place-items:center;margin:0 auto .8rem;color:var(--hui-text-4);border:1px solid var(--hui-border-soft)}
  .hui-empty .e-ico svg{width:19px;height:19px}
  .hui-empty b{display:block;font-size:.92rem;font-weight:600;margin-bottom:.35rem}
  .hui-empty p{font-size:.81rem;color:var(--hui-text-3);max-width:32rem;margin:0 auto;line-height:1.65}
  .hui-empty code{font-family:var(--hui-mono);font-size:.78em;background:var(--hui-surface-3);border:1px solid var(--hui-border);border-radius:4px;padding:.05rem .3rem}
  .hui-loading{padding:2.6rem;text-align:center;color:var(--hui-text-3);font-size:.85rem}
  .hui-spin{display:inline-block;width:16px;height:16px;border:2px solid var(--hui-border-strong);border-top-color:var(--hui-accent);border-radius:50%;animation:hui-spin .7s linear infinite;vertical-align:-3px;margin-right:.5rem}
  @keyframes hui-spin{to{transform:rotate(360deg)}}
  .hui-mono{font-family:var(--hui-mono)}
  .hui-ellip{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .hui-muted{font-size:.8rem;color:var(--hui-text-3);padding:.4rem 0}

  /* model/provider editing */
  .hui-field{display:flex;flex-direction:column;gap:.28rem}
  .hui-field-l{font-size:.73rem;font-weight:560;color:var(--hui-text-2)}
  .hui-field-l em{font-style:normal;color:var(--hui-text-4);font-weight:400;margin-left:.35rem;font-size:.94em}
  .hui-input{width:100%;padding:.42rem .6rem;border:1px solid var(--hui-border);border-radius:var(--hui-r-sm);background:var(--hui-surface);font-size:.84rem;outline:none;transition:all .14s}
  .hui-input:focus{border-color:var(--hui-accent);box-shadow:0 0 0 3px var(--hui-accent-soft)}
  .hui-form{display:flex;flex-direction:column;gap:.9rem;margin-top:.7rem;padding-top:.9rem;border-top:1px solid var(--hui-border-soft)}
  .hui-form-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(13rem,1fr));gap:.7rem}
  .hui-form-models{display:flex;flex-direction:column;gap:.45rem}
  .hui-form-row{display:flex;gap:.5rem;align-items:center}
  .hui-form-row .hui-input{flex:1;min-width:0}
  .hui-form-key{display:flex;flex-direction:column;gap:.45rem;padding-top:.7rem;border-top:1px dashed var(--hui-border)}
  .hui-form-actions{display:flex;gap:.5rem;align-items:center;padding-top:.2rem}
  .hui-form-actions .hui-spacer{flex:1}
  .hui-mrowlist{display:flex;flex-direction:column;margin-top:.5rem;border-top:1px solid var(--hui-border-soft)}
  .hui-mrow{display:flex;align-items:center;gap:.6rem;padding:.5rem 0;border-bottom:1px solid var(--hui-border-soft)}
  .hui-mrow:last-child{border-bottom:none}
  .hui-mrow-main{min-width:0;display:flex;flex-direction:column}
  .hui-mrow-main b{font-size:.83rem;font-weight:560}
  .hui-mrow-main span{font-size:.72rem;color:var(--hui-text-4)}
  .hui-mrow .hui-spacer{flex:1}
  .hui-keyrow{display:flex;align-items:center;gap:.5rem;margin-top:.5rem;font-size:.76rem;color:var(--hui-text-3)}
  .hui-disco{display:flex;flex-direction:column;gap:.5rem;padding-top:.5rem}
  .hui-disco-err{font-size:.79rem;color:var(--hui-accent);background:var(--hui-accent-soft);border:1px solid var(--hui-accent-line);border-radius:var(--hui-r-sm);padding:.45rem .6rem}
  .hui-disco-list{display:flex;flex-direction:column;gap:.15rem;border:1px solid var(--hui-border);border-radius:var(--hui-r-sm);background:var(--hui-surface-2);padding:.5rem .6rem;max-height:15rem;overflow:auto}
  .hui-disco-head{font-size:.74rem;color:var(--hui-text-3);margin-bottom:.25rem}
  .hui-disco-item{display:flex;align-items:center;gap:.5rem;padding:.28rem .3rem;border-radius:var(--hui-r-sm);cursor:pointer;font-size:.8rem}
  .hui-disco-item:hover{background:var(--hui-border-soft)}
  .hui-disco-item input{flex:none;margin:0}
  .hui-disco-item span{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .hui-disco-item em{font-style:normal;font-size:.72rem;color:var(--hui-text-4);white-space:nowrap}
  `

  /* ---------------- icons ---------------- */
  const I = (p, ...c) => h("svg", Object.assign({ viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }, p), ...c)
  const IconSearch = () => I({}, h("circle", { cx: 11, cy: 11, r: 7 }), h("path", { d: "m20 20-3.5-3.5" }))
  const IconStar = () => h("svg", { viewBox: "0 0 24 24", fill: "currentColor", width: 12, height: 12 }, h("path", { d: "m12 2 3 6.5 7 1-5 4.8 1.2 7L12 18l-6.2 3.3L7 14.3 2 9.5l7-1z" }))
  const IconWarn = () => I({}, h("path", { d: "M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" }))
  const IconSun = () => I({}, h("path", { d: "M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" }))
  const IconMoon = () => I({}, h("circle", { cx: 12, cy: 12, r: 4 }), h("path", { d: "M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" }))
  const IconRefresh = () => I({}, h("path", { d: "M21 12a9 9 0 1 1-2.6-6.4M21 3v6h-6" }))
  const IconPlus = () => I({}, h("path", { d: "M12 5v14M5 12h14" }))
  const IconPlug = () => I({}, h("path", { d: "M12 3v6M12 15v6M3 12h6M15 12h6" }), h("circle", { cx: 12, cy: 12, r: 2.5 }))
  const IconInbox = () => I({}, h("path", { d: "M22 12h-6l-2 3h-4l-2-3H2" }), h("path", { d: "M5.5 5.1 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.5-6.9A2 2 0 0 0 16.7 4H7.3a2 2 0 0 0-1.8 1.1z" }))
  const IconExternal = () => I({}, h("path", { d: "M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" }))
  const IconTrash = () => I({}, h("path", { d: "M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14" }))
  const IconChip = () => I({}, h("rect", { x: 6, y: 6, width: 12, height: 12, rx: 2 }), h("path", { d: "M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" }))

  /* ---------------- utils ---------------- */
  function relTime(ms) {
    if (typeof ms !== "number" || !isFinite(ms)) return ""
    const d = Date.now() - ms
    if (d < 60000) return "刚刚"
    if (d < 3600000) return Math.floor(d / 60000) + " 分钟前"
    if (d < 86400000) return Math.floor(d / 3600000) + " 小时前"
    if (d < 2592000000) return Math.floor(d / 86400000) + " 天前"
    return new Date(ms).toLocaleDateString()
  }
  function shortId(id) { return typeof id === "string" ? id.slice(0, 8) : String(id) }

  /** Subscribe to a cordis ObservableSnapshot. Returns the live value. */
  function useSnapshot(obs, fallback) {
    const [v, setV] = React.useState(() => { try { return obs ? obs.getSnapshot() : fallback } catch (e) { return fallback } })
    React.useEffect(() => {
      if (!obs) { setV(fallback); return }
      let live = true
      const read = () => { if (live) { try { setV(obs.getSnapshot()) } catch (e) {} } }
      read()
      let unsub
      try { unsub = obs.subscribe(read) } catch (e) {}
      return () => { live = false; if (typeof unsub === "function") unsub() }
    }, [obs])
    return v
  }

  /** Run an async loader once per dep change. `loader` may be null → 'unavailable'.
   *  A loader that throws the `__unavailable__` sentinel also resolves to 'unavailable'. */
  function useAsync(loader, deps) {
    const [state, setState] = React.useState({ status: "loading", data: null, error: null })
    React.useEffect(() => {
      if (typeof loader !== "function") { setState({ status: "unavailable", data: null, error: null }); return }
      let live = true
      setState({ status: "loading", data: null, error: null })
      Promise.resolve().then(loader).then(
        (data) => { if (live) setState({ status: "ready", data, error: null }) },
        (err) => {
          if (!live) return
          const msg = (err && err.message) || String(err)
          if (msg === "__unavailable__") setState({ status: "unavailable", data: null, error: null })
          else setState({ status: "error", data: null, error: msg })
        }
      )
      return () => { live = false }
    }, deps)
    return state
  }

  function Loading({ what }) { return h("div", { className: "hui-loading" }, h("span", { className: "hui-spin" }), "正在加载" + (what || "") + "…") }
  function Empty({ icon, title, children }) {
    return h("div", { className: "hui-card hui-empty" },
      h("div", { className: "e-ico" }, icon || h(IconInbox)),
      h("b", null, title),
      h("p", null, children))
  }
  function Badge({ kind, children }) { return h("span", { className: "hui-badge " + kind }, children) }

  /* ================================================================
     Views — every view reads its own real source and degrades honestly.
     ================================================================ */

  /* ---------- Overview: counts from the live session list + plugins ---------- */
  function Overview({ face }) {
    const list = useSnapshot(face.sessions && face.sessions.list, null)
    const ids = list && list.ids ? list.ids : []
    const running = list && list.byId ? ids.filter((id) => list.byId[id] && list.byId[id].running) : []
    const pluginState = useAsync(face.loadPlugins, [face.loadPlugins])
    const bundleCount = pluginState.status === "ready" && pluginState.data ? pluginState.data.bundles.length : null
    const stats = [
      ["会话总数", ids.length || "—", running.length ? "进行中 " + running.length : "无进行中"],
      ["已装插件", bundleCount == null ? "—" : bundleCount, pluginState.status === "ready" ? "来自 pluginInventory" : "读取中"],
      ["当前模型", face.activeModel ? face.activeModel() : "—", "当前会话"],
      ["技能", "—", "见技能浏览"]
    ]
    const recent = ids.slice(0, 5).map((id) => list.byId[id]).filter(Boolean)
    return h("div", { className: "hui-inner" },
      h("div", { className: "hui-ph" }, h("div", null, h("h2", null, "总览"), h("p", null, "Harness 控制台 · 数据来自 DSH 运行时"))),
      h("div", { className: "hui-grid hui-g4", style: { marginBottom: "1.1rem" } },
        stats.map((s, i) => h("div", { className: "hui-card hui-stat", key: i },
          h("div", { className: "l" }, s[0]), h("div", { className: "v" }, s[1]), h("div", { className: "d" }, s[2])))),
      h("div", { className: "hui-grid hui-g2" },
        h("div", { className: "hui-card", style: { padding: "1rem 1.1rem" } },
          h("div", { className: "hui-sec" }, "最近会话"),
          recent.length ? recent.map((s, i) => h("div", { className: "hui-kv", key: i },
            h("span", { className: "hui-ellip" }, s.displayTitle || shortId(s.id)),
            h("b", { className: "hui-mono", style: { fontSize: ".74rem", color: "var(--hui-text-3)" } }, relTime(s.updatedAt))))
            : h("div", { style: { fontSize: ".8rem", color: "var(--hui-text-3)" } }, face.sessions ? "暂无会话" : "sessions 服务不可用")),
        h("div", { className: "hui-card", style: { padding: "1rem 1.1rem" } },
          h("div", { className: "hui-sec" }, "数据源状态"),
          h("div", { className: "hui-kv" }, h("span", null, "sessions"), h("b", null, face.sessions ? "已连接" : "不可用")),
          h("div", { className: "hui-kv" }, h("span", null, "pluginInventory"), h("b", null, face.pluginInventory ? "已连接" : "不可用")),
          h("div", { className: "hui-kv" }, h("span", null, "skills"), h("b", null, face.skills ? "已连接" : "不可用")))))
  }

  /* ---------- Sessions: live list + host-side search ---------- */
  function Sessions({ face }) {
    const list = useSnapshot(face.sessions && face.sessions.list, null)
    const [q, setQ] = React.useState("")
    const [filter, setFilter] = React.useState("all")
    const ids = list && list.ids ? list.ids : []
    const byId = (list && list.byId) || {}
    let rows = ids.map((id) => byId[id]).filter(Boolean)
    if (filter === "running") rows = rows.filter((s) => s.running)
    else if (filter === "blank") rows = rows.filter((s) => s.blank)
    else if (filter === "recent") rows = rows.filter((s) => Date.now() - (s.updatedAt || 0) < 86400000)
    if (q.trim()) {
      const needle = q.trim().toLowerCase()
      rows = rows.filter((s) => ((s.displayTitle || "") + " " + (s.cwd || "") + " " + s.id).toLowerCase().includes(needle))
    }
    const head = h("div", { className: "hui-ph" },
      h("div", null, h("h2", null, "会话管理"),
        h("p", null, face.sessions ? "来自 sessions 服务 · 共 " + ids.length + " 个会话" : "sessions 服务不可用")),
      h("div", { className: "hui-act" },
        h("button", { className: "hui-btn ghost", onClick: () => { if (face.sessions) face.sessions.refresh() } }, h(IconRefresh), "刷新")))
    const toolbar = h("div", { className: "hui-toolbar" },
      h("div", { className: "hui-search" }, h(IconSearch),
        h("input", { placeholder: "按标题、目录或 id 过滤…", value: q, onChange: (e) => setQ(e.target.value) })),
      h("div", { className: "hui-chips" },
        [["all", "全部"], ["running", "进行中"], ["recent", "24 小时内"], ["blank", "空白"]].map(([k, label]) =>
          h("button", { key: k, className: "hui-chip" + (filter === k ? " on" : ""), onClick: () => setFilter(k) }, label))))
    let body
    if (!face.sessions) {
      body = h(Empty, { icon: h(IconInbox), title: "sessions 服务不可用" },
        "本部署未挂载 DSH 会话服务，无法读取真实会话列表。")
    } else if (!list || list.phase === "pending") {
      body = h(Loading, { what: "会话" })
    } else if (!rows.length) {
      body = h(Empty, { icon: h(IconInbox), title: ids.length ? "没有匹配的会话" : "暂无会话" },
        ids.length ? "换个关键词或筛选条件试试。" : "在 DSH 里开始一个会话后，它会出现在这里。")
    } else {
      const headRow = h("tr", null,
        h("th", null, "会话"), h("th", null, "目录"), h("th", null, "状态"), h("th", null, "更新时间"))
      const bodyRows = rows.map((s) => h("tr", { key: s.id },
        h("td", null,
          h("div", { className: "main" }, s.displayTitle || shortId(s.id)),
          h("div", { className: "sub hui-mono" }, shortId(s.id))),
        h("td", { className: "sub hui-ellip", style: { maxWidth: "18rem" } }, s.cwd || "—"),
        h("td", null, s.running ? h(Badge, { kind: "ok" }, "进行中") : s.blank ? h(Badge, { kind: "grey" }, "空白") : h(Badge, { kind: "grey" }, "空闲")),
        h("td", { className: "sub" }, relTime(s.updatedAt))))
      body = h("div", { className: "hui-card", style: { overflow: "hidden" } },
        h("table", { className: "hui-tbl" }, h("thead", null, headRow), h("tbody", null, bodyRows)))
    }
    return h("div", { className: "hui-inner" }, head, toolbar, body)
  }

  /* ---------- Plugins: pluginInventory + pluginManager ---------- */
  function Plugins({ face }) {
    const [nonce, setNonce] = React.useState(0)
    const state = useAsync(face.loadPlugins, [face.loadPlugins, nonce])
    const [busy, setBusy] = React.useState(null)
    const [note, setNote] = React.useState(null)
    const reload = () => setNonce((n) => n + 1)
    async function toggle(bundle) {
      if (!face.pluginManager || !face.pluginManager.setBundleEnabled) { setNote("pluginManager 不可用，无法切换"); return }
      setBusy(bundle.name)
      try {
        const r = await face.pluginManager.setBundleEnabled(bundle.name, !bundle.enabled)
        if (r && r.ok === false) setNote("切换失败：" + (r.error && r.error.message ? r.error.message : "未知错误"))
        else { setNote((bundle.enabled ? "已停用 " : "已启用 ") + bundle.name + "（下次启动生效）"); reload() }
      } catch (e) { setNote("切换失败：" + ((e && e.message) || e)) }
      finally { setBusy(null) }
    }
    const head = h("div", { className: "hui-ph" },
      h("div", null, h("h2", null, "插件管理"),
        h("p", null, state.status === "ready" ? "来自 pluginInventory · 共 " + state.data.bundles.length + " 个 bundle" : "读取插件清单…")),
      h("div", { className: "hui-act" }, h("button", { className: "hui-btn ghost", onClick: reload }, h(IconRefresh), "刷新")))
    let body
    if (state.status === "unavailable") {
      body = h(Empty, { icon: h(IconPlug), title: "pluginInventory 不可用" },
        "本部署未挂载插件清单服务，无法读取已装插件。")
    } else if (state.status === "loading") {
      body = h(Loading, { what: "插件" })
    } else if (state.status === "error") {
      body = h(Empty, { icon: h(IconWarn), title: "读取失败" }, state.error)
    } else {
      const d = state.data
      const cards = d.bundles.map((b) => h("div", { className: "hui-card hui-pcard", key: b.name },
        h("div", { className: "hui-pc-top" },
          h("div", { className: "hui-pc-ico" }, h(IconPlug)),
          h("div", { style: { flex: 1, minWidth: 0 } },
            h("div", { className: "hui-pc-name" }, h("span", null, b.name)),
            h("div", { className: "hui-pc-sub" }, (b.version ? "v" + b.version : "—") + (b.installed ? " · 已安装" : " · 内置"))),
          h("div", { className: "hui-switch" + (b.enabled ? " on" : ""), role: "switch", "aria-checked": b.enabled, style: busy === b.name ? { opacity: .5 } : null, onClick: () => busy ? null : toggle(b) })),
        h("div", { className: "hui-pc-desc" }, b.description || "（无描述）"),
        h("div", { className: "hui-pc-foot" },
          h(Badge, { kind: b.enabled ? "ok" : "grey" }, b.enabled ? "已启用" : "已停用"),
          b.rows && b.rows.length ? h(Badge, { kind: "info" }, b.rows.length + " 行") : null,
          h("div", { className: "hui-spacer" }),
          b.readOnlyReason ? h(Badge, { kind: "run" }, "只读") : null)))
      const plugins = d.plugins || []
      const rows = plugins.slice(0, 40).map((p, i) => h("tr", { key: (p.entryId || "") + i },
        h("td", { className: "hui-mono", style: { fontSize: ".77rem" } }, p.moduleName || "—"),
        h("td", null, p.enabled ? h(Badge, { kind: "ok" }, "启用") : h(Badge, { kind: "grey" }, "停用")),
        h("td", { className: "sub" }, p.fiberPhase || "—")))
      body = h(React.Fragment, null,
        note ? h("div", { className: "hui-callout" }, h(IconWarn), h("div", null, note)) : null,
        cards.length ? h("div", { className: "hui-grid hui-g2" }, cards) : h(Empty, { icon: h(IconPlug), title: "没有已装 bundle" }, "profile 里还没有任何 bundle。"),
        plugins.length ? h("div", { className: "hui-card", style: { overflow: "hidden", marginTop: "1.1rem" } },
          h("table", { className: "hui-tbl" },
            h("thead", null, h("tr", null, h("th", null, "Loader 条目"), h("th", null, "启用"), h("th", null, "Fiber 状态"))),
            h("tbody", null, rows))) : null)
    }
    return h("div", { className: "hui-inner" }, head, body)
  }

  /* ---------- Market: public GitHub topic index ---------- */
  function Market({ face }) {
    const [cat, setCat] = React.useState("全部")
    const [nonce, setNonce] = React.useState(0)
    const state = useAsync(face.loadMarket, [face.loadMarket, nonce])
    const cats = ["全部", "UI 增强", "工具", "集成", "效率", "其它"]
    const head = h("div", { className: "hui-ph" },
      h("div", null, h("h2", null, "插件市场"), h("p", null, "GitHub topic:dsh-plugin 的公开仓库 · 按 star 排序")),
      h("div", { className: "hui-act" }, h("button", { className: "hui-btn ghost", onClick: () => setNonce((n) => n + 1) }, h(IconRefresh), "刷新索引")))
    let body
    if (state.status === "loading") body = h(Loading, { what: "市场索引" })
    else if (state.status === "error") body = h(Empty, { icon: h(IconWarn), title: "无法读取市场索引" },
      h("span", null, state.error, "。GitHub 搜索接口对未登录请求限速 10 次/分钟，稍后重试即可。"))
    else {
      const repos = (state.data && state.data.items) || []
      const list = repos.filter((r) => cat === "全部" || face.categorize(r) === cat)
      body = list.length
        ? h("div", { className: "hui-grid hui-g2" }, list.map((r) => h("div", { className: "hui-card hui-pcard", key: r.id || r.full_name },
            h("div", { className: "hui-pc-top" },
              h("div", { className: "hui-pc-ico" }, h(IconPlug)),
              h("div", { style: { flex: 1, minWidth: 0 } },
                h("div", { className: "hui-pc-name" }, h("span", null, (r.name || "").replace(/^dsh-/, ""))),
                h("div", { className: "hui-pc-sub" }, r.full_name)),
              h("span", { className: "hui-chip", style: { pointerEvents: "none" } }, face.categorize(r))),
            h("div", { className: "hui-pc-desc" }, r.description || "（无描述）"),
            h("div", { className: "hui-pc-foot" },
              h("span", { className: "hui-stars" }, h(IconStar), r.stargazers_count),
              h("div", { className: "hui-spacer" }),
              h("button", { className: "hui-btn ghost sm", onClick: () => { try { window.open(r.html_url, "_blank", "noopener") } catch (e) {} } }, h(IconExternal), "打开")))))
        : h(Empty, { icon: h(IconInbox), title: "没有匹配的插件" }, "换个分类试试。")
    }
    const toolbar = h("div", { className: "hui-toolbar" },
      h("div", { className: "hui-chips" }, cats.map((c) => h("button", { key: c, className: "hui-chip" + (cat === c ? " on" : ""), onClick: () => setCat(c) }, c))))
    return h("div", { className: "hui-inner" }, head, toolbar, body)
  }

  /* ---------- Skills: real catalog for the active session ---------- */
  function Skills({ face }) {
    const sessionId = useSnapshot(face.activeSession, null)
    const [q, setQ] = React.useState("")
    const loader = React.useCallback(
      () => (face.skills && sessionId) ? face.loadSkills(sessionId) : Promise.reject(new Error(face.skills ? "no-session" : "no-service")),
      [face.loadSkills, sessionId])
    const state = useAsync(face.skills && sessionId ? loader : null, [face.skills, sessionId])
    const head = h("div", { className: "hui-ph" },
      h("div", null, h("h2", null, "技能浏览"),
        h("p", null, state.status === "ready" ? "来自 skills/list · 共 " + state.data.length + " 个技能" : "当前会话的可用技能")))
    let body
    if (!face.skills) {
      body = h(Empty, { icon: h(IconInbox), title: "skills 服务不可用" }, "本部署未挂载技能目录服务。")
    } else if (!sessionId) {
      body = h(Empty, { icon: h(IconInbox), title: "没有活动会话" }, "技能目录按会话解析，先打开一个会话再回来。")
    } else if (state.status === "loading") body = h(Loading, { what: "技能" })
    else if (state.status === "error") {
      body = state.error === "no-session"
        ? h(Empty, { icon: h(IconInbox), title: "没有活动会话" }, "技能目录按会话解析，先打开一个会话再回来。")
        : h(Empty, { icon: h(IconWarn), title: "读取失败" }, state.error)
    } else {
      const list = state.data.filter((s) => !q.trim() || ((s.name || "") + " " + (s.description || "")).toLowerCase().includes(q.trim().toLowerCase()))
      body = list.length
        ? h("div", { className: "hui-card", style: { overflow: "hidden" } }, list.map((s, i) => h("div", { className: "hui-row", key: s.name || i },
            h("div", { className: "hui-ico" }, "/"),
            h("div", { className: "rinfo" }, h("b", null, s.name), h("span", { style: { fontFamily: "var(--hui-sans)" } }, s.description || "")),
            s.modelInvocable ? h(Badge, { kind: "info" }, "模型可调用") : h(Badge, { kind: "grey" }, "仅人工"))))
        : h(Empty, { icon: h(IconInbox), title: "没有匹配的技能" }, "换个关键词试试。")
    }
    const toolbar = face.skills && sessionId ? h("div", { className: "hui-toolbar" },
      h("div", { className: "hui-search" }, h(IconSearch),
        h("input", { placeholder: "搜索技能…", value: q, onChange: (e) => setQ(e.target.value) }))) : null
    return h("div", { className: "hui-inner" }, head, toolbar, body)
  }

  /* ---------- MCP: no host HTTP route and no client Remote in this build ---------- */
  function Mcp({ face }) {
    return h("div", { className: "hui-inner" },
      h("div", { className: "hui-ph" }, h("div", null, h("h2", null, "MCP 管理"), h("p", null, "模型上下文协议服务器"))),
      h(Empty, { icon: h(IconInbox), title: "此构建未提供 MCP 客户端接口" },
        h("span", null, "DSH 的 MCP 能力在宿主侧（", h("code", null, "packages/mcp/mcp-client"), "），但既没有浏览器端 Remote 命名空间，也没有像用量那样的宿主 HTTP 端点，因此本面板拿不到真实的服务器列表。"),
        h("br"), h("br"),
        h("span", null, "如需在此展示，需要上游提供 ", h("code", null, "remote.mcp"), " 或一个 ", h("code", null, "/api/…"), " 路由；在此之前本插件不会填充占位数据。")))
  }

  /* ---------- Usage: reads the loopback /api/dsh-usage/overview document ---------- */
  function fmtTokens(n) {
    if (typeof n !== "number" || !isFinite(n)) return "—"
    if (n >= 1e9) return (n / 1e9).toFixed(2) + "B"
    if (n >= 1e6) return (n / 1e6).toFixed(2) + "M"
    if (n >= 1e3) return (n / 1e3).toFixed(1) + "k"
    return String(n)
  }
  function Usage({ face }) {
    const [nonce, setNonce] = React.useState(0)
    const state = useAsync(face.loadUsage, [face.loadUsage, nonce])
    const head = h("div", { className: "hui-ph" },
      h("div", null, h("h2", null, "用量与模型"),
        h("p", null, state.status === "ready" ? "来自 /api/dsh-usage/overview" : "Token 消耗与供应商余额")),
      h("div", { className: "hui-act" }, h("button", { className: "hui-btn ghost", onClick: () => setNonce((n) => n + 1) }, h(IconRefresh), "刷新")))
    if (state.status === "unavailable") {
      return h("div", { className: "hui-inner" }, head,
        h(Empty, { icon: h(IconInbox), title: "用量服务不可用" },
          h("span", null, "宿主没有提供 ", h("code", null, "/api/dsh-usage/overview"), "。该端点由已装的 ", h("code", null, "@linxin666/dsh-usage"), " 插件注册；装上它即可在此看到真实数据。")))
    }
    if (state.status === "loading") return h("div", { className: "hui-inner" }, head, h(Loading, { what: "用量" }))
    if (state.status === "error") {
      return h("div", { className: "hui-inner" }, head,
        h(Empty, { icon: h(IconWarn), title: "读取失败" }, state.error))
    }
    const d = state.data || {}
    const usage = d.usage || {}
    const today = usage.today || {}
    const all = usage.all || {}
    const cur = d.current || {}
    const days = Array.isArray(usage.days) ? usage.days : []
    const balances = (d.providers || []).filter((p) => p && p.balance)
    const dayMax = Math.max(1, ...days.map((x) => (x.totals && x.totals.cost) || 0))
    const stats = [
      ["今日 Token", fmtTokens(((today.totals || {}).inputTokens || 0) + ((today.totals || {}).outputTokens || 0)), today.date || "—"],
      ["今日成本", "$" + (((today.totals || {}).cost) || 0).toFixed(2), ((today.totals || {}).calls || 0) + " 次调用"],
      ["累计成本", "$" + (((all.totals || {}).cost) || 0).toFixed(2), (all.from || "—") + " 起"],
      ["观测支出", "¥" + ((usage.observedSpend || {}).cny != null ? usage.observedSpend.cny : "—"), "since 记录点"]
    ]
    const cards = h("div", { className: "hui-grid hui-g4", style: { marginBottom: "1.1rem" } },
      stats.map((s, i) => h("div", { className: "hui-card hui-stat", key: i },
        h("div", { className: "l" }, s[0]), h("div", { className: "v" }, s[1]), h("div", { className: "d" }, s[2]))))
    const bars = days.length
      ? h("div", { className: "hui-card", style: { padding: "1.1rem", marginBottom: "1.1rem" } },
          h("div", { className: "hui-sec" }, "每日成本"),
          h("div", { className: "hui-chart" }, days.map((x, i) => h("div", { className: "bar", key: i },
            h("i", { style: { height: Math.max(3, Math.round((((x.totals || {}).cost) || 0) / dayMax * 100)) + "%" } }),
            h("span", null, (x.date || "").slice(5))))))
      : null
    const curCard = h("div", { className: "hui-card", style: { padding: "1.1rem" } },
      h("div", { className: "hui-sec" }, "当前路由"),
      h("div", { className: "hui-kv" }, h("span", null, "供应商"), h("b", null, cur.provider || "—")),
      h("div", { className: "hui-kv" }, h("span", null, "模型"), h("b", null, cur.model || "—")),
      h("div", { className: "hui-kv" }, h("span", null, "来源"), h("b", null, cur.source || "—")))
    const balCard = h("div", { className: "hui-card", style: { padding: "1.1rem" } },
      h("div", { className: "hui-sec" }, "供应商余额"),
      balances.length
        ? balances.slice(0, 6).map((p, i) => h("div", { className: "hui-kv", key: i },
            h("span", { className: "hui-ellip" }, p.displayName || p.provider),
            h("b", null, (p.balance.currency === "USD" ? "$" : "¥") + p.balance.totalBalance)))
        : h("div", { style: { fontSize: ".8rem", color: "var(--hui-text-3)" } }, "无余额信息"))
    const todayProv = (today.providers || [])
    const provTable = todayProv.length
      ? h("div", { className: "hui-card", style: { overflow: "hidden", marginTop: "1.1rem" } },
          h("table", { className: "hui-tbl" },
            h("thead", null, h("tr", null,
              h("th", null, "供应商"), h("th", { className: "num" }, "输入"), h("th", { className: "num" }, "输出"),
              h("th", { className: "num" }, "调用"), h("th", { className: "num" }, "成本"))),
            h("tbody", null, todayProv.map((p, i) => h("tr", { key: i },
              h("td", { className: "main" }, p.provider),
              h("td", { className: "num" }, fmtTokens((p.totals || {}).inputTokens)),
              h("td", { className: "num" }, fmtTokens((p.totals || {}).outputTokens)),
              h("td", { className: "num" }, (p.totals || {}).calls || 0),
              h("td", { className: "num" }, "$" + (((p.totals || {}).cost) || 0).toFixed(2)))))))
      : null
    return h("div", { className: "hui-inner" }, head, cards, bars,
      h("div", { className: "hui-grid hui-g2" }, curCard, balCard), provTable)
  }

  /* ================================================================
     Models — switch the active model and edit providers/models without
     touching settings.yaml. Reads: remote.llm / remote.settings.
     Writes: remote.settings.mutate (namespace `llm-pi-ai`).
     ================================================================ */
  function Field({ label, hint, value, onChange, placeholder, mono }) {
    return h("label", { className: "hui-field" },
      h("span", { className: "hui-field-l" }, label, hint ? h("em", null, hint) : null),
      h("input", {
        className: "hui-input" + (mono ? " hui-mono" : ""),
        value: value == null ? "" : value,
        placeholder: placeholder || "",
        onChange: (e) => onChange(e.target.value)
      }))
  }

  function Models({ face }) {
    const sessionId = useSnapshot(face.activeSession, null)
    const [nonce, setNonce] = React.useState(0)
    const state = useAsync(face.loadModelConfig, [face.loadModelConfig, nonce])
    const [busy, setBusy] = React.useState(null)
    const [note, setNote] = React.useState(null)
    const [editing, setEditing] = React.useState(null)   // provider key being edited
    const [adding, setAdding] = React.useState(false)     // new-provider form
    const [showAll, setShowAll] = React.useState(false)   // include unconfigured adapter routes
    const refresh = () => setNonce((n) => n + 1)

    async function switchModel(provider, model) {
      if (!sessionId) { setNote("没有活动会话，无法切换"); return }
      setBusy(provider + "/" + model)
      try {
        const r = await face.selectModel(sessionId, { provider, model })
        setNote(r.ok === false ? "切换失败：" + (r.error && r.error.message || "未知错误") : "已切换到 " + provider + " / " + model)
        refresh()
      } catch (e) { setNote("切换失败：" + ((e && e.message) || e)) }
      finally { setBusy(null) }
    }
    async function saveProvider(key, draft) {
      setBusy("save:" + key)
      try {
        const r = await face.writeProvider(key, draft)
        setNote(r.ok ? "已保存供应商 " + key : "保存失败：" + r.message)
        if (r.ok) { setEditing(null); setAdding(false); refresh() }
      } catch (e) { setNote("保存失败：" + ((e && e.message) || e)) }
      finally { setBusy(null) }
    }
    async function removeProvider(key) {
      setBusy("del:" + key)
      try {
        const r = await face.removeProvider(key)
        setNote(r.ok ? "已删除供应商 " + key : "删除失败：" + r.message)
        if (r.ok) { setEditing(null); refresh() }
      } catch (e) { setNote("删除失败：" + ((e && e.message) || e)) }
      finally { setBusy(null) }
    }
    async function setKey(ref, value) {
      setBusy("key:" + ref)
      try {
        const r = await face.writeCredential(ref, value)
        setNote(r.ok ? "已更新密钥 " + ref : "写入失败：" + r.message)
        if (r.ok) refresh()
      } catch (e) { setNote("写入失败：" + ((e && e.message) || e)) }
      finally { setBusy(null) }
    }

    const head = h("div", { className: "hui-ph" },
      h("div", null, h("h2", null, "模型与供应商"),
        h("p", null, state.status === "ready" ? "直接写入配置，无需编辑 settings.yaml" : "切换模型 · 自定义供应商与模型")),
      h("div", { className: "hui-act" },
        h("button", { className: "hui-btn ghost", onClick: refresh }, h(IconRefresh), "刷新"),
        h("button", { className: "hui-btn dark", onClick: () => { setAdding(true); setEditing(null) } }, h(IconPlus), "新增供应商")))

    if (state.status === "unavailable") {
      return h("div", { className: "hui-inner" }, head,
        h(Empty, { icon: h(IconPlug), title: "模型配置服务不可用" },
          h("span", null, "需要 ", h("code", null, "remote.llm"), " 与 ", h("code", null, "remote.settings"), " 两个服务，本部署未提供。")))
    }
    if (state.status === "loading") return h("div", { className: "hui-inner" }, head, h(Loading, { what: "模型配置" }))
    if (state.status === "error") {
      return h("div", { className: "hui-inner" }, head, h(Empty, { icon: h(IconWarn), title: "读取失败" }, state.error))
    }
    const d = state.data || {}
    const allProviders = d.providers || []
    // Default view: providers the user actually configured. The adapter's full
    // directory (40+ routes) is available behind a toggle instead of flooding
    // the page — a normal user configures a handful, not the whole catalog.
    const providers = showAll ? allProviders : allProviders.filter((p) => p.configured)
    const hiddenCount = allProviders.length - providers.length
    const nsView = d.nsView || {}
    const revision = nsView.revision
    const current = d.current || {}

    const headWithToggle = h("div", { className: "hui-ph" },
      h("div", null, h("h2", null, "模型与供应商"),
        h("p", null, "直接写入配置，无需编辑 settings.yaml")),
      h("div", { className: "hui-act" },
        hiddenCount > 0
          ? h("button", { className: "hui-btn ghost", onClick: () => setShowAll((v) => !v) },
              showAll ? "只看已配置" : "显示全部（+" + hiddenCount + "）")
          : null,
        h("button", { className: "hui-btn ghost", onClick: refresh }, h(IconRefresh), "刷新"),
        h("button", { className: "hui-btn dark", onClick: () => { setAdding(true); setEditing(null) } }, h(IconPlus), "新增供应商")))

    const noteBar = note ? h("div", { className: "hui-callout" }, h(IconWarn), h("div", null, note)) : null

    /* --- current selection + quick switch --- */
    const curCard = h("div", { className: "hui-card", style: { padding: "1rem 1.1rem", marginBottom: "1.1rem" } },
      h("div", { className: "hui-sec" }, "当前模型" + (sessionId ? "" : "（无活动会话）")),
      h("div", { className: "hui-kv" }, h("span", null, "供应商"), h("b", null, current.provider || "—")),
      h("div", { className: "hui-kv" }, h("span", null, "模型"), h("b", null, current.model || "—")))

    /* --- provider list with editable model rows --- */
    const providerCards = providers.map((p) => {
      const isEditing = editing === p.key
      const models = p.models || []
      const modelRows = models.map((m, i) => h("div", { className: "hui-mrow", key: (m.id || "") + i },
        h("div", { className: "hui-mrow-main" },
          h("b", null, m.name || m.id),
          m.name && m.name !== m.id ? h("span", { className: "hui-mono" }, m.id) : null),
        h("div", { className: "hui-spacer" }),
        h("button", {
          className: "hui-btn ghost sm",
          disabled: busy === p.key + "/" + m.id,
          onClick: () => switchModel(p.key, m.id)
        }, busy === p.key + "/" + m.id ? "切换中…" : "切换")))
      const editor = isEditing ? h(ProviderForm, {
        provider: p, busy: !!busy,
        onCancel: () => setEditing(null),
        onSave: (draft) => saveProvider(p.key, draft),
        onDiscover: face.discoverModels,
        onDelete: () => removeProvider(p.key)
      }) : null
      return h("div", { className: "hui-card", style: { padding: "1rem 1.1rem" }, key: p.key },
        h("div", { className: "hui-pc-top" },
          h("div", { className: "hui-pc-ico" }, h(IconPlug)),
          h("div", { style: { flex: 1, minWidth: 0 } },
            h("div", { className: "hui-pc-name" }, h("span", null, p.displayName || p.key)),
            h("div", { className: "hui-pc-sub" }, p.key + (p.baseURL ? " · " + p.baseURL : "") + (p.api ? " · " + p.api : ""))),
          p.declared ? h(Badge, { kind: "info" }, "配置新增") : null,
          h("button", { className: "hui-btn ghost sm", onClick: () => { setEditing(isEditing ? null : p.key); setAdding(false) } },
            isEditing ? "收起" : "编辑")),
        p.apiKeyRef ? h("div", { className: "hui-keyrow" },
          h("span", { className: "hui-mono" }, p.apiKeyRef),
          p.keyConfigured ? h(Badge, { kind: "ok" }, "已配置") : h(Badge, { kind: "run" }, "未配置")) : null,
        modelRows.length ? h("div", { className: "hui-mrowlist" }, modelRows) : h("div", { className: "hui-muted" }, "无模型条目"),
        editor)
    })

    const addForm = adding ? h("div", { className: "hui-card", style: { padding: "1rem 1.1rem", marginTop: "1.1rem" } },
      h(ProviderForm, {
        provider: { key: "", displayName: "", baseURL: "", api: "openai-completions", apiKeyRef: "", models: [] },
        isNew: true, busy: !!busy,
        onCancel: () => setAdding(false),
        onSave: (draft) => saveProvider(draft.key, draft),
        onDiscover: face.discoverModels,
        onDelete: null
      })) : null

    return h("div", { className: "hui-inner" }, headWithToggle, noteBar, curCard,
      h("div", { className: "hui-grid hui-g2" }, providerCards), addForm)
  }

  /** Provider editor: identity, endpoint, key reference, and the model list. */
  function ProviderForm(props) {
    const src = props.provider || {}
    const [key, setKey] = React.useState(src.key || "")
    const [displayName, setDisplayName] = React.useState(src.displayName || "")
    const [baseURL, setBaseURL] = React.useState(src.baseURL || "")
    const [api, setApi] = React.useState(src.api || "openai-completions")
    const [apiKeyRef, setApiKeyRef] = React.useState(src.apiKeyRef || "")
    const [models, setModels] = React.useState(() => (src.models || []).map((m) => ({ id: m.id || "", name: m.name || "" })))
    const [newKey, setNewKey] = React.useState("")
    const [disco, setDisco] = React.useState({ status: "idle", items: [], error: null, picked: {} })

    const upd = (i, field, v) => setModels((ms) => ms.map((m, j) => (j === i ? Object.assign({}, m, { [field]: v }) : m)))
    const addRow = () => setModels((ms) => ms.concat([{ id: "", name: "" }]))
    const delRow = (i) => setModels((ms) => ms.filter((_, j) => j !== i))

    const draft = () => ({ key, displayName, baseURL, api, apiKeyRef, models: models.filter((m) => m.id.trim()) })

    /** Ask the host to interrogate the endpoint for its model list. */
    async function discover() {
      if (!props.onDiscover) return
      setDisco({ status: "loading", items: [], error: null, picked: {} })
      const r = await props.onDiscover({ key, baseURL, api, apiKey: newKey || undefined })
      if (!r || r.ok === false) {
        setDisco({ status: "error", items: [], error: (r && r.message) || "获取失败", picked: {} })
        return
      }
      const have = new Set(models.map((m) => m.id))
      const picked = {}
      for (const it of r.items) picked[it.id] = !have.has(it.id)
      setDisco({ status: "ready", items: r.items, error: null, picked })
    }
    /** Merge the ticked discoveries into the model list. */
    function addPicked() {
      const chosen = disco.items.filter((it) => disco.picked[it.id])
      setModels((ms) => {
        const have = new Set(ms.map((m) => m.id))
        return ms.concat(chosen.filter((it) => !have.has(it.id)).map((it) => ({ id: it.id, name: it.name || it.id })))
      })
      setDisco({ status: "idle", items: [], error: null, picked: {} })
    }

    const canDiscover = !!(props.onDiscover && baseURL.trim() && api.trim())
    const discoBlock = h("div", { className: "hui-disco" },
      h("div", { className: "hui-form-row" },
        h("button", {
          className: "hui-btn ghost sm", disabled: !canDiscover || disco.status === "loading", onClick: discover,
          title: canDiscover ? "向该端点查询可用模型" : "需要先填 Base URL 与 API 类型"
        }, disco.status === "loading" ? "获取中…" : "从端点获取模型"),
        !canDiscover ? h("span", { className: "hui-muted", style: { padding: 0 } }, "填好 Base URL 与 API 类型后可自动获取") : null),
      disco.status === "error" ? h("div", { className: "hui-disco-err" }, disco.error) : null,
      disco.status === "ready" ? (disco.items.length
        ? h("div", { className: "hui-disco-list" },
            h("div", { className: "hui-disco-head" }, "发现 " + disco.items.length + " 个模型，勾选后加入列表"),
            disco.items.map((it) => h("label", { className: "hui-disco-item", key: it.id },
              h("input", {
                type: "checkbox", checked: !!disco.picked[it.id],
                onChange: (e) => setDisco((d) => Object.assign({}, d, { picked: Object.assign({}, d.picked, { [it.id]: e.target.checked }) }))
              }),
              h("span", { className: "hui-mono" }, it.id),
              it.name && it.name !== it.id ? h("em", null, it.name) : null,
              it.contextWindow ? h("em", null, Math.round(it.contextWindow / 1000) + "k ctx") : null)),
            h("div", { className: "hui-form-row" },
              h("button", { className: "hui-btn dark sm", onClick: addPicked }, "加入所选"),
              h("button", { className: "hui-btn ghost sm", onClick: () => setDisco({ status: "idle", items: [], error: null, picked: {} }) }, "取消")))
        : h("div", { className: "hui-muted" }, "该端点未报告任何模型")) : null)

    return h("div", { className: "hui-form" },
      h("div", { className: "hui-form-grid" },
        h(Field, { label: "供应商 key", hint: "路由标识，如 my-gateway", value: key, onChange: setKey, placeholder: "my-gateway", mono: true }),
        h(Field, { label: "显示名", value: displayName, onChange: setDisplayName, placeholder: "My Gateway" }),
        h(Field, { label: "Base URL", value: baseURL, onChange: setBaseURL, placeholder: "https://api.example.com/v1", mono: true }),
        h(Field, { label: "API 类型", value: api, onChange: setApi, placeholder: "openai-completions", mono: true }),
        h(Field, { label: "密钥环境变量", hint: "如 MY_API_KEY", value: apiKeyRef, onChange: setApiKeyRef, placeholder: "MY_API_KEY", mono: true })),
      h("div", { className: "hui-form-models" },
        h("div", { className: "hui-sec" }, "模型列表"),
        models.map((m, i) => h("div", { className: "hui-form-row", key: i },
          h("input", { className: "hui-input hui-mono", value: m.id, placeholder: "model-id", onChange: (e) => upd(i, "id", e.target.value) }),
          h("input", { className: "hui-input", value: m.name, placeholder: "显示名（可选）", onChange: (e) => upd(i, "name", e.target.value) }),
          h("button", { className: "hui-btn ghost sm", onClick: () => delRow(i), title: "删除该模型" }, h(IconTrash)))),
        h("button", { className: "hui-btn ghost sm", onClick: addRow }, h(IconPlus), "添加模型"),
        discoBlock),
      apiKeyRef && !props.isNew ? h("div", { className: "hui-form-key" },
        h("div", { className: "hui-sec" }, "更新密钥（写入凭据存储）"),
        h("div", { className: "hui-form-row" },
          h("input", { className: "hui-input hui-mono", type: "password", value: newKey, placeholder: "粘贴新的 API Key…", onChange: (e) => setNewKey(e.target.value) }),
          h("button", { className: "hui-btn ghost sm", disabled: !newKey.trim(), onClick: () => { props.onSave(Object.assign(draft(), { __setKey: newKey })); setNewKey("") } }, "写入"))) : null,
      h("div", { className: "hui-form-actions" },
        h("button", { className: "hui-btn primary", disabled: !key.trim() || props.busy, onClick: () => props.onSave(draft()) }, props.busy ? "保存中…" : "保存"),
        h("button", { className: "hui-btn ghost", onClick: props.onCancel }, "取消"),
        h("div", { className: "hui-spacer" }),
        props.onDelete ? h("button", { className: "hui-btn ghost danger", disabled: props.busy, onClick: props.onDelete }, h(IconTrash), "删除供应商") : null))
  }

  const VIEW_COMPONENTS = { overview: Overview, sessions: Sessions, plugins: Plugins, market: Market, mcp: Mcp, skills: Skills, usage: Usage, models: Models }
  const VIEWS = [
    ["overview", "总览"], ["sessions", "会话管理"], ["plugins", "插件管理"],
    ["market", "插件市场"], ["models", "模型与供应商"], ["mcp", "MCP 管理"], ["skills", "技能浏览"], ["usage", "用量与模型"]
  ]

  /* ---------------- console shell ---------------- */
  function Console(props) {
    const face = props.face
    const [view, setView] = React.useState("overview")
    const [theme, setTheme] = React.useState(() => { try { return localStorage.getItem(THEME_KEY) || "light" } catch (e) { return "light" } })
    const [density, setDensity] = React.useState(() => { try { return localStorage.getItem(DENSITY_KEY) || "cozy" } catch (e) { return "cozy" } })
    React.useEffect(() => { try { localStorage.setItem(THEME_KEY, theme) } catch (e) {} }, [theme])
    React.useEffect(() => { try { localStorage.setItem(DENSITY_KEY, density) } catch (e) {} }, [density])
    const Active = VIEW_COMPONENTS[view] || Overview
    return h("div", { className: ROOT_CLASS, "data-hui-theme": theme, "data-hui-density": density },
      h("div", { className: "hui-head" },
        h("div", { className: "hui-title" }, h("span", { className: "hui-mark" }, "DS"), "Harness 控制台"),
        h("div", { className: "hui-tabs" }, VIEWS.map(([k, label]) =>
          h("button", { key: k, className: "hui-tab" + (view === k ? " on" : ""), onClick: () => setView(k) }, label))),
        h("div", { className: "hui-spacer" }),
        h("div", { className: "hui-seg" },
          h("button", { className: density === "cozy" ? "on" : "", onClick: () => setDensity("cozy") }, "宽松"),
          h("button", { className: density === "compact" ? "on" : "", onClick: () => setDensity("compact") }, "紧凑")),
        h("button", { className: "hui-ibtn", title: "切换主题", onClick: () => setTheme(theme === "dark" ? "light" : "dark") },
          theme === "dark" ? h(IconMoon) : h(IconSun))),
      h("div", { className: "hui-scroll" }, h(Active, { face: face })))
  }

  function PanelIcon(props) {
    return I({ width: (props && props.size) || 16, height: (props && props.size) || 16 },
      h("path", { d: "M12 3v6M12 15v6M3 12h6M15 12h6" }), h("circle", { cx: 12, cy: 12, r: 2.5 }))
  }

  /* ---------------- data face ---------------- */
  /**
   * Build the read face. Service-backed properties are *getters*: `apply()`
   * runs before sibling plugins have provided `sessions` / `remote`, so an
   * eager read would permanently capture undefined. Each access re-resolves,
   * and views read during render — after providers have mounted.
   */
  function makeFace(get) {
    const read = (name) => { try { return get(name) || null } catch (e) { return null } }
    const remote = () => read("remote") || {}

    const face = {
      activeModel: null,
      get sessions() { return read("sessions") },
      get pluginInventory() { return remote().pluginInventory || null },
      get pluginManager() { return remote().pluginManager || null },
      get skills() { return remote().skills || null },
      get activeSession() {
        const sessions = read("sessions")
        if (!sessions || !sessions.list) return null
        return {
          getSnapshot() {
            const s = sessions.list.getSnapshot()
            const ids = s.ids || []
            const byId = s.byId || {}
            const running = ids.find((id) => byId[id] && byId[id].running)
            return running || ids[0] || null
          },
          subscribe: (fn) => sessions.list.subscribe(fn)
        }
      },
      /* plugins */
      loadPlugins: async () => {
        const pluginInventory = face.pluginInventory
        const pluginManager = face.pluginManager
        if (!pluginInventory || !pluginInventory.list) throw new Error("__unavailable__")
        const inv = await pluginInventory.list()
        if (inv && inv.ok === false) throw new Error(inv.error && inv.error.message ? inv.error.message : "pluginInventory.list failed")
        const value = (inv && inv.value) || {}
        if (value.managementAvailable !== true) return { bundles: [], plugins: [], unavailable: true }
        const [b, p] = await Promise.all([pluginManager.listBundles(), pluginManager.listPlugins()])
        if (b && b.ok === false) throw new Error(b.error && b.error.message ? b.error.message : "listBundles failed")
        if (p && p.ok === false) throw new Error(p.error && p.error.message ? p.error.message : "listPlugins failed")
        return { bundles: (b && b.value) || [], plugins: (p && p.value) || [], unavailable: false }
      },
      /* skills */
      loadSkills: async (sessionId) => {
        const skills = face.skills
        if (!skills || !skills.list) throw new Error("__unavailable__")
        const r = await skills.list({ sessionId })
        if (r && r.ok === false) throw new Error(r.error && r.error.message ? r.error.message : "skills/list failed")
        return ((r && r.value) || {}).skills || []
      },
      /* market */
      loadMarket: async () => {
        const res = await fetch(MARKET_API, { headers: { Accept: "application/vnd.github+json" } })
        if (!res.ok) throw new Error("GitHub API " + res.status + " " + res.statusText)
        return res.json()
      },
      /* models: read the llm provider directory + the llm-pi-ai settings section */
      loadModelConfig: async () => {
        const settings = read("remote.settings")
        const llm = read("remote.llm")
        const credentials = read("remote.credentials")
        if (!settings || !settings.describe || !llm) throw new Error("__unavailable__")
        const described = await settings.describe()
        if (described && described.ok === false) throw new Error(described.error && described.error.message || "settings.describe failed")
        const value = (described && described.value) || {}
        const namespaces = value.namespaces || []
        const nsView = namespaces.find((n) => n.ns === LLM_NS) || {}
        const section = nsView.value || {}
        const providersObj = (section && section.providers) || {}
        // Configurable providers the adapters declare (the authoritative directory).
        let configurable = []
        try {
          const cp = await llm.listConfigurableProviders()
          const list = cp && cp.ok === false ? [] : (cp && cp.value) || cp || []
          configurable = Array.isArray(list) ? list : []
        } catch (e) { configurable = [] }
        const declaredByProvider = new Map(configurable.map((c) => [c.provider, c]))
        // Union: providers declared by adapters plus providers only the user section has.
        const keys = new Set(configurable.map((c) => c.provider))
        for (const k of Object.keys(providersObj)) keys.add(k)
        const refs = []
        const raw = [...keys].map((key) => {
          const p = providersObj[key] || {}
          const dec = declaredByProvider.get(key)
          const path = dec && dec.settingsPath ? dec.settingsPath : ["providers", key]
          const apiKeyRef = p.apiKeyEnv || p.apiKey || ""
          if (apiKeyRef) refs.push(apiKeyRef)
          // `configured` = the user section actually carries this provider profile.
          const configured = section && section.providers && Object.prototype.hasOwnProperty.call(section.providers, key)
          return {
            key,
            displayName: p.displayName || (dec && dec.displayName) || key,
            baseURL: p.baseURL || "",
            api: p.api || "",
            apiKeyRef,
            configured: !!configured,
            declared: !!dec && dec.declared === true,
            models: Array.isArray(p.models) ? p.models.map((m) => (typeof m === "string" ? { id: m, name: m } : { id: m.id, name: m.name || m.id })) : []
          }
        })
        // Credential state is an enrichment: a failure degrades the badge, not the page.
        let credMap = {}
        if (credentials && credentials.describe && refs.length) {
          try {
            const cr = await credentials.describe([...new Set(refs)])
            if (cr && cr.ok !== false) credMap = cr.value || {}
          } catch (e) {}
        }
        const providers = raw.map((p) => Object.assign({}, p, {
          keyConfigured: p.apiKeyRef && credMap[p.apiKeyRef] ? !!credMap[p.apiKeyRef].configured : undefined
        }))
        return { providers, nsView, current: {} }
      },
      /* write one provider profile into the llm-pi-ai namespace (no yaml editing).
         Merges over the existing profile so fields the form does not expose
         (compat, extra headers, …) survive an edit instead of being dropped. */
      writeProvider: async (key, draft) => {
        const settings = read("remote.settings")
        if (!settings || !settings.mutate) return { ok: false, message: "settings 服务不可用" }
        const described = await settings.describe()
        const value = (described && described.value) || {}
        const nsView = (value.namespaces || []).find((n) => n.ns === LLM_NS) || {}
        const existing = ((nsView.value || {}).providers || {})[key] || {}
        const profile = Object.assign({}, existing, {
          displayName: draft.displayName || key,
          models: (draft.models || []).map((m) => (m.name && m.name !== m.id ? { id: m.id, name: m.name } : { id: m.id }))
        })
        // Only write the endpoint fields when the user supplied one; an empty
        // box means "leave whatever was there", not "erase it".
        if (draft.api) profile.api = draft.api
        if (draft.baseURL) profile.baseURL = draft.baseURL
        if (draft.apiKeyRef) profile.apiKeyEnv = draft.apiKeyRef
        const ops = [{ op: "set", path: ["providers", key], value: profile }]
        const r = await settings.mutate(LLM_NS, ops, nsView.revision)
        if (r && r.ok === false) return { ok: false, message: (r.error && r.error.message) || "写入被拒绝" }
        return { ok: true }
      },
      removeProvider: async (key) => {
        const settings = read("remote.settings")
        if (!settings || !settings.mutate) return { ok: false, message: "settings 服务不可用" }
        const described = await settings.describe()
        const value = (described && described.value) || {}
        const nsView = (value.namespaces || []).find((n) => n.ns === LLM_NS) || {}
        const r = await settings.mutate(LLM_NS, [{ op: "unset", path: ["providers", key] }], nsView.revision)
        if (r && r.ok === false) return { ok: false, message: (r.error && r.error.message) || "删除被拒绝" }
        return { ok: true }
      },
      writeCredential: async (ref, value) => {
        const creds = read("remote.credentials")
        if (!creds || !creds.set) return { ok: false, message: "credentials 服务不可用" }
        const r = await creds.set(ref, value)
        if (r && r.ok === false) return { ok: false, message: (r.error && r.error.message) || "写入被拒绝" }
        return { ok: true }
      },
      /* interrogate an endpoint for its model list (no credential is stored) */
      discoverModels: async (draft) => {
        const llm = read("remote.llm")
        if (!llm || !llm.discoverModels) return { ok: false, message: "llm 服务不可用" }
        const request = { baseURL: draft.baseURL, api: draft.api }
        // A route the adapter already knows answers from its own registry.
        if (draft.key) request.provider = draft.key
        // A key typed into the form is used for this call only; the host never stores it.
        if (draft.apiKey) request.apiKey = draft.apiKey
        const r = await llm.discoverModels(LLM_NS, request)
        if (r && r.ok === false) return { ok: false, message: (r.error && r.error.message) || "端点拒绝了查询" }
        const items = ((r && r.value) || []).map((m) => ({ id: m.id, name: m.name || m.id, contextWindow: m.contextWindow, maxTokens: m.maxTokens }))
        return { ok: true, items }
      },
      selectModel: async (sessionId, selection) => {
        const session = read("remote.session")
        if (!session || !session.selectModel) return { ok: false, error: { message: "session 服务不可用" } }
        const r = await session.selectModel({ sessionId, provider: selection.provider, model: selection.model })
        if (r && r.ok === false) return { ok: false, error: r.error }
        return { ok: true, value: r && r.value }
      },
      /* usage: the loopback document @linxin666/dsh-usage registers on the host.
         Same-origin fetch, so the page's own session cookie/token applies. */
      loadUsage: async () => {
        const res = await fetch("/api/dsh-usage/overview", { headers: { Accept: "application/json" } })
        if (res.status === 404) throw new Error("__unavailable__")
        if (!res.ok) throw new Error("usage endpoint " + res.status + " " + res.statusText)
        return res.json()
      },
      categorize: (repo) => {
        const hay = ((repo.name || "") + " " + (repo.description || "") + " " + ((repo.topics || []).join(" "))).toLowerCase()
        if (/tavern|roleplay|character|ui|theme|skin|panel|graph|visual/.test(hay)) return "UI 增强"
        if (/search|fetch|browser|scrape|tool/.test(hay)) return "工具"
        if (/mcp|api|market|integrat|bridge|plugin/.test(hay)) return "集成"
        if (/auto|continue|workflow|task|loop|memory|schedule/.test(hay)) return "效率"
        return "其它"
      }
    }
    return face
  }

  function ensureStyle() {
    if (document.getElementById(STYLE_ID)) return
    const style = document.createElement("style")
    style.id = STYLE_ID
    style.textContent = CSS
    document.head.appendChild(style)
  }

  module.exports.inject = ["slots"]
  module.exports.apply = function apply(ctx) {
    ensureStyle()
    ctx.effect(() => () => { document.getElementById(STYLE_ID)?.remove() })

    /**
     * Service names this plugin may read. `remote.<ns>` namespaces and
     * `sessions` are separate cordis services, so reading them requires an
     * explicit `inject` declaration — `ctx.get` throws for undeclared names.
     * They are declared on the registration fiber via `ctx.inject`, which runs
     * the body once every listed service is provided; a deployment that omits
     * one simply never mounts the console instead of crashing.
     */
    const DEPS = [
      "sessions", "remote",
      "remote.pluginInventory", "remote.pluginManager", "remote.skills",
      "remote.settings", "remote.llm", "remote.session", "remote.credentials"
    ]

    ctx.inject(DEPS, (scope) => {
      // `scope` is a context whose proxy permits reading the declared services.
      const get = (name) => {
        try {
          // `remote.<ns>` reads as `scope.remote.<ns>`; `reflect.get` also works.
          if (name.startsWith("remote.")) {
            const ns = name.slice("remote.".length)
            return scope.remote ? scope.remote[ns] : undefined
          }
          return scope[name]
        } catch (e) { return undefined }
      }
      const face = makeFace(get)

      ctx.slots.inject("main", () => ctx.slots.register({
        name: "main",
        key: PANEL_ID,
        label: LABEL,
        inject: () => ({ face })
      }, Console))

      ctx.slots.inject("sidebar.panellist", () => ctx.slots.register({
        name: "sidebar.panellist",
        id: PANEL_ID,
        order: 40,
        label: LABEL,
        inject: () => ({})
      }, PanelIcon))
    })
  }
  return module.exports;
} });

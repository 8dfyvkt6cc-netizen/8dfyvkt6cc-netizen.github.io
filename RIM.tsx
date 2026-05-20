import { useState, useEffect, useCallback } from "react";

const S = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Mono:wght@400;500;700&family=Unbounded:wght@300;400;700;900&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink: #0d0d0d;
    --paper: #f0ece3;
    --red: #d63c2f;
    --line: #0d0d0d;
    --muted: #7a7469;
  }

  body {
    background: var(--paper);
    color: var(--ink);
    font-family: 'IBM Plex Mono', monospace;
    min-height: 100vh;
  }

  .wrap {
    max-width: 860px;
    margin: 0 auto;
    padding: 0 24px 80px;
    border-left: 1px solid var(--line);
    border-right: 1px solid var(--line);
    min-height: 100vh;
  }

  .masthead {
    border-bottom: 4px solid var(--ink);
    padding: 32px 0 20px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
  }

  .masthead-name {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(72px, 14vw, 140px);
    line-height: 0.85;
    letter-spacing: -2px;
    color: var(--ink);
  }

  .masthead-name span {
    color: var(--red);
  }

  .masthead-meta {
    text-align: right;
    font-size: 10px;
    line-height: 1.7;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .rule { height: 1px; background: var(--ink); margin: 0; }
  .rule-thick { height: 3px; background: var(--ink); }
  .rule-double {
    height: 5px;
    background: linear-gradient(to bottom, var(--ink) 0, var(--ink) 2px, transparent 2px, transparent 3px, var(--ink) 3px, var(--ink) 5px);
    margin-bottom: 24px;
  }

  .col-label {
    font-size: 9px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--muted);
    padding: 10px 0 8px;
    border-bottom: 1px solid var(--ink);
    margin-bottom: 16px;
  }

  .section { margin: 28px 0; }

  .link-block {
    display: flex;
    align-items: stretch;
    text-decoration: none;
    color: var(--ink);
    border: 1px solid var(--ink);
    margin-bottom: 8px;
    transition: background 0.12s;
    position: relative;
    overflow: hidden;
  }

  .link-block:hover { background: var(--ink); color: var(--paper); }
  .link-block:hover .lb-tag { background: var(--red); color: var(--paper); border-color: var(--red); }

  .lb-tag {
    background: var(--ink);
    color: var(--paper);
    font-family: 'Bebas Neue', sans-serif;
    font-size: 13px;
    letter-spacing: 2px;
    writing-mode: vertical-rl;
    padding: 12px 8px;
    min-width: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 1px solid var(--ink);
    flex-shrink: 0;
  }

  .lb-body {
    padding: 14px 18px;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .lb-title {
    font-family: 'Unbounded', sans-serif;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: -0.3px;
  }

  .lb-handle {
    font-size: 11px;
    color: var(--muted);
  }

  .link-block:hover .lb-handle { color: #bbb; }

  .lb-arrow {
    padding: 0 16px;
    display: flex;
    align-items: center;
    font-size: 22px;
    flex-shrink: 0;
    font-family: 'Bebas Neue', sans-serif;
  }

  .games-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }

  @media (min-width: 560px) {
    .games-grid { grid-template-columns: repeat(4, 1fr); }
  }

  .game-tile {
    border: 1px solid var(--ink);
    padding: 20px 12px 16px;
    cursor: pointer;
    transition: background 0.12s;
    display: flex;
    flex-direction: column;
    gap: 8px;
    background: var(--paper);
  }

  .game-tile:hover { background: var(--ink); color: var(--paper); }

  .gt-num {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 36px;
    line-height: 1;
    color: var(--red);
  }

  .game-tile:hover .gt-num { color: #f97066; }

  .gt-name {
    font-family: 'Unbounded', sans-serif;
    font-size: 11px;
    font-weight: 700;
    line-height: 1.3;
  }

  .gt-sub { font-size: 9px; color: var(--muted); letter-spacing: 1px; text-transform: uppercase; }
  .game-tile:hover .gt-sub { color: #bbb; }

  .modal-back {
    position: fixed; inset: 0;
    background: rgba(13,13,13,0.85);
    z-index: 200;
    display: flex; align-items: center; justify-content: center;
    padding: 20px;
  }

  .modal-box {
    background: var(--paper);
    border: 2px solid var(--ink);
    width: 100%;
    max-width: 460px;
    max-height: 88vh;
    overflow-y: auto;
  }

  .modal-hd {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 18px;
    border-bottom: 2px solid var(--ink);
    background: var(--ink);
    color: var(--paper);
  }

  .modal-hd-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 22px;
    letter-spacing: 1px;
  }

  .modal-x {
    background: none; border: 1px solid #555; color: var(--paper);
    width: 28px; height: 28px; cursor: pointer; font-size: 14px;
    display: flex; align-items: center; justify-content: center;
    transition: border-color 0.1s;
  }

  .modal-x:hover { border-color: var(--red); color: var(--red); }

  .modal-body { padding: 20px 18px; }

  .ttt-board {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 4px;
    margin-bottom: 16px;
    background: var(--ink);
    border: 2px solid var(--ink);
    padding: 4px;
  }

  .ttt-cell {
    aspect-ratio: 1;
    background: var(--paper);
    border: none;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 38px;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.1s;
    color: var(--ink);
  }

  .ttt-cell:hover:not(.taken) { background: #e5e0d6; }
  .ttt-cell.x { color: var(--red); }
  .ttt-cell.o { color: var(--ink); }
  .ttt-cell.win { background: var(--ink); color: var(--paper) !important; }
  .ttt-cell.taken { cursor: default; }

  .gs {
    font-size: 11px;
    text-align: center;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 14px;
  }

  .gs b { color: var(--red); }

  .btn {
    width: 100%;
    padding: 11px;
    border: 2px solid var(--ink);
    background: var(--paper);
    color: var(--ink);
    font-family: 'IBM Plex Mono', monospace;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: all 0.12s;
  }

  .btn:hover { background: var(--ink); color: var(--paper); }
  .btn-red { background: var(--red); border-color: var(--red); color: var(--paper); }
  .btn-red:hover { background: #b83025; border-color: #b83025; }

  .pass-out {
    border: 2px solid var(--ink);
    padding: 12px 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 14px;
    background: white;
  }

  .pass-val {
    font-size: 13px;
    word-break: break-all;
    flex: 1;
    color: var(--red);
    font-weight: 700;
  }

  .cp-btn {
    padding: 5px 10px;
    border: 1px solid var(--ink);
    background: none;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px;
    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 1px;
    white-space: nowrap;
    transition: all 0.1s;
  }

  .cp-btn:hover, .cp-btn.ok { background: var(--ink); color: var(--paper); }

  .pass-opts { margin-bottom: 14px; }

  .popt {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 7px 0;
    border-bottom: 1px solid #d5d0c7;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: var(--muted);
  }

  .tog {
    width: 36px; height: 18px;
    background: #ccc;
    border: none;
    cursor: pointer;
    position: relative;
    flex-shrink: 0;
    transition: background 0.15s;
  }

  .tog.on { background: var(--ink); }
  .tog::after {
    content: '';
    position: absolute;
    width: 12px; height: 12px;
    background: white;
    top: 3px; left: 3px;
    transition: transform 0.15s;
  }

  .tog.on::after { transform: translateX(18px); }

  .len-row {
    display: flex; align-items: center; gap: 10px;
    margin-bottom: 14px;
    font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: var(--muted);
  }

  .len-row input[type=range] { flex: 1; accent-color: var(--ink); }
  .len-val { font-weight: 700; color: var(--ink); min-width: 20px; }

  .dice-ctrl {
    display: flex; align-items: center; gap: 12px;
    margin-bottom: 14px;
    font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: var(--muted);
  }

  .d-btn {
    width: 28px; height: 28px;
    border: 2px solid var(--ink);
    background: none;
    font-weight: 900;
    font-size: 16px;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.1s;
  }

  .d-btn:hover { background: var(--ink); color: var(--paper); }
  .d-cnt { font-family: 'Bebas Neue', sans-serif; font-size: 24px; color: var(--ink); min-width: 20px; text-align: center; }

  .dice-area {
    display: flex; flex-wrap: wrap; gap: 8px;
    margin-bottom: 12px;
  }

  .die {
    width: 58px; height: 58px;
    border: 2px solid var(--ink);
    background: white;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 28px;
    display: flex; align-items: center; justify-content: center;
    color: var(--red);
    transition: transform 0.3s;
  }

  .die.roll { animation: droll 0.35s ease; }

  .dice-sum {
    font-size: 11px; text-transform: uppercase; letter-spacing: 1px;
    color: var(--muted); margin-bottom: 14px;
  }

  .dice-sum b { color: var(--ink); font-size: 16px; }

  .coin-area {
    display: flex; flex-direction: column; align-items: center; gap: 18px;
    padding: 8px 0 20px;
  }

  .coin {
    width: 90px; height: 90px;
    border: 3px solid var(--ink);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 15px;
    letter-spacing: 2px;
    background: white;
    transition: all 0.3s;
    position: relative;
  }

  .coin.H { background: var(--ink); color: var(--paper); }
  .coin.T { background: var(--red); color: var(--paper); border-color: var(--red); }
  .coin.fl { animation: cfl 0.45s ease; }

  .coin-res {
    font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: var(--muted);
  }

  .coin-res b { color: var(--ink); }

  .coin-st {
    display: flex; gap: 20px;
    font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: var(--muted);
  }

  .coin-st span { color: var(--ink); font-weight: 700; }

  @keyframes droll {
    0%, 100% { transform: rotate(0); }
    40% { transform: rotate(-20deg) scale(1.15); }
    70% { transform: rotate(15deg) scale(1.15); }
  }

  @keyframes cfl {
    0% { transform: scaleX(1); }
    50% { transform: scaleX(0.05); }
    100% { transform: scaleX(1); }
  }
`;

type Game = "ttt" | "pass" | "dice" | "coin" | null;
const WINS = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

function checkWin(b: (string|null)[]): { w: string|null; ln: number[]|null } {
  for (const ln of WINS) {
    const [a,c,d] = ln;
    if (b[a] && b[a]===b[c] && b[a]===b[d]) return { w: b[a], ln };
  }
  return { w: null, ln: null };
}

function TTT() {
  const [b, setB] = useState<(string|null)[]>(Array(9).fill(null));
  const [x, setX] = useState(true);
  const { w, ln } = checkWin(b);
  const draw = !w && b.every(Boolean);

  const click = (i: number) => {
    if (b[i] || w) return;
    const nb = [...b]; nb[i] = x ? "X" : "O";
    setB(nb); setX(!x);
  };
  const reset = () => { setB(Array(9).fill(null)); setX(true); };

  return (
    <div>
      <div className="gs">
        {w ? <b>{w} ПОБЕДИЛ</b> : draw ? <b>НИЧЬЯ</b> : <>Ход: <b>{x?"X":"O"}</b></>}
      </div>
      <div className="ttt-board">
        {b.map((v, i) => (
          <button key={i}
            className={`ttt-cell${v?" taken":""}${v==="X"?" x":v==="O"?" o":""}${ln?.includes(i)?" win":""}`}
            onClick={() => click(i)}>
            {v}
          </button>
        ))}
      </div>
      <button className="btn" onClick={reset}>Новая игра</button>
    </div>
  );
}

function PassGen() {
  const [len, setLen] = useState(16);
  const [up, setUp] = useState(true);
  const [lo, setLo] = useState(true);
  const [nm, setNm] = useState(true);
  const [sy, setSy] = useState(false);
  const [p, setP] = useState("");
  const [ok, setOk] = useState(false);

  const gen = useCallback(() => {
    let c = "";
    if (up) c += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lo) c += "abcdefghijklmnopqrstuvwxyz";
    if (nm) c += "0123456789";
    if (sy) c += "!@#$%^&*_+-=?";
    if (!c) { setP("—"); return; }
    let r = "";
    for (let i = 0; i < len; i++) r += c[Math.floor(Math.random()*c.length)];
    setP(r); setOk(false);
  }, [len, up, lo, nm, sy]);

  useEffect(() => { gen(); }, [gen]);

  const copy = () => { navigator.clipboard.writeText(p); setOk(true); setTimeout(()=>setOk(false),1400); };

  const T = ({ v, s }: { v: boolean; s: (x: boolean)=>void }) =>
    <button className={`tog${v?" on":""}`} onClick={()=>s(!v)} />;

  return (
    <div>
      <div className="pass-out">
        <span className="pass-val">{p}</span>
        <button className={`cp-btn${ok?" ok":""}`} onClick={copy}>{ok?"✓ OK":"Copy"}</button>
      </div>
      <div className="len-row">
        <span>Длина</span>
        <input type="range" min={6} max={64} value={len} onChange={e=>setLen(+e.target.value)} />
        <span className="len-val">{len}</span>
      </div>
      <div className="pass-opts">
        {([["A–Z", up, setUp],["a–z", lo, setLo],["0–9", nm, setNm],["!@#", sy, setSy]] as const).map(([l,v,s])=>(
          <div className="popt" key={l as string}>
            <span>{l as string}</span>
            <T v={v as boolean} s={s as (x:boolean)=>void} />
          </div>
        ))}
      </div>
      <button className="btn btn-red" onClick={gen}>Сгенерировать</button>
    </div>
  );
}

function Dice() {
  const [cnt, setCnt] = useState(2);
  const [vals, setVals] = useState<number[]>([1,1]);
  const [rl, setRl] = useState(false);

  const roll = () => {
    if (rl) return;
    setRl(true);
    setTimeout(()=>{ setVals(Array.from({length:cnt},()=>Math.floor(Math.random()*6)+1)); setRl(false); }, 350);
  };

  const setC = (n: number) => {
    const c = Math.max(1,Math.min(6,n));
    setCnt(c); setVals(Array.from({length:c},()=>Math.floor(Math.random()*6)+1));
  };

  const sum = vals.reduce((a,b)=>a+b,0);
  const faces = ["⚀","⚁","⚂","⚃","⚄","⚅"];

  return (
    <div>
      <div className="dice-ctrl">
        <span>Кубики:</span>
        <button className="d-btn" onClick={()=>setC(cnt-1)}>−</button>
        <span className="d-cnt">{cnt}</span>
        <button className="d-btn" onClick={()=>setC(cnt+1)}>+</button>
      </div>
      <div className="dice-area">
        {vals.map((v,i)=><div key={i} className={`die${rl?" roll":""}`}>{faces[v-1]}</div>)}
      </div>
      <div className="dice-sum">Сумма: <b>{sum}</b></div>
      <button className="btn btn-red" onClick={roll}>Бросить</button>
    </div>
  );
}

function Coin() {
  const [s, setS] = useState<"H"|"T">("H");
  const [fl, setFl] = useState(false);
  const [st, setSt] = useState({h:0,t:0});

  const flip = () => {
    if (fl) return;
    setFl(true);
    setTimeout(()=>{
      const r = Math.random()<0.5?"H":"T";
      setS(r as "H"|"T");
      setSt(p=>({h:p.h+(r==="H"?1:0),t:p.t+(r==="T"?1:0)}));
      setFl(false);
    }, 450);
  };

  return (
    <div className="coin-area">
      <div className={`coin ${s}${fl?" fl":""}`}>{s==="H"?"ОРЁЛ":"РЕШКА"}</div>
      <div className="coin-res">Результат: <b>{s==="H"?"Орёл":"Решка"}</b></div>
      <div className="coin-st">
        <div>Орёл: <span>{st.h}</span></div>
        <div>Решка: <span>{st.t}</span></div>
        <div>Всего: <span>{st.h+st.t}</span></div>
      </div>
      <button className="btn btn-red" style={{width:"100%"}} onClick={flip}>Подбросить</button>
    </div>
  );
}

const TILES = [
  {id:"ttt", n:"01", name:"Крестики\nнолики", sub:"2 игрока"},
  {id:"pass", n:"02", name:"Пароли", sub:"Генератор"},
  {id:"dice", n:"03", name:"Кубики", sub:"До 6 штук"},
  {id:"coin", n:"04", name:"Монетка", sub:"Орёл / решка"},
] as const;

const TITLES: Record<string,string> = {ttt:"Крестики-нолики",pass:"Генератор паролей",dice:"Кубики",coin:"Монетка"};

export default function RIM() {
  const [active, setActive] = useState<Game>(null);

  useEffect(()=>{
    const h = (e: KeyboardEvent)=>{ if(e.key==="Escape") setActive(null); };
    window.addEventListener("keydown",h);
    return ()=>window.removeEventListener("keydown",h);
  },[]);

  return (
    <>
      <style>{S}</style>
      <div className="wrap">

        <div className="masthead">
          <div className="masthead-name">R<span>I</span>M</div>
          <div className="masthead-meta">
            <div>Разработчик</div>
            <div>——————</div>
            <div>@trugarant1</div>
          </div>
        </div>

        <div className="rule-double" style={{marginTop:"20px"}} />

        <div className="section">
          <div className="col-label">Контакты</div>
          <a className="link-block" href="https://t.me/trugarant1" target="_blank" rel="noreferrer">
            <div className="lb-tag">TG</div>
            <div className="lb-body">
              <div className="lb-title">Мой Telegram</div>
              <div className="lb-handle">@trugarant1</div>
            </div>
            <div className="lb-arrow">→</div>
          </a>
        </div>

        <div className="rule" />

        <div className="section">
          <div className="col-label">Проекты</div>
          <a className="link-block" href="https://t.me/coodingnumber1" target="_blank" rel="noreferrer">
            <div className="lb-tag">CH</div>
            <div className="lb-body">
              <div className="lb-title">Coding №1</div>
              <div className="lb-handle">t.me/coodingnumber1</div>
            </div>
            <div className="lb-arrow">→</div>
          </a>
        </div>

        <div className="rule" />

        <div className="section">
          <div className="col-label">Мини игры</div>
          <div className="games-grid">
            {TILES.map(g=>(
              <div key={g.id} className="game-tile" onClick={()=>setActive(g.id)}>
                <div className="gt-num">{g.n}</div>
                <div className="gt-name">{g.name}</div>
                <div className="gt-sub">{g.sub}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {active && (
        <div className="modal-back" onClick={e=>{ if(e.target===e.currentTarget) setActive(null); }}>
          <div className="modal-box">
            <div className="modal-hd">
              <span className="modal-hd-title">{TITLES[active]}</span>
              <button className="modal-x" onClick={()=>setActive(null)}>✕</button>
            </div>
            <div className="modal-body">
              {active==="ttt" && <TTT />}
              {active==="pass" && <PassGen />}
              {active==="dice" && <Dice />}
              {active==="coin" && <Coin />}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

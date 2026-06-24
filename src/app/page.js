"use client";
import { useState, useRef, useEffect } from "react";

// ─── Question Banks ────────────────────────────────────────────────────────
const KB_QUESTIONS = {
  "가족 생활, 집, 동네": [
    "당신은 어느 나라 사람이에요?","누구하고 살아요?","가족이 몇 명이에요? 누구예요?",
    "주말에 가족하고 보통 뭐 해요?","당신의 방에는 뭐가 있어요?","집에서 누가 청소를 해요?",
    "저녁밥은 누구하고 먹어요?","당신은 애완동물이 있어요?","생일에 보통 뭐 해요?",
    "이번 생일에 뭐 하고 싶어요?","지난 생일에 무슨 선물을 받았어요?",
    "엄마 어떤 사람이에요?","집에서 어떤 곳이 제일 좋아요?",
  ],
  "친구, 여가, 취미": [
    "취미가 뭐예요? 왜요?","그 취미를 언제 시작했어요?","어떤 영화를 좋아해요? 왜요?",
    "운동을 좋아해요? 왜요?","제일 친한 친구는 누구예요?","(그 친구는) 어떤 사람이에요?",
    "자유 시간에 친구들을 만나면 보통 뭐 해요?","무슨 음악을 좋아해요?",
    "자기 전에 보통 뭐 해요?","매일 아침밥을 먹어요?","무슨 요일을 제일 좋아해요? 왜요?",
  ],
  "사람, 장소, 공동체": [
    "무슨 계절을 가장 좋아해요? 왜요?","어떤 날씨가 좋아요? 왜요?",
    "당신의 동네 이름은 뭐예요?","동네에서 뭐를 할 수 있어요?",
    "무슨 음식을 좋아해요? 왜요?","쇼핑을 좋아해요? 어디에서 쇼핑을 해요?",
    "한국 식당에 자주 가요?","주말에 날씨가 좋으면 뭐 하고 싶어요?",
    "당신의 집 근처에 뭐가 있어요?","나중에 어디에서 살고 싶어요? 왜요?",
  ],
  "교육, 일": [
    "무슨 과목을 제일 좋아해요? 왜요?","제일 어려운 과목은 뭐예요?",
    "왜 한국어를 공부해요?","학교 수업이 끝나면 뭐 해요?",
    "보통 매일 몇 시간 공부해요?","엄격한 선생님이 좋아요? 왜요?",
    "당신은 아르바이트를 해요?","어떤 아르바이트를 하고 싶어요? 왜요?",
    "집에서 학교까지 얼마나 걸려요?","외국어를 배우는 것이 왜 필요하다고 생각해요?",
  ],
  "여행, 관광": [
    "이번 주말에 뭐 할 계획이에요?","지난 방학에 뭐 했어요?",
    "여행을 좋아해요? 왜요?","어디로 여행을 가고 싶어요?",
    "한국에 가면 뭐 하고 싶어요?","한국에 가면 어디에 가고 싶어요? 왜요?",
    "한국 음식을 먹을 수 있어요?","방학 때 뭐가 제일 좋았어요?",
  ],
  "미래 계획, 꿈": [
    "무슨 직업을 갖고 싶어요? 왜요?","장래 희망이 뭐예요?",
    "당신의 성격을 말해 보세요.","고등학교를 졸업하면 뭐 할 계획이에요?",
    "대학에 가면 뭐 하고 싶어요?","당신의 꿈은 뭐예요?",
    "10년 후에 어떤 생활을 하고 싶어요?","몇 살에 결혼하고 싶어요?",
  ],
};

const KC_QUESTIONS = {
  "자신과 가족": [
    "가족이 몇 명이에요?","당신은 아버지와 비슷해요? 아니면 어머니와 비슷해요?",
    "집에서 부모님하고 무슨 이야기를 많이 해요?","집에서 부모님을 어떻게 도와 드려요?",
    "어디에 살아요?","지금 살고 있는 동네에 대해서 얘기해 보세요.",
    "어른이 되면 다른 동네나 다른 나라로 이사 가고 싶어요?",
    "당신에 대해서 말해 보세요.","당신의 성격은 어때요?",
    "당신의 제일 친한 친구에 대해서 말해 보세요.","친구를 만나면 보통 뭐 해요?",
    "어린 시절의 기억에 대해 말해 보세요.","당신은 롤 모델이 있어요?",
  ],
  "교육과 미래 계획": [
    "당신은 어떤 선생님이 좋아요?","당신은 무슨 과목을 좋아해요?",
    "한국어를 배우는 이유가 뭐예요?","한국어를 공부하는 동안에 뭐가 제일 어려웠어요?",
    "HSC시험이 끝나면 뭐 하고 싶어요?","대학교에 가서도 계속 한국어를 공부할 거예요?",
    "나중에 한국어로 뭐 하고 싶어요?","다른 언어를 배우기가 중요한 것 같아요?",
    "당신은 스트레스를 받으면 보통 뭐 해요?",
    "한국의 학교가 호주의 학교하고 어떻게 다른 것 같아요?",
  ],
  "한국 관광지": [
    "한국에 가 본 적이 있어요?","한국의 어떤 점이 매력적이라고 생각해요?",
    "한국에 가면 꼭 해보고 싶은 것이 있어요?",
    "한국 음식 중에서 가장 먹어보고 싶은 것은 뭐예요? 왜요?",
    "한국의 전통문화와 현대문화 중 어느 쪽이 더 흥미로워요? 왜요?",
  ],
  "한국의 일상생활": [
    "한국의 음식 문화에 대해 어떻게 생각해요?",
    "한국의 명절 중에서 가장 흥미로운 것은 뭐예요?",
    "K-pop 문화에 대해 어떻게 생각해요?",
    "한국의 교육 시스템에 대해 어떻게 생각해요?",
  ],
  "변화하는 세계 - 직업": [
    "장래에 어떤 직업을 갖고 싶어요? 왜요?",
    "그 직업을 위해 어떤 준비를 하고 있어요?",
    "성격과 직업 선택은 관련이 있다고 생각해요?",
    "미래의 직업 시장은 어떻게 변할 것 같아요?",
    "인공지능이 직업 세계에 미치는 영향에 대해 어떻게 생각해요?",
  ],
  "변화하는 세계 - 가족": [
    "현대 사회에서 가족의 역할이 어떻게 변하고 있다고 생각해요?",
    "맞벌이 가정이 늘어나고 있는데 어떻게 생각해요?",
    "청소년 문제에 대해 어떻게 생각해요?",
    "다문화 사회의 장단점은 뭐예요?",
  ],
};

const BAND_INFO = {
  KB: [
    { min:17, max:20, band:"Band 5–6", color:"#22c55e" },
    { min:13, max:16.5, band:"Band 5", color:"#84cc16" },
    { min:9,  max:12.5, band:"Band 4", color:"#eab308" },
    { min:5,  max:8.5,  band:"Band 3", color:"#f97316" },
    { min:1,  max:4.5,  band:"Band 2", color:"#ef4444" },
  ],
  KC: [
    { min:17, max:20, band:"Band 5–6", color:"#22c55e" },
    { min:13, max:16.5, band:"Band 5", color:"#84cc16" },
    { min:9,  max:12.5, band:"Band 4", color:"#eab308" },
    { min:5,  max:8.5,  band:"Band 3", color:"#f97316" },
    { min:1,  max:4.5,  band:"Band 2", color:"#ef4444" },
  ],
};

function getBand(score, level) {
  return BAND_INFO[level].find(b => score >= b.min && score <= b.max) || BAND_INFO[level][4];
}
function shuffle(arr) {
  const a=[...arr]; for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a;
}
function buildQList(level, topicFilter) {
  const bank = level==="KB" ? KB_QUESTIONS : KC_QUESTIONS;
  if (topicFilter==="mixed") return shuffle(Object.values(bank).flat());
  return shuffle(bank[topicFilter]||[]);
}
async function callClaude(messages, system) {
  const res = await fetch("/api", {
    method:"POST", headers:{"Content-Type":"application"},
    body: JSON.stringify({ max_tokens:800, system, messages }),
  });
  const d = await res.json();
  return d.content?.[0]?.text || "";
}

// ─── Main App ─────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("setup");
  const [level, setLevel]   = useState("KB");
  const [topicFilter, setTopicFilter] = useState("mixed");

  // exam
  const [questions, setQuestions]     = useState([]);
  const [conversation, setConversation] = useState([]);
  const [phase, setPhase]             = useState("idle");
  const [timer, setTimer]             = useState(0);
  const [showTranscript, setShowTranscript] = useState(true);
  const [liveText, setLiveText]       = useState("");
  const [currentQ, setCurrentQ]       = useState("");
  const [qIndex, setQIndex]           = useState(0);

  // feedback
  const [feedback, setFeedback]         = useState(null);
  const [loadingFeedback, setLoadingFeedback] = useState(false);

  // refs to avoid stale closures
  const synthRef    = useRef(null);
  const timerRef    = useRef(null);

  // Initialize browser APIs safely (only runs client-side)
  useEffect(() => {
    synthRef.current = window.speechSynthesis;
  }, []);
  const convRef     = useRef([]);
  const questionsRef= useRef([]);
  const qIndexRef   = useRef(0);
  const phaseRef    = useRef("idle");
  const liveRef     = useRef("");
  const examActiveRef = useRef(false);
  // TTS ready state - mobile requires user gesture first
  const [ttsReady, setTtsReady] = useState(false);
  const pendingOnEndRef = useRef(null);

  // OEE stage tracker: 0=Opening answered, 1=Extended answered, 2=Enrichment answered→move next
  const oeeStageRef = useRef(0);

  // STT refs
  const recRef      = useRef(null);
  const accRef      = useRef("");
  const listeningRef= useRef(false);

  const MAX_TIME = level==="KB" ? 300 : 600;
  const topics   = level==="KB" ? KB_QUESTIONS : KC_QUESTIONS;

  useEffect(()=>{ convRef.current=conversation; },[conversation]);
  useEffect(()=>{ phaseRef.current=phase; },[phase]);
  useEffect(()=>{ liveRef.current=liveText; },[liveText]);

  function fmtTime(s){ return `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`; }

  // ── TTS ──
  function speak(text, onEnd) {
    synthRef.current.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang="ko-KR"; u.rate=0.88; u.pitch=1;
    const voices = synthRef.current.getVoices();
    const kv = voices.find(v=>v.lang.startsWith("ko"));
    if(kv) u.voice=kv;
    u.onend = ()=>{ if(onEnd) onEnd(); };
    u.onerror = ()=>{ if(onEnd) onEnd(); };
    synthRef.current.speak(u);
  }

  // ── Speak a question then auto-start mic ──
  function speakAndListen(text, isFollowUp=false) {
    if (!examActiveRef.current) return;
    setCurrentQ(text);
    const msg = { role:"examiner", text, isFollowUp };
    convRef.current = [...convRef.current, msg];
    setConversation([...convRef.current]);

    const onEnd = ()=>{
      if (!examActiveRef.current) return;
      setPhase("waiting_student");
      phaseRef.current = "waiting_student";
      setTimeout(()=> startListening(), 400);
    };

    // Always try to speak directly — ttsReady set on startExam button press
    if (synthRef.current) {
      setPhase("examiner_speaking");
      phaseRef.current = "examiner_speaking";
      speak(text, onEnd);
    } else {
      // Fallback: skip TTS, just start listening
      onEnd();
    }
  }

  // ── Ask Opening Question (start of OEE cycle) ──
  function askQuestion(qs, idx) {
    if (!examActiveRef.current) return;
    const q = qs[idx];
    if (!q) { endExam(); return; }
    oeeStageRef.current = 0;
    speakAndListen(q, false);
  }

  // ── Fallback if TTS was delayed — speak current question ──
  function handlePlayQuestion() {
    const onEnd = pendingOnEndRef.current || (()=>{
      setPhase("waiting_student");
      phaseRef.current = "waiting_student";
      setTimeout(()=> startListening(), 400);
    });
    pendingOnEndRef.current = null;
    if (!synthRef.current) synthRef.current = window.speechSynthesis;
    setPhase("examiner_speaking");
    phaseRef.current = "examiner_speaking";
    speak(currentQ, onEnd);
  }

  // ── STT: starts on button press, auto-submits when student stops talking ──
  function startListening() {
    if (phaseRef.current !== "waiting_student") return;
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { alert("Chrome 브라우저를 사용해 주세요."); return; }

    setPhase("listening");
    phaseRef.current = "listening";
    setLiveText("");
    liveRef.current = "";
    accRef.current = "";
    listeningRef.current = true;

    function runSession() {
      if (!listeningRef.current) return;
      const rec = new SR();
      rec.lang = "ko-KR";
      rec.continuous = false;     // browser detects end-of-speech automatically
      rec.interimResults = true;
      recRef.current = rec;

      rec.onresult = (e) => {
        let interim = "";
        for (let i=0; i<e.results.length; i++) {
          if (e.results[i].isFinal) {
            accRef.current = (accRef.current + " " + e.results[i][0].transcript).trim();
          } else {
            interim += e.results[i][0].transcript;
          }
        }
        const display = (accRef.current + " " + interim).trim();
        setLiveText(display);
        liveRef.current = display;
      };

      rec.onend = () => {
        if (!listeningRef.current) return;
        if (accRef.current.trim()) {
          // Got speech → submit
          listeningRef.current = false;
          submitAnswer(accRef.current.trim());
        } else {
          // Silence only → keep waiting, restart session
          setTimeout(runSession, 200);
        }
      };

      rec.onerror = (e) => {
        if (!listeningRef.current) return;
        if (e.error === "no-speech" || e.error === "aborted") {
          setTimeout(runSession, 200);
        }
      };

      try { rec.start(); } catch(e) {}
    }

    runSession();
  }

  function stopListening() {
    listeningRef.current = false;
    if (recRef.current) {
      try { recRef.current.abort(); } catch(e) {}
      recRef.current = null;
    }
  }

  // ── Submit student's answer ──
  function submitAnswer(text) {
    if (!examActiveRef.current) return;
    setPhase("processing");
    phaseRef.current = "processing";
    setLiveText("");

    handleStudentTurn(text);
  }

  // ── OEE: Handle student answer based on current stage ──
  async function handleStudentTurn(text) {
    if (!examActiveRef.current) return;
    setPhase("processing");
    phaseRef.current = "processing";
    setLiveText("");

    // Save student answer
    if (text) {
      const sm = { role:"student", text };
      convRef.current = [...convRef.current, sm];
      setConversation([...convRef.current]);
    }

    const stage = oeeStageRef.current;
    const history = convRef.current.map(m=>
      `${m.role==="examiner"?"시험관":"학생"}: ${m.text}`
    ).join("\n");

    if (stage === 0) {
      // Opening answered → ask Extended Question (언제, 어디서, 누구랑, 얼마나 등)
      oeeStageRef.current = 1;
      const sys = `당신은 NSW HSC ${level==="KB"?"Korean Beginners":"Korean Continuers"} 구술 시험관입니다.
학생이 Opening Question에 답했습니다. 이제 Extended Question을 하나 하세요.
Extended Question은 학생 답변의 구체적인 내용을 더 깊이 파고드는 질문입니다.
예: 언제요? 어디에서요? 누구하고요? 얼마나 자주요? 어떻게요?
규칙:
- 한국어로만
- 질문 하나만
- 왜요? 는 사용하지 마세요 (Enrichment 단계에서 씁니다)
- 칭찬 금지
- 질문 텍스트만 출력`;
      const q = await callClaude([{role:"user",content:`대화:\n${history}\n\nExtended Question:`}], sys).catch(()=>"");
      if (!examActiveRef.current) return;
      if (q && q.trim()) {
        speakAndListen(q.trim(), true);
      } else {
        oeeStageRef.current = 2;
        askEnrichment(history);
      }

    } else if (stage === 1) {
      // Extended answered → ask Enrichment Question (왜요? 어떻게 생각해요? 느낌? 의견?)
      oeeStageRef.current = 2;
      askEnrichment(history);

    } else {
      // Enrichment answered → move to next Opening Question
      moveNext();
    }
  }

  async function askEnrichment(history) {
    const sys = `당신은 NSW HSC ${level==="KB"?"Korean Beginners":"Korean Continuers"} 구술 시험관입니다.
학생이 Extended Question에 답했습니다. 이제 Enrichment Question을 하나 하세요.
Enrichment Question은 학생의 의견, 느낌, 이유, 생각을 묻는 질문입니다.
예: 왜 그렇게 생각해요? 어떤 느낌이에요? 그게 중요해요? 어떻게 생각해요? 부모님은 어떻게 생각해요?
규칙:
- 한국어로만
- 질문 하나만
- 칭찬 금지
- 질문 텍스트만 출력`;
    const q = await callClaude([{role:"user",content:`대화:\n${history}\n\nEnrichment Question:`}], sys).catch(()=>"");
    if (!examActiveRef.current) return;
    if (q && q.trim()) {
      speakAndListen(q.trim(), true);
    } else {
      moveNext();
    }
  }

  function moveNext() {
    const next = qIndexRef.current + 1;
    qIndexRef.current = next;
    setQIndex(next);
    setTimeout(()=>{
      if (examActiveRef.current) askQuestion(questionsRef.current, next);
    }, 500);
  }

  // ── Mic button ──
  function handleMicButton() {
    if (phase === "waiting_student") startListening();
    // No manual stop — STT auto-detects end of speech
  }

  // ── Start exam ──
  function startExam() {
    const qs = buildQList(level, topicFilter);
    setQuestions(qs);
    questionsRef.current = qs;
    setConversation([]);
    convRef.current = [];
    setQIndex(0);
    qIndexRef.current = 0;
    setTimer(0);
    setFeedback(null);
    setCurrentQ("");
    setLiveText("");
    examActiveRef.current = true;
    oeeStageRef.current = 0;
    // Mark TTS as ready — user gesture (button click) unlocks autoplay
    setTtsReady(true);
    if (!synthRef.current) synthRef.current = window.speechSynthesis;
    setScreen("exam");

    timerRef.current = setInterval(()=>{
      setTimer(t=>{
        if (t >= MAX_TIME-1) { endExam(); return MAX_TIME; }
        return t+1;
      });
    }, 1000);

    // Start immediately — TTS will show play button if needed
    setTimeout(()=> askQuestion(qs, 0), 300);
  }

  // ── End exam ──
  async function endExam() {
    if (!examActiveRef.current) return;
    examActiveRef.current = false;
    clearInterval(timerRef.current);
    synthRef.current.cancel();
    stopListening();
    setPhase("idle");
    phaseRef.current = "idle";
    setLoadingFeedback(true);
    setScreen("feedback");

    const history = convRef.current.map(m=>
      `${m.role==="examiner"?"Examiner":"Student"}: ${m.text}`
    ).join("\n");

    const sys = `You are an expert NSW HSC ${level==="KB"?"Korean Beginners":"Korean Continuers"} oral exam marker.

NESA Marking Criteria (out of 20):
17–20: Converses effectively, excellent vocabulary, excellent grammar, spontaneous and extended responses
13–16: Converses with relevant info and opinions, sound vocabulary and structures
9–12: Expresses relevant info in response to questions, some vocabulary, needs prompting
5–8: Responds to simple questions with single words and formulaic expressions
1–4: Minimal communication only

Scoring guide: 20=perfect, 19-19.5=excellent minor slips, 18-18.5=very good, 17-17.5=good some errors, 16-16.5=competent noticeable errors, 15=adequate several errors, 13-14=satisfactory limited range, 9-12=basic needs prompting, 5-8=formulaic, 1-4=minimal

Return ONLY valid JSON:
{
  "score": <number 0.5 increments>,
  "band": "<e.g. Band 5 (High)>",
  "summary_en": "<2 sentence summary>",
  "summary_ko": "<2 sentence summary Korean>",
  "strengths_en": ["<specific>","<specific>","<specific>"],
  "strengths_ko": ["<Korean>","<Korean>","<Korean>"],
  "improvements_en": ["<specific>","<specific>","<specific>"],
  "improvements_ko": ["<Korean>","<Korean>","<Korean>"],
  "grammar_en": "<grammar observations with examples>",
  "grammar_ko": "<Korean>",
  "vocab_en": "<vocabulary observations>",
  "vocab_ko": "<Korean>",
  "fluency_en": "<fluency observations>",
  "fluency_ko": "<Korean>",
  "next_steps_en": "<2-3 concrete tips>",
  "next_steps_ko": "<Korean>"
}`;

    const result = await callClaude(
      [{role:"user", content:`Assess this oral exam:\n\n${history}`}],
      sys
    ).catch(()=>"");

    try {
      const clean = result.replace(/```json|```/g,"").trim();
      setFeedback(JSON.parse(clean));
    } catch { setFeedback({_raw:result}); }
    setLoadingFeedback(false);
  }

  const timeLeft = MAX_TIME - timer;
  const timeColor = timeLeft<60?"#f87171":timeLeft<120?"#fb923c":"#a5b4fc";
  const progressPct = (timer_TIME)*100;

  // ─── SETUP SCREEN ─────────────────────────────────────────────────────────
  if (screen==="setup") return (
    <div style={S.root}>
      <div style={S.setupWrap}>
        <div style={{textAlign:"center",marginBottom:32}}>
          <div style={{fontSize:48,marginBottom:10}}>🇰🇷</div>
          <h1 style={{fontSize:24,fontWeight:900,color:"#e0e7ff",margin:0}}>HSC Korean Oral Practice</h1>
          <p style={{color:"#64748b",margin:"6px 0 0",fontSize:13}}>AI examiner · NESA syllabus · Real-time feedback</p>
        </div>

        <div style={S.card}>
          <div style={S.label}>과목 선택 / Course</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            {[{id:"KB",name:"Korean Beginners",sub:"5분",emoji:"🌱"},{id:"KC",name:"Korean Continuers",sub:"10분",emoji:"🎯"}].map(o=>(
              <button key={o.id} onClick={()=>{setLevel(o.id);setTopicFilter("mixed");}}
                style={{...S.optBtn,...(level===o.id?S.optBtnOn:{})}}>
                <span style={{fontSize:20}}>{o.emoji}</span>
                <span style={{fontWeight:700,fontSize:14,color:"#e0e7ff"}}>{o.name}</span>
                <span style={{fontSize:12,color:"#64748b"}}>{o.sub} · 20점 만점</span>
              </button>
            ))}
          </div>
        </div>

        <div style={S.card}>
          <div style={S.label}>토픽 선택 / Topic</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
            <button onClick={()=>setTopicFilter("mixed")} style={{...S.chip,...(topicFilter==="mixed"?S.chipOn:{})}}>🔀 Mixed</button>
            {Object.keys(topics).map(t=>(
              <button key={t} onClick={()=>setTopicFilter(t)} style={{...S.chip,...(topicFilter===t?S.chipOn:{})}}>{t}</button>
            ))}
          </div>
        </div>

        <div style={{...S.card,background:"rgba(99,102,241,0.06)",border:"1px solid rgba(99,102,241,0.2)"}}>
          <div style={S.label}>시작 전 확인</div>
          {["🎙 마이크 허용 필요 (Chrome 권장)","🔊 스피커 준비","⏱ 실제 시험처럼 한국어로만 답변","✅ 말하면 자동 인식 — 멈추면 자동으로 다음 질문"].map((t,i)=>(
            <div key={i} style={{fontSize:13,color:"#94a3b8",marginBottom:4}}>{t}</div>
          ))}
        </div>

        <button onClick={startExam} style={S.startBtn}>
          시험 시작 / Start Exam
          <span style={{fontSize:13,opacity:0.7,marginLeft:8}}>({level==="KB"?"5분":"10분"})</span>
        </button>
      </div>
    </div>
  );

  // ─── EXAM SCREEN ──────────────────────────────────────────────────────────
  if (screen==="exam") return (
    <div style={S.root}>
      <div style={S.examWrap}>
        {/* Timer bar */}
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
          <span style={{fontSize:13,fontWeight:700,color:timeColor,minWidth:40}}>{fmtTime(timeLeft)}</span>
          <div style={{flex:1,height:4,background:"rgba(255,255,255,0.07)",borderRadius:2}}>
            <div style={{height:"100%",borderRadius:2,background:timeLeft<60?"#f87171":"#6366f1",width:`${progressPct}%`,transition:"width 1s linear"}}/>
          </div>
          <button onClick={()=>setShowTranscript(s=>!s)} style={S.smallBtn}>{showTranscript?"텍스트 숨김":"텍스트 표시"}</button>
          <button onClick={endExam} style={{...S.smallBtn,color:"#f87171",borderColor:"rgba(248,113,113,0.3)"}}>종료</button>
        </div>

        {/* Conversation */}
        <div style={S.convArea}>
          {conversation.map((msg,i)=>(
            <div key={i} style={{display:"flex",justifyContent:msg.role==="student"?"flex-end":"flex-start",marginBottom:10}}>
              <div style={{maxWidth:"82%"}}>
                <div style={{fontSize:11,color:"#475569",marginBottom:2,textAlign:msg.role==="student"?"right":"left"}}>
                  {msg.role==="examiner"?(msg.isFollowUp ? (oeeStageRef.current===1?"시험관 (Extended)":"시험관 (Enrichment)") :"시험관"):"나"}
                </div>
                {showTranscript ? (
                  <div style={{
                    padding:"10px 14px",
                    borderRadius:msg.role==="student"?"16px 16px 4px 16px":"16px 16px 16px 4px",
                    background:msg.isSkipped?"rgba(255,255,255,0.03)":msg.role==="examiner"?"rgba(99,102,241,0.18)":"rgba(34,197,94,0.12)",
                    border:`1px solid ${msg.isSkipped?"rgba(255,255,255,0.06)":msg.role==="examiner"?"rgba(99,102,241,0.3)":"rgba(34,197,94,0.2)"}`,
                    color:msg.isSkipped?"#475569":"#e0e7ff",fontSize:15,lineHeight:1.6,
                    fontStyle:msg.isSkipped?"italic":"normal",
                  }}>{msg.text}</div>
                ) : (
                  <div style={{padding:"8px 12px",borderRadius:10,background:"rgba(255,255,255,0.03)",color:"#334155",fontSize:12,fontStyle:"italic"}}>[숨김]</div>
                )}
              </div>
            </div>
          ))}

          {/* Live STT text */}
          {phase==="listening" && liveText && showTranscript && (
            <div style={{display:"flex",justifyContent:"flex-end",marginBottom:10}}>
              <div style={{maxWidth:"82%",padding:"10px 14px",borderRadius:"16px 16px 4px 16px",
                background:"rgba(34,197,94,0.06)",border:"1px dashed rgba(34,197,94,0.3)",
                color:"#86efac",fontSize:15,lineHeight:1.6}}>
                {liveText}<span style={{opacity:0.4,marginLeft:3}}>|</span>
              </div>
            </div>
          )}

          {/* Status dots */}
          {phase==="question_ready" && (
            <div style={{display:"flex",alignItems:"center",gap:8,padding:"4px 0"}}>
              <div style={{width:8,height:8,borderRadius:"50%",background:"#6366f1",
                animation:"pulse 1s ease-in-out infinite"}}/>
              <span style={{color:"#6366f1",fontSize:13}}>질문 준비 중...</span>
            </div>
          )}
          {phase==="examiner_speaking" && (
            <div style={{display:"flex",alignItems:"center",gap:6,padding:"4px 0"}}>
              {[0,1,2].map(i=>(
                <div key={i} style={{width:6,height:6,borderRadius:"50%",background:"#6366f1",
                  animation:`bounce 1s ease-in-out ${i*0.18}s infinite`}}/>
              ))}
              <span style={{color:"#6366f1",fontSize:12,marginLeft:4}}>시험관 말하는 중</span>
            </div>
          )}
          {phase==="processing" && (
            <div style={{display:"flex",alignItems:"center",gap:8,padding:"4px 0"}}>
              <div style={{width:12,height:12,border:"2px solid rgba(99,102,241,0.2)",borderTopColor:"#6366f1",
                borderRadius:"50%",animation:"spin 0.8s linear infinite"}}/>
              <span style={{color:"#64748b",fontSize:12}}>인식 중...</span>
            </div>
          )}
        </div>

        {/* Current question chip */}
        {currentQ && showTranscript && (
          <div style={{padding:"8px 12px",borderRadius:8,background:"rgba(99,102,241,0.08)",
            border:"1px solid rgba(99,102,241,0.15)",marginTop:10,fontSize:13,color:"#c7d2fe"}}>
            <span style={{color:"#475569",marginRight:6,fontSize:11}}>현재 질문</span>{currentQ}
          </div>
        )}

        {/* Mic */}
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",paddingTop:16}}>
          <button onClick={handleMicButton}
            disabled={phase!=="waiting_student"}
            style={{
              width:72,height:72,borderRadius:"50%",border:"none",
              display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,
              background:phase==="listening"
                ?"linear-gradient(135deg,#dc2626,#ef4444)"
                :phase==="waiting_student"
                ?"linear-gradient(135deg,#6366f1,#8b5cf6)"
                :"rgba(255,255,255,0.05)",
              boxShadow:phase==="listening"
                ?"0 0 0 10px rgba(239,68,68,0.15),0 0 30px rgba(239,68,68,0.3)"
                :phase==="waiting_student"
                ?"0 0 0 10px rgba(99,102,241,0.15),0 4px 24px rgba(99,102,241,0.35)"
                :"none",
              opacity:phase==="waiting_student"?1:phase==="listening"?0.9:0.3,
              cursor:phase==="waiting_student"?"pointer":"default",
              transform:phase==="listening"?"scale(1.1)":"scale(1)",
              transition:"all 0.2s ease",
            }}>🎙</button>
          <div style={{marginTop:10,fontSize:13,textAlign:"center"}}>
            {phase==="waiting_student" && <span style={{color:"#a5b4fc",fontWeight:600}}>🎙 버튼을 눌러 답변 시작</span>}
            {phase==="listening" && <span style={{color:"#f87171",fontWeight:600}}>말하세요 — 멈추면 자동으로 다음 질문으로 넘어가요</span>}
            {phase==="examiner_speaking" && <span style={{color:"#64748b"}}>시험관 질문을 들어주세요...</span>}
            {phase==="processing" && <span style={{color:"#64748b"}}>인식 중...</span>}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}
        *{box-sizing:border-box}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-thumb{background:rgba(99,102,241,0.4);border-radius:2px}
      `}</style>
    </div>
  );

  // ─── FEEDBACK SCREEN ──────────────────────────────────────────────────────
  if (screen==="feedback") {
    const sc = feedback?.score;
    const scColor = sc>=17?"#22c55e":sc>=13?"#84cc16":sc>=9?"#eab308":sc>=5?"#f97316":"#ef4444";
    const band = sc ? getBand(sc, level) : null;
    return (
      <div style={S.root}>
        <div style={S.feedWrap}>
          <h2 style={{fontSize:20,fontWeight:800,color:"#e0e7ff",marginBottom:20,textAlign:"center"}}>📊 시험 결과</h2>
          {loadingFeedback ? (
            <div style={{textAlign:"center",padding:"60px 0"}}>
              <div style={{width:44,height:44,border:"3px solid rgba(99,102,241,0.2)",borderTopColor:"#6366f1",
                borderRadius:"50%",animation:"spin 1s linear infinite",margin:"0 auto 16px"}}/>
              <div style={{color:"#64748b",fontSize:14}}>AI가 채점 중입니다...</div>
            </div>
          ) : feedback?._raw ? (
            <div style={{color:"#f87171",background:"rgba(248,113,113,0.08)",borderRadius:12,padding:20,fontSize:13}}>{feedback._raw}</div>
          ) : feedback ? (
            <FeedbackView fb={feedback} scoreColor={scColor} band={band} level={level}/>
          ) : null}
          <div style={{textAlign:"center",marginTop:24,display:"flex",gap:10,justifyContent:"center"}}>
            <button onClick={()=>{setScreen("setup");setFeedback(null);}}
              style={{padding:"10px 22px",borderRadius:10,border:"1px solid rgba(99,102,241,0.3)",cursor:"pointer",background:"rgba(99,102,241,0.1)",color:"#e0e7ff",fontSize:14,fontWeight:600}}>← 처음으로</button>
            <button onClick={startExam}
              style={{padding:"10px 22px",borderRadius:10,border:"none",cursor:"pointer",background:"linear-gradient(135deg,#6366f1,#8b5cf6)",color:"white",fontSize:14,fontWeight:700}}>🔄 다시 연습</button>
          </div>
        </div>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}*{box-sizing:border-box}`}</style>
      </div>
    );
  }
  return null;
}

// ─── Feedback View ────────────────────────────────────────────────────────
function FeedbackView({ fb, scoreColor, band, level }) {
  const [lang, setLang] = useState("both");
  const scale = BAND_INFO[level];
  return (
    <div>
      <div style={{textAlign:"center",padding:"20px 0 16px",marginBottom:16,background:"rgba(255,255,255,0.02)",borderRadius:18,border:`1px solid ${scoreColor}30`}}>
        <div style={{fontSize:60,fontWeight:900,color:scoreColor,lineHeight:1}}>{fb.score}</div>
        <div style={{color:"#64748b",fontSize:13,marginTop:2}}>/ 20점</div>
        <div style={{marginTop:6,fontWeight:800,fontSize:18,color:"#e0e7ff"}}>{fb.band}</div>
        <div style={{marginTop:8,fontSize:13,color:"#94a3b8",maxWidth:360,margin:"8px auto 0",lineHeight:1.5}}>
          {lang!=="ko" && fb.summary_en}
          {lang==="both" && <br/>}
          {lang!=="en" && <span style={{color:"#64748b"}}>{fb.summary_ko}</span>}
        </div>
      </div>

      <div style={{display:"flex",gap:3,marginBottom:16}}>
        {[...scale].reverse().map(b=>(
          <div key={b.band} style={{flex:1,padding:"6px 3px",textAlign:"center",background:band?.band===b.band?`${b.color}22`:"rgba(255,255,255,0.02)",border:`2px solid ${band?.band===b.band?b.color:"transparent"}`,borderRadius:7}}>
            <div style={{fontSize:10,color:b.color,fontWeight:700}}>{b.band}</div>
            <div style={{fontSize:9,color:"#475569"}}>{b.min}–{b.max}</div>
          </div>
        ))}
      </div>

      <div style={{display:"flex",gap:6,marginBottom:14}}>
        {[["both","EN+KO"],["en","English"],["ko","한국어"]].map(([v,l])=>(
          <button key={v} onClick={()=>setLang(v)} style={{padding:"4px 12px",borderRadius:8,border:"none",cursor:"pointer",fontSize:12,fontWeight:600,background:lang===v?"#6366f1":"rgba(255,255,255,0.07)",color:"#e0e7ff"}}>{l}</button>
        ))}
      </div>

      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        <FBList emoji="✅" title="Strengths / 잘한 점" items={fb.strengths_en} itemsKo={fb.strengths_ko} color="34,197,94" lang={lang}/>
        <FBList emoji="📈" title="Improve / 개선할 점" items={fb.improvements_en} itemsKo={fb.improvements_ko} color="251,146,60" lang={lang}/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
          {[{e:"📝",t:"Grammar",en:fb.grammar_en,ko:fb.grammar_ko},{e:"💬",t:"Vocab",en:fb.vocab_en,ko:fb.vocab_ko},{e:"🗣",t:"Fluency",en:fb.fluency_en,ko:fb.fluency_ko}].map(n=>(
            <div key={n.t} style={{background:"rgba(255,255,255,0.02)",borderRadius:10,padding:12,border:"1px solid rgba(255,255,255,0.06)"}}>
              <div style={{fontWeight:700,color:"#e0e7ff",fontSize:12,marginBottom:6}}>{n.e} {n.t}</div>
              {lang!=="ko" && <p style={{color:"#94a3b8",fontSize:12,margin:"0 0 4px",lineHeight:1.5}}>{n.en}</p>}
              {lang!=="en" && <p style={{color:"#64748b",fontSize:11,margin:0,lineHeight:1.5}}>{n.ko}</p>}
            </div>
          ))}
        </div>
        <div style={{background:"rgba(99,102,241,0.07)",borderRadius:10,padding:14,border:"1px solid rgba(99,102,241,0.2)"}}>
          <div style={{fontWeight:700,color:"#a5b4fc",marginBottom:6,fontSize:13}}>🎯 Next Steps</div>
          {lang!=="ko" && <p style={{color:"#cbd5e1",fontSize:13,margin:"0 0 6px",lineHeight:1.6}}>{fb.next_steps_en}</p>}
          {lang!=="en" && <p style={{color:"#94a3b8",fontSize:12,margin:0,lineHeight:1.6}}>{fb.next_steps_ko}</p>}
        </div>
      </div>
    </div>
  );
}

function FBList({ emoji, title, items, itemsKo, color, lang }) {
  return (
    <div style={{background:`rgba(${color},0.06)`,borderRadius:10,padding:14,border:`1px solid rgba(${color},0.2)`}}>
      <div style={{fontWeight:700,color:"#e0e7ff",marginBottom:8,fontSize:13}}>{emoji} {title}</div>
      <div style={{display:"flex",flexDirection:"column",gap:6}}>
        {items?.map((item,i)=>(
          <div key={i} style={{paddingLeft:10,borderLeft:`2px solid rgba(${color},0.3)`}}>
            {lang!=="ko" && <div style={{color:"#cbd5e1",fontSize:13,lineHeight:1.5}}>{item}</div>}
            {lang!=="en" && itemsKo?.[i] && <div style={{color:"#64748b",fontSize:12,marginTop:1}}>{itemsKo[i]}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────
const S = {
  root:{minHeight:"100vh",background:"#0c0c16",color:"#e2e8f0",fontFamily:"'Segoe UI',system-ui,sans-serif",display:"flex",flexDirection:"column"},
  setupWrap:{maxWidth:580,margin:"0 auto",padding:"28px 16px",width:"100%",display:"flex",flexDirection:"column",gap:14},
  card:{background:"rgba(255,255,255,0.03)",borderRadius:14,padding:16,border:"1px solid rgba(255,255,255,0.07)"},
  label:{fontSize:11,fontWeight:700,color:"#475569",textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:10},
  optBtn:{display:"flex",flexDirection:"column",gap:3,padding:14,borderRadius:10,border:"2px solid rgba(255,255,255,0.07)",background:"rgba(255,255,255,0.02)",cursor:"pointer",textAlign:"left",transition:"all 0.15s"},
  optBtnOn:{border:"2px solid #6366f1",background:"rgba(99,102,241,0.12)"},
  chip:{padding:"6px 12px",borderRadius:18,border:"1px solid rgba(255,255,255,0.08)",background:"rgba(255,255,255,0.04)",color:"#94a3b8",cursor:"pointer",fontSize:12,fontWeight:500},
  chipOn:{background:"rgba(99,102,241,0.2)",border:"1px solid rgba(99,102,241,0.5)",color:"#c7d2fe",fontWeight:700},
  startBtn:{width:"100%",padding:15,borderRadius:12,border:"none",cursor:"pointer",fontSize:16,fontWeight:800,background:"linear-gradient(135deg,#6366f1,#8b5cf6)",color:"white",boxShadow:"0 4px 20px rgba(99,102,241,0.35)",marginTop:4},
  examWrap:{maxWidth:680,margin:"0 auto",padding:"16px 14px 24px",width:"100%",display:"flex",flexDirection:"column",minHeight:"100vh"},
  convArea:{flex:1,overflowY:"auto",minHeight:260,maxHeight:"calc(100vh - 260px)",background:"rgba(255,255,255,0.015)",borderRadius:14,padding:14,border:"1px solid rgba(255,255,255,0.05)"},
  smallBtn:{padding:"5px 10px",borderRadius:7,border:"1px solid rgba(255,255,255,0.1)",cursor:"pointer",background:"rgba(255,255,255,0.04)",color:"#94a3b8",fontSize:12,fontWeight:500},
  feedWrap:{maxWidth:660,margin:"0 auto",padding:"24px 14px 40px",width:"100%"},
};

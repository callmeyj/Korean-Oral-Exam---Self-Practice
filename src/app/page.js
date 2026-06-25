"use client";
import { useState, useRef, useEffect } from "react";

// ─── Question Banks ────────────────────────────────────────────────────────
const KB_QUESTIONS = {
  "Family life, home & neighbourhood": [
    "당신은 어느 나라 사람이에요?","몇 살이에요?","누구하고 살아요?",
    "가족이 몇 명이에요?","가족은 누구예요?","주말에 가족하고 보통 뭐 해요?",
    "생일에 보통 뭐 해요?","이번 생일에 뭐 하고 싶어요?",
    "지난 생일에 무슨 선물을 받았어요?","당신에게 최고의 생일 선물은 뭐예요?",
    "당신은 애완동물이 있어요?","당신의 애완동물은 어떻게 생겼어요?",
    "어머니는 어떤 사람이에요?","아버지는 어떤 사람이에요?",
    "당신은 집에 방이 있어요?","당신의 방에는 뭐가 있어요?",
    "집에서 어떤 곳이 제일 좋아요?","집에서 누가 청소를 해요?",
    "집에서 보통 뭐 해요?","저녁밥은 누구하고 먹어요?",
    "당신은 어디에서 태어났어요?","언제 시드니에 왔어요?",
    "당신의 방에서 뭐가 제일 마음에 들어요?","당신은 요즘 뭐에 관심이 있어요?",
  ],
  "Friends, recreation & pastimes": [
    "취미가 뭐예요?","그 취미를 언제 시작했어요?","그 취미는 누구하고 해요?",
    "당신은 무슨 취미를 갖고 싶어요?","당신은 여가 시간에 보통 뭐 해요?",
    "음악 감상을 좋아해요?","무슨 음악을 좋아해요?","무슨 악기를 연주할 수 있어요?",
    "어떤 영화를 좋아해요?","언제 어디에서 영화를 봐요?",
    "운동을 좋아해요?","무슨 운동을 할 수 있어요?",
    "친구가 많이 있어요?","자유 시간에 친구들을 만나면 보통 뭐 해요?",
    "제일 친한 친구는 누구예요?","그 친구는 어떤 사람이에요?",
    "그 친구하고 왜 친구예요?","그 친구도 한국어를 할 수 있어요?",
    "오늘 며칠이에요?","무슨 요일을 제일 좋아해요?",
    "자기 전에 보통 뭐 해요?","학교에 가기 전에 뭐 해요?",
    "매일 아침밥을 먹어요?","보통 아침밥으로 뭐를 먹어요?",
    "무슨 색을 제일 좋아해요?","제일 친한 친구하고 집이 가까워요?",
  ],
  "People, places & communities": [
    "무슨 계절을 가장 좋아해요?","어떤 날씨가 좋아요?",
    "주말에 날씨가 좋으면 뭐 하고 싶어요?","날씨가 안 좋으면 보통 뭐 해요?",
    "당신의 동네 이름은 뭐예요?","시드니에서 멀어요?","어떤 동네예요?",
    "당신의 집 근처에 뭐가 있어요?","동네에서 뭐를 할 수 있어요?",
    "동네에서 어디를 제일 좋아해요?","동네에 한국 식당이 있어요?",
    "한국 식당에 자주 가요?","무슨 음식을 좋아해요?",
    "당신은 다른 나라의 문화에 관심이 있어요?","다른 나라 음식을 좋아해요?",
    "해외에 친구나 친척이 있어요?","쇼핑을 좋아해요?",
    "누구하고 쇼핑을 해요?","어디에서 쇼핑을 해요?",
    "쇼핑을 하면 보통 뭐를 사요?","나중에 어디에서 살고 싶어요?",
    "당신의 동네에 뭐가 있으면 좋겠어요?","당신의 동네에 어떤 사람들이 살아요?",
  ],
  "Education & work": [
    "당신은 무슨 과목을 공부해요?","무슨 과목을 제일 좋아해요?",
    "제일 쉬운 과목은 뭐예요?","제일 어려운 과목은 뭐예요?",
    "무슨 요일에 한국어를 공부해요?","당신은 어떤 선생님이 좋아요?",
    "당신의 학교는 몇 시에 시작해요?","학교에 클럽이 있어요?",
    "점심 시간은 언제예요?","점심에 보통 뭐 먹어요?",
    "당신의 학교에 학생이 몇 명 정도 있어요?","학교에서 어떤 곳을 제일 좋아해요?",
    "학교 수업이 끝나면 뭐 해요?","보통 매일 몇 시간 공부해요?",
    "학교 숙제가 많아요?","엄격한 선생님이 좋아요?",
    "왜 한국어를 공부해요?","한국인 친구가 있어요?",
    "당신은 아르바이트를 해요?","어디에서 아르바이트를 해요?",
    "어떤 아르바이트를 하고 싶어요?","집에서 학교까지 얼마나 걸려요?",
    "집에서 학교까지 어떻게 가요?","외국어를 배우는 것이 왜 필요하다고 생각해요?",
    "스트레스를 받으면 보통 어떻게 해요?",
  ],
  "Holidays, travel & tourism": [
    "이번 주말에 뭐 할 계획이에요?","지난 주말에 뭐 했어요?",
    "지난 방학에 뭐 했어요?","지난 방학에 어디에 갔어요?",
    "방학 때 뭐가 제일 좋았어요?","여행에서 뭐가 제일 재미있었어요?",
    "여행 좋아해요?","여행을 가면 게스트하우스가 좋을까요? 호텔이 좋을까요?",
    "어디로 여행을 가고 싶어요?","당신은 비행기 타기를 좋아해요?",
    "한국에 가면 뭐 하려고 해요?","한국에 가면 어디에 가고 싶어요?",
    "한국은 뭐로 유명해요?","당신은 1월 1일에 뭐 해요?",
    "당신은 겨울 방학에 뭐 할 계획이에요?","한국 음식을 먹을 수 있어요?",
    "한국 음식을 만들 수 있어요?","집에서 누가 요리를 해요?",
    "어머니 요리하고 레스토랑 요리하고 어느 것이 더 맛있어요?",
    "무슨 색을 좋아해요?","어떤 스타일 옷을 좋아해요?",
    "여행 준비를 어떻게 해요?","호주 여행은 어디가 좋을까요?",
  ],
  "Future plans & aspirations": [
    "당신은 무슨 직업을 갖고 싶어요?","어떤 성격이 좋아요?",
    "당신의 성격은 어때요?","성격하고 직업, 관계가 있어요?",
    "당신은 장래 희망이 뭐예요?","그 직업을 위해서 무엇을 준비하고 있어요?",
    "한국어를 공부한 지 얼마나 됐어요?","내년에 대학에 갈 계획이에요?",
    "내년에 갭이어를 할 계획이에요?","부모님은 갭이어에 대해 어떻게 생각해요?",
    "한국어 HSC 시험은 언제예요?","고등학교를 졸업하면 뭐 할 계획이에요?",
    "대학에 가면 뭐 하고 싶어요?","대학에 들어가면 뭘 공부하고 싶어요?",
    "대학에서도 한국어 공부를 할 계획이에요?","대학교를 졸업하면 뭘 하고 싶어요?",
    "한국에 가면 뭘 하고 싶어요?","돈을 벌면 뭘 하고 싶어요?",
    "아르바이트를 한 적이 있어요?","당신은 운전면허증이 있어요?",
    "당신은 꿈이 많아요?","당신의 꿈은 뭐예요?",
    "몇 살에 결혼하고 싶어요?","어떤 사람하고 결혼하고 싶어요?",
    "부모님은 당신의 꿈에 대해 어떻게 생각해요?",
  ],
};

const KC_QUESTIONS = {
  "The self & family": [
    "가족이 몇 명이에요?","당신은 아버지와 비슷해요? 아니면 어머니와 비슷해요?",
    "집에서 부모님하고 무슨 이야기를 많이 해요?","집에서 부모님을 어떻게 도와 드려요?",
    "가장 좋아하는 집안 일 있어요?","어디에 살아요?",
    "지금 살고 있는 동네에 대해서 얘기해 보세요.","그 동네에서 얼마나 살았어요?",
    "이사를 가면 어떤 동네로 가고 싶어요?","어른이 되면 다른 나라로 이사 가고 싶어요?",
    "18살 생일을 어떻게 보내고 싶어요?","마지막으로 간 파티는 언제예요?",
    "친구를 만나면 보통 뭐 해요?","당신의 제일 친한 친구에 대해서 말해 보세요.",
    "당신에 대해서 말해 보세요.","어린 시절의 기억에 대해 말해 보세요.",
    "당신의 성격은 어때요?","당신이 어떤 성격이면 좋겠어요?",
    "당신은 친구가 중요해요? 본인이 중요해요?","당신은 롤 모델이 있어요?",
  ],
  "Education & future plans": [
    "당신은 학교에 가는 것을 좋아해요?","당신은 어떤 선생님이 좋아요?",
    "당신은 무슨 과목을 좋아해요?","당신은 어떤 학생이에요?",
    "한국어를 배우는 이유가 뭐예요?","한국어를 공부하는 동안에 뭐가 제일 어려웠어요?",
    "한국어로 말할 때 기분이 어때요?","나중에 한국어로 뭐 하고 싶어요?",
    "다른 언어를 배우기가 중요한 것 같아요?","학교에서 좋은 성적을 받는 것이 중요해요?",
    "한국의 학교가 호주의 학교하고 어떻게 다른 것 같아요?",
    "HSC시험이 끝나면 뭐 하고 싶어요?","당신은 스트레스를 받으면 보통 뭐 해요?",
    "대학교에 가서도 계속 한국어를 공부할 거예요?","한국으로 교환 학생 가고 싶어요?",
    "아르바이트를 해요?","내년 계획이 뭐예요?",
  ],
  "Everyday life & activities": [
    "당신은 취미가 뭐예요?","주말에 보통 뭐 해요?","지난 주말에 뭐 했어요?",
    "당신은 보통 몇 시에 일어나요?","당신은 하루 중에서 몇 시가 제일 좋아요?",
    "무슨 영화나 드라마를 좋아해요?","마지막으로 본 영화는 뭐예요?",
    "어떤 음악을 자주 들어요?","그 음악을 들으면 기분이 어때요?",
    "무슨 계절을 가장 좋아해요?","날씨가 나쁘면 보통 뭐 해요?",
    "당신은 건강을 위해서 보통 뭐 해요?","당신은 외식이 좋아요? 집밥이 좋아요?",
    "한국 음식 좋아해요?","친구에게 어떤 한국 음식을 추천하고 싶어요?",
    "당신은 핸드폰이 없으면 어떨 것 같아요?",
    "당신은 혼자 시간 보내기를 좋아해요? 친구하고 시간 보내기를 좋아해요?",
    "요즘 청소년들에게 뭐가 인기가 있어요?",
  ],
  "Special celebrations & Korean culture": [
    "어머니날을 어떻게 보냈어요?","한국의 명절은 뭐가 있어요?",
    "한국 명절을 지내보고 싶어요?","지난 새해 첫날을 어떻게 보냈어요?",
    "내년 새해 첫날을 어떻게 보내고 싶어요?","호주의 명절에 대해서 하나만 얘기해 보세요.",
  ],
  "Korea as a tourist destination": [
    "한국에 간 적 있어요?","한국에 가고 싶어요?","한국 여행을 가면 누구하고 가요?",
    "한국에 가면 어느 관광지에 가고 싶어요?","한국은 뭐로 유명해요?",
    "한국 음식이 건강에 좋다고 생각해요?","한국 동네하고 호주 동네하고 어떻게 달라요?",
    "당신은 한국에서 살고 싶어요?","한국에서 살면 호주하고 어떻게 다를 것 같아요?",
    "호주 친구가 한국을 가면 어디를 추천할 거예요?",
    "한국을 여행하기 가장 좋은 계절은 언제라고 생각해요?",
  ],
  "The world of work": [
    "당신은 장래희망이 뭐예요?","왜 그 일을 하고 싶어요?",
    "그 직업을 위해서 어떻게 준비하고 있어요?","당신은 어떤 사람하고 일 하고 싶어요?",
    "한국어가 그 직업에 도움이 될까요?","부모님은 그 직업에 대해서 어떻게 생각해요?",
    "만약 부모님이 그 직업을 반대하면 어떻게 해요?","10년 후에 어떤 사람이 되고 싶어요?",
    "일을 하고 공부하는 것은 중요해요?",
    "대학교를 졸업하면 제일 먼저 뭐 할 거예요?",
  ],
  "The changing world - family": [
    "현대 사회에서 가족의 역할이 어떻게 변하고 있다고 생각해요?",
    "맞벌이 가정이 늘어나고 있는데 어떻게 생각해요?",
    "청소년 문제에 대해 어떻게 생각해요?","이민자들의 경험에 대해 어떻게 생각해요?",
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
  const res = await fetch("/api/claude", {
    method:"POST", headers:{"Content-Type":"application/json"},
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
  const MAX_TIME = level === "KB" ? 300 : 600;
  const topics   = level === "KB" ? KB_QUESTIONS : KC_QUESTIONS;

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
  const timerRef    = useRef(null);

  // Initialize browser APIs safely (only runs client-side)
  const convRef     = useRef([]);
  const questionsRef= useRef([]);
  const qIndexRef   = useRef(0);
  const phaseRef    = useRef("idle");
  const liveRef     = useRef("");
  const examActiveRef = useRef(false);
  // TTS ready state - mobile requires user gesture first
  const pendingOnEndRef = useRef(null);

  // OEE stage tracker: 0=Opening answered, 1=Extended answered, 2=Enrichment answered→move next
  const oeeStageRef = useRef(0);

  // ── Whisper STT: MediaRecorder → /api/stt → transcript ──
  const mediaRecRef   = useRef(null);
  const chunksRef     = useRef([]);
  const recordingRef  = useRef(false);
  const silenceTimerRef = useRef(null);
  const micStreamRef  = useRef(null);

  // Get mic stream once at exam start (no repeated permission popups)
  async function initMic() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = stream;
      return true;
    } catch(e) {
      alert("마이크 접근 권한이 필요해요. 브라우저 설정에서 마이크를 허용해 주세요.");
      return false;
    }
  }

  function startListening() {
    if (!micStreamRef.current) return;
    if (recordingRef.current) return;

    recordingRef.current = true;
    chunksRef.current = [];
    setLiveText("");
    liveRef.current = "";
    setPhase("listening");
    phaseRef.current = "listening";

    // Use existing stream — no new permission popup!
    const mr = new MediaRecorder(micStreamRef.current, { mimeType: "audio/webm" });
    mediaRecRef.current = mr;

    mr.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };

    // Collect data every 200ms
    mr.start(200);

    // Show recording indicator
    let dots = 0;
    const dotTimer = setInterval(() => {
      if (!recordingRef.current) { clearInterval(dotTimer); return; }
      dots = (dots + 1) % 4;
      setLiveText("●".repeat(dots + 1));
    }, 400);

    // Auto-submit after silence (3 seconds after last sound)
    // We use a simple timer: after 4 seconds total, stop and transcribe
    // Student can also press mic button to stop manually
    silenceTimerRef.current = setTimeout(() => {
      if (recordingRef.current) stopAndTranscribe();
    }, 4000);
  }

  async function stopAndTranscribe() {
    if (!recordingRef.current) return;
    recordingRef.current = false;
    if (silenceTimerRef.current) { clearTimeout(silenceTimerRef.current); silenceTimerRef.current = null; }

    const mr = mediaRecRef.current;
    if (!mr || mr.state === "inactive") {
      submitAnswer("");
      return;
    }

    setPhase("processing");
    phaseRef.current = "processing";
    setLiveText("🔄 인식 중...");

    await new Promise(resolve => {
      mr.onstop = resolve;
      mr.stop();
    });

    const blob = new Blob(chunksRef.current, { type: "audio/webm" });
    chunksRef.current = [];

    if (blob.size < 500) {
      // Too short — no speech
      setLiveText("");
      submitAnswer("");
      return;
    }

    try {
      const fd = new FormData();
      fd.append("audio", blob, "audio.webm");
      const res = await fetch("/api/stt", { method: "POST", body: fd });
      const data = await res.json();
      const text = data.transcript || "";
      setLiveText(text);
      liveRef.current = text;
      submitAnswer(text);
    } catch(e) {
      console.error("STT error:", e);
      setLiveText("");
      submitAnswer("");
    }
  }

  function stopListening() {
    recordingRef.current = false;
    if (silenceTimerRef.current) { clearTimeout(silenceTimerRef.current); silenceTimerRef.current = null; }
    if (mediaRecRef.current && mediaRecRef.current.state !== "inactive") {
      try { mediaRecRef.current.stop(); } catch(e) {}
    }
  }

  // Mic button: press to stop recording manually (auto-stops after 4s)
  function handleMicButton() {
    if (phaseRef.current === "listening" && recordingRef.current) {
      stopAndTranscribe();
    }
  }

  function fmtTime(s){ return String(Math.floor(s/60)).padStart(2,"0")+":"+String(s%60).padStart(2,"0"); }

  // ── TTS via OpenAI ──
  const audioRef = useRef(null);

  async function speak(text, onEnd) {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    try {
      const res = await fetch("/api/tts", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ text }),
      });
      if (!res.ok) throw new Error("TTS failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audioRef.current = audio;
      audio.onended = () => { URL.revokeObjectURL(url); audioRef.current = null; if(onEnd) onEnd(); };
      audio.onerror = () => { URL.revokeObjectURL(url); audioRef.current = null; if(onEnd) onEnd(); };
      try { await audio.play(); } catch(e) { if(onEnd) onEnd(); }
    } catch(err) {
      console.error("TTS error:", err);
      if(onEnd) onEnd();
    }
  }

  // ── Speak question then auto-start mic ──
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
      setTimeout(()=>{
        if (examActiveRef.current && micStreamRef.current) startListening();
      }, 500);
    };

    setPhase("examiner_speaking");
    phaseRef.current = "examiner_speaking";
    speak(text, onEnd);
  }

  // ── Submit student answer to OEE handler ──
  function submitAnswer(text) {
    if (!examActiveRef.current) return;
    setPhase("processing");
    phaseRef.current = "processing";
    setLiveText("");
    handleStudentTurn(text);
  }

  // ── Ask Opening Question (start of OEE cycle) ──
  function askQuestion(qs, idx) {
    if (!examActiveRef.current) return;
    const q = qs[idx];
    if (!q) { endExam(); return; }
    oeeStageRef.current = 0;
    speakAndListen(q, false);
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
      // Check if student already explained WHY in their answer
      const alreadyExplainedWhy = text && (text.includes("왜냐하면") || text.includes("니까") || text.includes("때문") || text.includes("어서") || text.includes("아서"));
      // Some questions don't need "왜요?" - factual answers about nationality, age, family members etc
      const lastExaminerQ = convRef.current.filter(m=>m.role==="examiner" && !m.isFollowUp).slice(-1)[0]?.text || "";
      const isFactualQ = lastExaminerQ.includes("어느 나라") || lastExaminerQ.includes("몇 살") || lastExaminerQ.includes("몇 명") || lastExaminerQ.includes("누구하고") || lastExaminerQ.includes("언제") || lastExaminerQ.includes("어디에 살") || lastExaminerQ.includes("몇 학년") || lastExaminerQ.includes("누구예요");
      const sys = (alreadyExplainedWhy || isFactualQ)
        ? `당신은 NSW HSC ${level==="KB"?"Korean Beginners":"Korean Continuers"} 구술 시험관입니다. 학생 답변을 바탕으로 자연스러운 Extended Question을 하나 하세요. 예: 언제요? 어디에서요? 누구하고요? 얼마나 자주요? 어떻게요? 규칙: 한국어로만, 질문 하나만, 왜요 금지, 칭찬 금지, 질문 텍스트만 출력.`
        : `당신은 NSW HSC ${level==="KB"?"Korean Beginners":"Korean Continuers"} 구술 시험관입니다. 학생이 Opening Question에 답했습니다. 왜요? 라고 물어보세요. 딱 왜요? 한 단어만 출력하세요.`;
      const q = await callClaude([{role:"user",content:`대화:\n${history}\n\nExtended Question:`}], sys).catch(()=>"");
      if (!examActiveRef.current) return;
      if (q && q.trim()) {
        speakAndListen(q.trim(), true);
      } else {
        oeeStageRef.current = 2;
        askEnrichment(history);
      }

    } else if (stage === 1) {
      // Extended answered → ask Enrichment Question
      oeeStageRef.current = 2;
      // Update history to include student's latest answer
      const updatedHistory = convRef.current.map(m=>
        `${m.role==="examiner"?"시험관":"학생"}: ${m.text}`
      ).join("\n");
      askEnrichment(updatedHistory);

    } else {
      // Enrichment answered → move to next Opening Question
      moveNext();
    }
  }

  async function askEnrichment(history) {
    const sys = `당신은 NSW HSC ${level==="KB"?"Korean Beginners":"Korean Continuers"} 구술 시험관입니다. 학생이 Extended Question에 답했습니다. 대화 흐름에 자연스럽게 이어지는 Enrichment Question을 하나 하세요. 학생이 말한 내용을 바탕으로 더 깊이 파고드세요. 예: 그러면 [내용]은 어때요? [내용]이 중요해요? [내용]을 하면 기분이 어때요? 부모님은 어떻게 생각해요? 규칙: 한국어로만, 질문 하나만, 칭찬 금지, 질문 텍스트만 출력.`;
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
    setScreen("exam");
    // Init mic once — no repeated permission popups
    initMic().then(ok => {
      if (ok) console.log("Mic ready");
    });

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
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    stopListening();
    setPhase("idle");
    phaseRef.current = "idle";
    setLoadingFeedback(true);
    setScreen("feedback");

    const history = convRef.current.map(m=>
      `${m.role==="examiner"?"Examiner":"Student"}: ${m.text}`
    ).join("\n");

    const sys = `You are an expert NSW HSC ${level==="KB"?"Korean Beginners":"Korean Continuers"} oral exam marker. NESA criteria (out of 20): 17-20=excellent control, spontaneous, rich vocabulary; 13-16=sound knowledge, relevant info; 9-12=some knowledge, needs prompting; 5-8=basic single words; 1-4=minimal. Score in 0.5 increments. Return ONLY valid JSON: {"score":<number>,"band":"<e.g. Band 5 (High)>","summary_en":"<2 sentences>","summary_ko":"<Korean>","strengths_en":["<specific>","<specific>","<specific>"],"strengths_ko":["<Korean>","<Korean>","<Korean>"],"improvements_en":["<specific>","<specific>","<specific>"],"improvements_ko":["<Korean>","<Korean>","<Korean>"],"grammar_en":"<observations>","grammar_ko":"<Korean>","vocab_en":"<observations>","vocab_ko":"<Korean>","fluency_en":"<observations>","fluency_ko":"<Korean>","next_steps_en":"<2-3 tips>","next_steps_ko":"<Korean>"}`;

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
  const progressPct = (timer/MAX_TIME)*100;

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
                  {msg.role==="examiner"?(msg.isFollowUp?"시험관 (후속)":"시험관"):"나"}
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

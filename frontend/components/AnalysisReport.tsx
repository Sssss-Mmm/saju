"use client";
import React, { useState, useEffect, useRef } from 'react';
import styles from './AnalysisReport.module.css';
import SoloEscapeReport, { SoloEscapeData } from './SoloEscapeReport';

interface Props {
  contentHtml?: string;
  isLoading?: boolean;
  requestBody?: { name: string; bazi: any; ziwei: any };
}

type FilterType = 'ALL' | 'LOVE' | 'CAREER' | 'QNA' | 'SOLO';

const TABS: { id: FilterType; label: string }[] = [
  { id: 'ALL', label: '🔥 전체 보기' },
  { id: 'LOVE', label: '💕 연애' },
  { id: 'CAREER', label: '💼 취업/타이밍' },
  { id: 'QNA', label: '💭 직접 질문하기' },
  { id: 'SOLO', label: '💘 솔로 탈출' },
];

// 탭마다 리포트 강조색을 통째로 바꾼다 (globals.css의 [data-hue] 참고)
const HUE: Record<FilterType, string> = {
  ALL: 'mind',
  LOVE: 'love',
  CAREER: 'career',
  QNA: 'qna',
  SOLO: 'solo',
};

interface QnaMessage {
  role: 'user' | 'ai';
  contentHtml: string;
}

export default function AnalysisReport({ contentHtml, isLoading, requestBody }: Props) {
  const [filter, setFilter] = useState<FilterType>('ALL');
  const [loveHtml, setLoveHtml] = useState<string>('');
  const [careerHtml, setCareerHtml] = useState<string>('');
  const [soloData, setSoloData] = useState<SoloEscapeData | null>(null);
  const [loveLoading, setLoveLoading] = useState(false);
  const [careerLoading, setCareerLoading] = useState(false);
  const [soloLoading, setSoloLoading] = useState(false);
  const fetchedLove = useRef(false);
  const fetchedCareer = useRef(false);
  const fetchedSolo = useRef(false);

  // Q&A State
  const [qnaHistory, setQnaHistory] = useState<QnaMessage[]>([]);
  const [questionInput, setQuestionInput] = useState("");
  const [qnaLoading, setQnaLoading] = useState(false);
  const chatListRef = useRef<HTMLDivElement>(null);

  // 연애 탭 클릭 시 API 호출 (최초 1회)
  useEffect(() => {
    if (filter === 'LOVE' && !fetchedLove.current && requestBody) {
      fetchedLove.current = true;
      setLoveLoading(true);
      fetch('/api/analyze/love', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      })
        .then(res => res.json())
        .then(json => { if (json.content) setLoveHtml(json.content); })
        .catch(err => console.error(err))
        .finally(() => setLoveLoading(false));
    }
  }, [filter, requestBody]);

  // 커리어 탭 클릭 시 API 호출 (최초 1회)
  useEffect(() => {
    if (filter === 'CAREER' && !fetchedCareer.current && requestBody) {
      fetchedCareer.current = true;
      setCareerLoading(true);
      fetch('/api/analyze/career', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      })
        .then(res => res.json())
        .then(json => { if (json.content) setCareerHtml(json.content); })
        .catch(err => console.error(err))
        .finally(() => setCareerLoading(false));
    }
  }, [filter, requestBody]);

  // 솔로 탈출 탭 클릭 시 API 호출 (최초 1회)
  useEffect(() => {
    if (filter === 'SOLO' && !fetchedSolo.current && requestBody) {
      fetchedSolo.current = true;
      setSoloLoading(true);
      fetch('/api/analyze/solo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      })
        .then(res => res.json())
        .then(json => {
          if (json.meeting) setSoloData(json as SoloEscapeData);
        })
        .catch(err => console.error(err))
        .finally(() => setSoloLoading(false));
    }
  }, [filter, requestBody]);

  // 자동 스크롤
  useEffect(() => {
    if (chatListRef.current && filter === 'QNA') {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, [qnaHistory, qnaLoading, filter]);

  const handleAskQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionInput.trim() || !requestBody || qnaLoading) return;

    const userMsg = questionInput.trim();
    setQnaHistory(prev => [...prev, { role: 'user', contentHtml: `<p>${userMsg}</p>` }]);
    setQuestionInput("");
    setQnaLoading(true);

    try {
      const res = await fetch('/api/analyze/question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...requestBody, question: userMsg }),
      });
      const json = await res.json();
      if (json.content) {
        setQnaHistory(prev => [...prev, { role: 'ai', contentHtml: json.content }]);
      } else {
        setQnaHistory(prev => [...prev, { role: 'ai', contentHtml: "<p>오류가 생겼네. 다시 물어보게.</p>" }]);
      }
    } catch (err) {
      console.error(err);
      setQnaHistory(prev => [...prev, { role: 'ai', contentHtml: "<p>통신에 문제가 생겼군. 다시 시도해보게.</p>" }]);
    } finally {
      setQnaLoading(false);
    }
  };

  const currentHtml = filter === 'ALL' ? contentHtml : filter === 'LOVE' ? loveHtml : filter === 'CAREER' ? careerHtml : '';
  const currentLoading = filter === 'ALL' ? isLoading : filter === 'LOVE' ? loveLoading : filter === 'CAREER' ? careerLoading : false;

  const loadingMessages: Record<FilterType, string> = {
    ALL: '명식과 기운을 읽고 있네...',
    LOVE: '인연의 실타래를 풀고 있네...',
    CAREER: '관운의 흐름을 가늠하고 있네...',
    QNA: '명반을 짚어보고 있네...',
    SOLO: '운명의 그 사람을 찾고 있네...',
  };

  return (
    <div className={styles.chatContainer} data-hue={HUE[filter]} data-paid="false">

      {!isLoading && contentHtml && (
        <div className={styles.tabs}>
          {TABS.map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilter(tab.id)}
              className={`${styles.tab} ${filter === tab.id ? styles.tabActive : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {filter === 'SOLO' ? (
        <SoloEscapeReport
          data={soloData || {
            meeting: { timing: '', place: '', situation: '', probability: '' },
            person: { gender: '', age_range: '', appearance: '', personality: '', occupation: '', image_prompt: '' },
            script: { opening_line: '', follow_up: '', backup_line: '' },
            motivation: '',
          }}
          isLoading={soloLoading || !soloData}
        />
      ) : filter === 'QNA' ? (
        <div className={styles.qnaMode}>
          <div className={styles.chatList} ref={chatListRef}>
            {qnaHistory.length === 0 && (
              <div className={styles.chatBubbleContainer} style={{ marginBottom: '10px' }}>
                <div className={styles.chatBubble}>
                  <div className={styles.chatHeader}>
                    <span className={styles.avatar}>💬</span>
                    <span className={styles.sender}>이현:</span>
                  </div>
                  <div className={styles.chatContent}>
                    <p>궁금한 것이 있다면 무엇이든 물어보게. 자네의 명반을 보고 솔직하게 답해줄 테니.</p>
                  </div>
                </div>
              </div>
            )}
            
            {qnaHistory.map((msg, idx) => (
              <div key={idx} className={msg.role === 'user' ? styles.userBubbleContainer : styles.aiBubbleContainer}>
                <div className={styles.chatBubble}>
                  <div className={styles.chatHeader}>
                    <span className={styles.avatar}>{msg.role === 'user' ? '👤' : '💬'}</span>
                    <span className={styles.sender}>{msg.role === 'user' ? '내담자:' : '이현:'}</span>
                  </div>
                  <div className={`${styles.chatContent} report-body`} dangerouslySetInnerHTML={{ __html: msg.contentHtml }} />
                </div>
              </div>
            ))}
            
            {qnaLoading && (
              <div className={styles.aiBubbleContainer}>
                <div className={styles.chatBubble}>
                   <div className={styles.typingIndicator}>
                     <span>.</span><span>.</span><span>.</span> {loadingMessages['QNA']}
                   </div>
                </div>
              </div>
            )}
          </div>
          
          <form className={styles.qnaInputForm} onSubmit={handleAskQuestion}>
            <input 
              type="text" 
              className={styles.qnaInput} 
              placeholder="예: 내년에 창업을 해도 괜찮을까요?" 
              value={questionInput} 
              onChange={e => setQuestionInput(e.target.value)}
              disabled={qnaLoading}
            />
            <button type="submit" className={styles.qnaSubmitBtn} disabled={qnaLoading || !questionInput.trim()}>
              질문하기
            </button>
          </form>
        </div>
      ) : (
        <div className={styles.reportCard}>
          <div className={styles.chatHeader}>
            <span className={styles.avatar}>💬</span>
            <span className={styles.sender}>이현</span>
          </div>

          {currentLoading ? (
            <div className={styles.typingIndicator}>
              <span>.</span><span>.</span><span>.</span> {loadingMessages[filter]}
            </div>
          ) : currentHtml ? (
            <div className="report-body" dangerouslySetInnerHTML={{ __html: currentHtml }} />
          ) : null}
        </div>
      )}

      {!isLoading && contentHtml && (
        <div className={styles.darkActionCard}>
          <div className={styles.darkActionHeader}>
            <span className={styles.diamond}>💎</span>
            <h3>이현이 주는 사주 조언 요약</h3>
          </div>
          <p className={styles.darkActionSubtitle}>"자네의 예리함은 저주가 아니라 축복이네."</p>
        </div>
      )}
    </div>
  );
}

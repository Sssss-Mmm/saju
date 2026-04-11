"use client";
import React, { useState, useEffect, useRef } from 'react';
import styles from './AnalysisReport.module.css';

interface Props {
  contentHtml?: string;
  isLoading?: boolean;
  requestBody?: { name: string; bazi: any; ziwei: any };
}

type FilterType = 'ALL' | 'LOVE' | 'CAREER';

export default function AnalysisReport({ contentHtml, isLoading, requestBody }: Props) {
  const [filter, setFilter] = useState<FilterType>('ALL');
  const [loveHtml, setLoveHtml] = useState<string>('');
  const [careerHtml, setCareerHtml] = useState<string>('');
  const [loveLoading, setLoveLoading] = useState(false);
  const [careerLoading, setCareerLoading] = useState(false);
  const fetchedLove = useRef(false);
  const fetchedCareer = useRef(false);

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

  const currentHtml = filter === 'ALL' ? contentHtml : filter === 'LOVE' ? loveHtml : careerHtml;
  const currentLoading = filter === 'ALL' ? isLoading : filter === 'LOVE' ? loveLoading : careerLoading;

  const loadingMessages: Record<FilterType, string> = {
    ALL: '명식과 기운을 읽고 있네...',
    LOVE: '인연의 실타래를 풀고 있네...',
    CAREER: '관운의 흐름을 가늠하고 있네...',
  };

  return (
    <div className={styles.chatContainer}>
      
      {!isLoading && contentHtml && (
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setFilter('ALL')}
            style={{ 
              padding: '6px 14px', borderRadius: '20px', border: '1px solid var(--border-color)', 
              background: filter === 'ALL' ? 'var(--glow-primary)' : 'rgba(255,255,255,0.05)',
              color: 'white', cursor: 'pointer', transition: 'all 0.2s'
            }}>🔥 전체 보기</button>
          <button 
            onClick={() => setFilter('LOVE')}
            style={{ 
              padding: '6px 14px', borderRadius: '20px', border: '1px solid var(--border-color)', 
              background: filter === 'LOVE' ? 'var(--glow-primary)' : 'rgba(255,255,255,0.05)',
              color: 'white', cursor: 'pointer', transition: 'all 0.2s'
            }}>💕 연애만 보기</button>
          <button 
            onClick={() => setFilter('CAREER')}
            style={{ 
              padding: '6px 14px', borderRadius: '20px', border: '1px solid var(--border-color)', 
              background: filter === 'CAREER' ? 'var(--glow-primary)' : 'rgba(255,255,255,0.05)',
              color: 'white', cursor: 'pointer', transition: 'all 0.2s'
            }}>💼 취업/타이밍 보기</button>
        </div>
      )}

      <div className={styles.chatBubbleContainer}>
        <div className={styles.chatBubble}>
          <div className={styles.chatHeader}>
            <span className={styles.avatar}>💬</span>
            <span className={styles.sender}>이현:</span>
          </div>
          
          <div className={styles.chatContent} style={{ animation: 'fadeIn 0.5s ease-out' }}>
            {currentLoading ? (
              <div className={styles.typingIndicator}>
                <span>.</span><span>.</span><span>.</span> {loadingMessages[filter]}
              </div>
            ) : currentHtml ? (
               <div dangerouslySetInnerHTML={{ __html: currentHtml }} />
            ) : null}
          </div>
        </div>
      </div>

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

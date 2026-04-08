"use client";
import React, { useState, useMemo } from 'react';
import styles from './AnalysisReport.module.css';

interface Props {
  contentHtml?: string;
  isLoading?: boolean;
}

type FilterType = 'ALL' | 'LOVE' | 'CAREER';

export default function AnalysisReport({ contentHtml, isLoading }: Props) {
  const [filter, setFilter] = useState<FilterType>('ALL');

  const filteredContent = useMemo(() => {
    if (!contentHtml) return '';
    if (filter === 'ALL') return contentHtml;

    // 브라우저 환경에서 DOM 파싱을 통해 필터링
    if (typeof window !== 'undefined') {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = contentHtml;
      
      let html = '';
      const elements = Array.from(tempDiv.children);

      elements.forEach(el => {
        const text = el.textContent || '';
        
        if (filter === 'LOVE') {
          if (text.includes('연애') || text.includes('애정') || text.includes('결혼') || text.includes('부처') || text.includes('인연')) {
            html += el.outerHTML;
          }
        } else if (filter === 'CAREER') {
          if (text.includes('취업') || text.includes('재물') || text.includes('돈') || text.includes('직업') || text.includes('관운') || text.includes('타이밍')) {
            html += el.outerHTML;
          }
        }
      });

      if (!html) {
        return '<p style="color: var(--text-secondary); text-align: center; padding: 2rem 0;">해당 키워드를 포함하는 구체적인 풀이가 아직 생성되지 않았습니다. 전체 보기를 확인해주세요.</p>';
      }
      return html;
    }
    return contentHtml;
  }, [contentHtml, filter]);


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
            {isLoading ? (
              <div className={styles.typingIndicator}>
                <span>.</span><span>.</span><span>.</span> 명식과 기운을 읽고 있네...
              </div>
            ) : contentHtml ? (
               <div dangerouslySetInnerHTML={{ __html: filteredContent }} />
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

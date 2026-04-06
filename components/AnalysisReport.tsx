import React from 'react';
import styles from './AnalysisReport.module.css';

interface Props {
  contentHtml?: string;
  isLoading?: boolean;
}

export default function AnalysisReport({ contentHtml, isLoading }: Props) {
  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatBubbleContainer}>
        <div className={styles.chatBubble}>
          <div className={styles.chatHeader}>
            <span className={styles.avatar}>💬</span>
            <span className={styles.sender}>이현:</span>
          </div>
          
          <div className={styles.chatContent}>
            {isLoading ? (
              <div className={styles.typingIndicator}>
                <span>.</span><span>.</span><span>.</span> 명식과 기운을 읽고 있네...
              </div>
            ) : contentHtml ? (
               <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
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

import React from 'react';
import styles from './BaziChart.module.css';

const baziData = [
  { 
    title: "생시", 
    topGod: "정재", 
    stem: { ko: "갑", hanja: "甲", element: "목", type: "wood" }, 
    branch: { ko: "오", hanja: "午", element: "화", type: "fire" }, 
    bottomGod: "편관" 
  },
  { 
    title: "생일", 
    topGod: "일주", 
    stem: { ko: "신", hanja: "辛", element: "금", type: "metal" }, 
    branch: { ko: "사", hanja: "巳", element: "화", type: "fire" }, 
    bottomGod: "정관" 
  },
  { 
    title: "생월", 
    topGod: "정재", 
    stem: { ko: "갑", hanja: "甲", element: "목", type: "wood" }, 
    branch: { ko: "진", hanja: "辰", element: "토", type: "earth" }, 
    bottomGod: "정인" 
  },
  { 
    title: "생년", 
    topGod: "편관", 
    stem: { ko: "정", hanja: "丁", element: "화", type: "fire" }, 
    branch: { ko: "축", hanja: "丑", element: "토", type: "earth" }, 
    bottomGod: "편인" 
  },
];

const twelveGods = ["화개살", "천살", "지살", "년살"];

export default function BaziChart({ data }: { data: any }) {
  return (
    <div className={styles.whiteCardContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>{data?.name || "이승민"}님의 사주팔자</h2>
        <p className={styles.subtitle}>양력 1997.04.09</p>
      </div>

      <div className={styles.tableWrapper}>
        <div className={styles.grid}>
          {/* Header Row */}
          <div className={styles.rowLabel}></div>
          {baziData.map((col, idx) => (
            <div key={`header-${idx}`} className={styles.colHeader}>{col.title}</div>
          ))}

          {/* Top Gods */}
          <div className={styles.rowLabel}>십성</div>
          {baziData.map((col, idx) => (
            <div key={`topGod-${idx}`} className={styles.cell}>
              <div className={styles.darkPill}>{col.topGod}</div>
            </div>
          ))}

          {/* Stems */}
          <div className={styles.rowLabel}>천간</div>
          {baziData.map((col, idx) => (
            <div key={`stem-${idx}`} className={styles.cell}>
              <div className={`${styles.elementBox} ${styles[col.stem.type]}`}>
                <div className={styles.charGroup}>
                  <span className={styles.koChar}>{col.stem.ko}</span>
                  <span className={styles.hanjaChar}>{col.stem.hanja}</span>
                </div>
                <div className={styles.elementText}>{col.stem.element}</div>
              </div>
            </div>
          ))}

          {/* Branches */}
          <div className={styles.rowLabel}>지지</div>
          {baziData.map((col, idx) => (
            <div key={`branch-${idx}`} className={styles.cell}>
              <div className={`${styles.elementBox} ${styles[col.branch.type]}`}>
                <div className={styles.charGroup}>
                  <span className={styles.koChar}>{col.branch.ko}</span>
                  <span className={styles.hanjaChar}>{col.branch.hanja}</span>
                </div>
                <div className={styles.elementText}>{col.branch.element}</div>
              </div>
            </div>
          ))}

          {/* Bottom Gods */}
          <div className={styles.rowLabel}>십성</div>
          {baziData.map((col, idx) => (
            <div key={`bottomGod-${idx}`} className={styles.cell}>
              <div className={styles.darkPill}>{col.bottomGod}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.twelveGodsSection}>
        <span className={styles.twelveGodsLabel}>12신살</span>
        <div className={styles.tagsContainer}>
          {twelveGods.map((god, idx) => (
            <span key={idx} className={styles.blueTag}>{god}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

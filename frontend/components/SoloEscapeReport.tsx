"use client";
import React from "react";
import styles from "./SoloEscapeReport.module.css";

interface SoloMeeting {
  timing: string;
  place: string;
  situation: string;
  probability: string;
}

interface SoloPerson {
  gender: string;
  age_range: string;
  appearance: string;
  personality: string;
  occupation: string;
  image_prompt: string;
}

interface SoloScript {
  opening_line: string;
  follow_up: string;
  backup_line: string;
}

export interface SoloEscapeData {
  meeting: SoloMeeting;
  person: SoloPerson;
  script: SoloScript;
  motivation: string;
}

interface Props {
  data: SoloEscapeData;
  isLoading: boolean;
}

export default function SoloEscapeReport({ data, isLoading }: Props) {
  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingOrb}></div>
        <p className={styles.loadingText}>운명의 실타래를 풀고 있네...</p>
        <p className={styles.loadingSubtext}>사주에 새겨진 인연의 별자리를 읽고 있습니다</p>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>

      {/* ── 헤더 배너 ── */}
      <div className={styles.heroBanner}>
        <div className={styles.heroGlow}></div>
        <span className={styles.heroEmoji}>💘</span>
        <h2 className={styles.heroTitle}>운명적 만남 예언서</h2>
        <p className={styles.heroSubtitle}>이현이 명반에 새겨진 그대의 인연을 펼쳐 보이겠네</p>
      </div>

      {/* ── 만남 예측 카드 ── */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionIcon}>📍</span>
          <h3 className={styles.sectionTitle}>만남의 예언</h3>
          <span className={styles.probabilityBadge}>{data.meeting.probability}</span>
        </div>
        <div className={styles.meetingGrid}>
          <div className={styles.meetingCard}>
            <span className={styles.meetingLabel}>⏰ 시기</span>
            <p className={styles.meetingValue}>{data.meeting.timing}</p>
          </div>
          <div className={styles.meetingCard}>
            <span className={styles.meetingLabel}>🗺 장소</span>
            <p className={styles.meetingValue}>{data.meeting.place}</p>
          </div>
          <div className={styles.meetingCard} style={{ gridColumn: "1 / -1" }}>
            <span className={styles.meetingLabel}>🎬 상황</span>
            <p className={styles.meetingValue}>{data.meeting.situation}</p>
          </div>
        </div>
      </div>

      {/* ── 상대방 프로필 ── */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionIcon}>👤</span>
          <h3 className={styles.sectionTitle}>운명의 그 사람</h3>
        </div>
        <div className={styles.personContainer}>

          {/* 외모 묘사 텍스트 카드 */}
          <div className={styles.appearanceCard}>
            <div className={styles.appearanceIconRow}>
              <span className={styles.appearanceIconBig}>🌟</span>
            </div>
            <p className={styles.appearanceLabel}>외모 & 분위기</p>
            <p className={styles.appearanceDesc}>{data.person.appearance}</p>
          </div>

          {/* 프로필 정보 */}
          <div className={styles.personDetails}>
            <div className={styles.personBadgeRow}>
              <span className={styles.personBadge}>👤 {data.person.gender}</span>
              <span className={styles.personBadge}>🎂 {data.person.age_range}</span>
              <span className={styles.personBadge}>💼 {data.person.occupation}</span>
            </div>
            <div className={styles.personInfoBlock}>
              <p className={styles.personInfoLabel}>외모</p>
              <p className={styles.personInfoText}>{data.person.appearance}</p>
            </div>
            <div className={styles.personInfoBlock}>
              <p className={styles.personInfoLabel}>성격</p>
              <p className={styles.personInfoText}>{data.person.personality}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── 실전 대사 스크립트 ── */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionIcon}>💬</span>
          <h3 className={styles.sectionTitle}>실전 대사 스크립트</h3>
        </div>
        <div className={styles.scriptContainer}>
          <div className={styles.scriptStep}>
            <div className={styles.scriptStepNum}>1</div>
            <div className={styles.scriptContent}>
              <p className={styles.scriptLabel}>첫 마디</p>
              <p className={styles.scriptLine}>{data.script.opening_line}</p>
            </div>
          </div>
          <div className={styles.scriptArrow}>↓</div>
          <div className={styles.scriptStep}>
            <div className={styles.scriptStepNum}>2</div>
            <div className={styles.scriptContent}>
              <p className={styles.scriptLabel}>번호 받는 타이밍</p>
              <p className={styles.scriptLine}>{data.script.follow_up}</p>
            </div>
          </div>
          <div className={styles.scriptArrow}>⚡</div>
          <div className={`${styles.scriptStep} ${styles.scriptBackup}`}>
            <div className={styles.scriptStepNum}>B</div>
            <div className={styles.scriptContent}>
              <p className={styles.scriptLabel}>긴급 플랜 B</p>
              <p className={styles.scriptLine}>{data.script.backup_line}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── 동기부여 배너 ── */}
      <div className={styles.motivationBanner}>
        <div className={styles.motivationGlow}></div>
        <span className={styles.motivationIcon}>🔥</span>
        <p className={styles.motivationText}>{data.motivation}</p>
        <div className={styles.motivationFooter}>
          <span className={styles.motivationSigned}>— 운명 설계사 이현</span>
        </div>
      </div>

    </div>
  );
}

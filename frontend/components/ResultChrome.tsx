"use client";

import React, { useEffect, useState } from 'react';
import styles from './ResultChrome.module.css';

const DEADLINE_KEY = 'cg_offer_deadline';
const OFFER_MS = 24 * 60 * 60 * 1000; // 첫 방문 기준 24시간

/** 첫 방문 시각을 고정해 두고 그로부터 24시간을 센다. 새로고침해도 리셋되지 않는다. */
function readDeadline(): number {
  try {
    const saved = Number(localStorage.getItem(DEADLINE_KEY));
    if (saved > Date.now()) return saved;
    const fresh = Date.now() + OFFER_MS;
    localStorage.setItem(DEADLINE_KEY, String(fresh));
    return fresh;
  } catch {
    // 사생활 보호 모드 등에서 localStorage가 막힌 경우
    return Date.now() + OFFER_MS;
  }
}

function format(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = String(Math.floor(total / 3600)).padStart(2, '0');
  const m = String(Math.floor((total % 3600) / 60)).padStart(2, '0');
  const s = String(total % 60).padStart(2, '0');
  return `${h}:${m}:${s}`;
}

export function StickyCta({ onUnlock }: { onUnlock?: () => void }) {
  const [remain, setRemain] = useState<number | null>(null);

  useEffect(() => {
    const deadline = readDeadline();
    const tick = () => setRemain(deadline - Date.now());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const expired = remain !== null && remain <= 0;

  return (
    <div className={styles.ctaBar}>
      <span className={styles.timer}>
        <span aria-hidden="true">⏳</span>
        {/* 서버 렌더 시점엔 시간을 모르므로 자리만 잡아둔다 */}
        <b suppressHydrationWarning>{remain === null ? '--:--:--' : format(remain)}</b>
      </span>
      <button type="button" className={styles.ctaBtn} onClick={onUnlock}>
        {expired ? '전체 리포트 열기' : '지금 바로 확인하기'}
      </button>
    </div>
  );
}

export function ShareFab({ name }: { name?: string }) {
  const [copied, setCopied] = useState(false);

  // ponytail: 카카오 SDK는 앱키+도메인 등록이 필요해서 v1은 Web Share API로 대체.
  // 모바일에선 공유 시트에 카카오톡이 그대로 뜬다. FR-SH-03 붙일 때 교체.
  const share = async () => {
    const payload = {
      title: '천기누설',
      text: `${name ? `${name}님의 ` : ''}사주·자미두수 심화 분석 결과`,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(payload);
        return;
      }
      await navigator.clipboard.writeText(payload.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // 사용자가 공유 시트를 닫은 경우 — 조용히 무시
    }
  };

  return (
    <button type="button" className={styles.shareFab} onClick={share} aria-label="결과 공유하기">
      <span aria-hidden="true">💬</span>
      {copied ? '복사됨' : '공유'}
    </button>
  );
}

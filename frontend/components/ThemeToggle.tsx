"use client";

import React, { useEffect, useState } from 'react';
import styles from './ThemeToggle.module.css';

type Theme = 'light' | 'dark';

/** 저장된 선택이 없으면 시스템 설정을 따른다. */
function resolveTheme(): Theme {
  try {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    // localStorage가 막힌 환경 — 시스템 설정으로 떨어진다
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => setTheme(resolveTheme()), []);

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {
      // 저장이 안 돼도 이번 세션 동안은 적용된다
    }
  };

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggle}
      aria-label={theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'}
      title={theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'}
    >
      {/* 마운트 전에는 서버와 값이 다를 수 있어 자리만 잡아둔다 */}
      <span suppressHydrationWarning>{theme === null ? '◐' : theme === 'dark' ? '☀️' : '🌙'}</span>
    </button>
  );
}

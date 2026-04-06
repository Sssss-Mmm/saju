import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './InputForm.module.css';

export default function InputForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    year: '1990',
    month: '1',
    day: '1',
    time: '12',
    gender: 'M',
    isLunar: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams(formData as any).toString();
    router.push(`/result?${query}`);
  };

  return (
    <form className={`glass-panel ${styles.formContainer}`} onSubmit={handleSubmit}>
      <div className={styles.inputGroup}>
        <label>이름</label>
        <input name="name" type="text" value={formData.name} onChange={handleChange} placeholder="홍길동" required />
      </div>

      <div className={styles.row}>
        <div className={styles.inputGroup}>
          <label>성별</label>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="M">남성</option>
            <option value="F">여성</option>
          </select>
        </div>
        <div className={styles.inputGroup} style={{ flexDirection: 'row', alignItems: 'center', gap: '10px', marginTop: '24px' }}>
          <input type="checkbox" id="isLunar" name="isLunar" checked={formData.isLunar} onChange={handleChange} />
          <label htmlFor="isLunar" style={{ margin: 0 }}>윤달(음력)</label>
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.inputGroup}>
          <label>출생 연도</label>
          <input name="year" type="number" min="1900" max="2100" value={formData.year} onChange={handleChange} required />
        </div>
        <div className={styles.inputGroup}>
          <label>월</label>
          <input name="month" type="number" min="1" max="12" value={formData.month} onChange={handleChange} required />
        </div>
        <div className={styles.inputGroup}>
          <label>일</label>
          <input name="day" type="number" min="1" max="31" value={formData.day} onChange={handleChange} required />
        </div>
      </div>

      <div className={styles.inputGroup}>
        <label>태어난 시간 (0~23시)</label>
        <input name="time" type="number" min="0" max="23" value={formData.time} onChange={handleChange} required />
      </div>

      <button type="submit" className={styles.submitBtn}>
        명반 분석 시작
      </button>
    </form>
  );
}

'use client'
import styles from './WeddingInvitation.module.css'
import Image from 'next/image'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'

function ScrollSection({ children }: { children: React.ReactNode }) {
  const controls = useAnimation()
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.2 })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    } else {
      controls.start('hidden') // 이 줄을 넣으면 다시 숨겼다가 또 보여줄 수 있음
    }
  }, [inView, controls])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.div>
  )
}

export default function WeddingInvitation() {
  return (
    <div className={styles.container}>
      <section className={styles.cover}>
        <h1 className={styles.coverTitle}>지훈 ❤️ 수아</h1>
        <p className={styles.coverSubtitle}>저희 결혼합니다</p>
      </section>

      <ScrollSection>
        <div className={styles.card}>
          <p>2025.10.18</p>
          <p>SAT PM 13:00</p>
          <p>서울 라마다호텔 2층 그랜드홀</p>
          <p style={{ marginTop: '10px', fontWeight: 'bold' }}>지훈 | 수아</p>
        </div>
      </ScrollSection>

      <ScrollSection>
        <div className={styles.quote}>
          <p>예쁜 연가에 들떴다.<br />우리는 언제나 손을 잡고 있게 될 것이다.</p>
          <p style={{ fontSize: '12px', marginTop: '5px' }}>《연인》, 이예체</p>
        </div>
      </ScrollSection>

      <ScrollSection>
        <div className={styles.inviteMessage}>
          <p className={styles.highlight}>소중한 분들을 초대합니다.</p>
          <p>작은 인연으로 만나 연인이 된 저희가</p>
          <p>이제는 더욱 단단한 인연을 맺고자</p>
          <p>저희 두 사람 결혼합니다.</p>
          <p style={{ marginTop: '10px' }}>귀한 걸음으로 축하해 주시면<br />더 없는 기쁨으로 간직하겠습니다.</p>
        </div>
      </ScrollSection>

      <ScrollSection>
        <div className={styles.inviteMessage}>
          <h3>오시는 길</h3>
          <a href="https://maps.google.com?q=라마다호텔 서울" target="_blank">구글지도 열기</a>
        </div>
      </ScrollSection>

      <ScrollSection>
        <div className={styles.inviteMessage}>
          <h3>우리 사진</h3>
        </div>
        <div className={styles.gallery}>
          <Image src="/images/photo1.jpg" alt="gallery-1" fill/>
          <Image src="/images/photo2.jpg" alt="gallery-2" fill/>
          <Image src="/images/photo3.jpg" alt="gallery-3" fill/>
        </div>
      </ScrollSection>

      <ScrollSection>
        <div className={styles.inviteMessage}>
          <h3>참석 여부</h3>
          <a href="https://forms.gle/your-form-url" target="_blank">RSVP 하기</a>
        </div>
      </ScrollSection>

      <footer className={styles.footer}>
        © 2025 Jihun & Sua Wedding Invitation
      </footer>
    </div>
  )
}

'use client'

import { useEffect } from 'react'

// ✅ Kakao 타입 직접 선언 (간단 버전)
declare global {
    interface Window {
      Kakao: {
        init: (appKey: string) => void
        isInitialized: () => boolean
        Share: {
          sendDefault: (params: {
            objectType: string
            content: {
              title: string
              description: string
              imageUrl: string
              link: {
                mobileWebUrl: string
                webUrl: string
              }
            }
            buttons: Array<{
              title: string
              link: {
                mobileWebUrl: string
                webUrl: string
              }
            }>
          }) => void
        }
      }
    }
  }

export default function KakaoShareButton() {
  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init('YOUR_APP_KEY') // 카카오 JavaScript 키
    }
  }, [])

  const handleClick = () => {
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: '은상 💝 펀 결혼식에 초대합니다',
        description: '2027년 4월 10일 토요일 오후 12시, 신도림 웨딩시티 8층 스타티스홀',
        imageUrl: 'https://fern-eunsang.vercel.app/photo1.png',
        link: {
          mobileWebUrl: 'https://fern-eunsang.vercel.app',
          webUrl: 'https://fern-eunsang.vercel.app',
        },
      },
      buttons: [
        {
          title: '청첩장 보기',
          link: {
            mobileWebUrl: 'https://fern-eunsang.vercel.app',
            webUrl: 'https://fern-eunsang.vercel.app',
          },
        },
      ],
    })
  }

  return (
    <button
      onClick={handleClick}
      style={{
        backgroundColor: '#FEE500',
        color: '#000',
        border: 'none',
        padding: '10px 20px',
        fontWeight: 'bold',
        borderRadius: '10px',
        cursor: 'pointer',
        marginTop: '20px',
      }}
    >
      💛 카카오톡으로 공유하기
    </button>
  )
}

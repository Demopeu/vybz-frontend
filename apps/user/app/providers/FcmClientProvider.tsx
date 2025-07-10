"use client";
import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";

function useFcmToken(userUuid?: string) {
  const isRegistering = useRef(false);

  useEffect(() => {
    if (!userUuid || isRegistering.current) return;
    
    const savedToken = localStorage.getItem('fcmToken');
    if (savedToken) {
      console.log('✅ 이미 FCM 토큰이 저장되어 있습니다:', savedToken);
      return;
    }

    isRegistering.current = true;
    
    (async () => {
      try {
        const { initializeApp } = await import('firebase/app');
        const { getMessaging, getToken, onMessage } = await import('firebase/messaging');
        const firebaseConfig = {
          apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
          authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
          storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
          messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
          appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
          measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID!,
        };
        const app = initializeApp(firebaseConfig);
        const messaging = getMessaging(app);
        
        const currentToken: string | null = await getToken(messaging, {
          vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
        });
        
        if (currentToken) {
          console.log('✅ FCM 토큰 생성됨:', currentToken);
          localStorage.setItem('fcmToken', currentToken);
          
          const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/notification-service/api/v1/fcm-token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ receiverUuid: userUuid, token: currentToken })
          });
          
          if (response.ok) {
            console.log('✅ FCM 토큰이 서버에 성공적으로 등록되었습니다');
          } else {
            console.error('❌ FCM 토큰 서버 등록 실패:', response.status);
          }
        } else {
          console.log('❌ FCM 토큰 생성 실패 (권한 미허용)');
        }

        // 포그라운드 메시지 수신 핸들러 추가 (busker 레퍼런스 스타일)
        onMessage(messaging, (payload) => {
          const notificationTitle = payload.notification?.title || payload.data?.title;
          const notificationOptions = {
            body: payload.notification?.body || payload.data?.body,
            icon: '/vybz_icon_192.png',
          };
          if (notificationTitle) {
            new Notification(notificationTitle, notificationOptions);
          }
        });
      } catch (err: unknown) {
        console.error('🚨 FCM 토큰 요청 실패:', err);
      } finally {
        isRegistering.current = false;
      }
    })();
  }, [userUuid]);
}

export default function FcmClientProvider() {
  const { data: session } = useSession();
  const userUuid = session?.user?.userUuid;
  useFcmToken(userUuid);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/firebase-messaging-sw.js')
        .then((registration) => {
          console.log('✅ Service Worker 등록 성공:', registration);
        })
        .catch((error) => {
          console.error('❌ Service Worker 등록 실패:', error);
        });
    }
  }, []);

  return null;
} 
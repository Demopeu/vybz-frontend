import { VideoCarouselDataType } from "@/types/ResponseDataTypes";
import { LiveFreeViewType, RealsUrlDataType } from "@/types/ResponseDataTypes";

export const videoSlideData: VideoCarouselDataType[] = [
    {
      id: "1",
      videoSrc: "/background/intro.mp4",
      thumbnailSrc: "/background/logopage1.jpg"
    },
    {
      id: "2",
      videoSrc: "/background/intro.mp4",
      thumbnailSrc: "/background/logopage1.jpg",
    },
    {
      id: "3",
      videoSrc: "/background/intro.mp4",
      thumbnailSrc: "/background/logopage1.jpg"
    },
  ]

export const liveFreeViewData: LiveFreeViewType[] = [
    {
      id: "1",
      buskerId: "busker1",
      buskerName: "카리나",
      liveName: "우리동네 아이돌",
      buskerProfileImage: "/buskerUrl.jpg",
      isMembership: true,
    },
    {
      id: "2",
      buskerId: "busker2",
      buskerName: "윈터",
      liveName: "겨울 특집 라이브",
      buskerProfileImage: "/buskerUrl.jpg",
      isMembership: true,
    },
    {
      id: "3",
      buskerId: "busker3",
      buskerName: "닝닝",
      liveName: "신나는 공연",
      buskerProfileImage: "/buskerUrl.jpg",
      isMembership: false,
    },
  ]

export const reelsVideoData: RealsUrlDataType[] = [
    {
      realsId: 1,
      realsUrl: "/background/intro.mp4",
      realsThumbnailUrl: "/background/intro.mp4",
      realsDescription: "반갑습니다",
      buskerId: "1",
      buskerName: "카리나",
      buskerProfileImage: "/buskerUrl.jpg",
      realsLikeCount: 830000,
      realsCommentCount: 551,
    },
    {
      realsId: 2,
      realsUrl: "/background/intro.mp4",
      realsThumbnailUrl: "/background/intro.mp4",
      realsDescription: "안녕하세요",
      buskerId: "2",
      buskerName: "윈터",
      buskerProfileImage: "/buskerUrl.jpg",
      realsLikeCount: 10,
      realsCommentCount: 10,
    },
    {
      realsId: 3,
      realsUrl: "/background/intro.mp4",
      realsThumbnailUrl: "/background/intro.mp4",
      realsDescription: "안녕하세요",
      buskerId: "3",
      buskerName: "닝닝",
      buskerProfileImage: "/buskerUrl.jpg",
      realsLikeCount: 10,
      realsCommentCount: 10,
    },
    {
      realsId: 4,
      realsUrl: "/background/intro.mp4",
      realsThumbnailUrl: "/background/intro.mp4",
      realsDescription: "안녕하세요",
      buskerId: "4",
      buskerName: "카리나",
      buskerProfileImage: "/buskerUrl.jpg",
      realsLikeCount: 10,
      realsCommentCount: 10,
    },
    {
      realsId: 5,
      realsUrl: "/background/intro.mp4",
      realsThumbnailUrl: "/background/intro.mp4",
      realsDescription: "안녕하세요",
      buskerId: "5",
      buskerName: "카리나",
      buskerProfileImage: "/buskerUrl.jpg",
      realsLikeCount: 10,
      realsCommentCount: 10,
    },
  ]
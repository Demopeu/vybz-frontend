import { VideoCarouselDataType } from "@/types/ResponseDataTypes";
import { LiveFreeViewType } from "@/types/ResponseDataTypes";

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
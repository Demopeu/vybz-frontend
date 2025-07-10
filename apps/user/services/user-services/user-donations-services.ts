'use server';

import {
  HistoryDataType,
  UseHistoryDataType,
  UseHistoryDataItem,
} from '@/types/ResponseDataTypes';

export async function fetchHistory(page: number): Promise<{
  data: HistoryDataType;
}> {
  const dummyPerPage = 3;
  const allData: UseHistoryDataType[] = [
    {
      id: '1',
      date: '2025-06-15',
      vticketCount: 10000,
      buskerName: '카리나',
      buskerProfileImage: '/buskerUrl.jpg',
      buskerUuid: 'sub1',
      message: '카리나님 항상 응원합니다.',
    },
    {
      id: '2',
      date: '2025-06-14',
      vticketCount: 20000,
      buskerName: '카리나',
      buskerProfileImage: '/buskerUrl.jpg',
      buskerUuid: 'sub1',
      message: '카리나님 항상 응원합니다.',
    },
    {
      id: '3',
      date: '2025-06-13',
      vticketCount: 30000,
      buskerName: '카리나',
      buskerProfileImage: '/buskerUrl.jpg',
      buskerUuid: 'sub1',
      message: '카리나님 항상 응원합니다.',
    },
    {
      id: '4',
      date: '2025-06-12',
      vticketCount: 40000,
      buskerName: '카리나',
      buskerProfileImage: '/buskerUrl.jpg',
      buskerUuid: 'sub1',
      message: '카리나님 항상 응원합니다.',
    },
    {
      id: '5',
      date: '2025-06-11',
      vticketCount: 50000,
      buskerName: '카리나',
      buskerProfileImage: '/buskerUrl.jpg',
      buskerUuid: 'sub1',
      message: '카리나님 항상 응원합니다.',
    },
  ];

  const totalPages = Math.ceil(allData.length / dummyPerPage);
  const start = (page - 1) * dummyPerPage;
  const end = start + dummyPerPage;

  const paginated = allData.slice(start, end);

  // UseHistoryDataType을 UseHistoryDataItem으로 변환
  const paginatedAsDataItem: UseHistoryDataItem[] = paginated.map((item) => ({
    buskerUuid: item.buskerUuid,
    nickname: item.buskerName,
    profileImageUrl: item.buskerProfileImage,
    ticketCount: item.vticketCount,
    message: item.message,
    donatedAt: item.date,
    date: item.date,
    vticketCount: item.vticketCount,
    id: item.id,
  }));

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          type: 'use',
          data: paginatedAsDataItem,
          page,
          size: dummyPerPage,
          totalCount: allData.length,
          totalPages,
          pageNumList: Array.from({ length: totalPages }, (_, i) => i + 1),
          prev: page > 1,
          next: page < totalPages,
          prevPage: page > 1 ? page - 1 : 0,
          nextPage: page < totalPages ? page + 1 : totalPages,
          currentPage: page,
        },
      });
    }, 300);
  });
}

'use client';

import { useState, useEffect, useCallback } from 'react';
import TabButtonBox from '@/components/common/button/TabButtonBox';
import HistoryList from '@/components/donations/HistoryList';
import { fetchPaymentHistory } from '@/services/payment-services/payment-services';
import { fetchDonationHistory } from '@/services/support-services/support-services';
import { HistoryDataType } from '@/types/ResponseDataTypes';

interface DonationsClientProps {
  userUuid: string;
}

export default function DonationsClient({ userUuid }: DonationsClientProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [historyData, setHistoryData] = useState<HistoryDataType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = useCallback(
    async (page: number = 1) => {
      if (!userUuid) return;

      setLoading(true);
      setError(null);

      try {
        if (activeTab === 0) {
          // 사용 내역
          try {
            const response = await fetchDonationHistory(userUuid, page, 10);
            const formattedData: HistoryDataType = {
              type: 'use',
              data: response.dtoList || [],
              page: response.current || page,
              size: response.requestPageDTO?.size || 10,
              totalCount: response.totalCount || 0,
              totalPages: response.totalPage || 1,
              pageNumList: response.pageNumList || [1],
              prev: response.prev || false,
              next: response.next || false,
              prevPage: response.prevPage || 0,
              nextPage: response.nextPage || 0,
              currentPage: response.current || page,
            };
            setHistoryData(formattedData);
          } catch (e: unknown) {
            // 후원 내역이 없는 경우 빈 데이터로 처리
            const errorMessage = e instanceof Error ? e.message : '알 수 없는 오류';
            const emptyData: HistoryDataType = {
              type: 'use',
              data: [],
              page: page,
              size: 10,
              totalCount: 0,
              totalPages: 1,
              pageNumList: [1],
              prev: false,
              next: false,
              prevPage: 0,
              nextPage: 0,
              currentPage: page,
            };
            setHistoryData(emptyData);

            // 데이터가 없다는 메시지 설정 (404 에러일 경우)
            if (errorMessage.includes('후원 내역이 존재하지 않습니다')) {
              setError('아직 후원 내역이 없습니다.');
            } else {
              setError('데이터를 불러오는 중 문제가 발생했습니다.');
              console.error('사용 내역 로딩 실패:', e);
            }
          }
        } else {
          // 구매 내역
          try {
            const response = await fetchPaymentHistory(userUuid, page, 10);
            const formattedData: HistoryDataType = {
              type: 'purchase',
              data: response.dtoList || [],
              page: response.current || page,
              size: response.requestPageDTO?.size || 10,
              totalCount: response.totalCount || 0,
              totalPages: response.totalPage || 1,
              pageNumList: response.pageNumList || [1],
              prev: response.prev || false,
              next: response.next || false,
              prevPage: response.prevPage || 0,
              nextPage: response.nextPage || 0,
              currentPage: response.current || page,
            };
            setHistoryData(formattedData);
          } catch (e: unknown) {
            // 구매 내역이 없는 경우 빈 데이터로 처리
            const errorMessage = e instanceof Error ? e.message : '알 수 없는 오류';
            const emptyData: HistoryDataType = {
              type: 'purchase',
              data: [],
              page: page,
              size: 10,
              totalCount: 0,
              totalPages: 1,
              pageNumList: [1],
              prev: false,
              next: false,
              prevPage: 0,
              nextPage: 0,
              currentPage: page,
            };
            setHistoryData(emptyData);

            // 데이터가 없다는 메시지 설정
            if (errorMessage.includes('구매 내역이 존재하지 않습니다')) {
              setError('아직 구매 내역이 없습니다.');
            } else {
              setError('데이터를 불러오는 중 문제가 발생했습니다.');
              console.error('구매 내역 로딩 실패:', e);
            }
          }
        }
      } catch (error: unknown) {
        console.error('데이터 로딩 실패:', error);
        setError('데이터를 불러오는 중 문제가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    },
    [userUuid, activeTab]
  );

  useEffect(() => {
    if (userUuid) {
      fetchData(currentPage);
    }
  }, [userUuid, activeTab, currentPage, fetchData]);

  const handleTabChange = (tabIndex: number) => {
    setActiveTab(tabIndex);
    setCurrentPage(1);
    setError(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <>
        <TabButtonBox
          labels={['사용 내역', '구매 내역']}
          activeTab={activeTab}
          onTabChange={(tab) =>
            handleTabChange(typeof tab === 'number' ? tab : 0)
          }
        />
        <div className="flex justify-center items-center h-40">
          <div className="text-lg">로딩 중...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <TabButtonBox
        labels={['사용 내역', '구매 내역']}
        activeTab={activeTab}
        onTabChange={(tab) =>
          handleTabChange(typeof tab === 'number' ? tab : 0)
        }
      />

      {error ? (
        <div className="flex flex-col justify-center items-center h-40 text-center">
          <div className="text-lg mb-2">{error}</div>
          <div className="text-sm text-gray-400">
            {activeTab === 0
              ? '버스커에게 V티켓을 후원하면 내역이 이곳에 표시됩니다.'
              : 'V티켓을 구매하면 내역이 이곳에 표시됩니다.'}
          </div>
        </div>
      ) : historyData && historyData.data.length > 0 ? (
        <HistoryList
          historyData={historyData}
          onPageChange={handlePageChange}
        />
      ) : historyData ? (
        <div className="flex flex-col justify-center items-center h-40 text-center">
          <div className="text-lg mb-2">
            {activeTab === 0
              ? '후원 내역이 없습니다.'
              : '구매 내역이 없습니다.'}
          </div>
          <div className="text-sm text-gray-400">
            {activeTab === 0
              ? '버스커에게 V티켓을 후원하면 내역이 이곳에 표시됩니다.'
              : 'V티켓을 구매하면 내역이 이곳에 표시됩니다.'}
          </div>
        </div>
      ) : null}
    </>
  );
}

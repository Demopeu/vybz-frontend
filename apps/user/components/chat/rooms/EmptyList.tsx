export default function EmptyList() {
  return (
    <div className="flex flex-col justify-center items-center h-96 mx-auto">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            채팅방을 불러올 수 없습니다
          </h3>
          <p className="text-sm text-gray-500">
            채팅방 정보가 없거나 사용자 정보를 찾을 수 없습니다.
          </p>
        </div>
      </div>
    </div>
  );
}

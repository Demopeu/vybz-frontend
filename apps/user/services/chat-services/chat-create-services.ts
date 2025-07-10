'use server';
import { instance } from '@/utils/requestHandler';

export async function createChatRoom(buskerUuid: string, userUuid: string): Promise<boolean> {
    try {
        const response = await instance.post('/chat-service/api/v1/chat-room', {
            body: JSON.stringify({
                senderUuid: buskerUuid,
                receiverUuid: userUuid
            }),
        });
        return response.isSuccess || false;
    } catch (error) {
        console.error('Error in createChatRoom:', error);
        return false;
    }
}

import api from "./axios";

const ENDPOINT = '/buckets';
const todoApi = {
  // 투두 전체 조회
  getTodos: async (bucketId) => {
    const response = await api.get(`${ENDPOINT}/${bucketId}/todos`);
    return response.data;
  },

  // 투두 생성
  createTodo: async (bucketId) => {
    const response = await api.post(`${ENDPOINT}/${bucketId}/todos`);
    return response.data;
  },

  // 투두 수정
  updateTodo: async (bucketId, todoId, formData) => {
    const response = await api.patch(`${ENDPOINT}/${bucketId}/todos/${todoId}`, formData);
    return response.data;
  },

  // 투두 삭제
  deleteTodo: async (bucketId, todoId) => {
    const response = await api.delete(`${ENDPOINT}/${bucketId}/todos/${todoId}`);
    return response;
  },
}

export default todoApi;
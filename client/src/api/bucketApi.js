import api from "./axios";

const ENDPOINT = '/buckets';
const bucketApi = {
  // 버킷 전체 조회
  getBuckets: async () => {
    const response = await api.get(ENDPOINT);
    return response.data;
  },

  // 버킷 생성 (empty)
  createBucket: async () => {
    const response = await api.post(ENDPOINT);
    return response.data;
  },

  // 버킷 수정
  updateBucket: async (bucketId, formData) => {
    const response = await api.patch(`${ENDPOINT}/${bucketId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return response.data;
  },

  // 버킷 삭제
  deleteBucket: async (bucketId) => {
    const response = await api.delete(`${ENDPOINT}/${bucketId}`);
    return response;
  },
};

export default bucketApi;
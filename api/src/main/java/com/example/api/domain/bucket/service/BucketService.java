package com.example.api.domain.bucket.service;

import com.example.api.domain.bucket.dto.requestDto.BucketRequestDto;
import com.example.api.domain.bucket.dto.responseDto.BucketResponseDto;
import com.example.api.domain.bucket.dto.responseDto.BucketUpdateResponseDto;
import com.example.api.domain.bucket.entity.Bucket;
import com.example.api.domain.bucket.repository.BucketRepository;
import com.example.api.domain.todo.entity.Todo;
import com.example.api.domain.todo.repository.TodoRepository;
import com.example.api.domain.todo.service.TodoService;
import com.example.api.domain.user.entity.User;
import com.example.api.global.exception.ResourceNotFoundException;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BucketService {

    private final BucketRepository bucketRepository;
    private final S3Service s3Service;
    private final TodoRepository todoRepository;
    private final TodoService todoService;

    public List<BucketResponseDto> getBuckets(User user) {
        return bucketRepository.findAllByUserId(user.getId()).stream()
            .map(BucketResponseDto::from)
            .toList();
    }

    // 버킷 생성
    @Transactional
    public BucketResponseDto createBucket(User user) {
        Bucket emptyBucket = bucketRepository.save(new Bucket(null, null, user));

        todoService.createTodo(emptyBucket.getId());

        List<Todo> todos = todoRepository.findFirstByBucketId(emptyBucket.getId());
        emptyBucket.updateFinalTodoId(todos.get(0).getId());

        return BucketResponseDto.from(emptyBucket);
    }

    // 버킷 수정
    @Transactional
    public BucketUpdateResponseDto updateBucket(Long id, BucketRequestDto requestDto, User user) {
        // 수정할 버킷 조회
        Bucket bucket = bucketRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("일치하는 버킷을 찾을 수 없습니다."));

        // 특정 버킷의 오름차순 정렬된 투두리스트 목록을 받아옴
        List<Todo> todos = todoRepository.findFirstByBucketId(id);

        // 버킷 수정 시 작성한 제목을 고정 투두의 내용으로 입력
        todos.get(0).update(requestDto.getTitle() + " 완료", false);

        // 이미지 파일을 첨부하지 않는 경우
        if (requestDto.getFile() == null) {
            bucket.update(requestDto.getTitle(), bucket.getImageUrl(), bucket.getS3Key(), null);

            return BucketUpdateResponseDto.from(bucket);
        }

        // 이미지 파일을 첨부한 경우 (기존 이미지 삭제 후 업로드)
        if (bucket.getS3Key() != null) {
            // 기존 이미지 삭제
            s3Service.deleteFile(bucket.getS3Key());
        }

        // S3 파일 업로드
        // S3Service uploadFile() 호출
        Map<String, String> uploadResult = s3Service.uploadFile(requestDto.getFile());

        String imageUrl = uploadResult.get("imageUrl");
        String s3Key = uploadResult.get("s3Key");

        // 수정된 제목, 이미지 파일을 보내서 버킷 업데이트
        bucket.update(requestDto.getTitle(), imageUrl, s3Key,
            requestDto.getFile().getOriginalFilename());

        return BucketUpdateResponseDto.from(bucket);
    }

    // 버킷 이미지 삭제
    @Transactional
    public void deleteBucketImage(Long id) {
        // 이미지를 삭제할 버킷 조회
        Bucket bucket = bucketRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("일치하는 버킷을 찾을 수 없습니다."));

        // S3에서 기존 이미지 삭제
        s3Service.deleteFile(bucket.getS3Key());

        // DB에서 이미지 삭제
        bucket.update(null, null, null);
    }

    // 버킷 삭제
    @Transactional
    public void deleteBucket(Long id, User user) {
        Bucket bucket = bucketRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("일치하는 버킷을 찾을 수 없습니다."));

        // 1. 투두 데이터 조회
        List<Todo> todos = todoRepository.findByBucketId(id);

        // 2. 투두 데이터 삭제
        if (!todos.isEmpty()) {
            todoRepository.deleteAll(todos);
        }

        // S3에서 기존 이미지 삭제
        if (bucket.getS3Key() != null) {
            s3Service.deleteFile(bucket.getS3Key());
        }

        bucketRepository.delete(bucket);
    }
}

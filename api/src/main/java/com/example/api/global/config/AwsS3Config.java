package com.example.api.global.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;

@Configuration
public class AwsS3Config {

    @Value("${REGION}")
    private String REGION;

    @Value("${ACCESS_KEY}")
    private String ACCESS_KEY;

    @Value("${SECRET_KEY}")
    private String SECRET_KEY;

    @Bean
    public S3Client s3Client() {
        // AWS 자격 증명(Credentials) 생성
        // 액세스 키와 시크릿 키가 필요하다.
        StaticCredentialsProvider credential = StaticCredentialsProvider.create(
            AwsBasicCredentials.create(ACCESS_KEY, SECRET_KEY)
        );

        return S3Client.builder()
            .region(Region.of(REGION))
            .credentialsProvider(credential)
            .build();
    }
}

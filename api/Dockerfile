# Build stage
FROM openjdk:21-jdk-slim AS build
WORKDIR /app

# 의존성 캐싱 레이어
COPY build.gradle settings.gradle ./
COPY gradle ./gradle
COPY gradlew ./gradlew
RUN chmod +x gradlew
RUN ./gradlew dependencies --no-daemon

# 소스 코드 복사 및 빌드
COPY src ./src
RUN ./gradlew build --no-daemon -x test

# Run stage
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# 빌드된 jar 파일 복사
COPY --from=build /app/build/libs/*.jar app.jar

# 포트 설정
EXPOSE 8080

# 실행 명령
ENTRYPOINT ["java", "-jar", "app.jar"]

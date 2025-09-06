# =========================
# Stage 1: Build with Gradle
# =========================
FROM gradle:8.14.3-jdk17 AS builder
WORKDIR /app

# Copy Gradle wrapper and build files first (for caching)
COPY gradlew .
COPY gradle ./gradle
COPY build.gradle settings.gradle ./

# Make gradlew executable
RUN chmod +x ./gradlew

# Download dependencies (cached layer)
RUN ./gradlew dependencies --no-daemon || return 0

# Copy source code
COPY src ./src

# Build the Spring Boot fat JAR
RUN ./gradlew bootJar --no-daemon

# =========================
# Stage 2: Run the application
# =========================
FROM eclipse-temurin:17-jdk
WORKDIR /app

# Copy built JAR from builder stage
COPY --from=builder /app/build/libs/*.jar app.jar

# Expose port (Render injects $PORT at runtime)
EXPOSE 8080
ENV PORT=8080

# Run the Spring Boot app
ENTRYPOINT ["java", "-jar", "app.jar"]

# Step 1: Build the application using Gradle
FROM gradle:8.4.0-jdk17 AS builder
WORKDIR /app

# Copy Gradle wrapper and build files first (for caching)
COPY gradlew .
COPY gradle ./gradle
COPY build.gradle settings.gradle ./

# Download dependencies (this step gets cached)
RUN ./gradlew dependencies --no-daemon || return 0

# Copy the source code
COPY src ./src

# Build the JAR file
RUN ./gradlew bootJar --no-daemon

# Step 2: Run the application using a slim JDK image
FROM eclipse-temurin:17-jdk-slim
WORKDIR /app

# Copy JAR from builder stage
COPY --from=builder /app/build/libs/*.jar app.jar

# Expose port (Render will inject $PORT)
EXPOSE 8080
ENV PORT=8080

# Run the app
ENTRYPOINT ["java","-jar","app.jar"]

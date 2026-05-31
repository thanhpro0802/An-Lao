# Stage 1: Build stage
FROM maven:3.9.6-eclipse-temurin-21-alpine AS builder
WORKDIR /app
COPY pom.xml .
# Download dependencies first (cached layer)
RUN mvn dependency:go-offline -B
COPY src ./src
# Build the application jar file
RUN mvn package -DskipTests

# Stage 2: Runtime stage
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Create a non-root system user and group for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy the packaged jar from the build stage
COPY --from=builder /app/target/anlao-api-0.0.1-SNAPSHOT.jar app.jar

# Setup logs folder with correct permissions for the non-root user
RUN mkdir -p logs && chown -R appuser:appgroup /app

USER appuser
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar", "--spring.profiles.active=prod"]

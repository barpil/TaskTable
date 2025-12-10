#Builder do zbudowania projektu maven
FROM maven:3.9.6-eclipse-temurin-21 AS builder
WORKDIR /app

COPY pom.xml .
COPY src ./src

#Budowanie jara
RUN mvn clean package -DskipTests

#Runner do uruchamiania po zbudowaniu
FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app
#Skopiowanie wyniku buildera
COPY --from=builder /app/target/*.jar app.jar
ENV SPRING_PROFILES_ACTIVE=prod
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
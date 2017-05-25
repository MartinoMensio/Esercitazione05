#!/bin/sh

# Run mongo
docker start mongodb

# Compile project
mvn install -DskipTests

# Run the app
java -jar target/MongoRest-0.0.1-SNAPSHOT.jar

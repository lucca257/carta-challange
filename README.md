# carta take home

## 📦 Installation & Setup
### 🐳 Running with Docker

##### Prerequisites
- Docker (version 20.10 or later)
- Node.js (version 20 or later)

##### Starting the Projects
To start both the backend and frontend projects using Docker, run the following command:

```
docker-compose up
```

This will build and start the containers for both projects. 

The frontend will be available at http://localhost:5173/.

##### Backend Setup
To run the cli, you need to access the backend container and run a command. Here are three examples of running commands inside the backend container:  
Access the backend container:  

```
docker exec -it <container_id> sh
```
Run the desired command inside the container:
```
yarn run vesting example.csv 2020-04-01
yarn run vesting another_example.csv 2021-05-01
yarn run vesting sample.csv 2022-06-01
```

the command is 
```
yarn run vesting <file_name> <date> <precision>
```

where file_name is the name of the file to be processed, date is the date to be used as the reference date, and precision (optional) is the number of decimal places to be used in the output.

# 📌 Backend

### 📖 Overview
The backend was made with javascript using Node.js without libraries.

The file is read using a stream to handle large files efficiently, processing each line individually to avoid high memory consumption

### 🛠 Design Decisions
- Modular Architecture: Each module (e.g., vesting, cli, utils) is isolated to ensure scalability and maintainability.
- Use of DTOs: The use of DTOs ensures that the data is validated before being processed.
- Use of Entities: The use of entities ensures that the data is validated before being processed.
- Use of Actions: The use of actions ensures that the code is organized and easy to maintain.
- Developed using TDD: The code was developed using TDD to ensure the quality of the code and to make it easier to maintain and scale.

All this principels follwing the SOLID principles.

### 📝 Assumptions & Interpretations

- Command: need pass at leat two params to run the command, in the specific order <file-name> <date> 
- Command file-name: will validate if the file is CSV, other format is not allowed.
- Command date: will validate if date is in the correct format 2020-04-01, if not will throw an error.
- File content: the file content should be in CSV, other type are the row should have at least 6 parts to be processed if not, will be ignored.
- When happen a invalid calculation, i will ignore the calculation and return quantity 0.
- When the row date is after the filter date, the shares will be ignored, returning 0 quantity.
- I have assumed that the precision is optional, and when not passed i will handle the number as an integer. Negative precision or precision above 6 is not allowed.

### 🚀 Potential Improvements

- Processing the file in smaller batches to reduce memory usage
- use worker threads to parallelize the processing of different parts of the file, and distributing the processing across multiple machines to handle extremely large files efficiently.

# 📌 Front

### 📖 Overview

### 🛠 Design Decisions

### 📝 Assumptions & Interpretations


### 🚀 Potential Improvements
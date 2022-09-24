# Helsinki city bike app

Web application to display bike's journeys and list of station in Helsinki, which was extracted from 4 different CSV files

## New things I've learned:

- Setup a project with Docker using docker-compose and TypeScript (Maintainable project structure)
- Using PostgreSQL for database, implement migrations from server side (using postgres-migrations)
- Handle large size of data (3M lines), performing filtering and removing duplication
- Implement pagination, sorting and full-text search server side
- Refactoring client folder to suit Redux toolkit logic (Each feature will contain a slice of Redux)
- Using MUI Grid for handle server-side pagination, filtering

## Preview:

**Journeys view**
<img width="1552" alt="Screenshot 2022-09-24 at 16 56 02" src="https://user-images.githubusercontent.com/86949613/192101819-7e7601f1-6e4c-4d72-aff3-889bb823271f.png" >
**Journeys view with search**
<img width="1552" alt="Screenshot 2022-09-24 at 16 56 30" src="https://user-images.githubusercontent.com/86949613/192101851-5af54a1f-1b7d-4532-885d-4fc1dba6b531.png" >
**Station view with search**
<img width="1552" alt="Screenshot 2022-09-24 at 17 00 16" src="https://user-images.githubusercontent.com/86949613/192102033-2549a805-929a-4d0f-8e3e-6eb8527ebbb4.png">
**Add Journey**
<img width="1552" alt="Screenshot 2022-09-24 at 17 00 55" src="https://user-images.githubusercontent.com/86949613/192102063-e72b3ded-1ca4-4c0b-a89f-199a8b9d3b92.png">
**Add Station**
<img width="1552" alt="Screenshot 2022-09-24 at 17 01 16" src="https://user-images.githubusercontent.com/86949613/192102081-7385e6aa-a16d-4094-86ce-abd515f5521a.png">

## Pre-requisites

- Docker
- Node.js
- Download CSV file from HSL server

## Install project

##### Do first

Download CSV file about the bike journey data from HSL Server (3 separate files)

- <https://dev.hsl.fi/citybikes/od-trips-2021/2021-05.csv>
- <https://dev.hsl.fi/citybikes/od-trips-2021/2021-06.csv>
- <https://dev.hsl.fi/citybikes/od-trips-2021/2021-07.csv>

Download CSV file about the bike stations here and rename it to **"station-data.csv"**
<https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.csv>

=>> _All downloaded files should be put in one folder, and you have to save this path for later use_

##### Clone the project from Github

```bash
# bash
git clone 'https://github.com/nguyenfamj/helsinki-city-bike.git'
```

Open terminal and IDE (VSCode) in the cloned repository
**1. Create new ".env" file based on ".env.example" 2. Change "RAW_CSV_PATH" value to the path of CSV files you have above**

```dotenv
#Example .env file
PORT=3001

# DATABASE
DB_HOST=db
DB_USER=postgres
DATABASE=city_bike_hel
DB_PASSWORD=password
DB_PORT=5432
DB_POOL_SIZE=2
DB_POOL_CLIENT_IDLE_TIMEOUT=10000
DB_POOL_CLIENT_CONNECTION_TIMEOUT=2000
WAIT_HOST=db:5432
RAW_CSV_PATH=PATH_TO_FOLDER_CONTAINS_CSV_FILE

# PAGINATION
DEFAULT_PAGE_SIZE=50
DEFAULT_PAGE_INDEX=1
```

##### Run project

Change directory to the cloned repository, open terminal and run these commands. First time running the command, the containers will be stopped, because the database is not completely initialized. To solve the problem, just execute the command below once again in the terminal.

```bash
docker-compose up -d --build && docker-compose logs -f
```

It will take a while for the migration process to complete. Then:

```bash
cd client
npm install
npm run start
```

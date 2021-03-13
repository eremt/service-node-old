# service-node

## Development
The following are required to run the development environment:
- [node](https://nodejs.org/en/download/)
- [docker](https://docs.docker.com/get-docker/) and [docker-compose](https://docs.docker.com/compose/install/)

### Setup
Clone the repository:
```bash
git clone git@github.com:eremt/service-node.git
```
Copy `.env.example`:
```bash
cp .env.example .env
```
Install dependencies:
```bash
npm install
```

### Start environemnt
Start the development environment with `docker-compose`:
```bash
docker-compose up
```

## Production

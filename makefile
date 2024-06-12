run-dev:
	@echo "Starting dev..."
	docker compose -f backend/docker-compose.yml up -d --remove-orphans

run-prod-down:
	@echo "Stoping prod server..."
	docker compose down

createdb:
	docker exec -it database createdb --username=postgres --owner=postgres micro-mgt





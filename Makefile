MAKE := make -i

# using my home
# DOCKER_COMPOSE := docker compose

# using cluster
DOCKER_COMPOSE := ~/Downloads/docker-compose-darwin-x86_64

.PHONY: all build backend up up_d downiclean cclean dclean aclean are re 

all:
	${MAKE} build
	${MAKE} up

build:
	${DOCKER_COMPOSE} build

backend:
	${DOCKER_COMPOSE} logs -f nestjs

up: 
	${DOCKER_COMPOSE} up

up_d:
	${DOCKER_COMPOSE} up -d

down:
	${DOCKER_COMPOSE} down

re:
	make dclean
	make

are:
	make aclean
	make

#image clean
iclean:
	docker image prune -f

#container clean
cclean:
	docker container prune -f

#docker clean
dclean:
	docker compose down -v
	make iclean
	make cclean
	docker system prune -af

#all clean
aclean:
	make dclean
FROM lanyuanxiaoyao/squirrel-server

MAINTAINER lanyuanxiaoyao lanyuanxiaoyao@gmail.com

COPY ./dist /workspace/BOOT-INF/classes/static
RUN mkdir -p /workspace/database

ENV BASE.DATABASE_PATH /workspace/database

EXPOSE 10086

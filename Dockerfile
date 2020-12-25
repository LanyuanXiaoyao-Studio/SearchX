FROM lanyuanxiaoyao/squirrel-server

MAINTAINER lanyuanxiaoyao lanyuanxiaoyao@gmail.com

COPY ./dist /workspace/BOOT-INF/classes/static

EXPOSE 10086

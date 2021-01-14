FROM lanyuanxiaoyao/squirrel-server

MAINTAINER lanyuanxiaoyao lanyuanxiaoyao@gmail.com

ENV TZ Asia/Shanghai
ENV LANG en_US.UTF-8
ENV LC_ALL en_US.UTF-8

COPY ./dist /workspace/BOOT-INF/classes/static
RUN mkdir -p /workspace/database

ENV BASE.DATABASE_PATH /workspace/database

EXPOSE 10086

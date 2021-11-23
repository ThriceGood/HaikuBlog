FROM mysql:5.7
COPY ./init.sql /docker-entrypoint-initdb.d
RUN chmod 755 -R /docker-entrypoint-initdb.d/
RUN chown -R mysql:mysql /docker-entrypoint-initdb.d/
# Baza postgres
FROM postgres:17
EXPOSE 5432
# Skrypty inicjalizacyjne dla bazy, przy tworzeniu nowego konenera
COPY ./sql/database_init.sql /docker-entrypoint-initdb.d/

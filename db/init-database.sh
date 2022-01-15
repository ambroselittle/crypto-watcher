#!/bin/bash

psql --user postgres <<- EOSQL
CREATE DATABASE "crypto-watch";
CREATE USER dev WITH ENCRYPTED PASSWORD 'pass@word1';
GRANT ALL PRIVILEGES ON DATABASE "crypto-watch" TO dev;
EOSQL

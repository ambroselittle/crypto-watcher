#!/bin/bash

# run init-database.sh first if you didn't already, to setup the db/dev user
PGPASSWORD='pass@word1' psql -U dev 'crypto-watch' -f 'seed.psql'

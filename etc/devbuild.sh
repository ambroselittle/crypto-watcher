#!/bin/bash

# Note, this assumes it will be run from the project root.
# The whole purpose of this is to allow for some dev env defaults but let devs override using dev.env.local.

. "./etc/dev.env"

devEnvPath="./etc/dev.env.local"

if [ -e $devEnvPath ]
then
    . $devEnvPath
fi

# Check if running for docker-compose; if so, source env overrides for docker images
if [ $DOCKER_DEV ]; then
    . ./etc/docker.env
    dockerLocal='./etc/docker.env.local'
    [ -e $dockerLocal ] && . $dockerLocal
fi

return 0

#!/bin/bash
### A SIMPLE BUILD SCRIPT FOR ANGULAR 5+ 
# 
# Author: Co van Leeuwen (github.com/c00)
# Version: 1.1
#
# This script builds an angular project locally and then copies
# the output to a remote over SSH.
#
# It uses symlinks to update the current release. 
# NOTE: It does not delete old releases.

### VARIABLES / DEFAULTS ###
# The environment flag used in the angular build
ENV=production
# The base argument used in the angular build
BASE="/"
# The remote SSH server to connect to. Can be an alias if so defined in your ~/.ssh/config
REMOTE=bessy
# The remote path to create the release in (The release will have its own directory in here)
REMOTE_PATH=/var/www/cirquel/library/releases/

#Don't touch anything below here
SKIP_BUILD=
NEW=$(date +"%Y%m%d-%H%M%S")

while getopts "r:p:e:b:s" opt; do
    case $opt in
    r) REMOTE=$OPTARG ;; 
    e) ENV=$OPTARG ;; 
    b) BASE=$OPTARG ;;
	p) REMOTE_PATH=$OPTARG ;;
    s) SKIP_BUILD=1 ;;
    ?) echo "Parameter error."; exit ;;
    esac
done

if [ -z "$SKIP_BUILD" ]
then
    echo "Building $ENV..."
    ng build --prod --base-href $BASE --configuration=$ENV --output-path="dist/" || { echo 'NG build failed' ; exit 1; }
else
    echo "Skipping local build..."
fi

echo Deploying to $REMOTE in $REMOTE_PATH...

ssh $REMOTE "mkdir $REMOTE_PATH/$NEW" || { echo 'Create remote dir failed.' ; exit 1; }
scp -r dist/* $REMOTE:$REMOTE_PATH/$NEW || { echo 'SCP deploy failed.' ; exit 1; }

ssh $REMOTE "cd $REMOTE_PATH && rm current && ln -s $NEW current" || { echo 'Creating symlink failed.' ; exit 1; }

echo "Deployment complete!"

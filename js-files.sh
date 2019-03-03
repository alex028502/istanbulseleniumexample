#! /usr/bin/env bash

set -e

# list all files that need to be checked with
# eslint
# this should exclude anything that is git ignored
# (libraries and compiled files)
# this script can be used with eslint and eslint --fix

git ls-files | grep '\.js$'

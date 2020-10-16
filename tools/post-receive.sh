#!/bin/bash
while read oldrev newrev refname
do
    branch=$(git rev-parse --symbolic --abbrev-ref $refname)
    if [ "master" = "$branch" ]; then
        git push --mirror --quiet https://blueskfish:d57b5098dd0475e4dab4f2e2d1c3417773e2d77a@github.com/blueskyfish/blue-paper.git &> /dev/null
        echo "push to github the master branch"
    fi
done

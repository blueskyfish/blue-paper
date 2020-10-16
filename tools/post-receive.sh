#!/bin/bash
while read oldrev newrev refname
do
  branch=$(git rev-parse --symbolic --abbrev-ref $refname)
  if [ "master" = "$branch" ]; then
    # Previous token is invalidate
    git push master --mirror --quiet https://user:token@github.com/blueskyfish/blue-paper.git &> /dev/null
    echo "push to github the master branch"
  fi
done

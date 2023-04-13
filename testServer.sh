#!/bin/bash 

echo "To test on local system"
set -x
exec python3 -m http.server 9797

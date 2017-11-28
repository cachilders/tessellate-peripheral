#!/bin/sh
# WIP. Omegas are flaky. We need a way to restart the process when it fails.
while [ 1 ]; do

PROCESS=`ps | grep tessellate | grep -v grep`

if [ -z "$PROCESS" ]; then
    echo "Process is not running" 
    /root/myApp  2>/dev/null 1>/dev/null &
fi

sleep 3
done
exit 0

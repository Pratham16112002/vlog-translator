#!/bin/bash
set -x  # This line enables debugging

VIDEO_ID=$1

[ -z "$VIDEO_ID" ] && echo "ERROR: No Video ID Specified" && exit 1

yt-dlp "https://www.youtube.com/watch?v=${VIDEO_ID}" --format m4a -o "./tmp/%(id)s.%(ext)s" 2>&1


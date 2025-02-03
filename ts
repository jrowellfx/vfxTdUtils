#!/bin/bash

# 3-Clause BSD License
# 
# Copyright (c) 2008-2025, James Philip Rowell,
# Alpha Eleven Incorporated
# www.alpha-eleven.com
# All rights reserved.
# 
# Redistribution and use in source and binary forms, with or without
# modification, are permitted provided that the following conditions are
# met:
# 
#  1. Redistributions of source code must retain the above copyright
#     notice, this list of conditions and the following disclaimer.
# 
#  2. Redistributions in binary form must reproduce the above copyright
#     notice, this list of conditions and the following disclaimer in
#     the documentation and/or other materials provided with the
#     distribution.
# 
#  3. Neither the name of the copyright holder, "Alpha Eleven, Inc.",
#     nor the names of its contributors may be used to endorse or
#     promote products derived from this software without specific prior
#     written permission.
# 
# THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
# "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
# LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
# A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
# HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
# SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
# LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
# DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
# THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
# (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
# OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

# ts - spit out a timestamp for use in backquotes for generating filenames etc.
#      as YYMMDD-hhmmss. Has options to make shorter forms.

VERSION=2.0.0

usage_exit() {
    echo "usage: ${0##*/} [-h | --help] [OPTION]..."
    if [ "$1" = help ]; then
	cat - <<@eof

${0##*/} prints out a string suitable for a time stamp as YYMMDD-hhmmss.

Output from ${0##*/} is suitable for embedding in filenames that need to
be tagged with a time stamp. Any such filenames will sort properly because
the date order is echoed as YYYYMMDD.

optional arguments:

 -h, --help      show this help and exit
 --only-date     skip printing the time, only print the date
 --short         same as --only-date
 --full-year     print year as YYYY instead of just YY
 --no-seconds    print time as hhmm only
 --no-minutes    print time as hh only
 --only-time     skip printing the date, only print the time
 --round-quarter round minutes down to the nearest 15 
 --round-half    round minutes down to the nearst half hour
 --version       print out the version number and exit

@eof
    fi
    exit 1
}

onlyDate=no
isFullYear=no
printSeconds=yes
printMinutes=yes
roundDown=no
onlyTime=no

#
# Parse options.
#
shopt -s extglob
while :
do
    case "$1" in
        -h|--help) usage_exit help
        ;;

        --version) echo $VERSION
            exit 0
        ;;

        --short|--only-date) onlyDate=yes; onlyTime=no
             shift
        ;;

        --full-year) isFullYear=yes
             shift
        ;;

        --no-seconds) printSeconds=no
             shift
        ;;

        --no-minutes) printSeconds=no; printMinutes=no
             shift
        ;;

        --round-quarter) roundDown=quarter; printSeconds=no; printMinutes=yes
             shift
        ;;

        --round-half) roundDown=half; printSeconds=no; printMinutes=yes
             shift
        ;;

        --only-time) onlyTime=yes; onlyDate=no
             shift
        ;;

        --*|-*) echo $0: no such option $1; usage_exit
        ;;

        *) break # We're done processing arguments, so let's get on with it. :-)
    esac
done

if [ "$isFullYear" = yes ]; then
    year=`date '+%Y'`
else
    year=`date '+%y'`
fi
month=`date '+%m'`
day=`date '+%d'`
hour=`date '+%H'`
minute=`date '+%M'`
second=`date '+%S'`
separator=-

if [ "$roundDown" = quarter ]; then
    set -f
    minute=`echo $minute 15 / 15 * p | dc`
    if [ "$minute" = 0 ]; then
        minute=00
    fi
    set +f
elif [ "$roundDown" = half ]; then
    set -f
    minute=`echo $minute 30 / 30 * p | dc`
    if [ "$minute" = 0 ]; then
        minute=00
    fi
    set +f
fi

if [ "$printMinutes" = no ]; then
    minute=
fi

if [ "$printSeconds" = no ]; then
    second=
fi

if [ "$onlyDate" = yes ]; then
    hour=
    minute=
    second=
    separator=
fi

if [ "$onlyTime" = yes ]; then
    year=
    month=
    day=
    separator=
fi

echo ${year}${month}${day}${separator}${hour}${minute}${second}

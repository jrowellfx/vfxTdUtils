#!/bin/bash

# 3-Clause BSD License
# 
# Copyright (c) 2008-2022, James Philip Rowell,
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
#      as YYMMDD-hhmmss
#
# Usage: tstamp [--short] 
#
# Options:
#
# --short       Only output YYMMDD
# -h, --help    Help message
#

Usage_exit() {
    echo "Usage: ${0##*/} [--short] [--fullyear]"
    if [ "$1" = help ]; then
	cat - <<@eof
${0##*/} prints out a string suitable for a timestamp, as YYMMDD-hhmmss

Options:

 --short     Only print out YYMMDD as the timestamp.
 --fullyear  Print year as YYYY instead of just YY

@eof
    fi
    exit 1
}

isShort=no
isFullYear=no

#
# Parse options.  Stop when you get to the file list.
#
shopt -s extglob
while :
do
    case "$1" in
        -h|--help) Usage_exit help
        ;;

        --short) isShort=yes
             shift
        ;;

        --fullyear) isFullYear=yes
             shift
        ;;

        --*|-*) Usage_exit
        ;;

        *) break # We're done processing arguments, so let's get on with it. :-)
    esac
done

if [ "$isShort" = yes ]; then
    if [ "$isFullYear" = yes ]; then
        date '+%Y%m%d'
    else
        date '+%y%m%d'
    fi
else
    if [ "$isFullYear" = yes ]; then
        date '+%Y%m%d-%H%M%S'
    else
        date '+%y%m%d-%H%M%S'
    fi
fi

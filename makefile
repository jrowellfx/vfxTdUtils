# makefile for installing vfxTdUtil's utilities.

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

# Semantic Versioning 2.0.0
#
# MAJOR version for incompatible API changes
# MINOR version for added functionality in a backwards compatible manner
# PATCH version for backwards compatible bug fixes
#
VERSION := 2.0.0
REPO := vfxTdUtils
SHELL := /bin/bash
TARBALL_NAME := $(REPO)-$(VERSION)
TARBALL_DIR := dist/$(TARBALL_NAME)

# List shell scripts
#
SCRIPTS := mod-tstamp \
	rm-spaces \
	runsed \
	tabs2spaces \
	time-stamp

# If root then abort with error message.
# 
check_root: 
	@if [ `id -u` -eq 0 ]; then \
		echo "Do not build the tarball as root"; exit 1; \
	fi

tarball:
	mkdir -p $(TARBALL_DIR)/scripts; \
	cp makefile.userInstall $(TARBALL_DIR)/makefile; \
	cp README.md $(TARBALL_DIR); \
	for file in $(SCRIPTS); do \
		cp scripts/$$file $(TARBALL_DIR)/scripts/$$file; \
	done; \
	cd dist; \
	tar -c -f $(TARBALL_NAME).tar.gz -zv $(TARBALL_NAME)

# Optional: Clean up any temporary files (if needed)
#
clean:
	@echo "Nothing to clean"

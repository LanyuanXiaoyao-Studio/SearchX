#!/bin/sh

gpg --quiet --batch --yes --decrypt --passphrase=$CSC_LINK_GPG_PASSWORD --output $HOME/Development.p12 ./cert/Development.p12.gpg
export CSC_LINK=$HOME/Development.p12

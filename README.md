# yamma-cli

Command line interface (CLI) for the [Yamma](https://github.com/glacode/yamma) unifier and for working with [Metamath](https://us.metamath.org/) (.mm) and Metamath proof (.mmp) files.

***Y***amma's ***a*** ***M***eta***m***ath proof ***a***ssistant for Visual Studio Code.

This package allows it's unifier functionality to the access from the command line.

## Install

Requires NodeJS - https://nodejs.org - version 22.18.0 or higher.

With NodeJS installed, the command to install yamma-cli is

``` shell
npm install --global yamma-cli
```

## Obtaining Metamath (.mm) files

These can be found in the Metamath repository - https://github.com/metamath/set.mm

[demo0.mm](https://github.com/metamath/set.mm/blob/develop/demo0.mm) is a nice simple example of a .mm file and, since the aim is to use the CLI here, it can be obtained with the following curl command

``` shell
curl -L https://github.com/metamath/set.mm/raw/refs/heads/develop/demo0.mm -O
```

[set.mm](https://github.com/metamath/set.mm/blob/develop/set.mm) is the most commonly used and largest .mm file - 49MB at the time of writing - and can be obtained with the following curl command

``` shell
curl -L https://github.com/metamath/set.mm/raw/refs/heads/develop/set.mm -O
```

## Usage

```
yamma <command>

Commands:
  yamma unify <mmFile> [mmpFiles...]        Unify any given .mmp filenames
                                                                    [aliases: u]
  yamma get <mmFile> [proofIds...]          Get proofs and create .mmp files
                                                                    [aliases: g]
  yamma compress <mmFile> [proofIds...]     Compress proofs in .mm  [aliases: c]
  yamma decompress <mmFile> [proofIds...]   Decompress proofs in .mm[aliases: d]
  yamma truncate <mmFile> <proofIdOrCount>  Truncate .mm file       [aliases: t]

Options:
      --help           Show help                                       [boolean]
      --version        Show version number                             [boolean]
  -s, --single-thread
```

As we can see from from the --help text, the `yamma` command has five sub-commands.  These are documented below.

### yamma get

### examples

``` shell
yamma get demo0.mm th1
yamma get set.mm impt
```

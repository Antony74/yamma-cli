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
{{{curlDemo0}}}
```

[set.mm](https://github.com/metamath/set.mm/blob/develop/set.mm) is the most commonly used and largest .mm file - 49MB at the time of writing - and can be obtained with the following curl command

``` shell
{{{curlSetMm}}}
```

## Usage

```
{{{helpMain}}}
```

As we can see from from the --help text, the `yamma` command has five sub-commands.  These are documented below.

### yamma get

```
{{{helpGet}}}
```

### yamma unify

```
{{{helpUnify}}}
```

### yamma decompress

```
{{{helpDecompress}}}
```

### yamma compress

```
{{{helpCompress}}}
```

### yamma truncate

```
{{{helpTruncate}}}
```

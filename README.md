# yamma-cli

Command line interface (CLI) for the [Yamma](https://github.com/glacode/yamma) unifier and for working with [Metamath](https://us.metamath.org/) (.mm) and Metamath proof (.mmp) files.

***Y***amma's ***a*** ***M***eta***m***ath proof ***a***ssistant for Visual Studio Code.

This package allows it's unifier functionality to the accessed from the command line.

It has been developed alongside [yamma-hl-api](https://github.com/Antony74/yamma-hl-api), which provides a high API for Yamma, so that this CLI is a thin layer over that.

## Install

Requires NodeJS - https://nodejs.org

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
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]
```

As we can see from from the --help text, the `yamma` command has five sub-commands.  These are documented below.

### yamma get

```
yamma get <mmFile> [proofIds...]

Get proofs and create .mmp files

Positionals:
  mmFile    A .mm file                                       [string] [required]
  proofIds  Zero or more proof identifiers from the .mm file
                                                           [array] [default: []]

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]
  --all      Create .mmp files for all(!) proofs

Examples:
  yamma get demo0.mm th1
  yamma get set.mm impt dju1p1e2
```

### yamma unify

```
yamma unify <mmFile> [mmpFiles...]

Unify any given .mmp filenames

Positionals:
  mmFile        A .mm file                                   [string] [required]
  mmpFilenames  Zero or more .mmp files                                 [string]

Options:
      --help           Show help                                       [boolean]
      --version        Show version number                             [boolean]
  -s, --single-thread

Examples:
  yamma unify demo0.mm th1.mmp
  yamma unify set.mm impt.mmp dju1p1e2.mmp
```

### yamma decompress

```
yamma decompress <mmFile> [proofIds...]

Decompress proofs in .mm

Positionals:
  mmFile    A .mm file                                       [string] [required]
  proofIds  Zero or more proof identifiers from the .mm file
                                                           [array] [default: []]

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]
  --all      Decompress all(!) proofs

Examples:
  yamma decompress demo0.mm th1
  yamma decompress set.mm impt dju1p1e2
```

### yamma compress

```
yamma compress <mmFile> [proofIds...]

Compress proofs in .mm

Positionals:
  mmFile    A .mm file                                       [string] [required]
  proofIds  Zero or more proof identifiers from the .mm file
                                                           [array] [default: []]

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]
  --all      Compress all(!) proofs

Examples:
  yamma compress demo0.mm th1
  yamma compress set.mm impt dju1p1e2
```

### yamma truncate

```
yamma truncate <mmFile> <proofIdOrCount>

Truncate .mm file

Positionals:
  mmFile          A .mm filename                             [string] [required]
  proofIdOrCount  Proof to truncate .mm before or after, or total count of
                  proofs desired after truncation            [string] [required]

Options:
      --help     Show help                                             [boolean]
      --version  Show version number                                   [boolean]
  -b, --before   File should be truncated before the given proof       [boolean]
  -a, --after    File should be truncated after the given proof        [boolean]
  -c, --count    File should be truncated at the given count of proofs [boolean]

Examples:
  yamma truncate set.mm --before dju1p1e2
  yamma truncate set.mm --after impt
  yamma truncate set.mm --count 100
```

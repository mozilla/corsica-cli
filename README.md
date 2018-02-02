# Corsica CLI

A management interface for [Corsica](https://github.com/mozilla/corsica).

Requires Node.JS and npm. Built and tested using Node v8.5.0 and npm v5.6.0.

## Installation

To install, run `npm install -g corsica-cli` in your terminal.

## Basic Usage

First, you'll need to get a Corsica server set up on your machine. From the terminal, run:

`corsica setup`

You'll be prompted to select an installation directory, but you can press enter to accept the default. After that, the tool will download and install the software. When it's done, you'll have a base Corsica installation!

To start the server, run `corsica start`. If you'd like to run it as a background task, you can start the server with `corsica start --background`.

## Plugins

Corsica's power and flexibility comes from its plugins. The Corsica CLI includes commands to manage plugins as well as the core server.

[See a list of Corsica plugins](https://www.npmjs.com/browse/keyword/corsica)

To install a plugin (such as corsica-image), run `corsica add-plugin corsica-image`. This will download the plugin and register it with the server.

## Updates

To update both the server software and plugins to their latest versions, run `corsica update`. To update the Corsica CLI itself, run `npm install -g corsica-cli`.

## Troubleshooting

When there are errors, the tool tries to give helpful information when it can. If you file an issue, please include all the error output provided if possible.

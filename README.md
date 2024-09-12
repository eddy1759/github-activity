# GitHub User Activity CLI

A simple command-line interface (CLI) tool to fetch and display the recent activity of a GitHub user.

**Project URL**: [https://roadmap.sh/projects/github-user-activity](https://roadmap.sh/projects/github-user-activity)

## Table of Contents
  - [Features](#features)
  - [Installation](#installation)
  - [How It Works](#how-it-works)
  - [Supported Event Types](#supported-event-types)


## Features

- Fetch recent GitHub activity for any user
- Display activity in a human-readable format
- Support for multiple event types
- Error handling for invalid usernames or API failures
- No external dependencies (uses only Node.js built-in modules)

## Installation

1. Ensure you have Node.js installed on your system (version 12.x or higher recommended).
2. Clone this repository:

   ```bash
   git clone https://github.com/yourusername/github-activity.git

3. Navigate to the project directory:

    ```bash
    cd github-activity

4. Make the script executable:

    ```bash
    chmod +x github-activity.js

5. To use the CLI globally, create a symlink:

    ```bash
    npm link

## Usage

- **To use the CLI, run:**

    ```bash
    github-activity <username>

- `Replace <username> with the GitHub username you want to check.`

- **Example:**

    ```bash
    github-activity eddy

- **Output:**

```diff
- Recent activity for eddy:
- Pushed 2 commits to octoceddyat/Hello-World
- Opened a new issue in eddy/Hello-World: Update README.md
- Starred axelarnetwork/interchain-governance-orchestrator
```

## How It Works

  - The CLI takes a GitHub username as a command-line argument.
  - It sends a request to the GitHub API to fetch the user's recent events.
  - The fetched data is parsed and formatted into human-readable messages.
  - The 10 most recent activities are displayed in the console.

## Supported Event Types

The CLI currently supports the following GitHub event types:

- PushEvent
- CreateEvent
- IssuesEvent
- WatchEvent
- PullRequestEvent
- ForkEvent

`Other event types will be displayed with a generic message.`

#!/usr/bin/env node

const https = require('https');
const path = require('path');

function fetchActivity(username) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'api.github.com',
            path: `/users/${username}/events`,
            headers: {
                'User-Agent': 'GitHub-Activity-CLI'
            }
        };

        https.get(options, (res) => {
            let data = '';

            res.on('data', chunk => {
                data += chunk;
            });

            res.on('end', () => {
                if (res.statusCode === 200) {
                    resolve(JSON.parse(data));
                } else {
                    reject(new Error(`Error fetching activity. ${res.statusMessage}`));
                }
            });
        }).on('error', (err) => {
            reject(err);
        });
    })
}

function formatActivity(events) {
    switch (events.type) {
        case 'PushEvent':
            const commitCount = events.payload.commits.length ?? 0;
            return `Pushed ${commitCount} commit${commitCount !== 1 ? 's' : ''} to ${events.repo.name}`;
        case 'CreateEvent':
            return `Created ${events.payload.ref_type} ${events.payload.ref ?? events.payload.master_branch} in ${events.repo.name}`;
        case 'IssuesEvent':
            return `Opened a new issue in ${events.repo.name}: ${events.payload.issue.title}`;
        case 'WatchEvent':
            return `Starred ${events.repo.name}`;
        case 'PullRequestEvent':
            return `Opened a new pull request in ${events.repo.name}: ${events.payload.pull_request.title}`;
        case 'ForkEvent':
            return `Forked ${events.repo.name}`;
        default:
            return `${events.type} on ${events.repo.name}`;
    }
}

async function main() {
    const username = process.argv[2];

    if (!username) {
        console.error('Please provide a GitHub username');
        console.error('Usage: github-activity <username>');
        process.exit(1);
    }

    try {
        const events = await fetchActivity(username);
        console.log(`Recent activity for ${username}:`);
        events.slice(0, 10).forEach((event) => {
          console.log(`- ${formatActivity(event)}`);
        });
    } catch (error) {
        console.error('Error:', (error.message));
        process.exit(1);
    }
}

main();
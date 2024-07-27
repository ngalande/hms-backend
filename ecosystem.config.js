module.exports = {
    apps: [
        {
            name: 'hotelapi',
            script: './server.js', // Path to your main application file
            watch: true, // Restart on file changes (optional)
            env: {
                NODE_ENV: 'development',
            },
            env_production: {
                NODE_ENV: 'production',
            },
        },
    ],
};

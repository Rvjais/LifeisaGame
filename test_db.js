const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://ranveerjais:ranveerjais@cluster0.vl4qwdq.mongodb.net/?appName=Cluster0';

console.log('Attempting to connect to MongoDB...');

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('✅ SUCCESS: Connected to MongoDB!');
        process.exit(0);
    })
    .catch(err => {
        console.error('❌ ERROR: Could not connect to MongoDB.');
        console.error(err);
        process.exit(1);
    });

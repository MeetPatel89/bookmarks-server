const { v4: uuid } = require('uuid');

// Bookmarks data array

const bookmarks = [
    {
        id: uuid(),
        title: 'Youtube',
        url: 'https://www.youtube.com',
        description: 'Preeminent video search engine',
        rating: 5
    },
    {
        id: uuid(),
        title: 'Google',
        url: 'https://www.google.com',
        description: 'Preeminent search engine',
        rating: 4
    },
    {
        id: uuid(),
        title: 'Wikipedia',
        url: 'https://www.wikipedia.com',
        description: 'Preeminent knowledge engine',
        rating: 5
    }
]

module.exports = bookmarks;

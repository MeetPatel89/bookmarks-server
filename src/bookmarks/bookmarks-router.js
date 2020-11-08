const express = require('express');
const { v4: uuid } = require('uuid');
const logger = require('../logger');
const bookmarks = require('../store');

const bookmarksRouter = express.Router();
const bodyParser = express.json();

bookmarksRouter
    .route('/bookmarks')
    .get((req, res) => {
        res.json(bookmarks);
    })
    .post(bodyParser, (req, res) => {
        
        const { title, url, description, rating } = req.body;
        
        if (!title) {
            logger.error('title is required.');
            return res
                        .status(400)
                        .send('title is required.');
        };

        if (!url) {
            logger.error('url is required.');
            return res
                        .status(400)
                        .send('url is required.');
        };

        if (!rating) {
            logger.error('rating is required.');
            return res
                        .status(400)
                        .send('rating is required.');
        };

        if (!description) {
            logger.error('description is required.');
            return res
                        .status(400)
                        .send('description is required.');
        };

        if (rating < 0 || rating > 5 || !Number.isInteger(rating)) {
            logger.error(`rating ${rating} is invalid. Please provide an integer between 0 and 5`);
            return res
                        .status(400)
                        .send(`rating must be an integer between 0 and 5 instead of \'${rating}\'`);
        }

        let urlRegExp = new RegExp(/^(http|https):\/\/[^ "]+$/);
        if (!urlRegExp.test(url)) {
            logger.error(`Please provide a valid url instead of '${url}'`);
            return res
                        .status(400)
                        .send(`Please provide a valid url instead of '${url}'`);
        }

        const id = uuid();
        const bookmark = {
            id,
            title,
            url,
            description,
            rating
        }
        bookmarks.push(bookmark);

        logger.info(`Bookmark with id ${id} created`);
        res
            .status(201)
            .location(`http://localhost:8000/bookmarks/${id}`)
            .json(bookmark);
    })

bookmarksRouter
    .route('/bookmarks/:bookmarkId')
    .get((req, res) => {
        const { bookmarkId } = req.params;

        const bookmark = bookmarks.find(bookmark => bookmark.id == bookmarkId);

        if (!bookmark) {
            logger.error(`Bookmark with id '${bookmarkId}' not found.`);
            return res
                        .status(404)
                        .send(`Bookmark with id '${bookmarkId}' not found`)
        };

        res.json(bookmark);

    })
    .delete((req, res) => {
        const { bookmarkId } = req.params;

        const bookmarkIndex = bookmarks.findIndex(bookmark => bookmark.id == bookmarkId);

        if (bookmarkIndex === -1) {
            logger.error(`Bookmark with id ${bookmarkId} not found.`);
            return res
                        .status(404)
                        .send(`Bookmark with id '${bookmarkId}' not found.`)
        };

        bookmarks.splice(bookmarkIndex, 1);

        logger.info(`Bookmark with id ${bookmarkId} deleted.`);
        res
            .status(204)
            .end();

    });


module.exports = bookmarksRouter;

const RSS = require('rss');
const fs = require('fs');

fs.readFile('feedObj.json', 'UTF-8', function (err, data) {
    if (err) throw err;
    const {feedOptions, items}= JSON.parse(data);
    const feed = new RSS(feedOptions);
    /* loop over data and add to feed */
    const newItem = {
        title: 'item title 2',
        description: 'use this for the content. It can include html.',
        url: 'http://example.com/article4?this&that', // link to the item
        guid: Date.now(), // optional - defaults to url
        categories: ['Category 1', 'Category 2', 'Category 3', 'Category 4'], // optional - array of item categories
        author: 'Guest Author', // optional - defaults to feed author property
        date: 'May 27, 2012', // any format that js Date can parse.
        // lat: 33.417974, //optional latitude field for GeoRSS
        // long: -111.933231, //optional longitude field for GeoRSS
        // enclosure: { url: '...', file: 'path-to-file' }, // optional enclosure
        custom_elements: [
            { 'itunes:author': 'John Doe' },
            { 'itunes:subtitle': 'A short primer on table spices' },
            {
                'itunes:image': {
                    _attr: {
                        href: 'http://example.com/podcasts/everything/AllAboutEverything/Episode1.jpg'
                    }
                }
            },
            { 'itunes:duration': '7:04' }
        ]
    }
    items.push(newItem);
    items.forEach(item => feed.item(item));
    // cache the xml to send to clients
    const xml = feed.xml();
    // console.log(xml)
    fs.writeFile('RSS.xml', xml, function (err) {
        if (err) throw err;
    })
    fs.writeFile('feedObj.json', JSON.stringify({feedOptions, items}), function (err) {
        if (err) throw err;
    })
})


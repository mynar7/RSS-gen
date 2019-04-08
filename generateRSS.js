const RSS = require('rss');
const fs = require('fs');

/* lets create an rss feed */
const feedOptions = {
    title: 'title',
    description: 'description',
    feed_url: 'https://s3.amazonaws.com/techjr/RSS.xml',
    site_url: 'http://example.com',
    image_url: 'http://example.com/icon.png',
    docs: 'http://example.com/rss/docs.html',
    managingEditor: 'Dylan@Greene.com (Dylan Greene)',
    webMaster: 'Dylan@Greene.com (Dylan Greene)',
    copyright: '2013 Dylan Greene',
    language: 'en',
    categories: ['Category 1', 'Category 2', 'Category 3'],
    pubDate: 'May 20, 2012 04:00:00 GMT',
    ttl: '60',
    custom_namespaces: {
        'itunes': 'http://www.itunes.com/dtds/podcast-1.0.dtd'
    },
    custom_elements: [
        { 'itunes:subtitle': 'A show about everything' },
        { 'itunes:explicit': 'clean' },
        { 'itunes:author': 'John Doe' },
        { 'itunes:summary': 'All About Everything is a show about everything. Each week we dive into any subject known to man and talk about it as much as we can. Look for our podcast in the Podcasts app or in the iTunes Store' },
        {
            'itunes:owner': [
                { 'itunes:name': 'John Doe' },
                { 'itunes:email': 'john.doe@example.com' }
            ]
        },
        {
            'itunes:image': {
                _attr: {
                    href: 'http://example.com/podcasts/everything/AllAboutEverything.jpg'
                }
            }
        },
        {
            'itunes:category': [
                {
                    _attr: {
                        text: 'Technology'
                    }
                },
                {
                    'itunes:category': {
                        _attr: {
                            text: 'Gadgets'
                        }
                    }
                }
            ]
        }
    ]
};

const feed = new RSS(feedOptions);

/* loop over data and add to feed */
const items = [
    {
        title: 'item title',
        description: 'use this for the content. It can include html.',
        url: 'http://example.com/article4?this&that', // link to the item
        guid: Date.now(), // optional - defaults to url
        categories: ['Category 1', 'Category 2', 'Category 3', 'Category 4'], // optional - array of item categories
        author: 'Guest Author', // optional - defaults to feed author property
        date: 'May 27, 2012', // any format that js Date can parse.
        // lat: 33.417974, //optional latitude field for GeoRSS
        // long: -111.933231, //optional longitude field for GeoRSS
        // enclosure: {url:'...', file:'path-to-file'}, // optional enclosure
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
            { 'itunes:duration': '7:04' },
        ]
    }
];
feed.item(items[0]);

// cache the xml to send to clients
const xml = feed.xml();
// console.log(xml)
fs.writeFile('RSS.xml', xml, function (err) {
    if (err) throw err;
})
fs.writeFile('feedObj.json', JSON.stringify({ feedOptions, items }), function (err) {
    if (err) throw err;
})
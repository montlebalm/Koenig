// Switch these lines once there are useful utils
// const testUtils = require('./utils');
require('../utils');

const card = require('../../lib/cards/bookmark');
const SimpleDom = require('simple-dom');
const serializer = new SimpleDom.HTMLSerializer(SimpleDom.voidMap);

describe('Bookmark card', function () {
    it('renders', function () {
        let opts = {
            env: {dom: new SimpleDom.Document()},
            payload: {
                url: 'http://example.com',
                metadata: {
                    url: 'http://example.com',
                    title: 'Title',
                    description: 'Description',
                    icon: 'http://example.com/icon.png',
                    thumbnail: 'http://exampple.com/thumbnail.png',
                    author: 'Author',
                    publisher: 'Publisher'
                },
                caption: 'Caption'
            }
        };

        serializer.serialize(card.render(opts))
            .should.equal('<figure class="kg-card kg-bookmark-card kg-card-hascaption"><a class="kg-bookmark-container" href="http://example.com"><div class="kg-bookmark-content"><div class="kg-bookmark-title">Title</div><div class="kg-bookmark-description">Description</div><div class="kg-bookmark-metadata"><img class="kg-bookmark-icon" src="http://example.com/icon.png"><span class="kg-bookmark-author">Author</span><span class="kg-bookmark-publisher">Publisher</span></div></div><div class="kg-bookmark-thumbnail"><img src="http://exampple.com/thumbnail.png"></div></a><figcaption>Caption</figcaption></figure>');
    });

    it('uses payload.url as href rather than payload.metadata.url', function () {
        let opts = {
            env: {dom: new SimpleDom.Document()},
            payload: {
                url: 'http://example.com?utm=12345',
                metadata: {
                    url: 'http://example.com',
                    title: 'Title',
                    description: 'Description',
                    icon: 'http://example.com/icon.png',
                    thumbnail: 'http://exampple.com/thumbnail.png',
                    author: 'Author',
                    publisher: 'Publisher'
                },
                caption: 'Caption'
            }
        };

        serializer.serialize(card.render(opts))
            .should.equal('<figure class="kg-card kg-bookmark-card kg-card-hascaption"><a class="kg-bookmark-container" href="http://example.com?utm=12345"><div class="kg-bookmark-content"><div class="kg-bookmark-title">Title</div><div class="kg-bookmark-description">Description</div><div class="kg-bookmark-metadata"><img class="kg-bookmark-icon" src="http://example.com/icon.png"><span class="kg-bookmark-author">Author</span><span class="kg-bookmark-publisher">Publisher</span></div></div><div class="kg-bookmark-thumbnail"><img src="http://exampple.com/thumbnail.png"></div></a><figcaption>Caption</figcaption></figure>');
    });

    it('keeps description element when description is blank', function () {
        let opts = {
            env: {dom: new SimpleDom.Document()},
            payload: {
                url: 'http://example.com',
                metadata: {
                    url: 'http://example.com',
                    title: 'Test bookmark',
                    description: null
                }
            }
        };

        serializer.serialize(card.render(opts))
            .should.equal('<figure class="kg-card kg-bookmark-card"><a class="kg-bookmark-container" href="http://example.com"><div class="kg-bookmark-content"><div class="kg-bookmark-title">Test bookmark</div><div class="kg-bookmark-description"></div><div class="kg-bookmark-metadata"></div></div></a></figure>');
    });

    it('skips icon when missing', function () {
        let opts = {
            env: {dom: new SimpleDom.Document()},
            payload: {
                url: 'http://example.com',
                metadata: {
                    url: 'http://example.com',
                    title: 'Title',
                    description: 'Description',
                    icon: null,
                    thumbnail: 'http://exampple.com/thumbnail.png',
                    author: 'Author',
                    publisher: 'Publisher'
                },
                caption: 'Caption'
            }
        };

        serializer.serialize(card.render(opts))
            .should.equal('<figure class="kg-card kg-bookmark-card kg-card-hascaption"><a class="kg-bookmark-container" href="http://example.com"><div class="kg-bookmark-content"><div class="kg-bookmark-title">Title</div><div class="kg-bookmark-description">Description</div><div class="kg-bookmark-metadata"><span class="kg-bookmark-author">Author</span><span class="kg-bookmark-publisher">Publisher</span></div></div><div class="kg-bookmark-thumbnail"><img src="http://exampple.com/thumbnail.png"></div></a><figcaption>Caption</figcaption></figure>');
    });

    it('skips thumbnail when missing', function () {
        let opts = {
            env: {dom: new SimpleDom.Document()},
            payload: {
                url: 'http://example.com',
                metadata: {
                    url: 'http://example.com',
                    title: 'Title',
                    description: 'Description',
                    icon: 'http://example.com/icon.png',
                    thumbnail: null,
                    author: 'Author',
                    publisher: 'Publisher'
                },
                caption: 'Caption'
            }
        };

        serializer.serialize(card.render(opts))
            .should.equal('<figure class="kg-card kg-bookmark-card kg-card-hascaption"><a class="kg-bookmark-container" href="http://example.com"><div class="kg-bookmark-content"><div class="kg-bookmark-title">Title</div><div class="kg-bookmark-description">Description</div><div class="kg-bookmark-metadata"><img class="kg-bookmark-icon" src="http://example.com/icon.png"><span class="kg-bookmark-author">Author</span><span class="kg-bookmark-publisher">Publisher</span></div></div></a><figcaption>Caption</figcaption></figure>');
    });

    it('skips author when missing', function () {
        let opts = {
            env: {dom: new SimpleDom.Document()},
            payload: {
                url: 'http://example.com',
                metadata: {
                    url: 'http://example.com',
                    title: 'Title',
                    description: 'Description',
                    icon: 'http://example.com/icon.png',
                    thumbnail: 'http://exampple.com/thumbnail.png',
                    author: null,
                    publisher: 'Publisher'
                },
                caption: 'Caption'
            }
        };

        serializer.serialize(card.render(opts))
            .should.equal('<figure class="kg-card kg-bookmark-card kg-card-hascaption"><a class="kg-bookmark-container" href="http://example.com"><div class="kg-bookmark-content"><div class="kg-bookmark-title">Title</div><div class="kg-bookmark-description">Description</div><div class="kg-bookmark-metadata"><img class="kg-bookmark-icon" src="http://example.com/icon.png"><span class="kg-bookmark-publisher">Publisher</span></div></div><div class="kg-bookmark-thumbnail"><img src="http://exampple.com/thumbnail.png"></div></a><figcaption>Caption</figcaption></figure>');
    });

    it('skips publisher when missing', function () {
        let opts = {
            env: {dom: new SimpleDom.Document()},
            payload: {
                url: 'http://example.com',
                metadata: {
                    url: 'http://example.com',
                    title: 'Title',
                    description: 'Description',
                    icon: 'http://example.com/icon.png',
                    thumbnail: 'http://exampple.com/thumbnail.png',
                    author: 'Author',
                    publisher: null
                },
                caption: 'Caption'
            }
        };

        serializer.serialize(card.render(opts))
            .should.equal('<figure class="kg-card kg-bookmark-card kg-card-hascaption"><a class="kg-bookmark-container" href="http://example.com"><div class="kg-bookmark-content"><div class="kg-bookmark-title">Title</div><div class="kg-bookmark-description">Description</div><div class="kg-bookmark-metadata"><img class="kg-bookmark-icon" src="http://example.com/icon.png"><span class="kg-bookmark-author">Author</span></div></div><div class="kg-bookmark-thumbnail"><img src="http://exampple.com/thumbnail.png"></div></a><figcaption>Caption</figcaption></figure>');
    });

    it('skips caption when missing', function () {
        let opts = {
            env: {dom: new SimpleDom.Document()},
            payload: {
                url: 'http://example.com',
                metadata: {
                    url: 'http://example.com',
                    title: 'Title',
                    description: 'Description',
                    icon: 'http://example.com/icon.png',
                    thumbnail: 'http://exampple.com/thumbnail.png',
                    author: 'Author',
                    publisher: 'Publisher'
                },
                caption: ''
            }
        };

        serializer.serialize(card.render(opts))
            .should.equal('<figure class="kg-card kg-bookmark-card"><a class="kg-bookmark-container" href="http://example.com"><div class="kg-bookmark-content"><div class="kg-bookmark-title">Title</div><div class="kg-bookmark-description">Description</div><div class="kg-bookmark-metadata"><img class="kg-bookmark-icon" src="http://example.com/icon.png"><span class="kg-bookmark-author">Author</span><span class="kg-bookmark-publisher">Publisher</span></div></div><div class="kg-bookmark-thumbnail"><img src="http://exampple.com/thumbnail.png"></div></a></figure>');
    });

    it('renders nothing when payload is undefined', function () {
        let opts = {
            env: {dom: new SimpleDom.Document()},
            payload: {
                metadata: undefined
            }
        };

        serializer.serialize(card.render(opts))
            .should.equal('');
    });

    it('renders nothing when payload metadata is empty', function () {
        let opts = {
            env: {dom: new SimpleDom.Document()},
            payload: {
                metadata: {}
            }
        };

        serializer.serialize(card.render(opts))
            .should.equal('');
    });

    it('renders nothing when url is missing', function () {
        let opts = {
            env: {dom: new SimpleDom.Document()},
            payload: {
                url: null,
                metadata: {
                    url: null,
                    title: 'Test bookmark',
                    description: 'This is just a test'
                }
            }
        };

        serializer.serialize(card.render(opts))
            .should.equal('');
    });

    it('renders nothing when title is missing', function () {
        let opts = {
            env: {dom: new SimpleDom.Document()},
            payload: {
                url: 'http://example.com',
                metadata: {
                    url: 'http://example.com',
                    title: null,
                    description: 'This is just a test'
                }
            }
        };

        serializer.serialize(card.render(opts))
            .should.equal('');
    });

    it('transforms urls absolute to relative', function () {
        let payload = {
            url: 'http://127.0.0.1:2369/post',
            metadata: {
                url: 'http://127.0.0.1:2369/post'
            },
            caption: 'A link to <a href="http://127.0.0.1:2369/post">an internal post</a>'
        };

        const transformed = card.absoluteToRelative(payload, {siteUrl: 'http://127.0.0.1:2369/'});

        transformed.url
            .should.equal('/post');

        transformed.metadata.url
            .should.equal('/post');

        transformed.caption
            .should.equal('A link to <a href="/post">an internal post</a>');
    });

    it('transforms urls relative to absolute', function () {
        let payload = {
            url: '/post',
            metadata: {
                url: '/post'
            },
            caption: 'A link to <a href="/post">an internal post</a>'
        };

        const transformed = card.relativeToAbsolute(payload, {siteUrl: 'http://127.0.0.1:2369/', itemUrl: 'http://127.0.0.1:2369/post'});

        transformed.url
            .should.equal('http://127.0.0.1:2369/post');

        transformed.metadata.url
            .should.equal('http://127.0.0.1:2369/post');

        transformed.caption
            .should.equal('A link to <a href="http://127.0.0.1:2369/post">an internal post</a>');
    });
});

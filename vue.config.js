module.exports = {
    pages: {
        'index': {
            entry: './src/pages/Home/main.js',
            template: 'public/index.html',
            title: 'Home',
            chunks: [ 'chunk-vendors', 'chunk-common', 'index' ]
        },
        'users': {
            entry: './src/pages/Users/main.js',
            template: 'public/users.html',
            title: 'Users',
            chunks: [ 'chunk-vendors', 'chunk-common', 'users' ]
        },
        'resubs': {
            entry: './src/pages/Resubs/main.js',
            template: 'public/resubs.html',
            title: 'Resubs',
            chunks: [ 'chunk-vendors', 'chunk-common', 'resubs' ]
        },
        'posts': {
            entry: './src/pages/Posts/main.js',
            template: 'public/posts.html',
            title: 'Posts',
            chunks: [ 'chunk-vendors', 'chunk-common', 'posts' ]
        }
    }
};
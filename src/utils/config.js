let config = null;
switch (process.env.NODE_ENV) {
    case 'development':
        config = {
            apiHost:'https://bpsmall-test.zhidianlife.com'
        }
        break;
    case 'production':
        config = {
            apiHost:'https://bpsmall.zhidianlife.com'
        }
        break;
}

export default config
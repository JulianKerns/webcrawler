const {test, expect} = require('@jest/globals')
const {normalizeURL} = require('./crawl.js')
const {getURLsfromHTML} = require('./crawl.js')

test('protocol test  ', () => {
    expect(normalizeURL('https://blog.boot.dev/clean-code/give-up-sooner/')).toBe('blog.boot.dev/clean-code/give-up-sooner');
});

test('http test ', () =>{
    expect(normalizeURL('https://blog.boot.dev/news/bootdev-beat-2024-02/')).toBe('blog.boot.dev/news/bootdev-beat-2024-02');
});

test('Capital test ', () => {
    expect(normalizeURL('https://BLOG.boot.dev/computer-science/ai-taking-programming-jobs/')).toBe('blog.boot.dev/computer-science/ai-taking-programming-jobs');
});

test('https://blog.boot.dev/clean-code/youre-not-qualified-for-tech-opinions/ should be converted to blog.boot.dev/path', () => {
    expect(normalizeURL('https://blog.boot.dev/clean-code/youre-not-qualified-for-tech-opinions/')).toBe('blog.boot.dev/clean-code/youre-not-qualified-for-tech-opinions');
});

test('https://www.wowhead.com/guide/classes/monk/windwalker/bis-gear should be converted towww.wowhead.com/path', () => {
    expect(normalizeURL('https://www.wowhead.com/guide/classes/monk/windwalker/bis-gear')).toBe('www.wowhead.com/guide/classes/monk/windwalker/bis-gear')
})

test('https://www.wowhead.com/guides/classes should be converted to www.wowhead.com/path', () => {
    expect(normalizeURL('https://www.wowhead.com/guides/classes')).toBe('www.wowhead.com/guides/classes')
})

test('string is not a valid URL, returns Not a valid URL', () => {
    expect(normalizeURL('wowhead')).toBe('Not a valid URL')
})
test('string is not a valid URL, returns Not a valid URL', () => {
    expect(normalizeURL(45)).toBe('Not a valid URL')
})
test('string is not a valid URL, returns Not a valid URL', () => {
    expect(normalizeURL('wowhead.com')).toBe('Not a valid URL')
})
test('https://en.wikipedia.org/wiki/Edge_case should return en.wikipedia.org/path', ()=> {
    expect(normalizeURL('https://en.wikipedia.org/wiki/Edge_case')).toBe('en.wikipedia.org/wiki/Edge_case')
})

test('https://en.wikipedia.org/wiki/Edge_case should return en.wikipedia.org/path', ()=> {
    expect(normalizeURL('https://en.wikipedia.org/wiki/Edge_case')).toBe('en.wikipedia.org/wiki/Edge_case')
})

test('getUrlsfromHTML basic test', () => {
    const input1 = `<html>
    <body>
        <a href="https://blog.boot.dev"></a>
        <a href="https://blog.boot.dev/clean-code/give-up-sooner"></a>
    </body>
</html>
` 
    const input2 = 'https://blog.boot.dev'
    const actual = getURLsfromHTML(input1,input2)
    const expected = ['https://blog.boot.dev','https://blog.boot.dev/clean-code/give-up-sooner']
    expect(actual).toEqual(expected)
})


test(' getUrlsfromHTML - relative to absolut URLs', () => {
    const input1 = `<html>
    <body>
        <a href="/backend"></a>
        <a href='https://blog.boot.dev/clean-code/give-up-sooner'></a>
        <a href="/news/bootdev-beat-2024-02/"></a>
       
    </body>
</html>
` 
    const input2 = 'https://blog.boot.dev'
    const actual = getURLsfromHTML(input1,input2)
    const expected = ['https://blog.boot.dev/backend','https://blog.boot.dev/clean-code/give-up-sooner','https://blog.boot.dev/news/bootdev-beat-2024-02/']
    expect(actual).toEqual(expected)
})

test(' getUrlsfromHTML - relative to absolut URLs', () => {
    const input1 = `<html>
    <body>
        <a href="invalid"></a>
        <a href='https://blog.boot.dev/clean-code/give-up-sooner'></a>
        <a href="/news/bootdev-beat-2024-02/"></a>
       
    </body>
</html>
` 
    const input2 = 'https://blog.boot.dev'
    const actual = getURLsfromHTML(input1,input2)
    const expected = ['https://blog.boot.dev/clean-code/give-up-sooner','https://blog.boot.dev/news/bootdev-beat-2024-02/']
    expect(actual).toEqual(expected)
})
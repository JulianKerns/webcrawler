const {test, expect} = require('@jest/globals')
const {normalizeURL} = require('./crawl.js')

test('https://blog.boot.dev/clean-code/give-up-sooner/ should be converted to https://blog.boot.dev/path ', () => {
    expect(normalizeURL('https://blog.boot.dev/clean-code/give-up-sooner/')).toBe('https://blog.boot.dev/path');
});

test('https://blog.boot.dev/news/bootdev-beat-2024-02/ should be converted to https://blog.boot.dev/path', () =>{
    expect(normalizeURL('https://blog.boot.dev/news/bootdev-beat-2024-02/')).toBe('https://blog.boot.dev/path');
});

test('https://blog.boot.dev/computer-science/ai-taking-programming-jobs/ should be converted to https://blog.boot.dev/path', () => {
    expect(normalizeURL('https://blog.boot.dev/computer-science/ai-taking-programming-jobs/')).toBe('https://blog.boot.dev/path');
});

test('https://blog.boot.dev/clean-code/youre-not-qualified-for-tech-opinions/ should be converted to https://blog.boot.dev/path', () => {
    expect(normalizeURL('https://blog.boot.dev/clean-code/youre-not-qualified-for-tech-opinions/')).toBe('https://blog.boot.dev/path');
});

test('https://www.wowhead.com/guide/classes/monk/windwalker/bis-gear should be converted to https://www.wowhead.com/path', () => {
    expect(normalizeURL('https://www.wowhead.com/guide/classes/monk/windwalker/bis-gear')).toBe('https://www.wowhead.com/path')
})

test('https://www.wowhead.com/guides/classes should be converted to https://www.wowhead.com/path', () => {
    expect(normalizeURL('https://www.wowhead.com/guides/classes')).toBe('https://www.wowhead.com/path')
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

test('Url normalized to its origin', ()=> {
    expect(normalizeURL('https://www.google.com/search?q=package-lock.json&oq=package-lock.json&gs_lcrp=EgZjaHJvbWUyCQgAEEUYORiABDIHCAEQABiABDIHCAIQABiABDIHCAMQABiABDIHCAQQABiABDIHCAUQABiABDIHCAYQABiABDIGCAcQRRg8qAIAsAIA&sourceid=chrome&ie=UTF-8')).toBe('https://www.google.com/path')
})

test('https://en.wikipedia.org/wiki/Edge_case should return https://en.wikipedia.org/path', ()=> {
    expect(normalizeURL('https://en.wikipedia.org/wiki/Edge_case')).toBe('https://en.wikipedia.org/path')
})
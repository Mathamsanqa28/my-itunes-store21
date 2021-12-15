const expect = require('expect');
const request = require('request');
//test the rendering of the server

describe('Server status', () => {
    it('should render correctly',(completed) => {
        request('http://localhost:8080/', (error, response,body) => {
            expect(response.statusCode).to.equal(200);
            completed();
        })
    })
    it('fetch should render correctly',() => {
        let term = 'rihanna'
        let option = 'artistName'
        request(`https://itunes.apple.com/search?term=${term}&media=${option}`, (error, response,body) => {
            expect(response.statusCode).to.equal(200);
        });
    })
})
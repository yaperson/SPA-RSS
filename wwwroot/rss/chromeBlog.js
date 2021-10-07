export default class {
    static async getInfo (){
        let response = await fetch('data/chromium-blog.json')
        let data = await response.json()
        return data
    }
}
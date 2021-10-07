export default class {
    static async getInfo (){
        let response = await fetch('data/progressive-web-app.json')
        let data = await response.json()
        return data
    }
}
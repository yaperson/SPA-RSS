export default class {
    static async getInfo (){
        let response = await fetch('/data/postVeil.json')
        let data = await response.json()
        return data
    }
}
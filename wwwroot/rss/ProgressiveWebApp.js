export default class {
    static async getInfo (){
        let response = await fetch('/data/alerte-google--progressive-web-app-or-pwa.json')
        let data = await response.json()
        
        return data
    }
}
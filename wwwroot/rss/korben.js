export default class {
    static async getInfo (){
        let response = await fetch('/data/korben.json')
        let data = await response.json()
        
        return data
    }
}
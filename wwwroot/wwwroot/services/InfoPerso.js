export default class {
    static async getInfo (){
        let response = await fetch('/data/cv.json')
        let data = await response.json()
        return data
    }
}
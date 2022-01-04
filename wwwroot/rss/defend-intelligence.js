export default class {
    static async getInfo (){
        let response = await fetch('./data/defend-intelligence.json')
        let data = await response.json()
        return data
    }
}
export default class {
    static async getInfo (){
        let response = await fetch('../../defend-intelligence.json')
        let data = await response.json()
        return data
    }
}
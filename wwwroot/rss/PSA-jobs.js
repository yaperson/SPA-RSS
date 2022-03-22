export default class {
    static async getInfo (){
        let response = await fetch('/data/export-rss-des-offres---seulement-les-offres-à-la-une--non--métier--digital-and-data-engineering--pays--europe--france.json')
        let data = await response.json()
        
        return data
    }
}
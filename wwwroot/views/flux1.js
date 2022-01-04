import InfoService from '/rss/defend-intelligence.js'

export default class {
    async header() {
        let titleElement = document.createElement('div')
        titleElement.innerText = "FLUX RSS n°1"
        return titleElement;
    }

    async content() {
        let itemsElement = document.createElement('div')
        itemsElement.classList.add('home')
        let data = await InfoService.getInfo()
        
        for (let item of data) {
            createPostVeil.call(this, item)
        }

        return itemsElement

        function createPostVeil(item) {
            let itemElement = document.createElement('div')
            itemElement.classList.add('postVeil')

            let itemTitleElement = document.createElement('div')
            itemTitleElement.classList.add('Post__title')

            let itemLink = document.createElement('a')
            itemLink.setAttribute('href', item.link)
            itemLink.classList.add('Post__description')
            
            itemElement.append(itemTitleElement)
            itemElement.append(itemLink)

            itemTitleElement.innerHTML = item.title || 'JavaScript'
            itemLink.innerHTML = item.link || 'index.html'

            itemsElement.append(itemElement)
        }

    }

    async footer() {
        let buttonSkillsElement = document.createElement('button')
        buttonSkillsElement.innerHTML='<img class="Nav__svg" src="/images/in-progress.svg"/>';
        
        let buttonHomeElement = document.createElement('button')
        buttonHomeElement.innerHTML='<img class="Nav__svg" src="/images/home.svg"/>';

        let buttonCvElement = document.createElement('button')
        buttonCvElement.innerHTML='<img class="Nav__svg" src="/images/cv.svg"/>';

        buttonSkillsElement.addEventListener('click', ()=>this.#buttonSkillsElement.call(this))
        buttonCvElement.addEventListener('click', ()=>this.#buttonCvElement.call(this))
        buttonHomeElement.addEventListener('click', ()=>this.#buttonHomeElement.call(this))

        return [buttonCvElement, buttonHomeElement, buttonSkillsElement]
    }

    #item_click_handler() {
    }

    #buttonSkillsElement(){
        this.shell.gotoView('/views/skills.js')
    }

    #buttonCvElement(){
        this.shell.gotoView('/views/cv.js')
    }

    #buttonHomeElement(){
        this.shell.gotoView('/views/home.js')
    }
}
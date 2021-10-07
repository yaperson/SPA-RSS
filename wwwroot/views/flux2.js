import InfoService from '/rss/chromeBlog.js'

export default class {
    async header() {
        let titleElement = document.createElement('div')
        titleElement.innerText = "FLUX RSS n°2"
        return titleElement;
    }

    async content() {
        let itemsElement = document.createElement('div')
        itemsElement.classList.add('home')
        let data = await InfoService.getInfo()
        
        for (let item of data) {
            createPostVeil.call(this, item)
        }

        createOptionItem.call(this)
        
        
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

        function createOptionItem() {
            
            let itemElement = document.createElement('button')
            itemElement.classList.add('toogleDark')
            itemElement.innerHTML = "DarkMode"
            itemElement.addEventListener('click', () => this.#item_click_handler())

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

        let active = 0

        if (active = 0){
        document.body.style.background = '#ffffff'
        document.body.style.color = '#2e2e2e'
        active = 1
        console.log(active) 
        }
        else{
        document.body.style.background = '#2e2e2e'
        document.body.style.color = '#ffffff'
        console.log(active)
        active = 0
        }
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
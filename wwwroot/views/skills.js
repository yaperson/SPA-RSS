import InfoService from '/services/InfoSkills.js'

export default class {
    async header() {
        let titleElement = document.createElement('div')
        titleElement.innerText = "Projets"
        return titleElement;
    }

    async content() {
         let itemsElement = document.createElement('div')
         itemsElement.classList.add('SkillsList')
         let data = await InfoService.getInfo()

         createText()
         
         for (let item of data) {
            createSkillsItem.call(this, item)
         }
/*
         for (let item of data.css) {
            createSkillsItem.call(this, item)
         }
         
         for (let item of data.javaScript) {
            createSkillsItem.call(this, item)
         }
*/
         return itemsElement

        //---

         function createText() {
            let itemElement = document.createElement('p')
            itemElement.classList.add('Skills_description')
            
            itemElement.innerText = "Voici mes différents projets du moment et leurs avancement :)"

            itemsElement.append(itemElement)
        }


        function createSkillsItem(item) {
            let itemElement = document.createElement('div')
            itemElement.classList.add('skillsJs')

                let itemTitleElement = document.createElement('a')
                itemTitleElement.setAttribute('href', item.url)
                itemTitleElement.classList.add('Skills__title')

                let skillBar = document.createElement('div')
                skillBar.classList.add('Skill__bar')

                let skillProgress = document.createElement('div')
                skillProgress.classList.add('Skill__progress')

                let itemTitleDescription = document.createElement('span')
                itemTitleDescription.classList.add('Skills__description')

                itemElement.append(itemTitleElement)
                itemElement.append(itemTitleDescription)
                itemElement.append(skillProgress)
                itemElement.append(skillBar)

                itemTitleElement.innerHTML = item.name || 'JavaScript'
                itemTitleDescription.innerHTML = item.progress || '30%'
                skillProgress.style.width = item.progress

                itemsElement.append(itemElement)
        }
    }

    async footer() {
        let buttonSkillsElement = document.createElement('button')
        buttonSkillsElement.setAttribute('aria-label','Skills')
        buttonSkillsElement.innerHTML='<img class="Nav__svg" src="/images/in-progress.svg"/>';
        
        let buttonHomeElement = document.createElement('button')
        buttonSkillsElement.setAttribute('aria-label','Home')
        buttonHomeElement.innerHTML='<img class="Nav__svg" src="/images/home.svg"/>';

        let buttonCvElement = document.createElement('button')
        buttonSkillsElement.setAttribute('aria-label','CV')
        buttonCvElement.innerHTML='<img class="Nav__svg" src="/images/cv.svg"/>';

        buttonSkillsElement.addEventListener('click', ()=>this.#buttonSkillsElement.call(this))
        buttonCvElement.addEventListener('click', ()=>this.#buttonCvElement.call(this))
        buttonHomeElement.addEventListener('click', ()=>this.#buttonHomeElement.call(this))

        return [buttonCvElement, buttonHomeElement, buttonSkillsElement]
    }

    #item_click_handler(item) {
        alert(item.title)
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
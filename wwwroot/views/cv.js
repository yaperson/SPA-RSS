import InfoService from '/services/InfoPerso.js'

export default class {
    async header() {
        let titleElement = document.createElement('div')
        titleElement.innerText = "Yanis Legrand"
        return titleElement;
    }

    async content() {
        let itemsElement = document.createElement('div')
        itemsElement.classList.add('cv__content')
    
        let data = await InfoService.getInfo()
        
        for (let item of data.items) {
            createCvItem.call(this, item)
         }
        return itemsElement

        //---

        function createCvItem(item) {
            let itemElement = document.createElement('div')
            itemElement.classList.add('cv')
            itemElement.addEventListener('click', () => this.#item_click_handler(item))

                let name = document.createElement('div')
                name.classList.add('Cv__name')

                let surname = document.createElement('div')
                surname.classList.add('Cv__surname')

                let age = document.createElement('div')
                age.classList.add('Cv__age')

                let phone = document.createElement('div')
                phone.classList.add('Cv__phone')

                let mail = document.createElement('div')
                mail.classList.add('Cv__mail')

                let experiences = document.createElement('div')
                experiences.classList.add('Cv__experiences')

                let images = document.createElement('div')
                images.classList.add('Cv__image')

                let animImages = document.createElement('div')
                animImages.classList.add('Cv__animImages')

                //itemElement.append(name)
                //itemElement.append(surname)
                //itemElement.append(age)
                itemElement.append(images)
                //itemElement.append(animImages)
                //itemElement.append(phone)
                //itemElement.append(mail)
                //itemElement.append(experiences)

                name.innerHTML = item.name || '[NO NAME]'
                surname.innerHTML = item.surname || '[NO SURNAME]'
                age.innerHTML = item.age + ' ans' || '[NO AGE]'
                phone.innerHTML = item.phone || '[NO PHONE]'
                mail.innerHTML = item.mail || '[NO MAIL]'
                //experiences.innerHTML = item.entreprise || '[NO EXPERIENCES]'
                images.innerHTML = '<img src="/images/YanisLegrand.jpg" class="Cv__image-me">'

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

    #item_click_handler(item) {
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
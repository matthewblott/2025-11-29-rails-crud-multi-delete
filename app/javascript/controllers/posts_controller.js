import { Controller } from '@hotwired/stimulus'

export default class extends Controller {

  connect() {
    this.ids = []
    this.allSelected = false
  }

  getNumber = (id) => id.match(/(?<=post_)\d+/)[0]

  toggleSelection(e) {
    const posts = this.element.querySelectorAll('div[id^="post_"]')
    const target = e.currentTarget

    this.ids = []    

    if(this.allSelected) {
      posts.forEach(post => {
        post.classList.remove('selected')
        this.dispatch("addField", { detail: this.getNumber(post.id) })
      })
      target.innerHTML = 'Select all'
    } else {
      posts.forEach(post => {
        const id = this.getNumber(post.id)
        this.ids.push(id)
        this.dispatch("addField", { detail: id }) 
        post.classList.add('selected')
      })
      target.innerHTML = 'Deselect all'
    }
    this.allSelected = !this.allSelected
    this.updateDeleteButton()
  }

  select(e) {
    const target = e.currentTarget
    const id = this.getNumber(target.id)

    if (this.ids.includes(id)) {
      this.ids = this.ids.filter(i => i !== id)
      target.classList.remove('selected')
      this.dispatch("removeField", { detail: id })
    } else {
      this.ids.push(id)
      target.classList.add('selected')
      this.dispatch("addField", { detail: id }) 
    }

    this.updateDeleteButton()
  }

  updateDeleteButton() {
    this.dispatch("enable", { detail: this.ids.length > 0 })
  }

}

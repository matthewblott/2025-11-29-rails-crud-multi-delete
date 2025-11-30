import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  
  static targets = ['delete', 'controller']

  connect() {
    this.ids = []
    this.deleteTarget.disabled = true
    this.allSelected = false
  }

  getNumber = (id) => id.match(/(?<=post_)\d+/)[0]

  toggleSelection(e) {
    const posts = this.controllerTarget.querySelectorAll('div[id^="post_"]')
    const target = e.currentTarget

    this.ids = []    

    if(this.allSelected) {
      posts.forEach(post => {
        post.classList.remove('selected')
        this.remove(this.getNumber(post.id))
      })
      target.innerHTML = 'Select all'
    } else {
      posts.forEach(post => {
        post.classList.add('selected')
        this.ids.push(this.getNumber(post.id))
        this.add(this.getNumber(post.id))
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
      this.remove(id)
    } else {
      this.ids.push(id)
      target.classList.add('selected')
      this.add(id)
    }

    this.updateDeleteButton()
  }

  add(id) {
    const input = document.createElement("input")
    input.type = "hidden"
    input.name = "ids[]"
    input.value = id
    input.dataset.idValue = id  // helps us find/remove it later
    this.deleteTarget.appendChild(input)
  }

  remove(id) {
    const input = this.deleteTarget.querySelector(`[data-id-value="${id}"]`)
    if (input){
      input.remove()
    }
  }

  updateDeleteButton() {
    const shouldDisable = this.ids.length === 0
    
    if (this.deleteDisabled !== shouldDisable) {
      this.deleteDisabled = shouldDisable
      this.deleteTarget.disabled = shouldDisable
    }

  }

}

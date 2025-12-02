import { Controller } from '@hotwired/stimulus'

export default class extends Controller {

  addField({ detail }) {
    const id = detail
    const input = document.createElement("input")
    input.type = "hidden"
    input.name = "ids[]"
    input.value = id
    input.dataset.idValue = id  // helps us find/remove it later
    this.element.appendChild(input)
  }

  removeField({ detail }) {
    const id = detail
    const input = this.element.querySelector(`[data-id-value="${id}"]`)
    if (input){
      input.remove()
    }
  }

  submit() {
    this.element.submit()
  }

}

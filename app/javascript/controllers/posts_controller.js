import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  
  static targets = ['delete']

  connect() {
    this.ids = []
    this.deleteTarget.disabled = true
  }

  select(e) {
    const target = e.currentTarget
    const id = target.id

    if (this.ids.includes(id)) {
      this.ids = this.ids.filter(i => i !== id)
      target.classList.remove('selected')
    } else {
      this.ids.push(id)
      target.classList.add('selected')
    }

    this.updateDeleteButton()
  }

  updateDeleteButton() {
    const shouldDisable = this.ids.length === 0
    
    if (this.deleteDisabled !== shouldDisable) {
      this.deleteDisabled = shouldDisable
      this.deleteTarget.disabled = shouldDisable
      
      // Send your Hotwire Native bridge message here
      console.log("Button state changed to:", shouldDisable ? "disabled" : "enabled")
    }

  }

}

const url = "localhost:80"
const form = document.getElementById("task-form")
const output = document.getElementById("output")

form.addEventListener("submit", async (e) => {
    e.preventDefault()
    const formData = new FormData(form)

    const createNewListEntry = () => {
        const newListEntry = document.createElement("li")
        newListEntry.textContent = formData.get("create-task")
        newListEntry.style.marginBottom = "1rem"
        output.appendChild(newListEntry)

        const deleteButton = document.createElement("button")
        deleteButton.innerText = "Delete"
        deleteButton.style.marginLeft = "1rem"
        newListEntry.appendChild(deleteButton)

        deleteButton.addEventListener("click", () => {
            newListEntry.remove()
        })
    }
    
})
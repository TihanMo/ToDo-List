const url = "http://localhost:80"
const form = document.getElementById("task-form")
const output = document.getElementById("output")

const fetchTasks = async () => {
    try {
        const response = await fetch(`${url}/tasks`, { method: "GET" })
        if (response.ok) {
            return await response.json()
        } else {
            console.error("Failed to fetch tasks")
            return []
        }
    } catch (error) {
        console.error("Network error:", error)
        return []
    }
}

const createNewListEntry = async (task) => {
    try {
        const response = await fetch(`${url}/tasks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title: task }),
        })

        if (response.ok) {
            await window.location.reload()
        } else {
            console.error("Failed to create task")
        }
    } catch (error) {
        console.error("Network error:", error)
    }
}

const deleteTask = async (taskId) => {
    try {
        const response = await fetch(`${url}/task/${taskId}`, {
            method: "DELETE",
        })

        if (response.ok) {
            await window.location.reload()
        } else {
            console.error("Failed to delete task");
        }
    } catch (error) {
        console.error("Network error:", error);
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const tasks = await fetchTasks()
    tasks.forEach((task) => {
        createListEntry(task)
    })
})

const createListEntry = (task) => {
    const newListEntry = document.createElement("li")
    newListEntry.textContent = task.title
    newListEntry.style.marginBottom = "1rem"

    const deleteButton = document.createElement("button")
    deleteButton.innerText = "Delete"
    deleteButton.style.marginLeft = "1rem"
    newListEntry.appendChild(deleteButton)

    deleteButton.addEventListener("click", async () => {
        await deleteTask(task)
    })

    output.appendChild(newListEntry)
}

form.addEventListener("submit", async (e) => {
    e.preventDefault()
    const formData = new FormData(form)
    const task = formData.get("create-task")
    await createNewListEntry(task)
})

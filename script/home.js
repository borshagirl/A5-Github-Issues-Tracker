
const issueContainer = document.getElementById('issues-container');
const loadingSpinner = document.getElementById('loading-spinner');

const manageSpinner = (status) => {
    if(status) {
        loadingSpinner.classList.remove('hidden')
    }
    else {
        loadingSpinner.classList.add('hidden')
    };
};

const loadAll = () => {
    // manageSpinner(true);

    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues"
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        // console.log(data.data);
        displayAll(data.data);
    })

}

const displayAll = (issues) => {
    issueContainer.innerHTML = "";

    issues.forEach(issue => {
        // console.log(issue);
        
        const div = document.createElement("div");
        div.innerHTML = `
             <div class="space-y-2 bg-white p-2 shadow-xl rounded-md min-h-70">
                    <div class="flex justify-end">
                        <p class="w-20 h-6 text-center rounded-full bg-red-200">${issue.priority.toUpperCase()}</p>
                    </div>
                    <h2 class="w-[200px] text-md font-semibold">${issue.title}</h2>
                    <p class="line-clamp-2 text-[12px] text-gray-500">${issue.description}</p>
                    <p>${issue.status}</p>
                    <div class="flex items-center gap-2">
                        <h3 class="text-center">${issue.labels}</h3>
                    </div>
                    <hr class="text-gray-400">
                    <div>
                        <p class="text-[14px] text-gray-500">${issue.author}</p>
                        <p class="text-[14px] text-gray-500">${issue.createdAt}</p>
                    </div>
                </div>
        
        `;

        // div.onclick = () => loadSingleIssue(issue.id);

        issueContainer.append(div);
    });
};

async function loadOpen () {
    // const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues"
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    const data = await res.json()

    const openIssues = data.data.filter(issue => issue.status === "open");
    displayAll(openIssues);
};

async function loadClosed () {
    const response = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues") 
    const data = await response.json()
    const closedIssue = data.data.filter(issue => issue.status === "closed");
    displayAll(closedIssue);
};



async function searchNewIssue () {
    const searchText = document.getElementById("search-issue").value;
    const replier = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`)
    const data = await replier.json()
    displayAll(data.data);
};







loadAll();
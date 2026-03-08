
const issueContainer = document.getElementById('issues-container');
const loadingSpinner = document.getElementById('loading-spinner');
const showMyModal = document.getElementById('my-modal');

const modalPriority = document.getElementById("modal-priority");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalLabelBug = document.getElementById("modal-labelBug");
const modalLabel = document.getElementById("modal-label");
const modalHr = document.getElementById("modal-hr");
const modalAuthor = document.getElementById("modal-author");
const modalCreatedAt = document.getElementById("modal-createdAt");



// show & hide loading Spinner function
function showLoading () {
    loadingSpinner.classList.remove("hidden");
    issueContainer.innerHTML = "";
};

function hideLoading () {
    loadingSpinner.classList.add("hidden");
};


async function loadAll () {
    showLoading();

    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    const data = await res.json()
    hideLoading();
    displayAll(data.data);
    
};


const displayAll = (issues) => {
    issueContainer.innerHTML = "";

    issues.forEach(issue => {
        // console.log(issue);
        
        const div = document.createElement("div");
        div.innerHTML = `
             <div onclick="openMyModal(${issue.id})" class="space-y-2 bg-white p-2 shadow-xl rounded-md min-h-75">
                    <div class="flex justify-end">
                        <p class="w-20 h-6 text-center rounded-full bg-red-200">${issue.priority.toUpperCase()}</p>
                    </div>
                    <h2 class="w-[200px] text-md font-semibold" >${issue.title}</h2>
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

        // green for all open & purple for all closed
         if(issue.status === "open") {
            div.style.borderTop = "3px solid green"
            div.style.borderRadius = "8px"
        }
        else {
            div.style.borderTop = "3px solid purple"
            div.style.borderRadius = "8px"
        };
       

        issueContainer.append(div);
    });

};



async function loadOpen () {
    showLoading();

    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    const data = await res.json()
    hideLoading();
    const openIssues = data.data.filter(issue => issue.status === "open");
    displayAll(openIssues);
};



async function loadClosed () {
    showLoading();

    const response = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues") 
    const data = await response.json()
    hideLoading();
    const closedIssue = data.data.filter(issue => issue.status === "closed");
    displayAll(closedIssue);
    
};



async function searchNewIssue () {
    const searchText = document.getElementById("search-issue").value;
    const replier = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`)
    const data = await replier.json()
    displayAll(data.data);
};


// labels ---> loop 

fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
.then((res) => res.json())
.then((data) => {
    data.data.forEach(issue => {
        issue.labels.map(label => {
            // console.log(label);
        })
    })
})


async function openMyModal(issueId){
    console.log(issueId);

    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${issueId}`)
    const json = await res.json()
    const data = json.data
    console.log(data, 'data');


    
    modalPriority.textContent = data.priority;
    modalTitle.textContent = data.title;
    modalDescription.textContent = data.description;
    modalLabelBug.textContent = data.labels;
    // modalLabel.textContent = data.labels;
    // modalHr.textContent = data.hr;
    modalAuthor.textContent = data.author;
    modalCreatedAt.textContent = data.createdAt;

    showMyModal.showModal()


};


loadAll();
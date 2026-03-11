// main.js - handles issue fetching, filtering, and UI interactions
console.log("Main page script loaded");

const API_BASE = "https://phi-lab-server.vercel.app/api/v1/lab";

// DOM references
const tabs = document.querySelectorAll(".tabs .tab");
const issuesContainer = document.getElementById("issues-container");
const loader = document.getElementById("loader");
const issueCount = document.getElementById("issues-count");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const issueModal = document.getElementById("issue-modal");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalDetails = document.getElementById("modal-details");
const modalClose = document.getElementById("modal-close");

let currentStatus = "all";
let currentQuery = "";
let allIssues = [];

// show/hide loader helpers
function showLoader() {
    loader.classList.remove("hidden");
}

function hideLoader() {
    loader.classList.add("hidden");
}

// fetch issues from API (optionally search)
async function fetchIssues(query = "") {
    const url = query
        ? `${API_BASE}/issues/search?q=${encodeURIComponent(query)}`
        : `${API_BASE}/issues`;
    console.log("fetching", url);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`fetch failed: ${res.status}`);
    const data = await res.json();
    // API wraps the array in a `data` property
    if (data && Array.isArray(data.data)) {
        return data.data;
    }
    // sometimes search returns array directly
    if (Array.isArray(data)) {
        return data;
    }
    return [];
}

// load and render based on status and query
async function loadIssues(status = "all", query = "") {
    console.log("loadIssues", status, query);
    showLoader();
    try {
        const data = await fetchIssues(query);
        allIssues = Array.isArray(data) ? data : [];
        console.log("fetched issues count", allIssues.length);
        let list = [...allIssues];
        if (status !== "all") {
            list = list.filter(i => i.status.toLowerCase() === status);
        }
        renderIssues(list);
    } catch (err) {
        console.error(err);
        issuesContainer.innerHTML = `<p class="col-span-full text-center text-red-500">Error loading issues</p>`;
        issueCount.textContent = "0";
    } finally {
        hideLoader();
    }
}

function renderIssues(issues) {
    issuesContainer.innerHTML = "";
    issueCount.textContent = issues.length;
    if (issues.length === 0) {
        issuesContainer.innerHTML =
            '<p class="col-span-full text-center text-gray-500">No issues to display</p>';
        return;
    }

    issues.forEach(issue => {
        const card = document.createElement("div");
        card.className =
            "card bg-white shadow cursor-pointer hover:shadow-lg transition relative border-t-4 p-4";
        const statusColor =
            issue.status.toLowerCase() === "open" ? "border-green-500" : "border-purple-500";
        card.classList.add(statusColor);
        card.innerHTML = `
            <h2 class="font-semibold text-md mb-2">${issue.title}</h2>
            <p class="text-sm text-gray-600 line-clamp-3">${issue.description || ''}</p>
            <div class="mt-3 text-xs space-y-1">
                <div><strong>Author:</strong> ${issue.author || "-"}</div>
                <div><strong>Priority:</strong> ${issue.priority || "-"}</div>
                <div><strong>Label:</strong> ${issue.label || "-"}</div>
                <div><strong>Created:</strong> ${new Date(issue.createdAt).toLocaleDateString()}</div>
            </div>
        `;
        card.addEventListener("click", () => openModal(issue));
        issuesContainer.appendChild(card);
    });
}

function openModal(issue) {
    modalTitle.textContent = issue.title;
    modalDescription.textContent = issue.description || "";
    modalDetails.innerHTML = `
        <div><strong>Status:</strong> ${issue.status}</div>
        <div><strong>Author:</strong> ${issue.author || "-"}</div>
        <div><strong>Priority:</strong> ${issue.priority || "-"}</div>
        <div><strong>Label:</strong> ${issue.label || "-"}</div>
        <div><strong>CreatedAt:</strong> ${new Date(issue.createdAt).toLocaleString()}</div>
    `;
    issueModal.classList.add("modal-open");
}

function closeModal() {
    issueModal.classList.remove("modal-open");
}

// event bindings
tabs.forEach(t => {
    t.addEventListener("click", () => {
        currentStatus = t.dataset.status;
        setActiveTab(t);
        loadIssues(currentStatus, currentQuery);
    });
});

function setActiveTab(el) {
    tabs.forEach(t => t.classList.remove("tab-active"));
    el.classList.add("tab-active");
}

searchBtn.addEventListener("click", () => {
    currentQuery = searchInput.value.trim();
    loadIssues("all", currentQuery);
});

searchInput.addEventListener("keyup", e => {
    if (e.key === "Enter") {
        currentQuery = searchInput.value.trim();
        loadIssues("all", currentQuery);
    }
});

modalClose.addEventListener("click", closeModal);

// initial load
loadIssues();

// Application Data
const appData = {
    sapModules: ["MM", "SD", "FI", "CO", "PP", "HR", "QM", "PM", "WM", "PS"],
    tcodeDatabase: {
        "MM": [
            {"code": "MM01", "function": "C", "description": "Create Material"},
            {"code": "MM02", "function": "C", "description": "Change Material"},
            {"code": "MM03", "function": "D", "description": "Display Material"},
            {"code": "ME21N", "function": "C", "description": "Create Purchase Order"},
            {"code": "ME22N", "function": "C", "description": "Change Purchase Order"},
            {"code": "ME23N", "function": "D", "description": "Display Purchase Order"},
            {"code": "MIGO", "function": "C", "description": "Goods Movement"},
            {"code": "MB52", "function": "D", "description": "List Stock"},
            {"code": "ME51N", "function": "C", "description": "Create Purchase Req"}
        ],
        "SD": [
            {"code": "VA01", "function": "C", "description": "Create Sales Order"},
            {"code": "VA02", "function": "C", "description": "Change Sales Order"},
            {"code": "VA03", "function": "D", "description": "Display Sales Order"},
            {"code": "VL01N", "function": "C", "description": "Create Delivery"},
            {"code": "VL02N", "function": "C", "description": "Change Delivery"},
            {"code": "VF01", "function": "C", "description": "Create Invoice"},
            {"code": "VF03", "function": "D", "description": "Display Invoice"},
            {"code": "VL06O", "function": "D", "description": "Delivery Monitor"}
        ],
        "FI": [
            {"code": "FB01", "function": "C", "description": "Post Document"},
            {"code": "FB03", "function": "D", "description": "Display Document"},
            {"code": "F-43", "function": "C", "description": "Enter AP Invoice"},
            {"code": "F-44", "function": "C", "description": "Clear AP Items"},
            {"code": "FS00", "function": "C", "description": "Edit G/L Account"},
            {"code": "FBL3N", "function": "D", "description": "G/L Account Items"},
            {"code": "FB50", "function": "C", "description": "Post GL Document"},
            {"code": "FK01", "function": "C", "description": "Create Vendor"}
        ],
        "CO": [
            {"code": "KS01", "function": "C", "description": "Create Cost Center"},
            {"code": "KS02", "function": "C", "description": "Change Cost Center"},
            {"code": "KS03", "function": "D", "description": "Display Cost Center"},
            {"code": "KB21N", "function": "C", "description": "Plan Costs"},
            {"code": "KE21N", "function": "C", "description": "Enter Plan Data"},
            {"code": "KP06", "function": "D", "description": "Cost Planning"}
        ],
        "HR": [
            {"code": "PA40", "function": "C", "description": "Personnel Action"},
            {"code": "PA20", "function": "D", "description": "Display HR Master"},
            {"code": "PA30", "function": "C", "description": "Maintain HR Master"},
            {"code": "PZ10", "function": "C", "description": "Time Management"},
            {"code": "PC00_M99_CALC", "function": "C", "description": "Payroll"}
        ]
    },
    functionTypes: {
        "C": "Change role",
        "D": "Display role", 
        "S": "Master role",
        "F": "Fiori group role",
        "E": "Custom role"
    },
    processDescriptions: {
        "MM": ["PROCUREMENT", "MATERIALS", "PURCHASING", "INVENTORY", "PLANNING"],
        "SD": ["SALES", "DELIVERY", "BILLING", "ORDERS", "CUSTOMER"],
        "FI": ["ACCOUNTING", "FINANCE", "PAYMENT", "REPORTING", "LEDGER"],
        "CO": ["CONTROLLING", "COST", "PLANNING", "ANALYSIS", "BUDGET"],
        "HR": ["PERSONNEL", "PAYROLL", "TIME", "BENEFITS", "WORKFORCE"]
    }
};

// Application state
const appState = {
    currentStep: 1,
    employee: {
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        jobTitle: '',
        address: '',
        employeeNumber: ''
    },
    selectedModules: [],
    tcodes: [],
    generatedRoles: []
};

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Landing Page Elements
    const getStartedNavBtn = document.getElementById('getStartedNav');
    const getStartedHeroBtn = document.getElementById('getStartedHero');
    
    // Step Navigation Elements
    const nextToModulesBtn = document.getElementById('nextToModules');
    const backToEmployeeBtn = document.getElementById('backToEmployee');
    const nextToTcodesBtn = document.getElementById('nextToTcodes');
    const backToModulesBtn = document.getElementById('backToModules');
    const nextToReviewBtn = document.getElementById('nextToReview');
    const backToTcodesBtn = document.getElementById('backToTcodes');
    const generateWorkplaceBtn = document.getElementById('generateWorkplace');
    
    // Result Elements
    const createAnotherBtn = document.getElementById('createAnother');
    const downloadReportBtn = document.getElementById('downloadReport');
    const backToHomeBtn = document.getElementById('backToHome');
    
    // File Upload Elements
    const fileUploadArea = document.getElementById('fileUploadArea');
    const tcodeFileInput = document.getElementById('tcodeFile');
    const browseFileBtn = document.getElementById('browseFile');
    
    // TCODE Input Elements
    const tcodeInput = document.querySelector('.tcode-input');
    const addTcodeBtn = document.querySelector('.add-tcode-btn');
    const tcodeList = document.getElementById('tcodeList');
    
    // Loading Overlay
    const loadingOverlay = document.getElementById('loadingOverlay');
    
    // Initialize Employee Number
    generateEmployeeNumber();
    
    // Initialize Modules Grid
    initializeModulesGrid();
    
    // Event Listeners
    
    // Landing Page Navigation
    getStartedNavBtn.addEventListener('click', navigateToApp);
    getStartedHeroBtn.addEventListener('click', navigateToApp);
    
    // Step Navigation
    nextToModulesBtn.addEventListener('click', () => {
        if (validateEmployeeForm()) {
            navigateToStep(2);
        }
    });
    
    backToEmployeeBtn.addEventListener('click', () => navigateToStep(1));
    
    nextToTcodesBtn.addEventListener('click', () => {
        if (validateModuleSelection()) {
            navigateToStep(3);
        }
    });
    
    backToModulesBtn.addEventListener('click', () => navigateToStep(2));
    
    nextToReviewBtn.addEventListener('click', () => {
        if (validateTcodes()) {
            populateReviewData();
            navigateToStep(4);
        }
    });
    
    backToTcodesBtn.addEventListener('click', () => navigateToStep(3));
    
    generateWorkplaceBtn.addEventListener('click', generateWorkplace);
    
    // Result Actions
    createAnotherBtn.addEventListener('click', resetApplication);
    downloadReportBtn.addEventListener('click', downloadReport);
    backToHomeBtn.addEventListener('click', navigateToLanding);
    
    // TCODE Input
    addTcodeBtn.addEventListener('click', addTcode);
    tcodeInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTcode();
        }
    });
    
    // File Upload
    fileUploadArea.addEventListener('click', () => tcodeFileInput.click());
    fileUploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        fileUploadArea.classList.add('dragover');
    });
    fileUploadArea.addEventListener('dragleave', () => fileUploadArea.classList.remove('dragover'));
    fileUploadArea.addEventListener('drop', handleFileDrop);
    tcodeFileInput.addEventListener('change', handleFileSelect);
    browseFileBtn.addEventListener('click', (e) => {
        e.preventDefault();
        tcodeFileInput.click();
    });
    
    // Employee Form Elements
    document.getElementById('firstName').addEventListener('input', updateEmployeeState);
    document.getElementById('lastName').addEventListener('input', updateEmployeeState);
    document.getElementById('dateOfBirth').addEventListener('input', updateEmployeeState);
    document.getElementById('jobTitle').addEventListener('input', updateEmployeeState);
    document.getElementById('address').addEventListener('input', updateEmployeeState);
});

// Navigation Functions
function navigateToApp() {
    document.getElementById('home').classList.add('hidden');
    document.getElementById('app').classList.remove('hidden');
    window.scrollTo(0, 0);
}

function navigateToLanding() {
    document.getElementById('app').classList.add('hidden');
    document.getElementById('home').classList.remove('hidden');
    window.scrollTo(0, 0);
}

function navigateToStep(step) {
    // Update current step
    appState.currentStep = step;
    
    // Update progress indicator
    document.querySelectorAll('.progress-step').forEach(el => {
        el.classList.remove('active');
        if (parseInt(el.dataset.step) <= step) {
            el.classList.add('active');
        }
    });
    
    // Hide all step content and show current step
    document.querySelectorAll('.step-content').forEach(el => el.classList.remove('active'));
    
    if (step === 5) {
        // Special case for success step
        document.getElementById('step-success').classList.add('active');
    } else {
        document.getElementById(`step-${step}`).classList.add('active');
    }
    
    window.scrollTo(0, 0);
}

// Employee Functions
function generateEmployeeNumber() {
    // Generate random 6-digit number
    const employeeNumber = Math.floor(100000 + Math.random() * 900000);
    appState.employee.employeeNumber = employeeNumber.toString();
    document.getElementById('employeeNumber').value = employeeNumber;
}

function updateEmployeeState(e) {
    const field = e.target.id;
    appState.employee[field] = e.target.value;
}

function validateEmployeeForm() {
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const jobTitle = document.getElementById('jobTitle').value.trim();
    
    if (!firstName) {
        alert('Please enter a first name');
        return false;
    }
    
    if (!lastName) {
        alert('Please enter a last name');
        return false;
    }
    
    if (!jobTitle) {
        alert('Please enter a job title');
        return false;
    }
    
    // Update state with form values
    appState.employee = {
        firstName,
        lastName,
        dateOfBirth: document.getElementById('dateOfBirth').value,
        jobTitle,
        address: document.getElementById('address').value.trim(),
        employeeNumber: document.getElementById('employeeNumber').value
    };
    
    return true;
}

// Module Functions
function initializeModulesGrid() {
    const modulesGrid = document.getElementById('modulesGrid');
    
    appData.sapModules.forEach(module => {
        const moduleCard = document.createElement('div');
        moduleCard.className = 'module-card';
        moduleCard.dataset.module = module;
        
        moduleCard.innerHTML = `
            <div class="module-code">${module}</div>
            <div class="module-name">${getModuleName(module)}</div>
        `;
        
        moduleCard.addEventListener('click', toggleModuleSelection);
        
        modulesGrid.appendChild(moduleCard);
    });
}

function getModuleName(moduleCode) {
    const moduleNames = {
        'MM': 'Materials Management',
        'SD': 'Sales & Distribution',
        'FI': 'Financial Accounting',
        'CO': 'Controlling',
        'PP': 'Production Planning',
        'HR': 'Human Resources',
        'QM': 'Quality Management',
        'PM': 'Plant Maintenance',
        'WM': 'Warehouse Management',
        'PS': 'Project Systems'
    };
    
    return moduleNames[moduleCode] || moduleCode;
}

function toggleModuleSelection(e) {
    const moduleCard = e.currentTarget;
    const module = moduleCard.dataset.module;
    
    if (moduleCard.classList.contains('selected')) {
        // Remove module
        moduleCard.classList.remove('selected');
        appState.selectedModules = appState.selectedModules.filter(m => m !== module);
    } else {
        // Add module
        moduleCard.classList.add('selected');
        appState.selectedModules.push(module);
    }
}

function validateModuleSelection() {
    if (appState.selectedModules.length === 0) {
        alert('Please select at least one SAP module');
        return false;
    }
    
    return true;
}

// TCODE Functions
function addTcode() {
    const tcodeInput = document.querySelector('.tcode-input');
    const tcode = tcodeInput.value.trim().toUpperCase();
    
    if (!tcode) {
        return;
    }
    
    // Check if TCODE already exists
    if (appState.tcodes.includes(tcode)) {
        alert(`TCODE ${tcode} is already added`);
        tcodeInput.value = '';
        return;
    }
    
    // Add TCODE to state
    appState.tcodes.push(tcode);
    
    // Add TCODE to UI
    addTcodeToList(tcode);
    
    // Clear input
    tcodeInput.value = '';
    tcodeInput.focus();
}

function addTcodeToList(tcode) {
    const tcodeList = document.getElementById('tcodeList');
    
    const tcodeItem = document.createElement('div');
    tcodeItem.className = 'tcode-item';
    tcodeItem.innerHTML = `
        <span class="tcode-code">${tcode}</span>
        <span class="tcode-remove" data-tcode="${tcode}">×</span>
    `;
    
    tcodeItem.querySelector('.tcode-remove').addEventListener('click', removeTcode);
    
    tcodeList.appendChild(tcodeItem);
}

function removeTcode(e) {
    const tcode = e.target.dataset.tcode;
    
    // Remove from state
    appState.tcodes = appState.tcodes.filter(t => t !== tcode);
    
    // Remove from UI
    e.target.parentElement.remove();
}

function handleFileDrop(e) {
    e.preventDefault();
    fileUploadArea.classList.remove('dragover');
    
    if (e.dataTransfer.files.length) {
        processTcodeFile(e.dataTransfer.files[0]);
    }
}

function handleFileSelect(e) {
    if (e.target.files.length) {
        processTcodeFile(e.target.files[0]);
    }
}

function processTcodeFile(file) {
    // In a real application, we would parse CSV/Excel
    // For this demo, we'll simulate adding some TCODEs
    
    // Show loading
    loadingOverlay.classList.remove('hidden');
    
    setTimeout(() => {
        // Simulate processing delay
        const sampleTcodes = ['MM01', 'MM02', 'MM03', 'ME21N', 'VA01'];
        
        sampleTcodes.forEach(tcode => {
            if (!appState.tcodes.includes(tcode)) {
                appState.tcodes.push(tcode);
                addTcodeToList(tcode);
            }
        });
        
        // Hide loading
        loadingOverlay.classList.add('hidden');
    }, 1500);
}

function validateTcodes() {
    if (appState.tcodes.length === 0) {
        alert('Please add at least one TCODE');
        return false;
    }
    
    return true;
}

// Review Functions
function populateReviewData() {
    // Employee Review
    const employeeReview = document.getElementById('employeeReview');
    employeeReview.innerHTML = `
        <div class="review-item"><strong>Name:</strong> ${appState.employee.firstName} ${appState.employee.lastName}</div>
        <div class="review-item"><strong>Employee Number:</strong> ${appState.employee.employeeNumber}</div>
        <div class="review-item"><strong>Job Title:</strong> ${appState.employee.jobTitle}</div>
        ${appState.employee.dateOfBirth ? `<div class="review-item"><strong>Date of Birth:</strong> ${appState.employee.dateOfBirth}</div>` : ''}
        ${appState.employee.address ? `<div class="review-item"><strong>Address:</strong> ${appState.employee.address}</div>` : ''}
    `;
    
    // Modules Review
    const modulesReview = document.getElementById('modulesReview');
    modulesReview.innerHTML = appState.selectedModules.map(module => 
        `<div class="review-item"><strong>${module}:</strong> ${getModuleName(module)}</div>`
    ).join('');
    
    // TCODEs Review
    const tcodesReview = document.getElementById('tcodesReview');
    tcodesReview.innerHTML = `<div class="tcode-grid">`;
    
    appState.tcodes.forEach(tcode => {
        let description = '';
        let functionType = '';
        
        // Find TCODE in database
        for (const module in appData.tcodeDatabase) {
            const found = appData.tcodeDatabase[module].find(t => t.code === tcode);
            if (found) {
                description = found.description;
                functionType = found.function;
                break;
            }
        }
        
        tcodesReview.innerHTML += `
            <div class="review-item">
                <strong>${tcode}</strong>
                ${description ? `<span> - ${description}</span>` : ''}
                ${functionType ? `<span class="status status--${functionType === 'C' ? 'success' : 'info'}">${appData.functionTypes[functionType]}</span>` : ''}
            </div>
        `;
    });
    
    tcodesReview.innerHTML += `</div>`;
}

// Generate Workplace Functions
function generateWorkplace() {
    // Show loading overlay
    loadingOverlay.classList.remove('hidden');
    
    // Simulate processing time
    setTimeout(() => {
        // Generate roles
        generateRoles();
        
        // Hide loading overlay
        loadingOverlay.classList.add('hidden');
        
        // Navigate to success step
        navigateToStep(5);
    }, 2000);
}

function generateRoles() {
    // Clear previous roles
    appState.generatedRoles = [];
    
    // Generate roles based on TCODEs and selected modules
    appState.selectedModules.forEach(module => {
        if (appData.tcodeDatabase[module]) {
            // Filter TCODEs that exist in this module
            const moduleTcodes = appData.tcodeDatabase[module].filter(t => 
                appState.tcodes.includes(t.code)
            );
            
            // Group TCODEs by function type
            const groupedByFunction = {};
            
            moduleTcodes.forEach(tcode => {
                if (!groupedByFunction[tcode.function]) {
                    groupedByFunction[tcode.function] = [];
                }
                groupedByFunction[tcode.function].push(tcode);
            });
            
            // Generate role for each function type
            for (const [functionType, tcodes] of Object.entries(groupedByFunction)) {
                if (tcodes.length > 0) {
                    // Get random process description for this module
                    const processDescriptions = appData.processDescriptions[module] || ['PROCESS'];
                    const processDesc = processDescriptions[Math.floor(Math.random() * processDescriptions.length)];
                    
                    // Generate role name: YXX_XX_X_XXXXXX:YYYYYYYYYYYYYYYYY
                    const roleName = `Y${module}_${module}_${functionType}_ORGSET:${processDesc}`;
                    
                    // Create role object
                    const role = {
                        name: roleName,
                        module: module,
                        functionType: functionType,
                        description: appData.functionTypes[functionType] + ' for ' + getModuleName(module),
                        tcodes: tcodes.map(t => t.code)
                    };
                    
                    appState.generatedRoles.push(role);
                }
            }
        }
    });
    
    // Generate roles for TCODEs not found in database
    const unmappedTcodes = appState.tcodes.filter(tcode => {
        let found = false;
        for (const module in appData.tcodeDatabase) {
            if (appData.tcodeDatabase[module].some(t => t.code === tcode)) {
                found = true;
                break;
            }
        }
        return !found;
    });
    
    if (unmappedTcodes.length > 0) {
        // Create custom role for unmapped TCODEs
        const customRole = {
            name: 'YZZ_ZZ_E_ORGSET:CUSTOM',
            module: 'CUSTOM',
            functionType: 'E',
            description: 'Custom role for unmapped TCODEs',
            tcodes: unmappedTcodes
        };
        
        appState.generatedRoles.push(customRole);
    }
    
    // Display generated roles
    displayGeneratedRoles();
}

function displayGeneratedRoles() {
    const generatedRolesEl = document.getElementById('generatedRoles');
    generatedRolesEl.innerHTML = '';
    
    if (appState.generatedRoles.length === 0) {
        generatedRolesEl.innerHTML = '<p>No roles could be generated based on the provided information.</p>';
        return;
    }
    
    appState.generatedRoles.forEach(role => {
        const roleEl = document.createElement('div');
        roleEl.className = 'role-item';
        
        roleEl.innerHTML = `
            <div>
                <div class="role-name">${role.name}</div>
                <div class="role-description">${role.description}</div>
                <div class="role-tcodes">TCODEs: ${role.tcodes.join(', ')}</div>
            </div>
            <div>
                <span class="status status--${role.functionType === 'C' ? 'success' : role.functionType === 'E' ? 'warning' : 'info'}">
                    ${role.functionType}
                </span>
            </div>
        `;
        
        generatedRolesEl.appendChild(roleEl);
    });
}

// Reset Application
function resetApplication() {
    // Reset state
    appState.currentStep = 1;
    appState.selectedModules = [];
    appState.tcodes = [];
    appState.generatedRoles = [];
    
    // Reset employee form (keeping the employee data)
    
    // Reset modules selection
    document.querySelectorAll('.module-card').forEach(card => card.classList.remove('selected'));
    
    // Reset TCODEs list
    document.getElementById('tcodeList').innerHTML = '';
    
    // Navigate to step 1
    navigateToStep(1);
}

// Download Report
function downloadReport() {
    // In a real application, this would generate and download a CSV/Excel report
    alert('Report download functionality would be implemented in a production environment');
}
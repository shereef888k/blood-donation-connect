// Blood Donation Connect Kerala - Complete Application
// Real Data Only - No Mock Data, Starts Empty

// Admin Credentials
const ADMIN_CREDENTIALS = {
    email: 'shereef888k@gmail.com',
    password: 'Shereef1234@k'
};

// Kerala Districts
const KERALA_DISTRICTS = [
    'Thiruvananthapuram', 'Kollam', 'Pathanamthitta', 'Alappuzha', 
    'Kottayam', 'Idukki', 'Ernakulam', 'Thrissur', 'Palakkad', 
    'Malappuram', 'Kozhikode', 'Wayanad', 'Kannur', 'Kasaragod'
];

// Blood Groups
const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

// Blood Compatibility Mapping
const BLOOD_COMPATIBILITY = {
    'A+': ['A+', 'A-', 'O+', 'O-'],
    'A-': ['A-', 'O-'],
    'B+': ['B+', 'B-', 'O+', 'O-'],
    'B-': ['B-', 'O-'],
    'AB+': ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    'AB-': ['A-', 'B-', 'AB-', 'O-'],
    'O+': ['O+', 'O-'],
    'O-': ['O-']
};

// Application State - Starts Empty (Real Data Only)
let appState = {
    donors: [],
    requests: [],
    currentSection: 'home',
    isAdminLoggedIn: false,
    filters: {
        donorDistrict: '',
        donorBloodGroup: '',
        requestDistrict: '',
        requestBloodGroup: ''
    }
};

// Global Navigation Function
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('section').forEach(sec => sec.classList.add('hidden'));
    // Show the selected section
    const section = document.getElementById(sectionId);
    if (section) section.classList.remove('hidden');
}
window.showSection = showSection;

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    console.log('🩸 Blood Donation Connect Kerala - Initializing...');
    initializeApp();
    setupEventListeners();
    updateAllStatistics();
});

// Initialize Application
function initializeApp() {
    // Start with home section
    showSection('home');
    console.log('✅ Application initialized with empty data arrays');
}

// Setup Event Listeners
function setupEventListeners() {
    console.log('🔧 Setting up event listeners...');
    
    // Form submissions
    const donorForm = document.getElementById('donorForm');
    const requestForm = document.getElementById('requestForm');
    const adminLoginForm = document.getElementById('adminLoginForm');
    
    if (donorForm) {
        donorForm.addEventListener('submit', handleDonorRegistration);
        console.log('✅ Donor form listener added');
    }
    
    if (requestForm) {
        requestForm.addEventListener('submit', handleBloodRequest);
        console.log('✅ Request form listener added');
    }
    
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', handleAdminLogin);
        console.log('✅ Admin login form listener added');
    }
    
    // Filter listeners
    setupFilterListeners();
    
    // Setup all navigation elements
    setupAllNavigation();
    
    console.log('✅ All event listeners setup complete');
}

// Setup All Navigation Elements
function setupAllNavigation() {
    // Setup menu cards
    setupMenuCards();
    
    // Setup navigation buttons
    setupNavigationButtons();
    
    // Setup any other clickable elements that need navigation
    setupAdditionalNavigation();
}

// Setup Menu Cards
function setupMenuCards() {
    const menuCards = document.querySelectorAll('.menu-card');
    console.log(`🔧 Found ${menuCards.length} menu cards to setup`);
    
    menuCards.forEach((card, index) => {
        // Remove existing onclick attribute to avoid conflicts
        card.removeAttribute('onclick');
        
        // Add click event listener
        card.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Determine section based on card content or index
            let targetSection = '';
            const titleElement = card.querySelector('.menu-title');
            
            if (titleElement) {
                const title = titleElement.textContent.trim();
                
                switch(title) {
                    case 'Register as Donor':
                        targetSection = 'register';
                        break;
                    case 'Post Blood Request':
                        targetSection = 'request';
                        break;
                    case 'View Donors':
                        targetSection = 'donors';
                        break;
                    case 'Active Requests':
                        targetSection = 'requests';
                        break;
                    case 'Emergency Contacts':
                        targetSection = 'emergency';
                        break;
                    case 'Blood Resources':
                        targetSection = 'resources';
                        break;
                    case 'Admin Panel':
                        targetSection = 'admin';
                        break;
                    default:
                        console.warn('Unknown menu card title:', title);
                        return;
                }
            }
            
            if (targetSection) {
                console.log(`📱 Menu card clicked: ${titleElement ? titleElement.textContent : 'Unknown'} → ${targetSection}`);
                showSection(targetSection);
            }
        });
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    console.log(`✅ Setup ${menuCards.length} menu card listeners`);
}

// Setup Navigation Buttons
function setupNavigationButtons() {
    // Setup navigation buttons in header
    const navButtons = document.querySelectorAll('.nav-btn, [data-section]');
    console.log(`🔧 Found ${navButtons.length} navigation buttons to setup`);
    
    navButtons.forEach(button => {
        // Remove existing onclick attribute
        button.removeAttribute('onclick');
        
        // Add click event listener
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            let targetSection = this.getAttribute('data-section');
            
            // If no data-section attribute, try to parse from text content
            if (!targetSection) {
                const text = this.textContent.trim().toLowerCase();
                
                if (text.includes('home')) targetSection = 'home';
                else if (text.includes('register')) targetSection = 'register';
                else if (text.includes('post') || text.includes('request')) targetSection = 'request';
                else if (text.includes('view') || text.includes('donors')) targetSection = 'donors';
                else if (text.includes('active') || text.includes('requests')) targetSection = 'requests';
                else if (text.includes('emergency')) targetSection = 'emergency';
                else if (text.includes('admin')) targetSection = 'admin';
                else if (text.includes('become')) targetSection = 'register';
                else if (text.includes('find blood')) targetSection = 'request';
            }
            
            if (targetSection) {
                console.log(`🎯 Navigation button clicked: ${this.textContent.trim()} → ${targetSection}`);
                showSection(targetSection);
            }
        });
    });
    
    console.log(`✅ Setup ${navButtons.length} navigation button listeners`);
}

// Setup Additional Navigation
function setupAdditionalNavigation() {
    // Setup any buttons with onclick attributes that call showSection
    const additionalButtons = document.querySelectorAll('button[onclick*="showSection"], a[onclick*="showSection"]');
    
    additionalButtons.forEach(button => {
        const onclickAttr = button.getAttribute('onclick');
        if (onclickAttr) {
            const match = onclickAttr.match(/showSection\(['"]([^'"]+)['"]\)/);
            if (match) {
                const targetSection = match[1];
                
                // Remove onclick attribute
                button.removeAttribute('onclick');
                
                // Add event listener
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    console.log(`🔗 Additional navigation clicked → ${targetSection}`);
                    showSection(targetSection);
                });
            }
        }
    });
    
    console.log(`✅ Setup additional navigation for ${additionalButtons.length} elements`);
}

// Setup Filter Listeners
function setupFilterListeners() {
    const donorFilterDistrict = document.getElementById('donorFilterDistrict');
    const donorFilterBlood = document.getElementById('donorFilterBlood');
    const requestFilterDistrict = document.getElementById('requestFilterDistrict');
    const requestFilterBlood = document.getElementById('requestFilterBlood');
    
    if (donorFilterDistrict) {
        donorFilterDistrict.addEventListener('change', (e) => {
            appState.filters.donorDistrict = e.target.value;
            displayDonors();
        });
    }
    
    if (donorFilterBlood) {
        donorFilterBlood.addEventListener('change', (e) => {
            appState.filters.donorBloodGroup = e.target.value;
            displayDonors();
        });
    }
    
    if (requestFilterDistrict) {
        requestFilterDistrict.addEventListener('change', (e) => {
            appState.filters.requestDistrict = e.target.value;
            displayRequests();
        });
    }
    
    if (requestFilterBlood) {
        requestFilterBlood.addEventListener('change', (e) => {
            appState.filters.requestBloodGroup = e.target.value;
            displayRequests();
        });
    }
}

// Handle Donor Registration
async function handleDonorRegistration(event) {
    event.preventDefault();
    console.log('📝 Processing donor registration...');
    
    showLoadingModal('Registering donor...');
    
    try {
        // Get form data
        const formData = {
            name: document.getElementById('donorName').value.trim(),
            age: parseInt(document.getElementById('donorAge').value),
            gender: document.getElementById('donorGender').value,
            bloodGroup: document.getElementById('donorBloodGroup').value,
            district: document.getElementById('donorDistrict').value,
            phone: document.getElementById('donorPhone').value.trim(),
            address: document.getElementById('donorAddress').value.trim(),
            lastDonation: document.getElementById('lastDonation').value || null
        };
        
        console.log('📋 Form data collected:', formData);
        
        // Validate form data
        validateDonorData(formData);
        
        // Check for duplicate phone number
        const existingDonor = appState.donors.find(donor => donor.phone === formData.phone);
        if (existingDonor) {
            throw new Error('A donor with this phone number is already registered');
        }
        
        // Create new donor record
        const newDonor = {
            id: generateId('donor'),
            ...formData,
            registeredAt: new Date().toISOString()
        };
        
        // Add to donors array
        appState.donors.push(newDonor);
        
        // Simulate processing delay
        await delay(1200);
        
        // Hide loading modal
        hideLoadingModal();
        
        // Show success message
        showToast('🩸 Registration Successful! Thank you for joining our life-saving community. You may be contacted when someone needs your blood group in your district.', 'success');
        
        // Reset form
        event.target.reset();
        
        // Update statistics
        updateAllStatistics();
        
        console.log('✅ Donor registered successfully:', newDonor.name);
        
        // Navigate back to home after 2 seconds to show updated statistics
        setTimeout(() => {
            showSection('home');
            showToast('🏠 Returning to home page to view updated statistics...', 'info');
        }, 2000);
        
    } catch (error) {
        hideLoadingModal();
        console.error('❌ Donor registration error:', error);
        showToast(`❌ Registration Failed: ${error.message}`, 'error');
    }
}

// Handle Blood Request
async function handleBloodRequest(event) {
    event.preventDefault();
    console.log('🚨 Processing blood request...');
    
    showLoadingModal('Searching for compatible donors...');
    
    try {
        // Get form data
        const formData = {
            bloodGroup: document.getElementById('requestBloodGroup').value,
            district: document.getElementById('requestDistrict').value,
            patientName: document.getElementById('patientName').value.trim(),
            contactNumber: document.getElementById('requestContact').value.trim(),
            hospitalLocation: document.getElementById('hospitalLocation').value.trim(),
            notes: document.getElementById('requestNotes').value.trim(),
            urgent: document.getElementById('urgentRequest') ? document.getElementById('urgentRequest').checked : false
        };
        
        console.log('📋 Request data collected:', formData);
        
        // Validate form data
        validateRequestData(formData);
        
        // Find compatible donors
        const compatibleDonors = findCompatibleDonors(formData.bloodGroup, formData.district);
        
        // Create new request record
        const newRequest = {
            id: generateId('request'),
            ...formData,
            requestedAt: new Date().toISOString()
        };
        
        // Add to requests array
        appState.requests.push(newRequest);
        
        // Simulate processing delay
        await delay(1500);
        
        // Hide loading modal
        hideLoadingModal();
        
        if (compatibleDonors.length > 0) {
            // Show success and initiate WhatsApp contacts
            showToast(`🩸 Found ${compatibleDonors.length} compatible donor(s) in ${formData.district}! Opening WhatsApp to contact donors...`, 'success');
            
            // Open WhatsApp for each compatible donor
            setTimeout(() => {
                openWhatsAppForDonors(compatibleDonors, formData);
            }, 2000);
            
        } else {
            showToast('⚠️ No registered donors found for your blood group in your district. Your request has been recorded and donors will be notified when they register.', 'warning');
        }
        
        // Reset form
        event.target.reset();
        
        // Update statistics
        updateAllStatistics();
        
        console.log('✅ Blood request submitted:', newRequest.patientName);
        
        // Navigate to active requests to show the new request
        setTimeout(() => {
            showSection('requests');
            showToast('📋 View your request in Active Requests section...', 'info');
        }, 3000);
        
    } catch (error) {
        hideLoadingModal();
        console.error('❌ Blood request error:', error);
        showToast(`❌ Request Failed: ${error.message}`, 'error');
    }
}

// Handle Admin Login
async function handleAdminLogin(event) {
    event.preventDefault();
    console.log('⚡ Processing admin login...');
    
    const email = document.getElementById('adminEmail').value.trim();
    const password = document.getElementById('adminPassword').value;
    
    try {
        // Verify credentials
        if (email !== ADMIN_CREDENTIALS.email || password !== ADMIN_CREDENTIALS.password) {
            throw new Error('Invalid email or password');
        }
        
        // Set admin logged in state
        appState.isAdminLoggedIn = true;
        
        // Hide login form and show dashboard
        const loginForm = document.getElementById('adminLogin');
        const dashboard = document.getElementById('adminDashboard');
        
        if (loginForm) loginForm.classList.add('hidden');
        if (dashboard) dashboard.classList.remove('hidden');
        
        // Update admin dashboard
        updateAdminDashboard();
        
        showToast('⚡ Admin login successful! Viewing system statistics and data.', 'success');
        
        console.log('✅ Admin logged in successfully');
        
    } catch (error) {
        showToast(`❌ Login Failed: ${error.message}`, 'error');
        console.error('❌ Admin login error:', error);
    }
}

// Find Compatible Donors
function findCompatibleDonors(requiredBloodGroup, district) {
    const compatibleBloodGroups = BLOOD_COMPATIBILITY[requiredBloodGroup] || [requiredBloodGroup];
    
    const compatibleDonors = appState.donors.filter(donor => 
        compatibleBloodGroups.includes(donor.bloodGroup) && 
        donor.district === district
    );
    
    console.log(`🔍 Found ${compatibleDonors.length} compatible donors for ${requiredBloodGroup} in ${district}`);
    return compatibleDonors;
}

// Open WhatsApp for Donors
function openWhatsAppForDonors(donors, requestData) {
    const message = `🩸 *URGENT BLOOD REQUIREMENT* 🩸

Patient: ${requestData.patientName}
Required Blood Group: ${requestData.bloodGroup}
Hospital: ${requestData.hospitalLocation}
District: ${requestData.district}
Contact: ${requestData.contactNumber}

${requestData.notes ? 'Additional Notes: ' + requestData.notes : ''}
${requestData.urgent ? '🚨 *THIS IS AN URGENT REQUIREMENT*' : ''}

Can you help by donating blood? This is a genuine medical requirement.

Thank you for your service to humanity! 🙏

*Blood Donation Connect Kerala*`;

    donors.forEach((donor, index) => {
        setTimeout(() => {
            const phoneNumber = donor.phone.startsWith('+91') ? donor.phone : `+91${donor.phone}`;
            const cleanPhone = phoneNumber.replace(/\D/g, '');
            const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
            
            // Show notification for each donor being contacted
            showToast(`📱 Opening WhatsApp for ${donor.name} (${index + 1}/${donors.length})...`, 'info');
            
            // Open WhatsApp
            window.open(whatsappUrl, '_blank');
            
        }, index * 2000); // Stagger by 2 seconds
    });
}

// Display Donors
function displayDonors() {
    const donorsList = document.getElementById('donorsList');
    if (!donorsList) return;
    
    let filteredDonors = [...appState.donors];
    
    // Apply filters
    if (appState.filters.donorDistrict) {
        filteredDonors = filteredDonors.filter(donor => donor.district === appState.filters.donorDistrict);
    }
    
    if (appState.filters.donorBloodGroup) {
        filteredDonors = filteredDonors.filter(donor => donor.bloodGroup === appState.filters.donorBloodGroup);
    }
    
    if (filteredDonors.length === 0) {
        donorsList.innerHTML = `
            <div class="empty-state">
                <h3>👥 No Donors Found</h3>
                <p>${appState.donors.length === 0 ? 
                    'Be the first to register as a blood donor and help save lives!' : 
                    'No donors match your current filters. Try adjusting the filters.'}</p>
                <button class="btn btn--primary" data-section="register">📋 Register as Donor</button>
            </div>
        `;
        
        // Setup navigation for the button
        const registerBtn = donorsList.querySelector('[data-section="register"]');
        if (registerBtn) {
            registerBtn.addEventListener('click', () => showSection('register'));
        }
        
        return;
    }
    
    donorsList.innerHTML = filteredDonors.map(donor => `
        <div class="data-card">
            <div class="data-card-header">
                <h3 class="data-card-name">${donor.name}</h3>
                <span class="blood-group-badge">${donor.bloodGroup}</span>
            </div>
            <div class="data-card-info">
                <div>👤 ${donor.gender}, ${donor.age} years</div>
                <div>📍 ${donor.district}</div>
                <div>📱 ${donor.phone}</div>
                <div>🩸 Last donated: ${donor.lastDonation ? new Date(donor.lastDonation).toLocaleDateString() : 'Never'}</div>
            </div>
            <div class="data-card-actions">
                <button class="btn btn--sm whatsapp-btn" data-contact-donor="${donor.id}">💬 WhatsApp</button>
                <a href="tel:${donor.phone}" class="btn btn--sm btn--outline">📞 Call</a>
            </div>
        </div>
    `).join('');
    
    // Setup contact buttons
    const contactBtns = donorsList.querySelectorAll('[data-contact-donor]');
    contactBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const donorId = btn.getAttribute('data-contact-donor');
            contactDonor(donorId);
        });
    });
    
    console.log(`📊 Displayed ${filteredDonors.length} donors`);
}

// Display Requests
function displayRequests() {
    const requestsList = document.getElementById('requestsList');
    if (!requestsList) return;
    
    let filteredRequests = [...appState.requests];
    
    // Apply filters
    if (appState.filters.requestDistrict) {
        filteredRequests = filteredRequests.filter(req => req.district === appState.filters.requestDistrict);
    }
    
    if (appState.filters.requestBloodGroup) {
        filteredRequests = filteredRequests.filter(req => req.bloodGroup === appState.filters.requestBloodGroup);
    }
    
    if (filteredRequests.length === 0) {
        requestsList.innerHTML = `
            <div class="empty-state">
                <h3>🩸 No Active Requests</h3>
                <p>${appState.requests.length === 0 ? 
                    'No blood requests at the moment. All current requirements have been fulfilled!' : 
                    'No requests match your current filters. Try adjusting the filters.'}</p>
            </div>
        `;
        return;
    }
    
    requestsList.innerHTML = filteredRequests.reverse().map(request => `
        <div class="data-card">
            <div class="data-card-header">
                <h3 class="data-card-name">${request.patientName}</h3>
                <div>
                    <span class="blood-group-badge">${request.bloodGroup}</span>
                    ${request.urgent ? '<span class="urgent-indicator">🚨 URGENT</span>' : ''}
                </div>
            </div>
            <div class="data-card-info">
                <div>📍 ${request.district}</div>
                <div>📱 ${request.contactNumber}</div>
                <div>🏥 ${request.hospitalLocation.substring(0, 50)}${request.hospitalLocation.length > 50 ? '...' : ''}</div>
                <div>⏰ ${new Date(request.requestedAt).toLocaleDateString()}</div>
            </div>
            ${request.notes ? `<div class="data-card-notes" style="margin-top: 8px; padding: 8px; background: var(--color-bg-1); border-radius: 4px; font-size: 14px;">📋 ${request.notes}</div>` : ''}
            <div class="data-card-actions">
                <button class="btn btn--sm whatsapp-btn" data-contact-requester="${request.id}">💬 WhatsApp</button>
                <a href="tel:${request.contactNumber}" class="btn btn--sm btn--outline">📞 Call</a>
            </div>
        </div>
    `).join('');
    
    // Setup contact buttons
    const contactBtns = requestsList.querySelectorAll('[data-contact-requester]');
    contactBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const requestId = btn.getAttribute('data-contact-requester');
            contactRequester(requestId);
        });
    });
    
    console.log(`📊 Displayed ${filteredRequests.length} requests`);
}

// Contact Functions
function contactDonor(donorId) {
    const donor = appState.donors.find(d => d.id === donorId);
    if (!donor) return;
    
    const message = `Hello ${donor.name},

I found your contact through Blood Donation Connect Kerala. 

I need ${donor.bloodGroup} blood donation. Can you please help?

Thank you!

*Blood Donation Connect Kerala*`;
    
    const phoneNumber = donor.phone.startsWith('+91') ? donor.phone : `+91${donor.phone}`;
    const cleanPhone = phoneNumber.replace(/\D/g, '');
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    showToast(`📱 Opening WhatsApp to contact ${donor.name}...`, 'info');
}

function contactRequester(requestId) {
    const request = appState.requests.find(r => r.id === requestId);
    if (!request) return;
    
    const message = `Hello,

I saw your blood requirement for ${request.patientName} through Blood Donation Connect Kerala.

I can help with ${request.bloodGroup} blood donation in ${request.district}.

Please let me know the details.

Thank you!

*Blood Donation Connect Kerala*`;
    
    const phoneNumber = request.contactNumber.startsWith('+91') ? request.contactNumber : `+91${request.contactNumber}`;
    const cleanPhone = phoneNumber.replace(/\D/g, '');
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    showToast(`📱 Opening WhatsApp to contact requester...`, 'info');
}

// Make contact functions globally accessible
window.contactDonor = contactDonor;
window.contactRequester = contactRequester;

// Admin Functions - Make globally accessible
window.exportData = function() {
    const data = {
        donors: appState.donors,
        requests: appState.requests,
        exportedAt: new Date().toISOString(),
        totalDonors: appState.donors.length,
        totalRequests: appState.requests.length,
        activeDistricts: [...new Set([...appState.donors.map(d => d.district), ...appState.requests.map(r => r.district)])]
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `blood-donation-data-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    showToast('📊 Data exported successfully!', 'success');
    console.log('📊 Data exported:', data);
};

window.clearOldRequests = function() {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const originalLength = appState.requests.length;
    appState.requests = appState.requests.filter(request => 
        new Date(request.requestedAt) > thirtyDaysAgo
    );
    
    const deletedCount = originalLength - appState.requests.length;
    
    updateAdminDashboard();
    updateAllStatistics();
    
    showToast(`🗑️ Cleared ${deletedCount} old requests (older than 30 days)`, 'success');
    console.log(`🗑️ Cleared ${deletedCount} old requests`);
};

window.logoutAdmin = function() {
    appState.isAdminLoggedIn = false;
    
    // Show login form and hide dashboard
    const loginForm = document.getElementById('adminLogin');
    const dashboard = document.getElementById('adminDashboard');
    
    if (loginForm) loginForm.classList.remove('hidden');
    if (dashboard) dashboard.classList.add('hidden');
    
    // Reset login form
    const adminForm = document.getElementById('adminLoginForm');
    if (adminForm) adminForm.reset();
    
    showToast('🚪 Admin logged out successfully', 'info');
    console.log('🚪 Admin logged out');
};

// Update Admin Dashboard
function updateAdminDashboard() {
    console.log('📊 Updating admin dashboard...');
    
    // Update statistics
    const adminTotalDonors = document.getElementById('adminTotalDonors');
    const adminTotalRequests = document.getElementById('adminTotalRequests');
    const adminActiveDistricts = document.getElementById('adminActiveDistricts');
    
    if (adminTotalDonors) adminTotalDonors.textContent = appState.donors.length;
    if (adminTotalRequests) adminTotalRequests.textContent = appState.requests.length;
    
    // Calculate active districts
    const activeDistricts = new Set([
        ...appState.donors.map(d => d.district),
        ...appState.requests.map(r => r.district)
    ]);
    if (adminActiveDistricts) adminActiveDistricts.textContent = activeDistricts.size;
    
    // Update donors table
    const donorsTable = document.getElementById('adminDonorsTable');
    if (donorsTable) {
        if (appState.donors.length === 0) {
            donorsTable.innerHTML = '<div class="empty-table">No donors registered yet</div>';
        } else {
            const recentDonors = appState.donors.slice(-5).reverse();
            donorsTable.innerHTML = recentDonors.map(donor => `
                <div class="table-row">
                    <div>
                        <div class="table-name">${donor.name}</div>
                        <div class="table-info">📱 ${donor.phone} • 📍 ${donor.district}</div>
                    </div>
                    <div class="table-blood-group">${donor.bloodGroup}</div>
                </div>
            `).join('');
        }
    }
    
    // Update requests table
    const requestsTable = document.getElementById('adminRequestsTable');
    if (requestsTable) {
        if (appState.requests.length === 0) {
            requestsTable.innerHTML = '<div class="empty-table">No blood requests yet</div>';
        } else {
            const recentRequests = appState.requests.slice(-5).reverse();
            requestsTable.innerHTML = recentRequests.map(request => `
                <div class="table-row">
                    <div>
                        <div class="table-name">${request.patientName}</div>
                        <div class="table-info">📱 ${request.contactNumber} • 📍 ${request.district}</div>
                    </div>
                    <div class="table-blood-group">${request.bloodGroup}</div>
                </div>
            `).join('');
        }
    }
    
    console.log('✅ Admin dashboard updated');
}

// Update All Statistics
function updateAllStatistics() {
    // Update main statistics
    const totalDonorsEl = document.getElementById('totalDonors');
    const totalRequestsEl = document.getElementById('totalRequests');
    
    if (totalDonorsEl) totalDonorsEl.textContent = appState.donors.length;
    if (totalRequestsEl) totalRequestsEl.textContent = appState.requests.length;
    
    // Update admin statistics if logged in
    if (appState.isAdminLoggedIn) {
        updateAdminDashboard();
    }
    
    console.log(`📈 Statistics updated: ${appState.donors.length} donors, ${appState.requests.length} requests`);
}

// Validation Functions
function validateDonorData(data) {
    if (!data.name || data.name.length < 2) {
        throw new Error('Please enter a valid name (at least 2 characters)');
    }
    
    if (!data.age || data.age < 18 || data.age > 65) {
        throw new Error('Age must be between 18 and 65 years');
    }
    
    if (!data.gender) {
        throw new Error('Please select gender');
    }
    
    if (!data.bloodGroup) {
        throw new Error('Please select blood group');
    }
    
    if (!data.district) {
        throw new Error('Please select district');
    }
    
    if (!data.phone || !/^\d{10}$/.test(data.phone.replace(/\D/g, ''))) {
        throw new Error('Please enter a valid 10-digit phone number');
    }
    
    if (!data.address || data.address.length < 10) {
        throw new Error('Please enter a complete address (at least 10 characters)');
    }
    
    console.log('✅ Donor data validation passed');
}

function validateRequestData(data) {
    if (!data.bloodGroup) {
        throw new Error('Please select required blood group');
    }
    
    if (!data.district) {
        throw new Error('Please select district');
    }
    
    if (!data.patientName || data.patientName.length < 2) {
        throw new Error('Please enter a valid patient name');
    }
    
    if (!data.contactNumber || !/^\d{10}$/.test(data.contactNumber.replace(/\D/g, ''))) {
        throw new Error('Please enter a valid 10-digit contact number');
    }
    
    if (!data.hospitalLocation || data.hospitalLocation.length < 10) {
        throw new Error('Please enter complete hospital name and address');
    }
    
    console.log('✅ Request data validation passed');
}

// Utility Functions
function generateId(prefix) {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// UI Functions
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    
    const icon = toast.querySelector('.toast-icon');
    const messageEl = toast.querySelector('.toast-message');
    
    // Set icon based on type
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    
    if (icon) icon.textContent = icons[type] || icons.info;
    if (messageEl) messageEl.textContent = message;
    
    // Set toast type
    toast.className = `toast ${type}`;
    
    // Show toast
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('show'), 10);
    
    // Auto hide after 6 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.classList.add('hidden'), 300);
    }, 6000);
}

function showLoadingModal(text) {
    const modal = document.getElementById('loadingModal');
    const textEl = document.getElementById('loadingText');
    
    if (textEl) textEl.textContent = text;
    if (modal) modal.classList.remove('hidden');
}

function hideLoadingModal() {
    const modal = document.getElementById('loadingModal');
    if (modal) modal.classList.add('hidden');
}

// Log initialization
console.log('🩸 Blood Donation Connect Kerala - Application Loaded Successfully');
console.log('📊 Starting with empty arrays - real data only');
console.log('🏥 Supporting all 14 Kerala districts');
console.log('💾 Data persists during session (in-memory storage)');
console.log('⚡ Admin credentials: shereef888k@gmail.com / Shereef1234@k');
console.log('🔧 All navigation and form handlers initialized');
console.log('🩸 Menu cards added to home page for easy navigation');
console.log('🔧 Enhanced navigation system with proper event handling');

// Handle Request Blood form submission
document.getElementById('requestForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Collect form data
    const request = {
        bloodGroup: document.getElementById('requestBloodGroup').value,
        district: document.getElementById('requestDistrict').value,
        patientName: document.getElementById('patientName').value,
        contact: document.getElementById('requestContact').value,
        hospital: document.getElementById('hospitalLocation').value,
        notes: document.getElementById('requestNotes').value,
        urgent: document.getElementById('urgentRequest').checked,
        date: new Date().toLocaleString()
    };

    // Get existing requests from localStorage or create new array
    const requests = JSON.parse(localStorage.getItem('bloodRequests') || '[]');
    requests.unshift(request); // Add new request to the beginning

    // Save back to localStorage
    localStorage.setItem('bloodRequests', JSON.stringify(requests));

    // Optionally, clear the form
    this.reset();

    // Show success message (optional)
    alert('Blood request posted successfully!');

    // Update the Active Requests section
    renderActiveRequests();
});

// Function to render Active Blood Requests
function renderActiveRequests() {
    const requests = JSON.parse(localStorage.getItem('bloodRequests') || '[]');
    const requestsList = document.getElementById('requestsList');
    if (!requests.length) {
        requestsList.innerHTML = `
            <div class="empty-state">
                <h3>🩸 No Active Requests</h3>
                <p>All current blood requirements have been fulfilled. Thank you to all donors!</p>
            </div>
        `;
        return;
    }
    requestsList.innerHTML = requests.map(req => `
        <div class="request-card${req.urgent ? ' urgent' : ''}">
            <h4>${req.bloodGroup} needed in ${req.district} ${req.urgent ? '🚨' : ''}</h4>
            <p><strong>Patient:</strong> ${req.patientName}</p>
            <p><strong>Contact:</strong> <a href="tel:${req.contact}">${req.contact}</a></p>
            <p><strong>Hospital:</strong> ${req.hospital}</p>
            ${req.notes ? `<p><strong>Notes:</strong> ${req.notes}</p>` : ''}
            <p class="request-date">${req.date}</p>
        </div>
    `).join('');
}
async function handleDonorRegistration(event) {
  event.preventDefault();

  const formData = {
    name: document.getElementById('donorName').value,
    age: document.getElementById('donorAge').value,
    gender: document.getElementById('donorGender').value,
    bloodGroup: document.getElementById('donorBloodGroup').value,
    district: document.getElementById('donorDistrict').value,
    phone: document.getElementById('donorPhone').value,
    address: document.getElementById('donorAddress').value,
    lastDonation: document.getElementById('lastDonation').value || null
  };

  try {
    const { addDoc, collection } = await import("https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js");
    await addDoc(collection(window.db, "donors"), formData);

    alert("✅ Donor registered successfully!");
    event.target.reset();
    loadDonors();
  } catch (err) {
    console.error("Error saving donor: ", err);
  }
}

async function loadDonors() {
  const { getDocs, collection } = await import("https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js");
  const querySnapshot = await getDocs(collection(window.db, "donors"));

  const list = document.getElementById("donorsList");
  list.innerHTML = "";
  querySnapshot.forEach((doc) => {
    const donor = doc.data();
    list.innerHTML += `
      <div class="data-card">
        <h3>${donor.name}</h3>
        <p>🩸 ${donor.bloodGroup} - ${donor.district}</p>
        <p>📱 ${donor.phone}</p>
      </div>
    `;
  });
}

// Call renderActiveRequests() when the page loads
document.addEventListener('DOMContentLoaded', renderActiveRequests);

// Clean npm cache and install latest firebase-tools
// (The following commands should be run in your terminal, not in this JavaScript file.)
// npm cache clean --force
// npm install -g npm
// npm install -g firebase-tools --unsafe-perm=true

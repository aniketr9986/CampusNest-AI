// Retrieve datasets and procedural generator from global scope (with safe fallbacks)
function getSeededColleges() {
  return window.seededColleges || [];
}

function getGenerateCustomCollegeData() {
  return window.generateCustomCollegeData || (() => { console.error("Custom generator not loaded"); return null; });
}

// Global State
let currentCollegeData = null;
let selectedPg = null;

// Initialize app and attach event listeners when DOM is ready
function init() {
  console.log("CampusNest AI: Initializing application components...");
  try {
    renderSuggestions();
  } catch (e) {
    console.error("Error in renderSuggestions:", e);
  }
  
  try {
    setupFormEventListeners();
  } catch (e) {
    console.error("Error in setupFormEventListeners:", e);
  }
  
  try {
    setupTabEventListeners();
  } catch (e) {
    console.error("Error in setupTabEventListeners:", e);
  }
  
  // Set default college in input
  const collegeInput = document.getElementById('college-name');
  if (collegeInput) {
    collegeInput.value = "Delhi University (North Campus)";
  }
  console.log("CampusNest AI: Initialization complete.");
}

// Render pre-seeded college suggestion tags
function renderSuggestions() {
  const suggestionsContainer = document.getElementById('suggestions-list');
  if (!suggestionsContainer) {
    console.warn("Element #suggestions-list not found");
    return;
  }
  suggestionsContainer.innerHTML = '';
  
  const colleges = getSeededColleges();
  if (colleges.length === 0) {
    console.warn("No pre-seeded colleges found in window.seededColleges");
  }
  
  colleges.slice(0, 3).forEach(college => {
    const tag = document.createElement('div');
    tag.className = 'suggestion-tag';
    tag.innerHTML = `<i class="fa-solid fa-graduation-cap"></i> ${college.name}`;
    tag.addEventListener('click', () => {
      const input = document.getElementById('college-name');
      if (input) input.value = college.name;
    });
    suggestionsContainer.appendChild(tag);
  });
}

// Bind form-related event listeners programmatically
function setupFormEventListeners() {
  const form = document.getElementById('relocation-form');
  if (form) {
    form.addEventListener('submit', handleFormSubmit);
    console.log("CampusNest AI: Form submit listener attached.");
  } else {
    console.error("Element #relocation-form not found");
  }

  // Budget slider listener
  const slider = document.getElementById('budget-range');
  if (slider) {
    slider.addEventListener('input', (e) => {
      updateBudgetLabel(e.target.value);
    });
    // Set initial label
    updateBudgetLabel(slider.value);
  }

  // Grid select cards listeners
  const gridSelects = document.querySelectorAll('.grid-select');
  gridSelects.forEach(group => {
    const cards = group.querySelectorAll('.select-card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        // Remove active class from sibling cards
        cards.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked card
        card.classList.add('active');
        
        // Check corresponding radio input inside the card
        const radio = card.querySelector('input[type="radio"]');
        if (radio) {
          radio.checked = true;
        }
      });
    });
  });
}

// Bind report tab listeners programmatically
function setupTabEventListeners() {
  const tabBtns = document.querySelectorAll('.report-tabs .tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from other buttons
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Get target tab content ID
      const tabId = btn.getAttribute('data-tab');

      // Switch active content
      const contents = document.querySelectorAll('.report-card .tab-content');
      contents.forEach(c => c.classList.remove('active'));
      
      const targetContent = document.getElementById(tabId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });
}

// Update Budget Slider Label
function updateBudgetLabel(value) {
  const budgetValSpan = document.getElementById('budget-val');
  if (budgetValSpan) {
    budgetValSpan.innerText = `₹${parseInt(value).toLocaleString('en-IN')}`;
  }
}

// Append log entry to simulated terminal
function addTerminalLog(tag, typeClass, message) {
  const terminal = document.getElementById('terminal-log');
  if (!terminal) return;
  const now = new Date();
  const timeStr = now.toTimeString().split(' ')[0];
  
  const entry = document.createElement('div');
  entry.className = 'terminal-log-entry';
  entry.innerHTML = `
    <span class="timestamp">${timeStr}</span>
    <span class="tag ${typeClass}">${tag}</span>
    <span class="msg">${message}</span>
  `;
  
  terminal.appendChild(entry);
  terminal.scrollTop = terminal.scrollHeight;
}

// Form submit handler
function handleFormSubmit(event) {
  event.preventDefault();
  console.log("CampusNest AI: Form submitted, starting evaluation...");
  
  try {
    const collegeName = document.getElementById('college-name').value.trim();
    const budget = parseFloat(document.getElementById('budget-range').value);
    
    const checkedGender = document.querySelector('input[name="gender-input"]:checked');
    const checkedFood = document.querySelector('input[name="food-input"]:checked');
    const checkedSharing = document.querySelector('input[name="sharing-input"]:checked');
    
    const genderInput = checkedGender ? checkedGender.value : 'Any';
    const foodInput = checkedFood ? checkedFood.value : 'Any';
    const roomInput = checkedSharing ? checkedSharing.value : 'Any';
    
    const maxDistance = parseFloat(document.getElementById('distance-input').value);

    if (!collegeName) {
      alert("Please enter a college name.");
      return;
    }

    // 1. Discovery/Generation Phase
    const colleges = getSeededColleges();
    let collegeData = colleges.find(c => c.name.toLowerCase() === collegeName.toLowerCase());
    
    if (!collegeData) {
      console.log(`CampusNest AI: College '${collegeName}' not pre-seeded. Triggering procedural generation engine...`);
      const generator = getGenerateCustomCollegeData();
      collegeData = generator(collegeName, budget, genderInput, foodInput, maxDistance, roomInput);
    } else {
      console.log(`CampusNest AI: College '${collegeName}' matched pre-seeded records. Filtering static list...`);
      // For seeded colleges, we apply filters on the static lists
      let filteredPgs = collegeData.pgs.filter(pg => {
        // Distance filter
        if (pg.distance > maxDistance) return false;
        // Room/sharing filter
        if (roomInput !== "Any" && pg.sharing !== roomInput) return false;
        // Gender filter
        if (genderInput !== "Any" && pg.type !== genderInput) return false;
        // Food filter
        if (foodInput === "Veg Only" && pg.foodType === "Non-Veg") return false;
        if (foodInput === "Self-Cook" && pg.food !== "Not Included") return false;
        
        return true;
      });

      // If filters result in nothing, fallback to generating procedurally so the user gets matches
      if (filteredPgs.length === 0) {
        console.log("CampusNest AI: curvature filter returned 0 results. Falling back to procedural generation...");
        const generator = getGenerateCustomCollegeData();
        collegeData = generator(collegeName, budget, genderInput, foodInput, maxDistance, roomInput);
      } else {
        // Clone and set filtered
        collegeData = {
          ...collegeData,
          pgs: filteredPgs
        };
      }
    }

    if (!collegeData || !collegeData.pgs || collegeData.pgs.length === 0) {
      alert("No matching PGs or accommodations found for this combination. Please try expanding your budget or distance range.");
      return;
    }

    currentCollegeData = collegeData;
    runAgentSimulation(collegeData, budget);
  } catch (error) {
    console.error("Error in handleFormSubmit execution flow:", error);
    alert("An error occurred while compiling recommendations. Please check the browser console for details.");
  }
}

// Multi-Agent Hive Mind Simulation
function runAgentSimulation(collegeData, budget) {
  // Hide old results
  const resultsPanel = document.getElementById('results-panel');
  if (resultsPanel) resultsPanel.classList.add('hidden');
  
  // Reset agents styling
  const nodes = ['discovery', 'safety', 'budget', 'advisor', 'commute'];
  nodes.forEach(n => {
    const el = document.getElementById(`agent-node-${n}`);
    if (el) el.classList.remove('active', 'completed');
  });
  
  const flowBar = document.getElementById('agent-flow-bar');
  if (flowBar) flowBar.style.width = '0%';
  
  const statusLabel = document.getElementById('agent-status-label');
  if (statusLabel) {
    statusLabel.innerText = 'Analyzing relocation...';
    statusLabel.style.color = 'var(--secondary)';
  }
  
  // Clear terminal and start fresh
  const terminal = document.getElementById('terminal-log');
  if (terminal) terminal.innerHTML = '';
  
  addTerminalLog('[SYS]', 'tag-system', `Triggering relocation planner for target campus: ${collegeData.name}`);

  // Sequenced Execution of Agents
  let delay = 0;

  // Step 1: Discovery Agent
  setTimeout(() => {
    const node = document.getElementById('agent-node-discovery');
    if (node) node.classList.add('active');
    addTerminalLog('[DISCOVERY]', 'tag-discovery', `Initiating lookup for PGs, hostels and co-living spots near ${collegeData.name}...`);
  }, delay);

  delay += 1200;
  setTimeout(() => {
    addTerminalLog('[DISCOVERY]', 'tag-discovery', `Found ${collegeData.pgs.length} accommodation listings fitting the criteria.`);
    const node = document.getElementById('agent-node-discovery');
    if (node) {
      node.classList.remove('active');
      node.classList.add('completed');
    }
    const flowBar = document.getElementById('agent-flow-bar');
    if (flowBar) flowBar.style.width = '20%';
  }, delay);

  // Step 2: Safety Agent
  delay += 800;
  setTimeout(() => {
    const node = document.getElementById('agent-node-safety');
    if (node) node.classList.add('active');
    addTerminalLog('[SAFETY]', 'tag-safety', `Retrieving crime indices, local precinct density, and street lighting audits...`);
  }, delay);

  delay += 1200;
  setTimeout(() => {
    const avgSafety = (collegeData.pgs.reduce((acc, curr) => acc + curr.safetyScore, 0) / collegeData.pgs.length).toFixed(1);
    addTerminalLog('[SAFETY]', 'tag-safety', `Evaluated area safety indices. Mean student safety score verified at ${avgSafety}/10.`);
    const node = document.getElementById('agent-node-safety');
    if (node) {
      node.classList.remove('active');
      node.classList.add('completed');
    }
    const flowBar = document.getElementById('agent-flow-bar');
    if (flowBar) flowBar.style.width = '40%';
  }, delay);

  // Step 3: Budget Agent
  delay += 800;
  setTimeout(() => {
    const node = document.getElementById('agent-node-budget');
    if (node) node.classList.add('active');
    addTerminalLog('[BUDGET]', 'tag-budget', `Aggregating monthly room cost breakdowns. Mapping utility buffers & travel costs...`);
  }, delay);

  delay += 1200;
  setTimeout(() => {
    addTerminalLog('[BUDGET]', 'tag-budget', `Estimated travel cost coefficients based on distances. Average secondary expenses: ₹1,500/mo.`);
    const node = document.getElementById('agent-node-budget');
    if (node) {
      node.classList.remove('active');
      node.classList.add('completed');
    }
    const flowBar = document.getElementById('agent-flow-bar');
    if (flowBar) flowBar.style.width = '60%';
  }, delay);

  // Step 4: College Area Advisor
  delay += 800;
  setTimeout(() => {
    const node = document.getElementById('agent-node-advisor');
    if (node) node.classList.add('active');
    addTerminalLog('[ADVISOR]', 'tag-advisor', `Comparing local zones around ${collegeData.name}. Analyzing student densities and price spreads...`);
  }, delay);

  delay += 1200;
  setTimeout(() => {
    const cheapestArea = collegeData.areas.find(a => a.type === 'cheapest')?.name || 'Secondary Sector';
    const friendlyArea = collegeData.areas.find(a => a.type === 'student-friendly' || a.type === 'best-overall')?.name || 'Campus Gate';
    addTerminalLog('[ADVISOR]', 'tag-advisor', `Identified cheapest housing hub: ${cheapestArea}. Most student-dense zone: ${friendlyArea}.`);
    const node = document.getElementById('agent-node-advisor');
    if (node) {
      node.classList.remove('active');
      node.classList.add('completed');
    }
    const flowBar = document.getElementById('agent-flow-bar');
    if (flowBar) flowBar.style.width = '80%';
  }, delay);

  // Step 5: Commute Agent
  delay += 800;
  setTimeout(() => {
    const node = document.getElementById('agent-node-commute');
    if (node) node.classList.add('active');
    addTerminalLog('[COMMUTE]', 'tag-commute', `Estimating transit travel times (walk vs. bus vs. two-wheeler) across local corridors...`);
  }, delay);

  delay += 1200;
  setTimeout(() => {
    addTerminalLog('[COMMUTE]', 'tag-commute', `Commute corridors verified. Traffic bottlenecks calculated. Routing models synced.`);
    const node = document.getElementById('agent-node-commute');
    if (node) {
      node.classList.remove('active');
      node.classList.add('completed');
    }
    const flowBar = document.getElementById('agent-flow-bar');
    if (flowBar) flowBar.style.width = '100%';
    
    const statusLabel = document.getElementById('agent-status-label');
    if (statusLabel) {
      statusLabel.innerText = 'Analysis Complete!';
      statusLabel.style.color = 'var(--accent-emerald)';
    }
    
    // Render the final output
    displayRecommendations(collegeData);
  }, delay);
}

// Display the recommended PGs and select the best match
function displayRecommendations(collegeData) {
  const panel = document.getElementById('results-panel');
  if (!panel) return;
  panel.classList.remove('hidden');
  
  // Scroll to results panel
  panel.scrollIntoView({ behavior: 'smooth' });

  // Update recommendations count
  const countLabel = document.getElementById('recs-count-label');
  if (countLabel) {
    countLabel.innerHTML = `<i class="fa-solid fa-house-chimney"></i> We found <strong>${collegeData.pgs.length}</strong> matching accommodations near campus.`;
  }

  // Render cards list
  const cardsList = document.getElementById('pg-cards-list');
  if (!cardsList) return;
  cardsList.innerHTML = '';

  collegeData.pgs.forEach((pg, index) => {
    const card = document.createElement('div');
    card.className = `pg-card ${index === 0 ? 'active' : ''}`;
    card.setAttribute('data-index', index);
    card.addEventListener('click', () => selectRecommendation(index));

    // Determine gender badge class
    let genderClass = 'co-ed';
    if (pg.type === 'Female') genderClass = 'female';
    if (pg.type === 'Male') genderClass = 'male';

    card.innerHTML = `
      ${index === 0 ? '<div class="recommended-ribbon">Best Match</div>' : ''}
      <div class="pg-card-header">
        <div>
          <div class="pg-name">${pg.name}</div>
          <div class="pg-locality">${pg.locality}</div>
        </div>
        <span class="pg-badge ${genderClass}">${pg.type}</span>
      </div>
      <div class="pg-details-row">
        <span><i class="fa-solid fa-person-walking"></i> ${pg.distance} km</span>
        <span><i class="fa-solid fa-bed"></i> ${pg.sharing} Sharing</span>
        <span><i class="fa-solid fa-utensils"></i> ${pg.food === 'Included' ? 'Mess Inc.' : 'No Food'}</span>
      </div>
      <div class="pg-card-footer">
        <div class="pg-price">₹${pg.rent.toLocaleString('en-IN')}<span>/mo</span></div>
        <div class="score-badge ${pg.safetyScore < 7.5 ? 'low' : ''}">
          <i class="fa-solid fa-shield-halved"></i> Safety: ${pg.safetyScore}
        </div>
      </div>
    `;

    cardsList.appendChild(card);
  });

  // Select the first PG by default
  selectRecommendation(0);
}

// Select a specific PG recommendation to view detail report
function selectRecommendation(index) {
  if (!currentCollegeData || !currentCollegeData.pgs || !currentCollegeData.pgs[index]) return;

  // Update active state in list
  const cards = document.querySelectorAll('.pg-card');
  cards.forEach(card => card.classList.remove('active'));
  
  const selectedCard = document.querySelector(`.pg-card[data-index="${index}"]`);
  if (selectedCard) {
    selectedCard.classList.add('active');
  }

  const pg = currentCollegeData.pgs[index];
  selectedPg = pg;

  // Populate Report Fields (with safety guards)
  const setElText = (id, val) => { const el = document.getElementById(id); if (el) el.innerText = val; };
  const setElHtml = (id, html) => { const el = document.getElementById(id); if (el) el.innerHTML = html; };

  setElText('report-pg-name', pg.name);
  setElHtml('report-pg-locality', `<i class="fa-solid fa-location-dot"></i> ${pg.locality}`);
  
  const genderBadge = document.getElementById('report-pg-gender-badge');
  if (genderBadge) {
    genderBadge.innerText = `${pg.type} Only`;
    genderBadge.className = 'pg-badge';
    if (pg.type === 'Female') genderBadge.classList.add('female');
    else if (pg.type === 'Male') genderBadge.classList.add('male');
    else genderBadge.classList.add('co-ed');
  }

  // Overview Tab Fields
  setElText('overview-distance', `${pg.distance} km`);
  setElText('overview-commute-sub', `~${pg.walkTime} mins walk to college`);
  setElText('overview-rent', `₹${pg.rent.toLocaleString('en-IN')}`);
  setElText('overview-food-sub', `Food Plan: ${pg.food}`);

  // Custom AI summary
  const foodText = pg.food === 'Included' ? 'includes standard meals' : 'requires additional tiffin setup';
  setElText('overview-ai-summary', 
    `This nest offers a ${pg.sharing.toLowerCase()} sharing room in ${pg.locality}. The Safety Agent verified a high safety index of ${pg.safetyScore}/10. The Commute Agent estimated a quick ${pg.walkTime}-minute walk to the main gate. Financially, it ${foodText}, staying well-aligned with your relocation parameters.`);

  // Safety Tab Fields
  setElText('safety-rating-display', pg.safetyScore);
  
  // Custom reviews list
  const reviewsContainer = document.getElementById('safety-reviews-list');
  if (reviewsContainer) {
    reviewsContainer.innerHTML = '';
    pg.reviews.forEach(review => {
      const revItem = document.createElement('div');
      revItem.className = 'review-item';
      revItem.innerText = `"${review}"`;
      reviewsContainer.appendChild(revItem);
    });
  }

  // Budget Tab Fields
  setElText('budget-rent-val', `₹${pg.rent.toLocaleString('en-IN')}`);
  
  // Estimate food cost: 0 if included, otherwise ₹2,500/mo
  const isFoodInc = pg.food.includes('Included');
  const foodCost = isFoodInc ? 0 : 2500;
  setElText('budget-food-val', isFoodInc ? '₹0 (Included)' : '₹2,500 (Est.)');

  // Estimate transit cost based on distance
  let travelCost = 0;
  if (pg.distance > 1.2) {
    travelCost = Math.round(pg.distance * 25 * 30); // ₹25 per commute day
  }
  setElText('budget-commute-val', travelCost === 0 ? '₹0 (Walking distance)' : `₹${travelCost.toLocaleString('en-IN')}`);

  const utilityCost = 800; // Standard utility projection
  const totalExpense = pg.rent + foodCost + travelCost + utilityCost;
  setElText('budget-total-val', `₹${totalExpense.toLocaleString('en-IN')}`);

  // Area Advisor Advice Tab Fields
  const areaData = currentCollegeData.areas.find(a => a.name === pg.locality) || {
    name: pg.locality,
    type: 'balanced',
    desc: 'Convenient student locality offering general stores and shared housing solutions.',
    safetyScore: pg.safetyScore,
    safetyDesc: 'Standard residential safety parameters.'
  };

  const adviceBadge = document.getElementById('advice-tag-badge');
  if (adviceBadge) {
    adviceBadge.innerText = areaData.type.toUpperCase();
    if (areaData.type === 'premium') adviceBadge.style.backgroundColor = 'var(--accent-purple)';
    else if (areaData.type === 'cheapest') adviceBadge.style.backgroundColor = 'var(--accent-amber)';
    else adviceBadge.style.backgroundColor = 'var(--accent-rose)';
  }

  setElText('advice-title', areaData.name);
  setElText('advice-description', areaData.desc);
  setElText('area-safety-val', `${areaData.safetyScore} / 10`);
  setElText('area-rent-val', `₹${pg.rent.toLocaleString('en-IN')}/mo`);

  // Commute Tab Fields
  setElText('commute-walk-time', `${pg.walkTime} min`);
  setElText('commute-bus-time', `${pg.busTime} min`);
  setElText('commute-bike-time', `${pg.bikeTime} min`);

  let routeRecommendation = '';
  if (pg.distance < 1.0) {
    routeRecommendation = `At only ${pg.distance} km from the main entrance, walking is your absolute best transit option. It saves both money and avoid delays during university peak hours.`;
  } else if (pg.distance < 2.0) {
    routeRecommendation = `With a short distance of ${pg.distance} km, riding a bicycle/electric scooter is highly recommended. It takes less than 5 minutes. Bus transit is available but usually slower due to neighborhood stops.`;
  } else {
    routeRecommendation = `Since this accommodation is ${pg.distance} km away, we recommend purchasing a local student transit pass or using a shared auto/bike pool. Cycling is also a viable option. Walking takes upwards of 30 minutes.`;
  }
  setElText('commute-route-desc', routeRecommendation);

  // Render Custom SVG Map
  drawMap(pg);
}

// Draw a beautiful custom SVG transit/locality map based on PG coordinates
function drawMap(pg) {
  const svg = document.getElementById('map-svg-element');
  if (!svg) return;
  svg.innerHTML = '';

  // Standard center coordinates for College campus (Base node)
  const collegeX = 80;
  const collegeY = 120;

  // Generate dynamic offsets based on distance and locality to make it feel real
  let dx = pg.distance * 100;
  let dy = -30; // standard offset
  
  if (pg.locality.includes('Kamla Nagar') || pg.locality.includes('Powai') || pg.locality.includes('Campus Town')) {
    dx = pg.distance * 80 + 30;
    dy = -40;
  } else if (pg.locality.includes('Vijay Nagar') || pg.locality.includes('Station') || pg.locality.includes('Kanjur')) {
    dx = pg.distance * 70 + 40;
    dy = 50;
  } else {
    dx = pg.distance * 80 + 20;
    dy = 20;
  }

  // Bound the pins inside the viewport (width 400, height 240)
  const pgX = Math.min(350, Math.max(180, collegeX + dx));
  const pgY = Math.min(200, Math.max(40, collegeY + dy));

  // Draw Grid lines/background decor to make it look like a map dashboard
  let gridLines = '';
  for (let i = 0; i < 400; i += 40) {
    gridLines += `<line x1="${i}" y1="0" x2="${i}" y2="240" stroke="rgba(255,255,255,0.02)" stroke-width="1" />`;
  }
  for (let j = 0; j < 240; j += 40) {
    gridLines += `<line x1="0" y1="${j}" x2="400" y2="${j}" stroke="rgba(255,255,255,0.02)" stroke-width="1" />`;
  }
  
  svg.innerHTML += gridLines;

  // Draw a transit network line
  svg.innerHTML += `
    <path d="M 20,40 Q 150,50 250,150 T 380,200" fill="none" stroke="rgba(6, 182, 212, 0.08)" stroke-width="4" stroke-dasharray="8 4" />
    <text x="35" y="35" fill="rgba(6, 182, 212, 0.3)" font-size="8" font-family="Space Grotesk">Metro Transit Line 1</text>
  `;

  // Draw safety zone radius (green translucent circle) around the PG
  const safetyRadius = pg.safetyScore * 6.5;
  svg.innerHTML += `
    <circle cx="${pgX}" cy="${pgY}" r="${safetyRadius}" fill="rgba(16, 185, 129, 0.05)" stroke="rgba(16, 185, 129, 0.15)" stroke-width="1.5" />
    <circle cx="${pgX}" cy="${pgY}" r="3" fill="rgba(16, 185, 129, 0.4)" />
  `;

  // Draw connecting commute route (dashed line between college and PG)
  svg.innerHTML += `
    <path d="M ${collegeX},${collegeY} Q ${(collegeX+pgX)/2},${(collegeY+pgY)/2 - 20} ${pgX},${pgY}" 
          fill="none" stroke="var(--primary)" stroke-dasharray="5 5" stroke-width="2" id="commute-route-path" />
  `;

  // Commute distance text label
  svg.innerHTML += `
    <rect x="${(collegeX+pgX)/2 - 30}" y="${(collegeY+pgY)/2 - 22}" width="60" height="16" rx="4" fill="#080c14" stroke="var(--primary)" stroke-width="1" />
    <text x="${(collegeX+pgX)/2}" y="${(collegeY+pgY)/2 - 10}" fill="var(--text-primary)" font-size="9" font-family="Space Grotesk" text-anchor="middle" font-weight="700">${pg.distance} km</text>
  `;

  // Draw target College Pin (Main Destination)
  svg.innerHTML += `
    <g class="map-pin" transform="translate(${collegeX}, ${collegeY})">
      <!-- Outer ripple -->
      <circle cx="0" cy="0" r="14" fill="rgba(139, 92, 246, 0.1)" stroke="rgba(139, 92, 246, 0.2)" stroke-width="1">
        <animate attributeName="r" values="10;18;10" dur="3s" repeatCount="indefinite"/>
      </circle>
      <!-- Base pin shape -->
      <path d="M0,0 C-8,-8 -8,-16 0,-22 C8,-16 8,-8 0,0 Z" fill="var(--primary)" />
      <circle cx="0" cy="-14" r="4" fill="#fff" />
      <text x="0" y="14" fill="var(--text-muted)" font-size="9" font-weight="600" text-anchor="middle" font-family="Outfit">Campus Gate</text>
    </g>
  `;

  // Draw PG Pin
  svg.innerHTML += `
    <g class="map-pin" transform="translate(${pgX}, ${pgY})">
      <!-- Outer safety ring -->
      <circle cx="0" cy="0" r="12" fill="rgba(6, 182, 212, 0.1)" stroke="rgba(6, 182, 212, 0.2)" stroke-width="1" />
      <!-- Pin drop path -->
      <path d="M0,0 C-7,-7 -7,-14 0,-18 C7,-14 7,-7 0,0 Z" fill="var(--secondary)" />
      <circle cx="0" cy="-11" r="3" fill="#fff" />
      <text x="0" y="14" fill="var(--text-primary)" font-size="9" font-weight="700" text-anchor="middle" font-family="Outfit">${pg.name}</text>
      <text x="0" y="24" fill="rgba(16, 185, 129, 0.9)" font-size="8" font-weight="600" text-anchor="middle" font-family="Space Grotesk">Safety: ${pg.safetyScore}/10</text>
    </g>
  `;
}

// Start application initialization
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

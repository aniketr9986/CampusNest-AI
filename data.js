const seededColleges = [
  {
    name: "Delhi University (North Campus)",
    city: "Delhi",
    areas: [
      { name: "Kamla Nagar", type: "student-friendly", desc: "Vibrant shopping hub, highly popular among students but slightly expensive.", safetyScore: 8.5, safetyDesc: "Active streets, well-lit, police patrolling, highly populated." },
      { name: "Vijay Nagar", type: "cheapest", desc: "Affordable housing, student-heavy population, multiple budget eateries.", safetyScore: 7.8, safetyDesc: "Crowded lanes, average street lighting, safe during day, caution at night." },
      { name: "Hudson Lane", type: "premium", desc: "Famous for student cafes, high-quality PGs, modern amenities.", safetyScore: 8.8, safetyDesc: "Very safe, active cafe culture keeps streets busy until late night." },
      { name: "GTB Nagar", type: "best-overall", desc: "Direct Metro connectivity, balanced rent, easy transit access.", safetyScore: 8.3, safetyDesc: "CCTV coverage near metro, busy commercial hub, safe transit." }
    ],
    pgs: [
      {
        name: "Stanza Living Hudson House",
        type: "Co-Ed",
        locality: "Hudson Lane",
        rent: 14500,
        food: "Included",
        foodType: "Veg/Non-Veg",
        sharing: "Double",
        distance: 0.8,
        amenities: ["AC", "High-Speed WiFi", "Laundry", "Gym", "24/7 Security", "Biometric Entry"],
        safetyScore: 9.2,
        reviews: ["Clean rooms, best food compared to other PGs", "Safety is excellent but rent is steep.", "Very close to GTB Nagar Metro."],
        walkTime: 10,
        busTime: 5,
        bikeTime: 3
      },
      {
        name: "Saraswati Girls PG",
        type: "Female",
        locality: "Kamla Nagar",
        rent: 8500,
        food: "Included",
        foodType: "Veg Only",
        sharing: "Triple",
        distance: 0.5,
        amenities: ["Cooler", "WiFi", "Daily Cleaning", "CCTV", "Warden"],
        safetyScore: 8.9,
        reviews: ["Strict timings, very safe for girls", "Kamla Nagar market is just 2 mins walk", "Rooms are a bit small but manageable."],
        walkTime: 6,
        busTime: 4,
        bikeTime: 2
      },
      {
        name: "CoHo Student Villa",
        type: "Male",
        locality: "Vijay Nagar",
        rent: 7000,
        food: "Not Included",
        foodType: "None (Kitchen Available)",
        sharing: "Double",
        distance: 1.6,
        amenities: ["WiFi", "RO Water", "Washing Machine", "Power Backup"],
        safetyScore: 7.6,
        reviews: ["Budget friendly", "Need to order food from outside", "A bit far from college, but cheap."],
        walkTime: 20,
        busTime: 12,
        bikeTime: 5
      },
      {
        name: "Metro Point Residency",
        type: "Co-Ed",
        locality: "GTB Nagar",
        rent: 11000,
        food: "Optional (Extra ₹2000)",
        foodType: "Veg/Non-Veg",
        sharing: "Single",
        distance: 1.2,
        amenities: ["AC", "WiFi", "Attached Bath", "Fridge", "CCTV"],
        safetyScore: 8.4,
        reviews: ["Direct metro access is great", "Decent rooms, quiet environment", "Food is average but room is excellent."],
        walkTime: 15,
        busTime: 8,
        bikeTime: 4
      },
      {
        name: "Shree Ram Boys Hostel",
        type: "Male",
        locality: "Vijay Nagar",
        rent: 5500,
        food: "Included",
        foodType: "Veg Only",
        sharing: "Triple",
        distance: 2.1,
        amenities: ["Cooler", "WiFi", "Hot Water", "CCTV"],
        safetyScore: 7.4,
        reviews: ["Cheapest option with food", "Mess food is average but clean", "Owner is friendly."],
        walkTime: 26,
        busTime: 15,
        bikeTime: 7
      }
    ]
  },
  {
    name: "IIT Bombay",
    city: "Mumbai",
    areas: [
      { name: "Powai", type: "premium", desc: "Upscale lake-side township, extremely modern, safe, high-end amenities.", safetyScore: 9.4, safetyDesc: "Highly secure, private security guards, excellent streetlighting." },
      { name: "Kanjurmarg West", type: "best-overall", desc: "Balanced rent, close to local railway station, popular for shared flats.", safetyScore: 8.2, safetyDesc: "Busy railway commute hub, standard municipal security, safe in major streets." },
      { name: "Bhandup West", type: "cheapest", desc: "Most economical rooms, local markets nearby, highly dense residential area.", safetyScore: 7.2, safetyDesc: "Narrow lanes, dark patches at night, crowded but generally peaceful." }
    ],
    pgs: [
      {
        name: "Lakeside Luxury Living",
        type: "Co-Ed",
        locality: "Powai",
        rent: 19000,
        food: "Included",
        foodType: "Veg/Non-Veg",
        sharing: "Single",
        distance: 0.9,
        amenities: ["AC", "Gym", "Pool Access", "WiFi", "Daily Housekeeping", "24/7 Security"],
        safetyScore: 9.6,
        reviews: ["Felt like a hotel, absolutely premium", "Very close to IIT Main Gate", "Expensive but worth it if you have the budget."],
        walkTime: 11,
        busTime: 6,
        bikeTime: 3
      },
      {
        name: "Hiranandani Nest PG",
        type: "Female",
        locality: "Powai",
        rent: 13500,
        food: "Optional (Extra ₹3000)",
        foodType: "Veg Only",
        sharing: "Double",
        distance: 1.1,
        amenities: ["AC", "WiFi", "Security", "Washing Machine", "Kitchenette"],
        safetyScore: 9.3,
        reviews: ["Super safe neighborhood", "Very clean rooms", "Beautiful surroundings, cafes nearby."],
        walkTime: 14,
        busTime: 7,
        bikeTime: 4
      },
      {
        name: "Kanjur Executive PG",
        type: "Male",
        locality: "Kanjurmarg West",
        rent: 9500,
        food: "Included",
        foodType: "Veg/Non-Veg",
        sharing: "Double",
        distance: 2.3,
        amenities: ["WiFi", "AC", "Power Backup", "RO Water", "CCTV"],
        safetyScore: 8.1,
        reviews: ["Good connectivity to station", "Decent food quality", "Travel to IIT takes 10 mins by auto."],
        walkTime: 30,
        busTime: 12,
        bikeTime: 8
      },
      {
        name: "Bhandup Budget Rooms",
        type: "Co-Ed",
        locality: "Bhandup West",
        rent: 6200,
        food: "Not Included",
        foodType: "None",
        sharing: "Triple",
        distance: 3.5,
        amenities: ["WiFi", "RO Water", "Housekeeping", "Geyser"],
        safetyScore: 7.0,
        reviews: ["Extremely affordable rent", "You will need to cook or join a tiffin service", "A bit far from IIT, bus is the only cheap way."],
        walkTime: 45,
        busTime: 22,
        bikeTime: 12
      }
    ]
  },
  {
    name: "Christ University (Koramangala)",
    city: "Bengaluru",
    areas: [
      { name: "Koramangala", type: "premium", desc: "Vibrant startup hub, trendy cafes, lively pub culture, premium student hostels.", safetyScore: 9.1, safetyDesc: "CCTV monitored, active nightlife means streets are safe, police beats regular." },
      { name: "Tavarekere", type: "cheapest", desc: "Extremely close to SG Palya gate, budget options, highly student-dense.", safetyScore: 7.6, safetyDesc: "Congested lanes, water log during rains, safe due to constant student crowd." },
      { name: "BTM Layout 1st Stage", type: "best-overall", desc: "Excellent transit, major food street, balanced budget PGs.", safetyScore: 8.4, safetyDesc: "Residential area, well-lit main roads, park patrol, very safe." }
    ],
    pgs: [
      {
        name: "Zolo Stays Premium Koramangala",
        type: "Co-Ed",
        locality: "Koramangala",
        rent: 15000,
        food: "Included",
        foodType: "Veg/Non-Veg",
        sharing: "Single",
        distance: 0.6,
        amenities: ["AC", "WiFi", "Gaming Zone", "Lounge", "CCTV", "Biometric Lock"],
        safetyScore: 9.3,
        reviews: ["Amazing community events", "Vibrant area, cafes right outside", "Best PG I lived in Bangalore."],
        walkTime: 8,
        busTime: 4,
        bikeTime: 2
      },
      {
        name: "SG Palya Girls Mansion",
        type: "Female",
        locality: "Tavarekere",
        rent: 7500,
        food: "Included",
        foodType: "Veg Only",
        sharing: "Double",
        distance: 0.4,
        amenities: ["WiFi", "Washing Machine", "CCTV", "Warden Protection", "Elevator"],
        safetyScore: 8.2,
        reviews: ["Literally 4 mins walk from university gate", "Food is good, typical South Indian mess", "Crowded area, but very secure hostel."],
        walkTime: 5,
        busTime: 3,
        bikeTime: 1
      },
      {
        name: "Balaji Boys PG",
        type: "Male",
        locality: "Tavarekere",
        rent: 6000,
        food: "Included",
        foodType: "Veg Only",
        sharing: "Triple",
        distance: 0.8,
        amenities: ["WiFi", "RO Water", "CCTV", "Housekeeping"],
        safetyScore: 7.5,
        reviews: ["Very budget friendly", "Food is decent, clean rooms", "Narrow lane, gets muddy in rain."],
        walkTime: 10,
        busTime: 6,
        bikeTime: 3
      },
      {
        name: "BTM Heights PG",
        type: "Co-Ed",
        locality: "BTM Layout 1st Stage",
        rent: 9800,
        food: "Optional (Extra ₹2500)",
        foodType: "Veg/Non-Veg",
        sharing: "Double",
        distance: 1.8,
        amenities: ["AC", "WiFi", "Gym", "Power Backup", "RO Water"],
        safetyScore: 8.5,
        reviews: ["Great locality, big park nearby", "Easy to get buses", "Clean rooms and nice staff."],
        walkTime: 22,
        busTime: 10,
        bikeTime: 6
      }
    ]
  }
];

// Helper to procedurally generate a dataset for a custom college input
function generateCustomCollegeData(collegeName, budgetInput, genderInput, foodInput, distanceInput, roomInput) {
  // Strip special chars and clean up
  const cleanName = collegeName.trim();
  const city = "Student Hub City";
  
  // Create 3-4 realistic sub-areas
  const areas = [
    { 
      name: `${cleanName} Campus Town`, 
      type: "premium", 
      desc: "Directly adjacent to the college campus, filled with bookstores, student cafes, and modern complexes.", 
      safetyScore: 9.0, 
      safetyDesc: "24/7 campus security patrols, highly active student presence, excellent streetlights." 
    },
    { 
      name: `University Heights`, 
      type: "best-overall", 
      desc: "Residential suburb with broad streets, parks, and highly rated student accommodations.", 
      safetyScore: 8.4, 
      safetyDesc: "Neighbourhood watch, well-lit residential avenues, low crime index." 
    },
    { 
      name: `Railway Station Sector`, 
      type: "cheapest", 
      desc: "Denser market area close to transit lines, offers highly affordable hostels and local street food joints.", 
      safetyScore: 7.2, 
      safetyDesc: "Crowded commercial zones, average streetlighting, active police check-posts." 
    }
  ];

  // Helper to generate a realistic PG name
  const pgPrefixes = ["Stanza Living", "Zolo Stays", "CampusNest", "Oxford Student", "Elite", "Homey", "Shree Ji", "Sai Residency"];
  const pgSuffixes = ["Residency", "House", "Villa", "Nest", "Mansion", "Point", "Rooms", "Living"];

  function getPgName(idx) {
    const prefix = pgPrefixes[idx % pgPrefixes.length];
    const suffix = pgSuffixes[Math.floor((idx * 7) % pgSuffixes.length)];
    return `${prefix} ${suffix}`;
  }

  // Generate 4-5 dynamic PGs scaled around the user's budget and preferences
  const pgs = [];
  const count = 5;

  for (let i = 0; i < count; i++) {
    const area = areas[i % areas.length];
    
    // Scale rent dynamically:
    // Some option matching budget, some cheaper, some more expensive/premium
    let baseRent = Math.round(budgetInput);
    if (i === 0) baseRent = Math.round(budgetInput * 0.9); // near budget
    else if (i === 1) baseRent = Math.round(budgetInput * 0.65); // budget/cheaper
    else if (i === 2) baseRent = Math.round(budgetInput * 1.25); // premium option
    else if (i === 3) baseRent = Math.round(budgetInput * 0.55); // cheapest option
    else baseRent = Math.round(budgetInput * 1.05); // near budget

    // Clamp rent to realistic bounds (e.g. min 4000, max 25000)
    baseRent = Math.max(4000, Math.min(25000, baseRent));
    
    // Determine sharing structure based on rent scaling
    let sharing = roomInput !== "Any" ? roomInput : "Double";
    if (roomInput === "Any") {
      if (baseRent < budgetInput * 0.7) sharing = "Triple";
      else if (baseRent > budgetInput * 1.2) sharing = "Single";
    }

    // Adjust food based on user preference
    let foodStatus = "Included";
    let foodCostLabel = "Included";
    if (foodInput === "Veg Only" || foodInput === "Veg") {
      foodStatus = "Included";
    } else if (foodInput === "Self-Cook") {
      foodStatus = "Not Included";
      foodCostLabel = "None (Kitchen Available)";
    } else if (i === 2 || i === 4) {
      foodStatus = "Included";
    } else {
      foodStatus = "Optional (Extra ₹2,500)";
    }

    // Determine gender type of PG based on input
    let type = genderInput !== "Any" ? genderInput : (i % 3 === 0 ? "Male" : (i % 3 === 1 ? "Female" : "Co-Ed"));

    // Distance calculation logic
    let distance = 0.5;
    if (area.type === "premium") distance = parseFloat((0.3 + i * 0.2).toFixed(1));
    else if (area.type === "best-overall") distance = parseFloat((1.0 + i * 0.3).toFixed(1));
    else distance = parseFloat((2.0 + i * 0.5).toFixed(1));

    // Commute times
    const walkTime = Math.round(distance * 12.5);
    const busTime = Math.round(distance * 6 + 3);
    const bikeTime = Math.round(distance * 3 + 1);

    // Safety and ratings logic
    const pgSafetyScore = parseFloat((area.safetyScore + (i % 2 === 0 ? 0.3 : -0.2)).toFixed(1));
    
    // Pick dynamic amenities based on rent
    const poolOfAmenities = ["WiFi", "CCTV", "RO Water", "Daily Cleaning", "AC", "Washing Machine", "Power Backup", "Geyser", "Gym", "Warden"];
    const amenities = ["WiFi", "CCTV", "RO Water"];
    if (baseRent > budgetInput * 0.8) amenities.push("Daily Cleaning", "Washing Machine");
    if (baseRent > budgetInput * 1.1) amenities.push("AC", "Power Backup");
    if (baseRent > budgetInput * 1.4) amenities.push("Gym", "Geyser");

    const reviews = [
      `Pretty decent place for the price of ₹${baseRent.toLocaleString('en-IN')}`,
      `Located in ${area.name}, very close to transit links.`,
      `The safety here is rated ${pgSafetyScore}/10 by seniors.`
    ];

    pgs.push({
      name: getPgName(i),
      type,
      locality: area.name,
      rent: baseRent,
      food: foodStatus,
      foodType: foodInput === "Any" ? "Veg/Non-Veg" : foodInput,
      sharing,
      distance,
      amenities,
      safetyScore: pgSafetyScore,
      reviews,
      walkTime,
      busTime,
      bikeTime
    });
  }

  // Sort by matching parameters and rent
  pgs.sort((a, b) => {
    // Rank options that are closer to the budget and are safe
    const scoreA = (a.rent <= budgetInput ? 3 : 0) + (a.safetyScore >= 8.0 ? 2 : 0) - Math.abs(a.rent - budgetInput)/1000;
    const scoreB = (b.rent <= budgetInput ? 3 : 0) + (b.safetyScore >= 8.0 ? 2 : 0) - Math.abs(b.rent - budgetInput)/1000;
    return scoreB - scoreA;
  });

  return {
    name: collegeName,
    city,
    areas,
    pgs
  };
}

if (typeof window !== 'undefined') {
  window.seededColleges = seededColleges;
  window.generateCustomCollegeData = generateCustomCollegeData;
}

// ========================================
// INDIA STATISTICS DATA
// ========================================

const indiaData = {
    totalPopulation: 1428, // Million
    
    // Education Data
    education: {
        educators: 35, // percentage
        nonEducators: 65, // percentage
        breakdown: {
            teachers: 8.5, // million
            professors: 2.8,
            trainers: 1.5,
            researchers: 1.2,
            nonEducators: 928 // million
        }
    },
    
    // Phone Usage Data
    phoneUsage: {
        users: 72, // percentage
        nonUsers: 28, // percentage
        demographics: {
            urban: 850, // million users
            rural: 178,
            nonUsers: 400 // million
        }
    },
    
    // Employment Data
    employment: {
        employed: 500, // million
        unemployed: 45,
        students: 350,
        laborers: 230,
        retired: 150,
        others: 153
    },
    
    // Job Sectors
    jobSectors: {
        agriculture: 180, // million
        manufacturing: 85,
        services: 120,
        technology: 35,
        healthcare: 25,
        education: 30,
        construction: 25
    },
    
    // Labor Distribution by City
    laborByCity: {
        'Mumbai': 4.8, // million laborers
        'Delhi': 5.2,
        'Bangalore': 3.5,
        'Chennai': 3.2,
        'Kolkata': 3.8,
        'Hyderabad': 3.0,
        'Pune': 2.8,
        'Ahmedabad': 2.5,
        'Jaipur': 1.8,
        'Lucknow': 2.2
    },
    
    // Population by City
    populationByCity: {
        'Mumbai': 20.4, // million
        'Delhi': 32.9,
        'Bangalore': 12.8,
        'Hyderabad': 10.5,
        'Ahmedabad': 8.4,
        'Chennai': 11.0,
        'Kolkata': 15.1,
        'Pune': 7.4,
        'Jaipur': 3.9,
        'Lucknow': 3.4
    }
};

// ========================================
// CHART CONFIGURATION
// ========================================

Chart.defaults.color = '#b8c1ec';
Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.1)';
Chart.defaults.font.family = "'Inter', sans-serif";

const chartColors = {
    primary: ['#667eea', '#764ba2'],
    secondary: ['#f093fb', '#f5576c'],
    accent: ['#4facfe', '#00f2fe'],
    success: ['#43e97b', '#38f9d7'],
    rainbow: [
        '#667eea', '#764ba2', '#f093fb', '#f5576c',
        '#4facfe', '#00f2fe', '#43e97b', '#38f9d7',
        '#fa709a', '#fee140'
    ]
};

// ========================================
// ANIMATED COUNTER FUNCTION
// ========================================

function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString();
    }, 16);
}

// ========================================
// INITIALIZE COUNTERS
// ========================================

function initCounters() {
    animateCounter(
        document.getElementById('total-population'),
        indiaData.totalPopulation
    );
    
    animateCounter(
        document.getElementById('educators-count'),
        Math.round(indiaData.totalPopulation * indiaData.education.educators / 100)
    );
    
    animateCounter(
        document.getElementById('phone-users-count'),
        Math.round(indiaData.totalPopulation * indiaData.phoneUsage.users / 100)
    );
    
    animateCounter(
        document.getElementById('employed-count'),
        indiaData.employment.employed
    );
}

// ========================================
// CHART CREATION FUNCTIONS
// ========================================

function createEducationChart() {
    const ctx = document.getElementById('educationChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Educators', 'Non-Educators'],
            datasets: [{
                data: [indiaData.education.educators, indiaData.education.nonEducators],
                backgroundColor: [
                    createGradient(ctx, chartColors.primary),
                    createGradient(ctx, chartColors.secondary)
                ],
                borderWidth: 0,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        font: { size: 13 }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                }
            },
            animation: {
                animateRotate: true,
                animateScale: true,
                duration: 1500
            }
        }
    });
}

function createEducationDetailChart() {
    const ctx = document.getElementById('educationDetailChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Teachers', 'Professors', 'Trainers', 'Researchers'],
            datasets: [{
                data: [
                    indiaData.education.breakdown.teachers,
                    indiaData.education.breakdown.professors,
                    indiaData.education.breakdown.trainers,
                    indiaData.education.breakdown.researchers
                ],
                backgroundColor: chartColors.rainbow.slice(0, 4),
                borderWidth: 0,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        font: { size: 13 }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + 'M people';
                        }
                    }
                }
            },
            animation: {
                duration: 1500
            }
        }
    });
}

function createPhoneUsageChart() {
    const ctx = document.getElementById('phoneUsageChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Phone Users', 'Non-Users'],
            datasets: [{
                data: [indiaData.phoneUsage.users, indiaData.phoneUsage.nonUsers],
                backgroundColor: [
                    createGradient(ctx, chartColors.accent),
                    createGradient(ctx, chartColors.secondary)
                ],
                borderWidth: 0,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        font: { size: 13 }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                }
            },
            animation: {
                duration: 1500
            }
        }
    });
}

function createPhoneDetailChart() {
    const ctx = document.getElementById('phoneDetailChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Urban Users', 'Rural Users', 'Non-Users'],
            datasets: [{
                label: 'Phone Usage (Million)',
                data: [
                    indiaData.phoneUsage.demographics.urban,
                    indiaData.phoneUsage.demographics.rural,
                    indiaData.phoneUsage.demographics.nonUsers
                ],
                backgroundColor: chartColors.rainbow.slice(0, 3),
                borderRadius: 8,
                hoverBackgroundColor: chartColors.rainbow.slice(3, 6)
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.parsed.y + 'M people';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            animation: {
                duration: 1500,
                easing: 'easeInOutQuart'
            }
        }
    });
}

function createEmploymentChart() {
    const ctx = document.getElementById('employmentChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Employed', 'Unemployed', 'Students', 'Laborers', 'Retired', 'Others'],
            datasets: [{
                data: [
                    indiaData.employment.employed,
                    indiaData.employment.unemployed,
                    indiaData.employment.students,
                    indiaData.employment.laborers,
                    indiaData.employment.retired,
                    indiaData.employment.others
                ],
                backgroundColor: chartColors.rainbow,
                borderWidth: 0,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        font: { size: 12 }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + 'M people';
                        }
                    }
                }
            },
            animation: {
                duration: 1500
            }
        }
    });
}

function createJobSectorChart() {
    const ctx = document.getElementById('jobSectorChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(indiaData.jobSectors).map(k => 
                k.charAt(0).toUpperCase() + k.slice(1)
            ),
            datasets: [{
                label: 'Workers (Million)',
                data: Object.values(indiaData.jobSectors),
                backgroundColor: chartColors.rainbow,
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            animation: {
                duration: 1500,
                easing: 'easeInOutQuart'
            }
        }
    });
}

function createLaborCityChart() {
    const ctx = document.getElementById('laborCityChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(indiaData.laborByCity),
            datasets: [{
                label: 'Number of Laborers (Million)',
                data: Object.values(indiaData.laborByCity),
                backgroundColor: chartColors.rainbow,
                borderRadius: 8,
                hoverBackgroundColor: chartColors.primary[0]
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.parsed.x + 'M laborers';
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    }
                },
                y: {
                    grid: {
                        display: false
                    }
                }
            },
            animation: {
                duration: 1500,
                easing: 'easeInOutQuart'
            }
        }
    });
}

function createPopulationChart() {
    const cities = Object.keys(indiaData.populationByCity);
    const populations = Object.values(indiaData.populationByCity);
    
    // Determine high and low population cities
    const avgPopulation = populations.reduce((a, b) => a + b, 0) / populations.length;
    const highPopCities = populations.filter(p => p > avgPopulation).length;
    const lowPopCities = populations.filter(p => p <= avgPopulation).length;
    
    const ctx = document.getElementById('populationChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['High Population Cities', 'Low Population Cities'],
            datasets: [{
                data: [highPopCities, lowPopCities],
                backgroundColor: [
                    createGradient(ctx, chartColors.success),
                    createGradient(ctx, chartColors.secondary)
                ],
                borderWidth: 0,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        font: { size: 13 }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + ' cities';
                        }
                    }
                }
            },
            animation: {
                duration: 1500
            }
        }
    });
}

function createTopCitiesChart() {
    const ctx = document.getElementById('topCitiesChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(indiaData.populationByCity),
            datasets: [{
                label: 'Population (Million)',
                data: Object.values(indiaData.populationByCity),
                backgroundColor: chartColors.rainbow,
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            animation: {
                duration: 1500,
                easing: 'easeInOutQuart'
            }
        }
    });
}

// ========================================
// HELPER FUNCTIONS
// ========================================

function createGradient(ctx, colors) {
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, colors[0]);
    gradient.addColorStop(1, colors[1]);
    return gradient;
}

// ========================================
// INITIALIZE ALL CHARTS ON PAGE LOAD
// ========================================

window.addEventListener('DOMContentLoaded', () => {
    // Initialize counters
    initCounters();
    
    // Create all charts
    createEducationChart();
    createEducationDetailChart();
    createPhoneUsageChart();
    createPhoneDetailChart();
    createEmploymentChart();
    createJobSectorChart();
    createLaborCityChart();
    createPopulationChart();
    createTopCitiesChart();
    
    console.log('📊 India Statistics Dashboard Loaded Successfully!');
});

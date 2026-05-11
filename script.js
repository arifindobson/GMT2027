document.addEventListener('DOMContentLoaded', () => {
    // Target Date: August 2, 2027, 13:23:00 AST (UTC+3)
    // Which is August 2, 2027, 10:23:00 UTC
    const targetDate = new Date(Date.UTC(2027, 7, 2, 10, 23, 0)).getTime();
    
    // Totality End: August 2, 2027, 13:29:00 AST
    const totalityEndDate = new Date(Date.UTC(2027, 7, 2, 10, 29, 0)).getTime();

    const updateCountdown = () => {
        const now = new Date();
        const target = new Date(Date.UTC(2027, 7, 2, 10, 23, 0));
        const distance = target.getTime() - now.getTime();

        if (distance < 0) {
            // Check if totality is still in progress
            const timeSinceStart = now.getTime() - target.getTime();
            const totalityEnd = new Date(Date.UTC(2027, 7, 2, 10, 29, 0)).getTime();

            if (now.getTime() < totalityEnd) {
                ['months', 'weeks', 'days', 'hours', 'minutes', 'seconds'].forEach(id => {
                    document.getElementById(id).innerText = '00';
                });
                document.getElementById('status-indicator').innerText = 'TOTALITY IN PROGRESS';
                document.getElementById('status-indicator').style.color = '#D4AF37';
                document.getElementById('status-indicator').style.fontWeight = 'bold';
            } else {
                ['months', 'weeks', 'days', 'hours', 'minutes', 'seconds'].forEach(id => {
                    document.getElementById(id).innerText = '00';
                });
                document.getElementById('status-indicator').innerText = 'ECLIPSE COMPLETED';
                clearInterval(interval);
            }
            return;
        }

        // Calculate Months
        let months = (target.getFullYear() - now.getFullYear()) * 12 + (target.getMonth() - now.getMonth());
        // Adjust if current day is past target day
        const tempNow = new Date(now);
        tempNow.setMonth(now.getMonth() + months);
        if (tempNow > target) {
            months--;
        }
        
        // Date after accounting for months
        const dateAfterMonths = new Date(now);
        dateAfterMonths.setMonth(now.getMonth() + months);
        
        const remainingDistance = target.getTime() - dateAfterMonths.getTime();

        // Time calculations
        const weeks = Math.floor(remainingDistance / (1000 * 60 * 60 * 24 * 7));
        const days = Math.floor((remainingDistance % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((remainingDistance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((remainingDistance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remainingDistance % (1000 * 60)) / 1000);

        // Display the result
        document.getElementById('months').innerText = months.toString().padStart(2, '0');
        document.getElementById('weeks').innerText = weeks.toString().padStart(2, '0');
        document.getElementById('days').innerText = days.toString().padStart(2, '0');
        document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
        document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
    };

    // Initial update
    updateCountdown();
    
    // Update every second
    const interval = setInterval(updateCountdown, 1000);
});

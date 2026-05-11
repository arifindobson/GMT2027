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
            const totalityEnd = new Date(Date.UTC(2027, 7, 2, 10, 29, 0)).getTime();
            if (now.getTime() < totalityEnd) {
                ['months', 'weeks', 'days', 'hours', 'minutes', 'seconds'].forEach(id => {
                    document.getElementById(id).innerText = '00';
                });
                document.getElementById('status-indicator').innerText = 'TOTALITY IN PROGRESS';
            } else {
                document.getElementById('status-indicator').innerText = 'ECLIPSE COMPLETED';
                clearInterval(interval);
            }
            return;
        }

        // 1. Calculate Months using a robust calendar approach
        let months = (target.getFullYear() - now.getFullYear()) * 12 + (target.getMonth() - now.getMonth());
        
        // Precise date comparison to adjust month count
        let tempTarget = new Date(now);
        tempTarget.setMonth(now.getMonth() + months);
        
        // If the day is less than the current day, it's not a full month yet
        if (tempTarget > target) {
            months--;
            tempTarget = new Date(now);
            tempTarget.setMonth(now.getMonth() + months);
        }

        // 2. Calculate remaining days from the point after months
        const msRemainingAfterMonths = target.getTime() - tempTarget.getTime();
        const totalDaysRemaining = Math.floor(msRemainingAfterMonths / (1000 * 60 * 60 * 24));
        
        const weeks = Math.floor(totalDaysRemaining / 7);
        const days = totalDaysRemaining % 7;

        // 3. Calculate time components for the remaining fraction of the day
        const msRemainingAfterDays = msRemainingAfterMonths % (1000 * 60 * 60 * 24);
        
        const hours = Math.floor(msRemainingAfterDays / (1000 * 60 * 60));
        const minutes = Math.floor((msRemainingAfterDays % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((msRemainingAfterDays % (1000 * 60)) / 1000);

        // Display results with padding
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

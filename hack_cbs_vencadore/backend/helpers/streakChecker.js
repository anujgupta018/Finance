function calculateNewStreak(lastSaveDate) {
    if (!lastSaveDate) return 1;

    const today = new Date();
    const lastSave = new Date(lastSaveDate);

    const diffTime = Math.abs(today - lastSave);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
        return 1;
    }

    return diffDays > 1 ? 1 : 0;
}

module.exports = { calculateNewStreak };
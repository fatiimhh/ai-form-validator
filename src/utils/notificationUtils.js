

export const scheduleNotification = (item) => {
  if (!("Notification" in window)) return;

  const { subject, date, time } = item;
  if (!subject || !date || !time) return;

  const taskTime = new Date(`${date} ${time}`);
  const now = new Date();

  const reminderTime = taskTime.getTime() - 5 * 60 * 1000; // 5 min before
  const delay = reminderTime - now.getTime();

  if (delay > 0) {
    setTimeout(() => {
      new Notification("⏰ Task Reminder", {
        body: `Your task "${subject}" starts in 5 minutes.`,
        icon: "/logo192.png",
      });
    }, delay);
  }
};

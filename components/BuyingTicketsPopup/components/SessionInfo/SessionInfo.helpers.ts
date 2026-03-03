import dayjs from 'dayjs';

export const getDayOfWeek = (timestamp: string): string => {
	const date = dayjs(timestamp);
	if (date.isToday()) {
		return 'сегодня';
	}

	if (date.isTomorrow()) {
		return 'завтра';
	}

	return date.format('dddd');
};

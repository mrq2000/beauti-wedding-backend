import * as dayjs from 'dayjs';

export const formatDate = (dateTime: string | number): string => dayjs(dateTime).format('YYYY-MM-DD');

export const getCurrentDateTime = (): string => dayjs().format('YYYY-MM-DD HH:mm:ss');

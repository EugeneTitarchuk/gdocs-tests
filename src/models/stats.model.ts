export interface Stats {
    total: number,
    topics: {
        topic: string,
        count: number
    }[],
};

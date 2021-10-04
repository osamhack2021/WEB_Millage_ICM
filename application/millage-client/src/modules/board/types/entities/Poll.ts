/* Types of Poll */
export type Poll = {
    id: number;
    content: string;
    votes: number;
};

export type PollInputs = Pick<Poll, 'content'> & {
    index: number;
};

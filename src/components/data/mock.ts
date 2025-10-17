import { Post } from '../types/post';
import { randomAvatar, randomId, randomName, randomText } from '../utils/faker';

export const generatePosts = (count: number): Post[] =>
    Array.from({ length: count }).map(() => ({
    id: randomId(),
    name: randomName(),
    avatar: randomAvatar(),
    text: randomText(),
    liked: false,
    }));
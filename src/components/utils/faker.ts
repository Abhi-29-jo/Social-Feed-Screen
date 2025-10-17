const NAMES = [
    'Ava Thompson','Liam Johnson','Sophia Davis','Noah Wilson','Mia Martinez',
    'Elijah Anderson','Isabella Taylor','Lucas Thomas','Amelia Moore','Ethan Jackson'
];

const TEXTS = [
    'Having a great day exploring the city!',
    'Just tried a new coffee place. 10/10.',
    'Reading a fantastic book this weekend.',
    'Workout done. Feeling strong!',
    'Nature walk with friends—so refreshing.',
    'Learning React Native animations today!',
    'What a beautiful sunset ',
    'Cooking pasta tonight ',
    'Music + coding = perfect combo ',
    'Building side projects is fun!'
];

export const randomId = () => Math.random().toString(36).slice(2);

export const randomAvatar = (seed?: string) =>
    `https://i.pravatar.cc/150?img=${Math.floor(Math.random()*70) + 1}${seed ? `&u=${seed}` : ''}`;

export const randomName = () => NAMES[Math.floor(Math.random() * NAMES.length)];

export const randomText = () => {
  const count = 1 + Math.floor(Math.random() * 3);
  const lines = Array.from({ length: count }, () => TEXTS[Math.floor(Math.random() * TEXTS.length)]);
    return lines.join(' ');
};
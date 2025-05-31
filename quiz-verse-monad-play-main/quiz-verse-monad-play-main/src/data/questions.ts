
export interface Question {
  id: number;
  category: string;
  type: 'image' | 'audio' | 'text';
  content: string;
  correctAnswer: string;
  hint?: string;
}

export const sampleQuestions: Question[] = [
  {
    id: 1,
    category: 'Movies',
    type: 'image',
    content: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop',
    correctAnswer: 'The Matrix',
    hint: 'Red pill or blue pill?'
  },
  {
    id: 2,
    category: 'General Knowledge',
    type: 'image',
    content: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=800&h=600&fit=crop',
    correctAnswer: 'Cat',
    hint: 'This furry friend says meow'
  },
  {
    id: 3,
    category: 'Animals',
    type: 'image',
    content: 'https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=800&h=600&fit=crop',
    correctAnswer: 'Zebra',
    hint: 'Black and white stripes'
  },
  {
    id: 4,
    category: 'Football',
    type: 'text',
    content: 'Which country won the FIFA World Cup in 2018?',
    correctAnswer: 'France',
    hint: 'The country of love and the Eiffel Tower'
  },
  {
    id: 5,
    category: 'Rap',
    type: 'text',
    content: 'Complete the lyric: "Started from the bottom now we..."',
    correctAnswer: 'here',
    hint: 'Drake song'
  }
];

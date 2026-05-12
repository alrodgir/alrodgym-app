// Mock data que refleja la estructura real de AlrodGym (JSON plano, multi-usuario)

export const USERS = {
  alex: {
    id: 'alex',
    name: 'Alex',
    avatar: null,
    mode: 'enhanced', // 'natural' | 'enhanced' (Testo+Oxa)
    routine: 'power-pump',
    weight: 82.5,
    waist: 82,
    prs: {
      bench: { weight: 120, date: '2026-05-10' },
      squat: { weight: 155, date: '2026-04-28' },
      deadlift: { weight: 195, date: '2026-05-05' },
    },
  },
  amparo: {
    id: 'amparo',
    name: 'Amparo',
    avatar: null,
    mode: 'natural',
    routine: 'upper-lower',
    weight: null,
    waist: null,
    prs: {},
  },
};

export const activeUser = USERS.alex;

export const ROUTINES = {
  'power-pump': {
    id: 'power-pump',
    name: 'Power & Pump',
    description: 'Power (fuerza) + Pump (hipertrofia) con Testo+Oxa',
    days: [
      {
        day: 'lunes',
        type: 'power',
        label: 'Power Upper A',
        exercises: [
          { name: 'Press Banca', sets: 3, targetReps: '5', rir: 1, weight: 100 },
          { name: 'Press Militar', sets: 3, targetReps: '5', rir: 1, weight: 55 },
          { name: 'Remo Pendlay', sets: 3, targetReps: '5', rir: 1, weight: 90 },
          { name: 'Dominadas Lastradas', sets: 3, targetReps: '5', rir: 1, weight: 15 },
          { name: 'Curl Barra Z', sets: 3, targetReps: '8', rir: 2, weight: 35 },
        ],
      },
      {
        day: 'martes', type: 'pump', label: 'Pump Lower',
        exercises: [
          { name: 'Sentadilla', sets: 3, targetReps: '8-10', rir: 1, weight: 100 },
          { name: 'Peso Muerto Rumano', sets: 3, targetReps: '10', rir: 1, weight: 90 },
          { name: 'Prensa', sets: 3, targetReps: '12', rir: 1, weight: 180 },
          { name: 'Curl Femoral', sets: 3, targetReps: '12', rir: 1, weight: 50 },
          { name: 'Elevación Talones', sets: 3, targetReps: '15', rir: 2, weight: null },
        ],
      },
      {
        day: 'miércoles', type: 'rest', label: 'Rest & Recovery',
        exercises: [],
      },
      {
        day: 'jueves', type: 'power', label: 'Power Lower',
        exercises: [
          { name: 'Sentadilla', sets: 3, targetReps: '5', rir: 1, weight: 130 },
          { name: 'Peso Muerto Convencional', sets: 3, targetReps: '5', rir: 1, weight: 160 },
          { name: 'Press Piernas', sets: 3, targetReps: '8', rir: 1, weight: 200 },
          { name: 'Hip Thrust', sets: 3, targetReps: '8', rir: 1, weight: 120 },
        ],
      },
      {
        day: 'viernes', type: 'pump', label: 'Pump Upper',
        exercises: [
          { name: 'Press Banca Inclinado', sets: 3, targetReps: '10', rir: 1, weight: 80 },
          { name: 'Aperturas Mancuernas', sets: 3, targetReps: '12', rir: 2, weight: 20 },
          { name: 'Jalón al Pecho', sets: 3, targetReps: '10', rir: 1, weight: 65 },
          { name: 'Face Pull', sets: 3, targetReps: '15', rir: 2, weight: 25 },
          { name: 'Pájaros', sets: 3, targetReps: '12', rir: 2, weight: 12 },
        ],
      },
      { day: 'sábado', type: 'rest', label: 'Rest', exercises: [] },
      { day: 'domingo', type: 'rest', label: 'Rest', exercises: [] },
    ],
  },
  'upper-lower': {
    id: 'upper-lower',
    name: 'Upper/Lower Flexible',
    description: 'Upper/Lower alternante, natural',
    days: [
      { day: 'lunes', type: 'upper', label: 'Upper A', exercises: [] },
      { day: 'martes', type: 'lower', label: 'Lower A', exercises: [] },
      { day: 'miércoles', type: 'rest', label: 'Rest', exercises: [] },
      { day: 'jueves', type: 'upper', label: 'Upper B', exercises: [] },
      { day: 'viernes', type: 'lower', label: 'Lower B', exercises: [] },
      { day: 'sábado', type: 'rest', label: 'Rest', exercises: [] },
      { day: 'domingo', type: 'rest', label: 'Rest', exercises: [] },
    ],
  },
};

export const MEDALS = [
  { id: '1', name: 'Primer Paso', icon: 'trophy', desc: 'Primer entrenamiento completado', iconBg: '#FFD700' },
  { id: '2', name: 'Racha 3/5', icon: 'flame', desc: 'Entrenar 3 de 5 días', iconBg: '#FF6B35' },
  { id: '3', name: 'Dedicación', icon: 'star', desc: '10 entrenos completados', iconBg: '#59d5fb' },
  { id: '4', name: 'Veterano', icon: 'shield', desc: '50 entrenos completados', iconBg: '#0F3460' },
  { id: '5', name: 'Leyenda', icon: 'crown', desc: '100 entrenos completados', iconBg: '#FFD700' },
  { id: '6', name: 'Semana Power', icon: 'barbell', desc: 'Semana completa sin saltar', iconBg: '#FF6B35' },
  { id: '7', name: 'RP Master', icon: 'trending-up', desc: 'Nuevo RM en 3 lifts distintos', iconBg: '#00C853' },
  { id: '8', name: '6-Pack Hunter', icon: 'calendar', desc: 'Consistencia 6 semanas seguidas', iconBg: '#FF8800' },
  { id: '9', name: 'Myo Addict', icon: 'heart', desc: '12 semanas de entrenamiento continuado', iconBg: '#FF4444' },
  { id: '10', name: 'The Grinder', icon: 'timer', desc: 'Sesión de más de 2 horas', iconBg: '#9C27B0' },
];

export const userMedals = ['1', '2', '3', '4', '7', '8', '9'];

export const workoutHistory = [
  {
    id: 'w1', date: '2026-05-11', routine: 'Power Lower', duration: '1:12',
    exercises: ['Sentadilla 130kg', 'Peso Muerto 160kg', 'Press Piernas'],
    volume: '12500', medals: ['7'],
  },
  {
    id: 'w2', date: '2026-05-09', routine: 'Pump Upper', duration: '1:05',
    exercises: ['Press Banca Inclinado 80kg', 'Jalón al Pecho 65kg'],
    volume: '8900', medals: ['3', '9'],
  },
  {
    id: 'w3', date: '2026-05-08', routine: 'Power Upper A', duration: '1:20',
    exercises: ['Press Banca 100kg', 'Press Militar 55kg', 'Remo Pendlay 90kg'],
    volume: '15200', medals: ['1', '2', '4'],
  },
  {
    id: 'w4', date: '2026-05-06', routine: 'Pump Lower', duration: '0:55',
    exercises: ['Sentadilla 100kg', 'Peso Muerto Rumano 90kg'],
    volume: '7800', medals: ['6'],
  },
];

export const DAILY_MOBILITY = [
  { name: 'Doorway Chest Stretch', duration: '60 seg', done: false },
  { name: 'Bar Hang', duration: '60 seg', done: true },
  { name: '90/90 Hip', duration: '45 seg', done: false },
  { name: 'Hamstring Touch', duration: '60 seg', done: true },
  { name: 'Thoracic Rotation', duration: '45 seg', done: false },
];

export const TODAY = {
  dayName: 'LUNES',
  date: '12 MAYO',
  routineLabel: 'Power Upper A',
  routineType: 'power',
  dayIndex: 0, // 0=lunes
  isRestDay: false,
  currentExercise: {
    name: 'Press Banca',
    sets: [
      { id: 's1', weight: 100, reps: 5, rir: 1, done: true },
      { id: 's2', weight: 100, reps: 5, rir: 1, done: false },
      { id: 's3', weight: 105, reps: 4, rir: 0, done: false },
    ],
    progress: { current: 1, total: 3, percent: 33 },
    lastLift: '95kg x 6',
    image: null,
  },
};

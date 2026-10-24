import iconPencilCode from '../assets/images/icon_pencil_code_1792814021284.jpg';
import iconCodeCube from '../assets/images/icon_code_cube_1792814036273.jpg';
import iconAptitudeGear from '../assets/images/icon_aptitude_gear_1792814049761.jpg';
import iconExamShield from '../assets/images/icon_exam_shield_1792814064702.jpg';

export interface LearningTool3D {
  id: string;
  name: string;
  tagline: string;
  category: 'code' | 'aptitude' | 'exams' | 'creative';
  image: string;
  fallbackUrl: string;
  accentColor: string;
  glowColor: string;
}

export const LEARNING_TOOLS_3D: Record<string, LearningTool3D> = {
  pencilCode: {
    id: 'pencil-code',
    name: '3D Code Stylus',
    tagline: 'Syntax drafting, algorithm sketches & notes',
    category: 'code',
    image: iconPencilCode,
    fallbackUrl: '/assets/images/icon_pencil_code_1792814021284.jpg',
    accentColor: '#FFD000',
    glowColor: 'rgba(255, 208, 0, 0.4)'
  },
  codeCube: {
    id: 'code-cube',
    name: '3D Hyper-Terminal Cube',
    tagline: 'Compiler engine, runtime evaluator & DSA logic',
    category: 'code',
    image: iconCodeCube,
    fallbackUrl: '/assets/images/icon_code_cube_1792814036273.jpg',
    accentColor: '#A855F7',
    glowColor: 'rgba(168, 85, 247, 0.45)'
  },
  aptitudeGear: {
    id: 'aptitude-gear',
    name: '3D Synapse Intelligence Sphere',
    tagline: 'Quantitative aptitude, pattern logic & reasoning gears',
    category: 'aptitude',
    image: iconAptitudeGear,
    fallbackUrl: '/assets/images/icon_aptitude_gear_1792814049761.jpg',
    accentColor: '#EAB308',
    glowColor: 'rgba(234, 179, 8, 0.45)'
  },
  examShield: {
    id: 'exam-shield',
    name: '3D Placement Honor Shield',
    tagline: 'Timed mock simulations, percentile tracker & graduate cap',
    category: 'exams',
    image: iconExamShield,
    fallbackUrl: '/assets/images/icon_exam_shield_1792814064702.jpg',
    accentColor: '#FFD000',
    glowColor: 'rgba(255, 208, 0, 0.5)'
  }
};
